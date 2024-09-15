import React, { useEffect, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../App.css';

const Map = ({ onCoordinateChange, onMapLoad, mapStyle, onSelectPoint, useMarkers }) => {
    const [map, setMap] = useState(null);

    const handleMapLoad = useCallback((newMap) => {
        setMap(newMap);
        if (onMapLoad) onMapLoad(newMap);
    }, [onMapLoad]);

    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

        if (!mapboxgl.accessToken) {
            console.error('Mapbox access token is not set.');
            return;
        }

        const mapContainer = document.getElementById('map-container');
        if (!mapContainer) {
            console.error('Map container not found.');
            return;
        }

        const newMap = new mapboxgl.Map({
            container: mapContainer,
            style: mapStyle || 'mapbox://styles/mapbox/streets-v11',
            center: [0.104306, 35.209547],
            zoom: 5,
        });

        newMap.on('click', (e) => {
            const { lng, lat } = e.lngLat;
            onCoordinateChange([lng, lat]);
            if (onSelectPoint) {
                onSelectPoint([lng, lat]);
            }
        });

        newMap.on('style.load', () => {
            if (mapStyle) {
                newMap.setStyle(mapStyle);
            }
        });

        if (useMarkers) {
            newMap.on('load', () => {
                const locations = [
                    { coordinates: [35.18429223602894, 0.10616600312830826], title: 'Nandi Hills', description: 'Tea Estates.' },
                    { coordinates: [35.27010154095174, 0.5199392884917984], title: 'Eldoret', description: 'City of Uasin Gishu County.' },
                    { coordinates: [35.09916066210138, 0.2010144976443371], title: 'Kapsabet', description: 'City of Nandi County.' }
                ];

                locations.forEach(location => {
                    const popup = new mapboxgl.Popup({ closeButton: true, closeOnClick: true })
                        .setLngLat(location.coordinates)
                        .setHTML(`<h3>${location.title}</h3><p>${location.description}</p>`);

                    new mapboxgl.Marker()
                        .setLngLat(location.coordinates)
                        .setPopup(popup)
                        .addTo(newMap);
                });

                const bounds = new mapboxgl.LngLatBounds();
                locations.forEach(location => bounds.extend(location.coordinates));
                newMap.fitBounds(bounds, { padding: 50 });
            });
        }

        handleMapLoad(newMap);

        return () => newMap.remove();
    }, [mapStyle, onCoordinateChange, onSelectPoint, useMarkers, handleMapLoad]);

    return (
        <div role="region" aria-labelledby="map-label">
            <h2 id="map-label">Map</h2>
            <div id="map-wrapper">
                <div id="map-container" style={{ width: '100%', height: '850px' }}></div>
            </div>
        </div>
    );
};

export default Map;
