import './Header.css'
import { useNavigate, Outlet, Link  } from "react-router-dom"
import { useState } from "react"


function Header () {

  let navigate = useNavigate()

  const [query, setQuery] = useState('') 
 
  const handleSearch = event => {
    event.preventDefault()
    navigate(`/search/${query}`)
    //when clicked search, take user to that page
    setQuery('')
  }

  const handleText = event => {
    const genre = event.currentTarget.textContent;
    navigate(`/genre/${genre}`);
  };

  return (

    <div className="Header">

      <div className='main-bar'>

        <form onSubmit={handleSearch}>
          <input type="text" placeholder='Search by Title or Author' value={query} onChange={event => setQuery(event.target.value)} />
          <button>Search</button>
        </form>

        <Link to={'/favorite'}><button>Favorite</button></Link>
        <Link to={'/myshelf'}><button>My Shelf</button></Link>

      </div>
      
      <div className='nav-bar'>

        <button onClick={handleText}>Fiction</button>
        <button onClick={handleText}>Nonfiction</button>
        <button onClick={handleText}>Science</button>
        <button onClick={handleText}>Politics</button>
        <button onClick={handleText}>Business</button>
        <button onClick={handleText}>Poetry</button>
        <button onClick={handleText}>Law</button>
        <button onClick={handleText}>Biography</button>

      </div>
      
      
      <Outlet />

    </div>
  )
}

export default Header

