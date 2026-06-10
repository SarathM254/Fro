import React from 'react';

export default function SalesmanProfileCard({ onNavigateToBilling, onNavigateToCash }) {
  // Hardcoded for structural visual testing inside App.jsx
  const sampleSalesman = {
    name: "Motupalli Sarath",
    salesmanId: "CHV",
    email: "sarath.m@manikyapriya.com",
    broughtForwardDebt: 313000
  };

  let symb="";
  symb+=sampleSalesman.salesmanId[0];
  symb+=sampleSalesman.salesmanId[1];

  return (
    <div className="w-full max-w-md bg-slate-50">
      {/* Container Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5">
        
        {/* Header Layout */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {sampleSalesman.name}
            </h2>
            <p className="text-xs font-semibold text-indigo-600 tracking-wider uppercase mt-0.5">
              ID: {sampleSalesman.salesmanId}
            </p>
          </div>
          
          {/* Subtle User Initials Badge */}
          <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm">
            {symb}
          </div>
        </div>

        {/* Info Divider Line */}
        <hr className="my-4 border-slate-200" />

        {/* Financial metrics display box */} 

        <div className='flex flex-col space-y-3'>
          <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3.5 px-7 border border-slate-100">
            <span className="text-xl font-bold text-slate-700 tracking-wide">
              BF:
            </span>
            {/* Dynamic color warning: Green if 0, Red badge if debt exists */}
            <div className={`px-3 py-1.5 rounded-lg font-bold text-base tracking-tight ${sampleSalesman.broughtForwardDebt > 0
                ? 'bg-rose-50 text-rose-700 border border-rose-100'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
              }`}>
              ₹{sampleSalesman.broughtForwardDebt.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3.5 px-7 border border-slate-100">
            <span className="text-xl font-bold text-slate-700 tracking-wide">
              Bill Status:
            </span>
            {/* Dynamic color warning: Green if 0, Red badge if debt exists */}
            <div className="px-3 py-1.5 rounded-full font-bold text-base tracking-tight bg-slate-300 text-slate-600 border border-slate-600">
              Unverified
            </div>
          </div>
          <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3.5 px-7 border border-slate-100">
            <span className="text-xl font-bold text-slate-700 tracking-wide">
              Cash Status:
            </span>
            {/* Dynamic color warning: Green if 0, Red badge if debt exists */}
            <div className="px-3 py-1.5 rounded-full font-bold text-base tracking-tight bg-slate-300 text-slate-600 border border-slate-600">
              Unverified
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl space-x-2">
            <button type="button" onClick={onNavigateToBilling} className="flex-1 flex justify-center px-3 py-2 rounded-lg font-bold text-base tracking-tight bg-indigo-600 text-indigo-50 border border-emerald-100 transition duration-150 ease-in-out active:scale-95 active:bg-indigo-700">
              Submit Bill
            </button>
            <button type="button" onClick={onNavigateToCash} className="flex-1 flex justify-center px-3 py-2 rounded-lg font-bold text-base tracking-tight bg-emerald-600 text-emerald-50 border border-emerald-100 transition duration-150 ease-in-out active:scale-95 active:bg-emerald-700">
              Cash Pay
            </button>
            <button type="button" className={`flex-1 flex justify-center px-3 py-2 rounded-lg font-bold text-base tracking-tight transition duration-150 ease-in-out active:scale-95 ${sampleSalesman.broughtForwardDebt > 0
                ? 'bg-rose-700 text-rose-50 border border-rose-100 active:bg-rose-800'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-100 active:bg-emerald-100'
              }`}>
              Prices
            </button>
          </div>


        </div>

      </div>
    </div>
  );
}