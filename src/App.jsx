import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ChatPanel from "./components/ChatPanel";
import Preloader from "./components/Preloader";
import { useChatData } from "./hooks/useChatData";
import { useResponsive } from "./hooks/useResponsive";

function App() {
  const [isLoading, setIsLoading] = useState(true);
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

  // Simulasi loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Loading selama 1.5 detik

    return () => clearTimeout(timer);
  }, []);

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

  // Tampilkan preloader jika masih loading
  if (isLoading) {
    return <Preloader />;
  }

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
