import React, { useState, useEffect } from 'react'
import './SlideShow.css';
import Images from './test-images.js'

import Unsplash, {toJson} from 'unsplash-js'
const unsplash = new Unsplash({ accessKey: "pTnrz6Mc2ruyLiiC1V5oC7ibUbJ3b6seLHH3EdTw8v0" })

const SlideShow = (props) => {
    const Slideshow = () => <div className="slideShowBox"><img className="fade-in-image" src={images[currentImage].src} /></div>
    const [query, setQuery] = useState("");
    const [images, setImages] = useState(Images);
    const [currentImage, setCurrent] = useState(0);

    // Switch the image on the slideshow
    const switchImage = (index=null) => {
        if(index==null){
            (currentImage < images.length - 1) ? setCurrent(currentImage + 1) : setCurrent(0) 
        } else {
            setCurrent(index)
        }
        return currentImage
    }

    useEffect(() => {
        const timeout = setTimeout(switchImage, 4000);
        return () => clearTimeout(timeout);
    }, [currentImage]);

    // Search the photos
    const searchPhotos = async (e) => {
      e.preventDefault();
      unsplash.search
      .photos(query, 1, 100, {orientation:"landscape"})
      .then(toJson)
      .then((json) => {
        let imgs = [];
        json.results.forEach(image => {
          imgs.push({id:image.id, inFavorites:false, query: query, src:image.urls.regular, thumbnail:image.urls.thumb, alt:image.alt_description})
        });
        setImages(imgs)
      });
    };

    return(
        <>
        <div >
            
            <form onSubmit={searchPhotos}>
                <input type="text" className="myLargeInput" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search something and hit enter" />
            </form>
            {images.length>0 ? <Slideshow /> : <span></span>}
        </div>
        </>
    )

}

export default SlideShow;