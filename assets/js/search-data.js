// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-cv",
          title: "cv",
          description: "Mobile &amp; Full-Stack Engineer leveraging HCI and AI to craft intuitive, high-impact apps that empower users and drive innovation.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "A growing collection of my cool projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "post-integrating-stripe-payments-in-mobile-apps",
      
        title: "Integrating Stripe Payments in Mobile Apps",
      
      description: "A practical look at adding secure in-app payments and payouts with Stripe",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Stripe-Payments/";
        
      },
    },{id: "post-streamlining-network-calls-with-a-custom-dioinstance",
      
        title: "Streamlining Network Calls with a Custom DioInstance",
      
      description: "A deep dive into building a refined Dio setup for mobile apps",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Network-Calls/";
        
      },
    },{id: "post-harnessing-rsa-encryption-in-mobile-apps",
      
        title: "Harnessing RSA Encryption in Mobile Apps",
      
      description: "A closer look at RSA cryptography and its practical implementation in app development",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/RSA-Encryption/";
        
      },
    },{id: "news-a-simple-inline-announcement",
          title: 'A simple inline announcement.',
          description: "",
          section: "News",},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-a-simple-inline-announcement-with-markdown-emoji-sparkles-smile",
          title: 'A simple inline announcement with Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "projects-arcadia-high-school",
          title: 'Arcadia High School',
          description: "My achievements in design, academics, and leadership",
          section: "Projects",handler: () => {
              window.location.href = "/projects/AHS/";
            },},{id: "projects-research-at-cuhk",
          title: 'Research at CUHK',
          description: "Dataset Engineering &amp; Stereo 3D Reconstruction – My Role as a Summer Research Intern",
          section: "Projects",handler: () => {
              window.location.href = "/projects/CUHK/";
            },},{id: "projects-checkersai",
          title: 'CheckersAI',
          description: "Intelligent Board-Game Strategy",
          section: "Projects",handler: () => {
              window.location.href = "/projects/CheckersAI/";
            },},{id: "projects-donetodo-app",
          title: 'DoneTodo App',
          description: "Minimalistic Time-Planning Solution",
          section: "Projects",handler: () => {
              window.location.href = "/projects/DoneTodo/";
            },},{id: "projects-goshsha-app",
          title: 'Goshsha App',
          description: "Future AR Interactive Shopping Experience",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Goshsha/";
            },},{id: "projects-hd-edu",
          title: 'HD EDU',
          description: "New Media &amp; Digital Outreach – My Role as a Content Creator &amp; Marketer",
          section: "Projects",handler: () => {
              window.location.href = "/projects/HDRedNote/";
            },},{id: "projects-hd-edu",
          title: 'HD EDU',
          description: "My Role as a Calculus Senior Tutor",
          section: "Projects",handler: () => {
              window.location.href = "/projects/HDTutor/";
            },},{id: "projects-howdidi-app",
          title: 'HowDidI App',
          description: "Paid Résumé-Sharing Platform",
          section: "Projects",handler: () => {
              window.location.href = "/projects/HowDidI/";
            },},{id: "projects-lifetune-app",
          title: 'LifeTune App',
          description: "Streamlined Health Monitoring",
          section: "Projects",handler: () => {
              window.location.href = "/projects/LifeTune/";
            },},{id: "projects-spotify-browser",
          title: 'Spotify Browser',
          description: "High-Performance Music Streaming Web App",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Spotify/";
            },},{id: "projects-suptech-apps",
          title: 'SupTech Apps',
          description: "My role as an App Developer",
          section: "Projects",handler: () => {
              window.location.href = "/projects/SupTech/";
            },},{id: "projects-threetodo-app",
          title: 'ThreeTodo App',
          description: "Efficient Task Management",
          section: "Projects",handler: () => {
              window.location.href = "/projects/ThreeTodo/";
            },},{id: "projects-uci-academic-journey",
          title: 'UCI Academic Journey',
          description: "My dual-major accomplishments and how they forged my versatile coding, research, and leadership prowess",
          section: "Projects",handler: () => {
              window.location.href = "/projects/UCI/";
            },},{id: "projects-writercards-app",
          title: 'WriterCards App',
          description: "Daily Creativity &amp; Self-Reflection",
          section: "Projects",handler: () => {
              window.location.href = "/projects/WriterCards/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%74%6F%6E%67%7A%65%6D%61%6F@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/tongze-mao", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
