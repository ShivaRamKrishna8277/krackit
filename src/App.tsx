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
import LiveBaskets from "./Components/Dashboard/LiveBaskets/LiveBaskets";
import CompletedBaskets from "./Components/Dashboard/CompletedBaskets/CompletedBaskets";
import Notifications from "./Components/Dashboard/Notifications/Notifications";
import Settings from "./Components/Dashboard/Settings/Settings";
import Read from "./Components/Dashboard/Read/Read";

function App() {
  return (
    <div id="body" className="mx-auto" style={{ maxWidth: "1028px" }}>
      <Routes>
        <Route path="/" element={<OnboardOne />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signupsuccess" element={<ConfettiSideCannons />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/basket/:id" element={<BasketDetail />} />
        <Route
          path="/read/:id/:day/:timing/:questionIndex"
          element={<Read />}
        />
        <Route path="/create-new-basket" element={<CreateBasket />} />
        <Route path="/live" element={<LiveBaskets />} />
        <Route path="/completed" element={<CompletedBaskets />} />
        <Route
          path="/notifications"
          element={
            <div className="bg-white">
              <Notifications />
            </div>
          }
        />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
