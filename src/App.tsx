import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import OnboardOne from "./Components/Onboarding/Onboard";
import Login from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/Signup";
import { ConfettiSideCannons } from "./Components/Authentication/SignupSuccess";
import BasketDetail from "./Components/Dashboard/BasketDetails/BasketDetails";
import Home from "./Components/Dashboard/Home/Home";
import CreateBasket from "./Components/Dashboard/CreateBasket/CreateBasket";
import Read from "./Components/Dashboard/Read/Read";
import AuthStateCheck from "./Components/Loaders/AuthLoader";
import ForgotPassword from "./Components/Authentication/ForgotPassword";
import TypeBaskets from "./Components/Dashboard/TypeBakset/TypeBasket";

function App() {
  return (
    <div id="body" className="mx-auto" style={{ maxWidth: "1028px" }}>
      <Routes>
        <Route path="/" element={<AuthStateCheck />}></Route>
        <Route path="/onboard" element={<OnboardOne />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signupsuccess" element={<ConfettiSideCannons />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/basket/:id" element={<BasketDetail />} />
        <Route
          path="/read/:id/:day/:timing/:questionIndex"
          element={<Read />}
        />
        <Route path="/create-new-basket" element={<CreateBasket />} />
        <Route path="/live" element={<TypeBaskets type="pending" />} />
        <Route path="/completed" element={<TypeBaskets type="completed" />} />
      </Routes>
    </div>
  );
}

export default App;
