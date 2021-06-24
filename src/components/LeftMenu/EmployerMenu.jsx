import React from 'react'
import {  NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import '../../css/LeftMenu.css'

export default function EmployerMenu() {
    return (
        <div>
            <Menu fluid vertical className="leftMenuOne" >
                <Menu.Item className='leftMenu' as={NavLink} to="/jobAdvertisement" style={{ backgroundColor: 'black', color: 'white' }} name="Anasayfa"> Anasayfa </Menu.Item>
                <Menu.Item className="leftMenu" as={NavLink} to="/jobAdvertisement" >İş İlanları</Menu.Item>
                <Menu.Item className="leftMenu" as={NavLink} to="/jobAdvertisementAdd" >İş İlanı Ekle </Menu.Item>
                <Menu.Item className="leftMenu" as={NavLink} to="/jobAdvertisementForEmployer/20" >Firmaya Ait Tüm İş İlanları </Menu.Item>
                <Menu.Item className="leftMenu" as={NavLink} to="/activeJobAdvertisement/20" >Firmaya Ait Aktif İş İlanları </Menu.Item>
                <Menu.Item className="leftMenu" as={NavLink} to="/passiveJobAdvertisement/20" >Firmaya Ait Pasif İş İlanları </Menu.Item>
                
            </Menu>
            
        </div>
    )
}
