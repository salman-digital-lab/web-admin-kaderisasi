import React, {useState} from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { Button, Checkbox, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Delete, Visibility } from '@material-ui/icons';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../assets/scss/AddActivity.scss"
import BaseImage from './1056x816small.png'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { EnhancedTableHead, stableSort, getComparator } from '../TableDesign'

function createData(id, value, uploadedAt) {
    return {id, value, uploadedAt};
}

const headCells = [
    { id: 'id', numeric: false, label: 'ID' },
    // { id: 'uploadedAt', numeric: false, label: 'Uploaded At' },
    { id: 'action', numeric: false, label: 'Action' }
];

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    paper: {
        position: 'absolute',
        width: 900,
        height: 650,
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid white',
        outline:'none',
        // boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },

    root: {
        width: '100%',
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


  //form
function getformStyle() {
    const top = 50;
    const left = 50 ;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

export const DetailKegiatanModal =({onClose})=> {
    const [rows, setRows] = useState(JSON.parse(localStorage.getItem(0)) && JSON.parse(localStorage.getItem(0)).length > 0 ? JSON.parse(localStorage.getItem(0)).map((x) => createData(x.id, x.value, x.uploadedAt)) : [])
    const [uploadedImage, setUploadImage] = useState(JSON.parse(localStorage.getItem(0)) && JSON.parse(localStorage.getItem(0)).length > 0 ? JSON.parse(localStorage.getItem(0))[JSON.parse(localStorage.getItem(0)).length-1].value : BaseImage);
    const [submitError, setSubmitError] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const classes = useStyles();
    const [formStyle] = useState(getformStyle);
    const [jenjang, setJenjang] = useState('Aktivis');
    const [kuisioner, setkuisioner] = useState('Salman Cendikia Get to Know Business Management Systems');
    const id = 0
    const [startDate, setStartDate] = useState(new Date());
    const [expiredDate, setExpiredDate] = useState(new Date());
    const [date, setDate] = useState(new Date());

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('uploadedAt');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleExpiredDateChange = (date) => {
        setExpiredDate(date);
    };

    const handleDateChange = (date) => {
        setDate(date);
    };

    const handleRemoveImage = (id) => {
        const tmp = JSON.parse(localStorage.getItem(0)).filter((x) => x.id !== id)
        localStorage.setItem(0, JSON.stringify(tmp))
        setRows(tmp)
    }

    const submitForm = (e) => {
        e.preventDefault();
        if (document.getElementById('logo').files[0]){
            const file = URL.createObjectURL(document.getElementById('logo').files[0]);
            const canvas = document.createElement('canvas');
            canvas.width = 1056;
            canvas.height = 816;
            const imgTemp = document.createElement('img');
            imgTemp.setAttribute('src', file);
            const ctx = canvas.getContext('2d');
            imgTemp.onload = function () {
                ctx.drawImage(imgTemp, 0, 0);
                const url = canvas.toDataURL('image/png');
                const dataImage = JSON.parse(localStorage.getItem(0)) ? JSON.parse(localStorage.getItem(0)) : []
                try {
                    dataImage.push({id:new Date().getTime(), value:url, uploadedAt:new Date()})
                    setUploadImage(url);
                    window.localStorage.setItem(id,JSON.stringify(dataImage));
                    setSubmitSuccess(true);
                    setRows(JSON.parse(localStorage.getItem(0)).map((x) => createData(x.id, x.value, x.uploadedAt)))
                } catch (evt) {
                    setUploadImage(BaseImage);
                    setSubmitError(true);
                }
            };
        } else {
            setUploadImage(BaseImage);
            setSubmitError(true);
        }
    };
    
    const handleJenjangChange = (event) => {
        setJenjang(event.target.value);
    };
    
    const handleKuisioner = (event) => {
        setkuisioner(event.target.value);
    };

    return(
        <div style={formStyle} className={classes.paper}>
            <div className="form-flex">
                <div className="left-form">
                    <div className="container-gambar-detail">
                        <img alt="logo" src={uploadedImage} className="img-fluid" />
                    </div>
                    <div>
                    <br/>
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
                                        <TableCell className="table-cell">{row.id.toString().slice(7,13)}</TableCell>
                                        {/* <TableCell className="table-cell">{new Date(row.uploadedAt).toLocaleDateString()}</TableCell> */}
                                        <TableCell className="table-cell">
                                            <Button color="primary" size="small" onClick={()=> setUploadImage(row.value)}>
                                                <Visibility fontSize="small" />
                                            </Button>
                                            <Button color="secondary" size="small" onClick={()=> handleRemoveImage(row.id)}>
                                                <Delete fontSize="small" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                                })}
                            </TableBody>
                        </Table>
                        </TableContainer>
                    </Paper>
                    </div>
                </div>
                <div className="right-form">
                    <div className="container-button-kegiatan">
                        {submitError && (
                            <Alert className="button-kegiatan" onClose={() => {setSubmitError(false)}} severity="error">Error! Silahkan lakukan unggah gambar kembali.</Alert>
                        )}
                        {submitSuccess && (
                            <Alert className="button-kegiatan" onClose={() => {setSubmitSuccess(false)}} severity="success">Sukses mengunggah gambar.</Alert>
                        )}
                        <form onSubmit={submitForm}>
                            <input className="button-kegiatan" type="file" name="logo" id="logo"/>
                            <Button 
                                className="button-kegiatan" 
                                variant="contained" 
                                color="primary" 
                                type="submit" 
                                disabled={JSON.parse(localStorage.getItem(0)) && JSON.parse(localStorage.getItem(0)).length > 3} 
                            >
                                {JSON.parse(localStorage.getItem(0)) && 
                                JSON.parse(localStorage.getItem(0)).length > 3 ? 
                                "Max. Gambar hanya 4!" : "Upload Gambar"}
                            </Button>
                        </form>
                    </div>
                    <div >
                        <Checkbox
                        // checked={true}
                        color="primary"
                        // onChange={handleChange}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        /> Published
                        
                        <Checkbox
                        // checked={true}
                        color="primary"
                        // onChange={handleChange}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        /> Opened Registration
                    </div>
                    <br/>
                    <div className="detail-activity">
                        <div className="input-form">
                            Publisher Name<br/>
                            <TextField className="form-modal"/>
                        </div>
                        <div className="input-form">
                            Registration Start<br/>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                className="form-modal"
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                value={startDate}
                                onChange={handleStartDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            </MuiPickersUtilsProvider>
                        </div>  
                    </div>
                    <div className="detail-activity">
                        <div className="input-form">
                            Tanggal Kegiatan
                            <br/>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                className="form-modal"
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                value={date}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            </MuiPickersUtilsProvider>
                        </div>
                        <div className="input-form">
                            Registration Expired<br/>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                className="form-modal"
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                value={expiredDate}
                                onChange={handleExpiredDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            </MuiPickersUtilsProvider>
                        </div> 
                    </div>
                    <div className="select-form">
                        Jenjang Minimal<br/>
                        <Select className="select-input-form" value={jenjang} onChange={handleJenjangChange}>
                            <MenuItem value={"Aktivis"}>Aktivis</MenuItem>
                            <MenuItem value={"Kaderisasi"}>Kaderisasi</MenuItem>
                            <MenuItem value={"Jamaah"}>Jamaah</MenuItem>
                        </Select>
                    </div>  
                    <div className="select-form">
                        Kuisioner<br/>
                        <Select className="select-input-form" value={kuisioner} onChange={handleKuisioner}>
                            <MenuItem value={"Salman Cendikia Get to Know Business Management Systems"}>Salman Cendikia Get to Know Business Management Systems</MenuItem>
                            <MenuItem value={"Kaderisasi"}>Kaderisasi</MenuItem>
                            <MenuItem value={"Perayaan"}>Perayaan</MenuItem>
                        </Select>
                    </div> 
                    <div className="button-bottom">
                        <Button onClick={onClose} className="button-bottoms-kegiatan" variant="contained" color="secondary">Batalkan</Button>
                        <Button onClick={onClose} className="button-bottoms-kegiatan" variant="contained" color="primary">Simpan</Button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DetailKegiatanModal;