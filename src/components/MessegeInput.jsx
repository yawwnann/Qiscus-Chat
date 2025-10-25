import { useState, useRef } from "react";
import { Paperclip, Send, X } from "lucide-react";

function MessageInput({
  onSendMessage,
  currentUser,
  currentUserLabel,
  disabled,
}) {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (disabled) return;
    if (message.trim() || selectedFile) {
      let newMessage;

      if (selectedFile) {
        let messageType = "file";
        if (selectedFile.type.startsWith("image/")) {
          messageType = "image";
        } else if (selectedFile.type.startsWith("video/")) {
          messageType = "video";
        } else if (selectedFile.type === "application/pdf") {
          messageType = "pdf";
        }

        const fallbackCopy = {
          image: "Mengirim gambar",
          video: "Mengirim video",
          pdf: "Mengirim dokumen PDF",
          file: "Mengirim file",
        };

        // Create mock URL for demo (in real app, you'd upload to server)
        const mockUrl = URL.createObjectURL(selectedFile);

        newMessage = {
          id: Date.now(),
          type: messageType,
          message:
            message.trim() || fallbackCopy[messageType] || fallbackCopy.file,
          sender: currentUser,
          timestamp: new Date().toISOString(),
          attachment: {
            url: mockUrl,
            filename: selectedFile.name,
            size: selectedFile.size,
            mimetype: selectedFile.type,
            thumbnail: messageType === "image" ? mockUrl : null,
            duration: messageType === "video" ? 60 : null, // Mock duration
            pages: messageType === "pdf" ? 1 : null, // Mock pages
          },
        };
      } else {
        newMessage = {
          id: Date.now(),
          type: "text",
          message: message.trim(),
          sender: currentUser,
          timestamp: new Date().toISOString(),
        };
      }

      onSendMessage(newMessage);
      setMessage("");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("Ukuran file harus kurang dari 10MB");
        return;
      }

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "video/mp4",
        "video/webm",
        "video/ogg",
        "application/pdf",
      ];

      if (!allowedTypes.includes(file.type)) {
        alert("Hanya gambar, video, dan dokumen PDF yang diizinkan");
        return;
      }

      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 bg-white px-6 py-4">
      {!disabled && currentUserLabel && (
        <div className="text-xs text-slate-500">
          Mengirim sebagai{" "}
          <strong className="text-slate-900">{currentUserLabel}</strong>
        </div>
      )}
      {selectedFile && !disabled && (
        <div className="flex items-center justify-between gap-4 rounded-xl bg-emerald-50 px-3 py-2 text-slate-600">
          <div className="flex items-center gap-2">
            <Paperclip size={16} aria-hidden="true" />
            <span className="text-sm">
              {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
            </span>
          </div>
          <button
            onClick={removeFile}
            type="button"
            className="grid h-8 w-8 place-items-center rounded-xl text-slate-500 transition hover:bg-slate-100"
            aria-label="Hapus lampiran"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {disabled && (
        <div className="pl-1 text-xs text-slate-500">
          Pilih Product A untuk mulai percakapan.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={`grid items-center gap-3 rounded-2xl px-4 py-3 ${
          disabled
            ? "border border-dashed border-slate-300 bg-white"
            : "bg-slate-100"
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*,video/*,.pdf"
          className="sr-only"
          disabled={disabled}
        />

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-slate-200 text-slate-600 transition hover:bg-emerald-100 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Lampirkan berkas"
            disabled={disabled}
          >
            <Paperclip size={18} />
          </button>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              disabled
                ? "Pengiriman pesan dinonaktifkan untuk percakapan ini"
                : "Tulis pesan..."
            }
            className="flex-1 border-none bg-transparent text-[0.95rem] text-slate-900 placeholder:text-slate-400 focus:outline-none disabled:text-slate-500"
            disabled={disabled}
          />

          <button
            type="submit"
            disabled={disabled || (!message.trim() && !selectedFile)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-600 text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
            aria-label="Kirim pesan"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default MessageInput;
