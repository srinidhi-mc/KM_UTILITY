// src/services/vehicleService.js

const API_BASE_URL = 'http://localhost:8080/api'; // Adjust to your Spring backend URL

export const getVehicles = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/vehicles`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch vehicles:", error);
    return []; // Return empty array on error
  }
};

export const createVehicle = async (vehicleData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/vehicles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicleData),
    });
    if (!response.ok) {
      throw new Error('Failed to create vehicle');
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to create vehicle:", error);
    throw error; // Re-throw to handle it in the component
  }
};

// TODO: Add functions for updateVehicle and deleteVehicle