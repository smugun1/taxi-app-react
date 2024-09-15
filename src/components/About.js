import React from 'react';
import taxiImage from '../assets/images/airport-taxi-service.png'; // Adjust the path if needed
import cabImage from '../assets/images/yellow-taxi-cab.png'; // Adjust the path if needed
import { FaTaxi, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';


const About = () => {
  return (
    <div className="container min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-1 p-4 mb-2">
        <div className="flex justify-center items-center">
          <img
            src={taxiImage}
            alt="Taxi Service"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="flex justify-center items-center">
          <img
            src={taxiImage}
            alt="Taxi Service"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="flex justify-center items-center">
          <img
            src={taxiImage}
            alt="Taxi Service"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="flex justify-center items-center">
          <img
            src={taxiImage}
            alt="Taxi Service"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
      <div className="max-w-4xl p-8 rounded-lg shadow-lg bg-purple-300">
        <h1 className="text-4xl font-bold mb-6 text-center">About Our Taxi Service</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero a
              fringilla maximus. Integer nec odio vel urna facilisis varius. Sed at dignissim urna. Sed
              ac sapien a mi volutpat vehicula vel in sapien.
            </p>
            <p className="text-lg mb-4">
              Nullam aliquet eleifend ex at bibendum. Proin sit amet tincidunt arcu. Donec vitae justo
              id urna tincidunt posuere. Curabitur nec nibh vel risus bibendum aliquam et eget arcu.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <img
              src={taxiImage}
              alt="Taxi Service"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <FaTaxi className="text-3xl text-indigo-600 mr-4" />
              <p className="text-lg">Reliable and punctual service you can trust.</p>
            </div>
            <div className="flex items-center">
              <FaTaxi className="text-3xl text-indigo-600 mr-4" />
              <p className="text-lg">Professional and courteous drivers.</p>
            </div>
            <div className="flex items-center">
              <FaTaxi className="text-3xl text-indigo-600 mr-4" />
              <p className="text-lg">Clean and well-maintained vehicles.</p>
            </div>
            <div className="flex items-center">
              <FaTaxi className="text-3xl text-indigo-600 mr-4" />
              <p className="text-lg">Affordable and transparent pricing.</p>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Fleet</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex justify-center items-center">
              <img
                src={cabImage}
                alt="Our Fleet"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <p className="text-lg mb-4">
                Our fleet consists of a variety of vehicles to meet your transportation needs. Whether
                you need a sedan for a quick trip across town or a spacious SUV for a family outing, we
                have the perfect vehicle for you.
              </p>
              <p className="text-lg mb-4">
                All our vehicles are regularly maintained and cleaned to ensure a comfortable and safe
                ride for our passengers.
              </p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <FaPhone className="text-2xl text-indigo-600 mr-4" />
              <p className="text-lg">+1 234 567 890</p>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="text-2xl text-indigo-600 mr-4" />
              <p className="text-lg">info@taxiservice.com</p>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-2xl text-indigo-600 mr-4" />
              <p className="text-lg">123 Taxi Lane, City, Country</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-1 p-4 mb-2">
        <div className="flex justify-center items-center">
          <img
            src={taxiImage}
            alt="Taxi Service"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="flex justify-center items-center">
          <img
            src={taxiImage}
            alt="Taxi Service"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="flex justify-center items-center">
          <img
            src={taxiImage}
            alt="Taxi Service"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="flex justify-center items-center">
          <img
            src={taxiImage}
            alt="Taxi Service"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
