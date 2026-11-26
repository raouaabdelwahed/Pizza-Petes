
import { usePizza } from './usePizza';
import Admin from './Admin';

import Navbar from './components/Client/Navbar';
import Hero from './components/Client/Hero/Hero';
import TaillesSection from './components/Client/TaillesSection/TaillesSection';
import PatesSection from './components/Client/PatesSection/PatesSection';
import GarnituresSection from './components/Client/GarnituresSection/GarnituresSection';
import Configurateur from './components/Client/Configurateur/Configurateur';
import Panier from './components/Client/Panier/Panier';
import APropos from './components/Client/APropos/APropos';
import Features from './components/Client/Features/Features';
import Footer from './components/Client/Footer/Footer';

import './App.css';

export default function App() {
  const p = usePizza();

  if (p.chargement) return <p>Chargement...</p>;
  if (p.erreur) return <p>Erreur : {p.erreur}</p>;

  return (
    <>
      <Navbar
        nombrePizzas={p.nombrePizzas}
        afficherAdmin={p.afficherAdmin}
        onAdminClick={() => p.setAfficherAdmin(!p.afficherAdmin)}
      />

      {p.afficherAdmin ? (
        <Admin />
      ) : (
        <>
          <Hero />

          <TaillesSection tailles={p.tailles} />

          <PatesSection typesPate={p.typesPate} />

          <GarnituresSection garnitures={p.garnitures} />

          <Configurateur
            {...p.configurateur}
            tailles={p.tailles}
            typesPate={p.typesPate}
            garnitures={p.garnitures}
            prixGarnitures={p.prixGarnitures}
          />

          <Panier
            panier={p.panier}
            modifierQuantite={p.modifierQuantite}
            supprimerPizza={p.supprimerPizza}
            totalPanier={p.totalPanier}
            nomClient={p.nomClient}
            telephone={p.telephone}
            adresse={p.adresse}
            setNomClient={p.setNomClient}
            setTelephone={p.setTelephone}
            setAdresse={p.setAdresse}
            validerCommande={p.validerCommande}
            chargementCommande={p.chargementCommande}
            messageCommande={p.messageCommande}
            commandeReussie={p.commandeReussie}
            nombrePizzas={p.nombrePizzas}
          />

          <APropos />
          <Features />
          <Footer />
        </>
      )}
    </>
  );
}
