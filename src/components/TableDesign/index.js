import React from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { CsvBuilder } from "filefy";
import { TableCell, TableHead, TableRow, TableSortLabel, Toolbar, Tooltip, IconButton } from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print'
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort, headCells } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
        <TableRow>
            {headCells.map((headCell) => (
            <TableCell
                key={headCell.id}
                className="table-cell"
                sortDirection={orderBy === headCell.id ? order : false}
            >
                {(headCell.id !== "no") && (headCell.id !== "action")? 
                <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                >
                {headCell.label}
                {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                ) : null}
                </TableSortLabel>:
                <>
                {headCell.label}
                </>}
            </TableCell>
            ))}
        </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    headCells: PropTypes.array.isRequired
};

const exportCSV = (fileName, data) =>{
    const columns = Object.keys(data[0])
    const builder = new CsvBuilder(fileName + ".csv");
    builder
        .setDelimeter(',')
        .setColumns(columns)
        .addRows(data.map(rowData => columns.map(columnDef => rowData[columnDef])))
        .exportFile();
}

export const EnhancedTableToolbar = (props) => {
    if (props.exportButton){
        return (
        <Toolbar className="toolbar-table">
            <Tooltip title="Export CSV">
            <IconButton aria-label="Export CSV" onClick={()=>exportCSV(props.fileName, props.data)}>
                <PrintIcon/>
            </IconButton>
            </Tooltip>
        </Toolbar>
        );
    }
    return null
};

EnhancedTableToolbar.propTypes = {
    exportButton: PropTypes.bool.isRequired,
    fileName : PropTypes.string,
    headCells: PropTypes.array,
    data: PropTypes.array,
};