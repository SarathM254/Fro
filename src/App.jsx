import React from 'react';
import CashPaymentSettlement from './components/CashPaymentSettlement';
import SalesmanProfileCard from './components/SalesmanProfileCard'
import SalesmanStatementHistory from './components/SalesmanStatementHistory'

function App() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center">
      <SalesmanProfileCard></SalesmanProfileCard>
      <SalesmanStatementHistory></SalesmanStatementHistory>
    </div>
  );
}

export default App;