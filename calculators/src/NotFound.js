import React from 'react';
import { Construction, Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full bg-gray-50 p-8">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-6">
          <Construction className="w-16 h-16 text-teal-600 mx-auto mb-4" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          We're Still Building This!
        </h1>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          This feature is currently under development. We're working hard to bring you more amazing calculators and tools. Please check back soon!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/')}
            className="btn-primary flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Go Home
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition px-4 py-2 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;