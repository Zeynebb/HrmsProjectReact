import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { Image, Segment, Button, Grid, Rating, Pagination } from 'semantic-ui-react'
import CityService from '../../services/CityService';
import WorkTimeTypeService from '../../services/WorkTimeTypeService';
import { MultiSelect } from "primereact/multiselect";
import _ from "lodash";
import JobAdvertisementService from '../../services/JobAdvertisementService';
import '../../../css/JobAdvertisementList.css'
import FavoriteService from '../../services/FavoriteService';
import { RadioButton } from "primereact/radiobutton";
import { toast } from 'react-toastify';


export default function JobAdvertisementList() {

    let { userId } = useParams()

    const [activePage, setActivePage] = useState(1);
    //const [pageSize, setPageSize] = useState(3);
    const [jobAdvertisements, setJobAdvertisements] = useState([]);
    const [jobAdvertisementsDefault, setJobAdvertisementsDefault] = useState([]);
    const [cities, setCities] = useState([]);
    const [workTimeTypes, setWorkTimeTypes] = useState([])
    const [selectedRepresentative, setSelectedRepresentative] = useState([]);
    const [selectedWorkTimeRepresentative, setSelectedWorkTimeRepresentative] = useState([]);
    const [favorites, setFavorites] = useState([]);


    let jobAdvertisementService = new JobAdvertisementService()
    let favoriteService = new FavoriteService()

    useEffect(() => {
        jobAdvertisementService.getByAdvertisementStatusAndApprovalStatus().then((result) => setJobAdvertisements(result.data.data))
        jobAdvertisementService.getByAdvertisementStatusAndApprovalStatus().then((result) => setJobAdvertisementsDefault(result.data.data))
        favoriteService.getAllFavoritesByUserId(userId).then(result => setFavorites(result.data.data))
        let cityService = new CityService();
        cityService.getCities().then((result) => setCities(result.data.data));
        let workTimeTypeService = new WorkTimeTypeService()
        workTimeTypeService.getWorkTimeTypes().then(result => setWorkTimeTypes(result.data.data))
        jobAdvertisementService.getAllByPageSize(activePage, selectedCategory.key)
    }, []);

    const categories = [
        { name: "10", key: "10" },
        { name: "20", key: "20" },
        { name: "50", key: "50" },
        { name: "100", key: "100" },
    ];
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    //Dropdown-??ehirler
    const getCities = cities.map((city, index) => ({
        key: index,
        name: city.cityName,
        value: city.cityId,
    }));

    //Dropdown-??al????ma zaman?? tipleri
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

    //pagination i??leminden etkilenmemesi i??in jobAdvertisementsDefault olarak tan??mlanan b??t??n i?? ilanlar?? filtreleniyor
    let withFilterData = jobAdvertisementsDefault.filter((jobAdvertisement) => selectedCities.includes(jobAdvertisement.city.cityId))
    let withoutFilterData = jobAdvertisements
    function handleData() {
        if (selectedCities.length === 0) {
            return withoutFilterData
        }

        else {
            return withFilterData
        }
    }
    //pagination i??leminden etkilenmemesi i??in jobAdvertisementsDefault olarak tan??mlanan b??t??n i?? ilanlar?? filtreleniyor
    let withWorkTimeTypeFilterData = jobAdvertisementsDefault.filter((jobAdvertisement) => selectedWorkTimeTypes.includes(jobAdvertisement.workTimeType.workTimeTypeId))
    let withoutWorkTimeTypeFilterData = jobAdvertisements
    function handleWorkTimeTypeData() {
        if (selectedWorkTimeTypes.length === 0) {
            return withoutWorkTimeTypeFilterData
        }
        else {
            return withWorkTimeTypeFilterData
        }
    }

    let filteredJobAdvertisement = []
    if (selectedCities.length > 0 && selectedWorkTimeTypes.length === 0) {
        filteredJobAdvertisement = _.intersection(handleData())//??ehir varsa
    }
    else if (selectedCities.length === 0 && selectedWorkTimeTypes.length > 0) {
        filteredJobAdvertisement = _.intersection(handleWorkTimeTypeData())//??al????ma zaman?? varsa
    }
    else if (selectedCities.length > 0 && selectedWorkTimeTypes.length > 0) {
        filteredJobAdvertisement = _.intersection(handleData(), handleWorkTimeTypeData())//??ehir + ??al????ma zaman?? varsa
    }
    else if (selectedCities.length === 0 && selectedWorkTimeTypes.length === 0) {//??ehir + ??al????ma zaman?? yoksa
        filteredJobAdvertisement = jobAdvertisements
    }
    let newJobAdvertisementData = _.intersection(handleData(), handleWorkTimeTypeData())
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
                                            placeholder="??ehir Se??iniz..."
                                            optionLabel="name"
                                            fixedPlaceholder
                                            optionValue="value"
                                            value={selectedRepresentative}
                                            options={getCities}
                                            onChange={(e) =>
                                                (setSelectedRepresentative(e.value), setselectedCities(e.value))} />
                                    </div>
                                </Grid.Column>
                                <Grid.Column width={6}>
                                    <div>
                                        <MultiSelect style={{ marginLeft: "1em" }}
                                            placeholder="??al????ma Zaman?? Tipi..."
                                            optionLabel="name"
                                            fixedPlaceholder
                                            optionValue="value"
                                            value={selectedWorkTimeRepresentative}
                                            options={getWorkTimeTypes}
                                            onChange={(e) =>
                                                (setSelectedWorkTimeRepresentative(e.value), setSelectedWorkTimeTypes(e.value))} />
                                    </div>
                                </Grid.Column>
                                <Grid.Column width={6}>
                                    <div>
                                        <label>Sayfada G??r??nt??lenecek ??lan Say??s??</label>
                                        {categories.map((category) => (
                                            <div >
                                                <RadioButton
                                                    inputId={category.key}
                                                    name="category"
                                                    value={category}
                                                    onChange={((e) => (setSelectedCategory(e.value),
                                                        (jobAdvertisementService.getAllByPageSize(activePage, e.value.key).then((result) =>
                                                            setJobAdvertisements(result.data.data)))
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
            </div>{filteredJobAdvertisement.map(jobAdvertisement => (
                <div style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                    <Segment.Group piled>
                        <Segment style={{ backgroundColor: "black" }}>
                            <h3 style={{ backgroundColor: "black", color: "white", textAlign: "left", marginLeft: "1em", fontFamily: "Arial, Helvetica, sans-serif" }}>
                                ???? ??lan?? - {jobAdvertisement.position.positionName}</h3></Segment>
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
                                        <Button as={NavLink} to={`/${userId}/jobAdvertisement/${jobAdvertisement.jobAdvertisementId}`} style={{ backgroundColor: "black", color: "white", marginLeft: "1em" }} >??ncele </Button>
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
            <Pagination inverted defaultActivePage={1} totalPages={10}
                onPageChange={(event, data) => setActivePage(data.activePage)} />
        </div >
    )
}
