import React from 'react';

const JournalEntry = ({ entry }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <p className="card-text">{entry.text}</p>
      </div>
      <img src={entry.imageUrl} className="card-img-bottom" alt="AI generated art" />
    </div>
  );
};

export default JournalEntry;
