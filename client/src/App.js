import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

function App() {
  return (
<Router>
      <div>
        <Routes>
          <Route path="/" />
        </Routes>
      </div>
    </Router>
  );
}

export default App;