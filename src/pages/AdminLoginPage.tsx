import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

export function AdminLoginPage() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy credentials: admin / password
    if (user === 'admin' && pass === 'partnerspassworD123#') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      setError('Invalid credentials. Use admin / password');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
      <Card className="p-8 max-w-xl w-full">
        <h2 className="text-2xl font-bold mb-2">Admin Login</h2>
        <p className="text-sm text-slate-400 mb-6">Enter your admin credentials to access the dashboard.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-slate-300">Username</label>
            <input value={user} onChange={(e) => setUser(e.target.value)} className="mt-2 w-full rounded-2xl px-4 py-3 bg-slate-900 border border-white/10 text-slate-100" />
          </div>
          <div>
            <label className="text-sm text-slate-300">Password</label>
            <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} className="mt-2 w-full rounded-2xl px-4 py-3 bg-slate-900 border border-white/10 text-slate-100" />
          </div>
          {error && <div className="text-red-400">{error}</div>}
          <div className="flex justify-end">
            <Button type="submit" className="bg-[#f97316]">Sign in</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
