import React from 'react'
import CityService from '../../services/CityService'

export default function CityList() {

    const [cities, setCities] = useState([]);

    useEffect(() => {
        let cityService = new CityService()
        cityService.getCities().then(result => setCities(result.data.data))
    }, [])


    return (
        <div>
            
        </div>
    )
}
