import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react'
import '../../css/Navi.css'
import Login from './Login';
import Logout from './Logout';


export default function Navi() {

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const history = useHistory()

    function handleSingOut() {
        setIsAuthenticated(false)
        history.push("/")

    }
    function handleSingIn() {
        setIsAuthenticated(true)
    }
    return (
        <div className="Navi" style={{ backgroundColor: "black", color: "white" }}>
            <div>
                <Menu inverted fixed='top'>
                    <Container>
                        <Menu.Item as={NavLink} to="/" style={{ marginLeft: "3em", marginTop: "0.3em", color: "white", position: "left" }}
                            name='Anasayfa'
                        />
                        <Menu.Menu position='right'>
                            {isAuthenticated ? <Login logOut={handleSingOut} />
                                : <Logout logIn={handleSingIn} />}
                        </Menu.Menu>

                    </Container>

                </Menu>
            </div>

        </div>

    );
}
