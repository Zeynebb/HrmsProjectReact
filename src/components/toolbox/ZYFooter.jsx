import React from 'react'

const ZYFooter = ({ placeHolder }) => {

    return (
        <div >
            <footer style={{ marginLeft: "-10%", marginRight: "-10%", backgroundColor: "black", color: "white" }}>
                {placeHolder}
            </footer>
        </div>
    )

};

export default ZYFooter;