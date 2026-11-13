import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/predictions/analytics').then((res) => setData(res.data));
  }, []);

  if (!data) return <div className="p-10 text-center text-slate-500">Aggregating metrics...</div>;

  const { overview, bandBreakdown, prepComparison } = data;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-2xl font-bold">Cohort Performance Analytics</h1>

      <div className="grid sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-500">Total Assessments</p>
          <p className="text-3xl font-bold mt-1">{overview.totalPredictions}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-500">Avg Predicted Math</p>
          <p className="text-3xl font-bold text-indigo-600 mt-1">
            {Number(overview.avgMathScore || 0).toFixed(1)}
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-500">Avg Reading Score</p>
          <p className="text-3xl font-bold mt-1">{Number(overview.avgReadingScore || 0).toFixed(1)}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-500">Avg Writing Score</p>
          <p className="text-3xl font-bold mt-1">{Number(overview.avgWritingScore || 0).toFixed(1)}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h2 className="font-bold text-lg mb-4">Performance Band Distribution</h2>
          <div className="space-y-3">
            {bandBreakdown.map((item) => (
              <div key={item._id} className="flex items-center justify-between text-sm">
                <span className="font-medium">{item._id}</span>
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-semibold">
                  {item.count} students
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200">
          <h2 className="font-bold text-lg mb-4">Test Preparation Course Impact</h2>
          <div className="space-y-3">
            {prepComparison.map((item) => (
              <div key={item._id} className="flex items-center justify-between text-sm">
                <span className="capitalize font-medium">Prep Course: {item._id}</span>
                <span className="font-bold text-slate-800">
                  Avg Math: {Number(item.avgMath || 0).toFixed(1)} ({item.count})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
