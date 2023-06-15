import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import useAuth from './Pages/CurrentUser';

function App() {
  const { currentUser } = useAuth();

  const PrivateRoute = ({ element, path }) => {
    if (!currentUser) {
      return <Navigate to="/login" replace />;
    }
    return <Routes><Route path={path} element={element}/></Routes>;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={currentUser ? <PrivateRoute element={<Home />} /> : <Navigate to="/login" replace />}
        />      
        </Routes>
    </Router>
  );
}

export default App;
