import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState<any>(null);

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/alpha/${id}`)
      .then(res => setCountry(res.data[0]));
  }, [id]);

  if (!country) return <p style={{ padding: '20px' }}>Carregando detalhes...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => navigate('/')} style={{ marginBottom: '20px', padding: '10px 20px', cursor: 'pointer' }}>
        ← Voltar
      </button>
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        <img src={country.flags.svg} alt="" style={{ width: '100%', maxWidth: '400px', borderRadius: '10px' }} />
        <div>
          <h1>{country.name.common}</h1>
          <p><strong>Capital:</strong> {country.capital?.[0]}</p>
          <p><strong>Sub-região:</strong> {country.subregion}</p>
          <p><strong>Idiomas:</strong> {Object.values(country.languages || {}).join(', ')}</p>
        </div>
      </div>
    </div>
  );
}