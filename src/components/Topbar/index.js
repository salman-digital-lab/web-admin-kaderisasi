import React from "react";
import clsx from "clsx";
import logo from '../../assets/images/logo-header.png'
import { AdminContext } from '../../context/AdminContext'
import { styled } from './styled'
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Box } from "@material-ui/core";
import { AccountCircle, MoreVert, Menu as MenuIcon } from '@material-ui/icons';


export const Topbar = (props) => {
  const classes = styled();
  const { state, setState } = React.useContext(AdminContext)
  const isMenuOpen = Boolean(state.anchorEl);
  const isMobileMenuOpen = Boolean(state.mobileMoreAnchorEl);
  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const handleProfileMenuOpen = (event) => setState({ ...state, anchorEl: event.currentTarget })
  const handleMobileMenuClose = () => setState({ ...state, mobileMoreAnchorEl: null, anchorEl: null })
  const handleMenuClose = () => handleMobileMenuClose()
  const handleMobileMenuOpen = (event) => setState({ ...state, mobileMoreAnchorEl: event.currentTarget })
  const handleDrawerOpen = () => setState({ ...state, openDrawer: true })


  const renderProfileMenu = (
    <Menu anchorEl={state.anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={menuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isMenuOpen} onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );


  const renderMobileMenu = (
    <Menu anchorEl={state.mobileMoreAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={mobileMenuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true">
          <AccountCircle className={classes.icon} fontSize='large' />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )


  return (
    <>
      <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: state.openDrawer, })}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" className={clsx(classes.menuButton, state.openDrawer && classes.hide)}>
            <MenuIcon className={classes.icon} />
          </IconButton>
          <img src={logo} alt="" style={{ height: '3.5em', width: 'auto' }} />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Typography className={classes.text} component='div'>
              <Box lineHeight={3} m={1}>
                Hello, Good Morning Admin
              </Box>
            </Typography>
            <IconButton edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen}>
              <AccountCircle className={classes.icon} fontSize='large' />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen}>
              <MoreVert className={classes.icon} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      { renderMobileMenu}
      { renderProfileMenu}
    </>
  )
}
