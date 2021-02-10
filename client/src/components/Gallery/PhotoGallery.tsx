import React, { useState, useEffect } from 'react';
import useClientHelper from '../../utils/hooks/ClientHelper';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const truncate = (input: string, length: number = 100) => input.length > length ? `${input.substring(0, length)}...` : input;
const getInfo = (id : string) => {
	return `https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&format=json&nojsoncallback=1&api_key=9ac3e9d0e1fcf4c50a0b44b67f46742f&photo_id=${id}`;
}

const PhotoGallery =  ( {photo} : {photo: any}) => {
	const {
		farm,
		server,
		id,
		secret,
		title,
	} = photo;
	const [imageLoading, setImageLoading] = useState(false);
	const { response, isLoading }: { response: any, isLoading: boolean} = useClientHelper(getInfo(id));
	const src = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;

	useEffect(() => {
    // add onload listener when image src changes
    const newImage = new Image();
    newImage.src = src;
    setImageLoading(true);
    newImage.onload = () => setImageLoading(false);
  }, [src]);

	return (
		<div >
		{imageLoading && isLoading &&
				<LoadingSpinner/>
			}
			{!imageLoading && !isLoading && response &&
				<React.Fragment>
						<img className="photo" src={src} alt=""/>
						<p>{title} by {response.photo.owner.username}</p>
						<small>
							{truncate(response.photo.description._content)}
						</small>
				</React.Fragment>
			}
		</div>
	)
}


export default PhotoGallery;

  
  