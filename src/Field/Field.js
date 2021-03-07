import React, { useState,useEffect } from 'react';
import SelectField from '../SelectField/SelectField';
import AnimeCard from '../Card/AnimeCard';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    //flexGrow: 1,
  },
  animecard: {
    height: 160,
    width: 80,
  },
}));

export default function Field() {
  const [loading, setLoading] = useState(true);
  const [animeinfo, setAnimeInfo] = useState([]);
  const [year, setYear] = useState('2021');
  const [season, setSeason] = useState('1');
  const classes = useStyles();

    useEffect(() => {
      const apiURL = `http://api.moemoe.tokyo/anime/v1/master/${year}/${season}`;
      fetch(apiURL,{mode:'cors'})
        .then(response => response.json())
        .then( async (jsonobj) => {
          let tmparray = [];
          for(let i in jsonobj) {
              const img = await ogpImgGet(jsonobj[i].public_url);
              let tmparray2= {
                  title:jsonobj[i].title,
                  public_url:jsonobj[i].public_url,
                  city_name:jsonobj[i].city_name,
                  img: img,
              };
              tmparray.push(tmparray2);
          };
          setAnimeInfo(tmparray);
          setLoading(false);
          return tmparray;
        })
        .then((result) => console.log(result[0]));
    },[year,season]);

  const settingYear = returnYear => {
    setYear(returnYear);
  }
  const settingSeason = returnSeason => {
    setSeason(returnSeason);
  }

  const ogpImgGet = url => {
    const backendURL = 'http://localhost:4000/getOgp';
    const data = { reqURL: url };
    const imgSrc = 
    fetch(backendURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(jsonobj => {
        console.log('Success:', jsonobj);
        return jsonobj.imgSrc;
    })
    .catch((error) => {
        console.error('Error:', error);
        return null;
    });
    return new Promise((resolve, reject) => {
      resolve(imgSrc);
    });
  };


  return (
    <React.Fragment>
        <SelectField 
          settingYear={settingYear} 
          settingSeason={settingSeason} 
          defaultYear={year}
          defaultSeason={season}
        />
        {loading ? (
         <span>loading...</span>
         ) : animeinfo.length ? (
          <Grid container className={classes.root} spacing={1}>
            {/*<Grid item xs={12}>*/}
                {/*<Grid container justify="center" spacing={2}>*/}
                    {animeinfo.map((anime,index) => (
                        <Grid key={index} item xs={3}>
                          <AnimeCard 
                            //keyは不要だがエラーが出ないようにするために入れている。
                            //https://ja.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
                            key={index}
                            img={anime.img}
                            title={anime.title} 
                            public_url={anime.public_url} 
                            city_name={anime.city_name}
                            className={classes.animecard}
                          />
                        </Grid>
                    ))}
                {/*</Grid>*/}
            {/*</Grid>*/}
          </Grid>
         ) : (
          <p>データがありません。</p>
         )              
        }
    </React.Fragment>
  );
}