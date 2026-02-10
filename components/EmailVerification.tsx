import React, { useState, useRef, useEffect } from 'react';
import { Mail, ArrowLeft, RefreshCw, CheckCircle } from 'lucide-react';

interface EmailVerificationProps {
  email: string;
  loading: boolean;
  onVerify: (code: string) => void;
  onResend: () => void;
  onBack: () => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ email, loading, onVerify, onResend, onBack }) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    if (isNaN(Number(value)) && value !== "") return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Focus next input
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text").substring(0, 6).split("");
    if (data.every(char => !isNaN(Number(char)))) {
      const newOtp = [...otp];
      data.forEach((char, i) => {
        if (i < 6) newOtp[i] = char;
      });
      setOtp(newOtp);
      inputRefs.current[Math.min(data.length, 5)]?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length === 6) {
      onVerify(code);
    }
  };

  const handleResendClick = () => {
    if (canResend) {
      setTimer(30);
      setCanResend(false);
      onResend();
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-20 h-20 bg-imara-blue/5 text-imara-blue rounded-3xl flex items-center justify-center mb-4 border border-imara-blue/10">
          <Mail size={40} strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Verify your account</h2>
        <p className="text-slate-500 text-sm mt-2 max-w-xs">
          Enter the 6-digit security code we sent to <span className="font-semibold text-imara-blue">{email}</span>
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-8">
        <div className="flex justify-between gap-2 max-w-sm mx-auto">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              ref={(el) => (inputRefs.current[index] = el)}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="w-12 h-16 text-center text-3xl font-bold bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-imara-blue/5 focus:border-imara-blue outline-none transition-all"
            />
          ))}
        </div>

        <div className="space-y-6">
          <button
            type="submit"
            disabled={loading || otp.join("").length < 6}
            className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-bold text-white transition-all ${
              loading || otp.join("").length < 6 
                ? 'bg-slate-300 cursor-not-allowed' 
                : 'bg-imara-blue hover:bg-imara-blue/90 shadow-xl shadow-imara-blue/20 transform active:scale-[0.98]'
            }`}
          >
            {loading ? <RefreshCw className="animate-spin" size={20} /> : <CheckCircle size={20} />}
            {loading ? 'Verifying...' : 'Complete Registration'}
          </button>

          <div className="flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={handleResendClick}
              disabled={!canResend}
              className={`text-sm font-bold flex items-center gap-2 transition-colors ${
                canResend ? 'text-imara-orange hover:text-imara-orange/80' : 'text-slate-400 cursor-not-allowed'
              }`}
            >
              <RefreshCw size={16} />
              {canResend ? 'Resend Security Code' : `Request new code in ${timer}s`}
            </button>

            <button
              type="button"
              onClick={onBack}
              className="text-sm font-medium text-slate-400 hover:text-slate-700 flex items-center gap-1 transition-colors"
            >
              <ArrowLeft size={14} />
              Back to registration
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmailVerification;