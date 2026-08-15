export interface WeddingEvent {
  id: string;
  title: string;
  subTitle?: string;
  time: string;
  venue: string;
  address: string;
  mapQuery: string;
  description: string;
  iconName: string;
  dressCode?: string;
}

export interface Blessing {
  id: string;
  name: string;
  relation: string;
  message: string;
  date: string;
  avatarBg?: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  aspect?: string;
}

export const weddingData = {
  couple: {
    groom: {
      name: "Prabin",
      fullName: "Prabin Sharma",
      title: "The Groom",
      parents: "Mr.Prasanth kumar SK & Mrs. Biaetreese R",
      parentsSubtitle: "Parents of Prabin",
      quote: "Together with our families, we invite you to share in the joy of our union."
    },
    bride: {
      name: "Sneha",
      fullName: "Sneha Menon",
      title: "The Bride",
      parents: "Mr. Vinu P & Mrs. Mini MK",
      parentsSubtitle: "Parents of Sneha",
      quote: "We exchange vows and begin a new chapter of love, laughter, and forever."
    },
    initials: "P & S",
    tagline: "Together with our families",
    subtagline: "With the blessings of the Almighty and our beloved parents, we invite you to share in the joy of our union as we exchange vows and begin a new chapter of love, laughter, and forever.",
    hashtag: "#PrabinWedsSneha",
  },
  date: {
    day: "07",
    month: "September",
    year: "2026",
    dayOfWeek: "Sunday",
    formattedFull: "Sunday, 7 September 2026",
    targetIsoDate: "2026-09-07T10:00:00+05:30",
  },
  events: [
    {
      id: "registration",
      title: "Marriage Registration",
      subTitle: "Solemn Union & Exchange of Vows",
      time: "10:00 AM onwards",
      venue: "Kumaranellur Register Office",
      address: "Kumaranellur, Palakkad / Malappuram Border, Kerala, India",
      mapQuery: "Kumaranellur Sub Registrar Office, Kerala",
      description: "With the blessings of our parents, we officially register our marriage and begin our lifelong journey.",
      iconName: "FileCheck",
    },
    {
      id: "reception",
      title: "Wedding Function & Grand Feast",
      subTitle: "Celebration with Family & Friends",
      time: "12:00 PM – 3:00 PM",
      venue: "NAS Auditorium, Kumbidi",
      address: "Kumbidi, Pattambi Taluk, Palakkad District, Kerala 679533",
      mapQuery: "NAS Auditorium, Kumbidi, Kerala",
      description: "Join us for an afternoon of joyous celebration, music, delightful traditional cuisine, and cherished memories.",
      iconName: "Sparkles",
    },
  ] as WeddingEvent[],
  primaryVenue: {
    name: "NAS Auditorium, Kumbidi",
    heading: "The Celebration Venue",
    description: "Nestled in the serene landscape of Kumbidi, NAS Auditorium offers an elegant and spacious hall where we welcome all our beloved family and friends for the grand wedding celebration and feast.",
    address: "Kumbidi - Thrissur / Palakkad Road, Kumbidi, Kerala 679533",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15674.321683492817!2d75.9818816!3d10.8434863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7b931e9c2b4c1%3A0x6b801a6136d071a5!2sKumbidi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=NAS+Auditorium+Kumbidi+Kerala",
    image: "/images/auditorium.png",
  },
  photos: {
    hero: "/images/couple-hero.png",
    gallery: [
      { id: "1", url: "/images/couple-hero.png", caption: "The beginning of our journey", aspect: "aspect-[4/5]" },
      { id: "2", url: "/images/gallery-2.png", caption: "Laughter in every heartbeat", aspect: "aspect-[4/3]" },
      { id: "3", url: "/images/gallery-3.png", caption: "A walk towards forever", aspect: "aspect-[4/5]" },
      { id: "4", url: "/images/gallery-4.png", caption: "Golden sunset memories", aspect: "aspect-[4/3]" },
      { id: "5", url: "/images/gallery-5.png", caption: "Cherished celebrations", aspect: "aspect-[4/5]" },
      { id: "6", url: "/images/gallery-6.png", caption: "Ready for our big day", aspect: "aspect-[4/4]" },
    ] as GalleryPhoto[],
  },
  rsvp: {
    deadline: "1st September",
    contactEmail: "prabin.sneha.wedding@gmail.com",
    contactPhone: "+91 98765 43210",
  },
  initialBlessings: [

  ] as Blessing[],
  footer: {
    coupleNames: "Prabin & Sneha",
    dateVenue: "Sunday, 7 September · Kerala, India",
    loveNote: "Made with love ❤︎",
  }
};
