// src/pages/VehicleManagement.jsx

import React, { useState, useEffect } from 'react';
import AddVehicleModal from '../components/AddVehicleModal';
// import { getVehicles } from '../services/vehicleService'; // Uncomment when API is ready

// Mock data for initial display until backend is connected
const mockVehicles = [
  { id: 1, vehicleNumber: 'KA01AB1234', type: 'SUV', model: 'Toyota Fortuner', status: 'Active' },
  { id: 2, vehicleNumber: 'MH12CD5678', type: 'Sedan', model: 'Honda Civic', status: 'Inactive' },
  { id: 3, vehicleNumber: 'DL03EF9012', type: 'Truck', model: 'Tata 407', status: 'Under Maintenance' },
];

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect(() => {
  //   // TODO: Fetch vehicles from the Spring backend
  //   // getVehicles().then(data => setVehicles(data));
  // }, []);

  const handleAddVehicle = (newVehicle) => {
    // This will be replaced by a backend call and re-fetch
    const vehicleWithId = { ...newVehicle, id: vehicles.length + 1 };
    setVehicles([...vehicles, vehicleWithId]);
  };

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Vehicle Management</h1>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by Vehicle No or Model..."
          className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          Add Vehicle
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredVehicles.map((vehicle) => (
              <tr key={vehicle.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vehicle.vehicleNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{vehicle.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{vehicle.model}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    vehicle.status === 'Active' ? 'bg-green-100 text-green-800' :
                    vehicle.status === 'Inactive' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {vehicle.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddVehicleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddVehicle}
      />
    </div>
  );
};

export default VehicleManagement;