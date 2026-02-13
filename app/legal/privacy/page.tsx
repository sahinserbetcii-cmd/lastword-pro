export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 24, lineHeight: 1.7 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Privacy Policy</h1>

      <p>
        We respect your privacy. LastWord Pro processes the text you submit to generate analysis and suggestions. We do
        not sell personal data.
      </p>

      <h2 style={{ fontSize: 18, fontWeight: 800, marginTop: 22 }}>Data You Provide</h2>
      <p>
        Message content you enter may be sent to our service providers strictly to generate results. Avoid submitting
        sensitive personal information if you do not want it processed.
      </p>

      <h2 style={{ fontSize: 18, fontWeight: 800, marginTop: 22 }}>Device Storage</h2>
      <p>
        The app may store non-sensitive settings locally on your device (e.g., language preference or Pro unlock state)
        to improve user experience.
      </p>

      <h2 style={{ fontSize: 18, fontWeight: 800, marginTop: 22 }}>Security</h2>
      <p>We use reasonable safeguards to protect data in transit and at rest where applicable.</p>

      <h2 style={{ fontSize: 18, fontWeight: 800, marginTop: 22 }}>Contact</h2>
      <p>If you have privacy questions, contact us through the support channel listed in the app.</p>

      <p style={{ marginTop: 28, opacity: 0.75, fontSize: 13 }}>Last updated: 2026-02-09</p>
    </main>
  );
}
