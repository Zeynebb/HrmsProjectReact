import React, { useState, useEffect } from 'react'
import JobPositionService from '../../services/JobPositionService'
import { Icon, Menu, Table } from 'semantic-ui-react'

export default function JobPositionList() {

    const [jobPositions, setJobPositions] = useState([])

    useEffect(() => {
        let jobPositionService = new JobPositionService()
        jobPositionService.getJobPositions().then(result => setJobPositions(result.data.data))
    }, [])
    return (
        <div>
            
        </div>
    )
}
