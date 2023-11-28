import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Checkout from './pages/Checkout';
import Addtocart from './pages/Addtocart';
import Bookpreview from './pages/Bookpreview';
import CategoryPrevierw from './pages/CategoryPreview';
import SearchedItem from './pages/SearchedItem';
import UserLoginRegister from './pages/UserLoginRegister';
import ProtectedRoute from './pages/ProtectedRoute';
import BookHolder from './components/BookHolder';
import DetailsSubmitted from './pages/DetailsSubmitted';



const App = () => {
  return (
  
    <div className="App">

        <BrowserRouter>
          <Routes>
          <Route path='/' element={<Homepage/>}></Route>
          <Route path='/books/:id' element={<Bookpreview/>}></Route>
          <Route path='/books/category/:number' element={<CategoryPrevierw/>}></Route>
          <Route path='/books/search/:query' element={<SearchedItem/>}></Route>
          <Route path='/Checkout' element={<Checkout/>}></Route>
          <Route path='/Addtocart' element={<Addtocart/>}></Route>
          <Route path='/DetailsSubmitted' element={<DetailsSubmitted/>}></Route>
          <Route element={<ProtectedRoute/>}></Route>
            
            
            <Route path='/log-reg' element={<UserLoginRegister/>}></Route>
           </Routes> 
        </BrowserRouter>
        
      </div>
  );
}

export default App;
