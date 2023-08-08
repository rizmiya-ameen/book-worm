import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MyShelf.css'

function MyShelf () {

  const [toReadBooks, setToReadBooks] = useState ([])
  const [readingBooks, setReadingBooks] = useState ([])
  const [completedBooks, setCompletedBooks] = useState ([])


  //Update the local storage after removing a set of books
  const handleRemovalToRead = () => {
    localStorage.removeItem('toReadBooks');
    setToReadBooks([]);
  }

  const handleRemovalReading = () => {
    localStorage.removeItem('readingBooks');
  setReadingBooks([]);
  }

  const handleRemovalCompleted = () => {
    localStorage.removeItem('completedBooks');
    setCompletedBooks([]);
  }



  //Update the local storage after removing one of the books
  const handleRemoveOneToRead = (clickedObject) => {
    const removeBook = toReadBooks.filter(item => item !== clickedObject)
    setToReadBooks(removeBook)
    localStorage.setItem('toReadBooks', JSON.stringify(removeBook)); // 
  }

  const handleRemoveOneReading = (clickedObject) => {
    const removeBook = readingBooks.filter(item => item !== clickedObject)
    setReadingBooks(removeBook)
    localStorage.setItem('readingBooks', JSON.stringify(removeBook)); 
  }

  const handleRemoveOneCompleted = (clickedObject) => {
    const removeBook = completedBooks.filter(item => item !== clickedObject)
    setCompletedBooks(removeBook)
    localStorage.setItem('completedBooks', JSON.stringify(removeBook)); 
  }


  const handleMoveToReading = (clickedObject) => {
    const movedBook = toReadBooks.filter(item => item !== clickedObject)
    setReadingBooks([...readingBooks, clickedObject])
    setToReadBooks(movedBook)
    localStorage.setItem('toReadBooks', JSON.stringify(movedBook));
    localStorage.setItem('readingBooks', JSON.stringify([...readingBooks, clickedObject]));
    //console.log(toReadBooks)
    //console.log(readingBooks)
  }

  const handleMoveToCompleted = (clickedObject) => {
    const movedBook = readingBooks.filter(item => item !== clickedObject)
    setCompletedBooks([...completedBooks, clickedObject])
    setReadingBooks(movedBook)
    localStorage.setItem('readingBooks', JSON.stringify(movedBook));
    localStorage.setItem('completedBooks', JSON.stringify([...completedBooks, clickedObject]));
    //console.log(readingBooks)
    //console.log(completedBooks)
  }


  // Get books from local storage on component mount
  useEffect(() => {
    const storedToReadBooks = localStorage.getItem('toReadBooks');
    if (storedToReadBooks) {
      setToReadBooks(JSON.parse(storedToReadBooks));
    }
    const storedReadingBooks = localStorage.getItem('readingBooks');
    if (storedReadingBooks) {
      setReadingBooks(JSON.parse(storedReadingBooks));
    }

    const storedCompletedBooks = localStorage.getItem('completedBooks');
    if (storedCompletedBooks) {
      setCompletedBooks(JSON.parse(storedCompletedBooks));
    }
  }, []);

  //console.log(toReadBooks)

  return (

    <div className="MyShelf">
      
      <Link to={'/'}><button>Home</button></Link>
      <h2>MyShelf</h2>

      <div className='to-read'>

        <h3>To-Read {toReadBooks.length}</h3>
        <button onClick={handleRemovalToRead}>Clear All</button>
        

        <div className='myshelf-books'>

          {toReadBooks && toReadBooks.map(item => (

            <div key={item.id}>
              <img src={item.image} alt=''/>

              <p>{item.title}</p>

              {item.authors.length > 1 ? <p>{item.authors[0]} and more</p> : <p>{item.authors[0]}</p>}

              <button onClick={() => handleRemoveOneToRead(item)}>Remove</button>

              <button onClick={() => handleMoveToReading(item)}>Move to Reading</button>

            </div>

          ))}

        </div>

      </div>





      <div className='reading'>

        <h3>Reading {readingBooks.length}</h3>
        <button onClick={handleRemovalReading}>Clear All</button>

        <div className='myshelf-books'>

          {readingBooks && readingBooks.map(item => (

            <div key={item.id}>

              <img src={item.image} alt=''/>

              <p>{item.title}</p>

              {item.authors.length > 1 ? <p>{item.authors[0]} and more</p> : <p>{item.authors[0]}</p>}

              <button onClick={() => handleRemoveOneReading(item)}>Remove</button>

              <button onClick={() => handleMoveToCompleted(item)}>Move to Completed</button>

            </div>

          ))}
          
        </div>

      </div>






      <div className='completed'>

        <h3>Completed {completedBooks.length}</h3>
        <button onClick={handleRemovalCompleted}>Clear All</button>

        <div className='myshelf-books'>

          {completedBooks && completedBooks.map(item => (

              <div key={item.id}>

                <img src={item.image} alt=''/>

                <p>{item.title}</p>

                {item.authors.length > 1 ? <p>{item.authors[0]} and more</p> : <p>{item.authors[0]}</p>}
                
                <button onClick={() => handleRemoveOneCompleted(item)}>Remove</button>
              
              </div>

            ))}

        </div>

      </div>
      
      
        
    
    </div>
  )
}

export default MyShelf


