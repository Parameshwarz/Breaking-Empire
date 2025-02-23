import React from 'react';

interface LocationMarker {
  id: number;
  name: string;
  type: 'lab' | 'warehouse' | 'dealer' | 'police' | 'hideout';
  description: string;
  x: number;
  y: number;
}

const locations: LocationMarker[] = [
  { 
    id: 1, 
    name: "Walt's Super Lab", 
    type: 'lab',
    description: 'Industrial-scale meth laboratory under Lavanderia Brillante',
    x: 35, 
    y: 45 
  },
  { 
    id: 2, 
    name: 'DEA Headquarters', 
    type: 'police',
    description: 'Where Hank and his team operate',
    x: 42, 
    y: 38 
  },
  { 
    id: 3, 
    name: "Gus's Distribution Center", 
    type: 'warehouse',
    description: 'Los Pollos Hermanos distribution warehouse',
    x: 55, 
    y: 52 
  },
  { 
    id: 4, 
    name: "Jesse's Territory", 
    type: 'dealer',
    description: 'Primary street dealing location',
    x: 28, 
    y: 60 
  },
  { 
    id: 5, 
    name: 'Vacuum Repair Shop', 
    type: 'hideout',
    description: 'Disappearance service location',
    x: 65, 
    y: 35 
  },
  { 
    id: 6, 
    name: 'RV Lab Site', 
    type: 'lab',
    description: 'Original mobile meth lab location',
    x: 48, 
    y: 65 
  },
  { 
    id: 7, 
    name: "Saul's Office", 
    type: 'hideout',
    description: 'Better Call Saul headquarters',
    x: 75, 
    y: 45 
  }
];

const getMarkerColor = (type: LocationMarker['type']) => {
  switch (type) {
    case 'lab':
      return 'bg-blue-500';
    case 'warehouse':
      return 'bg-yellow-500';
    case 'dealer':
      return 'bg-green-500';
    case 'police':
      return 'bg-red-500';
    case 'hideout':
      return 'bg-purple-500';
    default:
      return 'bg-gray-500';
  }
};

const getMarkerIcon = (type: LocationMarker['type']) => {
  switch (type) {
    case 'lab':
      return '🧪';
    case 'warehouse':
      return '🏭';
    case 'dealer':
      return '💊';
    case 'police':
      return '👮';
    case 'hideout':
      return '🏠';
    default:
      return '📍';
  }
};

const TerritoryMap = () => {
  return (
    <div 
      style={{ 
        height: '600px', 
        width: '100%',
        position: 'relative',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
      }} 
    >
      <img 
        src="/images/map.jpg" 
        alt="Territory Map"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'fill',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />

      {/* Overlay for better contrast */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        }}
      />

      {/* Location markers */}
      <div className="absolute inset-0">
        {locations.map((location) => (
          <div
            key={location.id}
            style={{
              position: 'absolute',
              left: `${location.x}%`,
              top: `${location.y}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 20,
            }}
            className="group"
          >
            <div className={`w-8 h-8 ${getMarkerColor(location.type)} rounded-full animate-pulse flex items-center justify-center text-2xl shadow-lg border-2 border-white`}>
              {getMarkerIcon(location.type)}
            </div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-black/90 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
              <div className="font-bold text-base">{location.name}</div>
              <div className="text-sm text-gray-300">{location.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TerritoryMap;