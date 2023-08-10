import './SearchResults.css'
import { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom"
import { BOOKS_API_KEY } from "./Key"
import { Pagination } from '@mui/material'

function SearchResults () {


  const params = useParams()
  console.log(params)
  console.log(params.queryText)
  console.log(params.Text)


  const [searchedBooks, setSearchedBooks] = useState([])

  const [startIndex, setStartIndex] = useState(0)
  const itemsPerPage = 20;
  const currentPage = Math.floor(startIndex / itemsPerPage) + 1;

  const handleSearchedBooks = () => {
    setSearchedBooks([]);
    
    (params.queryText ?
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${params.queryText}+inauthor:${params.queryText}&key=${BOOKS_API_KEY}&langRestrict=en&orderBy=newest&startIndex=${startIndex}&maxResults=20&printType=books`) 
    : 
    fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${params.Text}&orderBy=newest&startIndex=${startIndex}&maxResults=20&key=${BOOKS_API_KEY}&langRestrict=en`)
    )
    
    .then(res => res.json())
    
    .then(res => {
      const uniqueISBNs = new Set();

       
      const nonDuplicate = res && res.items && res.items.filter(item => {

        const industryIdentifiers = item.volumeInfo.industryIdentifiers

        const isbn13 = item && item.volumeInfo && industryIdentifiers && industryIdentifiers.length > 0 && industryIdentifiers.find(identifier => identifier.type === 'ISBN_13')?.identifier;
        if (isbn13 && !uniqueISBNs.has(isbn13)) {
          uniqueISBNs.add(isbn13);
          return true;
        }
        return false
      });
      
      setSearchedBooks(nonDuplicate);
      console.log(nonDuplicate)
    })
   
  }


  useEffect(() => {
    setStartIndex(1);
  }, [params.queryText, params.Text]);

  const handlePageChange = (event, page) => {
    const newStartIndex = (page - 1) * itemsPerPage;
    setStartIndex(newStartIndex);
  };
  
  
  useEffect(handleSearchedBooks, [params.queryText, params.Text, startIndex])
  

  return (


    <div className="SearchResults">

      <Link to={'/'}><button>Home</button></Link>
      
      {!searchedBooks || searchedBooks.length === 0 ? (

        <div>
          
          <p>Your search - {params.queryText || params.Text} - did not match any books </p> 
          <img src='https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnh3dGNoOTJrZWlsN2doaTE5MWRudWV4MjR1aHNqeWZzbmJ4bG5sNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l2JdURjPOMRsMixGw/200_d.gif' alt='' />
        </div>
      )  : (

        <p>Search results here for {params.queryText || params.Text}</p>
      )}


      <Pagination color='primary' count={10} page={currentPage} onChange={handlePageChange} />
      
      <div className="search-books">

        {searchedBooks && searchedBooks.map(item => {

          const {id, volumeInfo} = item;
          const {title, authors, averageRating, ratingsCount, imageLinks} = volumeInfo;

          
          if (imageLinks && title && authors && authors.length > 0) {
            return ( 

              <div key={id} className='search-results-books'>

                {imageLinks && imageLinks.thumbnail &&
                  <Link to={`/${id}`}> 
                    <img src={imageLinks.thumbnail} alt={title} width='150px' height='200px'  object-fit='cover'
                    float='left'
    
   />
                  </Link>
                }
    
                <p>{title}</p>
    
                {authors.length > 1 ? <p>{authors[0]} and more</p> : <p>{authors[0]}</p>}
                
                {averageRating && ratingsCount && <p>{averageRating} ★ ({ratingsCount})</p>}

              </div>
            )
          } else { return null}
        
        })}

      </div>
              
    </div>
  )
}
export default SearchResults