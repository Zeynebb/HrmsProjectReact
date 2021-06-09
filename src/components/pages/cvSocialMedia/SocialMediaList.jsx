import React from 'react'
import SocialMediaService from '../../services/SocialMediaService'

export default function SocialMediaList() {

    const [socialMedia, setSocialMedia] = useState([]);

    useEffect(() => {
        let socialMediaService = new SocialMediaService()
        socialMediaService.getSocialMedia().then(result => setSocialMedia(result.data.data))
    }, [])


    return (
        <div>
            
        </div>
    )
}
