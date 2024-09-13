import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CoordinatesDisplay = ({ coordinates, onPan, onSelectPoint, onMapStyleChange, onZoomIn, onZoomOut }) => {

    const [popmessge, setPopmessage] = useState(null);
    const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/streets-v11');

    const handlePanUp = () => {
        if (onPan) onPan('up');
    };

    const handlePanDown = () => {
        if (onPan) onPan('down');
    };

    const handlePanLeft = () => {
        if (onPan) onPan('left');
    };

    const handlePanRight = () => {
        if (onPan) onPan('right');
    };

    const handleSelectPoint = () => {
        if (onSelectPoint) onSelectPoint(coordinates);
    };

    const handleShowPopmessage = () => {
        if (popmessge) {
            setPopmessage(null);
        } else {
            setPopmessage('This is a popmessage');
        }
    };

    const handleStyleChange = (style) => {
        setMapStyle(style);
        if (onMapStyleChange) onMapStyleChange(style);
    };

    return (
        <div className="container mx-auto p-4">
            {/* Popup Message Button */}
            <div className="mb-2">
                <button
                    onClick={handleShowPopmessage}
                    className="bg-red-500 text-white py-2 px-4 rounded"
                >
                    Toggle Popmessage
                </button>
                {popmessge && (
                    <div className="mt-2 p-2 bg-gray-100 border border-gray-300 rounded">
                        {popmessge}
                    </div>
                )}
            </div>

            {/* Coordinates Card */}
            <div className="bg-white shadow-lg rounded-lg p-1 mb-1">
                <h1 className="text-xl font-bold mb-1">Coordinates:</h1>
                {coordinates ? (
                    <>
                        <p className="text-lg">Latitude: {coordinates[1]}</p>
                        <p className="text-lg">Longitude: {coordinates[0]}</p>
                    </>
                ) : (
                    <p className="text-lg text-gray-500">No coordinates available</p>
                )}
            </div>

            {/* Button Groups */}
            <div className="flex flex-col space-y-1 mb-2">
                <div className="flex space-x-1">
                    <button onClick={handlePanUp} className="bg-blue-500 text-white py-1 px-2 rounded">Pan Up</button>
                </div>
                <div className="flex space-x-1">
                    <button onClick={handlePanLeft} className="bg-blue-500 text-white py-1 px-2 rounded">Pan Left</button>
                    <button onClick={handlePanRight} className="bg-blue-500 text-white py-1 px-2 rounded">Pan Right</button>
                </div>
                <div className="flex space-x-1">
                    <button onClick={handlePanDown} className="bg-blue-500 text-white py-1 px-2 rounded">Pan Down</button>
                </div>
                <button onClick={handleSelectPoint} className="bg-green-500 text-white py-1 px-2 rounded mt-1">Select Point</button>
            </div>

            {/* Zoom Controls */}
            <div className="flex space-x-1 mb-2">
                <button onClick={onZoomIn} className="bg-blue-500 text-white py-1 px-2 rounded">Zoom In</button>
                <button onClick={onZoomOut} className="bg-blue-500 text-white py-1 px-2 rounded">Zoom Out</button>
            </div>

            {/* Map Style Controls */}
            <div className="flex">
                <button onClick={() => handleStyleChange('mapbox://styles/mapbox/streets-v11')} className="bg-gray-500 text-white py-1 px-2 rounded mb-1">Streets</button>
                <button onClick={() => handleStyleChange('mapbox://styles/mapbox/outdoors-v11')} className="bg-gray-500 text-white py-1 px-2 rounded mb-1">Outdoors</button>
                <button onClick={() => handleStyleChange('mapbox://styles/mapbox/light-v10')} className="bg-gray-500 text-white py-1 px-2 rounded mb-1">Light</button>
                <button onClick={() => handleStyleChange('mapbox://styles/mapbox/dark-v10')} className="bg-gray-500 text-white py-1 px-2 rounded mb-1">Dark</button>
                <button onClick={() => handleStyleChange('mapbox://styles/mapbox/satellite-v9')} className="bg-gray-500 text-white py-1 px-2 rounded mb-1">Satellite</button>
                <button onClick={() => handleStyleChange('mapbox://styles/mapbox/satellite-streets-v11')} className="bg-gray-500 text-white py-1 px-2 rounded mb-1">Satellite Streets</button>
            </div>
        </div>
    );
};

CoordinatesDisplay.propTypes = {
    coordinates: PropTypes.arrayOf(PropTypes.number),
    onPan: PropTypes.func,
    onSelectPoint: PropTypes.func,
    onMapStyleChange: PropTypes.func,
    onZoomIn: PropTypes.func,
    onZoomOut: PropTypes.func
};

export default CoordinatesDisplay;
