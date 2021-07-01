import React from 'react'
import {  NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import '../../css/LeftMenu.css'

export default function SystemPersonnelMenu() {
    return (
        <div>
            <Menu fluid vertical className="leftMenuOne" >
                <Menu.Item className='leftMenu' as={NavLink} to="/jobAdvertisement" style={{ backgroundColor: 'black', color: 'white' }} name="Anasayfa"> Anasayfa </Menu.Item>
                <Menu.Item className="leftMenu" as={NavLink} to="/approvedJobAdvertisement" >Onaylanmış İş İlanları</Menu.Item>
                <Menu.Item className="leftMenu" as={NavLink} to="/unApprovedJobAdvertisement" >Onaylanmamış İş İlanları</Menu.Item>

                <Menu.Item className="leftMenu" as={NavLink} to="/approvedEmployerList" >Onaylanmış İş Veren Listesi</Menu.Item>
                <Menu.Item className="leftMenu" as={NavLink} to="/unApprovedEmployerList" >Onaylanmamış İş Veren Listesi</Menu.Item>

                <Menu.Item className="leftMenu" as={NavLink} to="/updatedEmployerList" >İş Veren Güncellemesi Onaylama</Menu.Item>
            </Menu>
        </div>
    )
}
