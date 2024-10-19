import React from 'react';
import { MapPin, Calendar, Users, Plane, Hotel, Activity } from 'lucide-react';
import { TravelPlanData } from '../types';

interface TravelPlanProps {
  plan: TravelPlanData;
  onReset: () => void;
}

const TravelPlan: React.FC<TravelPlanProps> = ({ plan, onReset }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Azərbaycan Səyahət Planınız Hazırdır!</h2>
      <div className="bg-blue-50 p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <MapPin className="text-blue-600 mr-2" size={24} />
          <h3 className="text-xl font-semibold">Təyinat yerləri</h3>
        </div>
        <ul className="list-disc list-inside space-y-2">
          {plan.destinations.map((destination, index) => (
            <li key={index} className="text-gray-700">{destination}</li>
          ))}
        </ul>
      </div>
      <div className="bg-green-50 p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <Activity className="text-green-600 mr-2" size={24} />
          <h3 className="text-xl font-semibold">Tövsiyə olunan fəaliyyətlər</h3>
        </div>
        <ul className="list-disc list-inside space-y-2">
          {plan.activities.map((activity, index) => (
            <li key={index} className="text-gray-700">{activity}</li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Hotel className="text-yellow-600 mr-2" size={24} />
            <h3 className="text-xl font-semibold">Yerləşmə</h3>
          </div>
          <p className="text-gray-700">{plan.accommodation}</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Plane className="text-purple-600 mr-2" size={24} />
            <h3 className="text-xl font-semibold">Nəqliyyat</h3>
          </div>
          <p className="text-gray-700">{plan.transportation}</p>
        </div>
      </div>
      <div className="bg-red-50 p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <Calendar className="text-red-600 mr-2" size={24} />
          <h3 className="text-xl font-semibold">Səyahət müddəti</h3>
        </div>
        <p className="text-gray-700">{plan.duration}</p>
      </div>
      <button
        onClick={onReset}
        className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
      >
        Yeni Plan Yarat
      </button>
    </div>
  );
};

export default TravelPlan;