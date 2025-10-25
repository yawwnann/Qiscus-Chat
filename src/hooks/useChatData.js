import { useEffect, useMemo, useState } from "react";
import initialData from "../data/extended-chat-data.json";
import qiscusLogo from "../assets/qiscus.webp";
import { PARTICIPANT_COLORS, STATIC_CHATS } from "../constants";
import {
  formatPreviewTime,
  generateParticipantInitials,
} from "../utils/formatters";

export function useChatData() {
  const productRoom = initialData.results[0].room;
  const [comments, setComments] = useState(initialData.results[0].comments);
  const [selectedChatId, setSelectedChatId] = useState("product-a");

  const productParticipants = useMemo(() => {
    return productRoom.participant.map((participant, index) => {
      const initials = generateParticipantInitials(participant.name);

      return {
        ...participant,
        initials,
        accent: PARTICIPANT_COLORS[index % PARTICIPANT_COLORS.length],
      };
    });
  }, [productRoom]);

  const [currentUserEmail, setCurrentUserEmail] = useState(() => {
    const fallback =
      productParticipants.find((p) => p.role === 2) ?? productParticipants[0];
    return fallback?.id ?? "";
  });

  useEffect(() => {
    if (!productParticipants.length) return;
    const exists = productParticipants.some(
      (participant) => participant.id === currentUserEmail
    );
    if (!exists) {
      setCurrentUserEmail(productParticipants[0].id);
    }
  }, [currentUserEmail, productParticipants]);

  const chatItems = useMemo(() => {
    const lastComment = comments[comments.length - 1];
    const preview = lastComment ? lastComment.message : "Belum ada pesan";
    const previewTime = formatPreviewTime(lastComment?.timestamp);

    return [
      {
        id: "product-a",
        name: productRoom.name,
        subtitle: `${productRoom.participant.length} anggota · Grup`,
        avatarUrl: qiscusLogo,
        avatarType: "image",
        preview,
        time: previewTime,
        unread: 0,
        participants: productParticipants,
        hasMessages: true,
      },
      ...STATIC_CHATS.map((chat) => ({
        ...chat,
        avatarType: "initials",
        preview: "Belum ada pesan",
        time: null,
        unread: 0,
        participants: [],
        hasMessages: false,
      })),
    ];
  }, [comments, productParticipants, productRoom]);

  const activeChat =
    chatItems.find((chat) => chat.id === selectedChatId) ?? chatItems[0];
  const isProductChat = activeChat?.id === "product-a";

  const currentUserProfile = productParticipants.find(
    (participant) => participant.id === currentUserEmail
  );

  const activeParticipants = isProductChat ? productParticipants : [];
  const activeComments = isProductChat ? comments : [];

  const headerData = isProductChat
    ? {
        name: productRoom.name,
        subtitle: `${productRoom.participant.length} anggota · Grup`,
        avatarUrl: qiscusLogo,
        initials: "PA",
        status: "Aktif",
      }
    : {
        name: activeChat.name,
        subtitle: activeChat.subtitle,
        avatarUrl: null,
        initials: activeChat.initials,
        accent: activeChat.accent,
        status: "Belum ada percakapan",
      };

  const handleSendMessage = (newMessage) => {
    if (isProductChat) {
      setComments((prev) => [...prev, newMessage]);
    }
  };

  return {
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
    productRoom,
  };
}
