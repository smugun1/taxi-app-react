import React, { useState, useEffect } from 'react';
import MapGL, { Marker, NavigationControl, Source, Layer, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const MapComponent = ({ pickupLocation, dropoffLocation }) => {
    // const [locations, setLocations] = useState([]);
    const [viewport, setViewport] = useState({
        latitude: 37.7749,
        longitude: -122.4194,
        zoom: 12,
        width: '100vw',
        height: '100vh'
    });
    const [userLocation, setUserLocation] = useState(null);
    const [route, setRoute] = useState(null);
    const [distance, setDistance] = useState(null);
    const [duration, setDuration] = useState(null);
    const [popupInfo, setPopupInfo] = useState(null);
    const [selectedArea, setSelectedArea] = useState(null);
    const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/streets-v11');
    const [map, setMap] = useState(null); // State to hold the map instance

    const isValidCoordinate = (coord) => {
        return coord && Array.isArray(coord) && coord.length === 2 &&
            !isNaN(coord[0]) && !isNaN(coord[1]);
    };

    useEffect(() => {
        if (map) {
            map.on('mouseout', (event) => {
                if (!event || !event.lngLat) {
                    console.warn('Invalid event or missing coordinates on mouseout');
                    return;
                }

                const coords = event.lngLat;
                if (!isValidCoordinate(coords)) {
                    console.error('Invalid coordinates:', coords);
                    return;
                }
            });
        }
    }, [map]);

    useEffect(() => {
        // Fetch locations from the Django API
        axios.get('/api/locations/')
            .then(response => {
                // setLocations(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const newViewport = {
                    latitude,
                    longitude,
                    zoom: 12,
                    width: '100vw',
                    height: '100vh',
                };
                setUserLocation({ latitude, longitude });
                setViewport(newViewport);
            },
            (error) => {
                console.error('Error getting geolocation:', error);
            },
            { enableHighAccuracy: true }
        );
    }, []);

    const parseLocation = (location) => {
        if (!location || typeof location !== 'string') {
            console.warn('Invalid location format:', location);
            return null;
        }
        const [longitude, latitude] = location.split(',').map((coord) => parseFloat(coord));
        if (isNaN(latitude) || isNaN(longitude)) {
            console.warn('Invalid coordinates after parsing:', { latitude, longitude });
            return null;
        }
        return { latitude, longitude };
    };

    const pickupCoord = pickupLocation ? parseLocation(pickupLocation) : null;
    const dropoffCoord = dropoffLocation ? parseLocation(dropoffLocation) : null;

    useEffect(() => {
        if (pickupCoord && dropoffCoord) {
            const bounds = [
                [pickupCoord.longitude, pickupCoord.latitude],
                [dropoffCoord.longitude, dropoffCoord.latitude]
            ];

            const newViewport = {
                ...viewport,
                latitude: (bounds[0][1] + bounds[1][1]) / 2,
                longitude: (bounds[0][0] + bounds[1][0]) / 2,
                zoom: 10,
            };

            setViewport(newViewport);
            getRoute([pickupCoord.longitude, pickupCoord.latitude], [dropoffCoord.longitude, dropoffCoord.latitude]);
        }
    }, [pickupCoord, dropoffCoord]);

    const getRoute = async (start, end) => {
        if (!start || !end || isNaN(start[0]) || isNaN(start[1]) || isNaN(end[0]) || isNaN(end[1])) {
            console.error('Invalid coordinates provided for route calculation.');
            return;
        }

        try {
            const response = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`);
            if (response.data && response.data.routes && response.data.routes.length > 0) {
                const data = response.data.routes[0];
                setRoute(data.geometry);
                setDistance(data.distance);
                setDuration(data.duration);
            } else {
                console.warn('No route found.');
            }
        } catch (error) {
            console.error('Error fetching route:', error);
        }
    };

    const handleMapClick = (event) => {
        if (event && event.lngLat && Array.isArray(event.lngLat) && event.lngLat.length === 2) {
            const [lng, lat] = event.lngLat;

            if (!isNaN(lng) && !isNaN(lat)) {
                setSelectedArea({ latitude: lat, longitude: lng });

                if (userLocation) {
                    getRoute([userLocation.longitude, userLocation.latitude], [lng, lat]);
                }
            }
        } else {
            console.warn('Invalid map click event or coordinates.');
        }
    };

    const handleZoomIn = () => {
        const newZoom = Math.min(viewport.zoom + 1, 20);
        setViewport({ ...viewport, zoom: newZoom });
    };

    const handleZoomOut = () => {
        const newZoom = Math.max(viewport.zoom - 1, 1);
        setViewport({ ...viewport, zoom: newZoom });
    };

    const handleShowCoordinates = () => {
        if (selectedArea) {
            alert(`Selected coordinates: ${selectedArea.longitude.toFixed(6)}, ${selectedArea.latitude.toFixed(6)}`);
        }
    };

    const handleShowDistanceDuration = () => {
        if (distance && duration) {
            alert(`Distance: ${distance.toFixed(2)} meters\nDuration: ${duration.toFixed(2)} seconds`);
        }
    };

    const closePopup = () => {
        setPopupInfo(null);
    };

    return (
        <div className="h-screen">
            <MapGL
                {...viewport}
                mapStyle={mapStyle}
                onViewportChange={(nextViewport) => {
                    if (nextViewport && typeof nextViewport === 'object') {
                        setViewport(nextViewport);
                    } else {
                        console.warn('Invalid viewport data:', nextViewport);
                    }
                }}
                onClick={handleMapClick}
                mapboxAccessToken={mapboxgl.accessToken}
                onLoad={(e) => setMap(e.target)}
            >
                {/* Buttons and Controls */}
                <div className="absolute top-10 right-10 z-10 space-x-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleZoomIn}>Zoom In</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleZoomOut}>Zoom Out</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleShowCoordinates}>Show Coordinates</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleShowDistanceDuration}>Show Distance & Duration</button>
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => setMapStyle('mapbox://styles/mapbox/streets-v11')}>Streets</button>
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => setMapStyle('mapbox://styles/mapbox/outdoors-v11')}>Outdoors</button>
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => setMapStyle('mapbox://styles/mapbox/light-v10')}>Light</button>
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => setMapStyle('mapbox://styles/mapbox/dark-v10')}>Dark</button>
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => setMapStyle('mapbox://styles/mapbox/satellite-v9')}>Satellite</button>
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => setMapStyle('mapbox://styles/mapbox/satellite-streets-v11')}>Satellite Streets</button>
                </div>

                <NavigationControl style={{ right: 10, top: 50 }} />

                {/* User Location Marker */}
                {userLocation && (
                    <Marker
                        latitude={userLocation.latitude}
                        longitude={userLocation.longitude}
                    >
                        <div className="w-8 h-8 bg-blue-500 rounded-full text-white font-bold flex items-center justify-center">
                            You are here
                        </div>
                    </Marker>
                )}

                {/* Route Layer */}
                {route && (
                    <Source id="route" type="geojson" data={{ type: 'Feature', geometry: route }}>
                        <Layer
                            id="route"
                            type="line"
                            layout={{ 'line-join': 'round', 'line-cap': 'round' }}
                            paint={{ 'line-color': '#888', 'line-width': 8 }}
                        />
                    </Source>
                )}

                {/* Popup Info */}
                {popupInfo && (
                    <Popup
                        latitude={popupInfo.latitude}
                        longitude={popupInfo.longitude}
                        onClose={closePopup}
                    >
                        <div>
                            <h3 className="text-lg font-bold">{popupInfo.title}</h3>
                            <p>{popupInfo.description}</p>
                        </div>
                    </Popup>
                )}
            </MapGL>
        </div>
    );
};

export default MapComponent;
