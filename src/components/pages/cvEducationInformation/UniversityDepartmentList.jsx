import React, { useEffect, useState } from 'react'
import UniversityDepartmentService from '../../services/UniversityDepartmentService'

export default function UniversityDepartmentList() {

    const[universityDepartments , setUniversityDepartments] = useState([])

    useEffect(()=> {
        let universityDepartmentService = new UniversityDepartmentService()
        universityDepartmentService.getUniversityDepartments().then(result => setUniversityDepartments(result.data.data))
    }, [])


    return (
        <div>
            
        </div>
    )
}
