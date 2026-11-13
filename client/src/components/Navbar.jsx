import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Calculator, BarChart3, History, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
          <GraduationCap className="w-6 h-6" />
          <span>EduPredict-AI</span>
        </Link>

        <div className="flex items-center gap-5 text-sm font-medium text-slate-700">
          {user ? (
            <>
              <Link to="/predict" className="flex items-center gap-1 hover:text-indigo-600 transition">
                <Calculator className="w-4 h-4" /> Predict Score
              </Link>
              <Link to="/history" className="flex items-center gap-1 hover:text-indigo-600 transition">
                <History className="w-4 h-4" /> History
              </Link>
              <Link to="/analytics" className="flex items-center gap-1 hover:text-indigo-600 transition">
                <BarChart3 className="w-4 h-4" /> Analytics
              </Link>
              <span className="hidden sm:inline text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 capitalize">
                {user.name.split(' ')[0]} ({user.role})
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-rose-600 hover:text-rose-700"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="px-3 py-1.5 rounded-lg hover:bg-slate-100">
                Log In
              </Link>
              <Link
                to="/register"
                className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
