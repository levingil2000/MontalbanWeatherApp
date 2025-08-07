// This line indicates that this component is a client-side component in Next.js
'use client';

// Import necessary React hooks
import { useState, useEffect } from 'react';

// Define the structure of your weather data objects
interface WeatherData {
  index: string;
  startTime: string;
  precipitationIntensity: number;
  temperature: number;
  weatherCode: string;
  location_id: string;
}

// === NEW FUNCTION: Determines the background color class based on weatherCode ===
// This function takes the weatherCode string and returns a Tailwind CSS class.
// It checks for keywords in the weatherCode to assign different colors.
const getWeatherCardColor = (weatherCode: string): string => {
  // Convert the weatherCode to lowercase for case-insensitive comparison
  const code = weatherCode.toLowerCase();

  // Conditional logic to return different Tailwind background color classes
  if (code.includes("heavy")) {
    return "bg-red-700"; // A darker blue for rain
  } else if (code.includes("rain") || code.includes("showers") || code.includes("drizzle")) {
    return "bg-blue-700"; // A darker blue for rain
  } else if (code.includes("cloudy") || code.includes("overcast") || code.includes("fog")) {
    return "bg-slate-700"; // A darker gray for clouds/overcast
  } else if (code.includes("sun") || code.includes("clear")) {
    return "bg-yellow-600"; // A darker yellow/orange for sunny/clear
  } else if (code.includes("partly cloudy") || code.includes("mostly cloudy")) {
    return "bg-indigo-700"; // A purple shade for mixed conditions
  } else {
    // Default background color if no specific condition matches
    return "bg-gray-800"; 
  }
};
// === END NEW FUNCTION ===

// The main Home component for your Next.js application
export default function Home() {
  // State variables to hold weather data, list of schools, and the currently selected school
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [schools, setSchools] = useState<string[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<string>('');

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Fetch weather data from your API endpoint
    fetch('/api/weather')
      .then(res => res.json()) // Parse the JSON response
      .then(data => {
        setWeatherData(data); // Set the fetched weather data to state

        // Extract unique school IDs to populate the dropdown
        const uniqueSchools = Array.from(new Set(data.map((item: WeatherData) => item.location_id)));
        setSchools(uniqueSchools as string[]); // Set unique schools to state

        // Automatically select the first school in the list
        setSelectedSchool(uniqueSchools[0] as string);
      });
  }, []); // Empty dependency array means this effect runs only once after initial render

  // Filter the weather data based on the currently selected school
  const filteredData = weatherData.filter(item => item.location_id === selectedSchool);

  return (
    // Main container div for the entire page, with dark background and padding
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Centered content area with a maximum width */}
      <div className="max-w-4xl mx-auto">
        {/* Main title of the dashboard */}
        <h1 className="text-4xl font-extrabold mb-8 text-center drop-shadow-lg">
          The Montalban School Forecast
        </h1>
        {/* Subtitle providing more context */}
        <p className="text-xl font-semibold text-center text-gray-600 mb-12">
          Stay Informed, Stay Safe. Your School&apos;s Daily Weather Update.
        </p>
        <p className="text-xl font-semibold text-center text-gray-600 mb-12">
          August 8, 2025 Forecast data from Tomorrow.io
        </p>

        {/* School selection dropdown section */}
        <div className="mb-8">
          <label htmlFor="school-select" className="block text-lg font-medium mb-2">Select a School:</label>
          <select
            id="school-select"
            value={selectedSchool}
            onChange={e => setSelectedSchool(e.target.value)} // Update selected school on change
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {/* Map through the unique schools to create dropdown options */}
            {schools.map(school => (
              <option key={school} value={school}>{school}</option>
            ))}
          </select>
        </div>

        {/* Grid container for weather forecast cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Map through filtered weather data to create individual forecast cards */}
          {filteredData.map(item => (
            // === MODIFIED LINE: Dynamic class for card background based on weatherCode ===
            // The `getWeatherCardColor` function is called here to apply the correct background.
            <div 
              key={item.index} 
              className={`rounded-lg p-6 shadow-lg ${getWeatherCardColor(item.weatherCode)}`}
            >
              {/* Display start time, removing any extra quotes */}
              <p className="text-lg font-semibold">{item.startTime.replace(/"/g, '')}</p>
              {/* Display temperature */}
              <p className="text-2xl">{item.temperature}°C</p>
              {/* Display weather code, removing any extra quotes */}
              <p>{item.weatherCode.replace(/"/g, '')}</p>
              {/* Display precipitation intensity */}
              <p>Precipitation: {item.precipitationIntensity}</p>
            </div>
            // === END MODIFIED LINE ===
          ))}
        </div>
      </div>
    </div>
  );
}