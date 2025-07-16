'use client';

import { useState, useEffect } from 'react';

interface WeatherData {
  index: string;
  startTime: string;
  precipitationIntensity: number;
  temperature: number;
  weatherCode: string;
  location_id: string;
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [schools, setSchools] = useState<string[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<string>('');

  useEffect(() => {
    fetch('/api/weather')
      .then(res => res.json())
      .then(data => {
        setWeatherData(data);
        const uniqueSchools = Array.from(new Set(data.map((item: WeatherData) => item.location_id)));
        setSchools(uniqueSchools as string[]);
        setSelectedSchool(uniqueSchools[0] as string);
      });
  }, []);

  const filteredData = weatherData.filter(item => item.location_id === selectedSchool);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Weather Dashboard</h1>
        <div className="mb-8">
          <label htmlFor="school-select" className="block text-lg font-medium mb-2">Select a School:</label>
          <select
            id="school-select"
            value={selectedSchool}
            onChange={e => setSelectedSchool(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {schools.map(school => (
              <option key={school} value={school}>{school}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map(item => (
            <div key={item.index} className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <p className="text-lg font-semibold">{item.startTime.replace(/"/g, '')}</p>
              <p className="text-2xl">{item.temperature}°C</p>
              <p>{item.weatherCode.replace(/"/g, '')}</p>
              <p>Precipitation: {item.precipitationIntensity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}