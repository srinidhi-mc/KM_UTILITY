// src/components/AddVehicleModal.jsx

import React, { useState } from 'react';

const AddVehicleModal = ({ isOpen, onClose, onSave }) => {
  const initialState = {
    vehicleNumber: '',
    type: 'Sedan',
    model: '',
    manufacturingYear: new Date().getFullYear(),
    ownerName: '',
    licensePlateNumber: '',
    insuranceExpiry: '',
    status: 'Active',
    fuelType: 'Petrol',
    color: '#000000',
    notes: ''
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.vehicleNumber) newErrors.vehicleNumber = "Vehicle Number is mandatory.";
    if (!formData.model) newErrors.model = "Vehicle Model is mandatory.";
    if (!formData.ownerName) newErrors.ownerName = "Owner Name is mandatory.";
    // Add more complex validation rules here
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave(formData);
    setFormData(initialState); // Reset form
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Add New Vehicle</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vehicle Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Vehicle Number*</label>
              <input type="text" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
              {errors.vehicleNumber && <p className="text-red-500 text-xs mt-1">{errors.vehicleNumber}</p>}
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Vehicle Type*</label>
              <select name="type" value={formData.type} onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option>Sedan</option>
                <option>SUV</option>
                <option>Truck</option>
                <option>Van</option>
                <option>Bus</option>
              </select>
            </div>

            {/* Vehicle Model */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Vehicle Model*</label>
              <input type="text" name="model" value={formData.model} onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
              {errors.model && <p className="text-red-500 text-xs mt-1">{errors.model}</p>}
            </div>
            
            {/* Manufacturing Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Manufacturing Year</label>
              <input type="number" name="manufacturingYear" value={formData.manufacturingYear} onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" min="1990" max={new Date().getFullYear()} />
            </div>

            {/* Owner Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Owner Name*</label>
              <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
              {errors.ownerName && <p className="text-red-500 text-xs mt-1">{errors.ownerName}</p>}
            </div>

            {/* License Plate Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">License Plate Number</label>
              <input type="text" name="licensePlateNumber" value={formData.licensePlateNumber} onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>

            {/* Insurance Expiry */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Insurance Expiry Date</label>
              <input type="date" name="insuranceExpiry" value={formData.insuranceExpiry} onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Status*</label>
              <select name="status" value={formData.status} onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option>Active</option>
                <option>Inactive</option>
                <option>Under Maintenance</option>
              </select>
            </div>
            
            {/* Fuel Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
              <select name="fuelType" value={formData.fuelType} onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Electric</option>
                <option>Hybrid</option>
              </select>
            </div>

            {/* Vehicle Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Vehicle Color</label>
              <input type="color" name="color" value={formData.color} onChange={handleChange}
                className="mt-1 block w-full h-10 px-1 py-1 border border-gray-300 rounded-md shadow-sm" />
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Notes/Description</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end space-x-4">
            <button type="button" onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
              Save Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicleModal;