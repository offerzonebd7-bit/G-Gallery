
import React, { useState } from 'react';

interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Updated password as requested: @3136#
    if (password === '@3136#') {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="max-w-md w-full bg-white p-16 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] text-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent opacity-50" />
        
        <h2 className="font-serif text-4xl mb-6 tracking-tight text-neutral-900 italic">Authentification</h2>
        <p className="text-neutral-400 text-xs uppercase tracking-[0.2em] mb-12 font-light">
          Graphico Global Proprietary Interface
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative group">
            <input 
              type="password" 
              placeholder="Security Key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full text-center border-b ${error ? 'border-red-400' : 'border-neutral-100 group-hover:border-neutral-300 focus:border-black'} py-4 focus:outline-none bg-transparent placeholder-neutral-200 transition-all duration-500 font-light`}
            />
            {error && (
              <p className="text-[10px] text-red-400 absolute -bottom-6 left-0 right-0 text-center uppercase tracking-[0.2em] font-medium animate-pulse">
                Invalid Credentials
              </p>
            )}
          </div>

          <button 
            type="submit"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="w-full relative py-5 mt-4 text-[11px] uppercase tracking-[0.4em] font-semibold transition-all duration-700 group overflow-hidden"
          >
            <span className={`relative z-10 transition-colors duration-500 ${isHovering ? 'text-white' : 'text-black'}`}>
              Authorize
            </span>
            <div className={`absolute inset-0 border border-black transition-all duration-700 ${isHovering ? 'bg-black' : 'bg-transparent'}`} />
          </button>
        </form>

        <div className="mt-16 flex justify-center gap-4">
          <div className="w-1 h-1 rounded-full bg-neutral-200" />
          <div className="w-1 h-1 rounded-full bg-neutral-200" />
          <div className="w-1 h-1 rounded-full bg-neutral-200" />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
