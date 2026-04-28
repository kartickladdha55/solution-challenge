# SmartResource: Data-Driven Volunteer Coordination Platform

SmartResource is a Next.js-based social impact platform designed to centralize scattered community needs data and intelligently match them with available volunteers. It provides a real-time dashboard for coordinators to monitor urgency hotspots and optimize resource allocation.

## 🌟 Key Features

- **Command Dashboard:** High-level overview of community needs, volunteer capacity, and recent activity.
- **District Urgency Heatmap:** Visualized SVG map showing real-time urgency levels across different city districts.
- **Smart Matching Engine:** Algorithmic volunteer-to-task matching based on skill overlap, proximity, and availability.
- **Needs Registry:** Centralized database for reporting and tracking community needs (Food, Medical, Education, etc.).
- **Volunteer Roster:** Comprehensive list of registered volunteers with skill tracking and assignment history.
- **Impact Analytics:** Visualized data insights using Recharts to identify coverage gaps and operational trends.

## 🛠️ Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS (v4)
- **Icons:** Lucide React
- **Charts:** Recharts
- **State Management:** React Context API
- **Fonts:** Google Fonts (Fraunces & DM Sans)

## 🚀 Getting Started

This project is a standalone prototype and does not require a backend, database, or API keys.

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

- `/app`: Application pages and layout.
- `/components`: Reusable UI components (Sidebar, StatCard, DistrictMap, etc.).
- `/context`: Global state management via `AppContext`.
- `/data`: Mock JSON data for needs, volunteers, matches, and analytics.
- `/lib`: Utility functions and matching algorithm logic.

## 🧠 Matching Algorithm

The platform uses a weighted scoring system to recommend candidates:
- **Skill Match (+40 pts):** If volunteer has a skill matching the need's category.
- **Proximity (+30 pts):** If volunteer is in the same district.
- **Proximity (+15 pts):** If volunteer is in an adjacent district.
- **Availability (+30 pts):** If volunteer is currently "Available".

## 📄 License

This project is open-source and developed for social impact initiatives.
