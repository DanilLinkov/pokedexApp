import React from "react";
import { Typography } from "@material-ui/core";

interface ITypeDivProps {
    type: string
}

const TypeDiv = (props: ITypeDivProps) => {

    let bgColour: string = "white";
    const { type } = props;

    switch (type) {
        case "normal":
            bgColour = "#C8C4BC";
            break;
        case "fighting":
            bgColour = "#823551D";
            break;
        case "flying":
            bgColour = "#A3B3F7";
            break;
        case "poison":
            bgColour = "#934594";
            break;
        case "ground":
            bgColour = "#D3B357";
            break;
        case "rock":
            bgColour = "#B9A156";
            break;
        case "bug":
            bgColour = "#B1C12E";
            break;
        case "ghost":
            bgColour = "#6060B2";
            break;
        case "steel":
            bgColour = "#B5B5C3";
            break;
        case "fire":
            bgColour = "#E73B0C";
            break;
        case "water":
            bgColour = "#3295F6";
            break;
        case "grass":
            bgColour = "#74C236";
            break;
        case "electric":
            bgColour = "#FCBC17";
            break;
        case "psychic":
            bgColour = "#ED4882";
            break;
        case "ice":
            bgColour = "#A3E7FD";
            break;
        case "dragon":
            bgColour = "#755EDF";
            break;
        case "dark":
            bgColour = "#4F3A2D";
            break;
        case "fairy":
            bgColour = "#F4B1F4";
            break;
    }

    const containerStyles = {
        height: "25px",
        width: '70px',
        backgroundColor: bgColour,
        borderRadius: 50,
        marginLeft: "5px",
        marginRight: "5px",
        marginTop: "5px",
        marginBottom: "5px"
    }

    return (
        <div style={containerStyles}>
            <div>
                <Typography style={{ color: 'White', fontWeight: 'bold', textAlign: "center" }}>{type}</Typography>
            </div>
        </div>
    );
};

export default TypeDiv;