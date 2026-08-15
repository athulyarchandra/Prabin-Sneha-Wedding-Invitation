import { useState } from 'react';
import { EnvelopeCover } from './components/EnvelopeCover';
import { HeroSection } from './components/HeroSection';
import { ScratchCardReveal } from './components/ScratchCardReveal';
import { CountdownTimer } from './components/CountdownTimer';
import { InvitationDetails } from './components/InvitationDetails';
import { VenueDetails } from './components/VenueDetails';
import { StoryGallery } from './components/StoryGallery';
import { RSVPSection } from './components/RSVPSection';
import { GuestBook } from './components/GuestBook';
import { AllBlessingsView } from './components/AllBlessingsView';
import { AudioPlayer } from './components/AudioPlayer';
// import { FloatingNav } from './components/FloatingNav';
import { Footer } from './components/Footer';
import { weddingData, type Blessing } from './data/weddingData';

export function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showAllBlessings, setShowAllBlessings] = useState(false);
  const [blessings, setBlessings] = useState<Blessing[]>(() => {
    const saved = localStorage.getItem('wedding_guest_blessings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return weddingData.initialBlessings;
      }
    }
    return weddingData.initialBlessings;
  });

  const handleAddBlessing = (newBlessing: Blessing) => {
    const updated = [newBlessing, ...blessings];
    setBlessings(updated);
    localStorage.setItem('wedding_guest_blessings', JSON.stringify(updated));
  };

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-modern-gradient text-[#2c222b] overflow-x-hidden selection:bg-[#936492] selection:text-white">
      
      {/* Front Royal Envelope Cover with Wax Seal */}
      <EnvelopeCover
        isOpen={isEnvelopeOpen}
        onOpen={handleOpenEnvelope}
      />



      {/* Main Wedding Invitation Experience */}
      <main className="relative z-10">
        
        {/* Section 1: Hero & Couple Introduction (Background Photo Reveal) */}
        <div id="hero">
          <HeroSection />
        </div>

        {/* Section 2: 3-Part Date Reveal Scratch Cards (Horizontal on Mobile & Desktop) */}
        <ScratchCardReveal />

        {/* Section 3: Live Countdown Timer (Horizontal on All Screens) */}
        <CountdownTimer />

        {/* Section 4: Main Royal Invitation Details & Family Timeline */}
        <InvitationDetails />

        {/* Section 5: Venue Details, Auditorium Showcase & Google Maps */}
        <VenueDetails />

        {/* Section 6: Story in Frames Gallery */}
        <StoryGallery />

        {/* Section 7: Kindly RSVP Form */}
        <RSVPSection />

        {/* Section 8: Guest Book & Latest Blessings */}
        <GuestBook
          blessings={blessings}
          onAddBlessing={handleAddBlessing}
          onOpenAllBlessings={() => setShowAllBlessings(true)}
        />

        {/* Section 9: Simple Elegant Footer */}
        <Footer />

      </main>

      {/* Floating Audio Controller */}
      {isEnvelopeOpen && <AudioPlayer />}

      {/* Floating Story Navigation
      {isEnvelopeOpen && <FloatingNav />} */}

      {/* Dedicated All Blessings Full Page Modal */}
      <AllBlessingsView
        isOpen={showAllBlessings}
        onClose={() => setShowAllBlessings(false)}
        blessings={blessings}
        onAddBlessing={handleAddBlessing}
      />

    </div>
  );
}

export default App;
