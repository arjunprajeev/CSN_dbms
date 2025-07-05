import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home'; // Adjust the import paths accordingly
import VolunteerLogin from './Pages/VolunteerLogin';
import VolunteerRegister from './Pages/VolunteerRegister';
import VolunteerPage from './Pages/VolunteerPage';
import UserLogin from './Pages/Userlogin';
import UserRegister from './Pages/UserRegister';
import AdminLogin from './Pages/AdminLogin';
import AdminRegister from './Pages/AdminRegister';
import AdminDashboard from './Pages/AdminDashboard';
import OrganisationLogin from './Pages/OrganisationLogin';
import OrganisationPage from './Pages/OrganisationPage';
import OrganisationRegister from './Pages/OrganisationRegister';
import UsersPageLo from './Pages/UsersPageLo';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/volunteer-login" element={<VolunteerLogin />} />
        <Route path="/volunteer-register" element={<VolunteerRegister/>}/>
        <Route path="/volunteer-page" element={<VolunteerPage/>}/>
        <Route path="/user-login" element={<UserLogin/>}/>
        <Route path="/user-register" element={<UserRegister/>}/>
        <Route path="/user-page" element={<UsersPageLo/>} />
        <Route path="/admin-login" element={<AdminLogin/>}/>
        <Route path="/admin-register" element={<AdminRegister/>}/>
        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
        <Route path="/organisation-login" element={<OrganisationLogin/>}/>
        <Route path="/organisation-page" element={<OrganisationPage/>}/>
        <Route path="/organisation-register" element={<OrganisationRegister/>} />
      </Routes>
    </Router>
  );
};

export default App;