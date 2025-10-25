function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-slate-50 text-center text-slate-500">
      <div className="text-4xl">💬</div>
      <h3 className="text-lg font-semibold text-slate-700">
        Pilih percakapan untuk memulai
      </h3>
      <p className="max-w-xs text-sm">
        Semua riwayat chat akan muncul di sini.
      </p>
    </div>
  );
}

export default EmptyState;
