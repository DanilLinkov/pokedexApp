import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "../constants/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 200,
  },
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column", 
  }
}));

interface pokemon {
  id: (number | string),
  name: (string | null),
  sprite: (string | null),
}

interface ISingleCardProps {
  CardClicked: (id: string) => void,
  pokemon: pokemon,
  key: string
}

const SingleCard = (props: any) => {
  const classes = useStyles();

  const createPokemonCard = (pokemon: pokemon) => {
    const { id, name, sprite } = pokemon;
    return (
      <Grid item xs={12} sm={4} key={id}>
        <Card onClick={() => props.CardClicked(id)} className={classes.root} style={{ backgroundColor: "#AFDBF5" }}>
          <CardMedia className={classes.cardMedia} image={sprite!} style={{ width: "140px", height: "140px" }} />
          <CardContent className={classes.cardContent}>
            <Typography variant="h6">
              {`ID: ${id}`}
            </Typography>
            <Typography variant="h6">
              {`Name: ${toFirstCharUppercase(name!)}`}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    )
  }

  return (
    createPokemonCard(props.pokemon)
  )
}

export default SingleCard;