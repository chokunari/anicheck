import React, { useState } from "react";
import { fade, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#212121"
    },
  }
});

const useStyles = makeStyles((theme) => ({
  root: {
    //flexGrow: 1,
    display: 'flex'
  },
  search: {
    //position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#9e9e9e',
    '&:hover': {
      backgroundColor: fade('#e0e0e0', 0.90),
    },
    width: '79%',
  },
  searchIcon: {
    padding: theme.spacing(1, 0, 1, 0),
    //height: '100%',
    float: 'right',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: '#212121',
    //検索ボックス内の表示文字数サイズ
    width: '90%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 0, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      //width: '20ch',
      width: '100%',
    },
  },
  searchButton: {
    float: 'right',
    color: '#fafafa',
    backgroundColor: '#2196f3',
    '&:hover': {
      backgroundColor: '#1a237e',
    },
  },
}));


export default function SearchBox(props) {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  
  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  }

  const resetInputField = () => {
    setSearchValue("");
  }

  const callSearchFunction = (e) => {
    //submitするとブラウザが勝手にページリロードするため、それをキャンセルする。
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  }

  return (
      <form>
        <div className={classes.root}>
          <ThemeProvider theme={theme}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon/>
            </div>
            <InputBase
              type="text"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput}}
              placeholder="アニメの作品名を入力"
              inputProps={{ 'aria-label': 'search' }}
              value={searchValue}
              onChange={handleSearchInputChanges}
            />
          </div>
          <input onClick={callSearchFunction} type="submit" value="検索" />
          </ThemeProvider>
        </div>
      </form>

    );
}
