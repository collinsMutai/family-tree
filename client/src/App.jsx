import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import "./App.css";
import axios from "axios";
import FamilyContextProvider from "./FamilyContext";
import DetailsPage from "./components/DetailsPage";

// axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.baseURL = "https://family-tree-backend-evr9.onrender.com";


axios.defaults.withCredentials = true;

function App() {
  return (
    <FamilyContextProvider>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/view" element={<DetailsPage />} />
      </Routes>
    </FamilyContextProvider>
  );
}

export default App;
