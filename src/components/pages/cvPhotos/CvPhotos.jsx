import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Image } from 'semantic-ui-react'
import PhotoService from '../../services/PhotoService'

export default function CvPhotos() {

    let { cvId } = useParams()
    const [photos, setPhotos] = useState({})
    const [cvPhotos, setCvPhotos] = useState({})
    const cv = useSelector(state => state.cv.cvId)

    useEffect(() => {
        let photoService = new PhotoService()
        photoService.getPhotoForCvId(cvId).then(result => setPhotos(result.data.data))
        {cv != null &&
            photoService.getPhotoForCvId(cv).then(result => setCvPhotos(result.data.data))
        }
       
    }, [])

    return (
        <div>
            {photos != null && <Image src={photos.photoUrl} size="small"></Image>
            }
            {photos == null && cv != null && <Image src={cv.photoUrl} size="small"></Image>
            }
            {photos == null && cv == null && <Image src="https://res.cloudinary.com/zeydatabase/image/upload/v1623789117/profile_ybo1xx.png" size="small"></Image>
            }

        </div>
    )
}
