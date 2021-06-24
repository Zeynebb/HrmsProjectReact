import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify'
import { Grid } from 'semantic-ui-react'
import LeftMenu from '../LeftMenu/LeftMenu'
import MainLayout from '../mainLayout/MainLayout'

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <ToastContainer
                    position="bottom-right"
                    autoClose={3500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

                <Grid>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <LeftMenu />
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <MainLayout />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}
