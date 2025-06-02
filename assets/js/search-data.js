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
        },{id: "post-shipping-bug-free-ios-apps-with-a-lean-sdet-strategy",
      
        title: "Shipping Bug‑Free iOS Apps With a Lean SDET Strategy",
      
      description: "A deep dive into the mobile‑first test pyramid, Appium + pytest pipelines, and why accessibility is the best API you never documented.",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Mobile-SDET-Strategy-for-iOS-Apps/";
        
      },
    },{id: "post-beyond-the-buzzwords-a-field-manual-for-functional-integration-smoke-and-regression-testing",
      
        title: "Beyond the Buzzwords — A Field Manual for Functional, Integration, Smoke and Regression Testing",
      
      description: "An in‑depth, code‑backed taxonomy of core test layers, with battle‑tested heuristics for mobile and backend pipelines.",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/SoftwareTesting/";
        
      },
    },{id: "post-future-career-planning-amp-summary-reflecting-on-suptech-what-s-my-next-step",
      
        title: "Future Career Planning &amp; Summary - Reflecting on SupTech, What’s My Next Step?...",
      
      description: "This article systematically summarizes my experience at SupTech and the achievements in app development while exploring my future career plans.",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Planning/";
        
      },
    },{id: "post-building-a-real-time-chat-feature",
      
        title: "Building a Real-Time Chat Feature",
      
      description: "An in-depth look at real-time chat implementation for mobile apps",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Chat/";
        
      },
    },{id: "post-harnessing-google-maps-for-real-time-mobile-apps",
      
        title: "Harnessing Google Maps for Real-Time Mobile Apps",
      
      description: "An inside look at how I built location-based features in my production apps using Google Maps",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Google-Maps/";
        
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
    },{id: "post-leveraging-push-notifications-in-mobile-apps",
      
        title: "Leveraging Push Notifications in Mobile Apps",
      
      description: "Techniques for implementing push notifications across iOS and Android, including scheduling, message routing, and handling deep links",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/Push-Notifications/";
        
      },
    },{id: "post-embedding-ai-chat-in-your-mobile-app",
      
        title: "Embedding AI Chat in Your Mobile App",
      
      description: "An overview of integrating AI-driven conversation features inside a mobile client",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/AI/";
        
      },
    },{id: "post-automatically-keeping-users-logged-in-on-mobile",
      
        title: "Automatically Keeping Users Logged In on Mobile",
      
      description: "A closer look at handling secure, persistent user authentication within mobile apps",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/Keeping-Users-Logged-In/";
        
      },
    },{id: "post-efficient-team-collaboration-for-flutter-projects-version-control-and-code-reviews",
      
        title: "Efficient Team Collaboration for Flutter Projects - Version Control and Code Reviews",
      
      description: "A deep dive into Git flow, code reviews, and CI/CD pipelines for Flutter teams",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/Team-Collaboration/";
        
      },
    },{id: "post-bringing-orders-chat-and-payment-together-a-full-stack-approach-to-on-demand-services",
      
        title: "Bringing Orders, Chat, and Payment Together: A Full-Stack Approach to On-Demand Services",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/Full-Stack/";
        
      },
    },{id: "post-dealing-with-constantly-changing-requirements-in-mobile-app-projects",
      
        title: "Dealing with Constantly Changing Requirements in Mobile App Projects",
      
      description: "Real-world lessons learned from SupTech on requirement management, version control, agile dev, and iterative releases",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/Project-Management/";
        
      },
    },{id: "post-becoming-the-multi-role-mvp-from-app-developer-to-pm-hr-admin-and-beyond",
      
        title: "Becoming the Multi-Role MVP: From App Developer to PM, HR, Admin, and Beyond...",
      
      description: "Reflections on wearing multiple hats in a startup: how juggling PM, HR, administrative, and customer support tasks shaped my growth as a developer—and beyond.",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/Multi-Role-MVP/";
        
      },
    },{id: "post-building-suptech-apps-from-zero-to-one",
      
        title: "Building SupTech Apps from Zero to One",
      
      description: "How to deliver iOS/Android apps in just 2–3 months, why Flutter was chosen, the agile development/iteration process, and tackling major technical challenges.",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/Apps-from-Zero-to-One/";
        
      },
    },{id: "post-how-i-maintained-high-standards-despite-handling-both-front-back-end-alone",
      
        title: "How I Maintained High Standards Despite Handling Both Front/Back-End Alone",
      
      description: "Discussing how I managed a full-stack mindset, from Flutter front-end plus Node.js/Firebase back-end—or collaborating with Java/MySQL back-end teammates—and the tips for rapid MVP building, debugging standards, and unified logging/exception management.",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/Full-Stack-Mindset/";
        
      },
    },{id: "post-integrating-stripe-payments-and-intelligent-job-dispatch",
      
        title: "Integrating Stripe Payments and Intelligent Job Dispatch",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/Backend-Logic/";
        
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
          section: "News",},{id: "projects-3calc-app",
          title: '3Calc App',
          description: "Multi-Calculator with Individual Histories",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3Calc/";
            },},{id: "projects-arcadia-high-school",
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
            },},{id: "projects-flipperly-app",
          title: 'Flipperly App',
          description: "My Role as a Solo iOS App Developer",
          section: "Projects",handler: () => {
              window.location.href = "/projects/Flipperly/";
            },},{id: "projects-fontmate-app",
          title: 'FontMate App',
          description: "Dedicated iOS Font Explorer &amp; SwiftUI Code Generator",
          section: "Projects",handler: () => {
              window.location.href = "/projects/FontMate/";
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
            },},{id: "projects-sparkdays-app",
          title: 'SparkDays App',
          description: "Habit Tracking with Reward-based Motivation",
          section: "Projects",handler: () => {
              window.location.href = "/projects/SparkDays/";
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
            },},{id: "projects-tzappify",
          title: 'TZAppify',
          description: "Indie App Studio — Building Productivity &amp; Lifestyle Apps in SwiftUI",
          section: "Projects",handler: () => {
              window.location.href = "/projects/TZAppify/";
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
            },},{id: "projects-waylater-app",
          title: 'WayLater App',
          description: "A Time-Capsule App for Writing Letters to Your Future Self",
          section: "Projects",handler: () => {
              window.location.href = "/projects/WayLater/";
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
        id: 'social-wechat_qr',
        title: 'Wechat_qr',
        section: 'Socials',
        handler: () => {
          window.open("", "_blank");
        },
      },{
        id: 'social-custom_social',
        title: 'Custom_social',
        section: 'Socials',
        handler: () => {
          window.open("https://apps.apple.com/us/developer/tongze-mao/id1801828453", "_blank");
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
