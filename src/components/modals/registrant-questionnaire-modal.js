import React, { useState, useContext, useEffect } from "react"
import { Modal, Fade, Backdrop, Button } from "@material-ui/core"
import { AdminActivityContext } from "../../context/AdminActivityContext"
import styled from "./styled"
/* eslint-disable */

const RegistrantQuestionnaireModal = ({ open, onClose, registrantId }) => {
  const classes = styled()
  const { registrantQuestionnaire, functions } =
    useContext(AdminActivityContext)
  const { getRegistrantQuestionnaire } = functions

  useEffect(() => {
    getRegistrantQuestionnaire(registrantId)
  }, [])

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <div className="form-flex flex-column">
            {registrantQuestionnaire?.status === "SUCCESS" ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Pertanyaan</th>
                    <th scope="col">Jawaban</th>
                  </tr>
                </thead>
                <tbody>
                  {registrantQuestionnaire?.data?.map((x) => (
                    <tr className="tbrow">
                      <td>{x.label}</td>
                      <td>
                        {typeof x.answer === "string"
                          ? x.answer
                          : x.answer.join()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              ""
            )}
            <div className="button-bottom">
              <Button
                onClick={onClose}
                className="button-bottoms-kegiatan"
                variant="contained"
                color="secondary"
              >
                Batal
              </Button>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

export default RegistrantQuestionnaireModal
