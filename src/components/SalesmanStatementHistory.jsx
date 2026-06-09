import React from 'react';

export default function SalesmanStatementHistory() {
  // Temporary structural mockup matching our new LedgerTransaction database schema
  const sampleTransactions = [
    {
      _id: "tx_1",
      type: "cash_payment_clearance",
      amount: 5000,
      description: "Cash Paid",
      previousBF: 8130,
      newBF: 3130,
      date: "2026-06-08"
    },
    {
      _id: "tx_2",
      type: "bill_delivery",
      amount: 4500,
      description: "Bill Value",
      previousBF: 3630,
      newBF: 8130,
      date: "2026-06-07"
    },
    {
      _id: "tx_3",
      type: "manual_subtract",
      amount: 500,
      description: "Damage",
      previousBF: 4130,
      newBF: 3630,
      date: "2026-06-06"
    },
    {
      _id: "tx_4",
      type: "manual_add",
      amount: 4130,
      description: "Opening business ledger balance configuration",
      previousBF: 0,
      newBF: 4130,
      date: "2026-06-05"
    }
  ];

  // Helper mapping function to render minimal status metrics cleanly
  const getTransactionStyles = (type) => {
    switch (type) {
      case 'cash_payment_clearance':
      case 'manual_subtract':
        return {
          badgeText: "DEBT CLEARED",
          badgeClass: "bg-emerald-50 text-emerald-700 border border-emerald-100",
          amountPrefix: "-",
          amountClass: "text-emerald-600 font-bold"
        };
      case 'bill_delivery':
      case 'manual_add':
      default:
        return {
          badgeText: "DEBT ADDED",
          badgeClass: "bg-rose-50 text-rose-700 border border-rose-100",
          amountPrefix: "+",
          amountClass: "text-rose-600 font-bold"
        };
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 pb-8 bg-slate-50">
      {/* Wrapper Layout Panel */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5">
        
        {/* Component Header Block */}
        <div className="flex items-center justify-between mb-4 p-3.5">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Transactions
            </h3>
            <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
                All Logs
            </span>
        </div>

        {/* Transaction History Row Map Stack */}
        <div className="space-y-3.5">
          {sampleTransactions.map((tx) => {
            const styles = getTransactionStyles(tx.type);

            return (
              <div 
                key={tx._id} 
                className="group border border-slate-100 rounded-xl p-3.5 transition-colors duration-150 hover:bg-slate-50/60"
              >
                {/* Meta Row Info */}
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-400 tracking-wide">
                    {tx.date}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase ${styles.badgeClass}`}>
                    {styles.badgeText}
                  </span>
                </div>

                {/* Primary Narrative Metric Line */}
                <div className="flex items-start justify-between gap-4">
                  <p className="text font-medium text-slate-700 leading-tight">
                    {tx.description}
                  </p>
                  <span className={`text-base tracking-tight shrink-0 ${styles.amountClass}`}>
                    {styles.amountPrefix}₹{tx.amount.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Secondary Math Ledger Tracking */}
                <div className="mt-2 pt-2 border-t border-dashed border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Previous BF: ₹{tx.previousBF.toLocaleString('en-IN')}</span>
                  <span className="font-medium text-slate-500">
                    Closing BF: <span className="font-bold text-slate-700">₹{tx.newBF.toLocaleString('en-IN')}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}