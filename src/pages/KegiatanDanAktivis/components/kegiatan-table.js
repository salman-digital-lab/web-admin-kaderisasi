import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { EnhancedTableHead, stableSort, getComparator } from '../../../components/TableDesign'
import {PublishStatus, RegisterStatus} from '../../../components/Statuses'

function createData(judul, startDate, endDate, jenjang, kategori, register, publish, updatedAt) {
    return { judul, startDate, endDate, jenjang, kategori, register, publish, updatedAt };
}

const rows = [
    createData('Salman Cendikia Get to Know Business Competition', '22-02-2021','26-02-21', 'Aktivis', 'Aktualisasi Diri', 'closed', 'published', '1'),
    createData('Salman Cendikia Get to Know Business Competition', '22-02-2021','26-02-21', 'Aktivis', 'Aktualisasi Diri', 'closed', 'published', '1'),
    createData('Salman Cendikia Get to Know Business Competition', '22-02-2021','26-02-21', 'Aktivis', 'Aktualisasi Diri', 'closed', 'published', '1'),
    createData('Salman Cendikia Get to Know Business Competition', '22-02-2021','26-02-21', 'Aktivis', 'Aktualisasi Diri', 'closed', 'published', '1'),
    createData('Salman Cendikia Get to Know Business Competition', '22-02-2021','26-02-21', 'Aktivis', 'Aktualisasi Diri', 'opened', 'unpublished', '1'),
    createData('Salman Cendikia Get to Know Business Competition', '22-02-2021','26-02-21', 'Aktivis', 'Aktualisasi Diri', 'opened', 'unpublished', '1'),
    createData('Salman Cendikia Get to Know Business Competition', '22-02-2021','26-02-21', 'Aktivis', 'Aktualisasi Diri', 'opened', 'published', '1'),
    createData('Salman Cendikia Get to Know Business Competition', '22-02-2021','26-02-21', 'Aktivis', 'Aktualisasi Diri', 'opened', 'published', '1'),
    createData('Salman Cendikia Get to Know Business Competition', '22-02-2021','26-02-21', 'Aktivis', 'Aktualisasi Diri', 'closed', 'published', '1'),
    createData('Salman Cendikia Get to Know Business Competition', '22-02-2021','26-02-21', 'Aktivis', 'Aktualisasi Diri', 'closed', 'published', '1')
];

const headCells = [
    { id: 'no', numeric: true, label: 'No.' },
    { id: 'judul', numeric: false, label: 'Judul Aktivitas/Kegiatan' },
    { id: 'tgl_pendaftaran', numeric: false, label: 'Tanggal Pendaftaran' },
    { id: 'jenjang', numeric: false, label: 'Min. Jenjang' },
    { id: 'kategori', numeric: false, label: 'Kategori' },
    { id: 'register', numeric: false, label: 'Register' },
    { id: 'publish', numeric: false, label: 'Publish' },
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

const KegiatanTable = () => {
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
        <div className="tableactivity">
        <h1 className="headline" style={{ color: '#999999' }}>Kegiatan dan Aktivitas</h1>
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
                            <TableCell component="th" scope="row" className="table-cell middle-cell">
                                {(index+1)+(rowsPerPage*page)}
                            </TableCell>
                            <TableCell className="table-cell"><Link to={'/detail-kegiatan/' + index}>{row.judul}</Link><br/>Diperbarui {row.updatedAt} hari yang lalu</TableCell>
                            <TableCell className="table-cell">Start :  {row.startDate} <br/>End : {row.endDate}</TableCell>
                            <TableCell className="table-cell">{row.jenjang}</TableCell>
                            <TableCell className="table-cell">{row.kategori}</TableCell>
                            <TableCell className="table-cell"><RegisterStatus status={row.register}/></TableCell>
                            <TableCell className="table-cell"><PublishStatus status={row.publish}/></TableCell>
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

export default KegiatanTable;
