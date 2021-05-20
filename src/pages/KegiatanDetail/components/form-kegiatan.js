import React, { useState, useContext, useEffect } from "react";
import DetailKegiatanModal from "../../../components/modals/detail-kegiatan-modal";
import { Button, Select, MenuItem, TextField } from "@material-ui/core";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { AdminActivityContext } from "../../../context/AdminActivityContext";
import { useParams } from "react-router";
import LoadingAnimation from "../../../components/loading-animation";

const FormKegiatan = () => {
  const { activityForm, categoryList, functions } =
    useContext(AdminActivityContext);
  const { getActivityCategory, getActivityDetail, editActivity } = functions;
  const stateEdit = EditorState.createEmpty();
  const [editorState, setEditorState] = useState(stateEdit);
  const [stateCanBeEdited, setStateCanBeEdited] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [check, setCheck] = useState(true);
  const { id } = useParams();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    setStateCanBeEdited(!stateCanBeEdited);
  };

  const handleForm = (value, type) => {
    setFormData({ ...formData, [type]: value });
  };

  const handleEditor = (value) => {
    setEditorState(value);
    handleForm(
      draftToHtml(convertToRaw(editorState.getCurrentContent())),
      "description"
    );
  };

  const handleSubmit = () => {
    editActivity(id, formData);
    handleEdit();
  };

  useEffect(() => {
    if (activityForm.length < 1 && categoryList.length < 1) {
      getActivityDetail(id);
      getActivityCategory();
    }
    if (activityForm.length > 0 && check) {
      const contentBlock = htmlToDraft(activityForm[0].description);
      const stateEdit = EditorState.createWithContent(
        ContentState.createFromBlockArray(contentBlock.contentBlocks)
      );
      setEditorState(stateEdit);
      setCheck(false);
    }
  });

  if (activityForm.length > 0 && check) {
    const contentBlock = htmlToDraft(activityForm[0].description);
    const stateEdit = EditorState.createWithContent(
      ContentState.createFromBlockArray(contentBlock.contentBlocks)
    );
    setEditorState(stateEdit);
    setCheck(false);
  }

  return (
    <>
      <div className="tambah-kegiatan">
        {activityForm.length === 1 && categoryList.length > 1 ? (
          <>
            <div className="top-bar-kegiatan">
              <div className="detail-activity">
                <div className="input-form">
                  Judul
                  <br />
                  <TextField
                    defaultValue={activityForm[0].name}
                    InputProps={{
                      readOnly: !stateCanBeEdited,
                    }}
                    onChange={(event) => handleForm(event.target.value, "name")}
                  />
                </div>
                <div className="input-form">
                  Kategori Kegiatan
                  <br />
                  {!stateCanBeEdited ? (
                    <TextField
                      value={categoryList[activityForm[0].category_id].label}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  ) : (
                    <Select
                      className="select-input-form"
                      defaultValue={activityForm[0].category_id}
                      onChange={(event) =>
                        handleForm(event.target.value, "category_id")
                      }
                    >
                      {categoryList
                        .filter((x) => x.value !== -1)
                        .map((value, index) => (
                          <MenuItem key={index} value={value.value}>
                            {value.label}
                          </MenuItem>
                        ))}
                    </Select>
                  )}
                </div>
              </div>
              <div className="button-tambah-kegiatan">
                {!stateCanBeEdited ? (
                  <>
                    <Button
                      className="edit-button"
                      variant="contained"
                      color="primary"
                      onClick={handleEdit}
                    >
                      Edit
                    </Button>
                    <Button
                      className="button-top-tambah-kegiatan"
                      variant="contained"
                      color="primary"
                      onClick={handleOpen}
                    >
                      Tambah Detail
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleEdit}
                    >
                      Batalkan
                    </Button>
                    <Button
                      className="button-top-tambah-kegiatan"
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                    >
                      Simpan
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="content-tambah-kegiatan">
              <div className="input-form">Deskripsi</div>
              <br />
              <div className="editor">
                {!stateCanBeEdited ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: draftToHtml(
                        convertToRaw(editorState.getCurrentContent())
                      ),
                    }}
                  />
                ) : (
                  <>
                    <Editor
                      editorState={editorState}
                      wrapperClassName="demo-wrapper"
                      editorClassName="demo-editor"
                      onEditorStateChange={handleEditor}
                    />
                  </>
                )}
              </div>
            </div>
            <DetailKegiatanModal
              open={open}
              onClose={handleClose}
              data={activityForm[0]}
            />
          </>
        ) : (
          <div className="loading-table">
            <LoadingAnimation table />
          </div>
        )}
      </div>
    </>
  );
};
export default FormKegiatan;
