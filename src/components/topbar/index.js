import React from "react"
import clsx from "clsx"
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
} from "@material-ui/core"
import { AccountCircle, MoreVert, Menu as MenuIcon } from "@material-ui/icons"
import { Link } from "react-router-dom"
import CircularProgress from "@material-ui/core/CircularProgress"
import Cookies from "js-cookie"
import styled from "./styled"
import { AdminContext } from "../../context/AdminContext"

/* eslint-disable */
const Topbar = (props) => {
  const classes = styled()
  const token = Cookies.get("token")
  let user
  if (token && Cookies.get("user")) {
    user = JSON.parse(Cookies.get("user"))
  }
  const { state, setState } = React.useContext(AdminContext)
  const [loading, setLoading] = React.useState(true)
  const [isMenuOpen, setIsMenuOpen] = React.useState(Boolean(state.anchorEl))
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(
    Boolean(state.mobileMoreAnchorEl)
  )

  const menuId = "primary-search-account-menu"
  const mobileMenuId = "primary-search-account-menu-mobile"
  const handleProfileMenuOpen = (event) => {
    setIsMenuOpen(true)
    setState({ ...state, anchorEl: event.currentTarget })
  }

  const handleMobileMenuClose = () => {
    setIsMenuOpen(false)
    setIsMobileMenuOpen(false)
    setState({ ...state, mobileMoreAnchorEl: null, anchorEl: null })
  }

  const handleMenuClose = () => handleMobileMenuClose()
  const handleMobileMenuOpen = (event) => {
    setIsMobileMenuOpen(true)
    setState({ ...state, mobileMoreAnchorEl: event.currentTarget })
  }

  const handleToggleDrawer = () =>
    setState({ ...state, openDrawer: !state.openDrawer })

  const handleLogout = () => {
    setTimeout(() => {
      handleMenuClose()
      Cookies.remove("token")
      Cookies.remove("user")
      window.location.href = "/login"
      setLoading(false)
    }, 1000)
  }

  const renderProfileMenu = (
    <Menu
      anchorEl={state.anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link className="neutral-font" to="/profile">
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Link>
      <MenuItem onClick={handleLogout}>
        Logout
        {loading ? (
          false
        ) : (
          <CircularProgress
            size={10}
            color="inherit"
            className="circular-Progress"
          />
        )}
      </MenuItem>
    </Menu>
  )

  const renderMobileMenu = (
    <Menu
      anchorEl={state.mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
        >
          <AccountCircle className={classes.icon} fontSize="large" />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )

  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: state.openDrawer,
        })}
      >
        <Toolbar>
          <IconButton
            color="primary"
            onClick={handleToggleDrawer}
            edge="start"
            className={clsx(classes.menuButton)}
          >
            <MenuIcon className={classes.icon} />
          </IconButton>
          <div className={classes.grow} />
          <Typography className={classes.text} component="div">
            <Box lineHeight={3} m={1}>
              Hello, {user?.username}!
            </Box>
          </Typography>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
            >
              <MoreVert className={classes.icon} />
            </IconButton>
          </div>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            style={{ padding: "5px", marginRight: "5px" }}
          >
            <AccountCircle className={classes.icon} fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderProfileMenu}
    </>
  )
}
export default Topbar
