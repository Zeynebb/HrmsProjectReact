import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify'
import { Grid } from 'semantic-ui-react'
import LeftMenu from '../LeftMenu/LeftMenu'
import MainLayout from '../mainLayout/MainLayout'
import MainPage from '../pages/mainPage/MainPage'
import '../../css/MainLayout.css'

export default class Dashboard extends Component {
    render() {
        return (
            <div >
                <ToastContainer
                    position="bottom-left"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <div>
                    <MainLayout ></MainLayout>
                </div>
                {/* <Grid>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <LeftMenu />
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <MainLayout />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                */}

            </div>
        )
    }
}
