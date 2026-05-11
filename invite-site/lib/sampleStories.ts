/**
 * Premium Sample Story Content
 * Story-driven wedding invitation content inspired by real celebrity weddings
 * Each story is cinematic, emotional, and aspirational
 */

export interface SampleStory {
  id: string;
  themeSlug: string;
  
  // Card Preview
  cardTeaser: string;
  cardCTA: string;
  
  // Hero
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  
  // Couple Details
  groomName: string;
  brideName: string;
  groomFullName?: string;
  brideFullName?: string;
  city: string;
  venue: string;
  venueAddress?: string;
  
  // Story Sections
  welcomeNote: string;
  ourStoryTitle: string;
  howWeMet: string;
  littleThings: string;
  proposalTitle: string;
  proposalStory: string;
  
  // Family
  groomFamily?: string;
  brideFamily?: string;
  
  // Gallery
  galleryImages: string[];
  galleryCaptions?: string[];
  
  // Events
  events: Array<{
    name: string;
    date: string;
    time: string;
    venue: string;
    description?: string;
  }>;
  
  // Details
  dressCode?: string;
  closingNote: string;
  rsvpText: string;
}

export const SAMPLE_STORIES: SampleStory[] = [
  {
    id: "palace-love",
    themeSlug: "palace-heirloom",
    cardTeaser: "Where royal heritage meets timeless romance — a love story written in gold and whispered through palace halls.",
    cardCTA: "Step into their palace",
    heroTitle: "Maharani Padmini & Prince Vikram",
    heroSubtitle: "Two souls. One royal destiny.",
    heroImage: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1920&q=90",
    groomName: "Vikram",
    brideName: "Padmini",
    groomFullName: "Prince Vikram Singh Rathore",
    brideFullName: "Maharani Padmini Devi",
    city: "Udaipur",
    venue: "The City Palace, Udaipur",
    venueAddress: "City Palace Complex, Lake Palace Road, Udaipur, Rajasthan",
    welcomeNote: "With hearts full of joy and blessings from our families, we invite you to witness the union of two souls destined to rule together — not kingdoms, but hearts. Join us as we celebrate love, tradition, and the beginning of our forever.",
    ourStoryTitle: "A Love Written in the Stars",
    howWeMet: "Ours was not a chance meeting, but a destiny woven centuries ago. We first crossed paths at the Royal Heritage Festival in Jaipur, where Vikram was delivering a speech on preserving India's cultural legacy, and Padmini was showcasing her family's collection of Mughal art. A single glance across the Durbar Hall, and time stood still. What began as conversations about history turned into the greatest love story of our lives.",
    littleThings: "Vikram loves how Padmini hums old ghazals while arranging flowers. Padmini adores how Vikram recites Urdu poetry at sunset. Together, they lose track of time walking through ancient palace corridors, imagining the love stories whispered in those very halls centuries before them.",
    proposalTitle: "The Night He Asked Forever",
    proposalStory: "Under a sky painted with a thousand stars, beside the shimmering Lake Pichola, Vikram took Padmini's hands and said, 'Every king needs a queen, but I need you — not to rule beside me, but to give meaning to my every breath.' He knelt with a family heirloom ring, crafted in 1857, and asked her to be his forever. Through tears and laughter, she said yes.",
    groomFamily: "Son of Late Maharaja Mahendra Singh Rathore & Maharani Rukmini Devi",
    brideFamily: "Daughter of Shri Rajendra Kumar & Smt. Lakshmi Devi",
    galleryImages: [
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1464503459993-c2592b9b85ab?auto=format&fit=crop&w=800&q=85",
    ],
    events: [
      {
        name: "Mehendi & Sangeet",
        date: "Friday, 15th March 2026",
        time: "6:00 PM onwards",
        venue: "Durbar Hall, City Palace",
        description: "An evening of music, dance, and royal celebrations"
      },
      {
        name: "Haldi Ceremony",
        date: "Saturday, 16th March 2026",
        time: "10:00 AM",
        venue: "Zenana Mahal, City Palace",
        description: "A morning of blessings and golden traditions"
      },
      {
        name: "Wedding Ceremony",
        date: "Saturday, 16th March 2026",
        time: "7:00 PM",
        venue: "Royal Courtyard, City Palace",
        description: "Witness the union of two royal souls"
      },
      {
        name: "Grand Reception",
        date: "Sunday, 17th March 2026",
        time: "7:30 PM",
        venue: "Jag Mandir Palace",
        description: "A royal celebration under the stars"
      }
    ],
    dressCode: "Royal Indian formal attire — Sherwani, Lehenga, or Saree in jewel tones",
    closingNote: "Your presence would be the greatest gift as we begin this new chapter. We cannot wait to celebrate with you amidst the grandeur of our heritage and the warmth of our love.",
    rsvpText: "Kindly honor us with your presence"
  },

  {
    id: "parisian-dream",
    themeSlug: "paris-romance",
    cardTeaser: "From café conversations to forever promises — a love story as timeless as Paris itself.",
    cardCTA: "Enter their Parisian dream",
    heroTitle: "Amélie & Étienne",
    heroSubtitle: "L'amour trouve toujours son chemin",
    heroImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=90",
    groomName: "Étienne",
    brideName: "Amélie",
    groomFullName: "Étienne Laurent Dubois",
    brideFullName: "Amélie Claire Moreau",
    city: "Paris",
    venue: "Pavillon de la Reine, Place des Vosges",
    venueAddress: "28 Place des Vosges, 75003 Paris, France",
    welcomeNote: "With hearts overflowing with love and gratitude, we invite you to join us in the City of Lights as we say 'oui' to forever. Our journey began on these cobblestone streets, and now we return to celebrate where it all started.",
    ourStoryTitle: "How Paris Became Ours",
    howWeMet: "It was a rainy October afternoon at Café de Flore in Saint-Germain. Amélie had just missed her train, seeking shelter with a book and espresso. Étienne, a photographer capturing Paris in the rain, asked if he could photograph her silhouette by the window. She said yes. That photograph now hangs in their apartment — a permanent reminder that some of life's best moments are unplanned.",
    littleThings: "Étienne loves how Amélie dances in the kitchen while making croissants. Amélie adores how Étienne leaves handwritten poetry on her pillow. Their Sundays are spent wandering Montmartre, getting lost on purpose, and finding new reasons to fall deeper in love.",
    proposalTitle: "The Bridge Where He Knelt",
    proposalStory: "On the Pont des Arts, at sunset, with the Seine shimmering below and the Eiffel Tower glowing in the distance, Étienne took Amélie's hand and said, 'You are my home, my muse, my every beautiful thing.' He presented a vintage Cartier ring that once belonged to his grandmother, and asked her to be his forever. She whispered 'oui' through tears, and Paris celebrated with them.",
    groomFamily: "Son of Philippe & Margot Dubois",
    brideFamily: "Daughter of Antoine & Isabelle Moreau",
    galleryImages: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=800&q=85",
    ],
    events: [
      {
        name: "Welcome Dinner",
        date: "Friday, 12th June 2026",
        time: "7:30 PM",
        venue: "Le Jules Verne, Eiffel Tower",
        description: "An intimate evening overlooking Paris"
      },
      {
        name: "Wedding Ceremony",
        date: "Saturday, 13th June 2026",
        time: "4:00 PM",
        venue: "Pavillon de la Reine",
        description: "Exchange of vows in the heart of Le Marais"
      },
      {
        name: "Reception Soirée",
        date: "Saturday, 13th June 2026",
        time: "8:00 PM",
        venue: "Château de Versailles",
        description: "A night of champagne, music, and Parisian magic"
      }
    ],
    dressCode: "Black tie elegance with a touch of Parisian chic",
    closingNote: "Your presence is the greatest gift. Come celebrate love, laughter, and the magic of Paris with us.",
    rsvpText: "Please join us in saying oui to love"
  },

  {
    id: "tuscan-vineyard",
    themeSlug: "tuscany-vineyard",
    cardTeaser: "Where golden hills meet endless love — a Tuscan romance aged to perfection.",
    cardCTA: "Wander their vineyard",
    heroTitle: "Isabella & Marco",
    heroSubtitle: "Amore sotto il sole toscano",
    heroImage: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=1920&q=90",
    groomName: "Marco",
    brideName: "Isabella",
    groomFullName: "Marco Antonio Rossi",
    brideFullName: "Isabella Sofia Conti",
    city: "Tuscany",
    venue: "Villa Cora, Florence",
    venueAddress: "Viale Machiavelli 18, 50125 Florence, Italy",
    welcomeNote: "Under the Tuscan sun, where olive trees whisper ancient secrets and vineyards stretch to the horizon, we found our forever. Join us as we celebrate love, family, and the beginning of our dolce vita together.",
    ourStoryTitle: "Love Among the Vines",
    howWeMet: "Isabella was a sommelier from Florence, visiting Chianti to study regional wine-making. Marco owned a small family vineyard where his grandfather had made wine for 60 years. She arrived for a tasting tour, and he poured her a glass of Sangiovese from 1962 — the year his grandparents married. They talked until sunset, and she never left. That vineyard is now theirs.",
    littleThings: "Marco loves how Isabella sings old Italian folk songs while cooking. Isabella adores how Marco writes her love notes in wine labels. Every Sunday, they walk through the vineyard at golden hour, hand in hand, grateful for every moment together.",
    proposalTitle: "Under the Olive Trees",
    proposalStory: "On a warm September evening, under their oldest olive tree — planted the day his grandfather was born — Marco took Isabella's hand and said, 'You are the sweetest thing I've ever tasted, better than any wine I'll ever make.' He presented a ring set with a Tuscan fire opal, and asked her to grow old with him among these hills. She said sì, and the vineyard celebrated with them.",
    groomFamily: "Son of Giovanni & Francesca Rossi",
    brideFamily: "Daughter of Alessandro & Sofia Conti",
    galleryImages: [
      "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1470072768013-bf9532fb3c6e?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=85",
    ],
    events: [
      {
        name: "Welcome Aperitivo",
        date: "Friday, 20th September 2026",
        time: "6:00 PM",
        venue: "Rossi Family Vineyard",
        description: "Wine tasting and sunset in the hills"
      },
      {
        name: "Wedding Ceremony",
        date: "Saturday, 21st September 2026",
        time: "5:00 PM",
        venue: "Villa Cora Gardens",
        description: "Vows under the ancient olive trees"
      },
      {
        name: "La Festa",
        date: "Saturday, 21st September 2026",
        time: "8:00 PM",
        venue: "Villa Cora Terrace",
        description: "A Tuscan feast under the stars"
      }
    ],
    dressCode: "Rustic elegance — earthy tones, linen, and Italian countryside charm",
    closingNote: "Come celebrate la dolce vita with us, where love tastes like wine and every moment is golden.",
    rsvpText: "Please join us for amore and vino"
  },

  {
    id: "santorini-shores",
    themeSlug: "santorini-sunset",
    cardTeaser: "Where the Aegean whispers forever — a love as endless as the Mediterranean sky.",
    cardCTA: "Discover their Santorini",
    heroTitle: "Elena & Nikos",
    heroSubtitle: "Αγάπη κάτω από τον ουρανό της Σαντορίνης",
    heroImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1920&q=90",
    groomName: "Nikos",
    brideName: "Elena",
    groomFullName: "Nikos Andreas Papadopoulos",
    brideFullName: "Elena Maria Dimitriou",
    city: "Santorini",
    venue: "Canaves Oia Suites",
    venueAddress: "Oia, Santorini 84702, Greece",
    welcomeNote: "With the Aegean as our witness and the whitewashed cliffs as our altar, we invite you to celebrate the love that was written in the stars and sealed by the sea. Join us on this island of dreams as we promise forever.",
    ourStoryTitle: "Where the Sea Met the Sky",
    howWeMet: "Elena was a travel photographer from Athens, visiting Santorini to capture the famous sunset. Nikos owned a small boat tour company, showing visitors the island's hidden coves. She booked his sunset cruise, and as the sky turned gold and pink, he told her, 'Some sunsets are so beautiful, you never forget where you were.' She photographed that moment, and it became the first of a thousand more they'd witness together.",
    littleThings: "Nikos loves how Elena collects seashells from every beach they visit. Elena adores how Nikos plays the bouzouki and sings old Greek love songs. Every evening, they watch the sunset together — a ritual as sacred as prayer.",
    proposalTitle: "The Sunset He'll Never Forget",
    proposalStory: "On the cliffs of Oia, with the caldera glowing beneath the setting sun, Nikos took Elena's hand and said, 'I've shown a thousand people this view, but with you, I finally see it.' He knelt with a ring carved from local Santorini stone and gold, and asked her to be his forever. As the sun dipped below the horizon, she said yes, and the island celebrated with them.",
    groomFamily: "Son of Andreas & Maria Papadopoulos",
    brideFamily: "Daughter of Dimitrios & Sophia Dimitriou",
    galleryImages: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=800&q=85",
    ],
    events: [
      {
        name: "Welcome Dinner",
        date: "Friday, 5th July 2026",
        time: "8:00 PM",
        venue: "Ambrosia Restaurant, Oia",
        description: "Traditional Greek feast by the caldera"
      },
      {
        name: "Wedding Ceremony",
        date: "Saturday, 6th July 2026",
        time: "6:30 PM",
        venue: "Canaves Oia Infinity Pool Terrace",
        description: "Vows at sunset, overlooking the Aegean"
      },
      {
        name: "Reception Under the Stars",
        date: "Saturday, 6th July 2026",
        time: "9:00 PM",
        venue: "Canaves Oia Suites",
        description: "Dancing, music, and Mediterranean magic"
      }
    ],
    dressCode: "Coastal elegance — whites, blues, and flowing fabrics",
    closingNote: "Your presence is our greatest blessing. Come celebrate where the sea meets the sky and love knows no end.",
    rsvpText: "Join us by the Aegean"
  },

  {
    id: "bollywood-nights",
    themeSlug: "bollywood-sangeet",
    cardTeaser: "From filmi romance to forever love — a story as dramatic and beautiful as a Bollywood blockbuster.",
    cardCTA: "Enter their cinematic world",
    heroTitle: "Kiara & Ranvijay",
    heroSubtitle: "Ek prem kahani, filmi si, magar asli",
    heroImage: "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&w=1920&q=90",
    groomName: "Ranvijay",
    brideName: "Kiara",
    groomFullName: "Ranvijay Singh Rathore",
    brideFullName: "Kiara Malhotra",
    city: "Delhi",
    venue: "The Leela Palace, New Delhi",
    venueAddress: "Diplomatic Enclave, Chanakyapuri, New Delhi 110023",
    welcomeNote: "Lights, camera, love! Our story started like a Bollywood film — dramatic, unexpected, and filled with music. Now we invite you to witness the grand finale: our happily ever after. Get ready for a celebration as bold, vibrant, and unforgettable as our love.",
    ourStoryTitle: "When Filmi Met Reality",
    howWeMet: "Kiara was a Bollywood choreographer working on a period film. Ranvijay was the lead actor — brooding, intense, and utterly committed to his craft. During a romantic dance sequence, their eyes met, and what was supposed to be acting turned into something far more real. The director called 'cut,' but their story had just begun. That dance scene? It's still their favorite.",
    littleThings: "Ranvijay loves how Kiara choreographs their life — every moment feels like a perfectly timed sequence. Kiara adores how Ranvijay recites classic Bollywood dialogues to make her laugh. They have a playlist of 547 Bollywood love songs, and they've slow-danced to every single one.",
    proposalTitle: "The Scene He Couldn't Rehearse",
    proposalStory: "On the sets of their film, after the final shot wrapped, Ranvijay asked the crew to stay. He dimmed the lights, played 'Tum Hi Ho,' took Kiara's hand, and said, 'Every great film has a sequel. Be mine?' He knelt with a ring that sparkled brighter than any spotlight, and she said yes. The entire crew applauded, and Kiara cried happy tears for the first time on that set.",
    groomFamily: "Son of Lt. Col. Vikram Singh Rathore & Dr. Anjali Rathore",
    brideFamily: "Daughter of Mr. Rajiv Malhotra & Mrs. Priya Malhotra",
    galleryImages: [
      "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1464503459993-c2592b9b85ab?auto=format&fit=crop&w=800&q=85",
    ],
    events: [
      {
        name: "Bollywood Sangeet Night",
        date: "Thursday, 8th May 2026",
        time: "7:00 PM onwards",
        venue: "The Leela Grand Ballroom",
        description: "Performances, dance battles, and filmi magic"
      },
      {
        name: "Mehendi & Cocktails",
        date: "Friday, 9th May 2026",
        time: "4:00 PM",
        venue: "The Leela Garden Pavilion",
        description: "Mehendi artists, signature cocktails, and Bollywood beats"
      },
      {
        name: "Wedding Ceremony",
        date: "Saturday, 10th May 2026",
        time: "7:00 PM",
        venue: "The Leela Durbar Hall",
        description: "A dramatic, cinematic union"
      },
      {
        name: "After-Party",
        date: "Saturday, 10th May 2026",
        time: "11:00 PM onwards",
        venue: "The Leela Rooftop",
        description: "DJ, dancing, and a Bollywood night to remember"
      }
    ],
    dressCode: "Bollywood glam — bold colors, sequins, and dramatic flair",
    closingNote: "Get ready for the wedding event of the year. Come dressed to dazzle, ready to dance, and prepared to witness a love story that deserves its own soundtrack.",
    rsvpText: "Join us for our blockbuster celebration"
  },

  {
    id: "garden-romance",
    themeSlug: "roses-luxury",
    cardTeaser: "Where roses bloom and hearts intertwine — a love story as timeless as a garden in spring.",
    cardCTA: "Walk through their garden",
    heroTitle: "Meera & Aarav",
    heroSubtitle: "Pyaar ka phool, dil ka bahaar",
    heroImage: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1920&q=90",
    groomName: "Aarav",
    brideName: "Meera",
    groomFullName: "Aarav Sharma",
    brideFullName: "Meera Verma",
    city: "Udaipur",
    venue: "Saheliyon Ki Bari, Udaipur",
    venueAddress: "Saheli Marg, Udaipur, Rajasthan 313001",
    welcomeNote: "In a garden where roses bloom eternal and love whispers through every petal, we found our forever. Join us as we celebrate the beginning of our beautiful journey together — a love story written in flowers.",
    ourStoryTitle: "Love in Full Bloom",
    howWeMet: "Meera was a botanist, researching heirloom roses at Udaipur's historic gardens. Aarav was an architect restoring the garden's ancient fountains. She asked if he could help preserve a section without disturbing a rare climbing rose. He said yes, and they spent every afternoon working side by side. When that rose finally bloomed, he told her, 'Some things are worth waiting for.' He meant her.",
    littleThings: "Aarav loves how Meera presses flowers from every date they've ever been on. Meera adores how Aarav sketches architectural plans for their dream home, always with a garden at the center. They plant a new rose bush every anniversary — their love, forever growing.",
    proposalTitle: "Among the Roses",
    proposalStory: "In the garden where they first met, surrounded by a thousand blooming roses, Aarav knelt and said, 'You've taught me that the most beautiful things take time, care, and patience. Will you grow old with me?' He presented a ring with a rosette-cut diamond, and she said yes as petals fell around them like confetti. That garden is now their favorite place on earth.",
    groomFamily: "Son of Mr. Rajesh Sharma & Mrs. Kavita Sharma",
    brideFamily: "Daughter of Dr. Anil Verma & Mrs. Sunita Verma",
    galleryImages: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1464503459993-c2592b9b85ab?auto=format&fit=crop&w=800&q=85",
    ],
    events: [
      {
        name: "Mehendi Afternoon",
        date: "Friday, 22nd February 2026",
        time: "2:00 PM",
        venue: "Saheliyon Ki Bari",
        description: "Mehendi, music, and garden magic"
      },
      {
        name: "Sangeet Evening",
        date: "Friday, 22nd February 2026",
        time: "7:00 PM",
        venue: "Lake Pichola Pavilion",
        description: "An evening of song, dance, and celebration"
      },
      {
        name: "Wedding Ceremony",
        date: "Saturday, 23rd February 2026",
        time: "6:00 PM",
        venue: "Rose Garden, Saheliyon Ki Bari",
        description: "Vows among a thousand roses"
      }
    ],
    dressCode: "Garden elegance — floral prints, pastels, and romantic charm",
    closingNote: "Come celebrate love in full bloom. Your presence would be the most beautiful gift.",
    rsvpText: "Bloom with us on our special day"
  },

  {
    id: "editorial-chic",
    themeSlug: "ivory-monogram",
    cardTeaser: "Where timeless elegance meets modern romance — a love story written in classic style.",
    cardCTA: "Discover their elegance",
    heroTitle: "Nisha & Aditya",
    heroSubtitle: "A love story, classically told",
    heroImage: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1920&q=90",
    groomName: "Aditya",
    brideName: "Nisha",
    groomFullName: "Aditya Khanna",
    brideFullName: "Nisha Kapoor",
    city: "Bangalore",
    venue: "Taj West End, Bangalore",
    venueAddress: "Race Course Road, Bangalore 560001",
    welcomeNote: "With grace, gratitude, and timeless love, we invite you to witness the union of two souls who found forever in each other. Join us for a celebration as elegant and enduring as our love.",
    ourStoryTitle: "Elegance Meets Forever",
    howWeMet: "Nisha was a fashion editor for a luxury magazine, attending a product launch at Bangalore's most exclusive boutique. Aditya was a brand consultant working on the event. They both reached for the same champagne flute, laughed at the coincidence, and spent the entire evening in conversation. He walked her home under the stars, and she knew — this was the beginning of something beautiful.",
    littleThings: "Aditya loves how Nisha always wears pearls, even with jeans. Nisha adores how Aditya writes her handwritten notes on their anniversary paper. They collect vintage books together, and their favorite Sunday activity is browsing old bookstores, hand in hand.",
    proposalTitle: "A Perfectly Classic Moment",
    proposalStory: "At their favorite bookstore, surrounded by the smell of old paper and memories, Aditya got down on one knee and said, 'I want every chapter of my life to be written with you.' He presented a vintage Art Deco engagement ring, and she said yes through happy tears. They sealed it with a kiss, and the bookstore owner applauded from behind the counter.",
    groomFamily: "Son of Mr. Rajiv Khanna & Mrs. Meena Khanna",
    brideFamily: "Daughter of Mr. Sanjay Kapoor & Mrs. Anjali Kapoor",
    galleryImages: [
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1464503459993-c2592b9b85ab?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=85",
    ],
    events: [
      {
        name: "Cocktail Evening",
        date: "Friday, 14th November 2025",
        time: "7:00 PM",
        venue: "Taj West End Lawns",
        description: "An evening of cocktails and celebration"
      },
      {
        name: "Wedding Ceremony",
        date: "Saturday, 15th November 2025",
        time: "6:30 PM",
        venue: "Taj West End Grand Ballroom",
        description: "A timeless union"
      },
      {
        name: "Reception Dinner",
        date: "Saturday, 15th November 2025",
        time: "8:30 PM",
        venue: "Taj West End Terrace",
        description: "An elegant evening under the stars"
      }
    ],
    dressCode: "Black tie elegance — classic formal attire",
    closingNote: "Your presence is the finest gift. Join us for a celebration of timeless love and enduring elegance.",
    rsvpText: "Grace us with your presence"
  },

  {
    id: "modern-luxury",
    themeSlug: "modern-gold",
    cardTeaser: "Where contemporary style meets eternal love — a bold, modern romance for the ages.",
    cardCTA: "Explore their modern love",
    heroTitle: "Riya & Sahil",
    heroSubtitle: "Contemporary love. Timeless promise.",
    heroImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1920&q=90",
    groomName: "Sahil",
    brideName: "Riya",
    groomFullName: "Sahil Mehta",
    brideFullName: "Riya Desai",
    city: "Pune",
    venue: "JW Marriott, Pune",
    venueAddress: "Senapati Bapat Road, Pune 411053",
    welcomeNote: "With bold hearts and modern spirits, we invite you to celebrate a love that defies convention and embraces forever. Join us for a wedding as contemporary, confident, and unforgettable as our journey together.",
    ourStoryTitle: "Bold Meets Beautiful",
    howWeMet: "Riya was a tech entrepreneur pitching at a startup accelerator in Pune. Sahil was a venture capitalist in the audience, intrigued not just by her idea but by the fire in her eyes. After her presentation, he approached her with feedback — and his number. Their first date lasted 8 hours, and they've been inseparable ever since.",
    littleThings: "Sahil loves how Riya codes while listening to 90s hip-hop. Riya adores how Sahil makes her coffee every morning, perfectly. They run together at sunrise, debate tech trends over dinner, and build their dreams side by side.",
    proposalTitle: "A Modern Fairytale",
    proposalStory: "On the rooftop of Pune's most iconic skyscraper, under a sky full of stars and city lights, Sahil took Riya's hand and said, 'You're the best investment I'll ever make.' He presented a sleek, modern platinum ring with a flawless solitaire, and asked her to be his co-founder in life. She said yes, and they toasted with champagne as the city celebrated below.",
    groomFamily: "Son of Mr. Arvind Mehta & Mrs. Neeta Mehta",
    brideFamily: "Daughter of Mr. Karan Desai & Mrs. Pooja Desai",
    galleryImages: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1464503459993-c2592b9b85ab?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=85",
    ],
    events: [
      {
        name: "Welcome Drinks",
        date: "Friday, 18th October 2025",
        time: "8:00 PM",
        venue: "JW Marriott Skybar",
        description: "Cocktails and skyline views"
      },
      {
        name: "Wedding Ceremony",
        date: "Saturday, 19th October 2025",
        time: "7:00 PM",
        venue: "JW Marriott Grand Ballroom",
        description: "A modern celebration of love"
      },
      {
        name: "After-Party",
        date: "Saturday, 19th October 2025",
        time: "10:30 PM onwards",
        venue: "JW Marriott Rooftop",
        description: "DJ, dancing, and city lights"
      }
    ],
    dressCode: "Contemporary formal — sleek, bold, and confident",
    closingNote: "Come celebrate a modern love story. Your presence is the ultimate upgrade.",
    rsvpText: "Join us in redefining forever"
  },

  {
    id: "pastel-dream",
    themeSlug: "pastel-garden",
    cardTeaser: "Where soft hues paint forever — a gentle love story in watercolor and warmth.",
    cardCTA: "Enter their pastel dream",
    heroTitle: "Kavya & Rohan",
    heroSubtitle: "Soft colors. Endless love.",
    heroImage: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=1920&q=90",
    groomName: "Rohan",
    brideName: "Kavya",
    groomFullName: "Rohan Malhotra",
    brideFullName: "Kavya Nair",
    city: "Chandigarh",
    venue: "The Oberoi Sukhvilas, Chandigarh",
    venueAddress: "Siswan Forest Range, New Chandigarh 140901",
    welcomeNote: "In soft pastels and gentle whispers, we found a love that speaks louder than words. Join us as we celebrate the beginning of our forever — a story painted in kindness, joy, and endless warmth.",
    ourStoryTitle: "A Gentle Love",
    howWeMet: "Kavya was a watercolor artist teaching workshops in Chandigarh. Rohan was a teacher who signed up for her class, hoping to unwind after stressful weeks. She taught him how to blend colors, and he taught her how to laugh again. By the end of the workshop, they'd created not just art, but something far more beautiful — a connection neither wanted to let go of.",
    littleThings: "Rohan loves how Kavya paints little watercolor cards for him on random days. Kavya adores how Rohan reads to her every night before bed. They collect pressed flowers, take long walks in botanical gardens, and dream in soft hues.",
    proposalTitle: "Painted in Love",
    proposalStory: "In her art studio, surrounded by her paintings and the smell of fresh watercolor, Rohan knelt and said, 'You've taught me to see the world in color. Will you paint the rest of our lives together?' He presented a ring with a pastel sapphire, and she said yes, tears streaming down her face. That painting now hangs in their home — a reminder of the day everything changed.",
    groomFamily: "Son of Mr. Vinay Malhotra & Mrs. Rekha Malhotra",
    brideFamily: "Daughter of Mr. Suresh Nair & Mrs. Maya Nair",
    galleryImages: [
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1464503459993-c2592b9b85ab?auto=format&fit=crop&w=800&q=85",
    ],
    events: [
      {
        name: "Mehendi Garden Party",
        date: "Friday, 6th March 2026",
        time: "3:00 PM",
        venue: "The Oberoi Garden Lawns",
        description: "Pastel perfection in a garden setting"
      },
      {
        name: "Sangeet Evening",
        date: "Friday, 6th March 2026",
        time: "7:00 PM",
        venue: "The Oberoi Ballroom",
        description: "Music, dance, and gentle celebration"
      },
      {
        name: "Wedding Ceremony",
        date: "Saturday, 7th March 2026",
        time: "6:00 PM",
        venue: "The Oberoi Forest Pavilion",
        description: "Vows among nature's pastel palette"
      }
    ],
    dressCode: "Pastel elegance — soft pinks, lavenders, mints, and gentle hues",
    closingNote: "Come celebrate a love painted in softness and sealed in joy. Your presence is our greatest blessing.",
    rsvpText: "Join us in our pastel paradise"
  },

  {
    id: "beach-paradise",
    themeSlug: "beach-destination",
    cardTeaser: "Where waves whisper forever — a coastal love story written in sand and sealed by the sea.",
    cardCTA: "Walk their beach",
    heroTitle: "Zara & Arjun",
    heroSubtitle: "Love. Tide. Forever.",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=90",
    groomName: "Arjun",
    brideName: "Zara",
    groomFullName: "Arjun Reddy",
    brideFullName: "Zara Khan",
    city: "Goa",
    venue: "Taj Exotica, Goa",
    venueAddress: "Calwaddo, Benaulim, Goa 403716",
    welcomeNote: "With the ocean as our witness and the horizon as our promise, we invite you to celebrate a love as endless as the sea. Join us on the shores where our forever began.",
    ourStoryTitle: "Salt, Sand, and Soulmates",
    howWeMet: "Zara was a marine biologist researching coral reefs off the coast of Goa. Arjun was a scuba instructor who led her dive expeditions. Underwater, surrounded by colorful fish and swaying coral, they communicated in hand signals and shared glances. On the surface, they talked for hours about the ocean, life, and dreams. By the end of the expedition, they'd discovered something far more valuable than research — each other.",
    littleThings: "Arjun loves how Zara collects seashells from every beach they visit. Zara adores how Arjun plays the guitar by the bonfire at sunset. Every year, they return to the reef where they first dove together — a pilgrimage to the place where it all began.",
    proposalTitle: "The Tide That Changed Everything",
    proposalStory: "At sunset, on their favorite beach, Arjun wrote 'Marry me?' in the sand. As Zara approached, he knelt with a ring carved from mother-of-pearl and gold, and said, 'The ocean brought us together. Let it witness our forever.' She said yes as the waves washed over their feet, and they kissed as the sun dipped below the horizon.",
    groomFamily: "Son of Mr. Ravi Reddy & Mrs. Lakshmi Reddy",
    brideFamily: "Daughter of Mr. Imran Khan & Mrs. Ayesha Khan",
    galleryImages: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=800&q=85",
    ],
    events: [
      {
        name: "Beach Welcome Party",
        date: "Friday, 25th April 2026",
        time: "6:00 PM",
        venue: "Taj Exotica Beach",
        description: "Bonfire, cocktails, and sunset vibes"
      },
      {
        name: "Mehendi by the Sea",
        date: "Saturday, 26th April 2026",
        time: "3:00 PM",
        venue: "Taj Exotica Pool Deck",
        description: "Beachside mehendi and music"
      },
      {
        name: "Beach Wedding Ceremony",
        date: "Saturday, 26th April 2026",
        time: "6:30 PM",
        venue: "Taj Exotica Beach",
        description: "Vows at sunset, by the ocean"
      },
      {
        name: "Reception Under the Stars",
        date: "Saturday, 26th April 2026",
        time: "9:00 PM",
        venue: "Taj Exotica Beachfront",
        description: "Dancing, music, and coastal magic"
      }
    ],
    dressCode: "Coastal elegance — breezy fabrics, tropical colors, beach chic",
    closingNote: "Come celebrate where the land meets the sea and love knows no bounds. Your presence is our greatest treasure.",
    rsvpText: "Sail into our celebration"
  },
];

/**
 * Helper function to get story by theme slug
 */
export function getStoryBySlug(themeSlug: string): SampleStory | undefined {
  return SAMPLE_STORIES.find(story => story.themeSlug === themeSlug);
}

/**
 * Helper function to check if a theme has a story
 */
export function hasStory(themeSlug: string): boolean {
  return SAMPLE_STORIES.some(story => story.themeSlug === themeSlug);
}
