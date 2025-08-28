import React from "react";

interface Props {
  onClick: () => void;
}

const NoteButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 right-4 px-2 py-2 rounded-lg hover:bg-[#48484A] hover:cursor-pointer z-50"
    >
      <img src="/note_icon.png" alt="Toggle Notes" className="w-5 h-5" />
    </button>
  );
};

export default NoteButton;
