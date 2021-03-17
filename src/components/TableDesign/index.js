import React from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { TableCell, TableHead, TableRow, TableSortLabel, Toolbar, Typography } from '@material-ui/core';

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

const headCells = [
    { id: 'no', numeric: true, label: 'No.' },
    { id: 'name', numeric: false, label: 'Nama Jamaah' },
    { id: 'email', numeric: false, label: 'Email' },
    { id: 'phone', numeric: false, label: 'Phone/WA' },
    { id: 'univ', numeric: false, label: 'Perguruan Tinggi/Univ' },
    { id: 'jengjang', numeric: false, label: 'Jenjang' },
    { id: 'activity', numeric: false, label: 'SSC, LMD & SPC' },
];

export function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
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
                {headCell.id !== "no" ? 
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
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    highlight:
        theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

export const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { title } = props;

    return (
        <Toolbar>
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            {title}
        </Typography>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    title: PropTypes.string.isRequired,
};