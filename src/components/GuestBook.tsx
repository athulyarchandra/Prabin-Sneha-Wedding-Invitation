import React, { useState } from 'react';
import { Heart, Sparkles, Send, ArrowRight, MessageSquareHeart } from 'lucide-react';
import type { Blessing } from '../data/weddingData';

interface GuestBookProps {
  blessings: Blessing[];
  onAddBlessing: (blessing: Blessing) => void;
  onOpenAllBlessings: () => void;
}

export const GuestBook: React.FC<GuestBookProps> = ({
  blessings,
  onAddBlessing,
  onOpenAllBlessings,
}) => {
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Friend');
  const [message, setMessage] = useState('');
  const [sentToast, setSentToast] = useState(false);

  const latestBlessings = blessings.slice(0, 3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const colors = ['bg-[#936492]', 'bg-[#754474]', 'bg-[#5c355b]', 'bg-[#b78bb6]', 'bg-[#a67c1e]'];
    const randomBg = colors[Math.floor(Math.random() * colors.length)];

    const newBlessing: Blessing = {
      id: `b-${Date.now()}`,
      name: name.trim(),
      relation: relation.trim(),
      message: message.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      avatarBg: randomBg,
    };

    onAddBlessing(newBlessing);
    setName('');
    setMessage('');
    setSentToast(true);


    setTimeout(() => {
      setSentToast(false);
    }, 4000);
  };

  return (
    <section id="guestbook-section" className="py-10 md:py-14 px-4 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-[#936492]">
            Guest Book
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#3b1d3a] tracking-tight">
          Share your blessings
        </h2>
        <p className="font-display italic text-sm sm:text-base text-[#6d556c] max-w-md mx-auto mt-1">
          Leave a wish, a memory, or a verse for the couple.
        </p>
      </div>

      {/* Input Form Card with Gradient */}
      <div className="card-gradient-luxury rounded-3xl p-5 sm:p-8 border-2 border-[#d4af37]/35 shadow-xl mb-8">
        
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5c355b] mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Anand & Priya"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-white/95 border border-[#936492]/25 focus:border-[#936492] focus:ring-2 focus:ring-[#936492]/20 outline-none text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5c355b] mb-1">
                Relationship
              </label>
              <select
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-white/95 border border-[#936492]/25 focus:border-[#936492] focus:ring-2 focus:ring-[#936492]/20 outline-none text-xs sm:text-sm text-[#5c355b]"
              >
                <option value="Friend">Friend</option>
                <option value="Family Member">Family Member</option>
                <option value="Cousin">Cousin</option>
                <option value="Colleague">Colleague</option>
                <option value="Well-wisher">Well-wisher</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5c355b] mb-1">
              Your Blessing, Wish or Verse
            </label>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Leave a heartfelt message for Prabin & Sneha..."
              rows={2}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-white/95 border border-[#936492]/25 focus:border-[#936492] focus:ring-2 focus:ring-[#936492]/20 outline-none text-xs sm:text-sm resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            {sentToast ? (
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 animate-fadeIn">
                <Heart className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                Thank you! Your blessing has been added to our guestbook.
              </span>
            ) : (
              <span className="text-[11px] text-[#7a5979] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#d4af37]" /> Your wish will appear in our wedding memory book
              </span>
            )}

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#936492] via-[#7e477d] to-[#5c355b] text-white font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3 h-3 text-[#f1df9d]" />
              <span>Send Blessing</span>
            </button>
          </div>
        </form>

      </div>

      {/* Latest Blessings */}
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-serif text-lg sm:text-xl font-normal text-[#3b1d3a] flex items-center gap-1.5">
            <MessageSquareHeart className="w-4 h-4 text-[#936492]" />
            <span>Latest Blessings</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {latestBlessings.map((blessing) => (
            <div
              key={blessing.id}
              className="rounded-2xl bg-gradient-to-br from-white/95 to-[#faf2f9] p-4 border border-[#936492]/20 shadow-xs hover:shadow-md hover:border-[#936492] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-7 h-7 rounded-full ${blessing.avatarBg || 'bg-[#936492]'} text-white flex items-center justify-center text-[11px] font-bold`}
                  >
                    {blessing.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-[#3b1d3a] text-xs">
                      {blessing.name}
                    </h4>
                    <span className="text-[9px] text-[#936492] font-semibold">
                      {blessing.relation}
                    </span>
                  </div>
                </div>

                <p className="font-display italic text-xs text-[#4a3349] leading-relaxed line-clamp-3">
                  "{blessing.message}"
                </p>
              </div>

              <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between text-[9px] text-[#8c748a]">
                <span>{blessing.date}</span>
                <Heart className="w-2.5 h-2.5 text-[#936492] fill-[#936492]/30" />
              </div>
            </div>
          ))}
        </div>

        {/* See All Blessings Button */}
        <div className="text-center pt-4">
          <button
            onClick={onOpenAllBlessings}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-[#936492] text-[#936492] hover:bg-[#936492] hover:text-white font-bold text-xs uppercase tracking-wider shadow-xs hover:shadow-md transition-all cursor-pointer group"
          >
            <span>See All Blessings ({blessings.length})</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#d4af37] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

    </section>
  );
};
