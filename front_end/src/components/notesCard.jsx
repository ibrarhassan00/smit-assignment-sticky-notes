

let NotesCard = ({id, title , content , date , funEdit , funDeleteNote , item} )=>{

const formattedDate = new Date(date).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

return(
  <div
    className="relative flex flex-col justify-between p-5 rounded-xl shadow-md min-h-[220px] 
               transition duration-300 hover:shadow-2xl transform hover:-translate-y-2 
               border border-gray-200 bg-yellow-100 hover:bg-yellow-200"
  >
    <h3 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1 truncate">
      {title}
    </h3>

    <p className="flex-1 text-gray-800 text-sm leading-relaxed overflow-y-auto mb-3 max-h-32">
      {content}
    </p>

    <div className="flex justify-between items-center pt-2 border-t border-gray-300 text-sm">
      <span className="text-xs text-gray-600 italic">{formattedDate}</span>
      <div className="flex space-x-3">
        <button
          id={id}
          className="text-blue-600 hover:text-blue-800 font-medium"
          onClick={() => funEdit(item)}
        >
          Edit
        </button>
        <button
          id={id}
          className="text-red-500 hover:text-red-700 font-medium"
          onClick={() => funDeleteNote(id)}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);
    
}

export default NotesCard;