import React from 'react'
import { Menu } from 'semantic-ui-react'

export default function JobSeekerMenu() {
    return (
        <div>
             <Menu fluid vertical color='orange'>
                <Menu.Item className="leftMenu" 
                    name='Anasayfa'
                />
                <Menu.Item className="leftMenu"
                    name='İş İlanları'>İş İlanları</Menu.Item>
                <Menu.Item className="leftMenu"
                    name='Özgeçmiş'>
                    </Menu.Item>
            </Menu>
        </div>
    )
}
