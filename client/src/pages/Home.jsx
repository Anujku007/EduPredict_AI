import { Link } from 'react-router-dom';
import { BrainCircuit, BarChart3, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto">
        <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-wide">
          MERN + Machine Learning Academic Platform
        </span>
        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Predict Student Performance & Unlock Actionable Academic Insights
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Evaluate quantitative readiness from demographic and literacy indicators, store longitudinal
          diagnostics in MongoDB, and visualize cohort trends in real time.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/predict"
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Launch Predictor
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 font-semibold hover:bg-slate-50 transition"
          >
            Sign In with Demo Account
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-20">
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <BrainCircuit className="w-8 h-8 text-indigo-600 mb-3" />
          <h3 className="font-bold text-lg">ML Inference Pipeline</h3>
          <p className="text-sm text-slate-600 mt-1">
            Connects directly to your trained Scikit-Learn/CatBoost artifacts with instant fallback scoring.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <BarChart3 className="w-8 h-8 text-indigo-600 mb-3" />
          <h3 className="font-bold text-lg">MongoDB Aggregation Analytics</h3>
          <p className="text-sm text-slate-600 mt-1">
            Computes real-time cohort averages, risk bands, and test-prep impact directly via MongoDB pipelines.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <ShieldCheck className="w-8 h-8 text-indigo-600 mb-3" />
          <h3 className="font-bold text-lg">Role-Based Workspaces</h3>
          <p className="text-sm text-slate-600 mt-1">
            Students track personal diagnostics while educators monitor institution-wide student cohorts.
          </p>
        </div>
      </div>
    </div>
  );
}
