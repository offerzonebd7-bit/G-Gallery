
import React, { useState } from 'react';

interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      // Validated password: @3136#
      if (password === '@3136#') {
        onSuccess();
      } else {
        setError(true);
        setLoading(false);
        setTimeout(() => setError(false), 2000);
      }
    }, 800);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 bg-white">
      <div className="max-w-md w-full p-12 md:p-16 border border-neutral-50 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.06)] text-center relative">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-[#c5a059] opacity-20" />
        
        <div className="mb-10">
          <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-300 block mb-2 font-medium">Access Control</span>
          <h2 className="font-serif text-3xl md:text-4xl italic text-neutral-900 leading-none">Management</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="relative">
            <input 
              type="password" 
              placeholder="Security Key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className={`w-full text-center border-b ${error ? 'border-red-400' : 'border-neutral-100 focus:border-black'} py-5 focus:outline-none bg-transparent placeholder-neutral-200 transition-all duration-700 font-light tracking-[0.3em]`}
            />
            {error && (
              <p className="text-[9px] text-red-400 absolute -bottom-6 left-0 right-0 text-center uppercase tracking-[0.2em] font-medium">
                Invalid key provided
              </p>
            )}
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full relative py-5 mt-4 text-[10px] uppercase tracking-[0.4em] font-bold overflow-hidden group transition-all duration-700 bg-black text-white hover:bg-[#c5a059]"
          >
            {loading ? (
              <span className="animate-pulse italic lowercase tracking-normal">authenticating...</span>
            ) : (
              'Enter Space'
            )}
          </button>
        </form>

        <div className="mt-16 opacity-10">
           <p className="text-[8px] uppercase tracking-[0.5em]">Graphico Global Security</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
