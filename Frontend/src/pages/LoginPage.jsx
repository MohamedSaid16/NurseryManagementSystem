import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/forms/LoginForm';
import { FaUserPlus, FaHome, FaArrowRight } from 'react-icons/fa';
import backgroundImage from '../assets/images/daycare-bg.jpg'; // Your background image

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (email, password) => {
    setError('');
    const result = await login(email, password);
    
    if (result.success) {
      const role = result.data.user.role;
      switch (role) {
        case 'parent':
          navigate('/parent/dashboard');
          break;
        case 'employee':
          navigate('/employee/dashboard');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
        default:
          navigate('/');
      }
    } else {
      setError(result.error);
    }
  };

  const handleSignUp = () => {
    navigate('/register-parent');
  };

  const styles = `
    .login-wrapper {
      display: flex;
      min-height: 100vh;
      background: #f4f7ff;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .login-box {
      width: 100%;
      max-width: 750px;   /* MEDIUM SIZE */
      background: white;
      border-radius: 28px;
      overflow: hidden;
      display: flex;
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.15);
    }

    .login-left {
      flex: 1;
      background-image: url(${backgroundImage});
      background-size: cover;
      background-position: center;
      position: relative;
      height: 160px;   /* smaller height */
    }

    .login-left::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        135deg,
        rgba(102, 126, 234, 0.72),
        rgba(118, 75, 162, 0.72)
      );
    }

    .login-left-content {
      position: absolute;
      bottom: 20px;
      left: 25px;
      color: #fff;
      z-index: 2;
    }

    .left-title {
      font-size: 1.8rem;
      font-weight: 800;
      margin-bottom: 0.3rem;
    }

    .left-subtitle {
      opacity: 0.95;
      font-size: 0.9rem;
      max-width: 250px;
      line-height: 1.4;
    }

    /* Right side */
    .login-right {
      flex: 1;
      padding: 2.3rem 2rem;   /* smaller padding */
      background: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .login-title {
      font-size: 1.8rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 0.4rem;
      color: #2d3748;
    }

    .login-subtitle {
      font-size: 0.9rem;
      text-align: center;
      color: #666;
      margin-bottom: 1.5rem;
    }

    .error-message {
      background: #ffe6e6;
      border-left: 4px solid #e63946;
      padding: 0.8rem;
      border-radius: 8px;
      margin-bottom: 1.2rem;
      font-size: 0.85rem;
      color: #b00020;
      text-align: center;
    }

    .signup-section {
      margin-top: 1.5rem;
      padding: 1.2rem;
      background: #f7f8ff;
      border-radius: 16px;
      text-align: center;
      border: 2px dashed #667eea;
    }

    .signup-section h3 {
      margin-bottom: 0.8rem;
      color: #2d3748;
      font-size: 1rem;
      font-weight: 600;
    }

    .signup-button {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border: none;
      padding: 0.7rem 1.4rem;
      font-size: 0.9rem;
      border-radius: 50px;
      margin-top: 0.5rem;
      cursor: pointer;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: 0.3s ease;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }

    .signup-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }

    .demo-accounts {
      background: #f8f9fa;
      border-radius: 14px;
      padding: 1.2rem;
      margin-top: 1.5rem;
      border: 1px solid #e9ecef;
    }

    .demo-accounts strong {
      display: block;
      text-align: center;
      margin-bottom: 0.8rem;
      color: #495057;
      font-size: 0.9rem;
    }

    .demo-accounts div {
      background: white;
      padding: 0.6rem;
      margin-bottom: 0.4rem;
      border-radius: 6px;
      font-size: 0.8rem;
      color: #6c757d;
      border: 1px solid #dee2e6;
    }

    .demo-accounts div:last-child {
      margin-bottom: 0;
    }

    .back-home {
      text-align: center;
      margin-top: 1.5rem;
    }

    .back-link {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      transition: color 0.3s ease;
      padding: 0.4rem 0.8rem;
      border-radius: 6px;
      font-size: 0.9rem;
    }

    .back-link:hover {
      color: #764ba2;
      background: rgba(102, 126, 234, 0.1);
    }

    @media (max-width: 850px) {
      .login-wrapper {
        padding: 1rem;
      }
      
      .login-box {
        flex-direction: column;
        max-width: 450px;
      }
      
      .login-left {
        height: 140px;
      }
      
      .login-left-content {
        bottom: 15px;
        left: 15px;
      }
      
      .left-title {
        font-size: 1.6rem;
      }
      
      .login-right {
        padding: 1.8rem 1.2rem;
      }
    }

    @media (max-width: 480px) {
      .login-left-content {
        bottom: 12px;
        left: 12px;
      }
      
      .left-title {
        font-size: 1.4rem;
      }
      
      .left-subtitle {
        font-size: 0.85rem;
        max-width: 200px;
      }
      
      .login-right {
        padding: 1.5rem 1rem;
      }
      
      .login-title {
        font-size: 1.6rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>

      <div className="login-wrapper">
        <div className="login-box">
          
          {/* LEFT SIDE IMAGE */}
          <div className="login-left">
            <div className="login-left-content">
              <h2 className="left-title">Little Stars Nursery</h2>
              <p className="left-subtitle">
                A safe, joyful place for every child.  
                Manage your day with ease.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="login-right">
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to continue</p>

            {error && <div className="error-message">{error}</div>}

            <LoginForm onSubmit={handleLogin} />

            <div className="signup-section">
              <h3>Create a Parent Account</h3>
              <button onClick={handleSignUp} className="signup-button">
                <FaUserPlus /> Join Now <FaArrowRight />
              </button>
            </div>

            <div className="demo-accounts">
              <strong>Demo Accounts</strong>
              <div>Parent: parent@demo.com / demo123</div>
              <div>Employee: employee@demo.com / demo123</div>
              <div>Admin: admin@demo.com / demo123</div>
            </div>

            <div className="back-home">
              <Link to="/" className="back-link">
                <FaHome /> Back to Home
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default LoginPage;