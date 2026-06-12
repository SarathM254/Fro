import React, { useState } from 'react';
import AuditBillView from './AuditBillView';
import OwnerBillEdit from './OwnerBillEdit';

export default function VerificationDesk({ onBack }) {
  const [activeTab, setActiveTab] = useState('bills');
  const [openAccordionId, setOpenAccordionId] = useState(null);
  
  // Navigation trigger for the edit view overlay state
  const [editingBillInstance, setEditingBillInstance] = useState(null);

  // --- REUSED OPERATIONAL ITC BRAND CONFIGURATIONS MAP ---
  const mockCategories = [
    { id: "cat_1", name: "Gold Flake Family", brands: [{ id: "b_1", name: "Gold Flake Kings" }, { id: "b_2", name: "Gold Flake Lights" }, { id: "b_3", name: "Gold Flake Super Star" }] },
    { id: "cat_2", name: "Classic Premium Segment", brands: [{ id: "b_6", name: "Classic Regular" }, { id: "b_7", name: "Classic Milds" }] }
  ];

  const ratesMapping = { b_1: 152.50, b_2: 152.50, b_3: 110.00, b_6: 185.00, b_7: 185.00 };

  // --- PENDING CORE LEDGER ARRAY STATES ---
  const [pendingBills, setPendingBills] = useState([
    {
      _id: "bill_701",
      salesmanName: "K. Ramesh Rao",
      items: [
        { brandId: "b_1", brandName: "Gold Flake Kings", quantity: 12.5 },
        { brandId: "b_2", brandName: "Gold Flake Lights", quantity: 8.0 },
        { brandId: "b_3", brandName: "Gold Flake Super Star", quantity: 4.5 },
        { brandId: "b_6", brandName: "Classic Regular", quantity: 15.0 },
        { brandId: "b_7", brandName: "Classic Milds", quantity: 6.25 }
      ]
    },
    {
      _id: "bill_702",
      salesmanName: "S. K. Mahendra",
      items: [
        { brandId: "b_1", brandName: "Gold Flake Kings", quantity: 5.0 },
        { brandId: "b_6", brandName: "Classic Regular", quantity: 11.0 }
      ]
    }
  ]);

  const [pendingCash, setPendingCash] = useState([
    { _id: "c1", salesmanName: "M. Shanmuk", totalHandCash: 12000, phonePeAmount: 4500, totalPayment: 16500 }
  ]);

  // --- FINANCIAL ROUND-CEILING AGGREGATOR ENGINE ---
  const calculateBillTotalValue = (itemsList) => {
    let rawSum = 0;
    itemsList.forEach(item => {
      const structuralRate = ratesMapping[item.brandId] || 0;
      rawSum += item.quantity * structuralRate;
    });
    return Math.ceil(rawSum);
  };

  const handleApproveFinalDelivery = (billId) => {
    setPendingBills(prev => prev.filter(b => b._id !== billId));
    setOpenAccordionId(null);
    console.log(`[API Post] Bill committed to DB with "Delivered" status token: ${billId}`);
  };

  /*
    CRITICAL MANAGEMENT OVERRIDE SUBSCRIPTION SAVER:
    Catches the newly modified item quantities back from OwnerBillEdit, 
    re-evaluates the ledger calculations, and updates the view row state.
  */
  const handleSaveOverriddenQuantities = (billId, updatedItemsList) => {
    setPendingBills(prevBills => 
      prevBills.map(bill => 
        bill._id === billId ? { ...bill, items: updatedItemsList } : bill
      )
    );
    setEditingBillInstance(null); // Close the override editor pane
    console.log(`[State Update] Managed override applied successfully to bill item collection: ${billId}`);
  };

  // Render the full overlay view if the owner is actively editing an entry path
  if (editingBillInstance) {
    return (
      <OwnerBillEdit 
        bill={editingBillInstance}
        mockCategories={mockCategories}
        ratesMapping={ratesMapping}
        onSaveOverride={handleSaveOverriddenQuantities}
        onCancel={() => setEditingBillInstance(null)}
      />
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col justify-start max-w-md mx-auto border-x border-slate-200/80 shadow-sm pb-8">
      
      {/* STATIC TOP HEADER LAYER */}
      <div className="sticky top-0 bg-white border-b border-slate-200/80 px-4 py-3.5 flex items-center gap-x-4 z-10">
        <button type="button" onClick={onBack} className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Verification Desk</h2>
          <p className="text-[11px] text-slate-400">Final management sign-off for ledger reconciliation</p>
        </div>
      </div>

      {/* TWIN-TAB SEGMENT CONTROL LAYER */}
      <div className="p-4 bg-white border-b border-slate-100">
        <div className="bg-slate-100 p-1 rounded-xl flex items-center justify-between w-full border border-slate-200/20">
          <button
            type="button" onClick={() => setActiveTab('bills')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold tracking-tight transition-all flex items-center justify-center gap-x-2 ${
              activeTab === 'bills' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500'
            }`}
          >
            <span>Verify Load Bills</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md font-black bg-indigo-50 text-indigo-600">{pendingBills.length}</span>
          </button>

          <button
            type="button" onClick={() => setActiveTab('cash')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold tracking-tight transition-all flex items-center justify-center gap-x-2 ${
              activeTab === 'cash' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500'
            }`}
          >
            <span>Verify Hand Cash</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md font-black bg-indigo-50 text-indigo-600">{pendingCash.length}</span>
          </button>
        </div>
      </div>

      {/* FEED LIST PIPELINE CONTENT HOUSING CONTAINER */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        
        {/* TAB WORKFLOW SECTION: LOADING BILL MANAGEMENT DRAWER */}
        {activeTab === 'bills' && (
          <>
            {pendingBills.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 p-4">
                <p className="text-sm font-bold text-slate-700">All Bills Audited</p>
              </div>
            ) : (
              pendingBills.map(bill => {
                const isOpen = openAccordionId === bill._id;
                const dynamicCeiledTotal = calculateBillTotalValue(bill.items);

                return (
                  <div key={bill._id} className={`bg-white rounded-xl overflow-hidden border transition-all duration-200 shadow-2xs ${isOpen ? 'border-slate-300' : 'border-slate-200/70'}`}>
                    
                    {/* ACCORDION SUMMARY TOGGLE COMPONENT CONTAINER */}
                    <button
                      type="button"
                      onClick={() => setOpenAccordionId(isOpen ? null : bill._id)}
                      className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-slate-50/40 transition-colors"
                    >
                      <div className="space-y-0.5">
                        <span className="text-sm font-bold text-slate-800 tracking-tight">{bill.salesmanName}</span>
                        <p className="text-xs text-slate-400">{bill.items.length} Product lines cataloged</p>
                      </div>

                      {/* Right End Aligned High Contrast Currency Weight Tracker */}
                      <div className="flex items-center gap-x-2.5 shrink-0">
                        <span className="text-sm font-black text-slate-900 tracking-tight">
                          ₹{dynamicCeiledTotal.toLocaleString('en-IN')}
                        </span>
                        <svg className={`w-3.5 h-3.5 text-slate-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </div>
                    </button>

                    {/* COLLAPSIBLE CHALLAN ROUTINE PANEL DRAWER */}
                    {isOpen && (
                      <AuditBillView 
                        items={bill.items}
                        onModifyClick={() => setEditingBillInstance(bill)}
                        onApproveClick={() => handleApproveFinalDelivery(bill._id)}
                      />
                    )}

                  </div>
                );
              })
            )}
          </>
        )}

        {/* TAB WORKFLOW SECTION: PRE-EXISTING CASH RECONCILIATION */}
        {activeTab === 'cash' && (
          pendingCash.map(cash => (
            <div key={cash._id} className="bg-white rounded-xl border border-slate-200/60 p-4 shadow-3xs space-y-3">
              <div className="flex justify-between items-start border-b border-slate-50 pb-2.5">
                <h4 className="text-sm font-bold text-slate-800 tracking-tight">{cash.salesmanName}</h4>
                <span className="text-base font-black text-slate-900 tracking-tight">₹{cash.totalPayment.toLocaleString('en-IN')}</span>
              </div>
              <div className="grid grid-cols-2 text-xs gap-y-1.5 text-slate-500">
                <span>Physical Cash:</span><span className="font-bold text-slate-800 text-right">₹{cash.totalHandCash.toLocaleString('en-IN')}</span>
                <span>Digital PhonePe:</span><span className="font-bold text-slate-800 text-right">₹{cash.phonePeAmount.toLocaleString('en-IN')}</span>
              </div>
              <button type="button" onClick={() => setPendingCash([])} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2 rounded-lg mt-2 shadow-3xs">Verify & Clear</button>
            </div>
          ))
        )}

      </div>
    </div>
  );
}