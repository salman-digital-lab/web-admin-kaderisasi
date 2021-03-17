import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { EnhancedTableHead, stableSort, getComparator } from '../../../components/TableDesign'

function createData(name, email, phone, univ, jenjang, activity) {
    return { name, email, phone, univ, jenjang, activity };
}

const rows = [
    createData('Ryan Satria Yudhistira', 'ryansatriay@gmail.com','08123456789', 'Universitas Telkom', 'Kader', 'SSC'),
    createData('Muhammad Ridaffa Purnomo', 'ridaffa05@gmail.com','08123456789', 'Universitas Telkom', 'Kader', 'LMD'),
    createData('Dian Aries Alfatah', 'diesalfatah@gmail.com','08123456789', 'Universitas Telkom', 'Kader', 'SSC'),
    createData('Ahmad Mumtaz', 'amumtaze@gmail.com','08123456789', 'Universitas Telkom', 'Kader', 'SPC'),
    createData('Attaqi Qowiyyun', 'attaqi08@gmail.com','08123456789', 'Universitas Telkom', 'Kader', 'SSC'),
    createData('Ghozy Ghulamul Afif', 'ghozyghlmlaff@gmail.com','08123456789', 'Universitas Telkom', 'Kader', 'SSC'),
    createData('Moerdowo', 'moerdowototo@gmail.com','08123456789', 'Universitas Telkom', 'Kader', 'LMD'),
    createData('Ibnu Yahya', 'ibnuyahya@gmail.com','08123456789', 'Universitas Telkom', 'Kader', 'SSC'),
    createData('Faruq Fathin Az-Zaim', 'faruqfathin@gmail.com','08123456789', 'Universitas Telkom', 'Kader', 'SPC'),
    createData('Shofiyah Rahmah Muthmainnah', 'shofiyahrm@gmail.com','08123456789', 'Universitas Telkom', 'Kader', 'SSC'),
];

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

const KaderTable = () => {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
        <Paper className="tableuser">
            <TableContainer>
            <Table
                aria-labelledby="tableTitle"
                size={'medium'}
                aria-label="enhanced table"
            >
                <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                />
                <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {

                    return (
                        <TableRow
                        hover
                        tabIndex={-1}
                        key={row.name}
                        >
                            <TableCell component="th" scope="row" className="table-cell">
                                {(index+1)+(rowsPerPage*page)}
                            </TableCell>
                            <TableCell className="table-cell"><Link to={'/detail-aktivis/' + row.email.match(/^([^@]*)@/)[1]}>{row.name}</Link></TableCell>
                            <TableCell className="table-cell">{row.email}</TableCell>
                            <TableCell className="table-cell">{row.phone}</TableCell>
                            <TableCell className="table-cell">{row.univ}</TableCell>
                            <TableCell className="table-cell">{row.jenjang}</TableCell>
                            <TableCell className="table-cell">{row.activity}</TableCell>
                        </TableRow>
                    );
                    })}
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
        </div>
    );
}

export default KaderTable