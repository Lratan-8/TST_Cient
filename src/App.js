import { Route, Routes } from "react-router";
import "./App.css";
import Layout from "./components/Layout";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <Layout />
      <Routes>
        <Route exact path="/login" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
