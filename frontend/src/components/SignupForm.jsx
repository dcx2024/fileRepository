import React, { useState } from 'react';
import { User, Lock, ArrowRight, Loader2, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Connection error. Is the server online?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050608] flex items-center justify-center px-6 selection:bg-emerald-500/30">
      <div className="w-full max-w-md bg-[#0a0c10] border border-white/5 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        
        {/* Return to Home Button */}
        <Link 
          to="/" 
          className="absolute top-6 left-6 text-gray-500 hover:text-emerald-500 transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest z-20"
        >
          <Home size={14} /> Home
        </Link>

        {/* Emerald Glow Background Accent */}
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full"></div>

        <div className="relative z-10">
          <div className="flex flex-col items-center mb-10 pt-4">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Create <span className="text-emerald-500">Account</span>
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Join the academic repository
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold uppercase tracking-widest text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-emerald-500 transition-colors" size={20} />
                <input 
                  type="text" 
                  required
                  placeholder="Enter your username"
                  className="w-full bg-[#050608] border border-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-500/40 text-gray-200 transition-all"
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-emerald-500 transition-colors" size={20} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#050608] border border-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-500/40 text-gray-200 transition-all"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-800 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/10 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <>Sign Up <ArrowRight size={18} /></>}
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
            <p className="text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-emerald-500 hover:text-emerald-400 font-medium transition-colors">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;