import React from 'react';
import { Link } from 'react-router-dom';
import './LegalPage.css';

// Required checkbox shown on every sign-up form.
export default function TermsAgreement({ checked, onChange }) {
  return (
    <label className="terms-agreement">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        required
      />
      <span>
        I am at least 13 years old and agree to the{' '}
        <Link to="/terms" target="_blank">Terms of Service</Link> and{' '}
        <Link to="/privacy" target="_blank">Privacy Policy</Link>.
      </span>
    </label>
  );
}
