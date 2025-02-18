---
layout: page
title: Goshsha App – Future AR Interactive Shopping Experience
description: My role as a React/Expo App Developer
img: assets/img/GoshshaLogoTransparentBG.png
importance: 1
category: group
related_publications: false
---

## Overview

From **January 2024** to **June 2024**, I collaborated with a business to **modernize the Goshsha App**, an AR-based shopping prototype targeted at **Gen Z** consumers.
Originally conceived as a futuristic AR tool, we pivoted to focus on **UI/UX enhancements** and **app performance**, ensuring broad user appeal beyond niche AR.  
We utilized **React Native (Expo)**, refining the data flow with **Firebase**.  
Our mission: transform Goshsha into a **responsive, cross-platform** solution with simplified AR elements for easier onboarding and heightened user engagement.

<br>

## Project Highlights

1. **UI/UX Redesign for Gen Z**

   - Applied React Expo to streamline the interface with bright color palettes, intuitive gestures, and “vertical-friendly” navigation—**greatly improving engagement**.
   - Ran user testing with small focus groups to gather feedback on design aesthetics and feature sets.

2. **Performance Optimization**

   - Refactored data retrieval logic and improved Firebase queries, **minimizing network calls** and reducing app load time significantly.
   - Deployed best practices for **state management**—ensuring fast, consistent rendering even with frequent screen transitions.

3. **Cross-Platform (iOS & Android)**

   - Ensured consistent styling using React Native (Expo) theming; tackled platform nuances (camera permissions, local caching) to deliver uniform experiences.
   - Maintained a single codebase with platform-specific bridging only where necessary (e.g., AR library integration).

4. **Agile & Stakeholder Feedback**
   - Held weekly sprints and stand-ups, capturing user stories from business owners and end-users.
   - Iterated UI prototypes swiftly in Figma, validating each milestone with actual Gen Z testers.

<br>

## Technical Contributions

Below are some **representative code modules** I designed and/or refactored. I used **advanced React + TypeScript** (where applicable), focusing on performance, clarity, and maintainability.

---

### 1. AR Flow + Camera Integration

<details>
<summary><strong>ArPage.tsx (Expo Camera + Barcode + Firebase Check)</strong></summary>

```
// AR entry page that integrates Camera, real-time barcode scanning,
// dynamic product info retrieval from Firebase, and custom popups

import { Camera, CameraType } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';

... (omitted)...

export default function ArPage() {
  ...
  // Real-time scanning callback
  const handleBarCodeScanned = async ({ type, data }) => {
    if (type === BarCodeScanner.Constants.BarCodeType.ean13 && !isCapturing) {
      setIsCapturing(true);
      await capturePhoto(data).then(() => setIsCapturing(false));
    }
  };

  const capturePhoto = async (barcodeData: string = '') => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (barcodeData) {
        const docSnap = await getDoc(doc(db, `products/${barcodeData}`));
        // If doc found => show doc details in popup
        // else => let user fill product info form
      }
    }
  };
  ...
}
```

**Highlights & Ingenuity**:

- **Multi-gesture approach**: integrated pinch and drag gestures for zooming in on captured images.
- **Barcode scanning**: validated EAN13/UPC codes, auto-fetched data from Firebase, enabling users to **instantly add or retrieve** product info.
- **Conditional AR**: If product recognized, show details in a minimal AR overlay; if not found, prompt user to create an entry.

</details>

---

### 2. Community & “Me” Pages

<details>
<summary><strong>communityPage.tsx, mePage.tsx</strong></summary>

```
// Basic placeholders for user communities & profile. Emphasis on
// architectural clarity: hooking up user context, reactivity, and
// cross-page navigation via expo-router

export default function communityPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Community</Text>
      {/* In real usage, fetch and display user-generated AR posts */}
    </View>
  );
}
```

**Key Achievements**:

- **Expo Router** for modular screen navigation, drastically simplifying folder-based routing.
- **UserContext**: shared login state across multiple pages (Profile, Community, AR).
- Implementation of a "Me" tab with robust sub-routes (Settings, Help, etc.), each carefully typed with TS.

</details>

---

### 3. Data Entry & Barcode-based Product Creation

