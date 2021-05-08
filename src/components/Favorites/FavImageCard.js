import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'

const FavImageCard = ({removeFavorite, image}) => {
    return (
        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 slide-in-blurred-top">
            <article className="overflow-hidden rounded-md shadow-lg">
            <a href={image.links.download} target="_blank">
                <img alt={image.alt_description} className="myImage object-cover favImage w-full" src={image.src} />
            </a>
            <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                
                <a className="flex items-center no-underline hover:underline text-black" href={"user/"+image.user.username} >
                    <img className="block rounded-full" src={image.user.profile_image.small} />
                    <p className="ml-2 text-sm">
                    {image.user.username}
                    </p>
                </a>
                <FontAwesomeIcon onClick={()=>removeFavorite(image)} className="cursor-pointer" icon={faMinusCircle} />
            </footer>
            </article>
        </div>
    )
}

export default FavImageCard