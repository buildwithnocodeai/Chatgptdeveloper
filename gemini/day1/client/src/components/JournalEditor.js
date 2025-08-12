import React, { useState } from 'react';

const JournalEditor = () => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add logic to save the journal entry
    console.log('Journal entry:', text);
    setText('');
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">New Journal Entry</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="5"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's on your mind?"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default JournalEditor;
