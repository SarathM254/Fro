import React, { useState } from 'react';
import AuditBillChallan from './AuditBillChallan';

export default function OperatorDashboard() {
  const [openBillId, setOpenBillId] = useState(null);
  const [temporaryCheckedBills, setTemporaryCheckedBills] = useState({});

  // Mock array containing the state-aware 'billStatus' field
  const [pendingBills, setPendingBills] = useState([
    {
      _id: "bill_101",
      salesmanName: "K. Ramesh Rao",
      billStatus: "Delivered", // "Delivered" means open field audit, "Billed" means locked
      items: [
        { brandId: "b_1", brandName: "Gold Flake Kings", quantity: 12.5 },
        { brandId: "b_2", brandName: "Gold Flake Lights", quantity: 8.0 },
        { brandId: "b_3", brandName: "Gold Flake Super Star", quantity: 4.5 },
        { brandId: "b_6", brandName: "Classic Regular", quantity: 15.0 },
        { brandId: "b_7", brandName: "Classic Milds", quantity: 6.25 },
        { brandId: "b_11", brandName: "Capstan Filter", quantity: 20.0 },
        { brandId: "b_16", brandName: "Flake Excel", quantity: 35.0 },
        { brandId: "b_21", brandName: "Benson & Hedges Lights", quantity: 2.5 }
      ]
    },
    {
      _id: "bill_102",
      salesmanName: "S. K. Mahendra",
      billStatus: "Delivered",
      items: [
        { brandId: "b_1", brandName: "Gold Flake Kings", quantity: 5.0 },
        { brandId: "b_4", brandName: "Gold Flake Honeydew", quantity: 14.5 },
        { brandId: "b_8", brandName: "Classic Ultra Milds", quantity: 2.0 },
        { brandId: "b_12", brandName: "Capstan Standard", quantity: 11.0 },
        { brandId: "b_14", brandName: "Scissors Filter", quantity: 50.0 }
      ]
    }
  ]);

  const toggleAccordion = (id) => {
    setOpenBillId(openBillId === id ? null : id);
  };

  const handleChallanClearanceState = (billId, isFullyChecked) => {
    setTemporaryCheckedBills(prev => ({ ...prev, [billId]: isFullyChecked }));
  };

  /*
    CRITICAL FEATURE REFACTOR: PRODUCTION-GRADE DISPATCH COMMIT LOCK
    Simulates a backend database transaction update. It changes the local document's
    billStatus to "Billed", triggering permanent view constraints on borders and inputs.
  */
  const commitDispatchLock = (billId) => {
    setPendingBills(prevBills => 
      prevBills.map(bill => 
        bill._id === billId ? { ...bill, billStatus: "Billed" } : bill
      )
    );
    console.log(`Backend status synced successfully to "Billed" for token reference: ${billId}`);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col justify-start max-w-md mx-auto border-x border-slate-200/80 shadow-sm">
      
      <div className="sticky top-0 bg-[rgb(63,42,199)] border-b border-slate-200/80 px-4 py-4 z-10 shadow-xs">
        <h2 className="text-xl font-bold text-[rgb(255,255,255)] tracking-wider">Operator Desk</h2>
      </div>

      <div className="flex-1 p-4 space-y-3.5 overflow-y-auto">
        {pendingBills.map((bill) => {
          const isOpen = openBillId === bill._id;
          const isAlreadyBilled = bill.billStatus === "Billed";
          const isTemporaryChecked = !!temporaryCheckedBills[bill._id];

          // Determine structural border accents based on permanent DB status or live click evaluations
          const isLockedOrComplete = isAlreadyBilled || isTemporaryChecked;

          return (
            <div 
              key={bill._id}
              className={`bg-white rounded-xl overflow-hidden transition-all duration-200 border shadow-2xs ${
                isAlreadyBilled
                  ? 'border-emerald-600 bg-emerald-50/5 ring-1 ring-emerald-600/30 font-medium'
                  : isTemporaryChecked 
                    ? 'border-emerald-400 ring-1 ring-emerald-400/20 shadow-sm' 
                    : isOpen ? 'border-slate-300 shadow-sm' : 'border-slate-200/70'
              }`}
            >
              {/* Accordion Trigger Header */}
              <button
                type="button"
                onClick={() => toggleAccordion(bill._id)}
                className={`w-full px-4 py-4 flex items-center justify-between text-left transition-colors duration-150 ${
                  isAlreadyBilled ? 'bg-emerald-50/10' : isTemporaryChecked ? 'bg-emerald-50/5' : 'bg-white hover:bg-slate-50/40'
                }`}
              >
                <div className="space-y-0.5">
                  <span className="text-lg font-bold text-slate-800 tracking-tight flex items-center gap-x-2">
                    {bill.salesmanName}
                    
                    {/* Status Badges */}
                    {isAlreadyBilled ? (
                      <span className="bg-emerald-700 text-white text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded shadow-2xs">
                        ✓ DISPATCHED & BILLED
                      </span>
                    ) : isTemporaryChecked ? (
                      <span className="bg-amber-500 text-white text-[9px] font-black tracking-wider uppercase px-1.5 py-0.5 rounded-sm">
                        AUDITED
                      </span>
                    ) : null}
                  </span>
                </div>

                <svg 
                  className={`w-4 h-4 text-slate-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                  fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {/* Dynamic Drawer Injection */}
              {isOpen && (
                <AuditBillChallan 
                  items={bill.items}
                  isAlreadyBilled={isAlreadyBilled}
                  onChallanCleared={(allChecked) => handleChallanClearanceState(bill._id, allChecked)}
                />
              )}

              {/* Bottom Sticky Action Lock */}
              {isOpen && isLockedOrComplete && (
                <div className={`p-3 flex justify-end border-t ${isAlreadyBilled ? 'bg-emerald-50/10 border-emerald-100/50' : 'bg-emerald-50/40 border-emerald-100'}`}>
                  {isAlreadyBilled ? (
                    <span className="text-xs font-bold text-emerald-700 italic flex items-center gap-1">
                      Manifest safely submitted to Owner queue ledger.
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => commitDispatchLock(bill._id)}
                      className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs py-2 px-3.5 rounded-lg tracking-wide shadow-xs transition-all duration-150 flex items-center gap-x-1"
                    >
                      <span>Confirm</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002-2.25v-6.75a2.25 2.25 0 00-2-2.25H6.75a2.25 2.25 0 00-2 2.25v6.75a2.25 2.25 0 002 2.25z" />
                      </svg>
                    </button>
                  )}
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}