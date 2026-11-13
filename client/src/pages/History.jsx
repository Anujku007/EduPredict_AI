import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import api from '../api/axios';

export default function History() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/predictions')
      .then(({ data }) => setRecords(data))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/predictions/${id}`);
    setRecords((prev) => prev.filter((r) => r._id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Prediction History ({records.length})</h1>

      {loading ? (
        <p className="text-slate-500">Loading records...</p>
      ) : records.length === 0 ? (
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-500">
          No predictions recorded yet. Run your first assessment from the Predict Score tab.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Student / Label</th>
                <th className="px-4 py-3">Reading</th>
                <th className="px-4 py-3">Writing</th>
                <th className="px-4 py-3">Predicted Math</th>
                <th className="px-4 py-3">Status Band</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map((rec) => (
                <tr key={rec._id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{rec.studentLabel}</td>
                  <td className="px-4 py-3">{rec.readingScore}</td>
                  <td className="px-4 py-3">{rec.writingScore}</td>
                  <td className="px-4 py-3 font-bold text-indigo-600">{rec.predictedMathScore}</td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100">
                      {rec.riskBand}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    {new Date(rec.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(rec._id)}
                      className="text-rose-500 hover:text-rose-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
