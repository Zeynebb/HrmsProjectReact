import { NavLink } from "react-router-dom";
import { Button, Image, Segment } from "semantic-ui-react";


const JobAdvertisementListSegment = ({ jobAdvertisement, url }) => {

    return (

        <div style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
            <Segment.Group piled>
                <Segment style={{ backgroundColor: "black" }}>
                    <h3 style={{ backgroundColor: "black", color: "white", textAlign: "left", marginLeft: "1em", fontFamily: "Arial, Helvetica, sans-serif" }}>
                        İş İlanı - {jobAdvertisement.position?.positionName}</h3></Segment>
                <Segment  >
                    <Segment.Group horizontal>
                        <div style={{ margin: "1em", marginLeft: "1em", marginTop: "5em" }}>
                            <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623436624/building_wvtyue.png' size='mini' />
                        </div>
                        <Segment>
                            <div className="jobAdvertisementDiv" key={jobAdvertisement.jobAdvertisementId}>
                                <h2 style={{ marginLeft: "0.5em" }}>{jobAdvertisement.position?.positionName}</h2>
                                <p style={{ marginLeft: "1em", marginTop: "1em" }}> {jobAdvertisement.jobDescription}</p>
                                <p style={{ marginLeft: "1em", marginTop: "1em", marginBottom: "1em" }}>{jobAdvertisement.employer?.companyName}</p>
                                <p style={{ marginLeft: "1em", marginTop: "1em", marginBottom: "1em" }}>{jobAdvertisement.city?.cityName}</p>
                                <Button as={NavLink}
                                    to={url}
                                    style={{ backgroundColor: "black", color: "white", marginLeft: "1em" }} >İncele </Button>
                            </div>
                        </Segment>
                    </Segment.Group>
                </Segment>
            </Segment.Group>
            <br />
        </div>
    )

}
export default JobAdvertisementListSegment;