import { useState, useEffect } from 'react'
import GenreBooks from './GenreBooks'
import { BOOKS_API_KEY } from "./Key"
import Header from './Header'
import SideBar from './SideBar'
import './BookLibrary.css'
import BookDetail from './BookDetail'

function BookLibrary () {

  const [ fetchedBooks, setFetchedBooks] = useState([])
  
  const category = ['New Releases', 'Science', 'Fiction', 'Romance'] 

  
  const handleFetchedBooks = (category) => {
    (category === 'New Releases' ?
    fetch(`https://www.googleapis.com/books/v1/volumes?key=${BOOKS_API_KEY}&q={search_query}&orderBy=newest&maxResults=10&langRestrict=en`) :
    fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${category}&orderBy=newest&key=${BOOKS_API_KEY}&langRestrict=en`)
    )
      .then(res => res.json())
      .then(res => {
        const uniqueISBNs = new Set();
  
        const nonDuplicate = res.items.filter(item => {
          const isbn13 = item.volumeInfo.industryIdentifiers.find(identifier => identifier.type === 'ISBN_13')?.identifier;
          if (isbn13 && !uniqueISBNs.has(isbn13)) {
            uniqueISBNs.add(isbn13);
            return true;
          }
          return false;
        });
        
        setFetchedBooks(prevState => ({ ...prevState, [category]: nonDuplicate }));
      })
      .catch(error => console.error(error));
  }

  useEffect(() => {
    category.forEach(category => {
      handleFetchedBooks(category);
    });
  }, []);


  return (
    <div className="BookLibrary">

      <Header />

      <SideBar />

      {category.map((category) => (
        <div key={category}>
          <h3>{category}</h3>
          <GenreBooks 
            category={category}
            fetchedBooks={fetchedBooks[category] || []}
          />
        </div>
      ))}

      <BookDetail />
      
    </div>
  )
}

export default BookLibrary
