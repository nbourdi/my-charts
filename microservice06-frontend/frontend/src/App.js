import logo from './logo.svg';
import './App.css';
import CreateBar from './webpages/create/bar_chart.js';
import Layout from './components/layout.js';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';

function App() {
  return (
    <Router>
    <Routes>
        <Route path="/" element={<Layout />}>
        <Route exact path='/' element={<CreateBar />} />
    </Route>
    </Routes>
    </Router>
    
    
  );
}

export default App;
