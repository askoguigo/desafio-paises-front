import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function Home() {
  const [countries, setCountries] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all?fields=name,flags,population,region,cca3')
      .then(response => {
        setCountries(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Carregando...</h2>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        width: '100%', 
        marginBottom: '30px',
        padding: '0 10px',
        boxSizing: 'border-box'
      }}>
        <input 
          type="text" 
          placeholder="Pesquisar país pelo nome..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ 
            width: '100%', 
            maxWidth: '500px', 
            padding: '15px', 
            borderRadius: '8px', 
            border: '1px solid #ccc',
            fontSize: '16px',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '25px',
        justifyContent: 'center'
      }}>
        {filteredCountries.map((country) => (
          <Link 
            to={`/details/${country.cca3}`} 
            key={country.cca3} 
            style={{ 
              textDecoration: 'none', 
              color: 'inherit', 
              border: '1px solid #eee', 
              borderRadius: '15px', 
              overflow: 'hidden',
              background: '#fff',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
            }}
          >
            <img 
              src={country.flags.svg} 
              alt="" 
              style={{ width: '100%', height: '160px', objectFit: 'cover' }} 
            />
            <div style={{ padding: '15px' }}>
              <h3 style={{ margin: '0 0 10px 0' }}>{country.name.common}</h3>
              <p style={{ margin: '5px 0' }}><strong>População:</strong> {country.population.toLocaleString()}</p>
              <p style={{ margin: '5px 0' }}><strong>Continente:</strong> {country.region}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}