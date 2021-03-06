import moment from "moment";
import { NavLink } from "react-router-dom";
import { Button, Segment, Table } from "semantic-ui-react";

const JobAdvertisementDetailsSegment = ({ jobAdvertisement, url }) => {

    return (
        <Segment.Group>
            <Segment style={{ backgroundColor: "black" }}>
                <h3 style={{ backgroundColor: "black", color: "white", marginLeft: "1em", fontFamily: "Arial, Helvetica, sans-serif" }} >
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
                        <Button as={NavLink} to={url} style={{ backgroundColor: "black", color: "white", marginLeft: "0.5em", marginBottom: "0.001em" }} >Geri Dön</Button>
                    </td>
                </tr>
            </Table>
        </Segment.Group>
    )
}
export default JobAdvertisementDetailsSegment;