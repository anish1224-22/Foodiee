import './App.css';
import Home from './Screens/Home.js';
import Login from './Screens/Login';
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { CartProvider } from './Components/ContextReducer';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SignUp from './Screens/SignUp';
import MyOrder from './Screens/MyOrder';
function App() {
  return (
    <CartProvider>
      <Router>
    <div style={{backgroundColor:"rgb(35, 35, 36)"}} >
      <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/Login' element={<Login/>}/>
      <Route exact path='/CreateUser' element={<SignUp/>}/>
      <Route exact path="/myOrder" element={<MyOrder />} />
      </Routes>
    </div>
    </Router>
    </CartProvider>
    
  );
}

export default App;
