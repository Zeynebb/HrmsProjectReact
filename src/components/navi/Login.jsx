import React from 'react'
import { NavLink } from 'react-router-dom'
import { Dropdown, Menu, Image, Container } from 'semantic-ui-react'

//userId bilgisi ekle
export default function Login({ logOut }) {
    return (
        <div>
            <Menu.Item>
                <Image avatar spaced="right" src="https://res.cloudinary.com/zeydatabase/image/upload/v1623789231/profileWhite_sziyik.png"></Image>
                <Dropdown pointing="top left" text="Zeyneb">
                    <Dropdown.Menu>
                        <Dropdown.Item as={NavLink} to={"/profile/24"} text="Bilgilerim" icon="info" />
                        <Dropdown.Item onClick={logOut} text="Çıkış Yap" icon="sign-out" />
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </div>

    )
}
