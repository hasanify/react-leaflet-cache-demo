import { Icon, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const iconSize = [20, 35];
const ALIGARH = [27.8974, 78.088] as LatLngExpression;

const removeWatermark = () => {
  document.querySelector('a[href="https://leafletjs.com"]')?.remove();
};

function App() {
  return (
    <>
      <MapContainer
        center={ALIGARH}
        zoom={8}
        scrollWheelZoom={true}
        zoomControl={true}
        whenReady={() => removeWatermark()}
      >
        <TileLayer url="http://localhost:3001/map?s={s}&z={z}&x={x}&y={y}" />
        <Marker position={ALIGARH} icon={MapMarkerIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

const MapMarkerIcon = new Icon({
  iconUrl: "/marker.png",
  iconSize: [iconSize[0], iconSize[1]],
  iconAnchor: [iconSize[0] / 2, iconSize[1] / 2],
  shadowAnchor: [iconSize[0] / 2, iconSize[1] / 2],
  popupAnchor: [0, 0],
});

export default App;
