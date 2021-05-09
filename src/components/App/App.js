import './App.css'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState, useEffect } from 'react'
import  Unsplash from 'unsplash-js'
import NavBar from './MyNavbar.js'
import Favorites from '../Favorites/Favorites.js'
import Search from '../Search/Search.js'
import SlideShow from '../Slider/SlideShow.js'
import UserPage from '../User/UserPage.js'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' 

const unsplash = new Unsplash({ accessKey: "pTnrz6Mc2ruyLiiC1V5oC7ibUbJ3b6seLHH3EdTw8v0" })
// Normally would do a .env variable here
// Didnt wanna make you have to create a .env file
//const unsplash = new Unsplash({ accessKey: process.env.REACT_APP_UNSPLASH_API_KEY })

const App = () => {
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('u_app_favorites')) || []);
  const [categories, setCategories] = useState(JSON.parse(localStorage.getItem('u_app_categories')) || []);

  // Add to favorites
  const addToFavorites = (image) => {
    if(!image.query){
      image.query=""
    }
    // Check if categories exist
    if (localStorage.getItem("u_app_categories") === null) {
        // Set the first category
        localStorage.setItem("u_app_categories", JSON.stringify([image.query]));
    } else {
        // Retrieve local storage favorites            
        let categories = JSON.parse(localStorage.getItem("u_app_categories"));
        // Search for ID in favorites
        var found = categories.includes(image.query);
        if(!found){
          if(image.query!="" && image.query!=null){
            categories.push(image.query)
            setCategories(categories)
            localStorage.setItem("u_app_categories", JSON.stringify(categories));
          }
        }
    }
    // Check if local storage item exists
    if (localStorage.getItem("u_app_favorites") === null) {
        // Set the first favorite
        let fav = JSON.stringify([image])
        localStorage.setItem("u_app_favorites", fav);
        setFavorites(fav)
        toast.success('Added Image #'+image.id+' to favorites under category: "'+image.query.toUpperCase()+'"')
    } else {
        // Retrieve local storage favorites            
        let fav = JSON.parse(localStorage.getItem("u_app_favorites"));
        // Search for ID in favorites
        var found = fav.filter(img => { return img.id === image.id })
        // If category found, search for the ID to see if photo is already in favorites
        if(found.length<1){
            fav.push(image);
            localStorage.setItem("u_app_favorites", JSON.stringify(fav));
        } 
        setFavorites(fav)
        toast.success('Added Image #'+image.id+' to favorites under category: "'+image.query.toUpperCase()+'"')
    }
  }

  // Remove from favorites
  const removeFavorite = (image) => {
    let fav = favorites.filter(img => img.id !== image.id)
    setFavorites(fav);
    localStorage.setItem("u_app_favorites", JSON.stringify(fav));
    toast.info('Removed image from favorites')
    return fav
  }

  return (
    <div className="App dark:bg-gray-900">
      <Router>
        <ToastContainer />
        <NavBar favorite_count={favorites.length} />
        <Route path="/" exact render={() => (<Search unsplash={unsplash} addToFavorites={addToFavorites} removeFavorite={removeFavorite} /> )} /> 
        <Route path="/favorites" render={() => (<Favorites removeFavorite={removeFavorite} /> )} /> 
        <Route path="/slideshow" component={SlideShow} />
        <Route path="/user/:username" render={() => (<UserPage addToFavorites={addToFavorites} removeFavorite={removeFavorite} unsplash={unsplash} /> )} /> 
      </Router>
    </div>
  );
}

export default App;