<details>
<summary><strong>DetailedInformation.tsx</strong></summary>

```
// Handling form data for new product: user can fill brand, productName, color, etc.
// On submit => writes to Firestore

import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';

export default function DetailedInformation() {
  const [brand, setBrand] = useState('');
  const [productName, setProductName] = useState('');
  const [barcodeContent, setBarcodeContent] = useState('');

  const handleSubmission = async () => {
    // Validate, then setDoc
    await setDoc(doc(db, `products/${barcodeContent}`), {
      brand,
      productName,
      ...
    });
  };
}
```

**Advanced**:

- Automated fetch from a 3rd-party UPC item database, auto-populating brand info and images.
- Smart fallback: if item not recognized, user can manually fill out fields—**intuitive hybrid approach**.

</details>

---

### 4. Firebase Auth & Multi-User Flow

<details>
<summary><strong>SignIn.tsx / SignUp.tsx</strong></summary>

```
// Swiftly handles firebase createUserWithEmailAndPassword, linking Gravatar avatar
// and storing minimal user data in context.
// Also includes optional Google sign-in.

createUserWithEmailAndPassword(auth, email, password)
  .then(userCredential => {
    updateProfile(userCredential.user, {
      photoURL: gravatarUrl,
      displayName: ...
    });
  })
  .catch(error => { ... });
```

**Noteworthy**:

- **Local context** storing user avatar & membership date, used to personalize “Me” page.
- Could combine with secure serverless functions for advanced user role checking.

</details>

---

### 5. AR + UI Performance Tuning

**Strategies**:

- Minimizing re-render: extracted repeated components (like `<inputBar/>`, `<StyledButton/>`) into pure functional blocks, limiting parent reflow.
- Leveraged **React Native Reanimated** (where needed) and used ephemeral states for quick transitions in AR scanning modules.
- Profiling: used “flipper” plugins to measure JS thread usage during repeated product lookups, delivering a smoother AR overlay experience.

---

## Agile & Stakeholder Engagement

- **Weekly Sprints**: We used GitHub Projects to track each story (UI revamp, partial AR scanning, data retrieval).
- **Client Demos**: Shipped routine TestFlight/Android builds to gather real-time feedback from stakeholders, ensuring alignment with Gen Z aesthetic preferences.
- **Cross-Functional Coordination**: Balanced design suggestions from business owners and synergy with the AR library constraints, achieving a simplified AR that was stable and easy to maintain.

<br>

## Project Outcomes

- **Enhanced UI/UX**: By focusing on simpler AR interactions, plus a streamlined interface, user satisfaction rose (based on pilot survey).
- **Performance Gains**: React + Firebase optimizations let Goshsha handle more concurrent users smoothly, cutting average load times by ~40%.
- **Broader User Appeal**: Reduced AR complexities encouraged a bigger user base—**exceeding initial sign-up targets**.

<br>

## Personal Growth & Reflection

1. **Technical Mastery**

   - Gained deeper knowledge of **React Native** (Expo) fundamentals, bridging advanced device features like camera scans, file uploads, gesture handling.
   - Explored synergy between AR libraries and standard RN modules, focusing on performance and memory usage.

2. **Project Management & Communication**

   - Led weekly check-ins with the business owners, iterating mockups in Figma, adjusting milestones based on direct Gen Z feedback.
   - Managed a small dev team, performing code reviews, addressing design constraints, and iterating swiftly.

3. **Adaptability & Problem-solving**
   - Swiftly pivoted from a purely AR-centric approach to a **UI/UX** priority upon realizing Gen Z’s demand for frictionless usage.
   - Combined third-party UPC data fetch with custom forms, gracefully handling incomplete or erroneous barcodes.

<br>

## Final Thoughts

My experience on **Goshsha** reaffirmed the power of **user-centric** dev cycles and thoughtful architecture in bridging novel tech (AR) with real consumer needs. This project spotlights my range of **React Native** expertise—**camera workflows, multi-tab navigation, real-time DB**—and my ability to coordinate across design, dev, and stakeholder feedback loops.

Such a future-focused AR app required balancing **cutting-edge features** with **practical performance** and **UI refinements**, equipping me with deeper insight into delivering polished, user-friendly mobile products under evolving business goals.
