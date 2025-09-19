import React, { useEffect, useState } from 'react';
import { fetchUpdates } from '../services/api';
import { Update } from '../types';
import './UpdatesList.css';

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
        <table className="updates-table">
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {updates.map((update) => (
                    <tr key={update.id}>
                        <td>{update.id}</td>
                        <td>{update.title}</td>
                        <td>{update.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UpdatesList;