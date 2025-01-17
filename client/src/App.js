import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import DailyMarkPage from './pages/daily-mark';
import QuitDateComponents from './components/quit-date';
function App() {
  return (
<Router>
      <div>
        <Routes>
          <Route path="/" />
          <Route path="/login" element={< LoginPage />} />
          <Route path="/register" element={< RegisterPage />} />
          <Route path="/quit-date" element={< QuitDateComponents />} />
          <Route path="/daily-mark" element={< DailyMarkPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
