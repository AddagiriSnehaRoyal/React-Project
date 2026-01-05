import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('studentProfile');
    localStorage.removeItem('adminProfile');
    navigate('/');
  };

  return (
    <button 
      onClick={handleLogout}
      className="btn btn-secondary"
      style={{padding: '8px 16px', fontSize: '0.9rem'}}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
