import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function Home() {
  const [countries, setCountries] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Buscando os dados da API
            axios.get('https://restcountries.com/v3.1/all?fields=name,flags,population,region,subregion,capital,cca3')
  .         then(response => {
            setCountries(response.data);
            setLoading(false);
             })
      .catch(error => {
        console.error("Erro ao carregar países:", error);
        setLoading(false);
      });
  }, []);

  // Lógica de busca por nome
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Carregando países...</h2>;

  return (
    <div style={{ padding: '20px' }}>
      {/* Campo de Busca */}
      <input 
        type="text" 
        placeholder="Pesquisar país pelo nome..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ 
          width: '100%', 
          padding: '15px', 
          marginBottom: '30px', 
          borderRadius: '8px', 
          border: '1px solid #ccc',
          fontSize: '16px'
        }}
      />

      {/* Grid de Cartões */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '25px' 
      }}>
        {filteredCountries.map((country: any) => (
          <Link 
            to={`/details/${country.cca3}`} 
            key={country.cca3} 
            style={{ 
              textDecoration: 'none', 
              color: 'inherit', 
              border: '1px solid #eee', 
              borderRadius: '15px', 
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              background: '#fff'
            }}
          >
            <img 
              src={country.flags.svg} 
              alt={country.name.common} 
              style={{ width: '100%', height: '160px', objectFit: 'cover' }} 
            />
            <div style={{ padding: '15px' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{country.name.common}</h3>
              <p style={{ margin: '5px 0' }}><strong>População:</strong> {country.population.toLocaleString()}</p>
              <p style={{ margin: '5px 0' }}><strong>Continente:</strong> {country.region}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}