import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VideoCallApp from './VideoCallApp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:roomID" element={<VideoCallApp />} />
      </Routes>
    </Router>
  );
}

export default App;
