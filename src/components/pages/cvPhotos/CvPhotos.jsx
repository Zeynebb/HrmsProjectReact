import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Image } from 'semantic-ui-react'
import PhotoService from '../../services/PhotoService'

export default function CvPhotos() {

    let { cvId } = useParams()
    const [photos, setPhotos] = useState([])

    useEffect(() => {
        let photoService = new PhotoService()
        photoService.getPhotoForCvId(cvId).then(result => setPhotos(result.data.data))
    }, [])

    return (
        <div>            
            {photos.map(photo => (
                <Image src={photo.photoUrl} size="small"></Image>
            ))
            }
        </div>
    )
}
