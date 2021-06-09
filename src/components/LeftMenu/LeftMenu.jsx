import React from 'react'
import { Menu } from 'semantic-ui-react'
import '../../index.css'

export default function LeftMenu() {
    return (
        <div>
            <Menu fluid vertical color='orange'>
                <Menu.Item className="leftMenu" 
                    name='run'
                />
                <Menu.Item className="leftMenu"
                    name='walk'
                />
                <Menu.Item className="leftMenu"
                    name='bike'
                />
            </Menu>
        </div>
    )
}
