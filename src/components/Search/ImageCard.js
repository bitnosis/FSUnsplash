import React from 'react';
import { useState } from 'react'
import FavPlus from '../../favplus.svg'
import FavHeart from '../../favheart.svg'

const ImageCard = ({viewTheImage, addToFavorites, removeFavorite, image}) => {
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('u_app_favorites')) || []);
    const [categories, setCategories] = useState(JSON.parse(localStorage.getItem('u_app_categories')) || []);

    // Check if is a favorite
    function isFavorite(id){
        return favorites.some(img => { return img.id === id })
    }

    return (
        <div key="{image.id}" className="p-1 flex-fill bd-highlight">
            <article className="overflow-hidden rounded-lg shadow-lg p-4">
                <div className = "mt-2 cursor-pointer"  >
                    {isFavorite(image.id) ? <img title="Remove from favorites" onClick={()=>removeFavorite(image)} src={FavHeart} /> : <img title="Add to favorites" onClick={()=>addToFavorites(image)} src={FavPlus} />}
                </div>
                <header className="flex items-center justify-between leading-none p-2 md:p-4">
                    <center>
                        <img onClick={() => viewTheImage(image)} className="imageResult cursor-pointer" src={image.thumbnail} />
                        <p className="like mt-4">👍 {image.likes} likes</p>
                    </center>
                </header>
                <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                        <a className="flex items-center no-underline hover:underline text-black" href="#">
                            <img alt="Placeholder" className="block rounded-full" src={image.user.profile_image.small} />
                            <a href={"user/"+image.user.username} className="ml-2 text-xs">
                               {image.user.username}
                            </a>
                        </a>
                        <a className="no-underline text-grey-darker hover:text-red-dark" href="#">
                            <span className="hidden">Like</span>
                            <i className="fa fa-heart"></i>
                        </a>
                </footer>
            </article>
        </div>
    )
}

export default ImageCard