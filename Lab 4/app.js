import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [noteColor, setNoteColor] = useState('yellow');

  const addNote = async () => {
    if (noteText.trim() === '') {
      return;
    }

    try {
      const response = await axios.get('https://api.thedogapi.com/v1/images/search');
      const catImage = response.data[0].url;

      const newNote = {
        text: noteText,
        color: noteColor,
        catImage: catImage,
      };

      setNotes([...notes, newNote]);
      setNoteText('');
    } catch (error) {
      console.error('Error fetching cat image:', error);
    }
  };

  const editNoteText = (index) => {
    const newText = prompt('Edit the note:', notes[index].text);
    if (newText !== null) {
      const updatedNotes = [...notes];
      updatedNotes[index].text = newText;
      setNotes(updatedNotes);
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  return (
    <div className="container">
      <div className="note-form">
        <input
          type="text"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Enter your note"
        />
        <select value={noteColor} onChange={(e) => setNoteColor(e.target.value)}>
          <option value="yellow">Yellow</option>
          <option value="pink">Pink</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="purple">Purple</option>
        </select>
        <button onClick={addNote}>Add</button>
      </div>

      <div className="notes">
        {notes.map((note, index) => (
          <div key={index} className="note" style={{ backgroundColor: note.color }}>
            <div className="note-text">{note.text}</div>
            {note.catImage && <img src={note.catImage} alt="Cat" className="cat-image" />}
            <div className="note-buttons">
              <button onClick={() => editNoteText(index)}>Edit</button>
              <button onClick={() => deleteNote(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
