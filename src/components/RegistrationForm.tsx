import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Check, ArrowRight } from 'lucide-react';
import { Domain } from '../types';

interface RegistrationFormProps {
  type?: Domain;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ type = 'eu' }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setTimeout(() => {
      // Save to localStorage so they are persisted in browser memory
      try {
        const storedStr = localStorage.getItem('made_registered_emails') || '[]';
        const list = JSON.parse(storedStr);
        // Only add if it doesn't already exist in the list to avoid duplicate records
        if (!list.some((item: any) => item.email === email && item.domain === type)) {
          list.push({
            email,
            domain: type,
            registeredAt: new Date().toISOString()
          });
          localStorage.setItem('made_registered_emails', JSON.stringify(list));
        }
      } catch (err) {
        console.error('LocalStorage persist error:', err);
      }

      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 4000);
    }, 1200);
  };

  // Dynamic theme styling mappings
  const themeMap = {
    paris: {
      text: 'text-sky-400',
      textLight: 'text-sky-300',
      dot: 'bg-sky-500',
      border: 'border-sky-950/60',
      borderFocus: 'focus-within:border-sky-500/50',
      placeholder: 'placeholder-sky-950/80',
      placeholderFocus: 'focus:placeholder-sky-800',
      btnText: 'text-sky-500',
      btnDisabled: 'disabled:text-sky-950',
      btnBorder: 'border-sky-500',
    },
    fr: {
      text: 'text-cyan-400',
      textLight: 'text-cyan-300',
      dot: 'bg-cyan-500',
      border: 'border-cyan-950/60',
      borderFocus: 'focus-within:border-cyan-500/50',
      placeholder: 'placeholder-cyan-950/80',
      placeholderFocus: 'focus:placeholder-cyan-800',
      btnText: 'text-cyan-500',
      btnDisabled: 'disabled:text-cyan-950',
      btnBorder: 'border-cyan-500',
    },
    eu: {
      text: 'text-purple-400',
      textLight: 'text-purple-300',
      dot: 'bg-purple-500',
      border: 'border-purple-950/60',
      borderFocus: 'focus-within:border-purple-500/50',
      placeholder: 'placeholder-purple-950/80',
      placeholderFocus: 'focus:placeholder-purple-800',
      btnText: 'text-purple-500',
      btnDisabled: 'disabled:text-purple-950',
      btnBorder: 'border-purple-500',
    },
  };

  const activeTheme = themeMap[type];

  return (
    <div className={`w-full max-w-[280px] font-mono text-xs ${activeTheme.text}`}>
      <div className={`mb-2 tracking-[0.2em] uppercase ${activeTheme.textLight} flex items-center gap-2 justify-center`}>
        <span className={`w-1.5 h-1.5 rounded-full ${activeTheme.dot} animate-pulse`} />
        REGISTER / MAIL...
      </div>
      
      <form 
        onSubmit={handleSubmit} 
        className={`relative flex items-center border ${activeTheme.border} bg-black/40 backdrop-blur-md rounded-lg p-1 group transition-all duration-300 ${activeTheme.borderFocus}`}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ENTER ADDR..."
          disabled={status === 'loading' || status === 'success'}
          className={`w-full bg-transparent px-3 py-2 text-white ${activeTheme.placeholder} outline-none uppercase font-mono tracking-wider ${activeTheme.placeholderFocus} disabled:opacity-50`}
        />
        
        <button
          type="submit"
          disabled={!email || status === 'loading' || status === 'success'}
          className={`p-2 ${activeTheme.btnText} hover:text-white ${activeTheme.btnDisabled} transition-colors duration-200 cursor-pointer`}
        >
          <AnimatePresence mode="wait">
            {status === 'loading' ? (
              <motion.div
                key="loading"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className={`w-4 h-4 border-2 ${activeTheme.btnBorder} border-t-transparent rounded-full`}
              />
            ) : status === 'success' ? (
              <motion.div
                key="success"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Check className="w-4 h-4 text-emerald-400" />
              </motion.div>
            ) : (
              <motion.div
                key="arrow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </form>
      
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 text-[10px] text-emerald-400 tracking-widest uppercase text-right"
          >
            CONFIRMED // INBOX CHECKED
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
