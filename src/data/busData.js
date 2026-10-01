export const POPULAR_CITIES = [
  { name: "Chennai", code: "MAA", state: "Tamil Nadu", popularStops: ["Koyambedu CMBT", "Kilambakkam KCBT", "Guindy", "Tambaram"] },
  { name: "Bengaluru", code: "BLR", state: "Karnataka", popularStops: ["Majestic", "Madiwala", "Silk Board", "Electronic City", "Shantinagar"] },
  { name: "Coimbatore", code: "CJB", state: "Tamil Nadu", popularStops: ["Gandhipuram", "Omni Bus Stand", "Singanallur", "Ukkadam"] },
  { name: "Madurai", code: "IXM", state: "Tamil Nadu", popularStops: ["Mattuthavani", "Periyar Bus Stand", "Arapalayam"] },
  { name: "Hyderabad", code: "HYD", state: "Telangana", popularStops: ["Ameerpet", "MGBS", "Kukatpally", "Gachibowli"] },
  { name: "Salem", code: "SXV", state: "Tamil Nadu", popularStops: ["New Bus Stand", "AVR Circle", "Kondalampatti"] },
  { name: "Tiruchirappalli", code: "TRZ", state: "Tamil Nadu", popularStops: ["Central Bus Stand", "Chatram", "Tollgate"] },
  { name: "Kochi", code: "COK", state: "Kerala", popularStops: ["Vyttila Mobility Hub", "Edappally", "Aluva"] },
  { name: "Tirupati", code: "TIR", state: "Andhra Pradesh", popularStops: ["RTC Bus Stand", "Alipiri", "Bypass"] },
  { name: "Puducherry", code: "PNY", state: "Puducherry", popularStops: ["New Bus Stand", "ECR Toll", "JIPMER"] }
];

export const POPULAR_ROUTES = [
  {
    id: "route-1",
    from: "Chennai",
    to: "Bengaluru",
    distance: "348 km",
    duration: "5h 45m",
    startingPrice: 499,
    busCount: 68,
    tag: "High Demand",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "route-2",
    from: "Bengaluru",
    to: "Coimbatore",
    distance: "365 km",
    duration: "6h 30m",
    startingPrice: 599,
    busCount: 42,
    tag: "Trending",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "route-3",
    from: "Chennai",
    to: "Madurai",
    distance: "460 km",
    duration: "7h 15m",
    startingPrice: 550,
    busCount: 54,
    tag: "Overnight Favorite",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "route-4",
    from: "Hyderabad",
    to: "Bengaluru",
    distance: "570 km",
    duration: "8h 45m",
    startingPrice: 799,
    busCount: 75,
    tag: "Popular Express",
    image: "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "route-5",
    from: "Chennai",
    to: "Coimbatore",
    distance: "505 km",
    duration: "7h 50m",
    startingPrice: 650,
    busCount: 39,
    tag: "Super Fast",
    image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "route-6",
    from: "Bengaluru",
    to: "Kochi",
    distance: "540 km",
    duration: "9h 15m",
    startingPrice: 850,
    busCount: 31,
    tag: "Scenic Route",
    image: "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=600&q=80"
  }
];

export const PROMO_OFFERS = [
  {
    code: "PETERFIRST",
    title: "Flat ₹250 Off",
    description: "Valid for all first-time PeterBus passengers on AC Sleeper routes.",
    validTill: "31 Oct 2026",
    minBooking: 600,
    discountAmount: 250,
    badge: "New User Special",
    color: "from-rose-500 to-red-600"
  },
  {
    code: "WEEKENDAC",
    title: "15% Off (Up to ₹200)",
    description: "Book Volvo Multi-Axle and Scania luxury buses Friday to Sunday.",
    validTill: "Valid on Weekends",
    minBooking: 800,
    discountAmount: 180,
    badge: "Weekend Getaway",
    color: "from-blue-600 to-indigo-700"
  },
  {
    code: "SUPERRETURN",
    title: "Flat ₹150 Cashback",
    description: "Book your onward & return ticket together and save instantly.",
    validTill: "Ongoing",
    minBooking: 1000,
    discountAmount: 150,
    badge: "Round Trip Deal",
    color: "from-amber-500 to-orange-600"
  },
  {
    code: "STUDENTPASS",
    title: "Extra 12% Off",
    description: "Special concession for college students with valid student ID.",
    validTill: "Valid till end of term",
    minBooking: 500,
    discountAmount: 120,
    badge: "Youth & Students",
    color: "from-emerald-500 to-teal-600"
  }
];

