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
    id: "sidharth-kiara",
    themeSlug: "palace-heirloom",
    cardTeaser: "From Shershaah's golden sands to a golden palace in Jaisalmer — their love story was always meant for the big screen.",
    cardCTA: "Step into their royal celebration",
    heroTitle: "Sidharth Malhotra & Kiara Advani",
    heroSubtitle: "From reel to real — a love written in the golden sands of Jaisalmer",
    heroImage: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1920&q=90",
    groomName: "Sidharth",
    brideName: "Kiara",
    groomFullName: "Sidharth Malhotra",
    brideFullName: "Kiara Advani",
    city: "Jaisalmer",
    venue: "Suryagarh Palace, Jaisalmer",
    venueAddress: "Sam Road, Jaisalmer, Rajasthan 345001",
    welcomeNote: "With hearts full of joy and the golden sands of Jaisalmer as our backdrop, we invite you to celebrate the love story that began on screen and became forever. Join us for a royal celebration in the desert city of our dreams.",
    ourStoryTitle: "When Reel Love Became Real",
    howWeMet: "They met on the sets of Shershaah in 2021 — a film about love, courage, and sacrifice. Sidharth played Captain Vikram Batra, and Kiara played Dimple Cheema, the woman who waited. What began as a professional collaboration slowly blossomed into something far more real, far more precious. The world saw their chemistry on screen before they could even name what they felt for each other.",
    littleThings: "Sidharth loves how Kiara's laugh can light up any room. Kiara adores Sidharth's quiet strength and the way he shows up — always. Together, they are proof that love stories don't end at 'The End' — sometimes, that's exactly where they begin.",
    proposalTitle: "He Said Forever",
    proposalStory: "In an intimate moment away from the world's gaze, Sidharth took Kiara's hands and asked her the question that would change everything. It was quiet, personal, and deeply them — a moment as genuine as the love they had built together. She said yes, and a forever was sealed.",
    groomFamily: "Son of Sunil & Rimma Malhotra",
    brideFamily: "Daughter of Jagdeep & Genevieve Advani",
    galleryImages: [
      "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=85",
    ],
    events: [
      {
        name: "Mehendi",
        date: "Sunday, 5th February 2023",
        time: "4:00 PM",
        venue: "Suryagarh Palace Garden",
        description: "An evening of henna, music, and golden celebrations"
      },
      {
        name: "Haldi Ceremony",
        date: "Monday, 6th February 2023",
        time: "10:00 AM",
        venue: "Suryagarh Palace Courtyard",
        description: "A morning of blessings and golden traditions"
      },
      {
        name: "Wedding Ceremony",
        date: "Tuesday, 7th February 2023",
        time: "7:00 PM",
        venue: "Suryagarh Palace, Jaisalmer",
        description: "A royal union in the golden city"
      },
      {
        name: "Grand Reception",
        date: "Wednesday, 8th February 2023",
        time: "7:30 PM",
        venue: "Suryagarh Palace Ballroom",
        description: "Celebrating love under the desert stars"
      }
    ],
    dressCode: "Royal Indian formal — Sherwanis, Lehengas, and Sarees in jewel and ivory tones",
    closingNote: "Your presence would mean the world to us as we begin this beautiful chapter. Come celebrate in the golden city of Jaisalmer — where our forever begins.",
    rsvpText: "Kindly grace us with your presence"
  },

  {
    id: "ranveer-deepika",
    themeSlug: "paris-romance",
    cardTeaser: "From Ram-Leela's flames to Lake Como's shores — a love story as dramatic, passionate, and eternal as the films they made together.",
    cardCTA: "Step into their Lake Como world",
    heroTitle: "Ranveer Singh & Deepika Padukone",
    heroSubtitle: "Amore assoluto — Where Italian shores witnessed an Indian forever",
    heroImage: "https://images.unsplash.com/photo-1531685250784-7569952593d2?auto=format&fit=crop&w=1920&q=90",
    groomName: "Ranveer",
    brideName: "Deepika",
    groomFullName: "Ranveer Singh Bhavnani",
    brideFullName: "Deepika Padukone",
    city: "Lake Como, Italy",
    venue: "Villa del Balbianello, Lake Como",
    venueAddress: "Via Comoedia 5, Lenno, Lake Como, Italy",
    welcomeNote: "With immense joy and the breathtaking beauty of Lake Como as our backdrop, we invite you to celebrate the love that set our worlds on fire. Six years of a love story culminate here — in the most beautiful place on earth — as we say forever.",
    ourStoryTitle: "The Fire That Never Went Out",
    howWeMet: "They met on the sets of Goliyon Ki Raasleela Ram-Leela in 2012 — a love story set in fire and fury. The chemistry that director Sanjay Leela Bhansali captured on screen turned out to be entirely real. What began as admiration and friendship slowly became the most talked-about, most celebrated love story in Indian cinema.",
    littleThings: "Ranveer loves how Deepika carries quiet grace in everything she does. Deepika adores how Ranveer's infectious joy lights up every room he enters. Together, they are fire and grace — complete opposites who make each other whole.",
    proposalTitle: "The Moment They Said Forever",
    proposalStory: "After six years of love that had been in the public eye, Ranveer and Deepika chose the most intimate of moments to seal their forever — away from cameras, in the quiet of their own world. When the question was asked, it needed no grand gesture. Their love had already answered it a thousand times over.",
    groomFamily: "Son of Jugjeet Singh Bhavnani & Anju Bhavnani",
    brideFamily: "Daughter of Prakash Padukone & Ujjala Padukone",
    galleryImages: [
      "https://images.unsplash.com/photo-1531685250784-7569952593d2?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1562074896-f36ef6fc1ede?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=85",
    ],
    events: [
      {
        name: "Sindhi Wedding Ceremony",
        date: "Wednesday, 14th November 2018",
        time: "5:00 PM",
        venue: "Villa del Balbianello, Lake Como",
        description: "A traditional Sindhi ceremony by the lakeside"
      },
      {
        name: "Konkani Wedding Ceremony",
        date: "Thursday, 15th November 2018",
        time: "5:00 PM",
        venue: "Villa del Balbianello, Lake Como",
        description: "A beautiful Konkani celebration of love"
      },
      {
        name: "Wedding Reception",
        date: "Friday, 16th November 2018",
        time: "8:00 PM",
        venue: "Lake Como Grand Terrace",
        description: "An Italian evening of celebration and love"
      }
    ],
    dressCode: "Elegant Indian formal — Sabyasachi-inspired attire welcome",
    closingNote: "Come celebrate where Indian love met Italian beauty. Your presence makes our forever complete.",
    rsvpText: "Join us on the shores of forever"
  },

  {
    id: "virat-anushka",
    themeSlug: "tuscany-vineyard",
    cardTeaser: "From a shampoo commercial to a Tuscany wedding — a love story that the whole world fell in love with.",
    cardCTA: "Step into their Tuscany",
    heroTitle: "Virat Kohli & Anushka Sharma",
    heroSubtitle: "Under the Tuscan sun — where India's most beloved couple said forever",
    heroImage: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=1920&q=90",
    groomName: "Virat",
    brideName: "Anushka",
    groomFullName: "Virat Kohli",
    brideFullName: "Anushka Sharma",
    city: "Tuscany, Italy",
    venue: "Il Borro Tuscan Biodynamic Resort",
    venueAddress: "Loc. Il Borro 1, San Giustino Valdarno, Tuscany, Italy",
    welcomeNote: "Surrounded by the rolling hills and golden vineyards of Tuscany, in a ceremony as intimate as our love, we celebrated the beginning of forever. We are grateful for every person who has cheered for our love — and now we invite you to be part of our most precious celebration.",
    ourStoryTitle: "A Love That Belonged to the World",
    howWeMet: "They met on the set of a commercial in 2013. A cricketer at the peak of his powers, an actress at the height of her career — two worlds colliding in the most ordinary of settings. What followed were years of quiet love, public scrutiny, and an unshakeable bond that only grew stronger with every challenge.",
    littleThings: "Virat loves how Anushka grounds him — her calm to his fire, her grace to his intensity. Anushka adores how Virat shows up with complete devotion, in every sense of the word. Together, they have built not just a home, but a haven — a life rooted in love, faith, and family.",
    proposalTitle: "The Quiet Yes That Shook the World",
    proposalStory: "Away from the cameras and the celebrations, in the privacy of a moment that was entirely theirs, Virat asked Anushka to be his forever. When news of their wedding emerged — a quiet ceremony in the hills of Tuscany — India collectively smiled. Because some love stories feel personal to everyone who has watched them unfold.",
    groomFamily: "Son of Late Prem Kohli & Saroj Kohli",
    brideFamily: "Daughter of Col. Ajay Kumar Sharma & Ashima Sharma",
    galleryImages: [
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1568819317551-31051b37f69f?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=85",
    ],
    events: [
      {
        name: "Wedding Ceremony",
        date: "Monday, 11th December 2017",
        time: "5:00 PM",
        venue: "Il Borro Resort, Tuscany",
        description: "An intimate ceremony among family and closest friends"
      },
      {
        name: "Wedding Reception — Delhi",
        date: "Saturday, 21st January 2018",
        time: "7:30 PM",
        venue: "New Delhi",
        description: "Celebrating with family and friends in India"
      },
      {
        name: "Wedding Reception — Mumbai",
        date: "Tuesday, 27th February 2018",
        time: "7:30 PM",
        venue: "Mumbai",
        description: "A grand Mumbai celebration of love"
      }
    ],
    dressCode: "Elegant Indian formal — Sabyasachi attire welcome",
    closingNote: "Thank you for being part of our journey. Your love and blessings have always meant the world to us. We celebrate this forever with you in our hearts.",
    rsvpText: "Join us in Tuscany and in our hearts"
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
    id: "priyanka-nick",
    themeSlug: "bollywood-sangeet",
    cardTeaser: "A Bollywood star, a global pop icon, and a royal Jodhpur palace — the most cinematic wedding the world has ever seen.",
    cardCTA: "Enter their royal world",
    heroTitle: "Priyanka Chopra & Nick Jonas",
    heroSubtitle: "When Bollywood met Hollywood at Umaid Bhawan Palace",
    heroImage: "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&w=1920&q=90",
    groomName: "Nick",
    brideName: "Priyanka",
    groomFullName: "Nicholas Jerry Jonas",
    brideFullName: "Priyanka Chopra Jonas",
    city: "Jodhpur",
    venue: "Umaid Bhawan Palace, Jodhpur",
    venueAddress: "Circuit House Road, Cantt Area, Jodhpur, Rajasthan 342006",
    welcomeNote: "Two worlds, two cultures, one extraordinary love. We invite you to join us at the magnificent Umaid Bhawan Palace as we celebrate our union — a wedding that honors both our heritages and the love that brought us together across oceans.",
    ourStoryTitle: "When Two Worlds Became One",
    howWeMet: "Their story began with a Twitter DM in 2016, blossomed at the Met Gala in 2017, and became something the world could not stop talking about. A former Miss World and a Grammy-nominated pop star — from different countries, different industries, different worlds — and yet every moment they shared made it clear that some love stories transcend all boundaries.",
    littleThings: "Nick loves how Priyanka carries the grace of India everywhere she goes. Priyanka adores how Nick shows up for her completely, in every culture and every room. Together, they are a study in how love makes the whole world feel smaller and warmer.",
    proposalTitle: "A Yes Heard Around the World",
    proposalStory: "On Priyanka's birthday in July 2018, in London, Nick shut down a Tiffany & Co. store and proposed with a stunning diamond ring. When news broke, it felt like a celebration the world had been waiting for. After years of on-screen love stories for both of them, their real one had finally begun.",
    groomFamily: "Son of Paul Kevin Jonas Sr. & Denise Miller Jonas",
    brideFamily: "Daughter of Dr. Ashok Chopra & Dr. Madhu Chopra",
    galleryImages: [
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=85",
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=85",
    ],
    events: [
      {
        name: "Mehendi Ceremony",
        date: "Friday, 30th November 2018",
        time: "4:00 PM",
        venue: "Umaid Bhawan Palace Gardens",
        description: "A vibrant celebration of Indian tradition"
      },
      {
        name: "Sangeet Night",
        date: "Friday, 30th November 2018",
        time: "8:00 PM",
        venue: "Umaid Bhawan Palace Ballroom",
        description: "Bollywood meets Hollywood on the dance floor"
      },
      {
        name: "Christian Wedding Ceremony",
        date: "Saturday, 1st December 2018",
        time: "6:00 PM",
        venue: "Umaid Bhawan Palace",
        description: "A Western ceremony in a royal Indian setting"
      },
      {
        name: "Hindu Wedding Ceremony",
        date: "Sunday, 2nd December 2018",
        time: "6:00 PM",
        venue: "Umaid Bhawan Palace",
        description: "A traditional Hindu celebration of union"
      }
    ],
    dressCode: "Bollywood royalty — bold Indian formal or elegant Western attire",
    closingNote: "Two cultures. One love. Your presence at our celebration would mean the world to us. Come dressed to celebrate the union of two worlds.",
    rsvpText: "Join us in Jodhpur for a wedding of two worlds"
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
