import { useEffect, useMemo, useState } from "react";
import initialData from "../data/extended-chat-data.json";
import qiscusLogo from "../assets/qiscus.png";
import { PARTICIPANT_COLORS } from "../constants";
import {
  formatPreviewTime,
  generateParticipantInitials,
} from "../utils/formatters";

export function useChatData() {
  const [allRooms, setAllRooms] = useState(initialData.results);
  const [selectedChatId, setSelectedChatId] = useState(() => {
    if (initialData.results.length > 0) {
      const firstRoom = initialData.results[0];
      return `room-${firstRoom.room.id}`;
    }
    return null;
  });

  // Get selected room data
  const selectedRoom = useMemo(() => {
    return allRooms.find((room) => `room-${room.room.id}` === selectedChatId);
  }, [allRooms, selectedChatId]);

  const productRoom = selectedRoom?.room || allRooms[0]?.room;
  const [comments, setComments] = useState(
    selectedRoom?.comments || allRooms[0]?.comments || []
  );

  // Update comments when selectedChatId changes
  useEffect(() => {
    if (selectedRoom) {
      setComments(selectedRoom.comments);
    }
  }, [selectedRoom]);

  const productParticipants = useMemo(() => {
    if (!productRoom?.participant) return [];

    return productRoom.participant.map((participant, index) => {
      const initials = generateParticipantInitials(
        participant.name || participant.id
      );

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
    return fallback?.id || "";
  });

  useEffect(() => {
    if (!productParticipants.length) return;
    const exists = productParticipants.some(
      (participant) => participant.id === currentUserEmail
    );
    if (!exists && productParticipants[0]) {
      setCurrentUserEmail(productParticipants[0].id);
    }
  }, [currentUserEmail, productParticipants]);

  const chatItems = useMemo(() => {
    return allRooms.map((roomData) => {
      const lastComment = roomData.comments[roomData.comments.length - 1];
      const preview = lastComment ? lastComment.message : "Belum ada pesan";
      const previewTime = formatPreviewTime(lastComment?.timestamp);

      const roomId = `room-${roomData.room.id}`;
      const initials = generateParticipantInitials(roomData.room.name);
      const isGroup = roomData.room.participant.length > 2;

      // Use qiscusLogo for Product A (room id 12456), otherwise use image_url from JSON
      const avatarUrl =
        roomData.room.id === 12456 ? qiscusLogo : roomData.room.image_url;
      const hasImage = avatarUrl !== null;

      return {
        id: roomId,
        name: roomData.room.name,
        subtitle: `${roomData.room.participant.length} anggota · ${
          isGroup ? "Grup" : "Pribadi"
        }`,
        avatarUrl: avatarUrl,
        avatarType: hasImage ? "image" : "initials",
        initials: initials,
        accent:
          PARTICIPANT_COLORS[roomData.room.id % PARTICIPANT_COLORS.length],
        preview,
        time: previewTime,
        unread: 0,
        participants: roomData.room.participant,
        hasMessages: roomData.comments.length > 0,
      };
    });
  }, [allRooms]);

  const activeChat =
    chatItems.find((chat) => chat.id === selectedChatId) ?? chatItems[0];

  const isProductChat = !!selectedRoom;

  const currentUserProfile = productParticipants.find(
    (participant) => participant.id === currentUserEmail
  );

  const activeParticipants = isProductChat ? productParticipants : [];
  const activeComments = isProductChat ? comments : [];

  const headerData =
    isProductChat && productRoom
      ? {
          name: productRoom.name,
          subtitle: `${productRoom.participant?.length || 0} anggota · ${
            productRoom.participant?.length > 2 ? "Grup" : "Pribadi"
          }`,
          avatarUrl:
            productRoom.id === 12456 ? qiscusLogo : productRoom.image_url,
          initials: generateParticipantInitials(productRoom.name),
          accent:
            PARTICIPANT_COLORS[
              (productRoom.id || 0) % PARTICIPANT_COLORS.length
            ],
          status: "Aktif",
        }
      : {
          name: activeChat?.name || "",
          subtitle: activeChat?.subtitle || "",
          avatarUrl: null,
          initials: activeChat?.initials || "",
          accent: activeChat?.accent || PARTICIPANT_COLORS[0],
          status: "Belum ada percakapan",
        };

  const handleSendMessage = (newMessage) => {
    if (isProductChat) {
      setComments((prev) => [...prev, newMessage]);

      // Update the room in allRooms
      setAllRooms((prevRooms) =>
        prevRooms.map((room) => {
          if (`room-${room.room.id}` === selectedChatId) {
            return {
              ...room,
              comments: [...room.comments, newMessage],
            };
          }
          return room;
        })
      );
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
