import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { RepoDetail } from './pages/repoDetail/RepoDetail';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className='header'>
          <div className='home-btn'>
            <Link to={'/'} className='btn-floating btn-large waves-effect waves-light deep-purple darken-1'>
              <i className='material-icons'>home</i>
            </Link>
          </div>
          <h1 className="center-align">Github Repo Browser</h1>
        </div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/repo-detail/:repoOwner/:repoName/*' element={<RepoDetail/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
