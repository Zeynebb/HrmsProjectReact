import React from 'react'
import { Dropdown, Menu, Image } from 'semantic-ui-react'

export default function Login({logOut}) {
    return (
        <div>
            <Menu.Item>
                <Image avatar spaced="right" src="https://res.cloudinary.com/zeydatabase/image/upload/v1623789231/profileWhite_sziyik.png"></Image>
                <Dropdown pointing="top left" text="Zeyneb">
                    <Dropdown.Menu>
                        <Dropdown.Item text="Bilgilerim" icon="info"/>
                        <Dropdown.Item onClick={logOut} text="Çıkış Yap" icon="sign-out"/>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </div>
    )
}
