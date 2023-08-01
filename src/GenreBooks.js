import './GenreBooks.css'
import { Link } from 'react-router-dom'

function GenreBooks ({fetchedBooks}) {

  return (

    <div className="GenreBooks">

      {fetchedBooks.map(item => {
        
        const { id, volumeInfo } = item;
        const { title, imageLinks, authors, averageRating, ratingsCount} = volumeInfo;
        //const { listPrice, isEbook, buyLink } = saleInfo;

         
        if (imageLinks && authors && authors.length > 0) {
        return (
          
          <div key={id}>

          
            {imageLinks && imageLinks.thumbnail && 
              <Link to={`/${id}`}>
                <img 
                  src={imageLinks.thumbnail} 
                  alt={title} 
                  height='200px'
                />
              </Link> 
            } 

            <p>{title}</p>

            {authors.length > 1 ? <p>{authors[0]} and more</p> : <p>{authors[0]}</p>}
            
            {averageRating && ratingsCount && <p>{averageRating} ★ ({ratingsCount})</p>}
          </div>
        ); }

        return null;
        
      })}
    </div>
  )
}
export default GenreBooks
