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
        height: "100%",
        width: "100%",
    },
}));

export default function Field() {
    const classes = useStyles();

    //現在の年・クールを取得
    const nowDate = new Date();
    const nowYear = nowDate.getFullYear();
    const nowMonth = nowDate.getMonth()+1;
    let nowSeason = 1;
    if(nowMonth <= 3){
      //1~3月
      nowSeason = 1;
    }else if(nowMonth >= 4 && nowMonth <= 6){
      //4~6月
      nowSeason = 2;
    }else if(nowMonth >= 7 && nowMonth <= 9){
      //7~9月
      nowSeason = 3;
    }else if(nowMonth >= 10 && nowMonth <= 12){
      //9~12月
      nowSeason = 4;
    }

    const [loading, setLoading] = useState(true);
    const [animeUrls, setAnimeUrls] = useState([]);
    const [animeinfo, setAnimeInfo] = useState([]);
    const [year, setYear] = useState(nowYear);
    const [season, setSeason] = useState(nowSeason);

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
        setLoading(true);
        const control = new AbortController();
        setAnimeInfo([]);
        animeUrls
            .forEach(
                async elem => {
                    let ogpData = await ogpGet(elem.public_url, control.signal);
                    //描画中に年・クールを変更した時＝ogpGetをキャンセルした時、ogpDataはnullになるため初期化処理する。
                    if (!ogpData){
                         ogpData = {
                            imgSrc: "",
                            description: ""
                          };
                    }
                    let tmparray2 = {
                        title: elem.title,
                        public_url: elem.public_url,
                        img: ogpData.imgSrc,
                        description: ogpData.description
                    };
                   !control.signal.aborted &&
                    setAnimeInfo(prevState =>
                        [
                            ...prevState.filter(animeInfo => animeInfo.public_url !== elem.public_url),
                            tmparray2
                        ]
                    );
                    setLoading(false);
                }
            );
        //データなしからデータなしの年・クールに遷移した場合にloadingが消えないバグの対応。
        if(!animeUrls.length){
            setLoading(false);
        }
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

    const ogpGet = (url, signal) => {
        const backendURL = `${process.env.REACT_APP_SERVER_URL}/getOgp`;
        const data = {reqURL: url};
        const ogpData =
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
                    return jsonobj;
                })
                .catch((error) => {
                    console.error('Error:', error);
                    return null;
                });
        return new Promise((resolve, reject) => {
            resolve(ogpData);
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
                        <Grid key={index} item xs={12} sm={6} lg={2}>
                            <AnimeCard
                                //keyは不要だがエラーが出ないようにするために入れている。
                                //https://ja.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
                                key={index}
                                img={anime.img}
                                title={anime.title}
                                public_url={anime.public_url}
                                description={anime.description}
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