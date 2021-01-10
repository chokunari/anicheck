import React, { useState,useEffect } from 'react';
//import { makeStyles } from '@material-ui/core/styles';
//import Grid from '@material-ui/core/Grid';
import SearchBox from '../SearchBox/SearchBox';

/*
const useStyles = makeStyles({
  statuscard: {
    position: 'relative',
    top: 50,
    left: 100,
  },
});
*/

//const defaultURL = "https://mediaarts-db.bunka.go.jp/api/search?fieldId=animation&categoryId=an-col&sort=date&limit=10"
const defaultURL = 'http://api.moemoe.tokyo/anime/v1/master/2021/1';
const apiURL = "https://mediaarts-db.bunka.go.jp/api/search?fieldId=animation&categoryId=an-colkeyword="
const apiURL_sortdate = "&sort=date";


export default function Field() {
  //const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [animeinfo, setAnimeInfo] = useState([]);
  //const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
    fetch(defaultURL,{mode:'cors'})
      .then(response => response.json())
      .then(jsonparse => {
        setAnimeInfo([
                      JSON.stringify(jsonparse)
                    ]);
        setLoading(false);
      });
  }, []);

  const search = searchValue => {
    setLoading(true);
    //setErrorMessage(null);
    const callURL = apiURL + encodeURIComponent(searchValue) + apiURL_sortdate;
    fetch(callURL,{mode:'cors'})
      .then(response => response.json())
      .then(jsonparse => {
          setAnimeInfo([
            jsonparse.results
          ]);
          setLoading(false);
      });
    };

  return (
    <React.Fragment>
        <SearchBox search={search} />
        {loading ? (
         <span>loading...</span>
         ) :(
            <p>{animeinfo}</p>
         )
        }
    </React.Fragment>
  );
}