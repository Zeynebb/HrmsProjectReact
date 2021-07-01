import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Button, Segment, Table } from 'semantic-ui-react'
import JobAdvertisementService from '../../services/JobAdvertisementService'
import '../../../css/JobAdvertisement.css'
import * as moment from 'moment'
import { NavLink } from 'react-router-dom'
import FavoriteService from '../../services/FavoriteService'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import '../../../css/JobAdvertisementList.css'

export default function JobAdvertisementDetails() {

    let { jobSeekerId } = useParams()
    let { jobAdvertisementId } = useParams()

    const [jobAdvertisement, setJobAdvertisement] = useState({})
    let favoriteService = new FavoriteService()

    useEffect(() => {
        let jobAdvertisementService = new JobAdvertisementService()
        jobAdvertisementService.getJobAdvertisementByJobAdvertisementId(jobAdvertisementId).then(result => setJobAdvertisement(result.data.data))
    }, [])

    function addFavorite(jobAdvertisementId) {
        let favorite = {
            jobAdvertisement: { jobAdvertisementId: jobAdvertisementId },
            jobSeeker: { userId: jobSeekerId }
        }
        favoriteService.add(favorite).then(result => console.log(result.data.message))

    }
    function deleteFavorite(jobAdvertisementId) {
        favoriteService.deleteByJobAdvertisementId(jobAdvertisementId).then(result => console.log(result.data.message))

    }
    return (
        <div>
            <Segment.Group>
                <Segment style={{ backgroundColor: "black" }}><h3 style={{ backgroundColor: "black", color: "white", marginLeft: "1em", fontFamily: "Arial, Helvetica, sans-serif" }} >
                    İş İlanı - {jobAdvertisement.position?.positionName}</h3>
                </Segment>
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
                            <p>{moment(jobAdvertisement.applicationDeadline).format("DD.MM.yyyy")}</p>
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
                    <tr>
                        <td className="leftTd" >
                        </td>
                        <td className="rightTd" >
                            <Button as={NavLink} to={`/${jobSeekerId}/jobAdvertisement`} style={{ backgroundColor: "black", color: "white", marginLeft: "0.5em", marginBottom: "0.001em" }} >Geri Dön</Button>
                        </td>
                    </tr>
                </Table>
            </Segment.Group>

        </div>
    )
}
