import React, { useState, useEffect } from "react";
import {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
  login,
} from "./services/api"; // Import login API
import NoteList from "./components/NoteList";
import AddNoteForm from "./components/AddNoteForm";
import "./styles.css"; // Import styles
import { darken } from "polished";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null); // Track the selected note for editing
  const [hoveredSave, setHoveredSave] = useState(false); // Hover state for Save button
  const [hoveredClose, setHoveredClose] = useState(false); // Hover state for Close button
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track user authentication
  const [token, setToken] = useState(""); // Store JWT token
  const [loginError, setLoginError] = useState(""); // Track login errors
  const [username, setUsername] = useState(""); // Username input
  const [password, setPassword] = useState(""); // Password input

  // Fetch notes from the backend after login
  useEffect(() => {
    if (isAuthenticated) {
      const fetchNotes = async () => {
        try {
          const data = await getNotes(token); // Pass token for authentication
          setNotes(data);
        } catch (error) {
          console.error("Failed to fetch notes:", error);
        }
      };
      fetchNotes();
    }
  }, [isAuthenticated, token]);

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password); // Call the login API
      setToken(response.token); // Save the token
      setIsAuthenticated(true); // Set authenticated to true
      setLoginError(""); // Clear any login errors
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Invalid username or password. Please try again.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setToken("");
    setNotes([]);
  };

  // Add a new note
  const handleAddNote = async (note) => {
    const newNote = await createNote(note, token); // Pass token for authentication
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  // Delete a note
  const handleDeleteNote = async (id) => {
    await deleteNote(id, token); // Pass token for authentication
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  // Select a note for editing
  const handleSelectNote = (note) => {
    setSelectedNote(note); // Open the note in edit mode
  };

  // Close the popup
  const handleClosePopup = () => {
    setSelectedNote(null); // Close the popup
  };

  // Update a note and save changes to the database
  const handleUpdateNote = async (updatedNote) => {
    try {
      const savedNote = await updateNote(updatedNote, token); // Save to the database
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === savedNote.id ? savedNote : note))
      );
      setSelectedNote(null); // Close the popup after saving
    } catch (error) {
      console.error("Failed to update the note:", error);
      alert("An error occurred while saving the note. Please try again.");
    }
  };

  // Render the login page if the user is not authenticated
  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <div className="login-bg">
          <h1>Login</h1>
        </div>

        <form onSubmit={handleLogin}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
          {loginError && <p className="error">{loginError}</p>}
        </form>
      </div>
    );
  }

  // Render the notes app if the user is authenticated
  return (
    <div>
      <div className="header">
        <h1>Sticky Notes</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      <div className="app">
        <AddNoteForm onAdd={handleAddNote} />
      </div>
      <div className="app notes">
        <NoteList
          notes={notes}
          onDelete={handleDeleteNote}
          onSelect={handleSelectNote} // Pass the select handler
        />
      </div>
      {selectedNote && (
        <div className="popup">
          <h3>Edit Note</h3>
          <input
            type="text"
            value={selectedNote.title}
            onChange={(e) =>
              setSelectedNote({ ...selectedNote, title: e.target.value })
            }
          />
          <textarea
            value={selectedNote.content}
            onChange={(e) =>
              setSelectedNote({ ...selectedNote, content: e.target.value })
            }
          />
          {/* Save Button */}
          <button
            style={{
              backgroundColor: hoveredSave
                ? darken(0.2, selectedNote.color)
                : selectedNote.color || "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "10px",
              margin: "10px 5px",
              cursor: "pointer",
            }}
            onMouseEnter={() => setHoveredSave(true)}
            onMouseLeave={() => setHoveredSave(false)}
            onClick={() => handleUpdateNote(selectedNote)}
          >
            Save
          </button>
          {/* Close Button */}
          <button
            style={{
              backgroundColor: hoveredClose
                ? darken(0.2, selectedNote.color)
                : selectedNote.color || "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "10px",
              margin: "10px 5px",
              cursor: "pointer",
            }}
            onMouseEnter={() => setHoveredClose(true)}
            onMouseLeave={() => setHoveredClose(false)}
            onClick={handleClosePopup}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
