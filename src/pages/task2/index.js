import React from "react";
import { FeatureGroup, MapContainer, TileLayer } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";

const Task2 = () => {
  const featureGroupRef = React.createRef();
  const defaultLocation = [41.3111, 69.2797];

  const customIcon = new L.Icon({
    iconUrl: "/images/placeholder.png", // Replace 'path_to_your_icon_image.png' with the actual path to your icon image
    iconSize: [38, 38], // Size of the icon
    iconAnchor: [22, 38], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, 0], // Point from which the popup should open relative to the iconAnchor
  });

  return (
    <div className="task__2">
      <div className="container">
        <p className="task__title">Leaflet yoki Mapbox dan foydalangan holda ixtiyoriy polygon chizish</p>
        <MapContainer className="map__container" center={defaultLocation} zoom={13} style={{ height: "400px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <FeatureGroup ref={featureGroupRef}>
            <EditControl
              position="topright"
              draw={{
                rectangle: true,
                circle: true,
                marker: {
                  icon: customIcon,
                },
                circlemarker: true,
                polyline: true,
                polygon: true,
              }}
              edit={{
                remove: true,
              }}
              featureGroup={featureGroupRef.current}
              onCreated={(e) => {
                console.log(1);
                if (e.layerType === "marker") {
                  // Set the custom icon to the created marker
                  console.log(123);
                  e.layer.setIcon(customIcon);
                }
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
