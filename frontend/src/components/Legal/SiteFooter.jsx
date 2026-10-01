import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_NAME } from './legal';
import './LegalPage.css';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()} {SITE_NAME}</span>
      <Link to="/privacy">Privacy Policy</Link>
      <Link to="/terms">Terms of Service</Link>
      <Link to="/contact">Contact Us</Link>
    </footer>
  );
}
