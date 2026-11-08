// High-quality sample news dataset with original content and verified Unsplash editorial images
export const SAMPLE_ARTICLES = [
  {
    id: "world-climate-summit-2026",
    title: "Global Leaders Reach Historic Landmark Accord on Clean Energy Grids",
    description: "Delegates from over 90 nations finalize an unprecedented pact to modernize cross-border renewable grids, committing $320 billion by 2030.",
    content: `GENEVA — In what international observers are hailing as a defining milestone for global infrastructure, representatives from 94 nations reached a comprehensive agreement on cross-border green power distribution today after sixteen days of exhaustive negotiations.

The framework, known as the Clean Grid Interconnect Protocol, establishes binding technical standards and a multilateral funding vehicle designed to link high-output solar arrays in the Mediterranean and North Africa with major industrial corridors across Europe and Asia.

"Today marks a pivotal departure from piecemeal domestic policies toward coordinated global resilience," said Elena Rostova, special envoy for energy transition. "Energy security and climate mitigation can no longer be addressed in isolation."

Under the terms of the treaty, industrialized economies will seed an initial $320 billion infrastructure bond pool. The priority projects slated for groundbreaking in early 2027 include offshore transmission corridors and next-generation high-voltage direct current (HVDC) subsea cabling.

Key stakeholders from the private sector have pledged matching capital, signalling strong investor confidence in long-term renewable yields despite recent currency fluctuations.`,
    category: "World",
    author: "Marcella Thorne",
    source: { name: "Global News World Desk" },
    publishedAt: "2026-11-08T08:30:00Z",
    readTime: "5 min read",
    urlToImage: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80",
    isBreaking: true,
    isFeatured: true,
    trendingRank: 1
  },
  {
    id: "tech-nextgen-quantum-computing",
    title: "Quantum Breakthrough: New Room-Temperature Qubits Promise Practical Scaling",
    description: "Researchers announce a stable synthetic diamond lattice that maintains quantum coherence at ambient temperatures for over 45 milliseconds.",
    content: `CAMBRIDGE — In a paper published in Advanced Physical Letters, researchers have revealed a novel crystalline matrix that preserves quantum superposition without costly cryogenic dilution refrigeration.

The discovery bypasses one of the greatest economic and logistical bottlenecks in quantum engineering: the necessity of maintaining operational temperatures near absolute zero.

"By manipulating atomic nitrogen-vacancy vacancies within an ultra-pure synthetic diamond framework, we have demonstrated ambient coherence lasting past 45 milliseconds," explained lead researcher Dr. Arthur Vance. "This opens the door to localized, room-temperature cryptographic processors and portable molecular modeling engines."

Industry analysts predict that commercial application within pharmaceutical development and materials science could accelerate by half a decade if commercial yields match laboratory performance.`,
    category: "Technology",
    author: "Kavita Rao",
    source: { name: "Tech Horizon" },
    publishedAt: "2026-11-08T07:15:00Z",
    readTime: "4 min read",
    urlToImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
    isBreaking: false,
    isFeatured: true,
    trendingRank: 2
  },
  {
    id: "canada-highspeed-rail-corridor",
    title: "Federal Transit Plan Unveils Next Phase of High-Speed Rail Corridor",
    description: "New plans outline a high-frequency passenger rail link between Toronto, Montreal, and Quebec City with speeds up to 300 km/h.",
    content: `OTTAWA — Transport officials today unveiled the finalized alignment for the Quebec City–Windsor High-Speed Rail Corridor, marking Canada's most ambitious public transit expansion in half a century.

The electrified dual-track line will cut travel time between Montreal and Toronto to just two hours and fifteen minutes, offering a viable zero-emission alternative to regional air travel and congested highway routes.

"Canadians deserve fast, modern, and reliable intercity connections," stated Minister of Infrastructure Lucian Tremblay during a press conference at Ottawa Central Station. "This project will connect talent pools, spur regional housing initiatives, and remove millions of vehicle kilometers from the 401 corridor annually."

Public hearings on environmental mitigations and station access will commence next month across twelve municipal hubs.`,
    category: "Canada",
    author: "David MacIntyre",
    source: { name: "National Bureau" },
    publishedAt: "2026-11-08T06:40:00Z",
    readTime: "4 min read",
    urlToImage: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80",
    isBreaking: false,
    isFeatured: false,
    trendingRank: 3
  },
  {
    id: "business-global-markets-rally",
    title: "Global Markets Rally as Central Banks Signal Balanced Inflation Outlook",
    description: "Stocks surge worldwide as monetary authorities announce stabilized price indices and steady employment figures across primary economic sectors.",
    content: `NEW YORK — Global equity indices closed broadly higher on Friday as quarterly earnings from major manufacturing and semiconductor conglomerates beat consensus estimates by over seven percent.

The benchmark S&P 500 rose 1.8%, while Tokyo's Nikkei 225 climbed 2.1% in overnight trading. Commodity markets also reflected renewed optimism, with copper and raw lithium futures posting modest gains.

Economists attribute the rally to calming geopolitical rhetoric and synchronized adjustments by central bank governors indicating that the prolonged cycle of rate volatility has stabilized into predictable corridors.`,
    category: "Business",
    author: "Julian Hayes",
    source: { name: "Financial Times Wire" },
    publishedAt: "2026-11-07T21:10:00Z",
    readTime: "3 min read",
    urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
    isBreaking: false,
    isFeatured: false,
    trendingRank: 4
  },
  {
    id: "politics-bipartisan-cybersecurity-bill",
    title: "Parliament & Senate Pass Broad Omnibus Cybersecurity Protection Act",
    description: "New legislation establishes severe penalties for state-sponsored digital espionage while safeguarding critical civilian infrastructure.",
    content: `WASHINGTON / OTTAWA — In an overwhelming display of cross-party consensus, lawmakers approved comprehensive defensive legislation to shield power utilities, water sanitation networks, and healthcare providers from sophisticated cyber threats.

The bill establishes the Critical System Cyber Defense Directorate, endowed with authority to require rapid disclosure of intrusive breaches and coordinate rapid-response incident teams within two hours of detection.

"We have entered an era where infrastructure resilience is paramount to national sovereignty," noted committee co-chair senator Evelyn Vance.`,
    category: "Politics",
    author: "Sophia Alvarez",
    source: { name: "Capitol Dispatch" },
    publishedAt: "2026-11-07T18:22:00Z",
    readTime: "4 min read",
    urlToImage: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
    isBreaking: true,
    isFeatured: false,
    trendingRank: 5
  },
  {
    id: "health-mrna-universal-vaccine",
    title: "Clinical Trials for Universal Pan-Respiratory Vaccine Show 94% Efficacy",
    description: "Phase III multicenter trials demonstrate broad-spectrum immune coverage against multiple viral strains in human volunteers.",
    content: `BOSTON — A collaborative consortium of medical researchers from Harvard, Oxford, and Karolinska Institute have published preliminary Phase III results showing 94% sustained immune response against seasonal influenza, RSV, and common cold variants.

The universal vaccine formulation utilizes an advanced mRNA lipid nanoparticle carrier that targets conserved interior nucleoproteins rather than rapidly mutating external spike spikes.

"If confirmed by independent regulatory reviews, this could eliminate the need for annual seasonal reformulations," said Dr. Priya Mehta, co-principal investigator. Public health agencies are preparing expedited review tracks for late 2027 rollout.`,
    category: "Health",
    author: "Dr. Ronald Evans",
    source: { name: "Health Science Digest" },
    publishedAt: "2026-11-07T14:15:00Z",
    readTime: "5 min read",
    urlToImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    isBreaking: false,
    isFeatured: false,
    trendingRank: 6
  },
  {
    id: "sports-winter-games-bidding",
    title: "Calgary and Vancouver Announce Joint Bid for 2038 Winter Games",
    description: "The prospective collaborative bid leverages existing venues with a carbon-neutral footprint and modernized high-speed transit links.",
    content: `CALGARY — Civic leaders in Alberta and British Columbia have formally submitted an exploratory joint proposition to host the 2038 Winter Olympic and Paralympic Games.

By reusing 90% of legacy competition facilities from the 1988 and 2010 Games, the proposal represents the most cost-efficient and environmentally conscious Olympic strategy submitted in modern history.

"We possess the mountains, the world-class ice surfaces, and the hospitality spirit," said Calgary Mayor Jerrod Campbell. "We are offering the International Olympic Committee a fiscally responsible model for sustainable athletic celebration."`,
    category: "Sports",
    author: "Tyler Campbell",
    source: { name: "Sports World" },
    publishedAt: "2026-11-07T11:05:00Z",
    readTime: "3 min read",
    urlToImage: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1200&q=80",
    isBreaking: false,
    isFeatured: false,
    trendingRank: 7
  },
  {
    id: "entertainment-toronto-film-festival",
    title: "Indie Sci-Fi Epic Sweeps Top Honors at International Film Festival",
    description: "Director Mira Thorne's debut speculative drama 'Echoes of Andromeda' takes Audience Choice and Best Cinematography trophies.",
    content: `TORONTO — The 51st annual International Film Festival wrapped up with a standing ovation as 'Echoes of Andromeda', an introspective narrative filmed entirely on location in Iceland and the Atacama Desert, captured the People's Choice Award.

Critics praised the film's reliance on practical miniatures and nuanced philosophical performances over hyper-digitized visual effects.

Streaming platforms and independent theatrical distributors engaged in a spirited overnight auction, with global distribution rights eventually acquired for a record $28 million.`,
    category: "Entertainment",
    author: "Chloe St. Laurent",
    source: { name: "Culture & Screen" },
    publishedAt: "2026-11-06T20:45:00Z",
    readTime: "3 min read",
    urlToImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    isBreaking: false,
    isFeatured: false,
    trendingRank: 8
  },
  {
    id: "canada-arctic-wildlife-sanctuary",
    title: "Historic Northern Wildlife Conservation Sanctuary Expands by 40,000 Sq Km",
    description: "Co-managed with Indigenous leaders, the protected marine and tundra reserve safeguards critical migratory habitats.",
    content: `IQALUIT — In partnership with regional Inuit community councils, federal wildlife protection officials today marked the completion of the Lancaster Sound sanctuary expansion.

The protected zone now shelters vital calving grounds for narwhals, beluga whales, and polar bears while maintaining traditional subsistence hunting rights for local communities.

"This is genuine reconciliation and conservation working as one," noted hunter and community elder Silas Qamaniq.`,
    category: "Canada",
    author: "David MacIntyre",
    source: { name: "National Bureau" },
    publishedAt: "2026-11-06T17:30:00Z",
    readTime: "4 min read",
    urlToImage: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80",
    isBreaking: false,
    isFeatured: false,
    trendingRank: 9
  },
  {
    id: "tech-deepsea-autonomous-submersibles",
    title: "Robotic Explorers Map 5,000 Uncharted Undersea Volcanic Peaks",
    description: "Autonomous underwater swarms equipped with acoustic lidar discover unprecedented hydrothermal vent ecosystems in the South Pacific.",
    content: `SUVA — An expedition led by oceanic exploration institutes has completed a six-month seabed charting mission, yielding ultra-high-definition bathymetric maps of over five thousand previously unrecorded undersea peaks.

Equipped with artificial intelligence navigation and bio-optical sensors, the autonomous drone fleet uncovered over forty novel deep-sea species clustered around geothermal mineral chimneys.

"We have mapped less than a quarter of the ocean floor," said expedition chief Dr. Nathan Chen. "These autonomous fleets allow us to study extreme biodiversity without disturbing delicate ecosystems."`,
    category: "Technology",
    author: "Kavita Rao",
    source: { name: "Tech Horizon" },
    publishedAt: "2026-11-06T12:00:00Z",
    readTime: "4 min read",
    urlToImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    isBreaking: false,
    isFeatured: false,
    trendingRank: 10
  }
];

export const CATEGORIES = [
  "All",
  "Canada",
  "World",
  "Politics",
  "Business",
  "Technology",
  "Sports",
  "Entertainment",
  "Health"
];
