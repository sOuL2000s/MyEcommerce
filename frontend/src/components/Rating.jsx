const Rating = ({ value, text }) => {
  return (
    <div className='flex items-center gap-1'>
      <span className="text-yellow-400">
        {value >= 1 ? '★' : value >= 0.5 ? '½' : '☆'}
        {value >= 2 ? '★' : value >= 1.5 ? '½' : '☆'}
        {value >= 3 ? '★' : value >= 2.5 ? '½' : '☆'}
        {value >= 4 ? '★' : value >= 3.5 ? '½' : '☆'}
        {value >= 5 ? '★' : value >= 4.5 ? '½' : '☆'}
      </span>
      <span className='ml-2 text-sm text-gray-600'>{text && text}</span>
    </div>
  );
};
export default Rating;
