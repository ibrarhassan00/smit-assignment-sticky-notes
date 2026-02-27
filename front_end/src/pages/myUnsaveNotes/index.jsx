import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import NotesCard from "../../components/notesCard";
import axios from "axios";

const MyNotes = () => {
  const [data, setData] = useState([]);
  //Edit Section
  const [editNote_id, setEditNote_id] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const token = localStorage.getItem("uid");

  const getNotes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const filteredNotes = response.data.data.filter(
        (note) => note.isDraft === true
      );
      setData(filteredNotes);
    } catch (error) {
      console.log("Signup Failed:", error.message);
      return alert("Error:", error.message);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  // Edit Section
  let editNotes = (item) => {
    setEditNote_id(item._id);
    setEditTitle(item.title);
    setEditContent(item.content);
  };
  const saveEditNote = async (documentId) => {
    try {
      if (editTitle === null || editContent === null) {
        console.log("Update cancelled by user.");
        return;
      }
      const editNote = {
        title: editTitle,
        content: editContent,
        isDraft: false,
      };

      await axios.put(
        `http://localhost:8000/api/notes/${documentId}`,
        editNote,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditTitle("");
      setEditContent("");
      setEditNote_id(null);
      getNotes();
    } catch (error) {
      console.log("Save Failed:", error.message);
      alert("Error:", error.message);
    }
  };

  let deleteNote = async (documentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/notes/${documentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getNotes();
    } catch (error) {
      console.log("Save Failed:", error.message);
      alert("Error:", error.message);
    }
  };

  return (
    <>
      <Navbar />
      <h2 className="text-2xl font-bold text-gray-800 mb-4 p-5">Notes List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-8 py-6">
        {data.map((item) => {
          return item._id === editNote_id ? (
            // Note Edit Section
            <div
              key={item._id}
              className="relative flex flex-col justify-between p-5 rounded-xl shadow-md min-h-[220px] transition duration-300 hover:shadow-xl transform hover:-translate-y-1 border border-gray-300 bg-yellow-200"
              style={{ transform: "rotate(2deg)" }}
            >
              <input
                type="text"
                placeholder="Enter note title..."
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-400 pb-1 bg-transparent outline-none w-full"
              />
              <textarea
                placeholder="Write something..."
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="flex-1 text-gray-800 text-sm leading-relaxed overflow-hidden mb-3 bg-transparent outline-none w-full resize-none"
              />
              <button
                onClick={() => {
                  saveEditNote(item._id);
                }}
                className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Save Note
              </button>
            </div>
          ) : (
            // Render Notes Section
            <NotesCard
              key={item._id}
              id={item._id}
              title={item.title}
              content={item.content}
              date={item.date}
              funEdit={editNotes}
              funDeleteNote={deleteNote}
              item={item}
            />
          );
        })}
      </div>
    </>
  );
};

export default MyNotes;
