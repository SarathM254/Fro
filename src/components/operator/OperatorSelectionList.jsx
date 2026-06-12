import React from 'react';

export default function OperatorSelectionList({ onSelectOperator }) {
  // Hardcoded roster of operators matching the staff structure
  const operatorRoster = [
    { _id: "st_102", name: "Anitha Reddy", code: "M-OP-04", role: "Operator" },
    { _id: "st_105", name: "Vijay Kumar", code: "M-OP-05", role: "Operator" }
  ];

  return (
    <div className="w-full max-w-md mx-auto space-y-4 pt-4">
      <div className="px-2">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Select Operator Profile</h2>
        <p className="text-xs text-slate-500 font-medium mt-1">Choose an active operator profile to continue</p>
      </div>
      
      <div className="space-y-3">
        {operatorRoster.map(operator => (
          <div 
            key={operator._id}
            onClick={() => onSelectOperator(operator)}
            className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs flex items-center justify-between gap-x-4 cursor-pointer transition-all hover:border-[rgb(63,42,199)] hover:shadow-sm active:bg-slate-50 active:scale-[0.99]"
          >
            <div className="flex items-center gap-x-4">
              <div className="h-11 w-11 rounded-xl bg-[rgb(63,42,199)]/10 border border-[rgb(63,42,199)]/20 flex items-center justify-center font-black text-[rgb(63,42,199)] text-sm shadow-xs">
                {operator.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-slate-800 tracking-tight">{operator.name}</h4>
                <p className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded tracking-widest inline-block">{operator.code}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 group-hover:bg-[rgb(63,42,199)]/10">
              <svg className="w-4 h-4 text-slate-400 group-hover:text-[rgb(63,42,199)] transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
