import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import NotesCard from "../../components/notesCard";
import axios from "axios";
import Header from "../../components/header";

const Dashboard = () => {
  const [draftId, setDraftId] = useState(null);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("uid");
  const [dummyCard, setDummyCard] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isDraftData, setIsDraftData] = useState([]);
  //Edit Section
  const [editNote_id, setEditNote_id] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");


  // get all Data
  const getNotes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.status === false) {
        console.log("Error:", response.data.message);
        return alert(response.data.message);
      }
      const allNotes = response.data.data;
      const filteredNotes = allNotes.filter((note) => note.isDraft === false);
      setData(filteredNotes);
      const forTrueIsDraft = allNotes.filter((note) => note.isDraft === true);
      setIsDraftData(forTrueIsDraft);
    } catch (error) {
      console.log("Signup Failed:", error.message);
      return alert("Error:", error.message);
    }
  };
  useEffect(() => {
    getNotes();
  }, []);

  // active_new_note_creaction_card
  let active_new_note_creaction_card = () => {
    setDummyCard(true);
  };
  // Create Note
  let saveNewNote = async () => {
    try {

if(draftId){
let finalObj = {
        title,
        content,
        isDraft: false,
      };
  await axios.put(
          `http://localhost:8000/api/notes/${draftId}`,
          finalObj,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Finally Saved!");
}else{
      let noteObj = {
        title,
        content,
        isDraft: false,
      };
      const response = await axios.post(
        "http://localhost:8000/api/notes",
        noteObj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
}
      setTitle("");
      setContent("");
      getNotes();
      setDummyCard(false);
      setDraftId(null)
      
    } catch (error) {
      console.log("Save Failed:", error.message);
      alert("Error:", error.message);
    }
  };

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

// Delete Note
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

// Handle Draft Note
  const saveDraft = async () => {
    try {
      const draftObj = { title, content, isDraft: true };

      if (draftId) {
        // 🟡 Update existing draft
        await axios.put(
          `http://localhost:8000/api/notes/${draftId}`,
          draftObj,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Draft updated!");
      } else {
        // 🟢 Create new draft
        const response = await axios.post(
          "http://localhost:8000/api/notes",
          draftObj,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDraftId(response.data.data._id);
        console.log("Draft created!");
      }
    } catch (error) {
      console.log("Draft save failed:", error.message);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (title || content) {
        saveDraft();
      }
    }, 2000); // user likhe to 2 sec baad auto-save

    return () => clearTimeout(timeout);
  }, [title, content]);

  
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 p-4 sm:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <Header data={data} isDraftData={isDraftData} />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Notes List</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-8 py-6">
            {data.map((item) => {
              return item._id  ===  editNote_id ? (
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
            {/* Condiction Rederning ----- cardBtn or Card Feild */}
            {dummyCard ? (
              // New Note Create Section
              <div
                className="relative flex flex-col justify-between p-5 rounded-xl shadow-md min-h-[220px] transition duration-300 hover:shadow-xl transform hover:-translate-y-1 border border-gray-300 bg-yellow-200"
                style={{ transform: "rotate(2deg)" }}
              >
                <input
                  type="text"
                  placeholder="Enter note title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-400 pb-1 bg-transparent outline-none w-full"
                />
                <textarea
                  placeholder="Write something..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="flex-1 text-gray-800 text-sm leading-relaxed overflow-hidden mb-3 bg-transparent outline-none w-full resize-none"
                />
                <button
                  onClick={() => {
                    saveNewNote();
                  }}
                  className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Save Note
                </button>
              </div>
            ) : (
              // New Note Button
              <div
                className={`relative flex flex-col justify-between p-5 rounded-xl shadow-md min-h-[220px] transition duration-300 hover:shadow-xl transform hover:-translate-y-1 border border-transparent `}
                style={{ transform: "rotate(2deg)" }}
              >
                <button
                  type="button"
                  className="flex items-center justify-center min-h-[180px] border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 transition duration-300 text-gray-500 hover:text-blue-600 w-full"
                  onClick={active_new_note_creaction_card}
                >
                  <div className="text-center p-4">
                    <p className="text-lg font-semibold">Click to Add Note</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 mx-auto mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
