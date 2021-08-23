import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Button, Image, Rating, Segment } from 'semantic-ui-react'
import FavoriteService from '../../services/FavoriteService'

export default function FavoriteJobAdvertisementForJobSeeker() {

    let { userId } = useParams()
    let [favorites, setFavorites] = useState([])
    let favoriteService = new FavoriteService()

    useEffect(() => {
        favoriteService.getAllFavoritesByUserId(userId).then(result => setFavorites(result.data.data))
    },[])
    function addFavorite(jobAdvertisementId) {
        let favorite = {
            jobAdvertisement: { jobAdvertisementId: jobAdvertisementId },
            jobSeeker: { userId: userId }
        }
        favoriteService.add(favorite).then(result => console.log(result.data.message))
    }
    function deleteFavorite(jobAdvertisementId) {
        favoriteService.deleteByJobAdvertisementId(jobAdvertisementId).then(result => console.log(result.data.message))
    }

    return (
        <div>
            {
                favorites.map(favorite => (
                    <div style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                        <Segment.Group piled>
                            <Segment style={{ backgroundColor: "black" }}>
                                <h3 style={{ backgroundColor: "black", color: "white", textAlign: "left", marginLeft: "1em", fontFamily: "Arial, Helvetica, sans-serif" }}>
                                    İş İlanı - {favorite.jobAdvertisement.position?.positionName}</h3></Segment>
                            <Segment  >
                                <Segment.Group horizontal>
                                    <div style={{ margin: "1em", marginLeft: "1em", marginTop: "5em" }}>
                                        <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623436624/building_wvtyue.png' size='mini' />
                                    </div>
                                    <Segment>
                                        <div className="jobAdvertisementDiv" key={favorite.jobAdvertisement.jobAdvertisementId}>
                                            <h2 style={{ marginLeft: "0.5em" }}>{favorite.jobAdvertisement.position?.positionName}</h2>
                                            <p style={{ marginLeft: "1em", marginTop: "1em" }}> {favorite.jobAdvertisement.jobDescription}</p>
                                            <p style={{ marginLeft: "1em", marginTop: "1em", marginBottom: "1em" }}>{favorite.jobAdvertisement.employer?.companyName}</p>
                                            <p style={{ marginLeft: "1em", marginTop: "1em", marginBottom: "1em" }}>{favorite.jobAdvertisement.city?.cityName}</p>
                                            <Button as={NavLink} to={`/${userId}/jobAdvertisement/${favorite.jobAdvertisement.jobAdvertisementId}`} style={{ backgroundColor: "black", color: "white", marginLeft: "1em" }} >İncele </Button>
                                        </div>
                                        <Rating icon="heart" className="favoriteIcon"
                                            defaultRating={favorites.find(favoriteJobAdversitement =>
                                                favoriteJobAdversitement.jobAdvertisement.jobAdvertisementId === favorite.jobAdvertisement.jobAdvertisementId) ? 1 : 0}
                                            onRate={(event, data) =>
                                                data.rating === 1 ?
                                                    addFavorite(favorite.jobAdvertisement.jobAdvertisementId)
                                                    : deleteFavorite(favorite.jobAdvertisement.jobAdvertisementId)
                                            } >
                                        </Rating>
                                    </Segment>
                                </Segment.Group>
                            </Segment>
                        </Segment.Group>
                        <br />
                    </div>
                ))
            }
        </div >
    )
}
