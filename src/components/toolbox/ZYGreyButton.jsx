import React from 'react'
import { Button } from 'semantic-ui-react';

const ZYGreyButton = ({name}) => {

    return (
        <div >
            <Button style={{ fontFamily:"Arial", color:"white", backgroundColor:"#787878"}}>{name}</Button>
        </div>
    )

};

export default ZYGreyButton;