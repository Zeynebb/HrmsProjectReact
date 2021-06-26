import React from 'react'
import { Menu } from 'semantic-ui-react'
import {  NavLink } from 'react-router-dom'
import '../../css/LeftMenu.css'

export default function JobSeekerMenu() {
    return (
        <div>
             <Menu fluid vertical className="leftMenuOne" >
                <Menu.Item className='leftMenu' as={NavLink} to="/jobAdvertisement" style={{ backgroundColor: 'black', color: 'white' }} name="Anasayfa"> Anasayfa </Menu.Item>
                <Menu.Item className="leftMenu" as={NavLink} to="/jobAdvertisement" >İş İlanları</Menu.Item>
                <Menu.Item className="leftMenu" as={NavLink} to="/cvs/10/cv/2" >Özgeçmiş</Menu.Item>
                <Menu.Item className="leftMenu" as={NavLink} to="/cvs/10" >Özgeçmişler</Menu.Item>
                
            </Menu>
        </div>
    )
}
