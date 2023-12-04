import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const ClickToSelectAddress = ({onSelectAddress}) => {
  const [defaultPosition, setDefaultPosition] = useState([9.95867,76.25851]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);

  const handleClick = async (e) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${e.latlng.lat}&lon=${e.latlng.lng}`
      );
      const data = await response.json();
      if (data && data.display_name) {
        setSelectedAddress(data.address);
        setSelectedCoordinates([e.latlng.lat, e.latlng.lng]);
        onSelectAddress(selectedAddress)
      } else {
        setSelectedAddress(null);
        setSelectedCoordinates(null);
        console.log('Address not found');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  useEffect(() => {
    const fetchCoordinates = async () => {
      const cityName = localStorage.getItem('city'); // Retrieve city name from localStorage
      if (cityName) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${cityName}`
          );
          const data = await response.json();
          if (data && data.length > 0) {
            const { lat, lon } = data[0];
            setDefaultPosition([parseFloat(lat), parseFloat(lon)]);
          } else {
            console.log('Coordinates not found for the city');
          }
        } catch (error) {
          console.error('Error fetching coordinates:', error);
        }
      }
    };

    fetchCoordinates();
  }, []);

  const LocationMarker = () => {
    const map = useMapEvents({
      click: handleClick,
    });
    return null;
  };

  return (
    <div>
      {/* <p>Selected Address: {selectedAddress || 'Click on the map to select an address'}</p> */}

      <MapContainer
        center={defaultPosition}
        zoom={1}
        style={{height:"400px", width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker />
        {selectedCoordinates && (
          <Marker position={selectedCoordinates}>
            <Popup>{selectedAddress}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default ClickToSelectAddress;
