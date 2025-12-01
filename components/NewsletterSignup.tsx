import React, { useState } from 'react';

interface NewsletterSignupProps {
  minimal?: boolean;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ minimal = false }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('loading');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  if (minimal) {
    return (
      <div className="w-full max-w-sm mx-auto my-6">
        <form onSubmit={handleSubmit} className="flex flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-grow px-3 py-2 text-sm bg-stone-800 border border-stone-700 rounded text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500"
            disabled={status === 'loading' || status === 'success'}
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`px-3 py-2 text-sm font-bold text-white rounded transition-colors whitespace-nowrap ${
              status === 'success' 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-rose-600 hover:bg-rose-700'
            } disabled:opacity-70`}
          >
            {status === 'loading' ? '...' : status === 'success' ? '✓' : 'Subscribe'}
          </button>
        </form>
        <div className="h-4 mt-1 text-left">
           {status === 'error' && <p className="text-xs text-rose-500">Invalid email</p>}
           {status === 'success' && <p className="text-xs text-green-500">Subscribed!</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8 mb-12 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">Get Dispatches in Your Inbox</h2>
        <p className="text-stone-600 mb-6 leading-relaxed">
          One dispatch per week. Real stories about discharge planning, insurance denials, and what actually happens in catastrophic care.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
            disabled={status === 'loading' || status === 'success'}
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`px-6 py-3 font-bold text-white rounded-lg transition-all shadow-md transform hover:-translate-y-0.5 ${
              status === 'success'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-rose-600 hover:bg-rose-700'
            } disabled:opacity-70 disabled:transform-none disabled:shadow-none`}
          >
            {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
          </button>
        </form>

        <div className="mt-3 min-h-[20px]">
          {status === 'success' && (
            <p className="text-sm text-green-600 font-medium animate-fade-in">✓ Check your email to confirm</p>
          )}
          {status === 'error' && (
            <p className="text-sm text-rose-600 font-medium animate-fade-in">✗ Please enter a valid email</p>
          )}
          {status === 'idle' && (
            <p className="text-xs text-stone-500">No spam. One newsletter per week. Unsubscribe anytime.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;