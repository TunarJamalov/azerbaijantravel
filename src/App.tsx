import React, { useState } from 'react';
import { Plane, MapPin, Calendar, Users, Send } from 'lucide-react';
import TravelForm from './components/TravelForm';
import TravelPlan from './components/TravelPlan';
import { TravelFormData, TravelPlanData } from './types';
import { generateTravelPlan } from './services/geminiService';

function App() {
  const [travelPlan, setTravelPlan] = useState<TravelPlanData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: TravelFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const prompt = `Azərbaycanda ${formData.destination} bölgəsinə ${formData.duration} günlük səyahət planı hazırlayın. Başlanğıc tarixi ${formData.startDate}, ${formData.travelers} nəfər üçün. Maraq dairələri: ${formData.interests}. Zəhmət olmasa, bu məlumatları əhatə edən bir plan hazırlayın: təyinat yerləri, tövsiyə olunan fəaliyyətlər, yerləşmə, nəqliyyat və səyahət müddəti.`;

      const response = await generateTravelPlan(prompt);

      const parsedResponse: TravelPlanData = parseApiResponse(response);

      setTravelPlan(parsedResponse);
    } catch (error) {
      console.error('Səyahət planı hazırlanarkən xəta baş verdi:', error);
      setError(
        'Səyahət planı hazırlanarkən xəta baş verdi. Zəhmət olmasa, bir az sonra yenidən cəhd edin.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const parseApiResponse = (response: string): TravelPlanData => {
    const lines = response.split('\n').filter((line) => line.trim() !== '');
    return {
      destinations: [lines[0]],
      activities: lines.slice(1, -3),
      accommodation: lines[lines.length - 3],
      transportation: lines[lines.length - 2],
      duration: lines[lines.length - 1],
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 flex flex-col items-center justify-center p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">
          Azərbaycan Səyahət Planlaşdırıcısı
        </h1>
        <p className="text-xl text-gray-600">
          Azərbaycana xəyal səyahətinizi planlaşdıraq!
        </p>
      </header>
      <main className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-8">
        {isLoading ? (
          <div className="text-center">
            <p>Səyahət planınız hazırlanır...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-600">
            <p>{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Yenidən cəhd edin
            </button>
          </div>
        ) : !travelPlan ? (
          <TravelForm onSubmit={handleSubmit} />
        ) : (
          <TravelPlan plan={travelPlan} onReset={() => setTravelPlan(null)} />
        )}
      </main>
      <footer className="mt-8 text-center text-gray-500">
        <p>
          &copy; Bu web səhifə Tunar Camalov tərəfindən hazırlanıb. Bütün
          hüquqlar qorunur.
        </p>
      </footer>
    </div>
  );
}

export default App;
