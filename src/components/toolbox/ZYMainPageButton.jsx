import React from 'react'
import { NavLink } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const ZYMainPageButton = ({ name, src }) => {

    return (
        <div >
            <Button as={NavLink} to={src}
                style={{ fontFamily: "Arial", color: "black", backgroundColor: "white", height: 50, width: 300, fontSize: "18px" }}>
                {name}</Button>
        </div>
    )

};

export default ZYMainPageButton;