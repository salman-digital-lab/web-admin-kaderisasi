import React, { useState, useContext, useEffect } from 'react';
import DetailKegiatanModal from '../../../components/modals/detail-kegiatan-modal'
import { Button, Modal, Fade, Backdrop, Select, MenuItem, TextField } from '@material-ui/core';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { AdminActivityContext } from '../../../context/AdminActivityContext';

const FormKegiatan = () => {
    const deskripsi = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tincidunt ornare massa eget egestas purus viverra accumsan. Turpis egestas maecenas pharetra convallis posuere morbi leo. Sem viverra aliquet eget sit. Egestas tellus rutrum tellus pellentesque eu tincidunt. Adipiscing diam donec adipiscing tristique. Proin nibh nisl condimentum id venenatis a condimentum vitae. Enim lobortis scelerisque fermentum dui faucibus in ornare. Eu consequat ac felis donec. Facilisis gravida neque convallis a cras semper auctor neque. Nam at lectus urna duis convallis convallis tellus. Non odio euismod lacinia at quis risus sed vulputate.\nSed faucibus turpis in eu mi bibendum. Tortor pretium viverra suspendisse potenti nullam ac tortor vitae. Iaculis eu non diam phasellus. Vitae tortor condimentum lacinia quis. Amet nisl purus in mollis nunc sed id semper. Quam id leo in vitae turpis massa. Nisl purus in mollis nunc sed id semper risus. Maecenas accumsan lacus vel facilisis volutpat est velit egestas. Diam ut venenatis tellus in metus vulputate eu. Id diam vel quam elementum pulvinar. Bibendum neque egestas congue quisque egestas diam in arcu cursus. Enim diam vulputate ut pharetra sit amet aliquam id diam. Nunc mattis enim ut tellus elementum sagittis vitae. Amet nisl purus in mollis nunc. Neque vitae tempus quam pellentesque nec nam aliquam sem et.';
    const stateEdit = EditorState.createWithContent(ContentState.createFromText(deskripsi));
    const [editorState, setEditorState] = useState(stateEdit);
    const [judul, setJudul] = useState('Salman Cendikia Get to Know Business Competition');
    const [kategori, setKategori] = useState('Dondo');
    const [kode, setKode] = useState('110421')
    const { categoryList, functions } = useContext(AdminActivityContext)
    const { getActivityCategory } = functions

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [editState, setEditState] = useState(true);
    const editButton = () => {
        setEditState(!editState);
    };

    const handleJudulChange = (event) => {
        setJudul(event.target.value);
    };

    const handleKategoriChange = (event) => {
        setKategori(event.target.value);
    };

    const handleKodeChange = (event) => {
        setKode(event.target.value);
    };
    useEffect(() => {
        if (categoryList.length < 1) {
            getActivityCategory()
        }
    })
    
    return (
        <div className="tambah-kegiatan">
            <div className="top-bar-kegiatan">
                <div className="detail-activity">
                    <div className="input-form">
                        Judul<br />
                        <TextField
                            defaultValue={judul}
                            InputProps={{
                                readOnly: editState,
                            }}
                            onChange={handleJudulChange}
                        />
                    </div>
                    <div className="input-form">
                        Kategori Kegiatan<br />
                        {editState ?
                            <TextField
                                defaultValue={kategori}
                                InputProps={{
                                    readOnly: true,
                                }} /> :
                            <Select className="select-input-form" defaultValue="aktualisasi" value={kategori} onChange={handleKategoriChange}>
                                {categoryList.length >= 0 && categoryList.map((name, index) => (
                                    <MenuItem key={index} value={name.label}>{name.label}</MenuItem>
                                ))}
                            </Select>}
                    </div>
                    <div className="input-form">
                        Kode
                        <br />
                        <TextField
                            defaultValue={kode}
                            onChange={handleKodeChange}
                            InputProps={{
                                readOnly: editState,
                            }} />
                    </div>
                </div>
                <div className="button-tambah-kegiatan">
                    {editState ?
                        <>
                            <Button className="edit-button" variant="contained" color="primary" onClick={editButton}>Edit</Button>
                            <Button className="button-top-tambah-kegiatan" variant="contained" color="primary" onClick={handleOpen}>Tambah Detail</Button>
                        </> :
                        <>
                            <Button variant="contained" color="secondary" onClick={editButton}>Batalkan</Button>
                            <Button className="button-top-tambah-kegiatan" variant="contained" color="primary" onClick={editButton}>Simpan</Button></>}
                </div>
            </div>
            <div className="content-tambah-kegiatan">
                <div className="input-form">Deskripsi</div>
                <br />
                <div className="editor">
                    {editState ? editorState.getCurrentContent().getPlainText() :
                        <Editor
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            pla
                            onEditorStateChange={setEditorState}
                        />}
                </div>
            </div>
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
                    <DetailKegiatanModal onClose={handleClose} />
                </Fade>
            </Modal>
        </div>
    );
    
}
export default FormKegiatan;
