import './App.css';
import "react-toastify/dist/ReactToastify.css"
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import Navbar from './components/Navbar';
import Screen from './components/Screen';
import Cart from './components/Cart';
import Home from './components/Home';
import NotFound from './components/NotFound';


function App() {
  return (
    <div className="App px-5 py-3 flex flex-col gap-3">
      <BrowserRouter>
      <ToastContainer/>
        <Navbar />
        <Screen>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/cart" exact element={<Cart />} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </Screen>
      </BrowserRouter>
    </div>

  );
}

export default App;
