import './App.css';
import Login from './Login';
import Signup from './Signup';
import Student from './Student';
import CreateStudent from './CreateStudent';
import UpdateStudent from './UpdateStudent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';

function App() {
  return (
      <Router>
      <Routes>
      <Route path='/' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/student' element={<Student/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/create' element={<CreateStudent/>}></Route>
        <Route path='/update/:id' element={<UpdateStudent/>}></Route>
      </Routes>
      </Router>
  );
}

export default App;
