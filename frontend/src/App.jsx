import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Explore from "./pages/Explore";
import ShareExperience from "./pages/ShareExperience";
import ThankYou from "./pages/ThankYou";
import PlanTrip from "./pages/PlanTrip";
import BusinessPromotion from "./pages/BusinessPromotion";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/share" element={<ShareExperience />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/plan-trip" element={<PlanTrip />} />
        <Route path="/business" element={<BusinessPromotion />} />
      </Routes>
    </Router>
  );
}

export default App;
