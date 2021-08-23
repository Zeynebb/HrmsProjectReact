import React from 'react'

const ZYTitleH3 = ({ placeHolder, color, fontSize }) => {

    return (
        <div >
            <h3 style={{ fontSize: fontSize, color: color, fontFamily: "Arial", marginBottom: "2%" }}>{placeHolder}</h3>
        </div>
    )

};

export default ZYTitleH3;

export const ZYTitleH2 = ({ placeHolder, color, fontSize }) => {

    return (
        <div >
            <h2 style={{ fontSize: fontSize, color: color, fontFamily: "Arial", marginBottom: "2%", fontWeight: "bold" }}>{placeHolder}</h2>
        </div>
    )

};