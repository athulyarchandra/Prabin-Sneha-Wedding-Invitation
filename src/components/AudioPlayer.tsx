import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { romanticAudio } from '../utils/audioSynth';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    const checkStatus = () => {
      setIsPlaying(romanticAudio.getIsPlaying());
    };
    const interval = setInterval(checkStatus, 500);
    return () => clearInterval(interval);
  }, []);

 const handleTogglePlay = async () => {
  const playing = await romanticAudio.toggle();
  setIsPlaying(playing);
};

  const handleToggleMute = () => {
    const muted = romanticAudio.toggleMute();
    setIsMuted(muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    romanticAudio.setVolume(val / 100);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      
      {/* Volume Slider Flyout */}
      {showVolume && (
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-2 rounded-full shadow-lg border border-[#936492]/30 animate-fadeIn">
          <button
            onClick={handleToggleMute}
            className="text-[#936492] hover:text-[#5c355b] cursor-pointer"
            aria-label="Toggle mute"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-16 sm:w-20 h-1.5 bg-[#f4ecf3] accent-[#936492] rounded-lg cursor-pointer"
          />
        </div>
      )}

      {/* Main Floating Music Pill */}
      <div className="flex items-center gap-1.5 bg-linear-to-r from-[#936492] to-[#754474] text-white p-1.5 pr-4 rounded-full shadow-[0_8px_20px_rgba(147,100,146,0.4)] border border-[#f1df9d]/50 backdrop-blur-md">
        
        {/* Play/Pause Circle Button */}
        <button
          onClick={handleTogglePlay}
          className="w-9 h-9 rounded-full bg-white text-[#936492] flex items-center justify-center shadow-md hover:scale-105 transition-all cursor-pointer"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-[#936492]" />
          ) : (
            <Play className="w-4 h-4 fill-[#936492] translate-x-0.5" />
          )}
        </button>

        {/* Music Animated Bars */}
        <div
          onClick={() => setShowVolume(!showVolume)}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <div className="flex items-end gap-0.5 h-4">
            <span
              className={`w-0.5 bg-[#f1df9d] rounded-full transition-all duration-300 ${
                isPlaying ? 'h-4 animate-[pulse_0.6s_ease-in-out_infinite]' : 'h-1'
              }`}
            />
            <span
              className={`w-0.5 bg-[#f1df9d] rounded-full transition-all duration-300 ${
                isPlaying ? 'h-3 animate-[pulse_0.8s_ease-in-out_infinite_0.2s]' : 'h-1'
              }`}
            />
            <span
              className={`w-0.5 bg-[#f1df9d] rounded-full transition-all duration-300 ${
                isPlaying ? 'h-4 animate-[pulse_0.5s_ease-in-out_infinite_0.4s]' : 'h-1'
              }`}
            />
          </div>

          <span className="text-[11px] font-semibold tracking-wider text-[#fbf6e2] hidden sm:inline">
            {isPlaying ? 'Wedding Melody' : 'Play Music'}
          </span>
        </div>

      </div>

    </div>
  );
};
