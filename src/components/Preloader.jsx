import { useState, useEffect } from "react";
import qiscusLogo from "../assets/qiscus.webp";

const Preloader = () => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Mulai animasi exit setelah 1.3 detik (sebelum komponen unmount)
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
      style={{ backgroundColor: "#01416c" }}
    >
      <div
        className={`flex flex-col items-center gap-6 transition-all duration-700 ${
          isExiting ? "scale-110 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {/* Logo dengan animasi scale in dan pulse */}
        <div className="animate-pulse">
          <img
            src={qiscusLogo}
            alt="Qiscus Logo"
            className="h-auto w-64 object-contain animate-[scale-in_0.5s_ease-out]"
            style={{
              animation:
                "scale-in 0.5s ease-out, pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          />
        </div>

        <h1 className="text-3xl font-semibold text-white animate-[fade-up_0.6s_ease-out_0.3s_both]">
          Qiscus Chat
        </h1>

        <div className="flex gap-2 animate-[fade-in_0.6s_ease-out_0.5s_both]">
          <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-emerald-400 [animation-delay:-0.3s]"></div>
          <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-emerald-400 [animation-delay:-0.15s]"></div>
          <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-emerald-400"></div>
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes fade-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
