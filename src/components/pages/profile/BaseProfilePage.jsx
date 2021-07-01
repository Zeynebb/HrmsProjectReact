import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import EmployerProfile from '../employers/EmployerProfile'
import EmployerProfileUpdate from '../employers/EmployerProfileUpdate'
import SystemPersonnelProfile from '../systemPersonnels/SystemPersonnelProfile'
import SystemPersonnelProfileUpdate from '../systemPersonnels/SystemPersonnelProfileUpdate'

export default function BaseProfilePage() {

    let { userId } = useParams()

    const systemPersonnelId = useSelector(state => state.systemPersonnel.userId)
    const employerId = useSelector(state => state.employer.userId)

    return (
        <div>
            {/*(systemPersonnelId) > 0 ? <SystemPersonnelProfileUpdate />
                : <SystemPersonnelProfile />*/}
            {(employerId) > 0 ? <EmployerProfileUpdate />
                : <EmployerProfile />}
        </div>
    )
}
