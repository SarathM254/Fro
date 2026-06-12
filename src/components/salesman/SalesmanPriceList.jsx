import React from 'react';

export default function SalesmanPriceList({ onBack }) {
  const mockCategories = [
    { 
      id: "cat_1", 
      name: "Gold Flake Family", 
      brands: [
        { id: "b_1", name: "Gold Flake Kings", retail: 22202 }, 
        { id: "b_2", name: "Gold Flake Lights", retail: 18500 }, 
        { id: "b_3", name: "Gold Flake Super Star", retail: 12400 },
        { id: "b_4", name: "Gold Flake Neo", retail: 9000 }
      ] 
    },
    { 
      id: "cat_2", 
      name: "Classic Premium Segment", 
      brands: [
        { id: "b_6", name: "Classic Regular", retail: 34500 }, 
        { id: "b_7", name: "Classic Milds", retail: 34500 },
        { id: "b_8", name: "Classic Ice Burst", retail: 35000 }
      ] 
    }
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col justify-start max-w-md mx-auto border-x border-slate-200/80 shadow-sm relative pb-10">
      
      {/* Sticky Dashboard Section Header */}
      <div className="sticky top-0 bg-white border-b border-slate-200/80 px-4 py-3.5 flex items-center gap-x-4 z-10 shadow-2xs">
        <button type="button" onClick={onBack} className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Retail Prices</h2>
          <p className="text-[11px] text-slate-400">Current market pricing for all brands</p>
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <div className="bg-white rounded-xl border border-slate-200/60 p-5 shadow-xs">
          
          {/* Structural Metadata Header Block */}
          <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Brand Name
            </span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Retail Price
            </span>
          </div>

          <div className="space-y-5">
            {mockCategories.map((category) => (
              <div key={category.id}>
                <h3 className="text-[11px] font-bold text-indigo-500 uppercase tracking-widest mb-2 border-b border-slate-100 pb-1.5">
                  {category.name}
                </h3>
                <div className="space-y-2">
                  {category.brands.map((brand) => (
                    <div key={brand.id} className="flex justify-between items-center py-0.5">
                      <span className="text-sm font-medium text-slate-800 tracking-tight flex items-center">
                        {brand.name}
                        <span className="text-[9px] font-bold text-slate-400 ml-1">(R)</span>
                      </span>
                      <div className="flex items-baseline text-right">
                        <span className="text-[13px] font-bold text-slate-900 tracking-tight">
                          ₹{brand.retail.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400 ml-1 whitespace-nowrap">
                          per M
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
