import React, { useState, useCallback, useEffect } from 'react';
import Map from './Map';
import CoordinatesDisplay from './CoordinatesDisplay';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

// Fetch location data based on coordinates
const fetchLocationData = async (coords) => {
    try {
        const response = await axios.get('http://localhost:8000/location', {
            params: {
                lng: coords[0],
                lat: coords[1]
            }
        });
        return response.data; // Assuming the API returns data in this format
    } catch (error) {
        console.error('Error fetching location data:', error);
        return null;
    }
};

// Function to get route details from Mapbox Directions API
const fetchRoute = async (start, end) => {
    try {
        const response = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`);
        if (response.data && response.data.routes && response.data.routes.length > 0) {
            const route = response.data.routes[0];
            return {
                geometry: route.geometry,
                distance: route.distance,
                duration: route.duration
            };
        }
    } catch (error) {
        console.error('Error fetching route:', error);
        return null;
    }
};

const MapWithHeader = () => {
    const [coordinates, setCoordinates] = useState([0, 0]);
    const [map, setMap] = useState(null);
    const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/streets-v11');
    const [popupContent, setPopupContent] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [route, setRoute] = useState(null);
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);
    const [pickupCoords, setPickupCoords] = useState(null);

    // Function to handle showing the popup with a message
    const handleShowPopup = (locationName) => {
        setPopupContent(`The location is [${locationName}]`);
        setIsPopupVisible(true);

        // Hide the popup after 5 seconds
        setTimeout(() => {
            setIsPopupVisible(false);
        }, 5000); // Adjust the duration as needed
    };

    // Function to handle point selection on the map
    const handleSelectPoint = useCallback(async (coords) => {
        console.log('Point selected:', coords);

        // Fetch data based on coordinates
        const data = await fetchLocationData(coords);

        if (data) {
            // Show the popup with the name of the location
            handleShowPopup(data.title || 'Unknown Location');
        } else {
            handleShowPopup('No information available.');
        }

        setCoordinates(coords);

        // If pickup location is set, fetch route
        if (pickupCoords) {
            const routeData = await fetchRoute(pickupCoords, coords);
            if (routeData) {
                setRoute(routeData.geometry);
                setDistance(routeData.distance);
                setDuration(routeData.duration);
            }
        }
    }, [pickupCoords]);

    const handleZoomIn = () => {
        if (map) {
            map.zoomIn();
        }
    };

    const handleZoomOut = () => {
        if (map) {
            map.zoomOut();
        }
    };

    const handlePan = (direction) => {
        if (map) {
            const center = map.getCenter();
            switch (direction) {
                case 'up':
                    map.jumpTo({ center: [center.lng, center.lat + 0.01] });
                    break;
                case 'down':
                    map.jumpTo({ center: [center.lng, center.lat - 0.01] });
                    break;
                case 'left':
                    map.jumpTo({ center: [center.lng - 0.01, center.lat] });
                    break;
                case 'right':
                    map.jumpTo({ center: [center.lng + 0.01, center.lat] });
                    break;
                default:
                    break;
            }
        }
    };

    const handleMapStyleChange = (style) => {
        setMapStyle(style);
        if (map) {
            map.setStyle(style);
        }
    };

    return (
        <>
            <div className="relative h-screen">
                <Map
                    onCoordinateChange={setCoordinates}
                    onMapLoad={setMap}
                    mapStyle={mapStyle}
                    onSelectPoint={handleSelectPoint}
                    useMarkers={true}
                />
                <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
                    <CoordinatesDisplay
                        coordinates={coordinates}
                        onPan={handlePan}
                        onSelectPoint={handleSelectPoint}
                        onMapStyleChange={handleMapStyleChange}
                        onZoomIn={handleZoomIn}
                        onZoomOut={handleZoomOut}
                    />
                    {distance !== null && duration !== null && (
                        <div className="p-4 bg-white border rounded shadow-lg">
                            <p>Distance: {(distance / 1000).toFixed(2)} km</p>
                            <p>Duration: {(duration / 60).toFixed(2)} minutes</p>
                        </div>
                    )}
                </div>
            </div>

            {isPopupVisible && (
                <div className="absolute top-4 right-4 z-20 p-4 bg-white border rounded shadow-lg">
                    <div dangerouslySetInnerHTML={{ __html: popupContent }} />
                </div>
            )}
        </>
    );
};

export default MapWithHeader;
