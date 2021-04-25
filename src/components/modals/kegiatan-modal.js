import React, { useState, useEffect, useContext } from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import "../../assets/scss/AddActivity.scss"
import { AdminActivityContext } from '../../context/AdminActivityContext';



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
        width: 700,
        backgroundColor: theme.palette.background.paper,
        outline: 'none',
        padding: theme.spacing(2, 4, 3),
    },

    root: {
        width: '100%',
    },
}));


//form
function getformStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

export const DetailKegiatanModal = ({ onClose }) => {
    const classes = useStyles();
    const [formStyle] = useState(getformStyle);
    const [kategori, setKategori] = useState('Aktualisasi Diri');
    const [jenjang, setJenjang] = useState('Aktivis');
    const [startDate, setStartDate] = useState(new Date());
    const [expiredDate, setExpiredDate] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const { categoryList, functions } = useContext(AdminActivityContext)
    const { getActivityCategory } = functions
    useEffect(() => {
        if (categoryList.length < 1) {
            getActivityCategory()
        }
    })

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleExpiredDateChange = (date) => {
        setExpiredDate(date);
    };

    const handleDateChange = (date) => {
        setDate(date);
    };

    const handleKategoriChange = (event) => {
        setKategori(event.target.value);
    };

    const handleJenjangChange = (event) => {
        setJenjang(event.target.value);
    };


    return (
        <div style={formStyle} className={classes.paper}>
            <div className="form-flex">
                <div>
                    <div className="detail-activity">
                        <div className="input-form">
                            Judul
                        <br />
                            <TextField className="form-modal" />
                        </div>
                    </div>
                    <div className="select-form">
                        Kategori Kegiatan<br />
                        <Select className="select-input-form" value={kategori} onChange={handleKategoriChange}>
                            {categoryList.length >= 0 && categoryList.map((name, idx) => (
                                <MenuItem key={idx} value={name.value}>
                                    {name.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div className="select-form">
                        Jenjang Minimal<br />
                        <Select className="select-input-form" value={jenjang} onChange={handleJenjangChange}>
                            <MenuItem value={"Aktivis"}>Aktivis</MenuItem>
                            <MenuItem value={"Kaderisasi"}>Kaderisasi</MenuItem>
                            <MenuItem value={"Jamaah"}>Jamaah</MenuItem>
                        </Select>
                    </div>
                    <div className="detail-activity">
                        <div className="input-form">
                            Tanggal Kegiatan
                        <br />
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
                    </div>
                    <div className="detail-activity">
                        <div className="input-form">
                            Registration Start<br />
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
                            Registration Expired<br />
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
                    <div className="button-bottom">
                        <Button onClick={onClose} className="button-bottoms-kegiatan" variant="contained" color="secondary">Batalkan</Button>
                        <Link to={"/detail-kegiatan/0"} className="button-bottoms-kegiatan"><Button onClick={onClose} className="button-bottom" variant="contained" color="primary">Simpan</Button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DetailKegiatanModal;