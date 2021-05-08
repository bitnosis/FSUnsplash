import React, {useState} from 'react';
import FavPlus from '../../favplus.svg'
import FavHeart from '../../favheart.svg'

const UserImageCard = ({addToFavorites, removeFavorite, image}) => {
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('u_app_favorites')) || []);
    // Check if is a favorite
    function isFavorite(id){
        return favorites.some(img => { return img.id === id })
    }
    return (
        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 slide-in-blurred-top">
            <article className="overflow-hidden rounded-md shadow-lg">
            <a href={image.links.download} target="_blank">
                <img alt={image.alt_description} className="myImage object-cover favImage w-full" src={image.urls.regular} />
            </a>
            <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                
                <p className="ml-2 text-xs">
                    {image.alt_description}
                </p>
                {isFavorite(image.id) ? <img className="cursor-pointer" title="Remove from favorites" onClick={()=>removeFavorite(image)} src={FavHeart} /> : <img title="Add to favorites" className="cursor-pointer" onClick={()=>addToFavorites(image)} src={FavPlus} />}
            </footer>
            </article>
        </div>
    )
}

export default UserImageCard