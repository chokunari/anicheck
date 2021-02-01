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
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="100"
          image={props.img ? (
            props.img
          ):(
            ""
          )}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
              公式サイト：
              <a 
                href={props.public_url} 
                target="_blank" 
                //セキュリティ対策
                //https://web.dev/external-anchors-use-rel-noopener/
                rel="noopener noreferrer"
                >
                {props.public_url}
              </a>
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