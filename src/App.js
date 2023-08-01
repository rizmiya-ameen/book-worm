import BookLibrary from './BookLibrary';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import BookDetail from './BookDetail';
import NotFoundPage from './NotFoundPage'

function App() {
  return (
    <div className="App">
      
      <Routes>
  
        <Route path='/' element={<BookLibrary />} />
        <Route path=':bookID'element={<BookDetail />}/> 
        

        <Route path='*' element={<NotFoundPage />}/>
      </Routes>

      
    </div>
  );
}

export default App;
