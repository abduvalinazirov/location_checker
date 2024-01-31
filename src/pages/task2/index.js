import React from "react";
import { FeatureGroup, MapContainer, TileLayer } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

const Task2 = () => {
  const featureGroupRef = React.createRef();
  const defaultLocation = [41.3111, 69.2797];

  return (
    <div className="task__2">
      <div className="container">
        <h1 className="task__title">Task 2</h1>
        <p className="task__description">Leaflet yoki Mapbox dan foydalangan holda ixtiyoriy polygon chizish</p>
        <MapContainer className="map__container" center={defaultLocation} zoom={13} style={{ height: "400px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <FeatureGroup ref={featureGroupRef}>
            <EditControl
              position="topright"
              draw={{
                rectangle: false,
                circle: false,
                marker: false,
                circlemarker: false,
                polyline: false,
                polygon: true,
              }}
              edit={{
                remove: true,
              }}
              featureGroup={featureGroupRef.current}
              onCreated={(e) => {
                console.log(e);
              }}
              onEdited={(e) => {
                console.log(e);
              }}
              onDeleted={(e) => {
                console.log(e);
              }}
            />
          </FeatureGroup>
        </MapContainer>
      </div>
    </div>
  );
};

export default Task2;
