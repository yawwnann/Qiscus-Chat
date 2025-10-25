import {
  ArrowLeft,
  CircleUserRound,
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
  const accent = room.accent || "#16a34a";

  // Fungsi untuk menggelapkan warna
  const darkenColor = (color, percent = 40) => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = ((num >> 8) & 0x00ff) - amt;
    const B = (num & 0x0000ff) - amt;
    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  };

  const headerClasses = isMobile
    ? "flex items-center justify-between gap-2 border-b border-slate-700 bg-slate-900 px-3 py-2 text-white"
    : "flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4 text-slate-900";

  const actionButtonClasses = isMobile
    ? "inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 transition hover:bg-slate-800"
    : "inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-emerald-100 hover:text-emerald-600";

  const avatarSize = isMobile ? 36 : 44;

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
            className="shrink-0 rounded-full object-cover"
            style={{ width: avatarSize, height: avatarSize }}
          />
        ) : (
          <div
            className="flex shrink-0 items-center justify-center rounded-full"
            style={{
              width: avatarSize,
              height: avatarSize,
              backgroundColor: darkenColor(accent, 40),
            }}
          >
            <CircleUserRound
              size={isMobile ? 26 : 32}
              style={{ color: accent }}
              strokeWidth={2}
              aria-hidden="true"
            />
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
