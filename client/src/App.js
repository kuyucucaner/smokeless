import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import StatsPage from './pages/stats';
import DailyMarkPage from './pages/daily-mark';
import QuitDateComponent from './components/quit-date';
import SetGoalsComponent from './components/set-goals';
function App() {
  return (
<Router>
      <div>
        <Routes>
          <Route path="/" />
          <Route path="/login" element={< LoginPage />} />
          <Route path="/register" element={< RegisterPage />} />
          <Route path="/quit-date" element={< QuitDateComponent />} />
          <Route path="/set-goal" element={< SetGoalsComponent />} />
          <Route path="/daily-mark" element={< DailyMarkPage />} />
          <Route path="/stats" element={< StatsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
