import React, {useState, useContext, useEffect} from 'react';
import { Card, CardContent, FormControlLabel,
    TextField, Box, FormControl, InputLabel,
    FormLabel, RadioGroup, Button, Select,
    Modal, Fade, Backdrop, MenuItem, Input
} from '@material-ui/core';
import StyledRadio from '../../../components/RadioButton';
import KegiatanModal from '../../../components/modals/kegiatan-modal'
import {AdminActivityContext} from '../../../context/AdminActivityContext'
import '../../../assets/scss/AddActivity.scss';
import { MenuProps, getStyles } from '../../../components/Select';
import { useTheme } from '@material-ui/core/styles';

const KegiatanFilter =() => {
    const theme = useTheme();
    const {filterActivity, setFilterActivity, categoryList, functions} = useContext(AdminActivityContext)
    const { getActivityCategory } = functions
    useEffect(() => {
        if (categoryList.length < 1){
            getActivityCategory()
        }
    })
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setFilterActivity({...filterActivity, search:event.target.value, status:true})
        }
    };

    const handleCategoryChange = (s) => {
        setFilterActivity({...filterActivity, category_id:s, status:true})
    };

    const filterByJenjang = (s) => {
        setFilterActivity({...filterActivity, minimum_roles_id:Number(s), status:true})
    };

    return (
        <>
        <Card>
            <CardContent className="filter-content">
                <Box pl={5} pr={5}>
                    <Button variant="contained" color="primary" className="btn-tambah-kegiatan" onClick={handleOpen}>TAMBAH KEGIATAN</Button>
                </Box>
            </CardContent>
        </Card>
        <br/>
        <Card>
            <CardContent className="filter-content">
                <Box pl={5} pr={5}>
                <TextField id="filled-basic" size="small" label="Cari Kegiatan" variant="outlined" className="filter-input" onKeyDown={handleKeyDown} />
                <FormControl component="fieldset" className="radio-button jenkel">
                    <FormLabel component="legend">Min. Jenjang</FormLabel>
                    <RadioGroup value={filterActivity.minimum_roles_id} aria-label="activity" name="customized-radios">
                        <FormControlLabel value={-1} control={<StyledRadio />} onChange={(e) => filterByJenjang(e.target.value)} label="Semua" />
                        <FormControlLabel value={0} control={<StyledRadio />} onChange={(e) => filterByJenjang(e.target.value)} label="Kader" />
                        <FormControlLabel value={1} control={<StyledRadio />} onChange={(e) => filterByJenjang(e.target.value)} label="Aktivis" />
                        <FormControlLabel value={2} control={<StyledRadio />} onChange={(e) => filterByJenjang(e.target.value)} label="Jamaah" />
                    </RadioGroup>
                </FormControl>
                <FormControl className="select-dropdown">
                    <InputLabel id="demo-mutiple-name-label">Kategori</InputLabel>
                    <Select
                        value={filterActivity.category_id}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        input={<Input />}
                        MenuProps={MenuProps}
                    >
                    {categoryList.length >= 0 && categoryList.map((name, idx) => (
                        <MenuItem key={idx} value={name.value} label={name.label} style={getStyles(name, categoryList, theme)}>
                        {name.label}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                </Box>
            </CardContent>
        </Card>
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <Fade in={open}>
                <KegiatanModal onClose={handleClose}/>
            </Fade>
        </Modal> 
        </>
    );
}

export default KegiatanFilter;
