interface AddButtonProps {
  label: string;
  onClick: () => void;
}

const AddButton = ({ label, onClick }: AddButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#3b3c79] hover:bg-[#4a4b8f] px-4 py-2 rounded-lg text-sm font-medium text-white transition"
    >
      + {label}
    </button>
  );
};

export default AddButton;