import React from 'react'
import ForeignLanguageService from '../../services/ForeignLanguageService'


export default function ForeignLanguageList() {

    const [foreignLanguages, setForeignLanguages] = useState([]);

    useEffect(() => {
        let foreignLanguageService = new ForeignLanguageService()
        foreignLanguageService.getForeignLanguages().then(result => setForeignLanguages(result.data.data))
    }, [])

    return (
        <div>
            
        </div>
    )
}
