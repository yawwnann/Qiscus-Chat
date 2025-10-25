import Message from "./Messege";

function MessageList({ comments, currentUser, participants, emptyState }) {
  const hasMessages = comments.length > 0;

  return (
    <section
      className="flex-1 overflow-y-auto bg-slate-50 p-6"
      aria-live="polite"
    >
      {hasMessages ? (
        <div className="flex flex-col gap-4">
          {comments.map((comment) => (
            <Message
              key={comment.id}
              comment={comment}
              isSender={comment.sender === currentUser}
              participants={participants}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-slate-500">
          <div className="text-4xl opacity-35" aria-hidden="true">
            💬
          </div>
          <p>{emptyState}</p>
        </div>
      )}
    </section>
  );
}

export default MessageList;
