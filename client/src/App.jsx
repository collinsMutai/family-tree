import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import "./App.css";
import axios from "axios";
import FamilyContextProvider from "./FamilyContext";

axios.defaults.baseURL = "http://localhost:3000";


axios.defaults.withCredentials = true;

function App() {
  return (
    <FamilyContextProvider>
      <Routes>
        <Route index path="/" element={<Home />} />
      </Routes>
    </FamilyContextProvider>
  );
}

export default App;
