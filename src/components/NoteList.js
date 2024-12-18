import React from "react";
import Note from "./Note";

const NoteList = ({ notes, onDelete, onSelect }) => (
  <div className="note-list">
    {notes.length > 0
      ? notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            onDelete={onDelete}
            onSelect={onSelect} // Pass the select handler
          />
        ))
      : null}
  </div>
);

export default NoteList;
