import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function SelectField(props) {
  const classes = useStyles();

  const yearChange = (event) => {
    props.settingYear(event.target.value);
  };
  const seasonChange = (event) => {
    props.settingSeason(event.target.value);
  }; 

  return (
    <div>
      <FormControl className={classes.margin}>
            <InputLabel shrink htmlFor="year-native-label-placeholder">
                放送年
            </InputLabel>
            <NativeSelect
                value={props.defaultYear}
                onChange={yearChange}
                inputProps={{
                  name: 'year',
                  id: 'year-native-label-placeholder',
                }}
            >
                <option value={2021}>2021</option>
                <option value={2020}>2020</option>
                <option value={2019}>2019</option>
                <option value={2018}>2018</option>
                <option value={2017}>2017</option>
                <option value={2016}>2016</option>
                <option value={2015}>2015</option>
                <option value={2014}>2014</option>
                <option value={2013}>2013</option>
                <option value={2012}>2012</option>
                <option value={2011}>2011</option>
                <option value={2010}>2010</option>
                <option value={2009}>2009</option>
                <option value={2008}>2008</option>
                <option value={2007}>2007</option>
                <option value={2006}>2006</option>
                <option value={2005}>2005</option>
                <option value={2004}>2004</option>
                <option value={2003}>2003</option>
                <option value={2001}>2001</option>
                <option value={2000}>2000</option>
                <option value={1999}>1999</option>
                <option value={1998}>1998</option>
                <option value={1997}>1997</option>
                <option value={1996}>1996</option>
                <option value={1995}>1995</option>
                <option value={1994}>1994</option>
                <option value={1993}>1993</option>
                <option value={1992}>1992</option>
                <option value={1991}>1991</option>
                <option value={1990}>1990</option>
                <option value={1989}>1989</option>
                <option value={1988}>1988</option>
                <option value={1987}>1987</option>
                <option value={1986}>1986</option>
                <option value={1985}>1985</option>
                <option value={1984}>1984</option>
                <option value={1983}>1983</option>
                <option value={1982}>1982</option>
                <option value={1981}>1981</option>
                <option value={1980}>1980</option>
            </NativeSelect>
      </FormControl>
      <FormControl className={classes.margin}>
            <InputLabel shrink htmlFor="season-native-label-placeholder">
                クール
            </InputLabel>
            <NativeSelect
                value={props.defaultSeason}
                onChange={seasonChange}
                inputProps={{
                  name: 'season',
                  id: 'season-native-label-placeholder',
                }}
            >
                <option value={1}>1〜3月</option>
                <option value={2}>4〜6月</option>
                <option value={3}>7〜9月</option>
                <option value={4}>10〜12月</option>
            </NativeSelect>
      </FormControl>
    </div>
  );
}