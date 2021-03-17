import React from "react";
import { Link, useHistory } from 'react-router-dom'
import { AdminContext } from '../../context/AdminContext'
import { styled } from './styled'
import { data } from './data'
import { Drawer, List, IconButton, ListItem, ListItemIcon, ListItemText, Collapse } from "@material-ui/core/";
import { ChevronLeft, ExpandLess, ExpandMore } from "@material-ui/icons";


export const Sidebar = (props) => {
    let history = useHistory()
    const { state, setState } = React.useContext(AdminContext)
    const [openCollapse, setOpenCollapse] = React.useState({})
    const [listDrawer, setListDrawer] = React.useState(null)
    const classes = styled();
    const handleCollapseToggle = (index) => setOpenCollapse({ ...openCollapse, [index.toString()]: !openCollapse[index] })
    const handleDrawerClose = () => setState({ ...state, openDrawer: false })
    const handleRoute = (url) => history.push(url)


    React.useEffect(() => {
        if (listDrawer === null) {
            let drawerCollapse = {}
            data.forEach((element, index) => {
                if (element.children !== undefined)
                    drawerCollapse = { ...drawerCollapse, [index.toString()]: false }
            });
            setListDrawer(data)
            setOpenCollapse(drawerCollapse)
        }
    }, [listDrawer, openCollapse])


    return (
        <Drawer className={classes.drawer} variant="persistent" anchor="left" open={state.openDrawer} classes={{ paper: classes.drawerPaper, }}>
            <div className={classes.drawerHeader}>
                <IconButton className={classes.icon} onClick={handleDrawerClose}>
                    <ChevronLeft />
                </IconButton>
            </div>
            <List>
                {listDrawer && listDrawer.map((value, index) => (
                    <Link to={value.url !== undefined ? value.url : '#'} className={classes.drawerList} key={value.id.toString()}>
                        <ListItem button onClick={value.url === undefined ? () => handleCollapseToggle(index) : null}>
                            <ListItemIcon className={classes.icon}>
                                {value.icon}
                            </ListItemIcon>
                            <ListItemText primary={value.name} />
                            {value.url === undefined ? openCollapse[index] ? <ExpandLess /> : <ExpandMore /> : null}
                        </ListItem>
                        {value.url === undefined && <Collapse in={openCollapse[index]} timeout="auto" unmountOnExit>
                            {value.children.map(child => (
                                <ListItem button className={classes.nested} key={child.id.toString()} onClick={() => handleRoute(child.url)} >
                                    <ListItemIcon />
                                    <ListItemText primary={child.name} />
                                </ListItem>
                            ))}
                        </Collapse>}
                    </Link>
                ))}
            </List>
        </Drawer >
    )
}

