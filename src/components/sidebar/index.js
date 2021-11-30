import React, { useState, useContext, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import {
  Drawer,
  List,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@material-ui/core/"
import { ChevronLeft, ExpandLess, ExpandMore } from "@material-ui/icons"
import Cookies from "js-cookie"
import { AdminContext } from "../../context/AdminContext"
import styled from "./styled"
import data from "./data"
/* eslint-disable */
const Sidebar = () => {
  const token = Cookies.get("token")
  let user
  if (token) {
    user = JSON.parse(Cookies.get("user"))
  }
  const history = useHistory()
  const { state, setState } = useContext(AdminContext)
  const [openCollapse, setOpenCollapse] = useState({})
  const [allowedList, setAllowedList] = useState([])
  const [listDrawer, setListDrawer] = useState(null)
  const classes = styled()
  const handleCollapseToggle = (index) =>
    setOpenCollapse({
      ...openCollapse,
      [index.toString()]: !openCollapse[index],
    })
  const handleDrawerClose = () => setState({ ...state, openDrawer: false })
  const handleRoute = (url) => history.push(url)
  const filterByModul = (privileges) => {
    let allowed = ["dashboard", "setting"]
    if (privileges) {
      const priv = privileges.map(({ name }) => name)
      allowed = [...allowed, ...priv]
      setAllowedList(allowed)
    } else {
      setAllowedList(allowed)
    }
  }
  useEffect(() => {
    if (listDrawer === null || listDrawer.length < 1) {
      filterByModul(user?.privileges)
      let drawerCollapse = {}
      data.forEach((element, index) => {
        if (element.children !== undefined)
          drawerCollapse = { ...drawerCollapse, [index.toString()]: false }
      })
      setListDrawer(data)
      setOpenCollapse(drawerCollapse)
    }
  }, [listDrawer, openCollapse])

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={state.openDrawer}
      classes={{ paper: classes.drawerPaper }}
    >
      <div className={classes.drawerHeader}>
        <IconButton className={classes.icon} onClick={handleDrawerClose}>
          <ChevronLeft />
        </IconButton>
      </div>
      <List>
        {listDrawer &&
          listDrawer.map((value, index) => {
            let child
            if (value.children) {
              child = value.children.filter((x) => allowedList.includes(x.modul))
            }
            return (
              (allowedList.includes(value.modul) ||
                (value.modul === undefined && child.length > 0)) && (
                <Link
                  to={value.url !== undefined ? value.url : "#"}
                  className={classes.drawerList}
                  key={value.id.toString()}
                >
                  <ListItem
                    button
                    onClick={
                      value.url === undefined
                        ? () => handleCollapseToggle(index)
                        : null
                    }
                  >
                    <ListItemIcon className={classes.icon}>
                      {value.icon}
                    </ListItemIcon>
                    <ListItemText primary={value.name} />
                    {value.url === undefined ? (
                      openCollapse[index] ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )
                    ) : null}
                  </ListItem>
                  {value.url === undefined && (
                    <Collapse
                      in={openCollapse[index]}
                      timeout="auto"
                      unmountOnExit
                    >
                      {value.children.map(
                        (child) =>
                          allowedList.includes(child.modul) && (
                            <ListItem
                              button
                              className={classes.nested}
                              key={child.id.toString()}
                              onClick={() => handleRoute(child.url)}
                            >
                              <ListItemIcon />
                              <ListItemText primary={child.name} />
                            </ListItem>
                          )
                      )}
                    </Collapse>
                  )}
                </Link>
              )
            )
          })}
      </List>
    </Drawer>
  )
}
export default Sidebar
