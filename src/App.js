import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./screens/home";
import Checkout from "./screens/checkout";
import Paginated from "./screens/paginated";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/photo/:page" element={<Paginated />} />
      </Routes>
    </Router>
  );
};

export default App;
