const axios = require('axios');

const apiUrl = 'http://localhost:30080'; // Replace with the actual API URL

// Seed Data

const seedBirthData = {
  motherCattleNumber: 'CATTLE123',
  birthDate: '2024-12-14',
};

const seedCattleData = {
  cattleNumber: 'CATTLE001',
  entryDate: '2024-01-01',
  breed: 'Holstein',
};

const seedMedicalExaminationData = {
  cattleNumber: 'CATTLE001',
  examinationDate: '2024-12-10',
  disease: 'No disease detected',
};

const seedMilkProductionData = {
  date: '2024-12-14',
  milkQuantityLiters: 30,
};

// Helper function to make API requests

const postData = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    console.log(`Data posted to ${url}:`, response.data);
  } catch (error) {
    console.error(`Error posting data to ${url}:`, error);
  }
};

// Function to seed all data
const seedAllData = async () => {
  console.log('Seeding birth registration...');
  await postData(`${apiUrl}/birth/birth-registrations`, seedBirthData);

  console.log('Seeding cattle...');
  await postData(`${apiUrl}/cattles/cattle`, seedCattleData);

  console.log('Seeding medical examination...');
  await postData(`${apiUrl}/medical/medical-examinations`, seedMedicalExaminationData);

  console.log('Seeding milk production...');
  await postData(`${apiUrl}/milk/milk-production`, seedMilkProductionData);

  console.log('Seeding completed!');
};

// Call the seed function to populate data
seedAllData();

