import _ from 'lodash';
import { MultiSelect } from 'primereact/multiselect';
import { RadioButton } from 'primereact/radiobutton';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Dropdown, Grid, Image, Pagination, Rating, Segment } from 'semantic-ui-react';
import CityService from '../../services/CityService';
import FavoriteService from '../../services/FavoriteService';
import JobAdvertisementService from '../../services/JobAdvertisementService';
import WorkTimeTypeService from '../../services/WorkTimeTypeService';

export default function JobAdvertisementListForJobSeeker() {

    let { userId } = useParams()

    const [cities, setCities] = useState([]);
    const [workTimeTypes, setWorkTimeTypes] = useState([])
    const [favorites, setFavorites] = useState([]);
    const [allJobAdvertisements, setAllJobAdvertisements] = useState([]);
    const [allJobAdvertisementsDefault, setAllJobAdvertisementsDefault] = useState([]);

    const [selectedRepresentative, setSelectedRepresentative] = useState([]);
    const [selectedWorkTimeRepresentative, setSelectedWorkTimeRepresentative] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [pageSize, setPageSize] = useState(10);


    let jobAdvertisementService = new JobAdvertisementService()
    let favoriteService = new FavoriteService()
    let workTimeTypeService = new WorkTimeTypeService()
    let cityService = new CityService();

    useEffect(() => {
        jobAdvertisementService.getByAdvertisementStatusAndApprovalStatus().then((result) => setAllJobAdvertisements(result.data.data))
        jobAdvertisementService.getByAdvertisementStatusAndApprovalStatus().then((result) => setAllJobAdvertisementsDefault(result.data.data))
        favoriteService.getAllFavoritesByUserId(userId).then(result => setFavorites(result.data.data))

        cityService.getCities().then((result) => setCities(result.data.data));

        workTimeTypeService.getWorkTimeTypes().then(result => setWorkTimeTypes(result.data.data))
        jobAdvertisementService.getAllByPageSize(activePage, selectedCategory.key).then((result) => setAllJobAdvertisements(result.data.data))
    }, []);

    const categories = [
        { name: "10", key: "10" },
        { name: "20", key: "20" },
        { name: "50", key: "50" },
        { name: "100", key: "100" },
    ];
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    const getCities = cities.map((city, index) => ({
        key: index,
        name: city.cityName,
        value: city.cityId,
    }));


    const getWorkTimeTypes = workTimeTypes.map((workTimeType, index) => ({
        key: index,
        name: workTimeType.workTimeTypeName,
        value: workTimeType.workTimeTypeId,
    }));
    function addFavorite(jobAdvertisementId) {
        let favorite = {
            jobAdvertisement: { jobAdvertisementId: jobAdvertisementId },
            jobSeeker: { userId: userId }
        }
        favoriteService.add(favorite).then(result => result.data.success ? toast.success("Favorilere Eklendi")
            : toast.error("Favorilere Eklenemedi!"))
    }
    function deleteFavorite(jobAdvertisementId) {
        favoriteService.deleteByJobAdvertisementId(jobAdvertisementId).then(result => result.data.success ? toast.success("Favorilerden Silindi")
            : toast.error("Favorilerden Silinemedi!"))
    }

    const [selectedCities, setselectedCities] = useState([]);
    const [selectedWorkTimeTypes, setSelectedWorkTimeTypes] = useState([]);
    const [selectedPageSize, setSelectedPageSize] = useState([]);

    //filtreleme işlemleri
    let filteredJobAdvertisementForCity = allJobAdvertisementsDefault.filter((jobAdvertisement) =>
        selectedCities.includes(jobAdvertisement.city.cityId))
    let filteredJobAdvertisementForWorkTimeTypes = allJobAdvertisementsDefault.filter((jobAdvertisement) =>
        selectedWorkTimeTypes.includes(jobAdvertisement.workTimeType.workTimeTypeId))

    function handleDataForCity() {
        return filteredJobAdvertisementForCity
    }
    function handleDataForWorkTimeType() {
        return filteredJobAdvertisementForWorkTimeTypes
    }
    let filteredJobAdvertisements = []
    if (selectedCities.length > 0 && selectedWorkTimeTypes.length === 0) {
        filteredJobAdvertisements = handleDataForCity()//Şehir varsa
    }
    else if (selectedCities.length === 0 && selectedWorkTimeTypes.length > 0) {
        filteredJobAdvertisements = handleDataForWorkTimeType()//çalışma zamanı varsa
    }
    else if (selectedCities.length > 0 && selectedWorkTimeTypes.length > 0) {
        filteredJobAdvertisements = (_.intersection(handleDataForCity(), handleDataForWorkTimeType()))//şehir + çalışma zamanı varsa
    }
    else if (selectedCities.length === 0 && selectedWorkTimeTypes.length === 0) {//şehir + çalışma zamanı yoksa
        filteredJobAdvertisements = allJobAdvertisements
    }

    return (
        <div>
            <div>
                <Segment>
                    <Segment>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={4}>
                                    <div >
                                        <MultiSelect style={{ marginLeft: "1em", width: "100%" }}
                                            placeholder="Şehir Seçiniz..."
                                            optionLabel="name"
                                            fixedPlaceholder
                                            optionValue="value"
                                            value={selectedRepresentative}
                                            options={getCities}
                                            filter
                                            onChange={(e) =>
                                                (setSelectedRepresentative(e.value), setselectedCities(e.value))} />
                                    </div>
                                </Grid.Column>
                                <Grid.Column width={6}>
                                    <div>
                                        <MultiSelect style={{ marginLeft: "1em", width: "100%" }}
                                            placeholder="Çalışma Zamanı Tipi..."
                                            optionLabel="name"
                                            fixedPlaceholder
                                            optionValue="value"
                                            filter
                                            value={selectedWorkTimeRepresentative}
                                            options={getWorkTimeTypes}
                                            onChange={(e) =>
                                                (setSelectedWorkTimeRepresentative(e.value), setSelectedWorkTimeTypes(e.value))} />
                                    </div>
                                </Grid.Column>
                                <Grid.Column width={6}>
                                    <div>
                                        <label>Sayfada Görüntülenecek İlan Sayısı</label>
                                        {categories.map((category) => (
                                            <div >
                                                <RadioButton
                                                    inputId={category.key}
                                                    name="category"
                                                    value={category}
                                                    onChange={((e) => (setSelectedCategory(e.value),
                                                        (jobAdvertisementService.getAllByPageSize(activePage, e.value.key).then((result) =>
                                                            setAllJobAdvertisements(result.data.data))), setPageSize(e.value.key)
                                                    ))}
                                                    checked={selectedCategory.key === category.key}
                                                />
                                                <label htmlFor={category.key}>{category.name}</label>
                                            </div>
                                        ))}
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Segment>
                <br />
            </div>{filteredJobAdvertisements.map(jobAdvertisement => (
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
                                        <Button as={NavLink} to={`/${userId}/jobAdvertisement/${jobAdvertisement.jobAdvertisementId}`}
                                            style={{ backgroundColor: "black", color: "white", marginLeft: "1em" }} >İncele </Button>
                                    </div>
                                    <Rating icon="heart" className="favoriteIcon"
                                        defaultRating={favorites.find(favoriteJobAdversitement =>
                                            favoriteJobAdversitement.jobAdvertisement.jobAdvertisementId === jobAdvertisement.jobAdvertisementId) ? 1 : 0}
                                        onRate={(event, data) =>
                                            data.rating === 1 ?
                                                addFavorite(jobAdvertisement.jobAdvertisementId)
                                                : deleteFavorite(jobAdvertisement.jobAdvertisementId)
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
            {/* {console.log(allJobAdvertisements.length % pageSize ===0 ? true : false)}
            {console.log(allJobAdvertisements.length)}
            {console.log(allJobAdvertisements.length % pageSize)} */}
            <Pagination inverted defaultActivePage={1} totalPages={
                (allJobAdvertisements.length / pageSize) + 1}
                onPageChange={(event, data) => setActivePage(data.activePage)} />
        </div >
    )
}
