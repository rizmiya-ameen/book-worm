//import BookLibrary from './BookLibrary';
import './App.css';
import { Routes, Route} from 'react-router-dom'
import BookDetail from './BookDetail';
import NotFoundPage from './NotFoundPage'
//import GenreBooks from './GenreBooks';
import SearchResults from './SearchResults';
import Header from './Header';
//import NavBar from './NavBar';
import SideBar from './SideBar';
import HomePage from './HomePage'

function App() {

  
  return (
    <div className="App">

      
      <Routes>


       <Route path='/' element={<><Header /><SideBar /><HomePage /></>} /> 

       

        <Route path=':bookID'element={<BookDetail />}/> 
        
        <Route path='/search' element={<><Header /></>} /> 

        <Route 
            path='/search/:queryText'
            element={<><SearchResults /><Header /></>}
          />

          
          <Route path='/genre' element={null} /> 
          <Route 
            path='/genre/:Text'
            element={<><SearchResults /><Header /></>}
  />

     
          





        <Route path='*' element={<NotFoundPage />}/>
      </Routes>
      
  
    </div>
  );
}

export default App;


