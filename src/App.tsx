import { useEffect, useState } from 'react';
import { EnvelopeCover } from './components/EnvelopeCover';
import { HeroSection } from './components/HeroSection';
import { ScratchCardReveal } from './components/ScratchCardReveal';
import { CountdownTimer } from './components/CountdownTimer';
import { InvitationDetails } from './components/InvitationDetails';
import { VenueDetails } from './components/VenueDetails';
import { StoryGallery } from './components/StoryGallery';
import { GuestBook } from './components/GuestBook';
import { AllBlessingsView } from './components/AllBlessingsView';
import { AudioPlayer } from './components/AudioPlayer';
import { Footer } from './components/Footer';
import { weddingData, type Blessing } from './data/weddingData';
import { getBlessings } from './services/blessingService';

export function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showAllBlessings, setShowAllBlessings] = useState(false);

  const [blessings, setBlessings] = useState<Blessing[]>([]);
  const [isBlessingsLoading, setIsBlessingsLoading] = useState(true);

  // Load blessings from backend
  useEffect(() => {
    const loadBlessings = async () => {
      try {
        const data = await getBlessings();
        setBlessings(data);
      } catch (error) {
        console.error('Failed to load blessings:', error);
        setBlessings(weddingData.initialBlessings);
      } finally {
        setIsBlessingsLoading(false);
      }
    };

    loadBlessings();
  }, []);

  // Add newly submitted blessing to the current UI
  const handleAddBlessing = (newBlessing: Blessing) => {
    setBlessings((currentBlessings) => [
      newBlessing,
      ...currentBlessings,
    ]);
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
        
        {/* Section 1: Hero & Couple Introduction */}
        <div id="hero">
          <HeroSection />
        </div>

        {/* Section 2: 3-Part Date Reveal Scratch Cards */}
        <ScratchCardReveal />

        {/* Section 3: Live Countdown Timer */}
        <CountdownTimer />

        {/* Section 4: Main Royal Invitation Details & Family Timeline */}
        <InvitationDetails />

        {/* Section 5: Venue Details, Auditorium Showcase & Google Maps */}
        <VenueDetails />

        {/* Section 6: Story in Frames Gallery */}
        <StoryGallery />

        {/* Section 7: Kindly RSVP Form */}

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