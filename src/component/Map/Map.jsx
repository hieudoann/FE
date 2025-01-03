import React, { useEffect, useRef, useState } from 'react';
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
  const routingControlRef = useRef(null); // Use ref to persist routingControl
  const [predefinedLocations, setPredefinedLocations] = useState([
    {
      roomId: '62616bb00aa850983c21b11b',
      latitude: 10.810709, // Initial placeholder, will be updated
      longitude: 106.713334, // Initial placeholder, will be updated
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
  ]);

  // Custom red dot icon
  const redDotIcon = L.icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  // Function to fetch latest location data
  const fetchLatestLocation = async () => {
    try {
      const response = await fetch('https://iomt.hoangphucthanh.vn/index.php?latest');
      const data = await response.json();
      console.log('Maps:', data.lat, data.lon);
      // Update the main location's latitude and longitude with fetched data
      setPredefinedLocations((prevLocations) =>
        prevLocations.map((location) =>
          location.roomId === '62616bb00aa850983c21b11b'
            ? {
                ...location,
                latitude: data.lat || location.latitude,
                longitude: data.lon || location.longitude,
              }
            : location
        )
      );

      console.log('Fetched data:', data);
    } catch (error) {
      console.error('Error fetching latest location:', error);
    }
  };

  // Add main markers and circles
  const addMainMarkers = () => {
    predefinedLocations.forEach((location) => {
      // Add main marker
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

        // Remove existing subMarkers
        subMarkersRef.current.forEach((subMarker) => mapInstanceRef.current.removeLayer(subMarker));
        subMarkersRef.current = [];

        // Add subMarkers
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

            if (routingControlRef.current) {
              routingControlRef.current.setWaypoints([
                L.latLng(location.latitude, location.longitude),
                L.latLng(subLocation.latitude, subLocation.longitude),
              ]);
            }
          });

          subMarkersRef.current.push(subMarker);
        });

        marker.openPopup();
      });

      // Add circle around main marker
      const circle = L.circle([location.latitude, location.longitude], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.1,
        radius: 40, // Radius in meters
      }).addTo(mapInstanceRef.current);

      circle.bindPopup(`
        <div>
          <h4>${location.name} Area</h4>
          <p>Radius: 500 meters</p>
        </div>
      `);
    });
  };

  useEffect(() => {
    // Initialize the map only once
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
      routingControlRef.current = L.Routing.control({
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

    // Fetch the latest location data when component mounts
    fetchLatestLocation();

    // Set up polling to fetch data periodically (e.g., every 30 seconds)
    const intervalId = setInterval(fetchLatestLocation, 30000); // 30,000 ms = 30 seconds

    return () => {
      clearInterval(intervalId);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove(); // Clean up the map instance on unmount
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Removed predefinedLocations from dependency array to prevent re-initialization

  return (
    <div className="App">
      <div ref={mapRef} id="map" className="map-container"></div>
    </div>
  );
};

export default Map;