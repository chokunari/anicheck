import React, { useState,useEffect } from 'react';
//import SearchBox from '../SearchBox/SearchBox';
import SelectField from '../SelectField/SelectField';

//const defaultURL = "https://mediaarts-db.bunka.go.jp/api/search?fieldId=animation&categoryId=an-col&sort=date&limit=10"
const defaultURL = 'http://api.moemoe.tokyo/anime/v1/master/2021/1';
const apiURL = "https://mediaarts-db.bunka.go.jp/api/search?fieldId=animation&categoryId=an-colkeyword="
const apiURL_sortdate = "&sort=date";


export default function Field() {
  //const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [animeinfo, setAnimeInfo] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
    fetch(defaultURL,{mode:'cors'})
      .then(response => response.json())
      .then(jsonobj => {
        
        let tmparray = [];
        //let tmparray2 = {title:"",public_url:"",city_name:""};
        console.log(jsonobj[1].title);
        for(let i in jsonobj) {
            //let tmparray2 = jsonobj[i].title;
            
            let tmparray2= {
                title:jsonobj[i].title,
                public_url:jsonobj[i].public_url,
                city_name:jsonobj[i].city_name
            };
            
            tmparray.push(JSON.stringify(tmparray2));
        };
        setAnimeInfo(tmparray);
        
        //const tmparray = JSON.stringify(jsonobj[0].title);
        //setAnimeInfo(tmparray);
        //console.log(tmparray);
        //setAnimeInfo([JSON.stringify(jsonobj)]);
        setLoading(false);
      });
    });

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
        {/*<SearchBox search={search} />*/}
        <SelectField />
        {loading ? (
         <span>loading...</span>
         ) :(
            <p>{animeinfo}</p>
         )
        }
    </React.Fragment>
  );
}