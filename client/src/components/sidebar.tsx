export default function Sidebar() {
  return (
    <div className="max-xl:hidden sticky top-0">
      <div className="max-w-xs bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow">
        <h3 className="text-slate-800  font-semibold">Sponsored</h3>
        <img className="w-75 h-50 rounded-md" src="/assets/sponsored_img.png" />
        <p className="text-slate-600">Email marketing</p>
        <p className="text-slate-400">
          Supercharge your marketing with a powerful, easy-to-use platform built
          for results.
        </p>
      </div>
      <div className="bg-white max-w-xs mt-4 p-4 min-h-20 rounded-md shadow text-xs text-slate-800">
        <h3 className="font-semibold text-slate-8 mb-4">Recent Messages</h3>
        <div className="flex flex-col max-h-56 overflow-y-scroll no-scrollbar" />
      </div>
    </div>
  );
}
