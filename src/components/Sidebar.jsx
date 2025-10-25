import {
  Bell,
  CirclePlus,
  MessageCircleMore,
  Search,
  Sparkles,
} from "lucide-react";
import logo from "../assets/Logo_Teks.png";

function Sidebar({ chats, selectedChatId, onChatSelect }) {
  const renderAvatar = (chat) => {
    if (chat.avatarType === "image" && chat.avatarUrl) {
      return (
        <img
          src={chat.avatarUrl}
          alt={chat.name}
          className="h-11 w-11 rounded-xl object-cover"
        />
      );
    }

    const initials = chat.initials || chat.name.slice(0, 2).toUpperCase();
    return (
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl text-sm font-semibold text-white"
        style={{ backgroundColor: chat.accent || "#0ea5e9" }}
        aria-hidden="true"
      >
        {initials}
      </div>
    );
  };

  return (
    <aside
      className="flex h-full w-full flex-col gap-5 border-b border-slate-200 bg-white p-5 md:w-80 md:max-w-sm md:border-b-0 md:border-r xl:w-96"
      aria-label="Daftar percakapan"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Qiscus" className="h-8" />
        </div>
        <div className="flex items-center gap-1.5">
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-600"
            type="button"
            aria-label="Cari"
          >
            <Search size={18} />
          </button>
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-600"
            type="button"
            aria-label="Notifikasi"
          >
            <Bell size={18} />
          </button>
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-xs font-semibold text-white shadow-sm"
            role="img"
            aria-label="Agen"
          >
            AM
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3.5 py-2.5 text-slate-500 transition focus-within:bg-slate-100 focus-within:ring-2 focus-within:ring-emerald-200">
        <Search size={16} aria-hidden="true" className="shrink-0" />
        <input
          type="search"
          placeholder="Cari percakapan"
          aria-label="Bidang pencarian percakapan"
          className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
        />
        <button
          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white hover:text-emerald-600"
          type="button"
          aria-label="Mulai percakapan baru"
        >
          <CirclePlus size={18} />
        </button>
      </div>

      {/* Filter Pills */}
      <div
        className="scrollbar-hide -mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
        role="tablist"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <button
          className="shrink-0 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          role="tab"
        >
          Semua pesan
        </button>
        <button
          className="shrink-0 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          role="tab"
        >
          Belum dibaca
        </button>
        <button
          className="shrink-0 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          role="tab"
        >
          Favorit
        </button>
      </div>

      {/* AI CTA */}
      <button
        className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200/50 transition hover:shadow-emerald-300/50 hover:scale-[1.02] active:scale-100"
        type="button"
      >
        <Sparkles size={18} className="shrink-0" />
        <span className="truncate">Ngobrol lebih cerdas dengan Qiscus AI</span>
      </button>

      {/* Chat List */}
      <div
        className="scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent hover:scrollbar-thumb-slate-400 -mr-2 flex-1 space-y-2 overflow-y-auto pr-2"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#cbd5e1 transparent",
        }}
      >
        {chats.map((chat) => {
          const isActive = chat.id === selectedChatId;
          return (
            <button
              key={chat.id}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                isActive
                  ? "bg-emerald-50 shadow-sm ring-1 ring-emerald-200"
                  : "bg-white hover:bg-slate-50"
              }`}
              onClick={() => onChatSelect(chat.id)}
              type="button"
              aria-pressed={isActive}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center">
                {renderAvatar(chat)}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {chat.name}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5 text-[0.7rem] text-slate-400">
                    {chat.time && <span>{chat.time}</span>}
                    {chat.unread > 0 && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[0.65rem] font-bold text-white">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MessageCircleMore
                    size={14}
                    aria-hidden="true"
                    className="shrink-0"
                  />
                  <span className="truncate">{chat.preview}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;
