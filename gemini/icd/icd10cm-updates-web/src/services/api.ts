import axios from 'axios';

const API_BASE_URL = 'https://api.example.com/icd10cm'; // Replace with the actual API endpoint

export const fetchUpdates = async (): Promise<any> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/updates`);
        return response.data;
    } catch (error) {
        console.error('Error fetching updates:', error);
        throw error;
    }
};