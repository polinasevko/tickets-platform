import './assets/styles/style.css';
import { Routes, Route, Link } from "react-router-dom";
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className='app'>
      <Header />
      <Routes>
        {/* <Route path="/" element={} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
