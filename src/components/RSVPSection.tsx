import React, { useState, useEffect } from 'react';
import { Sparkles, Check, User, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { weddingData } from '../data/weddingData';

interface RSVPData {
  name: string;
  guestCount: number;
  attending: 'yes' | 'no';
  note?: string;
  timestamp?: string;
}

export const RSVPSection: React.FC = () => {
  const [name, setName] = useState('');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [existingRSVP, setExistingRSVP] = useState<RSVPData | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('wedding_rsvp_response');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setExistingRSVP(parsed);
      } catch {
        // ignore
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const rsvpPayload: RSVPData = {
      name: name.trim(),
      guestCount: attending === 'yes' ? guestCount : 0,
      attending,
      note: note.trim(),
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem('wedding_rsvp_response', JSON.stringify(rsvpPayload));
    setExistingRSVP(rsvpPayload);
    setSubmitted(true);


  };

  const handleEdit = () => {
    if (existingRSVP) {
      setName(existingRSVP.name);
      setGuestCount(existingRSVP.guestCount || 1);
      setAttending(existingRSVP.attending);
      setNote(existingRSVP.note || '');
    }
    setSubmitted(false);
    setExistingRSVP(null);
  };

  return (
    <section id="rsvp-section" className="py-10 md:py-14 px-4 max-w-2xl mx-auto">
      
      {/* Container with Modern Luxury Card Gradient */}
      <div className="card-gradient-luxury rounded-3xl p-6 sm:p-10 border-2 border-[#d4af37]/45 shadow-xl relative overflow-hidden">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-[#936492]">
              Kindly RSVP
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#3b1d3a] tracking-tight">
            Will you celebrate with us?
          </h2>
          <p className="font-display italic text-xs sm:text-sm text-[#6d556c] max-w-md mx-auto mt-1">
            Please respond by <strong>{weddingData.rsvp.deadline}</strong> so we can prepare a place at the table for you.
          </p>
        </div>

        {/* Already Submitted State */}
        {(submitted || existingRSVP) ? (
          <div className="text-center py-4 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3 border border-emerald-300 shadow-xs">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#3b1d3a]">
              Thank You, {existingRSVP?.name || name}!
            </h3>

            <p className="font-display italic text-xs sm:text-sm text-[#6d556c] mt-1.5 max-w-md mx-auto">
              {existingRSVP?.attending === 'yes' ? (
                <>We are thrilled to celebrate with you! Your RSVP for <strong>{existingRSVP.guestCount} {existingRSVP.guestCount === 1 ? 'guest' : 'guests'}</strong> has been saved.</>
              ) : (
                <>Thank you for letting us know. Your blessings remain with us!</>
              )}
            </p>

            <button
              onClick={handleEdit}
              className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#936492]/30 text-xs font-semibold text-[#936492] hover:bg-[#f4ecf3] transition-all cursor-pointer"
            >
              Update RSVP Details
            </button>
          </div>
        ) : (
          /* RSVP Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Guest Name */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5c355b] mb-1 flex items-center gap-1">
                <User className="w-3 h-3 text-[#936492]" /> Your Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-2xl bg-white/95 border border-[#936492]/25 focus:border-[#936492] focus:ring-2 focus:ring-[#936492]/20 outline-none text-xs sm:text-sm transition-all shadow-xs"
              />
            </div>

            {/* Attendance Toggle */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5c355b] mb-1">
                Will you be attending?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttending('yes')}
                  className={`py-2.5 px-3 rounded-xl border-2 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    attending === 'yes'
                      ? 'border-[#936492] bg-[#936492] text-white shadow-md'
                      : 'border-gray-200 bg-white/80 text-[#5c355b] hover:border-[#936492]/40'
                  }`}
                >
                  <Check className={`w-3.5 h-3.5 ${attending === 'yes' ? 'opacity-100' : 'opacity-0'}`} />
                  Yes, I'll attend
                </button>

                <button
                  type="button"
                  onClick={() => setAttending('no')}
                  className={`py-2.5 px-3 rounded-xl border-2 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    attending === 'no'
                      ? 'border-[#754474] bg-[#754474] text-white shadow-md'
                      : 'border-gray-200 bg-white/80 text-[#5c355b] hover:border-[#754474]/40'
                  }`}
                >
                  <Check className={`w-3.5 h-3.5 ${attending === 'no' ? 'opacity-100' : 'opacity-0'}`} />
                  Sorry, I can't
                </button>
              </div>
            </div>

       

            {/* Note */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5c355b] mb-1 flex items-center gap-1">
                <MessageSquare className="w-3 h-3 text-[#936492]" /> Dietary Notes / Wishes (Optional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Share any special wishes or dietary notes..."
                rows={2}
                className="w-full px-4 py-2.5 rounded-2xl bg-white/95 border border-[#936492]/25 focus:border-[#936492] focus:ring-2 focus:ring-[#936492]/20 outline-none text-xs sm:text-sm transition-all shadow-xs resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#936492] via-[#7e477d] to-[#5c355b] text-white font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5 text-[#f1df9d]" />
              <span>Send RSVP</span>
            </button>

          </form>
        )}

      </div>

    </section>
  );
};
