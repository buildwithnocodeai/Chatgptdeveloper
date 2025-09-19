import React from 'react';
import UpdatesList from './components/UpdatesList';

const App: React.FC = () => {
    return (
        <div>
            <h1>ICD-10-CM Updates</h1>
            <UpdatesList />
        </div>
    );
};

export default App;