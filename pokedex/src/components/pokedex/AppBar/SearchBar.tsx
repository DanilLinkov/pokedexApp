import React, { useState } from "react";
import Grid from '@material-ui/core/Grid';
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { TextField, Button } from '@material-ui/core';
import logo from '../../../resources/pokeball.png';
import { IUserInput } from '../../../Common/Interfaces';

const useStyles = makeStyles((theme) => (
    {
        searchContainer: {
            display: "flex",
            backgroundColor: fade(theme.palette.common.white, 0.15),
            paddingLeft: "10px",
            paddingRight: "10px",
            marginLeft: "40px",
            marginRight: "40px",
        },
        searchInput: {
            width: "200px",
            margin: "4px",
        },
    }
));

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

interface ISearchBarProps {
    SetUserInput: (a:IUserInput) => void;
}

const SearchBar = (props: ISearchBarProps) => {
    const classes = useStyles();

    const [SearchQuery, setSearchQuery] = useState<string | null>("");

    const handleSearchQueryChange = (s: string) => {
        setSearchQuery(s);
    }

    const [GenFilter, setGenFilter] = useState<IUserInput["GenFilter"]>({
        gen1: true,
        gen2: false,
        gen3: false,
        gen4: false,
        gen5: false,
        gen6: false,
    });

    const handleGenFilterChnage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGenFilter({ ...GenFilter, [event.target.name]: event.target.checked });
    };

    const handleSubmit = () => {
        if (SearchQuery !== null) {
            let UserInput = {
                SearchQuery: SearchQuery,
                GenFilter: GenFilter,
            }
            props.SetUserInput(UserInput);
        }
    }

    return (
        <AppBar position="fixed" color="default">
            <Toolbar>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Grid item xs={12} sm={2}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <img src={logo} alt="Logo" />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <FormGroup row>
                            <Grid item xs={4}>
                                <FormControlLabel
                                    control={<GreenCheckbox checked={GenFilter.gen1} onChange={handleGenFilterChnage} name="gen1" />}
                                    label="Gen One"
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <FormControlLabel
                                    control={<GreenCheckbox checked={GenFilter.gen2} onChange={handleGenFilterChnage} name="gen2" />}
                                    label="Gen Two"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControlLabel
                                    control={<GreenCheckbox checked={GenFilter.gen3} onChange={handleGenFilterChnage} name="gen3" />}
                                    label="Gen Three"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControlLabel
                                    control={<GreenCheckbox checked={GenFilter.gen4} onChange={handleGenFilterChnage} name="gen4" />}
                                    label="Gen Four"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControlLabel
                                    control={<GreenCheckbox checked={GenFilter.gen5} onChange={handleGenFilterChnage} name="gen5" />}
                                    label="Gen Five"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControlLabel
                                    control={<GreenCheckbox checked={GenFilter.gen6} onChange={handleGenFilterChnage} name="gen6" />}
                                    label="Gen Six"
                                />
                            </Grid>
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <div className={classes.searchContainer}>
                                <TextField
                                    className={classes.searchInput}
                                    onChange={e => handleSearchQueryChange(e.target.value)}
                                    label="Search..."
                                    variant="standard"
                                />
                            </div>
                            <Button variant="contained" color="secondary" onClick={handleSubmit}>Submit</Button>
                        </div>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default SearchBar;