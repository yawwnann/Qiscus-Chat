import { X } from "lucide-react";

function MediaModal({ isOpen, onClose, mediaUrl, mediaType, filename }) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-900/80 p-6"
      onClick={handleBackdropClick}
      role="dialog"
    >
      <div className="relative flex w-full max-w-3xl flex-col items-center gap-3">
        <button
          onClick={onClose}
          type="button"
          className="absolute -right-3 -top-3 grid h-8 w-8 place-items-center rounded-full border-none bg-slate-900 text-white"
          aria-label="Tutup pratinjau"
        >
          <X size={18} />
        </button>

        {mediaType === "image" && (
          <img
            src={mediaUrl}
            alt={filename}
            className="max-h-[70vh] w-full rounded-2xl bg-black object-contain"
          />
        )}

        {mediaType === "video" && (
          <video
            controls
            autoPlay
            className="max-h-[70vh] w-full rounded-2xl bg-black object-contain"
          >
            <source src={mediaUrl} type="video/mp4" />
          </video>
        )}

        <div className="rounded-full bg-slate-900/45 px-3 py-2 text-sm text-white">
          {filename}
        </div>
      </div>
    </div>
  );
}

export default MediaModal;
