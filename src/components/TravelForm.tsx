import React, { useState } from 'react';
import { Plane, MapPin, Calendar, Users, Send } from 'lucide-react';
import { TravelFormData } from '../types';

interface TravelFormProps {
  onSubmit: (formData: TravelFormData) => void;
}

const TravelForm: React.FC<TravelFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<TravelFormData>({
    destination: '',
    startDate: '',
    duration: '',
    travelers: '',
    interests: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
          <MapPin className="inline-block mr-2" size={18} />
          Getmək istədiyiniz şəhər və ya bölgə
        </label>
        <input
          type="text"
          id="destination"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Məsələn: Bakı, Gəncə, Şəki"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar className="inline-block mr-2" size={18} />
            Başlanğıc tarixi
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
            <Plane className="inline-block mr-2" size={18} />
            Səyahət müddəti (gün)
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Məsələn: 7"
          />
        </div>
      </div>
      <div>
        <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-1">
          <Users className="inline-block mr-2" size={18} />
          Səyahətçi sayı
        </label>
        <input
          type="number"
          id="travelers"
          name="travelers"
          value={formData.travelers}
          onChange={handleChange}
          required
          min="1"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Məsələn: 2"
        />
      </div>
      <div>
        <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">
          Maraq dairələri və üstünlüklər
        </label>
        <textarea
          id="interests"
          name="interests"
          value={formData.interests}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="Məsələn: Tarix, təbiət, yemək mədəniyyəti, muzeylər..."
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
      >
        <Send className="mr-2" size={18} />
        Səyahət Planı Yarat
      </button>
    </form>
  );
};

export default TravelForm;