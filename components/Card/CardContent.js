import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import {BiChevronRight} from 'react-icons/bi'
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: "100%",
    display: "flex",
    flexDirection:"column",
    justifyContent: "space-around",
    alignItems: "center"
  },
  action: {
    display: "flex",
    alignItems: "center",
    fontWeight: 700,
    color: "#ffcc5c",
    margin: "auto 0 0",
    fontSize: 14,
  }
});

export default function ImgMediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={props.image}
          title="Contemplative Reptile"
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent>
      <CardActions>
        <Link to={props.linkPath} className={classes.action}>
          {props.linkText} <BiChevronRight className="ml-2" />
        </Link>
        
      </CardActions>
    </Card>
  );
}