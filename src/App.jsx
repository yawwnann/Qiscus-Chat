import Sidebar from "./components/Sidebar";
import ChatPanel from "./components/ChatPanel";
import { useChatData } from "./hooks/useChatData";
import { useResponsive } from "./hooks/useResponsive";

function App() {
  const { isMobile, mobileView, setMobileView } = useResponsive();
  const {
    chatItems,
    selectedChatId,
    setSelectedChatId,
    activeChat,
    isProductChat,
    currentUserEmail,
    setCurrentUserEmail,
    currentUserProfile,
    activeParticipants,
    activeComments,
    headerData,
    handleSendMessage,
  } = useChatData();

  const handleChatSelect = (chatId) => {
    setSelectedChatId(chatId);
    if (isMobile) {
      setMobileView("chat");
    }
  };

  const handleBackToList = () => {
    if (isMobile) {
      setMobileView("sidebar");
    }
  };

  const showSidebar = !isMobile || mobileView === "sidebar";
  const showChatPanel = !isMobile || mobileView === "chat";

  return (
    <div
      className={`flex h-screen bg-slate-100 text-slate-900 ${
        isMobile ? "flex-col" : "flex-row"
      }`}
    >
      {showSidebar && (
        <Sidebar
          chats={chatItems}
          selectedChatId={selectedChatId}
          onChatSelect={handleChatSelect}
        />
      )}

      {showChatPanel && (
        <div className="flex h-full flex-1 flex-col bg-white">
          <ChatPanel
            activeChat={activeChat}
            headerData={headerData}
            activeParticipants={activeParticipants}
            currentUserProfile={currentUserProfile}
            currentUserEmail={currentUserEmail}
            isProductChat={isProductChat}
            activeComments={activeComments}
            isMobile={isMobile}
            mobileView={mobileView}
            onSendMessage={handleSendMessage}
            onChangeUser={setCurrentUserEmail}
            onBack={handleBackToList}
          />
        </div>
      )}
    </div>
  );
}

export default App;
