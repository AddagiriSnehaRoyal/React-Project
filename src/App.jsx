import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import CareerPaths from './pages/CareerPaths';
import StudyTips from './pages/StudyTips';
import CounselingForm from './pages/CounselingForm';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import CareerTest from './pages/CareerTest';
import MySessions from './pages/MySessions';
import './index.css';
import AdmissionProcess from './pages/AdmissionProcess';
import Events from './pages/Events';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/career-paths" element={<CareerPaths />} />
            <Route path="/study-tips" element={<StudyTips />} />
            <Route path="/counseling" element={<CounselingForm />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
<Route path="/admission-process" element={<AdmissionProcess />} />
<Route path="/events" element={<Events />} />
            
            {/* Protected Routes */}
             <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/student-dashboard" 
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          } 
        />
            
            <Route path="/career-test" element={<CareerTest />} />
            <Route path="/my-sessions" element={<MySessions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
