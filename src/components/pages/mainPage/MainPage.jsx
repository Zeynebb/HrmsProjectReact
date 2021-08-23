import React, { useEffect, useState } from 'react'
import { Divider, Grid, Image, Input, Label, Segment } from 'semantic-ui-react'
import '../../../css/MainLayout.css'
import ZYTitleH3 from '../../toolbox/ZYTitle';
import { ZYTitleH2 } from '../../toolbox/ZYTitle';
import * as Yup from "yup";
import { useFormik } from 'formik';
import JobAdvertisementService from '../../services/JobAdvertisementService';
import ZYFormLabel from '../../toolbox/ZYFormLabel';
import ZYRedButton from '../../toolbox/ZYRedButton';
import ZYMainPageButton from '../../toolbox/ZYMainPageButton';

export default function MainPage() {

    const [jobAdvertisements, setJobAdvertisements] = useState([]);
    let jobAdvertisementService = new JobAdvertisementService()

    useEffect(() => {
        jobAdvertisementService.getByAdvertisementStatusAndApprovalStatus().then((result) => setJobAdvertisements(result.data.data))
    }, [])

    const initialValues = {
        email: "",
        password: "",
    }
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            email: Yup.string().email("Geçerli bir email adresi giriniz!").required("Email boş bırakılamaz!"),
            password: Yup.string().min(6, "Şifre en az 6 haneli olmalıdır!").required("Şifre boş bırakılamaz!")
        })
    });
    return (
        <div >
            <Grid  style={{ fontFamily: "Arial", marginTop:"25%" }}>
                <Grid.Row style={{ marginLeft: "2%" }}>
                    <Grid.Column width={5}>
                        <Segment >
                            {/* <Image src="https://res.cloudinary.com/zeydatabase/image/upload/v1626462960/work11Blur_pfcnid.jpg" /> */}
                            <ZYMainPageButton name="GİRİŞ YAP" src={"/login"} />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={5} >
                        <Segment>
                            {/* <Image src="https://res.cloudinary.com/zeydatabase/image/upload/v1626462960/work11Blur_pfcnid.jpg" /> */}
                            <ZYMainPageButton name="KAYIT OL" src={"/jobSeekerRegister"}> </ZYMainPageButton>
                        </Segment>

                    </Grid.Column>
                    <Grid.Column width={5} >
                        <Segment>
                            {/* <Image src="https://res.cloudinary.com/zeydatabase/image/upload/v1626462960/work11Blur_pfcnid.jpg" /> */}
                            <ZYMainPageButton name="İŞ VEREN" src={"/employerRegister"}> </ZYMainPageButton>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>

            </Grid>
            

        </div>
    )
}
