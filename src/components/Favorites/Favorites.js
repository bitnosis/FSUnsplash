import React, { useState } from 'react'
import './Favorites.css'
import 'react-toastify/dist/ReactToastify.css'  
import FavImageCard from './FavImageCard.js'

const Favorites = ({removeFavorite}) => {

  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('u_app_favorites')) || []);
  const [categories, setCategories] = useState(JSON.parse(localStorage.getItem('u_app_categories')) || [])
  const [filter, setFilter] = useState("all")

  const changeFilter = (value) => {
    setFilter(value)
  }

  const removeImage = (image) => {
    setFavorites(removeFavorite(image))
  }

  if(favorites.length>0){
    return(
      <>
        <h1 className="text-2xl pl-20 pt-10">YOUR FAVORITES</h1>
        <div className="container my-12 mx-auto px-2 md:px-12">
          <div>
            Filter by Category<br/>
            <select onChange={(e)=>changeFilter(e.target.value)}>
              <option value="all">ALL</option>
              {categories.map((cat) => (
              <option value={cat}  >{cat.toUpperCase()}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="container favoriteContainer mx-auto my-12 px-2 md:px-12">
          <div className="flex flex-wrap -mx-1 lg:-mx-4">
            {favorites.map((image) => (
              <>
                {filter==image.query || filter=="all" ? <FavImageCard removeFavorite={removeImage} image={image}/> : <span></span>}
              </>
              ))}
          </div>
        </div>
      </>
    )
  } else {
    return (
    <>
      <h1 className="text-2xl pl-20 pt-10">YOUR FAVORITES</h1>
        <div className="container my-12 mx-auto px-2 md:px-12">
          <div className="flex flex-wrap -mx-1 lg:-mx-4">
          <div className="tracking-in-expand w-full p-200 text-center text-gray-300 mt-40 text-2xl">No Favorites Yet</div>
          </div>
        </div>
    </>
    )
  }
}

export default Favorites;