import React from 'react';
import Scene3D from './components/3d/Scene3D';
import ScrollController from './components/ScrollController';

const App = () => {
  return (
    <div className="relative w-full h-full bg-transparent overflow-x-hidden">
      
      {/* This wrapper FORCES the canvas to stay strictly in the background. 
        It is fixed to the screen and has a negative z-index.
      */}
      <div className="fixed inset-0 w-screen h-screen -z-50 bg-[#050505]">
        <Scene3D />
      </div>
      
      {/* The UI layer. It scrolls normally over the fixed canvas.
      */}
      <div className="relative z-10 w-full h-full bg-transparent">
        <ScrollController />
      </div>
      
    </div>
  );
};

export default App;