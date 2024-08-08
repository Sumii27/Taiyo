import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
import axios from 'axios';
import L from 'leaflet';
import ApexCharts from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// Define TypeScript interfaces for API responses
interface CountryInfo {
  _id: string;
  lat: number;
  long: number;
}

interface CountryData {
  country: string;
  countryInfo: CountryInfo;
  active: number;
  recovered: number;
  deaths: number;
}

interface HistoricalData {
  cases: Record<string, number>;
  deaths: Record<string, number>;
  recovered: Record<string, number>;
}

const DashboardPage: React.FC = () => {
  const [caseData, setCaseData] = useState<HistoricalData | null>(null);
  console.log('caseData', caseData)
  const [countryData, setCountryData] = useState<CountryData[]>([]);
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([20.5937, 78.9629]); // Default center

  // Define a custom icon
  const customIcon = new L.Icon({
    iconUrl: '/images/icon.png', // Replace with your icon URL
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Anchor point of the icon
    popupAnchor: [0, -32], // Point from which the popup should open relative to the icon
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching the data from the APIs
        const historicalResponse = await axios.get<HistoricalData>('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
        const countriesResponse = await axios.get<CountryData[]>('https://disease.sh/v3/covid-19/countries');
        await axios.get('https://disease.sh/v3/covid-19/all'); // Just to include for completeness, no use in state

        setCaseData(historicalResponse.data);
        setCountryData(countriesResponse.data);

        // Optional: Set map center to a specific location or based on data
        setMapCenter([20.5937, 78.9629]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const createLineChartData = () => {
    if (!caseData) return { series: [], categories: [] };

    const dates = Object.keys(caseData.cases);
    const cases = Object.values(caseData.cases);
    const deaths = Object.values(caseData.deaths);
    const recovered = Object.values(caseData.recovered);

    return {
      series: [
        {
          name: 'Cases',
          data: cases.splice(0, 50)
        },
        {
          name: 'Deaths',
          data: deaths.splice(0, 50)
        },
        {
          name: 'Recovered',
          data: recovered.splice(0, 50)
        }
      ],
      categories: dates.splice(0, 50)
    };
  };

  const chartOptions: ApexOptions = {
    chart: {
      type: 'line',
      height: 350,
      zoom: {
        enabled: false // Disable zooming
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: createLineChartData().categories,
      title: {
        text: 'Date'
      }
    },
    yaxis: {
      title: {
        text: 'Number of Cases'
      }
    },
    title: {
      text: 'COVID-19 Cases Over Time',
      align: 'left'
    },
    grid: {
      borderColor: '#f1f1f1'
    },
    colors: ['#FF4560', '#00E396', '#008FFB'],
    markers: {
      size: 5,
      hover: {
        size: 7
      }
    }
  };

  const chartSeries = createLineChartData().series;

  console.log('chartOptions', chartOptions, chartSeries)
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Line Chart */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Cases Fluctuations Over Time</h2>
        <ApexCharts options={chartOptions} series={chartSeries} type="line" height={350} />
      </div>

      {/* Leaflet Map */}
      <div className="h-96">
        <h2 className="text-xl font-semibold mb-4">COVID-19 Cases Map</h2>
        <MapContainer center={mapCenter} zoom={5} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {countryData.map(country => (
            <Marker
              key={country.countryInfo._id}
              position={[country.countryInfo.lat, country.countryInfo.long]}
              icon={customIcon} // Use the custom icon
            >
              <Popup>
                <strong>{country.country}</strong><br />
                <strong>Active:</strong> {country.active}<br />
                <strong>Recovered:</strong> {country.recovered}<br />
                <strong>Deaths:</strong> {country.deaths}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default DashboardPage;
