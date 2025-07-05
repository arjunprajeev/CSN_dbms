import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMenu, FiX, FiEdit, FiCalendar, FiUser, FiMail, FiPhone, 
  FiMapPin, FiClock, FiTrendingUp, FiAward, FiLogOut, FiHome,
  FiBell, FiSettings, FiSave, FiCheckCircle, FiAlertCircle
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/bg.jpg';

const VolunteerPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  
  const navigate = useNavigate();

  // Profile data
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1-234-567-8900',
    address: '123 Main St, City, State',
    skills: ['Community Service', 'Event Planning', 'Teaching'],
    profilePicture: null,
    totalHours: 45,
    completedEvents: 12,
    pendingEvents: 3
  });

  // Calendar data
  const [calendar, setCalendar] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [messages, setMessages] = useState([]);

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  // Initialize calendar
  useEffect(() => {
    const initializeCalendar = () => {
      const startOfMonth = new Date(currentYear, currentDate.getMonth(), 1);
      const endOfMonth = new Date(currentYear, currentDate.getMonth() + 1, 0);
      const startDayOfWeek = startOfMonth.getDay();
      const daysInMonth = endOfMonth.getDate();

      const daysArray = Array(startDayOfWeek).fill(null);
      for (let day = 1; day <= daysInMonth; day++) {
        daysArray.push({ 
          date: new Date(currentYear, currentDate.getMonth(), day), 
          available: false 
        });
      }
      setCalendar(daysArray);
    };

    const loadData = async () => {
      setLoading(true);
      try {
        // Simulate API calls
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setUpcomingEvents([
          {
            id: 1,
            title: 'Community Clean-up Drive',
            date: new Date(2024, 11, 15),
            location: 'Central Park',
            organizer: 'Green Earth Foundation',
            status: 'confirmed'
          },
          {
            id: 2,
            title: 'Food Distribution',
            date: new Date(2024, 11, 20),
            location: 'Downtown Center',
            organizer: 'Food Bank Network',
            status: 'pending'
          }
        ]);

        setMessages([
          {
            id: 1,
            title: 'Event Confirmation',
            text: 'Your participation in Community Clean-up Drive has been confirmed!',
            type: 'success',
            date: new Date(),
            isRead: false
          },
          {
            id: 2,
            title: 'New Opportunity',
            text: 'A new volunteer opportunity matching your skills is available.',
            type: 'info',
            date: new Date(),
            isRead: false
          }
        ]);

        setNotifications([
          { id: 1, message: 'New event assigned to you', type: 'info', time: '2 hours ago' },
          { id: 2, message: 'Profile updated successfully', type: 'success', time: '1 day ago' }
        ]);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeCalendar();
    loadData();
  }, [currentYear, currentDate]);

  const toggleAvailability = (index) => {
    const day = calendar[index];
    if (!day || day.date < currentDate) return;

    setCalendar(prevCalendar =>
      prevCalendar.map((d, i) =>
        i === index ? { ...d, available: !d.available } : d
      )
    );
  };

  const handleSaveAvailability = async () => {
    setSaving(true);
    try {
      const availableDates = calendar
        .filter(day => day && day.available && day.date >= currentDate)
        .map(day => day.date.toISOString().split('T')[0]);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Saving availability:', availableDates);
      
      // Show success message
      setNotifications(prev => [...prev, {
        id: Date.now(),
        message: 'Availability updated successfully!',
        type: 'success',
        time: 'Just now'
      }]);
    } catch (error) {
      console.error('Error saving availability:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleProfileUpdate = async (updatedProfile) => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProfile(prev => ({ ...prev, ...updatedProfile }));
      setEditProfileOpen(false);
      
      setNotifications(prev => [...prev, {
        id: Date.now(),
        message: 'Profile updated successfully!',
        type: 'success',
        time: 'Just now'
      }]);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const DashboardContent = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Total Hours', value: profile.totalHours, icon: FiClock, color: 'from-blue-500 to-cyan-500' },
          { title: 'Completed Events', value: profile.completedEvents, icon: FiCheckCircle, color: 'from-green-500 to-emerald-500' },
          { title: 'Pending Events', value: profile.pendingEvents, icon: FiAlertCircle, color: 'from-yellow-500 to-orange-500' }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">{stat.title}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="text-white text-xl" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Upcoming Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <FiCalendar className="mr-2" />
          Upcoming Events
        </h3>
        <div className="space-y-3">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-white/10 rounded-xl p-4 border border-white/10"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-white">{event.title}</h4>
                  <p className="text-white/70 text-sm">{event.organizer}</p>
                  <p className="text-white/60 text-sm flex items-center mt-1">
                    <FiMapPin className="mr-1" />
                    {event.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm">{event.date.toLocaleDateString()}</p>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    event.status === 'confirmed' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {event.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const CalendarContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">{currentMonth} {currentYear}</h3>
        <motion.button
          onClick={handleSaveAvailability}
          disabled={saving}
          className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <FiSave className="mr-2" />
              Save Availability
            </>
          )}
        </motion.button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="font-bold text-center text-white/70 p-2">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendar.map((day, index) => {
          const isPastDate = day && day.date < currentDate;
          const isToday = day && day.date.toDateString() === currentDate.toDateString();
          
          return day ? (
            <motion.div
              key={day.date.toISOString()}
              className={`p-3 border rounded-xl cursor-pointer transition-all duration-200 ${
                day.available 
                  ? (isPastDate ? 'bg-gray-500/30 cursor-not-allowed' : 'bg-green-500/30 border-green-400') 
                  : 'bg-white/10 border-white/20 hover:bg-white/20'
              } ${isToday ? 'ring-2 ring-cyan-400' : ''} ${isPastDate ? 'opacity-50' : ''}`}
              onClick={() => !isPastDate && toggleAvailability(index)}
              whileHover={!isPastDate ? { scale: 1.05 } : {}}
              whileTap={!isPastDate ? { scale: 0.95 } : {}}
            >
              <div className="text-center text-white font-medium">{day.date.getDate()}</div>
              {isToday && <div className="text-center text-xs text-cyan-400 mt-1">Today</div>}
            </motion.div>
          ) : (
            <div key={index} className="p-3"></div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500/30 border border-green-400 rounded mr-2"></div>
          <span className="text-white/70">Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-white/10 border border-white/20 rounded mr-2"></div>
          <span className="text-white/70">Not Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-cyan-400 rounded mr-2"></div>
          <span className="text-white/70">Today</span>
        </div>
      </div>
    </motion.div>
  );

  const MessagesContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
    >
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <FiBell className="mr-2" />
        Messages & Notifications
      </h3>
      <div className="space-y-3">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 rounded-xl p-4 border border-white/10"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-white">{message.title}</h4>
                <p className="text-white/70 text-sm mt-1">{message.text}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                message.type === 'success' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-blue-500/20 text-blue-400'
              }`}>
                {message.type}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const ProfileModal = () => (
    <AnimatePresence>
      {editProfileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-white mb-4">Edit Profile</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const updatedProfile = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                address: formData.get('address'),
                skills: formData.get('skills').split(',').map(s => s.trim())
              };
              handleProfileUpdate(updatedProfile);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">Name</label>
                  <input
                    name="name"
                    defaultValue={profile.name}
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">Email</label>
                  <input
                    name="email"
                    type="email"
                    defaultValue={profile.email}
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">Phone</label>
                  <input
                    name="phone"
                    defaultValue={profile.phone}
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">Address</label>
                  <input
                    name="address"
                    defaultValue={profile.address}
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">Skills (comma-separated)</label>
                  <input
                    name="skills"
                    defaultValue={profile.skills.join(', ')}
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditProfileOpen(false)}
                  className="flex-1 bg-white/10 border border-white/20 text-white py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/70">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Background Elements */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20" 
        style={{ backgroundImage: `url(${backgroundImage})` }} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-40 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={() => navigate('/')}
            className="text-white/70 hover:text-white transition-colors flex items-center"
            whileHover={{ x: -5 }}
          >
            <FiHome className="mr-2" />
            Home
          </motion.button>
          <div className="text-white text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Volunteer Dashboard
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <motion.button
              onClick={() => setShowNotifications(!showNotifications)}
              className="text-white/70 hover:text-white transition-colors relative"
              whileHover={{ scale: 1.1 }}
            >
              <FiBell />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              )}
            </motion.button>
            
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-80 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl"
                >
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-3">Notifications</h3>
                    {notifications.map(notification => (
                      <div key={notification.id} className="mb-2 p-2 bg-white/5 rounded-lg">
                        <p className="text-white/90 text-sm">{notification.message}</p>
                        <p className="text-white/50 text-xs mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <motion.button
            onClick={() => setEditProfileOpen(true)}
            className="text-white/70 hover:text-white transition-colors flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <FiEdit className="mr-2" />
            Edit Profile
          </motion.button>
          
          <motion.button
            onClick={handleLogout}
            className="text-white/70 hover:text-white transition-colors flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <FiLogOut className="mr-2" />
            Logout
          </motion.button>
        </div>

        <div className="md:hidden">
          <motion.button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="text-white p-2"
            whileTap={{ scale: 0.95 }}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="md:hidden fixed top-0 right-0 h-full w-80 bg-black/90 backdrop-blur-lg z-30 p-6 pt-20"
          >
            <div className="space-y-4">
              <button
                onClick={() => setEditProfileOpen(true)}
                className="w-full text-left text-white/90 py-2 hover:text-cyan-400 transition-colors flex items-center"
              >
                <FiEdit className="mr-2" />
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left text-white/90 py-2 hover:text-cyan-400 transition-colors flex items-center"
              >
                <FiLogOut className="mr-2" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="pt-20 px-4 lg:px-8 pb-8 relative z-10">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center">
              <FiUser className="text-2xl text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">Welcome back, {profile.name}!</h1>
              <p className="text-white/70">Ready to make a difference today?</p>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <div className="text-center">
                <div className="text-white/60">Skills</div>
                <div className="text-white font-semibold">{profile.skills.length}</div>
              </div>
              <div className="text-center">
                <div className="text-white/60">Hours</div>
                <div className="text-white font-semibold">{profile.totalHours}</div>
              </div>
              <div className="text-center">
                <div className="text-white/60">Events</div>
                <div className="text-white font-semibold">{profile.completedEvents}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/20">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: FiTrendingUp },
            { id: 'calendar', label: 'Availability', icon: FiCalendar },
            { id: 'messages', label: 'Messages', icon: FiBell }
          ].map(tab => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon className="mr-2" />
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'dashboard' && <DashboardContent />}
            {activeTab === 'calendar' && <CalendarContent />}
            {activeTab === 'messages' && <MessagesContent />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Profile Modal */}
      <ProfileModal />
    </div>
  );
};

export default VolunteerPage;