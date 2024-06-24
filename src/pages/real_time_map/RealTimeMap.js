import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
  iconUrl: "/images/placeholder.png",
  iconSize: [38, 38],
  iconAnchor: [20, 38],
  popupAnchor: [0, 0],
});

function MovingMarker({ trackData }) {
  const markerRef = useRef(null);
  const map = useMap();

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker || !trackData.kmlCoordList.length) return; // Ensure marker and data are available

    let step = 0;
    const interval = setInterval(() => {
      if (step < trackData.kmlCoordList.length) {
        const [lat, lng] = trackData.kmlCoordList[step];
        marker.setLatLng(new L.LatLng(lat, lng), { animate: true, duration: 1.0 });
        map.panTo(new L.LatLng(lat, lng), { animate: true, duration: 1.0 });
        step++;
      } else {
        clearInterval(interval); // Stop the animation when the end is reached
      }
    }, 500); // Adjust time interval for movement speed

    return () => clearInterval(interval);
  }, [map, trackData.kmlCoordList]); // Add trackData.kmlCoordList to dependency array

  return <Marker ref={markerRef} position={trackData.kmlCoordList[0]} icon={customIcon} />;
}

export default function RealTimeMap() {
  const [trackData, setTrackData] = useState({ kmlCoordList: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("response.json"); // Adjust the URL if needed
        const data = await response.json();

        setTrackData({
          kmlCoordList: data.kmlFolder.kmlPlacemarkList[0].kmlTrack.kmlCoordList.map(([lat, lng]) => [lng, lat]),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!trackData.kmlCoordList.length) {
    return <div>Loading...</div>; // Show a loading state while data is loading
  }

  const center = trackData.kmlCoordList[0];

  return (
    <div className="container">
      <p className="task__title">Real vaqtda xaritani harakatlantirish va jism trayektoriyasini kuzatish</p>

      <MapContainer className="map__container" center={center} zoom={15} style={{ minHeight: "80vh", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Polyline positions={trackData.kmlCoordList} color="red" />
        <MovingMarker trackData={trackData} />
      </MapContainer>
    </div>
  );
}
