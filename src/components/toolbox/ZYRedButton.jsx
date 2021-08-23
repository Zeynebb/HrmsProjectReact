import React from 'react'
import { Button } from 'semantic-ui-react';

const ZYRedButton = ({name}) => {

    return (
        <div >
            <Button style={{ fontFamily:"Arial", color:"white", backgroundColor:"#780000"}}>{name}</Button>
        </div>
    )

};

export default ZYRedButton;