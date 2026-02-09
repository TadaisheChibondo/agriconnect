Yield-Trade 🌾Bridging the gap between small-scale farmers and industrial buyers through AI-driven matching.AgriConnect is a dual-sided marketplace designed to solve supply chain inefficiencies in the agricultural sector. It connects farmers directly with startups and industrial processors, using an intelligent matching algorithm to recommend partnerships based on crop type, volume, price, and location.🚀 Key Features👨‍🌾 For Farmers (Supply Side)Harvest Management: Post listings for crops with photos, quantities, and pricing.AI Buyer Matching: Instantly find industrial buyers looking for your specific produce.Direct Connection: Access buyer contact details (phone/email) once a match is accepted.🏭 For Startups (Demand Side)Procurement Dashboard: Post sourcing requirements (e.g., "Need 1000kg Soybeans").Smart Recommendations: Receive AI-curated lists of verified farmers who meet your volume and price criteria.Quality Verification: View crop photos and harvest dates before initiating contact.🧠 The AI EngineScoring Algorithm: Matches are ranked (0-100%) based on:Price Compatibility: (Is the offer within budget?)Volume Fulfillment: (Can the farmer meet the required quota?)Location & Freshness: (Optimizing for logistics).🛠 Tech StackFrontend:React.js (Vite)Tailwind CSS (Styling)Lucide React (Icons)Axios (API Integration)Backend:Django REST Framework (API)Python (Business Logic)PostgreSQL (Production Database) / SQLite (Dev)Gunicorn & WhiteNoise (Deployment)📸 Screenshots(You can upload screenshots to your repo later and link them here)Farmer DashboardStartup DashboardManage listings and view matchesTrack procurement needs📦 Installation & SetupPrerequisitesNode.js & npmPython 3.8+Git1. Clone the RepositoryBashgit clone https://github.com/YOUR_USERNAME/agriconnect.git
cd agriconnect
2. Backend SetupBashcd backend
python -m venv venv
# Windows
.\venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
3. Frontend SetupOpen a new terminal:Bashcd frontend
npm install
npm run dev
Visit http://localhost:5173 to view the app.🔑 Usage GuideRegister: Create an account as a Farmer or Startup.Post:Farmers: Click "Post New Harvest".Startups: Click "Post Requirement".Match:The dashboard automatically runs the matching algorithm.Click "Find Matches" (Farmer) or view the Dashboard (Startup) to see scores.Connect: Click "Send Offer" or "Request Contract" to reveal contact info.🤝 ContributingThis project was built for an academic module on AI in Business. Contributions are welcome!Fork the ProjectCreate your Feature Branch (git checkout -b feature/AmazingFeature)Commit your Changes (git commit -m 'Add some AmazingFeature')Push to the Branch (git push origin feature/AmazingFeature)Open a Pull Request