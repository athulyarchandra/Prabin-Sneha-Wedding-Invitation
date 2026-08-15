import React, { useState } from 'react';
import { X, Heart, Sparkles, MessageCircle, Send, Search } from 'lucide-react';
import type { Blessing } from '../data/weddingData';

interface AllBlessingsViewProps {
  isOpen: boolean;
  onClose: () => void;
  blessings: Blessing[];
  onAddBlessing: (blessing: Blessing) => void;
}

export const AllBlessingsView: React.FC<AllBlessingsViewProps> = ({
  isOpen,
  onClose,
  blessings,
  onAddBlessing,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRelation, setSelectedRelation] = useState<string>('All');
  const [showAddForm, setShowAddForm] = useState(false);

  // New blessing form state
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Friend');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const filteredBlessings = blessings.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRelation =
      selectedRelation === 'All' || b.relation.toLowerCase().includes(selectedRelation.toLowerCase());
    return matchesSearch && matchesRelation;
  });

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
    setShowAddForm(false);

  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gradient-to-b from-[#251325]/95 via-[#3d1e3c]/95 to-[#1c0c1c]/95 backdrop-blur-xl flex flex-col items-center p-4 sm:p-6 md:p-10 animate-fadeIn">
      
      {/* Top Bar with Close Button */}
      <div className="w-full max-w-5xl flex items-center justify-between py-2 mb-6 border-b border-white/15">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#f1df9d]" />
          <span className="font-serif text-xl sm:text-2xl text-[#fbf6e2] font-normal">
            The Wedding Guest Book
          </span>
          <span className="bg-[#936492] text-white text-xs px-2.5 py-0.5 rounded-full font-sans font-semibold">
            {blessings.length} Blessings
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all cursor-pointer"
          aria-label="Close page"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-5xl flex-1 flex flex-col">
        
        {/* Controls: Search, Filter, and Add Blessing Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white/10 p-4 rounded-2xl border border-white/15 backdrop-blur-md">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-white/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search wishes or names..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/50 text-xs focus:outline-none focus:ring-2 focus:ring-[#f1df9d]"
            />
          </div>

          {/* Relation Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto py-1">
            {['All', 'Family', 'Friend', 'Cousin', 'Uncle'].map((rel) => (
              <button
                key={rel}
                onClick={() => setSelectedRelation(rel)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer shrink-0 ${
                  selectedRelation === rel
                    ? 'bg-[#d4af37] text-[#2c122b] font-bold shadow-xs'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {rel}
              </button>
            ))}
          </div>

          {/* Add Blessing Button */}
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-gradient-to-r from-[#936492] to-[#b78bb6] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>{showAddForm ? 'Close Form' : 'Write a Blessing'}</span>
          </button>
        </div>

        {/* Optional Collapsible Form for Adding Blessing Inside Modal */}
        {showAddForm && (
          <div className="mb-8 p-6 rounded-2xl bg-white/95 text-[#2c1d2b] shadow-2xl border-2 border-[#d4af37] animate-fadeIn">
            <h4 className="font-serif text-xl font-semibold text-[#3b1d3a] mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d4af37]" /> Share Your Blessing for Prabin & Sneha
            </h4>
            <p className="text-xs text-[#6e586d] mb-4">
              Your warm message will be immortalized in our couple guestbook.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#5c355b] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#936492]/30 text-xs focus:ring-2 focus:ring-[#936492] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#5c355b] mb-1">Relation / Connection</label>
                  <select
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#936492]/30 text-xs focus:ring-2 focus:ring-[#936492] outline-none bg-white"
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
                <label className="block text-xs font-bold uppercase text-[#5c355b] mb-1">Your Blessing or Verse</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your wishes, love, or marriage advice..."
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#936492]/30 text-xs focus:ring-2 focus:ring-[#936492] outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#936492] hover:bg-[#754474] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" /> Post Blessing
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Blessings Grid (Masonry feel) */}
        {filteredBlessings.length === 0 ? (
          <div className="text-center py-16 text-white/70">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="font-serif text-lg">No blessings matched your search.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedRelation('All'); }}
              className="mt-3 text-xs text-[#f1df9d] underline cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-10">
            {filteredBlessings.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-white/90 p-5 shadow-xl border border-[#d4af37]/40 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-full ${item.avatarBg || 'bg-[#936492]'} text-white flex items-center justify-center font-bold text-sm shadow-sm`}
                    >
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-[#3b1d3a] text-sm">
                        {item.name}
                      </h4>
                      <span className="text-[11px] text-[#936492] font-medium block">
                        {item.relation}
                      </span>
                    </div>
                  </div>

                  <p className="font-display italic text-[#4a3349] text-sm sm:text-base leading-relaxed my-2">
                    "{item.message}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] text-[#8c748a]">
                  <span>{item.date}</span>
                  <Heart className="w-3.5 h-3.5 text-[#936492] fill-[#936492]/40" />
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
