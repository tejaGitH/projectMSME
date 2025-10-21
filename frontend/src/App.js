import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SchemeFinder from './components/SchemeFinder';
import Features from './components/Features';
import Stats from './components/Stats';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SchemeFinder />
        <Features />
        <Stats />
        <About />
      </main>
      <Footer />
    </>
  );
}

export default App;
