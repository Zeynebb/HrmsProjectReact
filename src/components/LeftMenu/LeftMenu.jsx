import React from 'react'
import '../../css/LeftMenu.css'
import EmployerMenu from './EmployerMenu'
import JobSeekerMenu from './JobSeekerMenu'
import SystemPersonnelMenu from './SystemPersonnelMenu'

//Menüler, kullanıcı statüsüne göre görüntülenecek
export default function LeftMenu() {
    return (
        <div>
            <EmployerMenu/>
            <JobSeekerMenu/>
            <SystemPersonnelMenu/>
        </div>
    )
}
