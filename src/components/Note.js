import React from "react";
import { darken } from "polished";
import tinycolor from "tinycolor2";

const determineColor = (color) => {
  const isDark = tinycolor(color).isDark();
  if (isDark) {
    return darken(-0.2, color);
  } else {
    return darken(0.2, color);
  }
};

// const determineFontColor = (color) => {
//   const isDark = tinycolor(color).isDark();
//   return isDark ? "#fff" : "#000";
// };

const Note = ({ note, onDelete, onSelect }) => (
  <div
    className="note"
    style={{
      //   color: determineFontColor(note.color),
      backgroundColor: note.color || "#fff", // Default color if none provided
      padding: "15px",
      margin: "10px",
      borderRadius: "8px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
      transition: "transform 0.2s",
      cursor: "pointer",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    }}
    onClick={() => onSelect(note)} // Open the note in edit mode
  >
    <h3>{note.title}</h3>
    <p style={{ overflowWrap: "break-word" }}>{note.content}</p>
    
    <button
      className="delete-button"
      style={{
        backgroundColor: note.color ? determineColor(note.color) : "#fff",
      }}
      onClick={(e) => {
        e.stopPropagation(); // Prevent triggering the onClick of the parent
        onDelete(note.id);
      }}
    >
      Delete
    </button>
  </div>
);

export default Note;
