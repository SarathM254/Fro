import React from 'react';
import CashPaymentSettlement from './components/CashPaymentSettlement';

function App() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-2">
      <CashPaymentSettlement 
        activeUser={{ _id: "65af1b_sample_id" }} 
        onSettlementSuccess={(data) => console.log("Form validated data compiled cleanly:", data)}
      />
    </div>
  );
}

export default App;