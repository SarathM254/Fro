import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function SalesmanBillingScreen() {
  // Hardcoded real operational ITC brand families for dynamic structural layout tests
  const mockCategories = [
    {
      id: "cat_1",
      name: "Gold Flake Family",
      brands: [
        { id: "b_1", name: "Gold Flake Kings" },
        { id: "b_2", name: "Gold Flake Lights" },
        { id: "b_3", name: "Gold Flake Super Star" },
        { id: "b_4", name: "Gold Flake Honeydew" },
        { id: "b_5", name: "Gold Flake Indie Mint" }
      ]
    },
    {
      id: "cat_2",
      name: "Classic Premium Segment",
      brands: [
        { id: "b_6", name: "Classic Regular" },
        { id: "b_7", name: "Classic Milds" },
        { id: "b_8", name: "Classic Ultra Milds" },
        { id: "b_9", name: "Classic Connect" },
        { id: "b_10", name: "Classic Ice Burst" }
      ]
    },
    {
      id: "cat_3",
      name: "Capstan & Bristol Value Lines",
      brands: [
        { id: "b_11", name: "Capstan Filter" },
        { id: "b_12", name: "Capstan Standard" },
        { id: "b_13", name: "Bristol Filter" },
        { id: "b_14", name: "Scissors Filter" },
        { id: "b_15", name: "Wave Cool Mint" }
      ]
    },
    {
      id: "cat_4",
      name: "Flake Core Distribution",
      brands: [
        { id: "b_16", name: "Flake Excel" },
        { id: "b_17", name: "Flake Liberty" },
        { id: "b_18", name: "Flake Premium" },
        { id: "b_19", name: "Flake Special" },
        { id: "b_20", name: "Flake Blue Mint" }
      ]
    },
    {
      id: "cat_5",
      name: "International & Specialized Imports",
      brands: [
        { id: "b_21", name: "Benson & Hedges Lights" },
        { id: "b_22", name: "Benson & Hedges Special Filter" },
        { id: "b_23", name: "State Express 555 Kings" },
        { id: "b_24", name: "Silk Cut Blue" },
        { id: "b_25", name: "Dunhill Switch" }
      ]
    }
  ];

  // State array tracking which active category index values are currently open
  const [expandedCategories, setExpandedCategories] = useState({});

  // Unified configuration map tracking custom baseline structural weights for each brand item row
  // In your production app, this snapshot data list will be extracted dynamically from your `/api/brands` collection
  const ratesMapping = {
    b_1: 152.50, b_2: 152.50, b_3: 110.00, b_4: 112.00, b_5: 120.00,
    b_6: 185.00, b_7: 185.00, b_8: 190.00, b_9: 165.00, b_10: 175.00,
    b_11: 85.00,  b_12: 80.00,  b_13: 75.00,  b_14: 70.00,  b_15: 72.50,
    b_16: 95.00,  b_17: 92.00,  b_18: 95.00,  b_19: 90.00,  b_20: 98.00,
    b_21: 220.00, b_22: 230.00, b_23: 250.00, b_24: 210.00, b_25: 260.00
  };

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: mockCategories.reduce((acc, cat) => {
      cat.brands.forEach(b => { acc[b.id] = ""; });
      return acc;
    }, {})
  });

  // Watch input states reactively to update the running dashboard metrics block automatically
  const formValues = watch();

  const toggleCategory = (id) => {
    setExpandedCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  /*
    CRITICAL FEATURE IMPLEMENTATION: LIVE CONTEXT-AWARE INTEGER ZERO SANITIZATION
    Ensures that when field keys are selected, an entry like ".5" is immediately padded into "0.5".
    It forces strict 2 decimal limits via numerical regex patterns and prevents characters from breaking numbers.
  */
  const handleBlurSanitization = (event, fieldId) => {
    let rawValue = event.target.value.trim();
    if (!rawValue) return;

    // Automatically append leading zero if salesman inputs an isolated decimal block point like ".5"
    if (rawValue.startsWith('.')) {
      rawValue = '0' + rawValue;
    }

    const numericValue = parseFloat(rawValue);
    if (!isNaN(numericValue)) {
      // Strips entries down to enforce a clean 2 decimal place baseline maximum boundary
      const sanitizedFixed = parseFloat(numericValue.toFixed(2));
      // Re-injects the safe, formatted string safely back into the active react-hook-form node handler
      setValue(fieldId, sanitizedFixed.toString());
    }
  };

  /*
    CRITICAL FEATURE IMPLEMENTATION: REAL-TIME LEDGER VALUE AGGREGATION & WHOLE NUMBER CEILING LOCK
    Runs mathematical accumulation across every field array. If an incremental currency fraction is evaluated
    (e.g., 1230.25), the total is cleanly forced upwards to the next absolute whole number ceiling integer (1231).
  */
  const calculateTotalBillValue = () => {
    let rawSum = 0;
    Object.keys(formValues).forEach(brandId => {
      const quantity = parseFloat(formValues[brandId]);
      if (!isNaN(quantity) && quantity > 0) {
        const structuralRate = ratesMapping[brandId] || 0;
        rawSum += quantity * structuralRate;
      }
    });
    // Math.ceil forces any decimal tracking overage straight to the nearest whole integer
    return Math.ceil(rawSum);
  };

  const onPreviewSubmit = (data) => {
    const activeSubmissions = Object.keys(data)
      .filter(key => parseFloat(data[key]) > 0)
      .map(key => ({
        brandId: key,
        quantity: parseFloat(data[key]),
        rate: ratesMapping[key]
      }));

    console.log("📝 Verified Entry Map Configuration for Summary Review:", activeSubmissions, "Ceiled Gross Balance:", calculateTotalBillValue());
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col justify-between max-w-md mx-auto border-x border-slate-200/80 shadow-sm">
      
      {/* Fixed Sticky Header Interface Navigation Bar */}
      <div className="sticky top-0 bg-white border-b border-slate-200/80 px-4 py-3.5 flex items-center gap-x-4 z-10 shadow-xs">
        <button 
          type="button"
          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors duration-150 shrink-0"
          aria-label="Navigate Back"
        >
          {/* SVG representation of crisp, minimal back navigation tracking arrow */}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Daily Run Submission</h2>
          <p className="text-[11px] text-slate-400">Select categories and enter quantities in Thousands (M)</p>
        </div>
      </div>

      {/* Main Container Core Form Loop Area */}
      <form onSubmit={handleSubmit(onPreviewSubmit)} className="flex-1 p-4 space-y-3 overflow-y-auto">
        {mockCategories.map((category) => {
          const isOpen = !!expandedCategories[category.id];
          
          return (
            <div 
              key={category.id} 
              className="bg-white rounded-xl border border-slate-200/60 overflow-hidden shadow-xs transition-all duration-200"
            >
              {/* Category Striver-Style Toggled Title Selector Bar */}
              <button
                type="button"
                onClick={() => toggleCategory(category.id)}
                className="w-full px-4 py-3.5 flex items-center justify-between bg-white hover:bg-slate-50/50 text-left transition-colors duration-150"
              >
                <span className="text-sm font-bold text-slate-800 tracking-tight">
                  {category.name}
                </span>
                
                {/* Clean structural Chevron Indicator to convey toggle state layout attributes */}
                <svg 
                  className={`w-4 h-4 text-slate-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                  fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {/* Collapsible Content Drawer Container */}
              {isOpen && (
                <div className="border-t border-slate-100 bg-slate-50/40 divide-y divide-slate-100">
                  {category.brands.map((brand) => (
                    <div 
                      key={brand.id} 
                      className="px-4 py-3 flex items-center justify-between gap-x-4 bg-white"
                    >
                      {/* Left Column Brand Product Descriptor */}
                      <div className="space-y-0.5">
                        <span className="text-sm font-medium text-slate-800 leading-snug">
                          {brand.name}
                        </span>
                      </div>

                      {/* Right Column Mathematical Quantity Action Box */}
                      <div className="flex items-center gap-x-2 shrink-0">
                        <div className="relative flex items-center max-w-[100px]">
                          <input
                            type="number"
                            step="any"
                            placeholder="0"
                            className="w-full text-right font-semibold text-slate-900 bg-slate-50/80 border border-slate-200 rounded-lg py-1.5 pr-7 pl-2.5 text-sm focus:outline-hidden focus:border-indigo-500 focus:bg-white transition-all duration-150"
                            {...register(brand.id)}
                            onBlur={(e) => handleBlurSanitization(e, brand.id)}
                          />
                          <span className="absolute right-2.5 text-[11px] font-bold text-slate-400 select-none pointer-events-none">
                            M
                          </span>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </form>

      {/* Fixed Persistent Bottom Total Metrics and Preview Control Action Block */}
      <div className="sticky bottom-0 bg-white border-t border-slate-200/80 p-4 shadow-sm z-10">
        <div className="flex items-center justify-between mb-3.5 px-3.5">
            <span className="text-xl font-bold text-slate-900 uppercase">
              Bill Value:
            </span>
          <span className="text-xl font-black text-slate-900 tracking-tight">
            ₹{calculateTotalBillValue().toLocaleString('en-IN')}
          </span>
        </div>

        {/* Change Action Form Trigger to Preview Mode Per Structural Request */}
        <button
          type="button"
          onClick={handleSubmit(onPreviewSubmit)}
          className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold py-3 px-4 rounded-xl text-sm tracking-wide transition-all duration-150 shadow-xs flex items-center justify-center gap-x-1.5"
        >
          <span>Review</span>
        </button>
      </div>

    </div>
  );
}