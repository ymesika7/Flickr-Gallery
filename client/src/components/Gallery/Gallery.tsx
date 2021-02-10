import React, { useState } from 'react';
import GetPhotos from '../../utils/hooks/GetPhotos';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import PhotoGallery from './PhotoGallery';

const Gallery = () => {
	const { photos, isLoading } = GetPhotos();
	const [imageToShow, setImageToShow] = useState("");
	const [lightboxDisplay, setLightBoxDisplay] = useState(false);

	//function to show a specific image in the lightbox, amd make lightbox visible
	const showImage = (image : any) => {
		setImageToShow(image);
		setLightBoxDisplay(true);
	};

	//hide lightbox
	const hideLightBox = () => {
		setLightBoxDisplay(false);
	};

	//show next image in lightbox
	const showNext = (e : React.MouseEvent) => {
		e.stopPropagation();
		let currentIndex = photos.indexOf(imageToShow);
		if (currentIndex >= photos.length - 1) {
			setLightBoxDisplay(false);
		} else {
			let nextImage = photos[currentIndex + 1];
			setImageToShow(nextImage);
		}
	};

	//show previous image in lightbox
	const showPrev = (e : React.MouseEvent) => {
		e.stopPropagation();
		let currentIndex = photos.indexOf(imageToShow);
		if (currentIndex <= 0) {
			setLightBoxDisplay(false);
		} else {
			let nextImage = photos[currentIndex - 1];
			setImageToShow(nextImage);
		}
	};

  return (
		<>
			<div className="gallery-container">
				<div className="gallery">
				{photos.map((photo: any, index: number) => (
					<div className="gallery__item" key={photo.id} onClick={() =>showImage(photo)}> 
						<PhotoGallery photo={photo}/>
					</div>
				))}
				</div>
				{isLoading &&
					<LoadingSpinner/>
				}
			</div>
			{lightboxDisplay ? 
				<div id="lightbox" onClick={hideLightBox}>
					<button onClick={showPrev}>⭠</button>
						<div id="lightbox-img">
							<PhotoGallery photo={imageToShow} />
						</div>
					<button onClick={showNext}>⭢</button>
				</div>
			: ""}
		</>
  )
}

export default Gallery;