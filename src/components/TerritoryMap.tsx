import React from 'react';

const TerritoryMap = () => {
  return (
    <div 
      style={{ 
        height: '600px', 
        width: '100%',
        backgroundColor: '#0a0a0a',
        position: 'relative',
        borderRadius: '0.75rem',
        overflow: 'hidden'
      }} 
    >
      {/* Grid pattern overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          opacity: 0.3
        }}
      />

      {/* Add locations here as absolute positioned elements */}
      <div className="relative z-10 p-4">
        {/* Location markers will go here */}
      </div>
    </div>
  );
};

export default TerritoryMap;