export const MOCK_BUS_RESULTS = [
  {
    id: "bus-101",
    operator: "Peter Express Club Class",
    busType: "Volvo Multi-Axle 9600 A/C Sleeper (2+1)",
    rating: 4.9,
    reviewCount: 1840,
    departureTime: "21:30",
    departurePlace: "Kilambakkam (KCBT)",
    arrivalTime: "05:15",
    arrivalPlace: "Madiwala",
    duration: "7h 45m",
    price: 899,
    originalPrice: 1150,
    seatsAvailable: 8,
    isLiveTracking: true,
    amenities: ["Charging Port", "Blanket", "Water Bottle", "Reading Light", "Emergency Exit", "Live GPS", "Movie Screen"],
    cancellationPolicy: "Free cancellation until 6 hours before departure"
  },
  {
    id: "bus-102",
    operator: "KPN Travels Gold",
    busType: "BharatBenz AC Sleeper (2+1)",
    rating: 4.7,
    reviewCount: 1420,
    departureTime: "22:15",
    departurePlace: "Koyambedu (CMBT)",
    arrivalTime: "05:45",
    arrivalPlace: "Silk Board",
    duration: "7h 30m",
    price: 749,
    originalPrice: 950,
    seatsAvailable: 14,
    isLiveTracking: true,
    amenities: ["Charging Port", "Pillow & Blanket", "Clean Restrooms", "Live GPS"],
    cancellationPolicy: "Zero fee cancellation up to 4 hrs before travel"
  },
  {
    id: "bus-103",
    operator: "Parveen Travels Executive",
    busType: "Scania High-Deck Semi-Sleeper AC (2+2)",
    rating: 4.8,
    reviewCount: 960,
    departureTime: "18:00",
    departurePlace: "Guindy",
    arrivalTime: "00:30",
    arrivalPlace: "Electronic City",
    duration: "6h 30m",
    price: 620,
    originalPrice: 790,
    seatsAvailable: 19,
    isLiveTracking: true,
    amenities: ["Snack Pack", "Water Bottle", "Charging USB", "Live GPS"],
    cancellationPolicy: "Instant full refund voucher available"
  },
  {
    id: "bus-104",
    operator: "SRS Travels Royal",
    busType: "Mercedes-Benz Luxury Multi-Axle Sleeper",
    rating: 4.6,
    reviewCount: 2210,
    departureTime: "23:00",
    departurePlace: "Tambaram",
    arrivalTime: "06:20",
    arrivalPlace: "Majestic (KSRTC)",
    duration: "7h 20m",
    price: 820,
    originalPrice: 1050,
    seatsAvailable: 6,
    isLiveTracking: true,
    amenities: ["WiFi Hotspot", "Blanket", "Water Bottle", "SOS Button", "Live GPS"],
    cancellationPolicy: "Refundable up to 2 hours before trip"
  }
];

export const TRUST_FEATURES = [
  {
    id: "f-1",
    icon: "ShieldCheck",
    title: "100% Refund Guarantee",
    description: "Change in plans? Cancel effortlessly with zero fees on eligible tickets and get instant bank refunds."
  },
  {
    id: "f-2",
    icon: "MapPin",
    title: "Real-time Live GPS Tracking",
    description: "Track your bus down to the minute. Share live tracking links with your family for peace of mind."
  },
  {
    id: "f-3",
    icon: "Clock",
    title: "98.6% On-Time Departures",
    description: "Strict schedule adherence. If your bus is delayed by more than 30 minutes, get auto-compensation."
  },
  {
    id: "f-4",
    icon: "UserCheck",
    title: "Female Passenger Priority",
    description: "Dedicated single-lady reserved seats next to female co-passengers and 24/7 women emergency helpline."
  }
];

export const OPERATOR_PARTNERS = [
  { name: "KPN Travels", rating: "4.7", fleet: "320+ Buses", established: "Since 1972" },
  { name: "Parveen Travels", rating: "4.8", fleet: "280+ Buses", established: "Since 1980" },
  { name: "SRS Travels", rating: "4.6", fleet: "450+ Buses", established: "Since 1971" },
  { name: "SRM Transports", rating: "4.7", fleet: "190+ Buses", established: "Since 1999" },
  { name: "IntrCity SmartBus", rating: "4.9", fleet: "150+ Buses", established: "Modern Smart Fleet" },
  { name: "YBM Travels", rating: "4.8", fleet: "110+ Buses", established: "Premium Sleeper" }
];

export const TESTIMONIALS = [
  {
    id: "t-1",
    name: "Dr. Karthik S.",
    role: "Regular Traveler (Chennai - Bangalore)",
    rating: 5,
    text: "PeterBus is miles ahead of other portals. The live tracking was pinpoint accurate at Kilambakkam, and the bus was sanitized and punctual. Booking took literally 40 seconds!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "t-2",
    name: "Pooja Venkat",
    role: "Software Consultant, Bangalore",
    rating: 5,
    text: "As a woman traveling solo at night to Coimbatore, the female passenger safety seat feature gave me total peace of mind. The driver and crew were polite and professional.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "t-3",
    name: "Arunachalam Murthy",
    role: "Business Owner, Madurai",
    rating: 5,
    text: "Zero cancellation fee is genuine! I had an emergency meeting cancelled in Chennai, clicked refund, and the money was credited back into my UPI account within 8 minutes. Truly trustworthy.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  }
];

export const FAQS = [
  {
    q: "How do I get my bus ticket after booking?",
    a: "Your confirmed M-Ticket is instantly sent via WhatsApp and SMS, along with an official PDF invoice to your registered email. You don't need to print it; just show the M-ticket on your mobile phone."
  },
  {
    q: "Can I choose my preferred seat and sleeper berth?",
    a: "Yes! PeterBus provides an interactive real-time deck layout showing Upper & Lower decks, window berths, single seats, and ladies-reserved berths with live pricing."
  },
  {
    q: "What is the policy for cancellation and refunds?",
    a: "Eligible tickets marked with 'Zero Cancellation' can be cancelled up to 4 to 6 hours before departure without any deduction. The refund is processed instantly to your original payment mode or UPI."
  },
  {
    q: "How does Live GPS bus tracking work?",
    a: "You receive a live GPS link 60 minutes before scheduled departure. You can monitor the real-time bus location, traffic delays, and exact arrival time at your chosen pickup point."
  },
  {
    q: "Is it safe for solo female passengers?",
    a: "Absolutely. We offer dedicated 'Ladies Only' seats where adjacent seats can only be booked by female travelers. We also offer a 24/7 dedicated safety support desk."
  }
];
