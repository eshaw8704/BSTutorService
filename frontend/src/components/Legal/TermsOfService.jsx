import React from 'react';
import LegalLayout from './LegalLayout';
import { SITE_NAME, CONTACT_EMAIL, EFFECTIVE_DATE } from './legal';

export default function TermsOfService() {
  return (
    <LegalLayout>
      <h1>Terms of Service</h1>
      <p className="legal-updated">Effective {EFFECTIVE_DATE}</p>

      <p>
        These Terms of Service ("Terms") govern your use of the {SITE_NAME} website and tutoring
        booking service. By creating an account or using the site, you agree to these Terms and
        to our <a href="/privacy">Privacy Policy</a>. If you do not agree, do not use the site.
      </p>

      <h2>1. Eligibility</h2>
      <p>
        You must be at least 13 years old to use {SITE_NAME}. If you are under 18, you must have
        permission from a parent or legal guardian, who agrees to these Terms on your behalf.
      </p>

      <h2>2. Your account</h2>
      <ul>
        <li>Give accurate information when you sign up, and keep it up to date.</li>
        <li>Keep your password private. You are responsible for activity on your account.</li>
        <li>Tell us right away at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> if you
          think someone else has accessed your account.</li>
        <li>Admin accounts are only for people authorized by {SITE_NAME}.</li>
      </ul>

      <h2>3. Tutoring sessions</h2>
      <ul>
        <li>{SITE_NAME} helps students book sessions with tutors. Tutors are responsible for the
          content and quality of their sessions.</li>
        <li>Tutoring is meant to support learning. Do not use sessions to cheat or to complete
          graded work you are expected to do yourself.</li>
        <li>Please reschedule or cancel through the site as early as possible so the time can be
          offered to someone else.</li>
        <li>We do not guarantee any particular grade, test score or academic result.</li>
      </ul>

      <h2>4. Payments and refunds</h2>
      <p>
        Payments are processed securely by Stripe, and by paying you also agree to Stripe's
        terms. Prices are shown before you pay. If you have a problem with a charge or would like
        to request a refund, contact us at{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we will review it.
      </p>

      <h2>5. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>harass, threaten or discriminate against any student, tutor or staff member;</li>
        <li>post or share anything illegal, hateful, sexually explicit or that you do not have
          the right to share;</li>
        <li>impersonate someone else or create accounts for someone without permission;</li>
        <li>try to access accounts or data that are not yours, or interfere with the site's
          security or operation;</li>
        <li>use the site for any unlawful purpose.</li>
      </ul>
      <p>We may suspend or delete accounts that break these rules.</p>

      <h2>6. Your content</h2>
      <p>
        You keep ownership of what you add to your profile (such as your biography and picture).
        You give {SITE_NAME} permission to store and display it on the site so the service can
        work. You confirm you have the right to share it.
      </p>

      <h2>7. Our content</h2>
      <p>
        The {SITE_NAME} name, logos and site design belong to {SITE_NAME}. Do not copy or reuse
        them without permission.
      </p>

      <h2>8. Disclaimers</h2>
      <p>
        The site is provided "as is" and "as available". We do our best to keep it working, but
        we do not promise it will always be available, error-free or secure, and we may change
        or discontinue features at any time.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the fullest extent allowed by law, {SITE_NAME} and its team will not be liable for any
        indirect, incidental, special or consequential damages, or for lost data, profits or
        opportunities, arising from your use of the site. Our total liability for any claim
        related to the site is limited to the amount you paid us in the 12 months before the
        claim. Some places do not allow these limits, so they may not fully apply to you.
      </p>

      <h2>10. Indemnity</h2>
      <p>
        If you break these Terms or the law while using the site and that leads to a claim
        against {SITE_NAME}, you agree to cover the reasonable costs of that claim.
      </p>

      <h2>11. Ending your account</h2>
      <p>
        You can stop using the site at any time and ask us to delete your account. We may
        suspend or close accounts that violate these Terms.
      </p>

      <h2>12. Changes to these Terms</h2>
      <p>
        We may update these Terms. We will change the effective date above, and for significant
        changes we will notify users by email or on the site. Continuing to use the site after a
        change means you accept the updated Terms.
      </p>

      <h2>13. Contact</h2>
      <p>
        Questions about these Terms? Email{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or visit our{' '}
        <a href="/contact">contact page</a>.
      </p>
    </LegalLayout>
  );
}
