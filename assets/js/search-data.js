// JSON string serialization keeps quotes and ampersands readable in search results.
(() => {
  const items = [
    { id: 'nav-about', title: 'About', section: 'Navigation', handler: () => { window.location.href = "/"; } },
    
    
    { id: "nav-/cv/", title: "CV", section: 'Navigation', handler: () => { window.location.href = "/cv/"; } },
    
    { id: "nav-/projects/", title: "Projects", section: 'Navigation', handler: () => { window.location.href = "/projects/"; } },
    
    { id: "nav-/blog/index.html", title: "Blog", section: 'Navigation', handler: () => { window.location.href = "/blog/index.html"; } },
    
    
    { id: "post-/blog/2025/IaC/", title: "Infrastructure as Code: Make the Change Inspectable", description: "Notes from Eugene Meidinger’s introductory course, with reflections on drift, state, tool choice, and recovery.", section: 'Writing', handler: () => { window.location.href = "/blog/2025/IaC/"; } },
    
    { id: "post-/blog/2025/Game-Development-Bootcamp/", title: "What a Game Development Course Taught Me About App Design", description: "Reflections on a 24-hour course covering game concepts, interfaces, production, testing, and publishing.", section: 'Writing', handler: () => { window.location.href = "/blog/2025/Game-Development-Bootcamp/"; } },
    
    { id: "post-/blog/2025/Certificate-in-Depression/", title: "Why I Studied Depression as a Software Developer", description: "A personal reflection on an eight-hour education program and the questions it raised about attention, empathy, and product design.", section: 'Writing', handler: () => { window.location.href = "/blog/2025/Certificate-in-Depression/"; } },
    
    { id: "post-/blog/2025/Mobile-SDET-Strategy-for-iOS-Apps/", title: "A Lean Testing Strategy for Independent iOS Apps", description: "A practical approach to logic tests, UI automation, accessibility, and release checks for independent iOS apps.", section: 'Writing', handler: () => { window.location.href = "/blog/2025/Mobile-SDET-Strategy-for-iOS-Apps/"; } },
    
    { id: "post-/blog/2025/SoftwareTesting/", title: "What Functional, Integration, Smoke, and Regression Tests Actually Tell Us", description: "Choosing tests by the behavior, boundary, and release risk they help investigate.", section: 'Writing', handler: () => { window.location.href = "/blog/2025/SoftwareTesting/"; } },
    
    { id: "post-/blog/2025/Planning/", title: "From Shipping Apps to Asking Better Quality Questions", description: "A reflection on building two service apps at SupTech and the engineering direction that experience clarified.", section: 'Writing', handler: () => { window.location.href = "/blog/2025/Planning/"; } },
    
    { id: "post-/blog/2025/Chat/", title: "Real-Time Chat Starts With Durable Messages", description: "Designing order-scoped chat around authorization, optimistic state, synchronization, media, and notifications.", section: 'Writing', handler: () => { window.location.href = "/blog/2025/Chat/"; } },
    
    { id: "post-/blog/2025/Google-Maps/", title: "Location-Based Job Discovery With Google Maps", description: "Lessons from location-based service apps: permissions, stale coordinates, matching, and map state.", section: 'Writing', handler: () => { window.location.href = "/blog/2025/Google-Maps/"; } },
    
    { id: "post-/blog/2025/Stripe-Payments/", title: "Building a Reliable Mobile Payment Flow With Stripe", description: "What integrating Stripe taught me about server-owned amounts, asynchronous payment state, Connect, and recovery.", section: 'Writing', handler: () => { window.location.href = "/blog/2025/Stripe-Payments/"; } },
    
    { id: "post-/blog/2025/Network-Calls/", title: "A Flutter Network Layer With Dio", description: "Refining a Flutter Dio wrapper around authentication, error semantics, uploads, retries, and testability.", section: 'Writing', handler: () => { window.location.href = "/blog/2025/Network-Calls/"; } },
    
    { id: "post-/blog/2025/RSA-Encryption/", title: "RSA Encryption in a Mobile Registration Flow", description: "Lessons from a mobile RSA integration: threat models, padding, key management, logging, and server-side password storage.", section: 'Writing', handler: () => { window.location.href = "/blog/2025/RSA-Encryption/"; } },
    
    { id: "post-/blog/2025/Push-Notifications/", title: "Push Notifications That Open the Right Conversation", description: "Engineering push notifications around device lifecycle, current data, and useful interruptions.", section: 'Writing', handler: () => { window.location.href = "/blog/2025/Push-Notifications/"; } },
    
    { id: "post-/blog/2024/AI/", title: "Designing an AI Repair Assistant for a Mobile App", description: "Designing the conversation, backend boundary, failure states, and handoff for an AI-assisted mobile workflow.", section: 'Writing', handler: () => { window.location.href = "/blog/2024/AI/"; } },
    
    { id: "post-/blog/2024/Keeping-Users-Logged-In/", title: "Persistent Sign-In: Session Restoration in Flutter", description: "Designing mobile session restoration around secure storage, refresh coordination, and explicit failure states.", section: 'Writing', handler: () => { window.location.href = "/blog/2024/Keeping-Users-Logged-In/"; } },
    
    { id: "post-/blog/2024/Team-Collaboration/", title: "Code Reviews That Explain the Behavior", description: "A Flutter collaboration workflow built around focused changes, useful reviews, and repeatable verification.", section: 'Writing', handler: () => { window.location.href = "/blog/2024/Team-Collaboration/"; } },
    
    { id: "post-/blog/2024/Full-Stack/", title: "One Order, Several Systems: Connecting a Service Marketplace", description: "How orders, chat, location, payments, and two mobile clients fit into a single product lifecycle.", section: 'Writing', handler: () => { window.location.href = "/blog/2024/Full-Stack/"; } },
    
    { id: "post-/blog/2024/Project-Management/", title: "Making Changing Requirements Reviewable", description: "A practical approach to scope changes, acceptance criteria, feature branches, and feedback while building mobile apps.", section: 'Writing', handler: () => { window.location.href = "/blog/2024/Project-Management/"; } },
    
    { id: "post-/blog/2024/Multi-Role-MVP/", title: "The Work Around the Code", description: "How startup responsibilities beyond app development changed the way I communicate, prioritize, and understand users.", section: 'Writing', handler: () => { window.location.href = "/blog/2024/Multi-Role-MVP/"; } },
    
    { id: "post-/blog/2024/Apps-from-Zero-to-One/", title: "Building Two Mobile Apps Around One Service Workflow", description: "What building consumer and technician apps at SupTech taught me about cross-platform delivery, integration, and release decisions.", section: 'Writing', handler: () => { window.location.href = "/blog/2024/Apps-from-Zero-to-One/"; } },
    
    { id: "post-/blog/2024/Full-Stack-Mindset/", title: "Full-Stack Ownership Starts at the Boundaries", description: "How I approached Flutter, backend integration, debugging, and maintainability when the mobile work depended on one developer.", section: 'Writing', handler: () => { window.location.href = "/blog/2024/Full-Stack-Mindset/"; } },
    
    { id: "post-/blog/2024/Backend-Logic/", title: "Payments and Dispatch: Two Workflows That Have to Agree", description: "Engineering notes on Stripe Connect, delayed transfers, location matching, and the failure cases between them.", section: 'Writing', handler: () => { window.location.href = "/blog/2024/Backend-Logic/"; } },
    
    
    { id: "project-/projects/3Calc/", title: "3Calc App", description: "Three independent calculators, each with a reusable history.", section: 'Work', handler: () => { window.location.href = "/projects/3Calc/"; } },
    
    { id: "project-/projects/AHS/", title: "Arcadia High School", description: "Early foundations in programming, visual design, and academic exploration.", section: 'Work', handler: () => { window.location.href = "/projects/AHS/"; } },
    
    { id: "project-/projects/ArtPortfolio/", title: "Graphic Design \u0026 Art Portfolio", description: "Drawings, paintings, event materials, and original digital sticker collections.", section: 'Work', handler: () => { window.location.href = "/projects/ArtPortfolio/"; } },
    
    { id: "project-/projects/CUHK/", title: "Research at CUHK", description: "Summer research in dataset preparation and stereo 3D reconstruction.", section: 'Work', handler: () => { window.location.href = "/projects/CUHK/"; } },
    
    { id: "project-/projects/CheckersAI/", title: "CheckersAI", description: "A Python game-playing agent using depth-limited search and heuristic evaluation.", section: 'Work', handler: () => { window.location.href = "/projects/CheckersAI/"; } },
    
    { id: "project-/projects/DoneTodo/", title: "DoneTodo App", description: "A visual planner that puts planned time, actual time, and goals on one grid.", section: 'Work', handler: () => { window.location.href = "/projects/DoneTodo/"; } },
    
    { id: "project-/projects/Flipperly/", title: "Flipperly App", description: "A native flashcard app with gesture-based review and a daily queue.", section: 'Work', handler: () => { window.location.href = "/projects/Flipperly/"; } },
    
    { id: "project-/projects/FontMate/", title: "FontMate App", description: "Preview iOS fonts, compare favorites, and generate SwiftUI snippets.", section: 'Work', handler: () => { window.location.href = "/projects/FontMate/"; } },
    
    { id: "project-/projects/GestureDrivenShopping/", title: "Gesture-Driven Shopping App (Angular + handtrackjs)", description: "An Angular storefront controlled by camera-based hand gestures.", section: 'Work', handler: () => { window.location.href = "/projects/GestureDrivenShopping/"; } },
    
    { id: "project-/projects/Goshsha/", title: "Goshsha App", description: "Developing a cross-platform shopping prototype with product browsing, scanning, and community features.", section: 'Work', handler: () => { window.location.href = "/projects/Goshsha/"; } },
    
    { id: "project-/projects/HowDidI/", title: "HowDidI App", description: "Leading the iOS implementation of a résumé and career-experience sharing platform.", section: 'Work', handler: () => { window.location.href = "/projects/HowDidI/"; } },
    
    { id: "project-/projects/Humfolio/", title: "Humfolio: A Notebook for Musical Ideas", description: "A browser tool that turns a hummed phrase into editable notes, with A/B playback, local saving, and MIDI export.", section: 'Work', handler: () => { window.location.href = "/projects/Humfolio/"; } },
    
    { id: "project-/projects/LifeTune/", title: "LifeTune App", description: "A team prototype exploring clearer daily health dashboards.", section: 'Work', handler: () => { window.location.href = "/projects/LifeTune/"; } },
    
    { id: "project-/projects/MemoryAllocator/", title: "Byte-Level Memory Allocator (C, 127-byte Heap)", description: "A 127-byte heap simulator with allocation, splitting, and coalescing.", section: 'Work', handler: () => { window.location.href = "/projects/MemoryAllocator/"; } },
    
    { id: "project-/projects/Moment/", title: "Moment: A Minimal Web Clock", description: "A responsive flip and analog clock with synchronized time, offline installation, and accessible controls.", section: 'Work', handler: () => { window.location.href = "/projects/Moment/"; } },
    
    { id: "project-/projects/SearchEngine/", title: "Search Engine (Python, MongoDB)", description: "A Python search project combining an inverted index, TF-IDF, and link analysis.", section: 'Work', handler: () => { window.location.href = "/projects/SearchEngine/"; } },
    
    { id: "project-/projects/Shell/", title: "Mini Shell (C)", description: "A C shell project exploring processes, signals, redirection, and job control.", section: 'Work', handler: () => { window.location.href = "/projects/Shell/"; } },
    
    { id: "project-/projects/SparkDays/", title: "SparkDays App", description: "A habit tracker that turns check-ins into self-chosen rewards.", section: 'Work', handler: () => { window.location.href = "/projects/SparkDays/"; } },
    
    { id: "project-/projects/Spotify/", title: "Spotify Browser", description: "An Angular and Express project for browsing Spotify artists, albums, and tracks.", section: 'Work', handler: () => { window.location.href = "/projects/Spotify/"; } },
    
    { id: "project-/projects/StockBuyerX/", title: "StockBuyerX", description: "An academic reinforcement-learning experiment with a custom trading simulator.", section: 'Work', handler: () => { window.location.href = "/projects/StockBuyerX/"; } },
    
    { id: "project-/projects/StockQuery/", title: "StockQuery TCP Client/Server (C)", description: "A C client/server project with compact TCP messages and historical-price queries.", section: 'Work', handler: () => { window.location.href = "/projects/StockQuery/"; } },
    
    { id: "project-/projects/SupTech/", title: "SupTech Apps", description: "Two Flutter apps connecting customers, technicians, and the service workflow.", section: 'Work', handler: () => { window.location.href = "/projects/SupTech/"; } },
    
    { id: "project-/projects/TZAppify/", title: "TZAppify", description: "My independent app practice: product decisions, native iOS development, and release ownership.", section: 'Work', handler: () => { window.location.href = "/projects/TZAppify/"; } },
    
    { id: "project-/projects/ThreeTodo/", title: "ThreeTodo App", description: "An iOS task manager organized around Plan, Today, and Thoughts.", section: 'Work', handler: () => { window.location.href = "/projects/ThreeTodo/"; } },
    
    { id: "project-/projects/TicTacToe/", title: "Tic-Tac-Toe (Python CLI)", description: "A small Python console game focused on input validation and clear end states.", section: 'Work', handler: () => { window.location.href = "/projects/TicTacToe/"; } },
    
    { id: "project-/projects/UCI/", title: "UCI Academic Journey", description: "Cum Laude graduate in Computer Science and Informatics, with a Statistics minor.", section: 'Work', handler: () => { window.location.href = "/projects/UCI/"; } },
    
    { id: "project-/projects/Veeva/", title: "Veeva Systems", description: "Platform quality, release validation, and test automation for Vault infrastructure.", section: 'Work', handler: () => { window.location.href = "/projects/Veeva/"; } },
    
    { id: "project-/projects/VirtualMemorySimulator/", title: "Virtual Memory Simulator (C)", description: "A C simulator for address translation, page faults, and FIFO/LRU replacement.", section: 'Work', handler: () => { window.location.href = "/projects/VirtualMemorySimulator/"; } },
    
    { id: "project-/projects/WayLater/", title: "WayLater App", description: "Letters to your future self, with date-based delivery and a personal archive.", section: 'Work', handler: () => { window.location.href = "/projects/WayLater/"; } },
    
    { id: "project-/projects/WebCrawler/", title: "Web Crawler (Python)", description: "A focused Python crawler with a resumable frontier and trap-aware URL filtering.", section: 'Work', handler: () => { window.location.href = "/projects/WebCrawler/"; } },
    
    { id: "project-/projects/WriterCards/", title: "WriterCards App", description: "A prompt-based writing app with a personal history and expressive card designs.", section: 'Work', handler: () => { window.location.href = "/projects/WriterCards/"; } },
    
    { id: 'contact-email', title: 'Email Tongze', section: 'Connect', handler: () => { window.location.href = 'mailto:tongzemao@gmail.com'; } },
    { id: 'contact-linkedin', title: 'LinkedIn', section: 'Connect', handler: () => { window.location.href = 'https://www.linkedin.com/in/tongze-mao/'; } },
    { id: 'contact-appstore', title: 'App Store apps', section: 'Connect', handler: () => { window.location.href = 'https://apps.apple.com/us/developer/tongze-mao/id1801828453'; } },
    { id: 'theme-light', title: 'Use light theme', section: 'Appearance', handler: () => setThemeSetting('light') },
    { id: 'theme-dark', title: 'Use dark theme', section: 'Appearance', handler: () => setThemeSetting('dark') },
    { id: 'theme-system', title: 'Use system theme', section: 'Appearance', handler: () => setThemeSetting('system') }
  ];
  customElements.whenDefined('ninja-keys').then(() => {
    const search = document.querySelector('ninja-keys');
    if (search) search.data = items;
  });
})();
