import React from 'react'
import { Grid } from 'semantic-ui-react';

const ZYBaseGrid = ({ menu, contents }) => {

    return (
        <div >
            <Grid>
                <Grid.Row>
                    <Grid.Column width={4}>
                        {menu}
                    </Grid.Column>
                    <Grid.Column width={12}>
                        {contents}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>

    )

};

export default ZYBaseGrid;