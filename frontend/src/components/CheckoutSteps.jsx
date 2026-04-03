import { Link } from 'react-router-dom';

export default function CheckoutSteps({ step1, step2, step3, step4 }) {
  const steps = [
    { name: 'Sign In', to: '/login', active: step1 },
    { name: 'Shipping', to: '/shipping', active: step2 },
    { name: 'Payment', to: '/payment', active: step3 },
    { name: 'Place Order', to: '/placeorder', active: step4 },
  ];

  return (
    <nav className="flex items-center justify-center gap-2 md:gap-4 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-[2rem] border border-slate-100 shadow-sm w-fit mx-auto mb-8 overflow-x-auto">
      {steps.map((step, index) => (
        <div key={step.name} className="flex items-center gap-2 md:gap-4 shrink-0">
          {index !== 0 && (
            <div className={`w-4 md:w-8 h-[2px] rounded-full ${step.active ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
          )}
          {step.active ? (
            <Link 
              to={step.to} 
              className="text-[10px] md:text-xs font-black uppercase tracking-widest text-indigo-600 flex items-center gap-2"
            >
              <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[8px] md:text-[10px]">
                {index + 1}
              </span>
              <span className="hidden sm:inline">{step.name}</span>
            </Link>
          ) : (
            <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2 cursor-not-allowed">
              <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-slate-100 text-slate-300 flex items-center justify-center text-[8px] md:text-[10px]">
                {index + 1}
              </span>
              <span className="hidden sm:inline">{step.name}</span>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
