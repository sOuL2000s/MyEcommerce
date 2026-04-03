export default function Loader() { 
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-100"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-indigo-600 animate-spin"></div>
      </div>
      <span className="text-slate-400 font-medium text-sm animate-pulse uppercase tracking-[0.2em]">Crafting Quality...</span>
    </div>
  ); 
}
