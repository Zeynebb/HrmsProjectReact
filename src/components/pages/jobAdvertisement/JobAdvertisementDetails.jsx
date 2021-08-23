import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import JobAdvertisementService from '../../services/JobAdvertisementService'
import '../../../css/JobAdvertisement.css'
import '../../../css/JobAdvertisementList.css'
import JobAdvertisementDetailsSegment from '../../toolbox/JobAdvertisementDetailsSegment'

export default function JobAdvertisementDetails() {

    let { userId } = useParams()
    let { jobAdvertisementId } = useParams()

    const [jobAdvertisement, setJobAdvertisement] = useState({})

    useEffect(() => {
        let jobAdvertisementService = new JobAdvertisementService()
        jobAdvertisementService.getJobAdvertisementByJobAdvertisementId(jobAdvertisementId).then(result => setJobAdvertisement(result.data.data))
    }, [])
    return (
        <div>
            <JobAdvertisementDetailsSegment jobAdvertisement={jobAdvertisement} url={`/${userId}/jobAdvertisementList`} />

        </div>
    )
}
