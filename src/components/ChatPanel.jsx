import Header from "./Header";
import MessageList from "./MessageList";
import MessageInput from "./MessegeInput";
import EmptyState from "./EmptyState";

function ChatPanel({
  activeChat,
  headerData,
  activeParticipants,
  currentUserProfile,
  currentUserEmail,
  isProductChat,
  activeComments,
  isMobile,
  mobileView,
  onSendMessage,
  onChangeUser,
  onBack,
}) {
  if (!activeChat) {
    return <EmptyState />;
  }

  return (
    <>
      <Header
        room={headerData}
        participants={activeParticipants}
        currentUserId={currentUserProfile?.id ?? ""}
        onChangeUser={isProductChat ? onChangeUser : undefined}
        showBackButton={isMobile && mobileView === "chat"}
        onBack={onBack}
        isMobile={isMobile}
      />
      <MessageList
        comments={activeComments}
        currentUser={currentUserProfile?.id ?? currentUserEmail}
        participants={activeParticipants}
        emptyState={
          isProductChat
            ? "Percakapan masih kosong. Mulai diskusi dengan pelanggan."
            : "Belum ada pesan. Kirim salam pertama Anda."
        }
      />
      <MessageInput
        onSendMessage={onSendMessage}
        currentUser={currentUserProfile?.id ?? currentUserEmail}
        currentUserLabel={currentUserProfile?.name}
        disabled={!isProductChat}
      />
    </>
  );
}

export default ChatPanel;
