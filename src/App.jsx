// App.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "./App.css";

const earthquakeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
});

function App() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [selectedEarthquake, setSelectedEarthquake] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
        );
        const data = await response.json();
        setEarthquakes(data.features);
      } catch (error) {
        console.error("Error fetching earthquake data:", error);
      }
    };
    fetchData();
  }, []);

  const fetchHistory = async (latitude, longitude) => {
    try {
      const radiusKm = 500;
      const response = await fetch(
        `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&latitude=${latitude}&longitude=${longitude}&maxradiuskm=${radiusKm}&starttime=${new Date(
          Date.now() - 30 * 24 * 60 * 60 * 1000
        ).toISOString()}`
      );
      const data = await response.json();
      setHistory(data.features.slice(0, 6));
    } catch (error) {
      console.error("Error fetching earthquake history:", error);
    }
  };

  const handleMarkerClick = (earthquake) => {
    setSelectedEarthquake(earthquake);
    const [longitude, latitude] = earthquake.geometry.coordinates;
    fetchHistory(latitude, longitude);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Earthquake Visualizer</h1>
      </header>
      <div className="content">
        <MapContainer center={[20, 0]} zoom={2} className="leaflet-container">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {earthquakes.map((earthquake) => {
            const [longitude, latitude] = earthquake.geometry.coordinates;
            return (
              <Marker
                key={earthquake.id}
                position={[latitude, longitude]}
                icon={earthquakeIcon}
                eventHandlers={{
                  click: () => handleMarkerClick(earthquake),
                }}
              >
                <Popup>
                  <div style={{ textAlign: "left", lineHeight: "1.5" }}>
                    <strong>Location:</strong> {earthquake.properties.place}
                    <br />
                    <strong>Magnitude:</strong> {earthquake.properties.mag}
                    <br />
                    <strong>Time:</strong>{" "}
                    {new Date(earthquake.properties.time).toLocaleString()}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
        {selectedEarthquake && (
          <div className="history-sidebar">
            <h2>Recent Earthquake History</h2>
            <p>
              <strong>Location:</strong> {selectedEarthquake.properties.place}
            </p>
            <p>Recent earthquakes within 500 km:</p>
            <ul>
              {history.map((quake) => (
                <li key={quake.id}>
                  <strong>Magnitude:</strong> {quake.properties.mag} |{" "}
                  <strong>Location:</strong> {quake.properties.place} |{" "}
                  <strong>Time:</strong>{" "}
                  {new Date(quake.properties.time).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
