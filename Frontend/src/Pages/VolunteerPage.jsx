import { useState } from 'react';
import { FiMenu, FiX, FiEdit } from 'react-icons/fi';
import backgroundImage from '../assets/bg.jpg';
import { Link } from 'react-router-dom';

const VolunteerPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [skills, setSkills] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [messages] = useState([
    { id: 1, title: 'Availability Reminder', text: 'Remember to submit your availability for next week!' },
    { id: 2, title: 'Meeting Reminder', text: 'Meeting scheduled for Thursday at 3 PM.' },
  ]);

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  const getCalendarDays = () => {
    const startOfMonth = new Date(currentYear, currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentYear, currentDate.getMonth() + 1, 0);
    const startDayOfWeek = startOfMonth.getDay();
    const daysInMonth = endOfMonth.getDate();

    const daysArray = Array(startDayOfWeek).fill(null);
    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push({ date: new Date(currentYear, currentDate.getMonth(), day), available: false }); // Set available to false by default
    }
    return daysArray;
  };

  const [calendar, setCalendar] = useState(getCalendarDays());

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const Modal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
        <div className="bg-white rounded p-4 w-11/12 md:w-1/3">
          <h2 className="text-xl font-bold mb-2">Message Details</h2>
          <p>{message}</p>
          <button
            className="mt-4 bg-blue-600 text-white rounded py-2 px-4"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  const toggleEditProfile = () => {
    setEditProfileOpen(!editProfileOpen);
  };

  const handleEditProfileSubmit = (e) => {
    e.preventDefault();
    console.log({ name, phone, email, skills });
    setName('');
    setPhone('');
    setEmail('');
    setSkills('');
    setEditProfileOpen(false);
  };

  const toggleAvailability = (index) => {
    const day = calendar[index];
    console.log("index is ",index)
    console.log("day is ",day)
    const isPastOrToday = day && (day.date < currentDate || day.date.toDateString() === currentDate.toDateString()); // Check if the date is in the past or today

    // Only toggle if the day is not a past date or today
    if (!isPastOrToday && day) {
      setCalendar((prevCalendar) =>
        prevCalendar.map((d, i) =>
          i === index ? { ...d, available: !d.available } : d
        )
      );
    }
  };

  const openModal = (message) => {
    setSelectedMessage(message);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMessage(null);
    setModalOpen(false);
  };

  const handleConfirmDates = () => {
    const selectedDates = calendar
      .filter(day => day && day.available && day.date >= currentDate) // Only get available and future dates
      .map(day => day.date.toISOString().split('T')[0]); // Format dates for storage

    console.log('Selected Dates:', selectedDates);

    // Sending selected dates to the server
    fetch('YOUR_API_ENDPOINT_HERE', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedDates }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        alert('Dates successfully confirmed and stored!');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('There was a problem with storing the dates.');
      });
  };

  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat min-h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-30 backdrop-blur-sm">
        <div className="text-white text-lg font-bold">MyLogo</div>
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/volunteer-page" className="text-white">Volunteer</Link>
          <button 
            className="text-white" 
            onClick={() => console.log('Logged out')}
          >
            Logout
          </button>
          <button 
            className="text-white flex items-center" 
            onClick={toggleEditProfile}
          >
            <FiEdit className="mr-2" /> Edit Profile
          </button>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-blue-600 p-4 space-y-2 relative z-30">
          <Link to="/volunteer-page" className="block text-white">Volunteer</Link>
          <button 
            className="block text-white w-full text-left"
            onClick={() => console.log('Logged out')}
          >
            Logout
          </button>
        </div>
      )}

      <div className="relative z-10 flex flex-col md:flex-row min-h-screen pt-16"> {/* Adjust padding-top to accommodate fixed navbar */}
        <div className="bg-white bg-opacity-70 p-6 w-full md:w-2/5 flex flex-col justify-center rounded shadow-md mb-4 md:mb-0">
          <h1 className="text-4xl font-bold mb-4">Welcome, {name || 'User'}!</h1>
          
          <p className="text-gray-700 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <div className="mt-6">
            {editProfileOpen && (
              <div className="mt-4 bg-white bg-opacity-80 p-4 rounded shadow-md">
                <form onSubmit={handleEditProfileSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input 
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      className="border border-gray-300 rounded w-full p-2"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Phone No.</label>
                    <input 
                      type="text" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      className="border border-gray-300 rounded w-full p-2"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="border border-gray-300 rounded w-full p-2"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Skills</label>
                    <select 
                      value={skills} 
                      onChange={(e) => setSkills(e.target.value)} 
                      className="border border-gray-300 rounded w-full p-2"
                      required
                    >
                      <option value="">Select your skills</option>
                      <option value="skill1">Skill 1</option>
                      <option value="skill2">Skill 2</option>
                      <option value="skill3">Skill 3</option>
                    </select>
                  </div>
                  <button 
                    type="submit" 
                    className="bg-blue-600 text-white rounded py-2 px-4"
                  >
                    Edit
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        <div className="relative bg-white bg-opacity-70 p-6 w-full md:w-3/5 flex flex-col rounded shadow-md">
          <h2 className="text-3xl font-bold mb-4">{`${currentMonth} ${currentYear}`}</h2>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="font-bold text-center text-gray-600">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {calendar.map((day, index ) => {
              const isPastDate = day && day.date < currentDate;
              return day ? (
                <div
                  key={day.date}
                  className={`p-4 border rounded cursor-pointer transition duration-200 
                    ${day.available ? (isPastDate ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-200') : 'bg-red-200'} 
                    ${isPastDate ? 'opacity-50' : 'hover:opacity-75'}`}
                  onClick={() => !isPastDate && toggleAvailability(index)}
                >
                  <div className="text-center">{day.date.getDate()}</div>
                </div>
              ) : (
                <div key={index} className="p-4"></div>
              );
            })}
          </div>

          {/* Confirmation Button */}
          <button
            className="mt-4 bg-blue-600 text-white rounded py-2 px-4"
            onClick={handleConfirmDates}
          >
            Confirm Dates
          </button>

          {/* Messages Section */}
          <div className="mt-6 bg-white bg-opacity-80 p-4 rounded shadow-md">
            <h2 className="text-3xl font-bold mb-2">Messages</h2>
            {messages.map((message) => (
              <div key={message.id} className="border-b mb-2 pb-2 cursor-pointer" onClick={() => openModal(message.text)}>
                <p className="text-gray-700">{message.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={closeModal} message={selectedMessage} />
      <footer className="bg-gray-800 text-white p-4 mt-10">
        <div className="text-center">
          <p className="mb-2">© 2024 Community Support System. All Rights Reserved.</p>
          <p className="mb-1">Building a better future together.</p>
          <p>Follow us on social media for updates and events!</p>
        </div>
      </footer>
    </div>
  );
};

export default VolunteerPage;
