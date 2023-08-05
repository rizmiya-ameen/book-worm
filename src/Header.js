import './Header.css'
import { useNavigate, Outlet  } from "react-router-dom"
import { useState } from "react"
//import SearchResults from './SearchResults'

function Header () {

  let navigate = useNavigate()

  const [query, setQuery] = useState('') 
 
  const handleSearch = event => {
    event.preventDefault()
    navigate(`/search/${query}`)
    //when clicked, search, take user to that page
    setQuery('')
  }

  const handleText = event => {
    const genre = event.currentTarget.textContent;
    navigate(`/genre/${genre}`);
  };

  return (
    <div className="Header">
      <form onSubmit={handleSearch}>
        <input type="text" value={query} onChange={event => setQuery(event.target.value)} />
        <button>Search</button>
      </form>

      <button onClick={handleText}>Fiction</button>
      <button onClick={handleText}>Nonfiction</button>
      <button onClick={handleText}>Science</button>
      <button onClick={handleText}>Politics</button>
      <button onClick={handleText}>Business</button>
      <button onClick={handleText}>Poetry</button>
      <button onClick={handleText}>Art and Photography</button>
      <button onClick={handleText}>Biography</button>
      
      <Outlet />
    </div>
  )
}

export default Header

