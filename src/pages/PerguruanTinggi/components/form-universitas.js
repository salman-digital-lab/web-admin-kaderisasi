import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import logo from "../../../assets/images/logo-header.png"
import '../../../assets/scss/PerguruanTinggi.scss';
import { UniversitasContext, UniversitasProvider } from "../../../context/AdminUniversitasContext";

const text = <p className="helpertext">Password yang digunakan minimal 6 digit</p>

function createData(id, universitas) {
    return { id, universitas };
}

const CardFormUniversities = () => {
    const formRef = React.useRef();
    let history = useHistory();
    let { id } = useParams()
    const [idRef] = useState(id)

    const { rows, setRows, universitiesState, setUniversitiesState } = useContext(UniversitasContext)

    
    const [NameState, setNameState] = useState({
        name: "",
    })
    
    useEffect(() => {
            axios.get(`https://admin-api-kaderisasi-dev.salmanitb.com/v1/universities`)
                .then(res => {
                    let data = res.data.data
                    data.forEach(e => {
                    if(e.id == idRef ){
                            setNameState({
                                name: e.name
                            })
                        }
                    });
                })
                .catch(err => {
                    console.log(err)
                })
    }, [rows, setRows])




    const handleChange = (event) => {
        let inputan = event.target.value
        setNameState({
            ...NameState,
            name: inputan
        })
    }

    const handleAdd = (event) => {
        event.preventDefault()
        formRef.current.reportValidity()

        let name = NameState.name

        if(idRef === undefined){
            axios.post(`https://admin-api-kaderisasi-dev.salmanitb.com/v1/universities`, { name })
            .then((res) => {
                setNameState({
                    name: "",
                })

                history.push('/PerguruanTinggi')

            })
        }else if(idRef !== undefined){
            axios.put(`https://admin-api-kaderisasi-dev.salmanitb.com/v1/universities/${id}`, { name })
            .then(res => {
                setNameState({
                    name: "",
                })

                history.push('/PerguruanTinggi')


            })
        }

    }
    return (
        <div className="card-register-universitas">
            <img src={logo} alt="logo" className="logo-universitas" />
            <form ref={formRef} className="form-register-universitas" noValidate autoComplete="off">
                <TextField value={NameState.name} onChange={handleChange} className="input-register" required label="Nama Universitas" fullWidth placeholder="Nama Universitas" />
                <Button variant="contained" color="primary" className="btn-register"
                    onClick={handleAdd}
                >Tambah Universitas</Button>
            </form>
        </div>
    )
}

const Formuniversitas = () => {
    return (
        <UniversitasProvider>
            <div className="container-register-universitas">
                <h1 style={{ color: '#999999' }}>Form Universities</h1>
                <div className="content-register-universitas">
                    <CardFormUniversities />
                </div>
            </div>
        </UniversitasProvider>
    )
}



export default Formuniversitas