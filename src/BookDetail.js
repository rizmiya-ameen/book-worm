import './BookDetail.css'
import { useParams, Link } from 'react-router-dom'
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

  const [favorite, setFavorite] = useState ([])
  //console.log(favorite.length)
  //console.log(favorite)

  const [toReadBooks, setToReadBooks] = useState ([])

 
  const handleFavorite = (clickedObject) => {
    const newFavorite = {
      id: clickedObject?.id,
      image: clickedObject?.volumeInfo?.imageLinks?.thumbnail,
      title: clickedObject?.volumeInfo?.title,
      authors: clickedObject?.volumeInfo?.authors,
    };

    // Check if the book is already in favorites
    if (!favorite.some(item => item.id === newFavorite.id)) {
      setFavorite([newFavorite, ...favorite]);
      localStorage.setItem('favoriteBooks', JSON.stringify([newFavorite, ...favorite])); 
      // Update the local storage after adding the book
    }

    //console.log([newFavorite, ...favorite ]);
  };
  
  const handleMyShelf = (clickedObject) => {
    const newShelfBook = {
      id: clickedObject?.id,
      image: clickedObject?.volumeInfo?.imageLinks?.thumbnail,
      title: clickedObject?.volumeInfo?.title,
      authors: clickedObject?.volumeInfo?.authors,
    };

    // Check if the book is already in myshelf
    if (!toReadBooks.some(item => item.id === newShelfBook.id)) {
      setToReadBooks([newShelfBook, ...toReadBooks]);
      localStorage.setItem('toReadBooks', JSON.stringify([newShelfBook, ...toReadBooks])); 
      // Update the local storage after adding the book
    }
    //console.log([newShelfBook, ...toReadBooks])
  };
  
  
  useEffect(() => {
    // Get favorites from localStorage on component mount
    const storedFavorites = localStorage.getItem('favoriteBooks');
    if (storedFavorites) {
      setFavorite(JSON.parse(storedFavorites));
    }

    const storedMyShelfBooks = localStorage.getItem('toReadBooks');
    if (storedMyShelfBooks) {
      setToReadBooks(JSON.parse(storedMyShelfBooks));
    }
  }, []);
  

  // Update localStorage whenever the favorite state changes
  useEffect(() => {
    localStorage.setItem('favoriteBooks', JSON.stringify(favorite));
    localStorage.setItem('toReadBooks', JSON.stringify(toReadBooks));
  }, [favorite, toReadBooks]);


  useEffect(handleBooks, [params.bookID])
  
  if (!params.bookID) {
    return <p>Please select a book to view.</p>;
  }

  if (!book) {
    return <p>Failed to fetch book details. Please try again later.</p>;
  }
  

  const {volumeInfo = {}} = book;
  const {title, authors, categories, description, imageLinks = {}, industryIdentifiers, publisher, publishedDate, pageCount} = volumeInfo;
  //if volumeInfo is not present or undefined, assigned to an empty object as its default value


  const getHttpsLink = (httpLink) => httpLink.replace(/^http:\/\//i, 'https://');
  //regular expression - replace the beginning of the URL with "https://"
  
  const removeHTMLTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };
  //to remove all HTML tags in the description
  
  const imageUrl = imageLinks && imageLinks.extraLarge
  ? getHttpsLink(imageLinks.extraLarge)
  : (imageLinks && imageLinks.smallThumbnail)
  ? getHttpsLink(imageLinks.smallThumbnail)
  : null;


  return (

    <div className="BookDetail">

      <div className='image-bookdetails'>

        <Link to={'/'}><button>Home</button></Link>

        <div>
          
          <p>Title: {title}</p>
          <p>Author: {authors}</p>
          <p>publisher: {publisher}</p>
          <p>publishedDate: {publishedDate}</p>
          <p>pageCount: {pageCount}</p>

         

          {industryIdentifiers && industryIdentifiers.length > 0 && 
          industryIdentifiers[0].type === 'ISBN_13'
          ? 
          <p>ISBN_13: {industryIdentifiers[0].identifier}</p>
          : 
          industryIdentifiers && industryIdentifiers.length > 0 && 
          industryIdentifiers[1].type === 'ISBN_13'
          ? 
          <p>ISBN_13: {industryIdentifiers[1].identifier}</p> 
          : null}
  
  
          <div>
            <button onClick={() => handleFavorite(book)}>Favorite</button>
  
            <button onClick={() => handleMyShelf(book)}>Add to My Shelf</button>
          </div>
  
  
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

  



