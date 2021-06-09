import React from 'react'
import CvTechnologyService from '../../services/CvTechnologyService'

export default function CvTechnologyList() {

    const [cvTechnologies, setCvTechnologies] = useState([]);

    useEffect(() => {
        let cvTechnologyService = new CvTechnologyService()
        cvTechnologyService.getCvTechnologies().then(result => setCvTechnologies(result.data.data))
    }, [])

    return (
        <div>
            
        </div>
    )
}
