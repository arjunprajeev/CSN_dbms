import { useState } from 'react';
import { Link } from 'react-router-dom';
//import { FiMenu, FiX } from 'react-icons/fi';

const OrganisationPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [volunteerCount, setVolunteerCount] = useState(0);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [skill, setSkill] = useState('');
  const [matchedVolunteers, setMatchedVolunteers] = useState([]);
  const [message, setMessage] = useState('');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Fetch volunteers based on skill and count
  const fetchVolunteers = async () => {
    try {
      const response = await fetch(`/api/volunteers?skill=${skill}`);
      const volunteers = await response.json();

      if (volunteers.length >= volunteerCount) {
        const selectedVolunteers = volunteers.slice(0, volunteerCount);
        setMatchedVolunteers(selectedVolunteers);

        // Update volunteers as 'assigned'
        await Promise.all(
          selectedVolunteers.map((volunteer) =>
            fetch(`/api/volunteers/${volunteer._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ assigned: true }),
            })
          )
        );
        setMessage(`Successfully assigned ${volunteerCount} volunteers.`);
      } else {
        setMessage('Not enough volunteers available.');
      }
    } catch (error) {
      console.error('Error fetching volunteers:', error);
      setMessage('Error fetching volunteers.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchVolunteers();
  };

  return (
    <div className="relative min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center bg-gray-800 text-white">
        <div className="font-bold text-lg">Organisation Logo</div>
        <div>
          <Link to="/organisation-page" className="mr-4">Organisation</Link>
          <button onClick={() => console.log('Logged out')} className="bg-red-500 px-4 py-2 rounded">
            Logout
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <div className="flex mt-16">
        {/* Left Section: Form for requesting volunteers */}
        <div className="w-1/2 p-8 bg-white shadow-md">
          <h2 className="text-2xl font-bold mb-6">Request Volunteers</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Number of Volunteers</label>
              <input
                type="number"
                value={volunteerCount}
                onChange={(e) => setVolunteerCount(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Skill</label>
              <select
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
                required
              >
                <option value="">Select Skill</option>
                <option value="Skill1">Skill 1</option>
                <option value="Skill2">Skill 2</option>
                <option value="Skill3">Skill 3</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
              Send Request
            </button>
          </form>

          {/* 'Request Volunteers' Button */}
          <button
            onClick={fetchVolunteers}
            className="mt-6 bg-green-500 text-white py-2 px-4 rounded"
          >
            req_volunteer
          </button>
        </div>

        {/* Right Section: Display matched volunteers */}
        <div className="w-1/2 p-8 bg-gray-100">
          <h2 className="text-2xl font-bold mb-6">Matched Volunteers</h2>
          {message && <p className="text-blue-500">{message}</p>}
          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Skill</th>
                <th className="border p-2">Assigned</th>
              </tr>
            </thead>
            <tbody>
              {matchedVolunteers.map((volunteer) => (
                <tr key={volunteer._id}>
                  <td className="border p-2">{volunteer.name}</td>
                  <td className="border p-2">{volunteer.phone}</td>
                  <td className="border p-2">{volunteer.skill}</td>
                  <td className="border p-2">{volunteer.assigned ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrganisationPage;
