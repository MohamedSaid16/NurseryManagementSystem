# NurseryManagementSystem

A comprehensive Nursery Management System for managing children, parents, employees, and administrative tasks. Built with React.js for the frontend and Node.js/Express for the backend, with role-based access control.

---

## ✨ Features

### 👨‍💼 Admin Features

- **Dashboard Overview:** Real-time statistics and analytics
- **User Management:** Manage parents, employees, and children
- **Class Management:** Create and organize classes
- **Payment Tracking:** Monitor payments and generate invoices
- **Reporting:** Comprehensive analytics and insights
- **System Management:** Full administrative control

### 👩‍🏫 Employee Features

- **Attendance Tracking:** Mark daily attendance for children
- **Activity Logging:** Record daily activities and milestones
- **Child Notes:** Add observations and progress notes
- **Class Management:** Manage assigned classes and activities

### 👨‍👩‍👧‍👦 Parent Features

- **Child Tracking:** Real-time monitoring of child activities
- **Registration:** Enroll new children in the daycare
- **Communication:** Message staff and teachers directly
- **Progress Reports:** View child development and activities
- **Payment Management:** View and manage payment history

---

## 🚀 Tech Stack

**Frontend:** React 18.2.0, React Router DOM 6.8.0  
**Styling:** CSS3 with Glassmorphism design  
**State Management:** React Context API + useState/useEffect  
**Icons:** React Icons (Font Awesome)  
**Routing:** Client-side routing with protected routes  

---

## 🛠 Installation & Setup

**Prerequisites**
- Node.js (version 14 or higher)
- npm or yarn

**Installation Steps**
1. install dependencies  
   `npm install`
2. Start the development server  
   `npm start`

---

## 🖌️ UI/UX Features

- Modern Glassmorphism Design - Beautiful frosted glass effects
- Responsive Layout - Works perfectly on all devices
- Smooth Animations - CSS transitions and hover effects
- Accessibility - WCAG compliant design
- Dark Purple/Blue Gradient - Professional color scheme

---

## 🔐 Authentication & Roles

The system supports three user roles with different permissions:

- **Admin** - Full system access and management
- **Employee** - Classroom and child management
- **Parent** - Child tracking and communication

---

## 🚦 Key Components

### Navigation System
- Role-based menu items
- Responsive mobile navigation
- Active route highlighting
- User profile management

### Dashboard Components
- Statistics Cards - Key metrics with visual indicators
- Quick Actions - Role-specific shortcuts
- Activity Feeds - Real-time updates and notifications
- Data Visualization - Charts and progress indicators

---

## 📁 Project Structure

```plaintext
src/
 ├── assets/
 │    ├── images/       # Banner, activities, classrooms
 │    └── icons/
 ├── components/
 │    ├── Banner.jsx
 │    ├── ImageGrid.jsx
 │    ├── Footer.jsx
 │    ├── Navbar.jsx
 │    ├── ProtectedRoute.jsx
 │    └── forms/
 │         ├── LoginForm.jsx
 │         ├── RegisterParentForm.jsx
 │         └── AddChildForm.jsx
 ├── pages/
 │    ├── HomePage.jsx
 │    ├── LoginPage.jsx
 │    ├── parent/
 │    │    ├── ParentDashboard.jsx
 │    │    ├── TrackChild.jsx
 │    │    ├── RegisterChild.jsx
 │    │    ├── ParentMessages.jsx
 │    │    └── ParentProfile.jsx
 │    ├── employee/
 │    │    ├── EmployeeDashboard.jsx
 │    │    ├── AttendancePage.jsx
 │    │    ├── DailyActivities.jsx
 │    │    ├── ChildNotes.jsx
 │    │    └── EmployeeProfile.jsx
 │    └── admin/
 │         ├── AdminDashboard.jsx
 │         ├── ManageParents.jsx
 │         ├── ManageEmployees.jsx
 │         ├── ManageChildren.jsx
 │         ├── ManagePayments.jsx
 │         ├── ManageClasses.jsx
 │         └── AdminReports.jsx
 ├── context/
 │    ├── AuthContext.jsx
 │    └── UserRoleContext.jsx
 ├── hooks/
 │    └── useAuth.js
 ├── utils/
 │    └── api.js
 ├── App.jsx
 ├── index.js
 └── App.css
backend/
 ├── config/
 │    └── db.js              # MySQL connection
 ├── controllers/
 │    ├── authController.js
 │    ├── parentController.js
 │    ├── employeeController.js
 │    └── adminController.js
 ├── middleware/
 │    ├── authMiddleware.js  # JWT verification
 │    └── roleMiddleware.js  # Role-based access
 ├── models/
 │    ├── User.js
 │    ├── Child.js
 │    ├── Attendance.js
 │    ├── Activity.js
 │    └── Payment.js
 ├── routes/
 │    ├── authRoutes.js
 │    ├── parentRoutes.js
 │    ├── employeeRoutes.js
 │    └── adminRoutes.js
 ├── utils/
 │    └── helpers.js
 ├── server.js
 └── package.json
```

---

## 🖍️ Customization

- Modify color schemes in component CSS variables
- Update role permissions in AuthContext
- Add new features in respective role directories

---

## 🤝 Contributing

- Fork the repository
- Create a feature branch (`git checkout -b feature/amazing-feature`)
- Commit your changes (`git commit -m 'Add some amazing feature'`)
- Push to the branch (`git push origin feature/amazing-feature`)
- Open a Pull Request

---

## 📝 Code Standards

- Use meaningful component and variable names
- Follow React best practices
- Ensure responsive design
- Maintain accessibility standards
- Write clean, commented code

---

## 🐛 Troubleshooting

**Common Issues**
- Dependencies not installing  
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
- Build errors  
  ```bash
  npm run build -- --verbose
  ```
- Routing issues  
  - Ensure all routes are properly defined
  - Check protected route configurations

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE.md file for details.

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Font Awesome for beautiful icons
- Open source community for inspiration and support
