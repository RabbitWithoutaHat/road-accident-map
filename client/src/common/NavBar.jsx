import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import MoreIcon from '@material-ui/icons/MoreVert'
import AccountCircle from '@material-ui/icons/AccountCircle'
import PowerOutlinedIcon from '@material-ui/icons/PowerOutlined'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import {
  IconButton,
  Typography,
  Toolbar,
  AppBar,
  MenuItem,
  Menu,
  fade,
  makeStyles,
} from '@material-ui/core'
import { AuthContext } from '../context/AuthContext'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
  search: {
    position: 'relative',
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  underline: {
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
  },
  searchInput: {
    color: 'white',
    width: 400,
    paddingLeft: 20,
  },
  plusIcon: {
    padding: 0,
    marginRight: theme.spacing(1),
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  autocomplete: {
    width: 260,
    '& .MuiAutocomplete-endAdornment': {
      display: 'none',
    },
  },
}))

export default function NavBar() {
  const classes = useStyles()
  const auth = useContext(AuthContext)
  const history = useHistory()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/auth')
  }
  const profileHandler = event => {
    event.preventDefault()
    history.push('/profile')
  }
  const authHandler = event => {
    event.preventDefault()
    history.push('/auth')
  }
  const mainHandler = event => {
    event.preventDefault()
    history.push('/')
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={profileHandler}>Профиль</MenuItem>
      <MenuItem onClick={logoutHandler}>Выйти</MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Профиль</p>
      </MenuItem>
    </Menu>
  )

  return (
    <div className={classes.grow}>
      <AppBar style={{ backgroundColor: '#182961' }} position="fixed">
        <Toolbar>
          <Typography onClick={mainHandler} className={classes.title} variant="h6" noWrap>
            Карта ДТП
          </Typography>
          <div className={classes.grow} />
          {auth.isAuthenticated ? (
            <>
              <div className={classes.sectionDesktop}>
                <IconButton color="inherit" onClick={profileHandler}>
                  <AccountCircleOutlinedIcon />
                </IconButton>
                <IconButton color="inherit" onClick={logoutHandler}>
                  <ExitToAppIcon />
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
            </>
          ) : (
            <>
              <div className={classes.sectionDesktop}>
                <IconButton color="inherit" onClick={authHandler}>
                  <PowerOutlinedIcon />
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton color="inherit" onClick={authHandler}>
                  <PowerOutlinedIcon />
                </IconButton>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  )
}
