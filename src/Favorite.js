import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Favorite.css'

function Favorite () {

  
  const [favorite, setFavorite] = useState([]);

  const handleRemoval = () => {
    localStorage.removeItem('favoriteBooks');
    setFavorite([]);
  }

  const handleRemovalofOne = (clickedObject) => {
    const removeBook = favorite.filter(item => item !== clickedObject)
    setFavorite(removeBook)
    localStorage.setItem('favoriteBooks', JSON.stringify(removeBook)); // Update the local storage after removing the book
  }


  //to get favorites from local storage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteBooks');
    //if storedFavorites is empty on component mount it results an error
    if (storedFavorites) {
      setFavorite(JSON.parse(storedFavorites));
    }
  }, []);

  //console.log(favorite)
  

  return (

    <div className="Favorite">

      <Link to={'/'}><button>Home</button></Link>
      <h2>Favorite Books {favorite.length}</h2>
      <button onClick={handleRemoval}>Clear All</button>

      <div className='favorite-books'>

        {favorite && favorite.map(item => (
          
          <div key={item.id}>

            <img src={item.image} alt=''/>

            <p>{item.title}</p>

            {item.authors.length > 1 ? <p>{item.authors[0]} and more</p> : <p>{item.authors[0]}</p>}

            <button onClick={() => handleRemovalofOne(item)}>Remove</button>

          </div>

        ))}

      </div>
      
        
    </div>
  )
}

export default Favorite
