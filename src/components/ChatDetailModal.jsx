import { X, Users, FileText, Image, Video, FileIcon } from "lucide-react";
import { useState } from "react";

function ChatDetailModal({ isOpen, onClose, room, participants, comments }) {
  const [activeTab, setActiveTab] = useState("ringkasan");

  if (!isOpen) return null;

  const showImage = Boolean(room.avatarUrl);
  const initials = room.initials || room.name.slice(0, 2).toUpperCase();
  const accent = room.accent || "#16a34a";

  // Filter media dari comments
  const mediaItems =
    comments?.filter(
      (comment) =>
        comment.type === "image" ||
        comment.type === "video" ||
        comment.type === "pdf"
    ) || [];

  const imageCount = mediaItems.filter((item) => item.type === "image").length;
  const videoCount = mediaItems.filter((item) => item.type === "video").length;
  const fileCount = mediaItems.filter((item) => item.type === "pdf").length;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const tabs = [
    { id: "ringkasan", label: "Ringkasan", icon: FileText },
    { id: "anggota", label: "Anggota", icon: Users },
    { id: "media", label: "Media", icon: Image },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="flex h-full max-h-[600px] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Detail Chat</h2>
          <button
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Tutup"
          >
            <X size={20} />
          </button>
        </div>

        {/* Room Info */}
        <div className="flex flex-col items-center gap-4 border-b border-slate-200 px-6 py-6">
          {showImage ? (
            <img
              src={room.avatarUrl}
              alt={room.name}
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div
              className="flex h-24 w-24 items-center justify-center rounded-full text-2xl font-semibold text-white"
              style={{ backgroundColor: accent }}
            >
              {initials}
            </div>
          )}
          <div className="text-center">
            <h3 className="text-xl font-bold text-slate-900">{room.name}</h3>
            {room.subtitle && (
              <p className="mt-1 text-sm text-slate-500">{room.subtitle}</p>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "border-b-2 border-emerald-600 text-emerald-600"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "ringkasan" && (
            <div className="space-y-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <h4 className="mb-2 text-xs font-semibold uppercase text-slate-500">
                  Informasi
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-slate-500">Nama Room</p>
                    <p className="mt-1 font-medium text-slate-900">
                      {room.name}
                    </p>
                  </div>
                  {room.subtitle && (
                    <div>
                      <p className="text-xs text-slate-500">Status</p>
                      <p className="mt-1 font-medium text-slate-900">
                        {room.subtitle}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-slate-500">Jumlah Anggota</p>
                    <p className="mt-1 font-medium text-slate-900">
                      {participants?.length || 0} orang
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Total Pesan</p>
                    <p className="mt-1 font-medium text-slate-900">
                      {comments?.length || 0} pesan
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "anggota" && (
            <div className="space-y-3">
              {participants?.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-slate-50"
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: participant.accent }}
                  >
                    {participant.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-slate-900">
                      {participant.name}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {participant.id}
                    </p>
                  </div>
                  {participant.role === 2 && (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                      Admin
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === "media" && (
            <div className="space-y-4">
              {/* Summary */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-blue-50 p-4 text-center">
                  <Image size={24} className="mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold text-blue-900">
                    {imageCount}
                  </p>
                  <p className="text-xs text-blue-600">Gambar</p>
                </div>
                <div className="rounded-xl bg-purple-50 p-4 text-center">
                  <Video size={24} className="mx-auto mb-2 text-purple-600" />
                  <p className="text-2xl font-bold text-purple-900">
                    {videoCount}
                  </p>
                  <p className="text-xs text-purple-600">Video</p>
                </div>
                <div className="rounded-xl bg-red-50 p-4 text-center">
                  <FileIcon size={24} className="mx-auto mb-2 text-red-600" />
                  <p className="text-2xl font-bold text-red-900">{fileCount}</p>
                  <p className="text-xs text-red-600">File</p>
                </div>
              </div>

              {/* Media Grid */}
              {mediaItems.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {mediaItems.map((item, index) => (
                    <div
                      key={index}
                      className="relative aspect-square overflow-hidden rounded-lg bg-slate-100"
                    >
                      {item.type === "image" && (
                        <img
                          src={item.attachment.url}
                          alt={item.attachment.filename}
                          className="h-full w-full object-cover"
                        />
                      )}
                      {item.type === "video" && (
                        <div className="relative h-full w-full">
                          <video
                            src={item.attachment.url}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <Video size={24} className="text-white" />
                          </div>
                        </div>
                      )}
                      {item.type === "pdf" && (
                        <div className="flex h-full w-full items-center justify-center bg-red-50">
                          <FileIcon size={32} className="text-red-600" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
                  <Image size={48} className="text-slate-300" />
                  <p className="text-sm text-slate-500">Belum ada media</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatDetailModal;
