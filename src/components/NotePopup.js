import React, { useState } from "react";

const NotePopup = ({ note, onClose, onSave }) => {
  const [content, setContent] = useState(note.content);

  const handleSave = () => {
    onSave({ ...note, content });
  };

  return (
    <div className="popup">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="10"
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default NotePopup;
