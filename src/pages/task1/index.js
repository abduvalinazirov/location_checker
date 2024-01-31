import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";

const getCenter = (coords) => {
  if (coords.length === 0) {
    return [0, 0];
  }
  const average = [(coords[0][0] + coords[coords.length - 1][0]) / 2, (coords[0][1] + coords[coords.length - 1][1]) / 2];
  return average;
};

const Task1 = () => {
  const [trackData, setTrackData] = useState({
    kmlCoordList: [],
    parkingPins: [],
  });
  const center = getCenter(trackData.kmlCoordList);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("response.json");
        const data = await response.json();

        setTrackData({
          parkingPins: data?.parkingPins || [],
          kmlCoordList: data?.kmlFolder?.kmlPlacemarkList[0]?.kmlTrack?.kmlCoordList.map(([first, second]) => [second, first]),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const startIcon = new L.Icon({
    iconUrl: "/images/start.png",
    iconSize: [30, 30],
  });

  const endIcon = new L.Icon({
    iconUrl: "/images/end.png",
    iconSize: [30, 30],
    iconAnchor: [1, 30],
  });

  const parkingIcon = new L.Icon({
    iconUrl: "/images/parking.png",
    iconSize: [20, 20],
  });

  return (
    <div className="task__1">
      <div className="container">
        <h1 className="task__title">Task 1</h1>
        <p className="task__description">
          json fayldagi kmlCoordList fieldidan kordinatalarni olgan holda trackni chizish va trackning Start va Finish pointlarini alohida ajratib
          ko’rsatish. parkingPins fieldidan track davomida qoldirilgan parking pointslani ko’rsatish
        </p>
        {center[0] !== 0 && (
          <MapContainer center={center} zoom={12.5} className="map__container">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {trackData.parkingPins.map((position, index) => (
              <Marker key={index} position={position} icon={parkingIcon}>
                <Popup>
                  <h6>Parking Point {index + 1}</h6>
                  <p className="m-0">
                    <b>Parking time:</b> {position.parkingTime}
                  </p>
                  <p className="m-0">
                    <b>Track time:</b> {position.trackTime}
                  </p>
                  <p className="m-0">
                    <b>Track date:</b> {position.trackDate}
                  </p>
                </Popup>
              </Marker>
            ))}
            <Polyline positions={trackData.kmlCoordList} color="red" weight={2} />
            {trackData.kmlCoordList.length ? (
              <>
                <Marker position={trackData.kmlCoordList[0]} icon={startIcon}>
                  <Popup>Start Point</Popup>
                </Marker>
                <Marker position={trackData.kmlCoordList[trackData.kmlCoordList.length - 1]} icon={endIcon}>
                  <Popup>Finish Point</Popup>
                </Marker>
              </>
            ) : (
              ""
            )}
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default Task1;
