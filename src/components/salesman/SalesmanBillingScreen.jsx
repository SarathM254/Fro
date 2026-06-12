import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import BillingEntryForm from './BillingEntryForm';
import BillingPreviewSheet from './BillingPreviewSheet';

export default function SalesmanBillingScreen({ onBack }) {
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

    const ratesMapping = {
        b_1: 152.50, b_2: 152.50, b_3: 110.00, b_4: 112.00, b_5: 120.00,
        b_6: 185.00, b_7: 185.00, b_8: 190.00, b_9: 165.00, b_10: 175.00,
        b_11: 85.00, b_12: 80.00, b_13: 75.00, b_14: 70.00, b_15: 72.50,
        b_16: 95.00, b_17: 92.00, b_18: 95.00, b_19: 90.00, b_20: 98.00,
        b_21: 220.00, b_22: 230.00, b_23: 250.00, b_24: 210.00, b_25: 260.00
    };

    const { register, handleSubmit, watch, setValue } = useForm({
      defaultValues: mockCategories.reduce((acc, cat) => {
        cat.brands.forEach(b => { acc[b.id] = ""; });
        return acc;
      }, {})
    });

    // Constantly monitors input metrics inside the parent context memory safely
    const runningFormValues = watch();

    // Step workflow management: 1 = Form Input Screen, 2 = Summary Review Screen
    const [currentStep, setCurrentStep] = useState(1);
    const [finalPreviewPayload, setFinalPreviewPayload] = useState([]);

    const [expandedCategories, setExpandedCategories] = useState({});
    const toggleCategory = (id) => {
      setExpandedCategories(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleBlurSanitization = (event, fieldId) => {
      let rawValue = event.target.value.trim();
      if (!rawValue) return;

      if (rawValue.startsWith('.')) {
        rawValue = '0' + rawValue;
      }

      const numericValue = parseFloat(rawValue);
      if (!isNaN(numericValue)) {
        const sanitizedFixed = parseFloat(numericValue.toFixed(2));
        setValue(fieldId, sanitizedFixed.toString());
      }
    };

    /*
      CRITICAL FEATURE IMPLEMENTATION: REAL-TIME LEDGER VALUE AGGREGATION & WHOLE NUMBER CEILING LOCK
      Runs mathematical accumulation across every field array. If an incremental currency fraction is evaluated
      (e.g., 1230.25), the total is cleanly forced upwards to the next absolute whole number ceiling integer (1231).
    */
    const compiledCeiledTotalValue = () => {
      let rawSum = 0;
      Object.keys(runningFormValues).forEach(brandId => {
        const quantity = parseFloat(runningFormValues[brandId]);
        if (!isNaN(quantity) && quantity > 0) {
          const structuralRate = ratesMapping[brandId] || 0;
          rawSum += quantity * structuralRate;
        }
      });
      return Math.ceil(rawSum);
    };

    const processFormPreviewStep = (data) => {
        // Collect and format only active entered quantities
        const activeSubmissions = Object.keys(data)
            .filter(key => parseFloat(data[key]) > 0)
            .map(key => {
                // Look up corresponding brand name from nested structures
                let foundName = "Unknown Product";
                for (const cat of mockCategories) {
                    const match = cat.brands.find(b => b.id === key);
                    if (match) { foundName = match.name; break; }
                }
                return {
                    brandId: key,
                    brandName: foundName,
                    quantity: parseFloat(data[key]),
                    rate: ratesMapping[key]
                };
            });

        setFinalPreviewPayload(activeSubmissions);
        setCurrentStep(2); // Advance DOM context cleanly to Step 2 review matrix panel
    };

    // Safe navigation fallback logic wrapper
    const handleNavigationBackRoute = () => {
        if (currentStep === 2) {
            setCurrentStep(1); // Drop back from summary review layer onto interactive data entry matrix
        } else {
            if (onBack) onBack();
        }
    };

    return (
        <div className="w-full min-h-screen bg-slate-50 flex flex-col justify-between max-w-md rounded-2xl mx-auto border-x border-slate-200/80 shadow-sm">

            {/* FIXED PERMANENT UNIVERSAL HEADER LAYER */}
            <div className="sticky top-0 bg-white border-b border-slate-200/80 px-4 py-3.5 flex items-center gap-x-4 z-10 shadow-xs">
                <button
                    type="button"
                    onClick={handleNavigationBackRoute}
                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors duration-150 shrink-0"
                    aria-label="Navigate Back"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </button>
                <div>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                        {currentStep === 1 ? "Bill Submission" : "Review Run Summary"}
                    </h2>
                </div>
            </div>

            {/* DYNAMIC CONTENT INJECTION BODY LAYER */}
            {currentStep === 1 ? (
              <BillingEntryForm 
                register={register}
                mockCategories={mockCategories}
                expandedCategories={expandedCategories}
                toggleCategory={toggleCategory}
                handleBlurSanitization={handleBlurSanitization}
                handleSubmit={handleSubmit}
                onPreviewSubmit={processFormPreviewStep}
              />
            ) : (
              <BillingPreviewSheet finalPreviewPayload={finalPreviewPayload} />
            )}

            {/* FIXED PERSISTENT BOTTOM TOTAL METRICS BLOCK */}
            <div className="sticky bottom-0 bg-white border-t border-slate-200/80 p-4 shadow-sm z-10">
                <div className="flex items-center justify-between mb-3.5 px-3.5">
                    <span className="text-xl font-bold text-slate-900 uppercase">
                        Bill Value:
                    </span>
                    <span className="text-xl font-black text-slate-900 tracking-tight">
                        ₹{compiledCeiledTotalValue().toLocaleString('en-IN')}
                    </span>
                </div>

                {currentStep === 1 ? (
                    <button
                        type="button"
                        onClick={() => document.getElementById('submit-billing-form').click()}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold py-3 px-4 rounded-xl text-sm tracking-wide transition-all duration-150 shadow-xs flex items-center justify-center"
                    >
                        Review
                    </button>
                ) : (
                    <button
                        type="button"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold py-3 px-4 rounded-xl text-sm tracking-wide transition-all duration-150 shadow-xs flex items-center justify-center"
                    >
                        Confirm & Submit Run
                    </button>
                )}
            </div>

        </div>
    );
}