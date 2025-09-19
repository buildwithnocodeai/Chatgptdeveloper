import axios from 'axios';
import { Update } from '../types';

const API_BASE_URL = 'https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search';

export const fetchUpdates = async (): Promise<Update[]> => {
    try {
        const response = await axios.get(API_BASE_URL, {
            params: {
                terms: 'new code'
            }
        });

        const data = response.data;
        if (data && data.length > 3) {
            const updates: Update[] = data.slice(3).map((row: any[]) => ({
                id: row[0],
                title: row[1],
                description: row[2],
                date: ''
            }));
            return updates;
        }

        return [];
    } catch (error) {
        console.error('Error fetching updates:', error);
        throw error;
    }
};