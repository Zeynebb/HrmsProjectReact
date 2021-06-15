import { useFormik } from 'formik';
import React from 'react'
import { Button } from 'rebass';
import TechnologyService from '../../services/TechnologyService'

export default function TechnologyAdd() {

    let technologyService = new TechnologyService();
    const formik = useFormik({
        initialValues: { 
            technologyName: "",
        },
        onSubmit: (values) => { 
            console.log(values);
            let technology = { 
                technologyName: values.technologyName
            };
            console.log(technology);
            technologyService
                .add(technology)
                .then((result) => console.log(result.data.message));
        },
    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label>Teknoloji Adı:</label>
                <input type="text" id="technologyName" value={formik.values.technologyName} onChange={formik.handleChange}></input>
                <br/>
                <Button type="submit">Kaydet</Button>

            </form>

        </div>
    )
}
