import React, { useState } from 'react';
import LegalLayout from './LegalLayout';
import { SITE_NAME, CONTACT_EMAIL } from './legal';

export default function ContactUs() {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Opens the visitor's email app with the message filled in, so no data is stored on our server.
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = `${message}\n\n- ${name}`;
    window.location.href =
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <LegalLayout>
      <h1>Contact Us</h1>
      <p>
        Have a question about tutoring, your account, a payment or your privacy? We're happy to
        help. Email us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we'll get
        back to you within 2 business days.
      </p>

      <h2>Common requests</h2>
      <ul>
        <li><strong>Delete my account or data:</strong> email us from the address on your
          account and say "Delete my account". We'll confirm within 30 days.</li>
        <li><strong>Payment or refund question:</strong> include the date, amount and subject of
          the session.</li>
        <li><strong>Report a safety concern or inappropriate behavior:</strong> tell us what
          happened and who was involved. We take these reports seriously.</li>
      </ul>

      <h2>Send us a message</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <textarea
          rows={6}
          placeholder={`How can ${SITE_NAME} help?`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Open in my email app</button>
      </form>
    </LegalLayout>
  );
}
