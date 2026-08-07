'use client';

import React, { useState } from 'react';
import { User } from 'lucide-react';

export default function UserAvatar({ src, name, className = 'w-8 h-8' }) {
  const [hasError, setHasError] = useState(false);

  if (src && !hasError) {
    return (
      <img
        src={src}
        alt={name || 'User Profile'}
        onError={() => setHasError(true)}
        className={`${className} rounded-full object-cover border border-emerald-400/50 shadow-sm shrink-0`}
      />
    );
  }

  return (
    <div
      className={`${className} rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 text-slate-950 font-bold flex items-center justify-center text-xs shadow-md border border-emerald-400/30 shrink-0`}
      title={name || 'User Profile'}
    >
      {name ? (
        <span>{name.charAt(0).toUpperCase()}</span>
      ) : (
        <User className="w-4 h-4 text-slate-950" />
      )}
    </div>
  );
}
