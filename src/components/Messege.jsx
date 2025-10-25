import { useState } from "react";
import { ExternalLink, FileText } from "lucide-react";
import MediaModal from "./MediaModal";

function Message({ comment, isSender, participants }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sender = participants.find((p) => p.id === comment.sender);
  const senderName = sender ? sender.name : comment.sender.split("@")[0];
  const senderAccent = sender?.accent || "#16a34a";
  const senderInitials =
    sender?.initials || senderName.slice(0, 2).toUpperCase();

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 KB";
    const units = ["Byte", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
  };

  const renderMessageContent = () => {
    switch (comment.type) {
      case "image":
        return (
          <div className="flex flex-col gap-2">
            <img
              src={comment.attachment.url}
              alt={comment.attachment.filename}
              className="w-full max-w-xs cursor-pointer rounded-xl object-cover"
              onClick={() => setIsModalOpen(true)}
            />
            {comment.message && <p className="text-sm">{comment.message}</p>}
          </div>
        );
      case "video":
        return (
          <div className="flex flex-col gap-2">
            <video
              controls
              preload="metadata"
              poster={comment.attachment.thumbnail}
              className="w-full max-h-72 max-w-xs rounded-xl object-cover"
            >
              <source
                src={comment.attachment.url}
                type={comment.attachment.mimetype}
              />
              Browser tidak mendukung pemutar video.
            </video>
            {comment.message && <p className="text-sm">{comment.message}</p>}
          </div>
        );
      case "pdf":
        return (
          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="group relative flex w-full max-w-[256px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              onClick={() => window.open(comment.attachment.url, "_blank")}
            >
              {/* PDF Preview/Thumbnail */}
              <div className="relative flex h-32 items-center justify-center bg-linear-to-br from-slate-100 to-slate-200">
                <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                  <FileText size={40} className="text-slate-400" />
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/10">
                  <ExternalLink
                    size={20}
                    className="text-white opacity-0 transition group-hover:opacity-100"
                  />
                </div>
              </div>

              {/* PDF Info */}
              <div className="flex items-start gap-2.5 p-2.5">
                <div
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-red-100 text-red-600"
                  aria-hidden="true"
                >
                  <FileText size={18} />
                </div>
                <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
                  <span className="w-full truncate text-left text-xs font-semibold text-slate-900">
                    {comment.attachment.filename}
                  </span>
                  <span className="text-[0.65rem] text-slate-500">
                    {formatFileSize(comment.attachment.size)} • PDF •{" "}
                    {comment.attachment.pages} hal
                  </span>
                </div>
              </div>
            </button>
            {comment.message && (
              <p className="px-1 text-sm">{comment.message}</p>
            )}
          </div>
        );
      default:
        return <p>{comment.message}</p>;
    }
  };

  const bubbleClasses = isSender
    ? "rounded-[18px] rounded-br bg-emerald-600 px-4 py-3 text-white shadow-md"
    : "rounded-[18px] border-l-4 bg-slate-100 px-4 py-3 text-slate-900 shadow-sm";

  const bubbleStyle = isSender ? undefined : { borderLeftColor: senderAccent };

  return (
    <div
      className={`flex items-end gap-3 ${isSender ? "flex-row-reverse" : ""}`}
    >
      {!isSender && (
        <div
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xs font-semibold text-white"
          style={{ backgroundColor: senderAccent }}
          aria-hidden="true"
        >
          {senderInitials}
        </div>
      )}
      <div
        className={`flex max-w-[min(70%,520px)] flex-col gap-1 ${
          isSender ? "items-end" : "items-start"
        }`}
      >
        {!isSender && (
          <span
            className="text-xs font-semibold"
            style={{ color: senderAccent }}
          >
            {senderName}
          </span>
        )}
        <div
          className={`flex flex-col gap-2 ${bubbleClasses}`}
          style={bubbleStyle}
        >
          {renderMessageContent()}
          {comment.timestamp && (
            <time
              className="ml-auto text-[0.7rem] opacity-70"
              dateTime={comment.timestamp}
            >
              {formatTime(comment.timestamp)}
            </time>
          )}
        </div>
      </div>

      <MediaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mediaUrl={comment.attachment?.url}
        mediaType={comment.type}
        filename={comment.attachment?.filename}
      />
    </div>
  );
}

export default Message;
