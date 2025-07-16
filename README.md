The Montalban School Forecast
Stay Informed, Stay Safe. Your School's Daily Weather Update.

This web application provides hourly weather forecasts specifically tailored for public schools in Montalban, Rizal. It aims to help students, teachers, and school staff stay informed about local weather conditions, promoting safety and preparedness throughout the school day.

✨ Features
Hourly Forecasts: View detailed weather information for each hour, including temperature, precipitation, and weather conditions.

School Selection: Easily switch between different public schools in Montalban to view their respective forecasts.

Dynamic Weather Cards: Weather forecast cards change color based on the current weather condition (e.g., sunny, cloudy, rainy) for quick visual cues.

Responsive Design: Optimized for viewing on various devices, from mobile phones to desktop computers.

Clean & Intuitive Interface: A user-friendly design built with modern web technologies.

🚀 Technologies Used
Next.js: A React framework for building fast and scalable web applications.

React: A JavaScript library for building user interfaces.

Tailwind CSS: A utility-first CSS framework for rapid UI development.

TypeScript: For type-safe JavaScript development.

Local API Endpoint: Fetches weather data from a /api/weather endpoint (assumed to be part of the Next.js backend).

🛠️ Setup and Installation
Follow these steps to get the project up and running on your local machine.

Prerequisites
Node.js (LTS version recommended)

npm or Yarn

Installation Steps
Clone the repository:

git clone <your-repository-url>
cd <your-project-folder>

(Replace <your-repository-url> and <your-project-folder> with your actual repository details.)

Install dependencies:

npm install
# or
yarn install

Run the development server:

npm run dev
# or
yarn dev

This will start the development server at http://localhost:3000.

🖥️ Usage
Once the development server is running:

Open your web browser and navigate to http://localhost:3000.

Use the "Select a School" dropdown to choose a public school in Montalban.

The weather forecast cards will update to display hourly conditions for the selected school, with colors dynamically changing based on the weather.

📂 Project Structure (Key Files)
.
├── app/
│   ├── page.tsx          # Main application page (where the UI and logic reside)
│   ├── api/              # API routes (e.g., weather data fetching)
│   │   └── weather/route.ts
│   └── globals.css       # Global styles, including Tailwind CSS imports
├── public/               # Static assets (images, etc.)
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project dependencies and scripts

🤝 Contributing
Contributions are welcome! If you have suggestions for improvements or new features, please feel free to:

Fork the repository.

Create a new branch (git checkout -b feature/your-feature-name).

Make your changes and commit them (git commit -m 'Add new feature').

Push to the branch (git push origin feature/your-feature-name).

Open a Pull Request.

📄 License
This project is open-sourced under the MIT License.