import React, { useState,useEffect } from 'react';
import SelectField from '../SelectField/SelectField';
import AnimeCard from '../Card/AnimeCard';

export default function Field() {
  const [loading, setLoading] = useState(true);
  const [animeinfo, setAnimeInfo] = useState([]);
  const [year, setYear] = useState('2021');
  const [season, setSeason] = useState('1');

    useEffect(() => {
      const apiURL = `http://api.moemoe.tokyo/anime/v1/master/${year}/${season}`;
      fetch(apiURL,{mode:'cors'})
        .then(response => response.json())
        .then(jsonobj => {
          let tmparray = [];
          for(let i in jsonobj) {
              let tmparray2= {
                  title:jsonobj[i].title,
                  public_url:jsonobj[i].public_url,
                  city_name:jsonobj[i].city_name,
                  img:""
              };
              //tmparray.push(JSON.stringify(tmparray2));
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
          animeinfo.map((anime,index) => (
            <AnimeCard 
              //keyは不要だがエラーが出ないようにするために入れている。
              //https://ja.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
              key={index}
              img={anime.img}
              title={anime.title} 
              public_url={anime.public_url} 
              city_name={anime.city_name}
            />
          ))
         ) : (
          <p>データがありません。</p>
         )
        }
    </React.Fragment>
  );
}