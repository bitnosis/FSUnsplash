import ImageCard from './ImageCard.js'
import './ImageResults.css'

const ImageResults = ({viewTheImage, addToFavorites, removeFavorite, results}) => {
    return (
        <>  
            <div class="container pb-10 my-12 mx-auto px-4 md:px-12">
                <div class="flex flex-wrap -mx-1 lg:-mx-4">
                {results.map((image) => (
                <>
                <ImageCard key="{image.id}" viewTheImage={viewTheImage} addToFavorites={addToFavorites} removeFavorite={removeFavorite} image={image} />
                </>
                ))}
                </div>
            </div>
        </>
    );
}

export default ImageResults;


