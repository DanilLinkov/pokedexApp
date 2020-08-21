import React, { useState, useEffect } from 'react';
import SingleCard from './SingleCard';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => (
    {
        pokedexContainer: {
            paddingTop: "20px",
            paddingLeft: "150px",
            paddingRight: "150px",
            marginTop:"100px"
        }, 
    }
));

interface ICardGridProps {
    SearchQuery: (string | null),
    GenFilter: {
        gen1:boolean,
        gen2:boolean,
        gen3:boolean,
        gen4:boolean,
        gen5:boolean,
        gen6:boolean,
    },
    CardClicked: (id: string) => void,
}

interface ICards {
    [id:string]:{
        id: (number|string),
        name: (string|null),
        sprite: (string|null),
    }
}

interface IPokemonApiInfo {
    name: (string|null),
    url: (string|null),
}

const CardGrid = (props:ICardGridProps) => {
    const [Cards,setCards] = useState<ICards>({});
    const classes = useStyles();

    useEffect(() => {
        axios
          .get(`https://pokeapi.co/api/v2/pokemon?limit=721`)
          .then(function (response) {
            const { data } = response;
            const { results } = data;
            const newPokemonData:ICards = {};
            results.forEach((pokemon:(IPokemonApiInfo),index:number) =>{
                    let pokemonIdNumber:number = index+1;
                    if(pokemon.name?.toLowerCase()!.includes(props.SearchQuery?.toLowerCase()!))
                    {
                        if((props.GenFilter.gen1 && (pokemonIdNumber>=1) && (pokemonIdNumber<=151)) || 
                        (props.GenFilter.gen2 && (pokemonIdNumber>=152) && (pokemonIdNumber<=251)) || 
                        (props.GenFilter.gen3 && (pokemonIdNumber>=252) && (pokemonIdNumber<=386)) ||
                        (props.GenFilter.gen4 && (pokemonIdNumber>=387) && (pokemonIdNumber<=493)) ||
                        (props.GenFilter.gen5 && (pokemonIdNumber>=494) && (pokemonIdNumber<=649)) ||
                        (props.GenFilter.gen6 && (pokemonIdNumber>=650) && (pokemonIdNumber<=721)))
                        {
                            (newPokemonData)[pokemonIdNumber] = {
                                id: pokemonIdNumber,
                                name: pokemon.name,
                                sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIdNumber}.png`,
                            }
                        }

                    }
                }
            ); 
            setCards(newPokemonData);
          });
      }, [props.SearchQuery,props.GenFilter]);   


    return (
        <Grid container spacing={5} className={classes.pokedexContainer}>
        {
            Object.keys(Cards).map(
                (pokemonId) =>
                    <SingleCard key={pokemonId} CardClicked={props.CardClicked} pokemon={(Cards as ICards)[pokemonId]}/>
            )
        }
        </Grid>    
    )
}

export default CardGrid;
