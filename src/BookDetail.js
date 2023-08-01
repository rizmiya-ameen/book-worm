import './BookDetail.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect} from 'react'
import { BOOKS_API_KEY } from "./Key"

function BookDetail () {

  const params = useParams()
  console.log(params)

  const [book, setBook] = useState({})

  const handleBooks = () => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${params.bookID}?key=${BOOKS_API_KEY}`)
      .then(res => res.json())
      .then(res => setBook(res))
      //.then(res => console.log(res.id))
  };

  
  useEffect(handleBooks, [params.bookID])
  
  if (!params.bookID) {
    return <p> </p>
  }

  if (!book) {
    return <div> </div>; 
  }
  

  
  const {volumeInfo = {}} = book;
  const {title, authors, categories, description, imageLinks = {}, industryIdentifiers, publisher, publishedDate, pageCount} = volumeInfo;

  const getHttpsLink = (httpLink) => httpLink.replace(/^http:\/\//i, 'https://');

  
  const removeHTMLTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };
  
  const imageUrl = imageLinks && imageLinks.extraLarge
  ? getHttpsLink(imageLinks.extraLarge)
  : (imageLinks && imageLinks.smallThumbnail)
    ? getHttpsLink(imageLinks.smallThumbnail)
    : null;

  return (

    <div className="BookDetail">

      <div className='image-bookdetails'>

        <div>
          {console.log(book)}
          <p>Title: {title}</p>
          <p>Author: {authors}</p>
          <p>publisher: {publisher}</p>
          <p>publishedDate: {publishedDate}</p>
          <p>pageCount: {pageCount}</p>
          {industryIdentifiers && industryIdentifiers.length > 0 && 
          industryIdentifiers[1].type === 'ISBN_13' && <p>ISBN_13: {industryIdentifiers[1].identifier}</p> 
          }
        </div>

        <div>
          
          {imageUrl && <img src={imageUrl} alt={title} height='300px' />}
          
          {categories ? <p>categories: {categories}</p> : null}
        </div>

      </div>

      <div className='description'>
        {description ? <p>{removeHTMLTags(description)}</p> : null}
      </div>

    </div>


  )
}

export default BookDetail

