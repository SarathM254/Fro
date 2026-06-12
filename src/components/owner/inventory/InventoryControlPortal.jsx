import React, { useState } from 'react';
import InventoryModifyScreen from './InventoryModifyScreen';

export default function InventoryControlPortal({ onBack }) {
  const [isEditing, setIsEditing] = useState(false);

  // Expanded mock data to ensure we have > 6 items for the separation line demo
  const mockCategories = [
    { 
      id: "cat_1", 
      name: "Gold Flake Family", 
      brands: [
        { id: "b_1", name: "Gold Flake Kings" }, 
        { id: "b_2", name: "Gold Flake Lights" }, 
        { id: "b_3", name: "Gold Flake Super Star" },
        { id: "b_4", name: "Gold Flake Neo" }
      ] 
    },
    { 
      id: "cat_2", 
      name: "Classic Premium Segment", 
      brands: [
        { id: "b_6", name: "Classic Regular" }, 
        { id: "b_7", name: "Classic Milds" },
        { id: "b_8", name: "Classic Ice Burst" }
      ] 
    }
  ];

  // Flat state tracking all inventory stock quantities
  const [inventoryState, setInventoryState] = useState(() => 
    mockCategories.flatMap(cat => cat.brands.map((b, index) => ({ 
      brandId: b.id, 
      brandName: b.name, 
      quantity: index === 0 ? 120.5 : index === 1 ? 45.0 : 0 // Provide some initial stock variations
    })))
  );

  const handleSaveInventory = (updatedInventory) => {
    // Merge the updated array back into the main view
    setInventoryState(updatedInventory);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <InventoryModifyScreen 
        mockCategories={mockCategories}
        inventoryState={inventoryState}
        onSave={handleSaveInventory}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col justify-start max-w-md mx-auto border-x border-slate-200/80 shadow-sm relative">
      
      {/* Sticky Dashboard Section Header */}
      <div className="sticky top-0 bg-white border-b border-slate-200/80 px-4 py-3.5 flex items-center gap-x-4 z-10 shadow-2xs">
        <button type="button" onClick={onBack} className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Inventory Control</h2>
          <p className="text-[11px] text-slate-400">Monitor warehouse stock levels & factory shipments</p>
        </div>
      </div>

      {/* Main Stream Core Feed: The List of Brands */}
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="bg-white rounded-xl border border-slate-200/60 p-5 shadow-xs">
          
          {/* Structural Metadata Header Block */}
          <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Brand Name
            </span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Stock Quantity
            </span>
          </div>

          {/* Itemized Table Stack */}
          <div className="space-y-4">
            {mockCategories.map((category) => (
              <div key={category.id} className="mb-2 last:mb-0">
                <h3 className="text-[11px] font-bold text-indigo-500 uppercase tracking-widest mb-2 border-b border-slate-100 pb-1.5">
                  {category.name}
                </h3>
                <div className="space-y-1">
                  {category.brands.map((brand) => {
                    const item = inventoryState.find(i => i.brandId === brand.id);
                    if (!item) return null;
                    
                    return (
                      <div key={brand.id} className="flex justify-between items-center py-0.5">
                        <span className="text-sm font-medium text-slate-800 tracking-tight">
                          {item.brandName}
                        </span>
                        <div className="flex items-baseline gap-x-0.5 text-right font-bold text-slate-900">
                          <span className="text-base tracking-tight">{item.quantity}</span>
                          <span className="text-[10px] font-semibold text-slate-400 uppercase ml-0.5 select-none">
                            M
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Persistent Bottom Action Buttons Area */}
      <div className="sticky bottom-0 bg-white border-t border-slate-200/80 p-4 shadow-sm z-10 flex gap-3">
        
        {/* Left Button: Upload Invoice */}
        <button
          type="button"
          onClick={() => console.log('Upload Invoice trigger clicked')}
          className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl py-2 flex flex-col items-center justify-center transition-colors shadow-2xs group"
        >
          <div className="flex items-center gap-x-1.5 text-sm font-bold">
            <svg className="w-4 h-4 text-slate-500 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <span>Invoice</span>
          </div>
          <span className="text-[9px] font-semibold text-slate-400 tracking-wider mt-0.5">(2.5 flash)</span>
        </button>

        {/* Right Button: Modify Inventory */}
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-2 flex items-center justify-center gap-x-2 transition-colors shadow-xs"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
          <span className="text-sm font-bold">Modify</span>
        </button>

      </div>

    </div>
  );
}
