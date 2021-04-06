import React, {useState, useEffect} from 'react';
import SelectField from '../SelectField/SelectField';
import AnimeCard from '../Card/AnimeCard';
import {makeStyles} from '@material-ui/core/styles';
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
    const [animeUrls, setAnimeUrls] = useState([]);
    const [animeinfo, setAnimeInfo] = useState([]);

    const [year, setYear] = useState('2021');
    const [season, setSeason] = useState('1');
    const classes = useStyles();

    useEffect(() => {
        //ShangriLa Anime API URL
        const apiURL = `https://api.moemoe.tokyo/anime/v1/master/${year}/${season}`;
        //loading...の表示をするためにtrueにする。
        setLoading(true);
        fetch(apiURL, {mode: 'cors'})
            .then(response => response.json())
            .then(async (jsonobj) => {
                setAnimeUrls(jsonobj);
                return jsonobj;
            });
    }, [year, season]);

    useEffect(() => {
        const control = new AbortController();
        setAnimeInfo([]);
        animeUrls
            .forEach(
                async elem => {
                    const img = await ogpImgGet(elem.public_url, control.signal);
                    let tmparray2 = {
                        title: elem.title,
                        public_url: elem.public_url,
                        city_name: elem.city_name,
                        img: img,
                    };
                   !control.signal.aborted &&
                    setAnimeInfo(prevState =>
                        [
                            ...prevState.filter(animeInfo => animeInfo.public_url !== elem.public_url),
                            tmparray2
                        ]
                    );
                    if (animeinfo.length){
                        setLoading(false);
                    }
                }
            );

        return ()=>{
            control.abort()
        }
    }, [animeUrls])

    const settingYear = returnYear => {
        setYear(returnYear);
    }
    const settingSeason = returnSeason => {
        setSeason(returnSeason);
    }

    const ogpImgGet = (url, signal) => {
        const backendURL = `${process.env.REACT_APP_SERVER_URL}/getOgp`;
        const data = {reqURL: url};
        const imgSrc =
            fetch(backendURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                signal
            })
                .then(response => response.json())
                .then(jsonobj => {

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
                    {animeinfo.map((anime, index) => (
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
                </Grid>
            ) : (
                <p>データがありません。</p>
            )
            }
        </React.Fragment>
    );
}