import React, { useState } from "react"
import { Button, Divider, List, ListItem, ListItemText } from "@material-ui/core";
import {  ArrowBack, Delete } from "@material-ui/icons";
import { Link } from "react-router-dom";
import data from "../data-admin.json"

const DetailAdmin = () => {
    const [title,] = useState({
        username: <b>Username</b>,
        firstname: <b>First Name</b>,
        lastname: <b>Last Name</b>,
        email: <b>Email</b>,
        password: <b>Password</b>,
    }) 
    return(
        <>
            <div className="nav-detail-admin">
                <Button size="small" className="back-button" variant="outlined">
                    <Link to={'/ListAkunAdmin'}><ArrowBack fontSize="inherit" />KEMBALI</Link>
                </Button>
                <div className="button-group">
                <Button size="small" className="edit-button buttons" variant="contained" color="secondary">Edit</Button>
                <Button size="small" className="delete-button" variant="contained" color="secondary">
                    <Delete fontSize="small" />
                    Hapus</Button>
                </div>
            </div>
            <div className="content-detail-admin">
            <List component="nav" className="detail-admin" aria-label="mailbox folders">
                <ListItem button>
                    <ListItemText primary={title.username}/>
                    <p>{data[0].username}</p>
                </ListItem>
                <Divider />
                <ListItem button divider>
                    <ListItemText primary={title.firstname}/>
                    <p>{data[0].firstname}</p>
                </ListItem>
                <ListItem button>
                    <ListItemText primary={title.lastname} />
                    <p>{data[0].lastname}</p>
                </ListItem>
                <Divider light />
                <ListItem button>
                    <ListItemText primary={title.email} />
                    <p>{data[0].email}</p>
                </ListItem>
                <Divider light />
                <ListItem button>
                    <ListItemText primary={title.password} />
                    <p>{data[0].password}</p>
                </ListItem>
                </List>
            </div>
        </>
    )
}

export default DetailAdmin