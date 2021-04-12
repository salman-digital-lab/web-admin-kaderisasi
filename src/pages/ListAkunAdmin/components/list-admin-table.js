import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { EnhancedTableHead, stableSort, getComparator } from '../../../components/TableDesign'

function createData(username, email, firstname, lastname, password) {
    return { username, email, firstname, lastname, password };
}

const rows = [
    createData('RyanSatria', 'ryansatriay@gmail.com','Ryan', 'Satria Yudhistira', '12dsadv'),
    createData('SatriaAS', 'Satriaad@gmail.com','Satria', 'Aliansa', 'a2212d'),
    createData('Aliftas', 'Alif@gmail.com','Alif', 'tasa', 'as212d'),
    createData('Yandistr', 'Yandi@gmail.com','Yandi', 'strandi', 'a1s212d'),
    createData('utikdini', 'utik@gmail.com','Utik', 'dini', 'as212qwe'),
    createData('randisa', 'randi@gmail.com','Randi', 'samaleha', 'wqe212d'),
    createData('kemalsi', 'kemal@gmail.com','Kemal', 'sandi ito', 'aswe2d'),
    createData('andista', 'andi@gmail.com','Andi', 'tasa', 'a221d'),
    createData('harunds', 'harun@gmail.com','Harun', 'sandi', 'aasd2'),
];

const headCells = [
    { id: 'no', numeric: true, label: 'No.' },
    { id: 'username', numeric: false, label: 'Username' },
    { id: 'email', numeric: false, label: 'Email' },
    { id: 'firstname', numeric: false, label: 'Nama Depan' },
    { id: 'lastname', numeric: false, label: 'Nama Belakang' },
    { id: 'password', numeric: false, label: 'Password' },
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

const AdminTable = () => {
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
        <div className="tableuser">
        <Paper>
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
                headCells={headCells}
                />
                <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                    .map((row, index) => {

                    return (
                        <TableRow
                        hover
                        tabIndex={-1}
                        key={index}
                        >
                            <TableCell component="th" scope="row" className="table-cell">
                                {(index+1)+(rowsPerPage*page)}
                            </TableCell>
                            <TableCell className="table-cell"><Link to={'/ListAkunAdmin/' + row.email.match(/^([^@]*)@/)[1]}>{row.username}</Link></TableCell>
                            <TableCell className="table-cell">{row.email}</TableCell>
                            <TableCell className="table-cell">{row.firstname}</TableCell>
                            <TableCell className="table-cell">{row.lastname}</TableCell>
                            <TableCell className="table-cell">{row.password}</TableCell>
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

export default AdminTable;
