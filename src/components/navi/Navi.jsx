import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'
import '../../index.css'


export default function Navi() {
    return (
        <div>
            <Menu inverted fixed='top'>
                <Container >
                    <Menu.Item
                        name='home'
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Button primary>Register</Button>
                        </Menu.Item>
                        <Menu.Item>
                            <Button secondary >Login</Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu>
        </div>
    )
}
