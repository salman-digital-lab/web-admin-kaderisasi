import React from "react"
import clsx from "clsx"
import { Link } from "react-router-dom"
import logo from "../assets/images/logo-header.png"

// Import Material-UI Component
import { makeStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import CssBaseline from "@material-ui/core/CssBaseline"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Collapse from "@material-ui/core/Collapse"
import AccountCircle from "@material-ui/icons/AccountCircle"
import NotificationsIcon from "@material-ui/icons/Notifications"
import Badge from "@material-ui/core/Badge"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"

// Import Icon
import HomeIcon from "@material-ui/icons/Home"
import ArchiveIcon from "@material-ui/icons/Archive"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import MailIcon from "@material-ui/icons/Mail"
import MoreIcon from "@material-ui/icons/MoreVert"

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background:
      "linear-gradient(90deg, rgba(255,255,255,1) 5%, rgba(65,179,255,1) 100%)",
    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "#474747",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  drawerList: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}))

const drawerList = [
  {
    key: 1,
    name: "Dashboard",
    icon: <HomeIcon />,
    url: "/dashboard",
  },
  {
    key: 2,
    name: "Kegiatan & Aktivis",
    icon: <ArchiveIcon />,
    url: "/test",
    children: [
      { key: 1, name: "Text 1", url: "/test" },
      { key: 2, name: "Text 2", url: "/test" },
      { key: 3, name: "Text 3", url: "/test" },
    ],
  },
  {
    key: 3,
    name: "Aktivis & Jamaah",
    icon: <ArchiveIcon />,
    url: "/test",
  },
  {
    key: 4,
    name: "Perguruan Tinggi",
    icon: <ArchiveIcon />,
    url: "/test",
  },
  {
    key: 5,
    name: "Ruang Curhat",
    icon: <ArchiveIcon />,
    url: "/test",
  },
  {
    key: 6,
    name: "Data Administrasi Regional",
    icon: <ArchiveIcon />,
    url: "/test",
  },
  {
    key: 7,
    name: "Public Content Management",
    icon: <ArchiveIcon />,
    url: "/test",
  },
  {
    key: 8,
    name: "Setting",
    icon: <ArchiveIcon />,
    url: "/test",
  },
]

export const AdminNavigation = (props) => {
  const classes = useStyles()
  const [openDrawer, setOpenDrawer] = React.useState(false)
  const [openCollapse, setOpenCollapse] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const handleCollapseToggle = () => {
    setOpenCollapse(!openCollapse)
  }

  const handleDrawerOpen = () => {
    setOpenDrawer(true)
  }

  const handleDrawerClose = () => {
    setOpenDrawer(false)
  }

  const menuId = "primary-search-account-menu"
  const renderProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  )

  const mobileMenuId = "primary-search-account-menu-mobile"
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, openDrawer && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <img src={logo} alt="" style={{ height: "3.5em", width: "auto" }} />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderProfileMenu}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={openDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {drawerList.map((value, index) =>
            value.children === undefined ? (
              <Link
                to={value.url}
                className={classes.drawerList}
                key={value.key}
              >
                <ListItem button key={value.key}>
                  <ListItemIcon>{value.icon}</ListItemIcon>
                  <ListItemText primary={value.name} />
                </ListItem>
              </Link>
            ) : (
              <>
                <ListItem button key={value.key} onClick={handleCollapseToggle}>
                  <ListItemIcon>{value.icon}</ListItemIcon>
                  <ListItemText primary={value.name} />
                  {openCollapse ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding key>
                    {value.children.map((child) => (
                      <Link
                        to={child.url}
                        className={classes.drawerList}
                        key={child.key}
                      >
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                          <ListItemText primary={child.name} />
                        </ListItem>
                      </Link>
                    ))}
                  </List>
                </Collapse>
              </>
            )
          )}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: openDrawer,
        })}
      >
        <div className={classes.drawerHeader} />
        {props.children}
      </main>
    </div>
  )
}
