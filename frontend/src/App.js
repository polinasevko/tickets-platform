import "./assets/styles/style.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Landing from "./pages/Landing/Landing";
import Filtering from "./pages/Filtering/Filtering";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="main-container">
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/concerts" element={<Filtering />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
