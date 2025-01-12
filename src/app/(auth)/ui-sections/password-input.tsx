'use client';
import React, { useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';

import { Input } from '@/components/ui/input';

interface PasswordInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}
const PasswordInput = ({ onChange, value }: PasswordInputProps) => {
  const [password, setPassword] = useState<string>(value);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div className="relative w-full">
      <Input
        id="input-51"
        className="pe-9"
        placeholder="كلمة المرور"
        type={isVisible ? 'text' : 'password'}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          onChange(e);
        }}
        aria-describedby="password-strength"
      />
      <button
        className="text-muted-foreground/80 hover:text-foreground focus-visible:outline-ring/70 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg outline-offset-2 transition-colors focus:z-10 focus-visible:outline focus-visible:outline-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        onClick={toggleVisibility}
        aria-label={isVisible ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
        aria-pressed={isVisible}
        aria-controls="password"
      >
        {isVisible ? (
          <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
        ) : (
          <Eye size={16} strokeWidth={2} aria-hidden="true" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
