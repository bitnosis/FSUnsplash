import React, { useState, useEffect} from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import  {toJson} from 'unsplash-js'
import ImageResults from './ImageResults.js'
import FullScreenImage from './FullScreenImage.js'
import './Search.css'

const Search = ({unsplash, addToFavorites, removeFavorite}) => {
    const Loading = () => <div className="tracking-in-expand w-full p-200 text-center mt-40 text-2xl">Searching...</div>
    const Loaded = () => <ImageResults viewTheImage={viewTheImage} addToFavorites={addToFavorites} removeFavorite={removeFavorite} results={results} />
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isLoading, setLoading] = useState(false)
    const [firstSearch, setFirstSearch] = useState(true)
    const [searchExecuted, setExecuted] = useState(false)
    const [pagination, setPagination] = useState({page:1, perPage:16})
    const [isBottom, setIsBottom] = useState(false);
    const [viewImage, setViewImage] = useState(null);
    const history = useHistory()

    // Get history on first load
    const useQuery= () => {
      return new URLSearchParams(useLocation().search);
    }

    let keyword = useQuery().get('keyword')

    // Load last search if any
    useEffect(() => {
      if(keyword!=null){
        changeQuery(keyword)
        searchPhotos(keyword)
      }
    }, []);

    // History listener for query string change
    useEffect(() => {
      return history.listen(location => {
        let key = location.search.replace("?keyword=", "")
        if(key!=null && key!=""){
          changeQuery(key)
          searchPhotos(key)
        }
      })
    }, [])

    // Scroll listener for infinite scroll
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Increase page count, and search photos based on last query, on scroll to bottom
    useEffect(() => {
      if (isBottom) {
        setPagination({page:pagination.page+=1, perPage:16})
        searchPhotos()
      }
    }, [isBottom]);

    // Handle the scroll and set Bottom to true, for infinite scroll
    const handleScroll = () => {
      const scrollTop = (document.documentElement
        && document.documentElement.scrollTop)
        || document.body.scrollTop;
      const scrollHeight = (document.documentElement
        && document.documentElement.scrollHeight)
        || document.body.scrollHeight;
      if (scrollTop + window.innerHeight + 50 >= scrollHeight){
        setIsBottom(true);
        window.scrollTo(0, scrollTop -150);
      }
    }

    // Change the search query
    const changeQuery = (value) =>{
      setResults([])
      setLoading(true)
      setFirstSearch(false)
      setExecuted(false)
      setQuery(value)
    }

    // Hit enter on the search form
    const enterSearch = (e) =>{
      e.preventDefault()
      history.push('?keyword='+query);
      searchPhotos(query)
    }

    // Close the modal
    const closeModal = () => {
      setViewImage(null)
    }

    // View an image in modal
    const viewTheImage = (image) => {
      setViewImage(image)
    }


    // Search the photos
    const searchPhotos = async (q=null) => {
      // If q isnt set set it to the query state variable
      if(q==null){ q=query }
      unsplash.search
      .photos(q, pagination.page, pagination.perPage)
      .then(toJson)
      .then((json) => {
        let imgs = []
        if(isBottom) { 
          imgs = results 
          setIsBottom(false)
        } else {
          setLoading(true)
        }
        json.results.forEach(image => {
          imgs.push({
            id:image.id, inFavorites:false, 
            likes: image.likes, user:image.user, query: q, 
            links:{download:image.links.download},
            src:image.urls.regular, thumbnail:image.urls.thumb, small:image.urls.small, 
            alt:image.alt_description})
        });
        setResults(imgs);
        setLoading(false)
        setExecuted(true)
      });
    };

    return(
      <>
        {viewImage!=null ? <FullScreenImage closeModal={closeModal} image={viewImage} /> : ""}
        
        <form onSubmit={enterSearch}>
          <div className="shadow p-4 flex dark:bg-black">
            <span className="w-auto flex justify-end items-center text-grey p-2">
                <i className="material-icons text-3xl">search</i>
            </span>
            <input  
              value={query}
              onChange={(e)=>changeQuery(e.target.value)} className="ml-4 w-full mt-2 rounded p-2" type="text" placeholder="Try 'Lighthouse' or 'Dog'" />
            <button className="ml-4 bg-black dark:bg-gray-700 hover:bg-red-lighter rounded text-white p-2 pl-4 pr-4">
                  <p className="font-semibold text-xl">Search</p>
            </button>
          </div>
        </form>
        {isLoading && !firstSearch? <Loading /> : <Loaded />}
        {firstSearch ? <div className="tracking-in-expand w-full p-200 text-gray-200 text-center mt-40 text-2xl">Search for something above</div> : <span></span>}
        {searchExecuted && results.length<=0 ? <div className="tracking-in-expand w-full p-200 text-gray-200 text-center mt-40 text-2xl">No Results Found for '{query}'</div> : <span></span>}
      </>
    )
}

export default Search;