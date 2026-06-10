// import React, { useState } from 'react';
// import CashPaymentSettlement from './components/CashPaymentSettlement';
// import SalesmanProfileCard from './components/SalesmanProfileCard';
// import SalesmanStatementHistory from './components/SalesmanStatementHistory';
// import SalesmanBillingScreen from './components/SalesmanBillingScreen';

// function App() {
//   const [currentView, setCurrentView] = useState('home');

//   const navigateHome = () => setCurrentView('home');
//   const navigateBilling = () => setCurrentView('billing');
//   const navigateCash = () => setCurrentView('cash');

//   return (
//     <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center">
//       {currentView === 'home' && (
//         <>
//           <SalesmanProfileCard 
//             onNavigateToBilling={navigateBilling} 
//             onNavigateToCash={navigateCash} 
//           />
//           <SalesmanStatementHistory />
//         </>
//       )}

//       {currentView === 'billing' && (
//         <SalesmanBillingScreen onBack={navigateHome} />
//       )}

//       {currentView === 'cash' && (
//         <CashPaymentSettlement onBack={navigateHome} />
//       )}
//     </div>
//   );
// }

// export default App;


import React from 'react';
import OperatorDashboard from './components/OperatorDashboard';

function App() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <OperatorDashboard />
    </div>
  );
}

export default App;