import React, { useState, useEffect } from 'react';
import ToDo from './components/ToDo';

const App = () => {
  // Estado para almacenar la clase del fondo actual
  const [bgClass, setBgClass] = useState('bg-custom-gradient');

  useEffect(() => {
    // Función para alternar entre los dos fondos gradientes que estan en tailwind.config.js
    const toggleBackground = () => {
      setBgClass((prevClass) =>
        prevClass === 'bg-custom-gradient'
          ? 'bg-custom-gradient-alt'
          : 'bg-custom-gradient'
      );
    };

    // Cambia el fondo cada 30 segundos
    const interval = setInterval(toggleBackground, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`${bgClass} grid py-4 h-screen transition-all duration-1000`}
    >
      <ToDo />
    </div>
  );
};

export default App;

 


