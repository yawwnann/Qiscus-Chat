import "../fallback.css";

function Header({ room }) {
  return (
    <div className="chat-header">
      <img src={room.image_url} alt={room.name} />
      <div>
        <h1>{room.name}</h1>
        <div className="participants">
          {room.participant.length} participants • Room ID: {room.id}
        </div>
      </div>
    </div>
  );
}

export default Header;
