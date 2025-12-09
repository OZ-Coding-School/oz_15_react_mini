import './App.scss'; 
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MyList from './pages/MyList';
import Home from './pages/Home';
import About from './pages/About';
import Movies from './pages/Movies';
import Contact from './pages/Contact';
import Series from './pages/Series';
import MovieDetail from './components/MovieDetail'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="movies" element={<Movies />} />
        <Route path="series" element={<Series />} />
        <Route path="contact" element={<Contact />} />
        <Route path="detail/:id" element={<MovieDetail />} /> 
        <Route path="mylist" element={<MyList />} />
      </Route>
    </Routes>
  );
}

export default App;