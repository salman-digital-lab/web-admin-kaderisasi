import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { EnhancedTableHead, EnhancedTableToolbar, stableSort, getComparator } from '../../../components/TableDesign'

function createData(name, email, phone, univ, jenjang, jurusan) {
    return { name, email, phone, univ, jenjang, jurusan };
}

const rows = [
    createData('Ryan Satria Yudhistira', 'ryansatriay@gmail.com','08123456789', 'Institut Del Monte', 'Aktivis', 'Matematika'),
    createData('Muhammad Ridaffa Purnomo', 'ridaffa05@gmail.com','08123456789', 'Institut Del Monte', 'Aktivis', 'Fisika'),
    createData('Dian Aries Alfatah', 'diesalfatah@gmail.com','08123456789', 'Institut Del Monte', 'Aktivis', 'Matematika'),
    createData('Ahmad Mumtaz', 'amumtaze@gmail.com','08123456789', 'Universitas ABC', 'Kader', 'Biologi'),
    createData('Attaqi Qowiyyun', 'attaqi08@gmail.com','08123456789', 'Universitas ABC', 'Kader', 'Matematika'),
    createData('Ghozy Ghulamul Afif', 'ghozyghlmlaff@gmail.com','08123456789', 'Universitas ABC', 'Kader', 'Matematika'),
    createData('Moerdowo', 'moerdowototo@gmail.com','08123456789', 'Universitas Pucuk Harum', 'Kader', 'Fisika'),
    createData('Ibnu Yahya', 'ibnuyahya@gmail.com','08123456789', 'Universitas Pucuk Harum', 'Jamaah', 'Matematika'),
    createData('Faruq Fathin Az-Zaim', 'faruqfathin@gmail.com','08123456789', 'Universitas Pucuk Harum', 'Jamaah', 'Biologi'),
    createData('Shofiyah Rahmah Muthmainnah', 'shofiyahrm@gmail.com','08123456789', 'Universitas Buah Batu', 'Jamaah', 'Matematika'),
];

const headCells = [
    { id: 'no', numeric: true, label: 'No.' },
    { id: 'name', numeric: false, label: 'Nama Lengkap' },
    { id: 'email', numeric: false, label: 'Email & Whatsapp' },
    { id: 'univ', numeric: false, label: 'Perguruan Tinggi' }
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
        alignContent: 'left',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

const PendaftarTable = () => {
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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
        <div className="tableactivity">
        <h1 className="headline" style={{ color: '#999999' }}>Pendaftar Kegiatan</h1>
        <Paper>
            <EnhancedTableToolbar exportButton={true} fileName={"Pendaftar Kegiatan"} data={rows}/>
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
                            <TableCell component="th" scope="row" className="table-cell middle-cell">
                                {(index+1)+(rowsPerPage*page)}
                            </TableCell>
                            <TableCell className="table-cell"><Link to={'/detail-aktivis/' + row.email.match(/^([^@]*)@/)[1]}>{row.name}</Link><br/>{row.jenjang}</TableCell>
                            <TableCell className="table-cell">{row.email} <br/>{row.phone}</TableCell>
                            <TableCell className="table-cell">{row.univ} <br/>{row.jurusan}</TableCell>
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

export default PendaftarTable;
