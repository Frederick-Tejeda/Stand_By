import './styles/App.css';
import { Routes, Route } from 'react-router-dom'
import Intro from './views/Intro.js'
import Signin from './views/Signin.js'
import Login from './views/Login.js'
import Home from './views/Home.js'
import ChangePassword from './views/ChangePassword.js'

function App() {

  return (
        <>
            <Routes>
                <Route path='/' Component={Intro}/>
                <Route path='/signin' Component={Signin}/>
                <Route path='/login' Component={Login}/>
                <Route path='/home' Component={Home}/>
                <Route path='/change' Component={ChangePassword}/>
            </Routes>
        </>
  );
}

export default App;
