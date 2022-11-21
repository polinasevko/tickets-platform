import "./assets/styles/style.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Landing from "./pages/Landing/Landing";
import Filtering from "./pages/Filtering/Filtering";
import ConcertDetail from "./pages/ConcertDetail/ConcertDetail";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Order from "./pages/Order/Order";
import Account from "./pages/Account/Account";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <Header />
        <div className="main-container">
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route path="/concerts" element={<Filtering />} />
            <Route path="/concert/:id" element={<ConcertDetail />} />
            <Route path="/sign_in" element={<Login />} />
            <Route path="/sign_up" element={<SignUp />} />
            <Route path="/me" element={<Account />} />
            <Route
              path="/purchase"
              element={
                <PrivateRoute>
                  <Order />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
