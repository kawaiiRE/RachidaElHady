import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
// import Dashboard from './pages/Dashboard'
import Home from './pages/HomePage/Home'
import Profile from './pages/Profile'
import CrazySudoku from './projects/CrazySudoku/CrazySudoku'
// import Settings from './pages/Settings'
// import Analytics from './pages/Nested/Analytics'
// import Reports from './pages/Nested/Reports'
// import logo from './logo.svg';
// import './App.css';

function App () {
  return (
    <Router basename="/RachidaElHady">
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/projects/crazySudoku" element={<CrazySudoku />} />
          {/* <Route path='/settings' element={<Settings />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/reports' element={<Reports />} /> */}
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
