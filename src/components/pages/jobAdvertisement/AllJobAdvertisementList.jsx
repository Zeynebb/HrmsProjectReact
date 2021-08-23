import React, { useEffect, useState } from 'react'
import { Grid } from 'semantic-ui-react'
import LeftMenu from '../../LeftMenu/LeftMenu'
import JobAdvertisementService from '../../services/JobAdvertisementService'
import JobAdvertisementListSegment from '../../toolbox/JobAdvertisementListSegment'

export default function AllJobAdvertisementList() {

    let [jobAdvertisements, setJobAdvertisements] = useState([])
    let jobAdvertisementService = new JobAdvertisementService()

    useEffect(() => {
        jobAdvertisementService.getByAdvertisementStatusAndApprovalStatus().then(result => setJobAdvertisements(result.data.data))
    }, [])
    return (
        <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <LeftMenu />
                    </Grid.Column>
                    <Grid.Column width={12}>
                        {jobAdvertisements.map(jobAdvertisement => (
                            <JobAdvertisementListSegment jobAdvertisement={jobAdvertisement}
                                url={`/jobAdvertisementDetailForAll/${jobAdvertisement.jobAdvertisementId}`} />
                        ))
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>


        </div >
    )
}
