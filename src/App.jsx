import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import SuperAdmin from "./pages/SuperAdmin";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Sign In Page */}
        <Route
          path="/"
          element={<Signin />}
        />

        {/* Sign Up Page */}
        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Super Admin Dashboard */}
        <Route
          path="/superadmin"
          element={<SuperAdmin />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;