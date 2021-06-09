import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import LeftMenu from '../LeftMenu/LeftMenu'
import MainLayout from '../mainLayout/MainLayout'

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <LeftMenu/>
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <MainLayout/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}
