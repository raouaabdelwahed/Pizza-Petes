
import { useState } from 'react';
import TaillesAdmin from './components/admin/tailles/TaillesAdmin';
import PatesAdmin from './components/admin/pates/PatesAdmin';
import GarnituresAdmin from './components/admin/garnitures/GarnituresAdmin';
import GestionPrix from './components/admin/prix/GestionPrix';

const sections = {
  Tailles: <TaillesAdmin />,
  Pâtes: <PatesAdmin />,
  Garnitures: <GarnituresAdmin />,
  Prix: <GestionPrix />
};

export default function Admin() {
  const [section, setSection] = useState('Tailles');

  return (
    <section id="administration" style={{ padding: '40px 6%', background: '#f5f5f5' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
        Administration Pizza Pete's
      </h2>

      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '30px' }}>
        {Object.keys(sections).map(s => (
          <button
            key={s}
            onClick={() => setSection(s)}
            style={{
              padding: '12px 18px',
              background: section === s ? '#b8202c' : '#222',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {sections[section]}
    </section>
  );
}
