// Base
//import React from "react"
// import { Route, Redirect, HashRouter } from 'react-router-dom'
import clsx from 'clsx'

// Material UI
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AccountTreeIcon from '@material-ui/icons/AccountTree'

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import AddIcon from '@material-ui/icons/Add'
import GroupIcon from '@material-ui/icons/Group'
import AssignmentIcon from '@material-ui/icons/Assignment'
import ReceiptIcon from '@material-ui/icons/Receipt'
import SettingsIcon from '@material-ui/icons/Settings'


import TableData from '../TableData/TableData'
import New from '../New/New'




import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'



// UX
const drawerWidth = 240

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
})

const autoBind = require('auto-bind')
class App extends Component {
  constructor( props ) {
    super( props )
    this.state = { 
      openDrawer: true,
      anchorEl: null,
      openMenu: false,
      sectionToShow: ['table', 'projects'],
      update: true
    }
    autoBind( this )
  }

  
    handleDrawerOpen = () => {
      this.setState({ openDrawer: true })
    }
    handleDrawerClose = () => {
      this.setState({ openDrawer: false })
    }
    //const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  
    handleMenuOpen = (event) => {
      this.setState({ anchorEl: event.currentTarget, openMenu: true })
    }
  
    handleMenuClose = () => {
      this.setState({ anchorEl: null, openMenu: false })
    }
  
    changeToSection = (section) => {
      this.setState({ sectionToShow: section, update: true })
    }

    renderSection = () => {
      console.log('renderSection', this.state.sectionToShow)
      var rst = ''
      if(this.state.sectionToShow[0] === 'table') {
        rst = <TableData section={ this.state.sectionToShow[1] } />
      } else if(this.state.sectionToShow[0] === 'new') {
        rst = <New section={ this.state.sectionToShow[1]  } />
      }
      return rst
    }

  render = () => {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, this.state.openDrawer && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={ this.handleDrawerOpen }
              className={ (classes.menuButton, this.state.openDrawer && classes.menuButtonHidden) }
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Data Governance
            </Typography>
            <div>
              <IconButton color="inherit" onClick={ this.handleMenuOpen }>
                <AddIcon />
              </IconButton>
              <Menu
                  id="menu-appbar"
                  anchorEl={ this.state.anchorEl }
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={ this.state.openMenu }
                  onClose={ this.handleMenuClose }
                >
                  <MenuItem onClick = { () => { this.changeToSection(['new', 'project']); this.handleMenuClose() } }><AccountTreeIcon />{ " " }Project</MenuItem>
                  <MenuItem onClick = { () => { this.changeToSection(['new', 'configuration']); this.handleMenuClose() } }><SettingsIcon />{ " " }Configurations</MenuItem>
                  <MenuItem onClick = { () => { this.changeToSection(['new', 'issue']); this.handleMenuClose() } }><ReceiptIcon />{ " " }Issue</MenuItem>
                </Menu>
                </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !this.state.openDrawer && classes.drawerPaperClose),
          }}
          openDrawer={ this.state.openDrawer }
        >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={ this.handleDrawerClose }>
            <ChevronLeftIcon />
            </IconButton>
        </div>
        <Divider />
          <List>
            <ListItem button onClick = { () => { this.changeToSection(['table', 'projects']) } }>
              <ListItemIcon>
                <AccountTreeIcon />
              </ListItemIcon>
              <ListItemText primary="Projects" />
            </ListItem>
            <ListItem button onClick = { () => { this.changeToSection(['table', 'configurations']) } }>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Configurations" />
            </ListItem>
            <ListItem button onClick = { () => { this.changeToSection(['table', 'issues']) } }>
              <ListItemIcon>
                <ReceiptIcon />
              </ListItemIcon>
              <ListItemText primary="Issues" />
            </ListItem>
            <ListItem button onClick = { () => { this.changeToSection(['table', 'samples']) } }>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Samples" />
            </ListItem>
          </List>
        <Divider />
          <List>
          <ListItem button onClick = { () => { this.changeToSection(['report', 'project']) } }>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Project" />
            </ListItem>
            <ListItem button onClick = { () => { this.changeToSection(['report', 'issue']) } }>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Issue" />
            </ListItem>
          </List>
        <Divider />
      </Drawer> 
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  { this.renderSection() }
                </Paper>
              </Grid>
            </Grid>
        </Container>
        </main>
    </div>
    )
      
  }
}

export default withStyles(styles)(App)






// Configuration
// const config = window.config

