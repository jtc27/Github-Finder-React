import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Alert from './components/layout/Alert';

import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import User from './pages/User';

import { GithubProvider } from './context/github/GithubContext';
import { AlertProvider } from './context/alert/AlertContext';


function App() {
  return (
   <GithubProvider>  {/* Wrap everything so the data in Context can be used */}
   <AlertProvider> 
    <Router>
      <div className='flex flex-col justify-between h-screen bg-gray-600 text-white'>
        <Navbar />

        <main className='flex flex-col mx-auto px-3 pb-12 bg-gray-600'>
          <Alert/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/user/:login' element={<User />} />
          <Route path='/notfound' element={<NotFound />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>

        </main>
        
        <Footer />
      </div>
    </Router>
  </AlertProvider> 
  </GithubProvider>
  );
}

export default App;
