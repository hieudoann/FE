import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';
import { useNavigate } from 'react-router-dom';
import './Map.component.css';
// import Cesium from "cesium";
const Map = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const subMarkersRef = useRef([]);
  const navigate = useNavigate();
  let routingControl = null;

  // Custom red dot icon
  const redDotIcon = L.icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const predefinedLocations = [
    {
      roomId: '62616bb00aa850983c21b11b',
      latitude: 10.810709,
      longitude: 106.713334,
      name: 'HOPT',
      subLocations: [
        {
          id: 1,
          name: 'A',
          latitude: 10.810687,
          longitude: 106.71362,
          nhiet_do1: 25,
          do_am1: 60,
        },
        {
          id: 2,
          name: 'B',
          latitude: 10.810649,
          longitude: 106.713516,
          nhiet_do1: 28,
          do_am1: 63,
        },
      ],
    },
  ];

  const addMainMarkers = () => {
    predefinedLocations.forEach((location) => {
      const marker = L.marker([location.latitude, location.longitude], { icon: redDotIcon }).addTo(
        mapInstanceRef.current
      );

      marker.bindPopup(`
        <div>
          <h3>${location.name}</h3>
        </div>
      `);

      marker.on('click', () => {
        mapInstanceRef.current.flyTo([location.latitude, location.longitude], 18);

        subMarkersRef.current.forEach((subMarker) => mapInstanceRef.current.removeLayer(subMarker));
        subMarkersRef.current = [];

        location.subLocations.forEach((subLocation) => {
          const subMarker = L.marker([subLocation.latitude, subLocation.longitude], {
            icon: redDotIcon,
          }).addTo(mapInstanceRef.current);

          subMarker.bindTooltip(subLocation.name, {
            permanent: true,
            direction: 'top',
            offset: [0, -10],
            className: 'custom-tooltip',
          });

          subMarker.on('click', () => {
            navigate(`/map/dashboard/${subLocation.id}`, { state: { subLocation } });

            if (routingControl) {
              routingControl.setWaypoints([
                L.latLng(location.latitude, location.longitude),
                L.latLng(subLocation.latitude, subLocation.longitude),
              ]);
            }
          });

          subMarkersRef.current.push(subMarker);
        });

        marker.openPopup();
      });
    });
  };

  useEffect(() => {
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([14.0583, 108.2772], 6);

      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution:
            'Tiles © Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, ' +
            'Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        }
      ).addTo(mapInstanceRef.current);

      L.Control.geocoder().addTo(mapInstanceRef.current);

      addMainMarkers();

      // Add routing control
      routingControl = L.Routing.control({
        waypoints: [],
        routeWhileDragging: true,
        geocoder: L.Control.Geocoder.nominatim(),
        router: new L.Routing.OSRMv1({
          serviceUrl: 'https://router.project-osrm.org/route/v1',
        }),
        showAlternatives: true,
        altLineOptions: {
          styles: [{ color: 'blue', opacity: 0.7, weight: 3 }],
        },
      }).addTo(mapInstanceRef.current);
    }
  }, []);

  return (
    <div className="App">
      <div ref={mapRef} id="map" className="map-container"></div>
    </div>
  );
};

export default Map;
