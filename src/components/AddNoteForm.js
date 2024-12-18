import React, { useState, useRef, useEffect } from "react";

const AddNoteForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [isExpanded, setIsExpanded] = useState(false);
  const [initialHeight, setInitialHeight] = useState("auto");

  const titleInputRef = useRef(null);

  // Dynamically calculate the height of the title input
  useEffect(() => {
    if (titleInputRef.current) {
      setInitialHeight(`${titleInputRef.current.offsetHeight}px`);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ title, content, color });
    setTitle("");
    setContent("");
    setColor("#ffffff");
    setIsExpanded(false);
  };

  const handleExpand = () => {
    setIsExpanded(true);
  };

  return (
    <div
      className={`add-note-form ${isExpanded ? "expanded" : ""}`}
      onClick={!isExpanded ? handleExpand : undefined}
      style={{
        cursor: !isExpanded ? "pointer" : "default",
        height: isExpanded ? "auto" : initialHeight,
        padding: isExpanded ? "20px" : "0",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        transition: "all 0.7s ease",
        overflow: "hidden",
        display: "flex", // Ensure no gaps
        alignItems: "center", // Center-align the title input
        justifyContent: "center", // Center-align horizontally
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          margin: "0", // Remove default form margin
        }}
      >
        {/* Title Input */}
        <input
          ref={titleInputRef}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            margin: "0", // Remove default input margin
            padding: "10px",
            borderRadius: "8px",
            width: "100%",
            height: "100%", // Ensure it fills the parent div
            border: "1px solid #e0e0e0",
            boxSizing: "border-box", // Include padding in width/height calculations
          }}
        />
        {/* Expanded Content */}
        {isExpanded && (
          <>
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                margin: "10px 0",
                padding: "10px",
                borderRadius: "8px",
                width: "91%",
                border: "1px solid #e0e0e0",
              }}
            />
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{
                margin: "10px 0",
                padding: "10px",
                borderRadius: "8px",
                width: "50%",
                border: "1px solid #e0e0e0",
              }}
            />
            <button
              type="submit"
              style={{
                margin: "10px 0",
                padding: "10px",
                borderRadius: "8px",
                width: "70%",
                backgroundColor: "#e04343",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Add Note
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default AddNoteForm;
