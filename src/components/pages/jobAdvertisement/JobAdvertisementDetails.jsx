import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Segment, Table } from 'semantic-ui-react'
import JobAdvertisementService from '../../services/JobAdvertisementService'
import '../../../css/JobAdvertisement.css'

export default function JobAdvertisementDetails() {

    let { jobAdvertisementId } = useParams()

    const [jobAdvertisement, setJobAdvertisement] = useState({})

    useEffect(() => {
        let jobAdvertisementService = new JobAdvertisementService()
        jobAdvertisementService.getJobAdvertisementByJobAdvertisementId(jobAdvertisementId).then(result => setJobAdvertisement(result.data.data))
    }, [])


    return (
        <div>
            <Segment.Group>
                <Segment><h3 >İş İlanı - {jobAdvertisement.position?.positionName}</h3></Segment>
                <Table className="jobAdvertisementTable">
                    <tr>
                        <td className="leftTd" >
                            <p>İş Tanımı:</p>
                        </td>
                        <td className="rightTd" >
                            <p>{jobAdvertisement.jobDescription}</p>
                        </td>
                    </tr>
                    <tr>
                        <td className="leftTd" >
                            <p>Pozisyon Adı:</p>
                        </td>
                        <td className="rightTd">
                            <p>{jobAdvertisement.position?.positionName}</p>
                        </td>

                    </tr>
                    <tr>
                        <td className="leftTd" >
                            <p>Şehir:</p>
                        </td>
                        <td className="rightTd" >
                            <p>{jobAdvertisement.city?.cityName}</p>
                        </td>
                    </tr>
                    <tr>
                        <td className="leftTd" >
                            <p>Maksimum Maaş:</p>
                        </td>
                        <td className="rightTd" >
                            <p>{jobAdvertisement.maxSalary}</p>
                        </td>

                    </tr>
                    <tr>
                        <td className="leftTd" >
                            <p>Minimum Maaş:</p>
                        </td>
                        <td className="rightTd" >
                            <p>{jobAdvertisement.minSalary}</p>
                        </td>
                    </tr>
                    <tr>
                        <td className="leftTd" >
                            <p>Son Başvuru Tarihi:</p>
                        </td>
                        <td className="rightTd" >
                            <p>{jobAdvertisement.applicationDeadline}</p>
                        </td>

                    </tr>
                    <tr>
                        <td className="leftTd" >
                            <p>Alınacak Kişi Sayısı:</p>
                        </td>
                        <td className="rightTd" >
                            <p>{jobAdvertisement.positionAmount}</p>
                        </td>
                    </tr>
                    <tr>
                        <td className="leftTd" >
                            <p>Çalışma Türü:</p>
                        </td>
                        <td className="rightTd" >
                            <p>{jobAdvertisement.workType?.workTypeName}</p>
                        </td>

                    </tr>
                    <tr>
                        <td className="leftTd" >
                            <p>Çalışma Zamanı Türü:</p>
                        </td>
                        <td className="rightTd" >
                            <p>{jobAdvertisement.workTimeType?.workTimeTypeName}</p>
                        </td>
                    </tr>
                    <tr>
                        <td className="leftTd" >
                            <p>Firma Adı:</p>
                        </td>
                        <td className="rightTd" >
                            <p>{jobAdvertisement.employer?.companyName}</p>
                        </td>

                    </tr>
                    <tr>
                        <td className="leftTd" >
                            <p>Web Sitesi:</p>
                        </td>
                        <td className="rightTd" >
                            <p>{jobAdvertisement.employer?.website}</p>
                        </td>

                    </tr>
                </Table>
            </Segment.Group>

        </div>
    )
}
