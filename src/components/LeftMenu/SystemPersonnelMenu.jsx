import React from 'react'
import {  NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import '../../css/LeftMenu.css'

export default function SystemPersonnelMenu() {
    return (
        <div>
            <Menu fluid vertical className="leftMenuOne" >
                <Menu.Item className='leftMenu' as={NavLink} to="/jobAdvertisement" style={{ backgroundColor: 'black', color: 'white' }} name="Anasayfa"> Anasayfa </Menu.Item>
                <Menu.Item className="leftMenu" as={NavLink} to="/jobAdvertisement" >İş İlanları</Menu.Item>
                <Menu.Item className="leftMenu" as={NavLink} to="/employerApproval" >İş Veren Onayı</Menu.Item>
                <Menu.Item className="leftMenu" as={NavLink} to="/jobAdvertisementApproval" >İş İlanı Onayı</Menu.Item>   
                
            </Menu>
        </div>
    )
}
