import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import JobAdvertisementService from '../../services/JobAdvertisementService'
import JobAdvertisementDetailsSegment from '../../toolbox/JobAdvertisementDetailsSegment'

export default function JobAdvertisementDetailsForAll() {

    let { jobAdvertisementId} = useParams()

    let [ jobAdvertisement, setJobAdvertisement] = useState([])

    let jobAdvertisementService = new JobAdvertisementService()

    useEffect(()=> {
        jobAdvertisementService.getJobAdvertisementByJobAdvertisementId(jobAdvertisementId).then(result => setJobAdvertisement(result.data.data))
    }, [])

    return (
        <div>
            <JobAdvertisementDetailsSegment jobAdvertisement={jobAdvertisement} url={"/jobAdvertisementList"} />
            
        </div>
    )
}
