import React from 'react';
import { /*fade,*/ makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import Button from '@material-ui/core/Button';
//import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';
//import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    color: "#fafafa"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "#fafafa"
  },
  /*
  loginbutton: {
    backgroundColor: '#009688',
    right: 15,
  },
  accountbutton: {
    position: 'relative',
    backgroundColor: '#009688',
    right: 15,
    left: 5,
    color: '#fafafa',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.30),
    }
  },
  */
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00bfa5"
    },
    secondary: {
      main: "#1de9b6"
    }
  }
});

export default function NavBar() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
    <div className={classes.root}>
      <AppBar position="static" color="primary" className={classes.appBar}>
        <Toolbar>
          {/*
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
           */}
          <Typography variant="h6" className={classes.title}>
            Anicheck
          </Typography>
          {/* いつかログインボタン実装する？
          <Button color="inherit" className={classes.loginbutton}>Login</Button>
          <Button className={classes.accountbutton}>
            <AccountCircleSharpIcon ></AccountCircleSharpIcon>
          </Button>
          */}
        </Toolbar>
      </AppBar>
    </div>
    </ThemeProvider>
  );
}
