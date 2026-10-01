import React from 'react';
import LegalLayout from './LegalLayout';
import { SITE_NAME, CONTACT_EMAIL, EFFECTIVE_DATE } from './legal';

export default function PrivacyPolicy() {
  return (
    <LegalLayout>
      <h1>Privacy Policy</h1>
      <p className="legal-updated">Effective {EFFECTIVE_DATE}</p>

      <p>
        This Privacy Policy explains what information {SITE_NAME} ("we", "us") collects when you
        use this website and tutoring booking service, how we use it, and the choices you have.
        By creating an account or using the site, you agree to this policy.
      </p>

      <h2>1. Information we collect</h2>
      <ul>
        <li>
          <strong>Account information:</strong> your first and last name, email address,
          password and account type (student, tutor or admin). Passwords are stored only in
          hashed (scrambled) form; we cannot see your actual password.
        </li>
        <li>
          <strong>Profile information you choose to add:</strong> experience, school or
          institution, biography and profile picture.
        </li>
        <li>
          <strong>Appointment information:</strong> the subject, date and time of sessions you
          book, reschedule or cancel, and which student and tutor are involved.
        </li>
        <li>
          <strong>Tutor work records:</strong> hours logged and payroll information for tutors.
        </li>
        <li>
          <strong>Payment information:</strong> payments are processed by Stripe. We receive and
          keep a record of your email, the subject paid for, the amount, the payment status and a
          transaction ID. <strong>We never see or store your full card number.</strong>
        </li>
        <li>
          <strong>Site usage:</strong> we count the total number of page visits per day. This
          count is not linked to you personally.
        </li>
        <li>
          <strong>Information stored in your browser:</strong> when you log in, the site saves a
          login token and basic account details (such as your user ID and role) in your browser's
          local storage so you stay signed in. You can remove them by logging out or clearing your
          browser data. We do not use advertising or tracking cookies.
        </li>
      </ul>

      <h2>2. How we use your information</h2>
      <ul>
        <li>To create and manage your account and let you log in.</li>
        <li>To book, reschedule and cancel tutoring sessions, and to show them to the right
          student, tutor and administrators.</li>
        <li>To send emails about your account and appointments, such as confirmations and
          receipts.</li>
        <li>To process payments and keep payment and payroll records.</li>
        <li>To keep the site secure, prevent misuse and fix problems.</li>
      </ul>
      <p>We do <strong>not</strong> sell your personal information or use it for advertising.</p>

      <h2>3. Who we share it with</h2>
      <p>We share information only as needed to run the service:</p>
      <ul>
        <li><strong>Tutors, students and administrators</strong> on {SITE_NAME} see the details
          needed for appointments they are part of or manage.</li>
        <li><strong>Service providers</strong> that host or operate parts of the site for us:
          MongoDB Atlas (database), Stripe (payments), Google Gmail (sending email) and our web
          hosting provider. They may only use your information to provide their service to us.</li>
        <li><strong>Legal reasons:</strong> if required by law, or to protect the rights, safety
          or property of our users or {SITE_NAME}.</li>
      </ul>

      <h2>4. How long we keep it</h2>
      <p>
        We keep your account information while your account is active. If you ask us to delete
        your account, we will delete or anonymize your personal information within 30 days,
        except for records we must keep for legal, tax or accounting reasons (such as payment
        records).
      </p>

      <h2>5. Your choices and rights</h2>
      <ul>
        <li>You can view and update your profile, email and password from your account
          settings.</li>
        <li>You can ask us for a copy of your information, ask us to correct it, or ask us to
          delete your account by emailing <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          We will respond within 30 days.</li>
        <li>Depending on where you live (for example California or the European Union), you may
          have additional privacy rights. Contact us and we will honor them as required by
          law.</li>
      </ul>

      <h2>6. Security</h2>
      <p>
        We use reasonable measures to protect your information, including hashed passwords and
        secure (HTTPS) connections. No website can be 100% secure, so we cannot guarantee
        absolute security. If we learn of a data breach that affects you, we will notify you as
        required by law.
      </p>

      <h2>7. Children</h2>
      <p>
        {SITE_NAME} is not intended for children under 13, and we do not knowingly collect
        personal information from children under 13. Users between 13 and 18 should use the site
        with a parent's or guardian's permission. If you believe a child under 13 has given us
        information, contact us and we will delete it.
      </p>

      <h2>8. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. We will change the effective date above,
        and for significant changes we will notify users by email or on the site.
      </p>

      <h2>9. Contact us</h2>
      <p>
        Questions or requests about your privacy? Email{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or use our{' '}
        <a href="/contact">contact page</a>.
      </p>
    </LegalLayout>
  );
}
