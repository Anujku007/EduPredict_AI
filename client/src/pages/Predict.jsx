import { useState } from 'react';
import { Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import api from '../api/axios';

export default function Predict() {
  const [form, setForm] = useState({
    studentLabel: '',
    gender: 'male',
    raceEthnicity: 'group C',
    parentalLevelOfEducation: "bachelor's degree",
    lunch: 'standard',
    testPreparationCourse: 'completed',
    readingScore: 75,
    writingScore: 75,
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/predictions', form);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Prediction failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 grid lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3 bg-white p-6 rounded-xl border border-slate-200">
        <h1 className="text-xl font-bold mb-1">Student Math Score Predictor</h1>
        <p className="text-xs text-slate-500 mb-5">
          Enter student academic indicators to run inference and save to your diagnostic history.
        </p>

        {error && <div className="mb-4 p-3 bg-rose-50 text-rose-700 text-xs rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="sm:col-span-2">
            <label className="block font-semibold mb-1">Student Name / Identifier (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Roll #42 or Midterm Check"
              value={form.studentLabel}
              onChange={(e) => setForm({ ...form, studentLabel: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Gender</label>
            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Race / Ethnicity Group</label>
            <select
              value={form.raceEthnicity}
              onChange={(e) => setForm({ ...form, raceEthnicity: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
            >
              {['group A', 'group B', 'group C', 'group D', 'group E'].map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Parental Education</label>
            <select
              value={form.parentalLevelOfEducation}
              onChange={(e) => setForm({ ...form, parentalLevelOfEducation: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
            >
              {[
                'some high school',
                'high school',
                'some college',
                "associate's degree",
                "bachelor's degree",
                "master's degree",
              ].map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Lunch Type</label>
            <select
              value={form.lunch}
              onChange={(e) => setForm({ ...form, lunch: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
            >
              <option value="standard">Standard</option>
              <option value="free/reduced">Free / Reduced</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold mb-1">Test Preparation Course</label>
            <select
              value={form.testPreparationCourse}
              onChange={(e) => setForm({ ...form, testPreparationCourse: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
            >
              <option value="completed">Completed</option>
              <option value="none">None</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Reading Score (0–100)</label>
            <input
              type="number"
              min="0"
              max="100"
              required
              value={form.readingScore}
              onChange={(e) => setForm({ ...form, readingScore: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Writing Score (0–100)</label>
            <input
              type="number"
              min="0"
              max="100"
              required
              value={form.writingScore}
              onChange={(e) => setForm({ ...form, writingScore: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="sm:col-span-2 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {loading ? 'Running Model...' : 'Predict & Save Result'}
          </button>
        </form>
      </div>

      <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 h-fit">
        <h2 className="font-bold text-lg mb-4">Inference Result</h2>

        {!result ? (
          <div className="p-8 text-center text-sm text-slate-400 border border-dashed border-slate-200 rounded-xl">
            Submit the form to view predicted Math score and tailored interventions.
          </div>
        ) : (
          <div>
            <div className="p-5 rounded-xl bg-indigo-50 text-center">
              <p className="text-xs uppercase font-semibold text-indigo-600 tracking-wide">
                Predicted Math Score
              </p>
              <p className="text-5xl font-extrabold text-indigo-900 mt-1">
                {result.predictedMathScore}
                <span className="text-lg font-medium text-indigo-500"> / 100</span>
              </p>
              <span
                className={`inline-flex items-center gap-1 mt-3 px-3 py-1 rounded-full text-xs font-semibold ${
                  result.riskBand === 'High Performer'
                    ? 'bg-emerald-100 text-emerald-800'
                    : result.riskBand === 'On Track'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {result.riskBand === 'Needs Support' ? (
                  <AlertTriangle className="w-3.5 h-3.5" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                )}
                {result.riskBand}
              </span>
            </div>

            <div className="mt-5">
              <h3 className="text-xs font-bold uppercase text-slate-500 mb-2">
                Recommended Actions
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-4 text-[11px] text-slate-400">
              Engine: <code>{result.inferenceEngine}</code> • Saved to MongoDB
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
