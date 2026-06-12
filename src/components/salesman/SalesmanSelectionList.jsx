import React from 'react';

export default function SalesmanSelectionList({ onSelectSalesman }) {
  // Hardcoded roster of salesmen matching the staff structure
  const salesmanRoster = [
    { _id: "st_101", name: "K. Ramesh Rao", code: "M-SR-01", bf: 313000 },
    { _id: "st_103", name: "S. K. Mahendra", code: "M-SR-02", bf: 0 },
    { _id: "st_104", name: "Rajesh Kumar", code: "M-SR-03", bf: 15400 }
  ];

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="px-2">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Select Field Agent</h2>
        <p className="text-xs text-slate-500 font-medium mt-1">Choose an active salesman profile to continue</p>
      </div>
      
      <div className="space-y-3">
        {salesmanRoster.map(salesman => (
          <div 
            key={salesman._id}
            onClick={() => onSelectSalesman(salesman)}
            className="bg-white rounded-2xl border border-slate-200/70 p-4 shadow-2xs flex items-center justify-between gap-x-4 cursor-pointer transition-all hover:border-indigo-400 hover:shadow-sm active:bg-slate-50 active:scale-[0.99]"
          >
            <div className="flex items-center gap-x-4">
              <div className="h-11 w-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center font-black text-indigo-600 text-sm shadow-xs">
                {salesman.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-slate-800 tracking-tight">{salesman.name}</h4>
                <div className="flex items-center gap-x-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded tracking-widest">{salesman.code}</span>
                  {salesman.bf > 0 && (
                    <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1 animate-pulse"></span>
                      Debt
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 group-hover:bg-indigo-50">
              <svg className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
