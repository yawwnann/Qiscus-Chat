import {
  ArrowLeft,
  MoreVertical,
  Phone,
  Search,
  UserRound,
  Video,
} from "lucide-react";
import { useState } from "react";
import ChatDetailModal from "./ChatDetailModal";

function Header({
  room,
  participants = [],
  currentUserId,
  onChangeUser,
  showBackButton = false,
  onBack,
  isMobile = false,
  comments = [],
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showImage = Boolean(room.avatarUrl);
  const initials = room.initials || room.name.slice(0, 2).toUpperCase();
  const accent = room.accent || "#16a34a";

  const headerClasses = isMobile
    ? "flex items-center justify-between gap-2 border-b border-slate-700 bg-slate-900 px-3 py-2 text-white"
    : "flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4 text-slate-900";

  const actionButtonClasses = isMobile
    ? "inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 transition hover:bg-slate-800"
    : "inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-emerald-100 hover:text-emerald-600";

  const avatarSize = isMobile ? "h-9 w-9" : "h-11 w-11";
  const avatarTextSize = isMobile ? "text-xs" : "text-sm";

  const subtitleClasses = isMobile
    ? "text-[0.65rem] text-slate-400"
    : "text-xs text-slate-500";

  const statusClasses = isMobile
    ? "text-[0.65rem] font-semibold text-emerald-400"
    : "text-xs font-semibold text-emerald-600";

  return (
    <header
      className={headerClasses}
      aria-label={`Percakapan dengan ${room.name}`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {showBackButton && (
          <button
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-300 transition hover:bg-slate-800"
            type="button"
            aria-label="Kembali ke daftar percakapan"
            onClick={() => onBack?.()}
          >
            <ArrowLeft size={20} />
          </button>
        )}

        {showImage ? (
          <img
            src={room.avatarUrl}
            alt={room.name}
            className={`${avatarSize} shrink-0 rounded-lg object-cover`}
          />
        ) : (
          <div
            className={`${avatarSize} flex shrink-0 items-center justify-center rounded-lg ${avatarTextSize} font-semibold text-white`}
            style={{ backgroundColor: accent }}
            aria-hidden="true"
          >
            {initials}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full text-left transition hover:opacity-75"
          >
            <h1
              className={`truncate font-semibold leading-tight ${
                isMobile ? "text-sm text-white" : "text-base text-slate-900"
              }`}
            >
              {room.name}
            </h1>
            {room.subtitle && (
              <span className={`block truncate ${subtitleClasses}`}>
                {room.subtitle}
              </span>
            )}
            {room.status && !isMobile && (
              <span className={statusClasses}>{room.status}</span>
            )}
          </button>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        {isMobile ? (
          <>
            {participants.length > 0 && onChangeUser && (
              <div className="relative mr-0.5">
                <select
                  className="h-9 w-9 cursor-pointer appearance-none rounded-lg text-center text-xs font-semibold text-white opacity-0 transition focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={currentUserId}
                  onChange={(event) => onChangeUser(event.target.value)}
                  aria-label="Ganti identitas pengirim"
                  style={{
                    backgroundImage: "none",
                  }}
                >
                  {participants.map((participant) => (
                    <option key={participant.id} value={participant.id}>
                      {participant.name}
                    </option>
                  ))}
                </select>
                <div
                  className="pointer-events-none absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-lg text-xs font-semibold text-white transition hover:opacity-90"
                  style={{
                    backgroundColor:
                      participants.find((p) => p.id === currentUserId)
                        ?.accent || "#16a34a",
                  }}
                  aria-hidden="true"
                >
                  {participants.find((p) => p.id === currentUserId)?.initials ||
                    participants
                      .find((p) => p.id === currentUserId)
                      ?.name.slice(0, 2)
                      .toUpperCase()}
                </div>
              </div>
            )}
            <button
              className={actionButtonClasses}
              type="button"
              aria-label="Mulai panggilan video"
            >
              <Video size={18} />
            </button>
            <button
              className={actionButtonClasses}
              type="button"
              aria-label="Opsi percakapan"
            >
              <MoreVertical size={18} />
            </button>
          </>
        ) : (
          <>
            {participants.length > 0 && onChangeUser && (
              <label className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-xs text-slate-500">
                <span className="flex items-center gap-1 text-xs font-medium">
                  <UserRound size={14} aria-hidden="true" />
                  <span>Kirim sebagai</span>
                </span>
                <select
                  className="bg-transparent text-xs font-semibold text-slate-900 focus:outline-none"
                  value={currentUserId}
                  onChange={(event) => onChangeUser(event.target.value)}
                  aria-label="Ganti identitas pengirim"
                >
                  {participants.map((participant) => (
                    <option key={participant.id} value={participant.id}>
                      {participant.name}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <button
              className={actionButtonClasses}
              type="button"
              aria-label="Mulai panggilan video"
            >
              <Video size={18} />
            </button>
            <button
              className={actionButtonClasses}
              type="button"
              aria-label="Mulai panggilan suara"
            >
              <Phone size={18} />
            </button>
            <button
              className={actionButtonClasses}
              type="button"
              aria-label="Cari dalam percakapan"
            >
              <Search size={18} />
            </button>
            <button
              className={actionButtonClasses}
              type="button"
              aria-label="Opsi percakapan"
            >
              <MoreVertical size={18} />
            </button>
          </>
        )}
      </div>

      {/* Chat Detail Modal */}
      <ChatDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        room={room}
        participants={participants}
        comments={comments}
      />
    </header>
  );
}

export default Header;
