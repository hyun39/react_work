import logo from './logo.svg';
import './App.css';

import Header from './components/Header';
import Prototypes from './components/Prototypes';
import Orders from './components/Orders';
import Footer from './components/Footer';
import Checkout from './components/Checkout';
import AppStateContext from './contexts/AppStateContext';
import AppStateProvider from './proviers/AppStateProvier';

import {BrowserRouter,Routes, Route,Link} from "react-router-dom"
import Home from './components/Home';

function App() {
  return (
    <AppStateProvider>
    <BrowserRouter>
      <Routes>
      <Route  exact path='/' default  element={<Home/>}></Route>
        <Route exact path='/checkout' element={<Checkout/>}></Route>
      </Routes> 
    </BrowserRouter>   
    </AppStateProvider>     
  );
}

export default App;
