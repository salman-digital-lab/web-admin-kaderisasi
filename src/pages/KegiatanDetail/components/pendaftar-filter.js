import React from 'react';
import { Card, CardContent, FormControlLabel,
    TextField, Box, FormControl, InputLabel,
    FormLabel, RadioGroup, MenuItem, Select,
    Input
} from '@material-ui/core';
import StyledRadio from '../../../components/RadioButton';
import { MenuProps, getStyles } from '../../../components/Select';
import { useTheme } from '@material-ui/core/styles';


const PendaftarFilter =() => {
    const theme = useTheme();
    const [univName, setUnivName] = React.useState("all");
    const names = [
        {value:"all", label:"Semua Perguruan Tinggi"},
        {value:"TelU", label:"Telkom University"},
        {value:"ITB", label:"Institut Teknologi Bandung"},
        {value:"Unikom", label:"Universitas Komputer"},
        {value:"Unisba", label:"Universitas Islam Bandung"},
        {value:"Polban", label:"Politeknik Bandung"},
    ];
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log(event.target.value)
        }
    };

    const handleChangeUniv = (s) => {
        setUnivName(s)
        console.log(s)
    };

    const filterByStatus = (s) => {
        console.log(s)
    };

    return (
        <>
        <Card>
            <CardContent className="filter-content">
                <Box pl={5} pr={5}>
                <TextField id="filled-basic" size="small" label="Cari Pendaftar" variant="outlined" className="filter-input" onKeyDown={handleKeyDown} />
                <FormControl component="fieldset" className="radio-button jenkel">
                    <FormLabel component="legend">Min. Jenjang</FormLabel>
                    <RadioGroup defaultValue="all" aria-label="activity" name="customized-radios">
                        <FormControlLabel value="all" control={<StyledRadio />} onChange={(e) => filterByStatus(e.target.value)} label="Semua" />
                        <FormControlLabel value="kader" control={<StyledRadio />} onChange={(e) => filterByStatus(e.target.value)} label="Kader" />
                        <FormControlLabel value="aktivis" control={<StyledRadio />} onChange={(e) => filterByStatus(e.target.value)} label="Aktivis" />
                        <FormControlLabel value="jamaah" control={<StyledRadio />} onChange={(e) => filterByStatus(e.target.value)} label="Jamaah" />
                    </RadioGroup>
                </FormControl>
                <FormControl className="select-dropdown">
                    <InputLabel id="demo-mutiple-name-label">Perguruan Tinggi</InputLabel>
                    <Select
                        value={univName}
                        onChange={(e) => handleChangeUniv(e.target.value)}
                        input={<Input />}
                        MenuProps={MenuProps}
                    >
                    {names.map((name, idx) => (
                        <MenuItem key={idx} value={name.value} label={name.label} style={getStyles(name, univName, theme)}>
                        {name.label}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                </Box>
            </CardContent>
        </Card>
        </>
    );
}

export default PendaftarFilter;
