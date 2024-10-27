import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx'; // Import the xlsx library
import { saveAs } from 'file-saver'; // Import file-saver for saving files
import './RealtimeData.css'; // Import the CSS file
import { toast } from 'react-toastify'; // Import toast for notifications

const RealtimeData = () => {
  const [data, setData] = useState([]);
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  // Poll the backend every 5 seconds to fetch data
  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:5000/get-local-data')
        .then(response => response.json())
        .then(fetchedData => {
          console.log('Fetched Data:', fetchedData); // Log fetched data
          setData(fetchedData);
          setFilteredData(fetchedData); // Initialize filtered data
          setTotalRegistrations(fetchedData.length); // Count total registrations
        })
        .catch(error => console.error('Error fetching local data:', error));
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 5000); // Poll every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Function to update local data from Firebase
  const updateLocalData = async () => {
    try {
      const response = await fetch('http://localhost:5000/fetch-data');
      const result = await response.json();
      toast.success(result.message);
    } catch (error) {
      toast.error('Error updating data: ' + error.message);
    }
  };

  // Function to export data to Excel
  const exportToExcel = () => {
    // Prepare data for Excel
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');

    // Save the workbook as an Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'Registrations.xlsx');
  };

  // Handle search input
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = data.filter(item => {
      return (
        item.fullName?.toLowerCase().includes(searchValue) || 
        item.emailId?.toLowerCase().includes(searchValue) ||
        item.studentId?.toLowerCase().includes(searchValue) // Additional search fields
      );
    });
    setFilteredData(filtered);
  };

  return (
    <div>
      <h1>Registrations</h1>

      {/* Show total count of registrations */}
      <h2>Total Registrations: {totalRegistrations}</h2>

      {/* Search input */}
      <input 
        type="text" 
        placeholder="Search by name, email, or student ID..." 
        value={searchTerm}
        onChange={handleSearch}
      />

      {/* Button to update local data from Firebase */}
      <div className="button-container">
        <button onClick={updateLocalData} className="update-button">Update Local Data</button>
        <button onClick={exportToExcel} className="save-button">Save to Excel</button>
      </div>

      {/* Display fetched data */}
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Graduation Year</th>
            <th>Branch</th>
            <th>Skills</th>
            <th>Residential Address</th>
            <th>Student ID</th>
            <th>Preferred Coding Languages</th>
            <th>College Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map(item => (
              <tr key={item.id}>
                <td>{item.fullName}</td>
                <td>{item.emailId}</td>
                <td>{item.number}</td>
                <td>{item.graduation}</td>
                <td>{item.branch}</td>
                <td>{item.skills}</td>
                <td>{item.address}</td>
                <td>{item.studentId}</td>
                <td>{item.prefferedlanguages}</td>
                <td>{item.college}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RealtimeData;
