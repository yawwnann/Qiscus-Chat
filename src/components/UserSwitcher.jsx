function UserSwitcher({ currentUser, participants, onUserSwitch }) {
  return (
    <div className="bg-yellow-100 border-b border-yellow-200 p-2">
      <div className="text-xs text-yellow-800 mb-2">
        Switch User (untuk testing):
      </div>
      <div className="flex space-x-2">
        {participants.map((participant) => (
          <button
            key={participant.id}
            onClick={() => onUserSwitch(participant.id)}
            className={`px-3 py-1 text-xs rounded ${
              currentUser === participant.id
                ? "bg-yellow-500 text-white"
                : "bg-white text-yellow-800 border border-yellow-300"
            }`}
          >
            {participant.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default UserSwitcher;
