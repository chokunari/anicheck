import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
  },
});

export default function AnimeCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea 
          href={props.public_url} 
          target="_blank" 
          //セキュリティ対策
          //https://web.dev/external-anchors-use-rel-noopener/
          rel="noopener noreferrer"
      >
        <CardMedia
          component="img"
          alt="NoImage"
          height="100"
          //画像パスはpublic配下からの相対パスで指定。属性はimgでもsrcでもOK。
          src="/static/yurucamp.jpg"
          //src="https://drive.google.com/file/d/1OFecsV581TwGEvBPR4gp7UTPCLDyqLVM/view?usp=sharing"
          /*image={props.img ? (
            //props.img
            //'https://drive.google.com/file/d/1OFecsV581TwGEvBPR4gp7UTPCLDyqLVM/view?usp=sharing'
            "/App/tmp/yurucamp.jpg"
          ):(
            //'https://drive.google.com/file/d/1OFecsV581TwGEvBPR4gp7UTPCLDyqLVM/view?usp=sharing'
            "/App/tmp/yurucamp.jpg"
          )}*/
          title="ImageData"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
              {`公式サイト：${props.public_url}`}
              <br/>
              {props.city_name ? (
                  `聖地：${props.city_name}`
              ):(
                  '聖地：データなし'
              )}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}