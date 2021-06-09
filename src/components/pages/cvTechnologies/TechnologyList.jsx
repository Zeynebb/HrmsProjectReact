import React from 'react'
import TechnologyService from '../../services/TechnologyService'

export default function TechnologyList() {

    const [technologies, setTechnologies] = useState([]);

    useEffect(() => {
        let technologyService = new TechnologyService()
        technologyService.getTechnology().then(result => setTechnologies(result.data.data))
    }, [])

    return (
        <div>
            
        </div>
    )
}
