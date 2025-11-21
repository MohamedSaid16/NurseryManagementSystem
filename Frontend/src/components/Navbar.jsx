import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FaUser, 
  FaSignOutAlt, 
  FaBars, 
  FaTimes,
  FaChild,
  FaChartLine,
  FaStickyNote,
  FaUsers,
  FaMoneyBillWave,
  FaSchool,
  FaFileAlt,
  FaBell,
  FaCog,
  FaChevronDown
} from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'parent':
        return '/parent/dashboard';
      case 'employee':
        return '/employee/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/';
    }
  };

  const getNavItems = () => {
    if (!user) {
      return [];
    }

    const baseItems = [
      { path: getDashboardLink(), label: 'Dashboard', icon: <FaChartLine /> }
    ];

    if (user.role === 'parent') {
      return [
        ...baseItems,
        { path: '/parent/track-child', label: 'Track Child', icon: <FaChild /> },
        { path: '/parent/register-child', label: 'Register Child', icon: <FaUser /> },
        { path: '/parent/messages', label: 'Messages', icon: <FaStickyNote /> }
      ];
    }

    if (user.role === 'employee') {
      return [
        ...baseItems,
        { path: '/employee/attendance', label: 'Attendance', icon: <FaUser /> },
        { path: '/employee/daily-activities', label: 'Activities', icon: <FaChild /> },
        { path: '/employee/child-notes', label: 'Child Notes', icon: <FaStickyNote /> }
      ];
    }

    if (user.role === 'admin') {
      return [
        ...baseItems,
        { 
          label: 'Management', 
          icon: <FaUsers />,
          dropdown: [
            { path: '/admin/manage-parents', label: 'Parents', icon: <FaUsers /> },
            { path: '/admin/manage-employees', label: 'Employees', icon: <FaUser /> },
            { path: '/admin/manage-children', label: 'Children', icon: <FaChild /> },
            { path: '/admin/manage-classes', label: 'Classes', icon: <FaSchool /> }
          ]
        },
        { path: '/admin/manage-payments', label: 'Payments', icon: <FaMoneyBillWave /> },
        { path: '/admin/reports', label: 'Reports', icon: <FaFileAlt /> }
      ];
    }

    return baseItems;
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return '#8B5CF6';
      case 'employee': return '#3B82F6';
      case 'parent': return '#10B981';
      default: return '#6B7280';
    }
  };

  const styles = `
    .navbar {
      background: ${isScrolled ? 
        'linear-gradient(135deg, rgba(76, 29, 149, 0.95) 0%, rgba(67, 56, 202, 0.95) 100%)' : 
        'linear-gradient(135deg, rgba(76, 29, 149, 0.85) 0%, rgba(67, 56, 202, 0.85) 100%)'
      };
      backdrop-filter: blur(20px) saturate(180%);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      ${isScrolled ? 
        'box-shadow: 0 8px 32px rgba(76, 29, 149, 0.3), 0 2px 8px rgba(0, 0, 0, 0.1);' : 
        'box-shadow: 0 4px 20px rgba(76, 29, 149, 0.2);'
      }
    }

    .nav-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 80px;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
      font-weight: 700;
      font-size: 1.5rem;
      color: white;
      transition: all 0.3s ease;
      position: relative;
      z-index: 1;
    }

    .logo:hover {
      transform: translateY(-2px);
      text-shadow: 0 4px 20px rgba(255, 255, 255, 0.6);
    }

    .logo-icon {
      color: #A78BFA;
      font-size: 2rem;
      filter: drop-shadow(0 4px 8px rgba(167, 139, 250, 0.4));
      transition: all 0.3s ease;
    }

    .logo:hover .logo-icon {
      transform: scale(1.1);
      filter: drop-shadow(0 6px 12px rgba(167, 139, 250, 0.6));
    }

    .logo-text {
      background: linear-gradient(135deg, #FFFFFF 0%, #E0E7FF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 0 2px 10px rgba(255, 255, 255, 0.3);
    }

    .nav-menu {
      display: flex;
      list-style: none;
      align-items: center;
      gap: 0.5rem;
      margin: 0;
      padding: 0;
    }

    .nav-item {
      position: relative;
    }

    .nav-link {
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      font-weight: 500;
      padding: 0.75rem 1.25rem;
      border-radius: 12px;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      position: relative;
      overflow: hidden;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.05);
    }

    .nav-link::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(139, 92, 246, 0.4) 0%, rgba(99, 102, 241, 0.4) 100%);
      transition: left 0.4s ease;
      z-index: -1;
    }

    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #A78BFA, #60A5FA);
      transition: all 0.3s ease;
      transform: translateX(-50%);
    }

    .nav-link:hover::before {
      left: 0;
    }

    .nav-link:hover::after {
      width: 80%;
    }

    .nav-link:hover {
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
      border-color: rgba(255, 255, 255, 0.2);
    }

    .nav-link.active {
      background: linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(99, 102, 241, 0.3) 100%);
      color: white;
      box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
      border-color: rgba(255, 255, 255, 0.2);
    }

    .nav-link.active::after {
      width: 80%;
    }

    .nav-link-icon {
      font-size: 1.1rem;
      transition: transform 0.3s ease;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    }

    .nav-link:hover .nav-link-icon {
      transform: scale(1.2) translateY(-1px);
    }

    .user-section {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.5rem 1rem;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .user-info:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #A78BFA 0%, #60A5FA 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: white;
      font-size: 1.1rem;
      box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
      transition: all 0.3s ease;
    }

    .user-info:hover .user-avatar {
      transform: scale(1.1);
      box-shadow: 0 6px 20px rgba(139, 92, 246, 0.6);
    }

    .user-details {
      display: flex;
      flex-direction: column;
    }

    .user-name {
      font-weight: 600;
      color: white;
      font-size: 0.9rem;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .user-role {
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.8);
      text-transform: capitalize;
      margin-top: 0.125rem;
    }

    .logout-btn {
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.9) 0%, rgba(220, 38, 38, 0.9) 100%);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .logout-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(239, 68, 68, 0.5);
      background: linear-gradient(135deg, rgba(239, 68, 68, 1) 0%, rgba(220, 38, 38, 1) 100%);
    }

    .mobile-menu-btn {
      display: none;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 8px;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .mobile-menu-btn:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.05);
    }

    .mobile-menu {
      position: fixed;
      top: 80px;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(76, 29, 149, 0.98) 0%, rgba(67, 56, 202, 0.98) 100%);
      backdrop-filter: blur(20px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      display: none;
      flex-direction: column;
      overflow-y: auto;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .mobile-menu.open {
      display: flex;
      animation: slideDown 0.3s ease-out;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .mobile-nav-item {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .mobile-nav-item:last-child {
      border-bottom: none;
    }

    .mobile-nav-link {
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      padding: 1.25rem 2rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: all 0.3s ease;
      font-weight: 500;
      position: relative;
      overflow: hidden;
    }

    .mobile-nav-link::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(99, 102, 241, 0.3) 100%);
      transition: left 0.3s ease;
      z-index: -1;
    }

    .mobile-nav-link:hover::before {
      left: 0;
    }

    .mobile-nav-link:hover {
      color: white;
      padding-left: 2.5rem;
    }

    .mobile-nav-link.active {
      background: linear-gradient(135deg, rgba(139, 92, 246, 0.4) 0%, rgba(99, 102, 241, 0.4) 100%);
      color: white;
    }

    .mobile-user-section {
      padding: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
    }

    .mobile-user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .mobile-logout-btn {
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.9) 0%, rgba(220, 38, 38, 0.9) 100%);
      color: white;
      border: none;
      padding: 1rem;
      border-radius: 12px;
      cursor: pointer;
      text-align: center;
      font-weight: 500;
      width: 100%;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
    }

    .mobile-logout-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(239, 68, 68, 0.5);
    }

    .dropdown {
      position: relative;
    }

    .dropdown-content {
      position: absolute;
      top: 100%;
      left: 0;
      background: linear-gradient(135deg, rgba(76, 29, 149, 0.95) 0%, rgba(67, 56, 202, 0.95) 100%);
      backdrop-filter: blur(20px);
      min-width: 240px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      border-radius: 16px;
      padding: 0.5rem;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.3s ease;
      z-index: 1001;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .dropdown-content.active {
      opacity: 1;
      visibility: visible;
      transform: translateY(5px);
    }

    .dropdown-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      border-radius: 8px;
      transition: all 0.3s ease;
      font-weight: 500;
      position: relative;
      overflow: hidden;
    }

    .dropdown-link::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(99, 102, 241, 0.3) 100%);
      transition: left 0.3s ease;
      z-index: -1;
    }

    .dropdown-link:hover::before {
      left: 0;
    }

    .dropdown-link:hover {
      color: white;
      transform: translateX(5px);
    }

    .dropdown-arrow {
      transition: transform 0.3s ease;
    }

    .dropdown.active .dropdown-arrow {
      transform: rotate(180deg);
    }

    @media (max-width: 1024px) {
      .nav-container {
        padding: 0 1.5rem;
      }
      
      .nav-link {
        padding: 0.75rem 1rem;
        font-size: 0.9rem;
      }
    }

    @media (max-width: 768px) {
      .nav-menu {
        display: none;
      }
      
      .user-section {
        display: none;
      }
      
      .mobile-menu-btn {
        display: block;
      }
      
      .nav-container {
        height: 70px;
        padding: 0 1rem;
      }
      
      .logo {
        font-size: 1.3rem;
      }
    }

    @media (max-width: 480px) {
      .nav-container {
        padding: 0 1rem;
      }
      
      .logo {
        font-size: 1.2rem;
      }
      
      .mobile-nav-link {
        padding: 1.25rem 1.5rem;
      }
      
      .mobile-user-section {
        padding: 1.5rem;
      }
    }
  `;

  const navItems = getNavItems();

  return (
    <>
      <style>{styles}</style>
      <nav className="navbar">
        <div className="nav-container">
          {/* Logo */}
          <Link to="/" className="logo" onClick={handleNavClick}>
            <FaChild className="logo-icon" />
            <span className="logo-text">Little Stars</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="nav-menu">
            {navItems.map((item) => (
              <li key={item.path || item.label} className={`nav-item ${item.dropdown ? 'dropdown' : ''} ${activeDropdown === item.label ? 'active' : ''}`}>
                {item.dropdown ? (
                  <>
                    <button 
                      className={`nav-link ${location.pathname.startsWith('/admin/manage') ? 'active' : ''}`}
                      onClick={() => toggleDropdown(item.label)}
                    >
                      <span className="nav-link-icon">{item.icon}</span>
                      {item.label}
                      <FaChevronDown className="dropdown-arrow" size={12} />
                    </button>
                    <div className={`dropdown-content ${activeDropdown === item.label ? 'active' : ''}`}>
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.path}
                          to={dropdownItem.path}
                          className="dropdown-link"
                          onClick={handleNavClick}
                        >
                          <span className="nav-link-icon">{dropdownItem.icon}</span>
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={handleNavClick}
                  >
                    <span className="nav-link-icon">{item.icon}</span>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop User Section */}
          {user && (
            <div className="user-section">
              <div className="user-info">
                <div className="user-avatar">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="user-details">
                  <div className="user-name">{user.name}</div>
                  <div className="user-role" style={{ color: getRoleColor(user.role) }}>
                    {user.role}
                  </div>
                </div>
              </div>
              <button onClick={handleLogout} className="logout-btn">
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          )}

          {!user && (
            <div className="user-section">
              <Link to="/login" className="nav-link">
                <FaUser />
                Login
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            item.dropdown ? (
              item.dropdown.map((dropdownItem) => (
                <div key={dropdownItem.path} className="mobile-nav-item">
                  <Link
                    to={dropdownItem.path}
                    className={`mobile-nav-link ${location.pathname === dropdownItem.path ? 'active' : ''}`}
                    onClick={handleNavClick}
                  >
                    <span className="nav-link-icon">{dropdownItem.icon}</span>
                    {dropdownItem.label}
                  </Link>
                </div>
              ))
            ) : (
              <div key={item.path} className="mobile-nav-item">
                <Link
                  to={item.path}
                  className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={handleNavClick}
                >
                  <span className="nav-link-icon">{item.icon}</span>
                  {item.label}
                </Link>
              </div>
            )
          ))}
          
          {user && (
            <div className="mobile-user-section">
              <div className="mobile-user-info">
                <div className="user-avatar">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{fontWeight: '600', color: 'white'}}>{user.name}</div>
                  <div className="user-role" style={{color: getRoleColor(user.role), marginTop: '0.25rem'}}>
                    {user.role}
                  </div>
                </div>
              </div>
              <button onClick={handleLogout} className="mobile-logout-btn">
                <FaSignOutAlt style={{marginRight: '0.5rem'}} />
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;