const Rating = ({ value, text }) => {
  return (
    <div className='flex items-center gap-2'>
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((index) => (
          <span key={index} className="text-xl">
            {value >= index ? '★' : value >= index - 0.5 ? (
              <span className="relative">
                <span className="absolute overflow-hidden w-1/2">★</span>
                <span className="text-slate-200">★</span>
              </span>
            ) : <span className="text-slate-200">★</span>}
          </span>
        ))}
      </div>
      <span className='text-xs font-black text-slate-400 uppercase tracking-widest'>{text && text}</span>
    </div>
  );
};
export default Rating;
