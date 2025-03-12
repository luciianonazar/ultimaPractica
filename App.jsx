import { useState, useEffect } from "react";


function App() {
  const [busqueda, setBusqueda] = useState("");
  const [pais, setPais] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!busqueda.trim()) {
      setPais(null);
      setError(null);
      return;
    }

    const buscarPais = async () => {
      try {
        const respuesta = await fetch(`https://restcountries.com/v3.1/name/${busqueda}`);
        if (!respuesta.ok) throw new Error("País no encontrado");

        const data = await respuesta.json();
        setPais(data[0]);
        setError(null);

        setHistorial((prevHistorial) => {
          const nuevoHistorial = [data[0], ...prevHistorial.filter((p) => p.name.common !== data[0].name.common)];
          return nuevoHistorial.slice(0, 5);
        });
      } catch (error) {
        setError(error.message);
        setPais(null);
      }
    };

    buscarPais();
  }, [busqueda]);

  return (
    <div>
      
    </div>
  );
}

export default App;