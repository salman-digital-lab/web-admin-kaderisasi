import React, { useState, useContext, useEffect } from "react"
import { Button } from "@material-ui/core"
import { EditorState, convertToRaw, ContentState } from "draft-js"
import draftToHtml from "draftjs-to-html"
import htmlToDraft from "html-to-draftjs"
import moment from "moment"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { useParams } from "react-router-dom"
import { AdminActivityContext } from "../../../context/AdminActivityContext"
import { PublishStatus, RegisterStatus } from "../../../components/statuses"
import DetailKegiatanModal from "../../../components/modals/activity-detail-modal"
import LoadingAnimation from "../../../components/loading-animation"
import AlertToast from "../../../components/alert"

const FormKegiatan = () => {
  const { id } = useParams()
  const { activityForm, categoryList, openAlert, setOpenAlert, functions } =
    useContext(AdminActivityContext)
  const { getActivityCategory, getActivityDetail, editActivity } = functions
  const stateEdit = EditorState.createEmpty()
  const [editorState, setEditorState] = useState(stateEdit)
  const [stateCanBeEdited, setStateCanBeEdited] = useState(false)
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({})
  const [check, setCheck] = useState(true)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleEdit = () => {
    setStateCanBeEdited(!stateCanBeEdited)
  }

  const handleForm = (value, type) => {
    setFormData({ ...formData, [type]: value })
  }

  useEffect(() => {
    if (activityForm.length < 1 && !categoryList?.status) {
      getActivityDetail(id)
      getActivityCategory({ page: 1, perPage: 100 })
    }
  }, [activityForm])

  return (
    <>
      <div className="tambah-kegiatan">
        {activityForm.length === 1 && categoryList?.status === "SUCCESS" ? (
          <>
            <div className="top-bar-kegiatan">
              <div className="button-tambah-kegiatan">
                <Button
                  className="edit-button"
                  variant="contained"
                  color="primary"
                  onClick={handleOpen}
                >
                  Edit
                </Button>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="row">
                  <div className="col-12 d-flex flex-column py-5 px-15">
                    <strong>Nama Kegiatan</strong>{" "}
                    <span>{activityForm[0]?.name}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 d-flex flex-column py-5 px-15">
                    <strong>Kategori Kegiatan</strong>{" "}
                    <span>{activityForm[0]?.activityCategory?.name}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 d-flex flex-column py-5 px-15">
                    <strong>Minimum Jenjang</strong>{" "}
                    <span>{activityForm[0]?.minimumRole?.name}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 d-flex flex-column py-5 px-15">
                    <strong>Status Publikasi</strong>{" "}
                    <span>
                      <PublishStatus
                        status={
                          activityForm[0]?.is_published
                            ? "published"
                            : "unpublished"
                        }
                      />
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 d-flex flex-column py-5 px-15">
                    <strong>Status Registrasi</strong>{" "}
                    <span>
                      <RegisterStatus status={activityForm[0]?.status} />
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-12 d-flex flex-column py-5 px-15">
                    <strong>Tanggal Mulai Registrasi</strong>{" "}
                    <span>
                      {moment(activityForm[0].register_begin_date).format(
                        "D MMMM YYYY, h:mm"
                      )}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 d-flex flex-column py-5 px-15">
                    <strong>Tanggal Selesai Registrasi</strong>{" "}
                    <span>
                      {moment(activityForm[0].register_end_date).format(
                        "D MMMM YYYY, h:mm"
                      )}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 d-flex flex-column py-5 px-15">
                    <strong>Tanggal Mulai Kegiatan</strong>{" "}
                    <span>
                      {moment(activityForm[0].begin_date).format(
                        "D MMMM YYYY, h:mm"
                      )}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 d-flex flex-column py-5 px-15">
                    <strong>Tanggal Selesai Kegiatan</strong>{" "}
                    <span>
                      {moment(activityForm[0].end_date).format(
                        "D MMMM YYYY, h:mm"
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <hr className="horizontal-line" />
            <div className="row">
              <div className="col-12 d-flex flex-column py-5 px-15">
                <strong>Deskripsi</strong>
                <div
                  dangerouslySetInnerHTML={{
                    __html: activityForm[0].description
                      ? activityForm[0].description
                      : "Please describe this activity ...",
                  }}
                />
              </div>
            </div>
            <DetailKegiatanModal
              open={open}
              onClose={handleClose}
              data={activityForm[0]}
              categoryList={categoryList}
            />
          </>
        ) : (
          <div className="loading-table">
            <LoadingAnimation table />
          </div>
        )}
      </div>
      <AlertToast
        isOpen={openAlert}
        status="success"
        message="Kegiatan berhasil dirubah."
        onClose={() => setOpenAlert(false)}
      />
    </>
  )
}
export default FormKegiatan
