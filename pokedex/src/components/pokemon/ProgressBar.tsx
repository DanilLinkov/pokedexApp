import React from "react";

interface IProgressBarProps {
    bgcolor: (string | null),
    completed: (string)
}

const ProgressBar = (props: IProgressBarProps) => {
    const { bgcolor, completed } = props;

    const containerStyles = {
        height: 20,
        width: '100%',
        backgroundColor: "#6ebfb5",
        borderRadius: 50,
        marginLeft: "200px",
        marginRight: "200px",
        marginTop: "20px",
    }

    return (
        <div style={containerStyles}>
            <div style={{height: '100%',width: `${parseFloat(completed)/2}%`,backgroundColor: bgcolor!,borderRadius: 'inherit',textAlign: 'right'}}>
                <span style={{padding: 5,color: 'white',fontWeight: 'bold', paddingLeft: 0}}>{`${parseFloat(completed)}`}</span>
            </div>
        </div>
    );
};

export default ProgressBar;