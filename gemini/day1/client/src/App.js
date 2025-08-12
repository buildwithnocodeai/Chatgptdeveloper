import React from 'react';
import JournalEditor from './components/JournalEditor';
import JournalFeed from './components/JournalFeed';

function App() {
  return (
    <div className="container">
      <h1 className="my-4 text-center">AI Art Journal</h1>
      <JournalEditor />
      <JournalFeed />
    </div>
  );
}

export default App;
