import React, { useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react'
import '../../css/Navi.css'
import Login from './Login';
import Logout from './Logout';


export default function JobSeekerNavi() {

    let { userId } = useParams()

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
        <div  >
            <Menu inverted fixed='top' className="naviMenu">
                <Container>
                    <Menu.Item>
                        <Link style={{ marginLeft: "3em", marginTop: "0.3em", color: "white", position: "left", fontSize: "20px", fontFamily: "Arial" }}
                            to="/">Anasayfa</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link style={{ marginLeft: "1em", marginTop: "0.3em", color: "white", position: "left", fontSize: "18px", fontFamily: "Arial" }}
                            to="/10/jobAdvertisement">İş İlanları</Link>
                        <Link style={{ marginLeft: "1em", marginTop: "0.3em", color: "white", position: "left", fontSize: "18px", fontFamily: "Arial" }}
                            to="/cvs/10">Özgeçmişler</Link>
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        {isAuthenticated ?
                            <Login logOut={handleSingOut} />
                            : <Logout logIn={handleSingIn} />}
                    </Menu.Menu>

                </Container>

            </Menu>
        </div>
    );
}
