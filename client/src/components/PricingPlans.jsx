import { PricingTable } from "@clerk/clerk-react";

const PricingPlans = () => {
  return (
    <div className="max-w-2xl mx-auto z-20 my-30 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-50/30 to-transparent rounded-3xl"></div>
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>

      <div className="relative z-10 text-center animate-fade-in-up">
        <h2 className="text-slate-700 text-[42px] font-semibold bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700 bg-clip-text text-transparent">
          Choose Your Plan
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Start for free and scale up as you grow find the perfect plan for your
          content creation needs.
        </p>
      </div>

      <div className="mt-14 max-sm:mx-8 relative z-10 transform transition-all duration-500 hover:scale-[1.02]">
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-1 hover:shadow-3xl transition-all duration-300">
          <PricingTable />
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
