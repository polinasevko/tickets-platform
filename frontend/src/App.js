import "./assets/styles/style.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Landing from "./pages/Landing/Landing";
import Filtering from "./pages/Filtering/Filtering";
import ConcertDetail from "./pages/ConcertDetail/ConcertDetail";
import Login from "./components/Login/Login";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="main-container">
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/concerts" element={<Filtering />} />
          <Route path="/concert/:id" element={<ConcertDetail />} />
          <Route path="/sign_in" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
