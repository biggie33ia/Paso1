import React, { useEffect, useState } from 'react';

function ProtectedData() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProtected() {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No hay token, por favor inicia sesión');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/protected', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || 'Error desconocido');
          return;
        }

        const data = await response.json();
        setData(data);

      } catch (err) {
        setError('Error de conexión');
      }
    }

    fetchProtected();
  }, []);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!data) return <p>Cargando datos protegidos...</p>;

  return (
    <div>
      <h2>Datos protegidos:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default ProtectedData;
