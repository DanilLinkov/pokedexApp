import React, { useState } from "react";
import { RouteComponentProps } from 'react-router-dom';
import SearchBar from './AppBar/SearchBar';
import CardGrid from './cards/CardGrid';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import { IUserInput } from '../../Common/Interfaces';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
})

const Pokedex = (props:RouteComponentProps<any>) => {
    const { history } = props;
    const [UserInput,setUserInput] = useState<IUserInput>({
        SearchQuery: "",
        GenFilter: {
            gen1: true,
            gen2: true,
            gen3: true,
            gen4: true,
            gen5: true,
            gen6: true,
        }
    })

    const SetUserInput = (a:IUserInput) =>{
        setUserInput(a);
    }

    const CardClicked = (id:string) => {
        history.push(`/${id}`);
    }

    return (
        <div>
            <MuiThemeProvider theme={theme}>
                <SearchBar SetUserInput={(a:IUserInput) => SetUserInput(a)}/>   
                <CardGrid SearchQuery={UserInput.SearchQuery} GenFilter={UserInput.GenFilter} CardClicked={(id:string)=>CardClicked(id)}/>        
            </MuiThemeProvider>
        </div>
    )
}

export default Pokedex;