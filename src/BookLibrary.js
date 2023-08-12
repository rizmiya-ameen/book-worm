import { useState, useEffect } from 'react'
import GenreBooks from './GenreBooks'
import { BOOKS_API_KEY } from "./Key"
import './BookLibrary.css'
import { Container, Typography } from '@mui/material'


function BookLibrary () {

  const [ fetchedBooks, setFetchedBooks] = useState([])
  
  const category = ['New Releases', 'Science', 'Health and Fitness', 'Cooking'] 


  const handleFetchedBooks = (category) => {

    (category === 'New Releases' ?
    fetch(`https://www.googleapis.com/books/v1/volumes?key=${BOOKS_API_KEY}&q={search_query}&orderBy=newest&maxResults=10&langRestrict=en`) 
    :
    fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${category}&orderBy=newest&maxResults=20&key=${BOOKS_API_KEY}&langRestrict=en`)
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

  //For each category the handleFetchedBooks function is called
  useEffect(() => {
    category.forEach(category => {
      handleFetchedBooks(category);
    });
  }, []);


  return (
    <Container sx={{marginTop: '200px'}}>
      
      {category.map((category) => (
        <Container key={category}>
          <Typography variant="subtitle1" component="subtitle2" sx={{paddingX:'24px'}}>{category}</Typography>
          <GenreBooks 
            category={category}
            fetchedBooks={fetchedBooks[category] || []}
            
          />
        </Container>
      ))}
      
    </Container>
  )
}

export default BookLibrary


