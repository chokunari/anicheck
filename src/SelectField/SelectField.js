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