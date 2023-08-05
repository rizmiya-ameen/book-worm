import BookLibrary from "./BookLibrary"
import Header from './Header'
//import NavBar from "./NavBar"
import SideBar from "./SideBar"

function HomePage () {
  return (
    <div className="HomePage">
      <Header />

      <SideBar />

      <BookLibrary />

      
    </div>
  )
}

export default HomePage

/*
<BookLibrary />
*/