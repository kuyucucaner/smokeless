import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import StatsPage from './pages/stats';
import AchievementPage from './pages/achievement';
import StoryPage from './pages/story';
import DailyMarkPage from './pages/daily-mark';
import QuitDateComponent from './components/quit-date';
import SetGoalsComponent from './components/set-goals';
import CheckProgressComponent from './components/check-progress';
import FriendshipComponent from './components/friendship';
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
          <Route path="/check-progress" element={< CheckProgressComponent />} />
          <Route path="/friendship" element={< FriendshipComponent />} />
          <Route path="/daily-mark" element={< DailyMarkPage />} />
          <Route path="/stats" element={< StatsPage />} />
          <Route path="/story" element={< StoryPage />} />
          <Route path="/achievement" element={< AchievementPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
