import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { RepoDetail } from './pages/repoDetail/RepoDetail';
import './App.css';

import 'materialize-css/dist/css/materialize.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h2 className="center-align">Github Repo Browser</h2>
        <hr />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/repo-detail/:repoOwner/:repoName/*' element={<RepoDetail/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
