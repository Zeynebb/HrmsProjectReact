import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { Image, Segment, Button, Grid, Rating } from 'semantic-ui-react'
import CityService from '../../services/CityService';
import WorkTimeTypeService from '../../services/WorkTimeTypeService';
import { MultiSelect } from "primereact/multiselect";
import _ from "lodash";
import JobAdvertisementService from '../../services/JobAdvertisementService';
import '../../../css/JobAdvertisementList.css'
import FavoriteService from '../../services/FavoriteService';
import { RadioButton } from "primereact/radiobutton";


export default function JobAdvertisementList() {

    let { jobSeekerId } = useParams()

    const [activePage, setActivePage] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [jobAdvertisements, setJobAdvertisements] = useState([]);
    const [cities, setCities] = useState([]);
    const [workTimeTypes, setWorkTimeTypes] = useState([])
    const [selectedRepresentative, setSelectedRepresentative] = useState([]);
    const [selectedWorkTimeRepresentative, setSelectedWorkTimeRepresentative] = useState([]);
    const [favorites, setFavorites] = useState([]);


    let jobAdvertisementService = new JobAdvertisementService()
    let favoriteService = new FavoriteService()

    useEffect(() => {
        jobAdvertisementService.getJobAdvertisements().then((result) => setJobAdvertisements(result.data.data))
        favoriteService.getAll().then(result => setFavorites(result.data.data))
        let cityService = new CityService();
        cityService.getCities().then((result) => setCities(result.data.data));
        let workTimeTypeService = new WorkTimeTypeService()
        workTimeTypeService.getWorkTimeTypes().then(result => setWorkTimeTypes(result.data.data))
        favoriteService.getAll().then(result => console.log(result.data.data))
        jobAdvertisementService.getAllByPageSize(activePage, selectedCategory.key)
    }, []);

    const categories = [
        { name: "10", key: "10" },
        { name: "20", key: "20" },
        { name: "50", key: "50" },
        { name: "100", key: "100" },
    ];
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    //Dropdown-şehirler
    const getCities = cities.map((city, index) => ({
        key: index,
        name: city.cityName,
        value: city.cityId,
    }));

    //Dropdown-çalışma zamanı tipleri
    const getWorkTimeTypes = workTimeTypes.map((workTimetype, index) => ({
        key: index,
        name: workTimetype.workTimeTypeName,
        value: workTimetype.workTimeTypeId,
    }));

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
    const [selectedCities, setselectedCities] = useState([]);
    const [selectedWorkTimeTypes, setSelectedWorkTimeTypes] = useState([]);

    let withFilterData = jobAdvertisements.filter((jobAdvertisement) => selectedCities.includes(jobAdvertisement.city.cityId))
    let withoutFilterData = jobAdvertisements
    function handleData() {
        if (selectedCities.length === 0) {
            return withoutFilterData
        }

        else {
            return withFilterData
        }
    }
    let withWorkTimeTypeFilterData = jobAdvertisements.filter((jobAdvertisement) => selectedWorkTimeTypes.includes(jobAdvertisement.workTimeType.workTimeTypeId))
    let withoutWorkTimeTypeFilterData = jobAdvertisements
    function handleWorkTimeTypeData() {
        if (selectedWorkTimeTypes.length === 0) {
            return withoutWorkTimeTypeFilterData
        }
        else {
            return withWorkTimeTypeFilterData
        }
    }
    function defaultValue(jobAdvertisementId) {
        favorites.find(favoriteJobAdvertisement => (favoriteJobAdvertisement.jobAdvertisement.jobAdvertisementId === jobAdvertisementId) ? 1 : 0)
    }

    let newJobAdvertisementData = _.intersection(handleData(), handleWorkTimeTypeData())
    //console.log(withFilterData)
    //console.log(selectedCities)
    //console.log(withWorkTimeTypeFilterData)
    //console.log(_.intersection(withFilterData, withWorkTimeTypeFilterData))
    //console.log(_.intersection(handleData(), handleWorkTimeTypeData()))
    return (
        <div>
            <div>
                <Segment>
                    <Segment>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={4}>
                                    <div >
                                        <MultiSelect style={{ marginLeft: "1em" }}
                                            placeholder="Şehir Seçiniz..."
                                            optionLabel="name"
                                            fixedPlaceholder
                                            optionValue="value"
                                            value={selectedRepresentative}
                                            options={getCities}
                                            onChange={(e) =>
                                                (setSelectedRepresentative(e.value), setselectedCities(e.value))} />
                                    </div>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <div>
                                        <MultiSelect style={{ marginLeft: "1em" }}
                                            placeholder="Çalışma Zamanı Tipi..."
                                            optionLabel="name"
                                            fixedPlaceholder
                                            optionValue="value"
                                            value={selectedWorkTimeRepresentative}
                                            options={getWorkTimeTypes}
                                            onChange={(e) =>
                                                (setSelectedWorkTimeRepresentative(e.value), setSelectedWorkTimeTypes(e.value))} />
                                    </div>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <div>
                                        <label>Sayfada Görüntülenecek İlan Sayısı</label>
                                        {categories.map((category) => (
                                            <div className="pageradiobtn">

                                                <RadioButton
                                                    className="pageradiobtnstyle"
                                                    inputId={category.key}
                                                    name="category"
                                                    value={category}
                                                    onChange={((e) => (setSelectedCategory(e.value),
                                                        (jobAdvertisementService.getAllByPageSize(activePage, e.value.key).then((result) => setJobAdvertisements(result.data.data)))
                                                    ))}
                                                    checked={selectedCategory.key === category.key}
                                                />
                                                <label htmlFor={category.key}>{category.name}</label>
                                            </div>
                                        ))}</div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Segment>
                <br />
            </div>{newJobAdvertisementData.map(jobAdvertisement => (
                <div style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                    <Segment.Group piled>
                        <Segment style={{ backgroundColor: "black" }}>
                            <h3 style={{ backgroundColor: "black", color: "white", textAlign: "left", marginLeft: "1em", fontFamily: "Arial, Helvetica, sans-serif" }}>
                                İş İlanı - {jobAdvertisement.position.positionName}</h3></Segment>
                        <Segment  >
                            <Segment.Group horizontal>
                                <div style={{ margin: "1em", marginLeft: "1em", marginTop: "5em" }}>
                                    <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623436624/building_wvtyue.png' size='mini' />
                                </div>
                                <Segment>
                                    <div className="jobAdvertisementDiv" key={jobAdvertisement.jobAdvertisementId}>
                                        <h2 style={{ marginLeft: "0.5em" }}>{jobAdvertisement.position.positionName}</h2>
                                        <p style={{ marginLeft: "1em", marginTop: "1em" }}> {jobAdvertisement.jobDescription}</p>
                                        <p style={{ marginLeft: "1em", marginTop: "1em", marginBottom: "1em" }}>{jobAdvertisement.employer.companyName}</p>
                                        <p style={{ marginLeft: "1em", marginTop: "1em", marginBottom: "1em" }}>{jobAdvertisement.city.cityName}</p>
                                        <Button as={NavLink} to={`/${jobSeekerId}/jobAdvertisement/${jobAdvertisement.jobAdvertisementId}`} style={{ backgroundColor: "black", color: "white", marginLeft: "1em" }} >İncele </Button>
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
        </div >
    )
}
