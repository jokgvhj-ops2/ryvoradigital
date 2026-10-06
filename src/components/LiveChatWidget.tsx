import React, { useState } from 'react';
import { MessageSquare, X, Send, ShieldCheck, Zap, Bot, User, CheckCircle2 } from 'lucide-react';
import { RyvoraLogo } from './RyvoraLogo';

interface LiveChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  onOpenTracker: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'agent' | 'user';
  text: string;
  time: string;
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  isOpen,
  onToggle,
  onOpenTracker,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'agent',
      text: 'Hello adventurer! 👋 Welcome to Ryvora Digital. Looking for instant US digital tool subscriptions or have an activation question?',
      time: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');

  const quickQuestions = [
    'How does instant delivery work?',
    'Can I upgrade my existing personal email?',
    'What replacement warranty is included?',
    'Which US payment methods do you accept?',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Simulated intelligent agent response
    setTimeout(() => {
      let reply = "Thanks for asking! Our systems deliver access within 60 to 180 seconds after checkout. All accounts are 100% private and protected by our full-term replacement warranty.";
      const lower = text.toLowerCase();

      if (lower.includes('deliver') || lower.includes('speed')) {
        reply = "⚡ Delivery is 100% automated: As soon as your order completes, your credentials or workspace invite are dispatched directly to your email in under 3 minutes!";
      } else if (lower.includes('existing') || lower.includes('email') || lower.includes('canva') || lower.includes('figma')) {
        reply = "Yes! For Canva Pro, Figma Pro, Coursera, and LinkedIn, we send an official workspace upgrade invite directly to your personal email, so you keep all your files, designs, and folders.";
      } else if (lower.includes('warranty') || lower.includes('replace') || lower.includes('stop')) {
        reply = "🛡️ Every single purchase includes our 100% Full-Term Replacement Warranty. If any tool ever has an issue during your subscription, our team replaces or reactivates it within 15 minutes at zero cost.";
      } else if (lower.includes('payment') || lower.includes('card') || lower.includes('apple') || lower.includes('paypal')) {
        reply = "💳 For our USA customers, we accept all major Credit/Debit cards (Visa, Mastercard, Amex via Stripe), Apple Pay, Google Pay, PayPal, and Crypto USDT/BTC.";
      }

      const agentMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'agent',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, agentMsg]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating launcher trigger button with tooltip pill (matching screenshot) */}
      {!isOpen && (
        <div className="flex items-center gap-2 group">
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/95 border border-slate-700/80 text-xs font-semibold text-slate-200 shadow-xl backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
            <span>Need Help? Chat with Ryvora Support</span>
          </div>

          <button
            onClick={onToggle}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer relative"
            aria-label="Open Live Chat"
          >
            <MessageSquare className="w-7 h-7 fill-slate-950" />
            <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-300 border-2 border-slate-950 rounded-full animate-ping" />
          </button>
        </div>
      )}

      {/* Expanded Live Chat Dialog */}
      {isOpen && (
        <div className="w-[90vw] sm:w-96 max-h-[520px] h-[520px] rounded-3xl bg-[#090d16] border border-slate-700/80 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#0c1424] to-[#0f1d33] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/30 flex items-center justify-center font-bold text-cyan-300">
                  <Bot className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#090d16]" />
              </div>

              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5 font-display">
                  <span>Ryvora Concierge</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-semibold">ONLINE</span>
                </h4>
                <p className="text-[10px] text-slate-400">
                  24/7 US Support Team · Avg reply 1m
                </p>
              </div>
            </div>

            <button
              onClick={onToggle}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-cyan-500 text-slate-950 font-medium rounded-tr-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-slate-500 mt-1 px-1">{m.time}</span>
              </div>
            ))}

            {/* Quick Prompts */}
            <div className="pt-2">
              <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1.5">
                Quick Inquiries:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="text-left text-[11px] px-2.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 text-slate-300 transition-colors cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-[#070a12] border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about tools, licenses, orders..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4 font-bold" />
              </button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
};
