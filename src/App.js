import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import MyRoutes from './compornent/router/router.jsx'; // Import the renamed component

function App() {
  return (
    <div className="App">
      <Router>
        <MyRoutes /> {/* Use the renamed component here */}
      </Router>
    </div>
  );
}

export default App;