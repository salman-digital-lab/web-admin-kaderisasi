import React from 'react';
import { Card, CardContent, FormControlLabel,
    TextField, Box, FormControl,
    FormLabel, RadioGroup, Button
} from '@material-ui/core';
import StyledRadio from '../../../components/RadioButton';


const KegiatanFilter =() => {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log(event.target.value)
        }
    };

    const filterByStatus = (s) => {
        console.log(s)
    };

    return (
        <>
        <Card>
            <CardContent className="filter-content">
                <Box pl={5} pr={5}>
                    <Button variant="contained" color="primary" className="btn-tambah-kegiatan">TAMBAH KEGIATAN</Button>
                </Box>
            </CardContent>
        </Card>
        <br/>
        <Card>
            <CardContent className="filter-content">
                <Box pl={5} pr={5}>
                <TextField id="filled-basic" size="small" label="Cari Kegiatan" variant="outlined" className="filter-input" onKeyDown={handleKeyDown} />
                <FormControl component="fieldset" className="radio-button activity">
                    <FormLabel component="legend">Kategori</FormLabel>
                    <RadioGroup defaultValue="all" aria-label="activity" name="customized-radios">
                        <FormControlLabel value="all" control={<StyledRadio />} onChange={(e) => filterByStatus(e.target.value)} label="Semua" />
                        <FormControlLabel value="ssc" control={<StyledRadio />} onChange={(e) => filterByStatus(e.target.value)} label="Aktualisasi Diri" />
                        <FormControlLabel value="lmd" control={<StyledRadio />} onChange={(e) => filterByStatus(e.target.value)} label="Rohani" />
                        <FormControlLabel value="spc" control={<StyledRadio />} onChange={(e) => filterByStatus(e.target.value)} label="Ilmiah" />
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset" className="radio-button jenkel">
                    <FormLabel component="legend">Min. Jenjang</FormLabel>
                    <RadioGroup defaultValue="all" aria-label="activity" name="customized-radios">
                        <FormControlLabel value="all" control={<StyledRadio />} onChange={(e) => filterByStatus(e.target.value)} label="Semua" />
                        <FormControlLabel value="kader" control={<StyledRadio />} onChange={(e) => filterByStatus(e.target.value)} label="Kader" />
                        <FormControlLabel value="aktivis" control={<StyledRadio />} onChange={(e) => filterByStatus(e.target.value)} label="Aktivis" />
                        <FormControlLabel value="jamaah" control={<StyledRadio />} onChange={(e) => filterByStatus(e.target.value)} label="Jamaah" />
                    </RadioGroup>
                </FormControl>
                </Box>
            </CardContent>
        </Card>
        </>
    );
}

export default KegiatanFilter;
