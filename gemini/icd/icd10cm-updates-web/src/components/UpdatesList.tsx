import React, { useEffect, useState } from 'react';
import { fetchUpdates } from '../services/api';
import { Update } from '../types';

const UpdatesList: React.FC = () => {
    const [updates, setUpdates] = useState<Update[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getUpdates = async () => {
            try {
                const data = await fetchUpdates();
                setUpdates(data);
            } catch (err) {
                setError('Failed to fetch updates');
            } finally {
                setLoading(false);
            }
        };

        getUpdates();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <ul>
            {updates.map((update) => (
                <li key={update.id}>
                    <h3>{update.title}</h3>
                    <p>{update.description}</p>
                </li>
            ))}
        </ul>
    );
};

export default UpdatesList;