// Map.js
import React, { useEffect, useRef, useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';

const MapComponent = ({ garages, center }) => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const mapInstance = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [center.lng, center.lat],
      zoom: 12,
    });

    setMap(mapInstance);

    return () => mapInstance.remove();
  }, [center]);

  useEffect(() => {
    if (!map) return;

    // Add markers for garages
    garages.forEach((garage) => {
      new maplibregl.Marker()
        .setLngLat([garage.addressForUserDto.longitude, garage.addressForUserDto.latitude])
        .setPopup(
          new maplibregl.Popup({ offset: 25 }).setHTML(
            `<div>
              <strong>${garage.garageName}</strong><br />
              ${garage.addressForUserDto.streetAddress}, ${garage.addressForUserDto.city}<br />
              ${garage.mobileNo}
            </div>`
          )
        )
        .addTo(map);
    });
  }, [map, garages]);

  return (
    <div
      ref={mapContainer}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default MapComponent;
