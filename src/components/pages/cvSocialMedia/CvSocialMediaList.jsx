import React from 'react'
import CvSocialMediaService from '../../services/CvSocialMediaService'

export default function CvSocialMediaList() {

    const [cvSocialMedia, setCvSocialMedia] = useState([]);

    useEffect(() => {
        let cvSocialMediaService = new CvSocialMediaService()
        cvSocialMediaService.getCvSocialMedia().then(result => setCvSocialMedia(result.data.data))
    }, [])


    return (
        <div>
            
        </div>
    )
}
