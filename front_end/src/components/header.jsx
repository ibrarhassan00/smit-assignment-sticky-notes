import React from "react";

const Header = ({ data, isDraftData }) => {
  const savedNotes = data.filter((note) => !note.isDraft).length;
  const draftNotes = isDraftData.filter((note) => note.isDraft).length;
  const totalNotes = savedNotes + draftNotes;
  // Mock data for the statistics
  const stats = [
    {
      title: "Total Notes",
      value: totalNotes,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Saved Notes",
      value: savedNotes,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Unsaved Notes",
      value: draftNotes,
      color: "text-red-600",
      bg: "bg-red-100",
    },
  ];

  return (
    <>
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4 sm:mb-0">
          Sticky Note Dashboard
        </h1>
      </header>

      {/* Notes Statistics / Summary Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`p-6 rounded-xl shadow-md border ${stat.bg} border-gray-200 transition duration-300 hover:shadow-lg`}
          >
            <p className="text-sm font-medium text-gray-500">{stat.title}</p>
            <p className={`mt-1 text-4xl font-bold ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </section>
    </>
  );
};

export default Header;
