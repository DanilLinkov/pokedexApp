import React, { useEffect, useState } from "react";
import {
  Typography,
  CircularProgress,
  Button,
  Grid,
  Box,
} from "@material-ui/core";
import axios from "axios";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import ProgressBar from "./ProgressBar";
import { RouteComponentProps } from "react-router-dom";
import TypeColor from "./TypeColor";
import { toFirstCharUppercase } from "../pokedex/constants/constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(1),
        width: theme.spacing(150),
        height: theme.spacing(100),
      },
    },
  })
);

const Pokemon = (props: RouteComponentProps<any>) => {
  const classes = useStyles();
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemonUrlData, setPokemonUrlData] = useState(undefined);
  const [pokemonSpeciesUrlData, setPokemonSpeciesUrlData] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
      .then(function (response: any) {
        setPokemonSpeciesUrlData(response);
      })
      .catch(function (error: any) {
        setPokemonSpeciesUrlData(undefined);
      });

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response: any) {
        setPokemonUrlData(response);
      })
      .catch(function (error: any) {
        setPokemonUrlData(undefined);
      });
  }, [pokemonId]);

  const generatePokemonJSX = (pokemonRes: any, res: any) => {
    const name = pokemonRes.data.name;
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;

    let { hp, attack, defense, speed, specialAttack, specialDefense }: any = "";

    pokemonRes.data.stats.map((stat: any) => {
      switch (stat.stat.name) {
        case "hp":
          hp = stat["base_stat"];
          break;
        case "attack":
          attack = stat["base_stat"];
          break;
        case "defense":
          defense = stat["base_stat"];
          break;
        case "speed":
          speed = stat["base_stat"];
          break;
        case "special-attack":
          specialAttack = stat["base_stat"];
          break;
        case "special-defense":
          specialDefense = stat["base_stat"];
          break;
        default:
          break;
      }
    });

    const height =
      Math.round((pokemonRes.data.height * 0.328084 + 0.00001) * 100) / 100;

    const weight =
      Math.round((pokemonRes.data.weight * 0.220462 + 0.00001) * 100) / 100;

    const types = pokemonRes.data.types.map(
      (type: { type: { name: any } }) => type.type.name
    );

    const abilities = pokemonRes.data.abilities
      .map((ability: any) => {
        return ability.ability.name
          .toLowerCase()
          .split("-")
          .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ");
      })
      .join(", ");

    const evs = pokemonRes.data.stats
      .filter((stat: any) => {
        if (stat.effort > 0) {
          return true;
        }
        return false;
      })
      .map((stat: any) => {
        return `${stat.effort} ${stat.stat.name
          .toLowerCase()
          .split("-")
          .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ")}`;
      })
      .join(", ");

    const femaleRate = res.data["gender_rate"];
    const genderRatioFemale = 12.5 * femaleRate;
    const genderRatioMale = 12.5 * (8 - femaleRate);
    const catchRate = Math.round((100 / 255) * res.data["capture_rate"]);

    const eggGroups = res.data["egg_groups"]
      .map((group: any) => {
        return group.name
          .toLowerCase()
          .split(" ")
          .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ");
      })
      .join(", ");

    const hatchSteps = 255 * (res.data["hatch_counter"] + 1);
    return (
      <div className={classes.root}>
        <Box bgcolor="pink" paddingBottom="20px">
          <Box
            bgcolor="#ff5f40"
            style={{
              justifyContent: "space-between",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Typography variant="h3" style={{ marginLeft: "8px" }}>
              {pokemonId}
            </Typography>
            <div style={{ marginRight: "10px" }}>
              {types.map((type: any) => (
                <TypeColor key={type} type={type} />
              ))}
            </div>
          </Box>
          <Box width="250px" margin="auto">
            <img
              src={imageUrl}
              alt={"Pokemon Image"}
              style={{ width: "250px", height: "250px", marginTop: "10px" }}
            />
            <Typography align="center" variant="h3">
              {toFirstCharUppercase(name!)}
            </Typography>
          </Box>
          <Box bgcolor={"#AFDBF5"} width="95%" margin="auto" marginTop="2px">
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid container item xs={7}>
                <Grid
                  container
                  item
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid
                    item
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography>HP :</Typography>
                    </Grid>
                    <Grid item></Grid>
                    <div style={{ width: "420px" }}>
                      <ProgressBar bgcolor={"#24a19c"} completed={hp} />
                    </div>
                  </Grid>

                  <Grid
                    item
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography>Attack :</Typography>
                    </Grid>
                    <Grid item>
                      <div style={{ width: "420px" }}>
                        <ProgressBar bgcolor={"#24a19c"} completed={attack} />
                      </div>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography>Defense :</Typography>
                    </Grid>
                    <Grid item>
                      <div style={{ width: "420px" }}>
                        <ProgressBar bgcolor={"#24a19c"} completed={defense} />
                      </div>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography>Speed :</Typography>
                    </Grid>
                    <Grid item>
                      <div style={{ width: "420px" }}>
                        <ProgressBar bgcolor={"#24a19c"} completed={speed} />
                      </div>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography>Special Attack :</Typography>
                    </Grid>
                    <Grid item>
                      <div style={{ width: "420px" }}>
                        <ProgressBar
                          bgcolor={"#24a19c"}
                          completed={specialAttack}
                        />
                      </div>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography>Special Defense :</Typography>
                    </Grid>
                    <Grid item>
                      <div style={{ width: "420px" }}>
                        <ProgressBar
                          bgcolor={"#24a19c"}
                          completed={specialDefense}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Typography
              align={"center"}
              variant="h5"
              style={{ marginTop: "20px" }}
            >
              Profile
            </Typography>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={8}
            >
              <Grid container item xs={5} spacing={8}>
                <Grid
                  container
                  item
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid
                    item
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography>Height:</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{height} ft</Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography>Weight:</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{weight} lbs</Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography>Catch Rate:</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{catchRate}%</Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography>Gender Ratio:</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        {genderRatioMale}/{genderRatioFemale} (M/F)
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item xs={5} spacing={8}>
                <Grid
                  container
                  item
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid
                    item
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography>Egg Groups:</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{eggGroups}</Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography>Hatch Steps:</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{hatchSteps}</Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography>Abilities:</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{abilities}</Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography>EVs:</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{evs}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {pokemonUrlData === undefined && pokemonSpeciesUrlData && (
        <CircularProgress />
      )}
      {pokemonUrlData !== undefined &&
        pokemonUrlData &&
        pokemonSpeciesUrlData !== undefined &&
        pokemonSpeciesUrlData &&
        generatePokemonJSX(pokemonUrlData, pokemonSpeciesUrlData)}
      {pokemonUrlData === false && pokemonSpeciesUrlData === false && (
        <Typography> Pokemon not found</Typography>
      )}
      {pokemonUrlData !== undefined && pokemonSpeciesUrlData !== undefined && (
        <Box>
          <Button
            style={{ margin: "10px" }}
            color="primary"
            variant="contained"
            disabled={!(parseInt(pokemonId) - 1 > 0)}
            onClick={() => history.push(`/${parseInt(pokemonId) - 1}`)}
          >
            Left
          </Button>
          <Button
            style={{ margin: "10px" }}
            color="primary"
            variant="contained"
            onClick={() => history.push("/")}
          >
            back to pokedex
          </Button>
          <Button
            style={{ margin: "10px" }}
            color="primary"
            variant="contained"
            disabled={!(parseInt(pokemonId) - 1 < 720)}
            onClick={() => history.push(`/${parseInt(pokemonId) + 1}`)}
          >
            Right
          </Button>
        </Box>
      )}
    </div>
  );
};
export default Pokemon;
