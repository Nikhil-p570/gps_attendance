import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./routes/Router"; // or wherever your router.jsx is

function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;
