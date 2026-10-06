import React, { useState } from 'react';
import { ShieldCheck, RefreshCw, MessageSquare, Radio, Star, CheckCircle, ExternalLink, Send, Sparkles } from 'lucide-react';
import { REVIEWS, LIVE_ACTIVATIONS } from '../data/reviews';
import { CustomerReview } from '../types';

interface SocialProofSectionProps {
  onOpenChat: () => void;
}

export const SocialProofSection: React.FC<SocialProofSectionProps> = ({ onOpenChat }) => {
  const [activeTab, setActiveTab] = useState<'proofs' | 'reviews' | 'feed'>('reviews');
  const [reviewsList, setReviewsList] = useState<CustomerReview[]>(REVIEWS);

  // Review submission state
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newTool, setNewTool] = useState('ChatGPT Plus & Team');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submittedReview, setSubmittedReview] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      location: newLocation.trim() || 'United States',
      productName: newTool,
      rating: newRating,
      comment: newComment.trim(),
      date: 'Just now',
      verified: true,
    };

    setReviewsList([newRev, ...reviewsList]);
    setSubmittedReview(true);
    setNewAuthor('');
    setNewComment('');
    setTimeout(() => setSubmittedReview(false), 4000);
  };

  return (
    <section id="proofs" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Top Tag & Title (Matching screenshot 12.50.12) */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
          <span>Official VIP Channel · 100% Transparent Proofs</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-display">
          SEE OUR REAL CUSTOMER ACTIVATIONS & REVIEWS
        </h2>

        <p className="text-sm sm:text-base font-semibold text-emerald-400 mt-3 mb-2">
          Want to see proof before placing your order?
        </p>

        <p className="text-xs sm:text-sm text-slate-400">
          We regularly post real customer activation proofs, order updates, and customer reviews on our official community channels.
        </p>
      </div>

      {/* 4 Feature Boxes (Matching screenshot 12.50.12) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        
        <div className="p-5 rounded-2xl bg-[#090d16] border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1 font-display">
              Real Customer Activations
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Direct screenshots of account setups, licenses, and delivered workspace invites across US states.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#090d16] border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1 font-display">
              Regular Proof Updates
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Fresh daily delivery updates posted directly as customer orders are fulfilled within minutes.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#090d16] border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1 font-display">
              Customer Reviews
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Unedited feedback, direct chat messages, and verified buyer satisfaction notes.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#090d16] border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3">
              <Radio className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1 font-display">
              Official VIP Channel
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Independent public channel where anyone can browse and verify proofs anytime.
            </p>
          </div>
        </div>

      </div>

      {/* Main Proof CTA Button (Matching screenshot 12.50.12) */}
      <div className="text-center mb-12">
        <button
          onClick={onOpenChat}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:brightness-110 transition-all cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 fill-slate-950" />
          <span>View Customer Proofs & Live Activations</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Interactive Tabs for Live Feed / Verified Reviews */}
      <div className="rounded-3xl bg-[#0a0e17] border border-slate-800/80 p-6 sm:p-8">
        
        {/* Tab Controls */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'reviews'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Verified Customer Reviews ({reviewsList.length})
          </button>

          <button
            onClick={() => setActiveTab('feed')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'feed'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Live US Activations Stream
          </button>

          <button
            onClick={() => setActiveTab('proofs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'proofs'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Write a Review
          </button>
        </div>

        {/* Tab Content: Verified Reviews */}
        {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviewsList.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-500">{rev.date}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed italic mb-4">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-white">{rev.author}</h5>
                    <span className="text-[10px] text-slate-400">{rev.location}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
                    {rev.productName}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: Live Activations Feed */}
        {activeTab === 'feed' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800 px-2">
              <span>Recent Activity across US Time Zones</span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live Stream
              </span>
            </div>

            {LIVE_ACTIVATIONS.map((act) => (
              <div
                key={act.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <div>
                    <span className="font-bold text-white">{act.productName}</span>
                    <span className="text-slate-400 ml-2">({act.planDuration})</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-400">
                  <span className="font-mono text-cyan-300">{act.customerMasked}</span>
                  <span className="hidden sm:inline text-slate-300">{act.city}, {act.state}</span>
                  <span className="text-[11px] text-slate-500">{act.minutesAgo}m ago</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: Submit Review */}
        {activeTab === 'proofs' && (
          <form onSubmit={handleSubmitReview} className="max-w-xl mx-auto space-y-4">
            <h3 className="text-sm font-bold text-white text-center font-display mb-1">
              Share Your Ryvora Experience
            </h3>
            <p className="text-xs text-slate-400 text-center mb-4">
              Your feedback helps other creators and developers in the US find genuine tools.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jason Miller"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">City, State</label>
                <input
                  type="text"
                  placeholder="e.g. Dallas, TX"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Product Purchased</label>
              <select
                value={newTool}
                onChange={(e) => setNewTool(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="ChatGPT Plus & Team">ChatGPT Plus & Team</option>
                <option value="Adobe Creative Cloud">Adobe Creative Cloud</option>
                <option value="Cursor AI Pro">Cursor AI Pro</option>
                <option value="Canva Pro">Canva Pro</option>
                <option value="ElevenLabs Pro">ElevenLabs Voice Pro</option>
                <option value="Claude Pro">Claude Pro</option>
                <option value="Midjourney v6.1">Midjourney v6.1</option>
                <option value="Netflix 4K">Netflix 4K Ultra HD</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Rating</label>
              <div className="flex items-center gap-2">
                {[5, 4, 3, 2, 1].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setNewRating(r)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs cursor-pointer ${
                      newRating === r
                        ? 'border-amber-400 bg-amber-950/30 text-amber-300'
                        : 'border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{r} Stars</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Your Review</label>
              <textarea
                required
                rows={3}
                placeholder="How was the delivery speed and account quality?"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
            >
              Submit Verified Review
            </button>

            {submittedReview && (
              <p className="text-center text-xs text-emerald-400 font-semibold">
                ✓ Thank you! Your review has been added to our live feed.
              </p>
            )}
          </form>
        )}

      </div>

    </section>
  );
};
