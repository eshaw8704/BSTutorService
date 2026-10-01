import React from 'react';
import Header from '../Frames/Header';
import SiteFooter from './SiteFooter';
import './LegalPage.css';

export default function LegalLayout({ children }) {
  return (
    <>
      <Header />
      <main className="legal-page">
        <article className="legal-card">{children}</article>
      </main>
      <SiteFooter />
    </>
  );
}
