export default function PrivacyPage() {
  return (
    <main
      style={{
        maxWidth: 760,
        margin: "72px auto",
        padding: "0 24px 40px",
        lineHeight: 1.75,
      }}
    >
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 10 }}>
        Privacy Policy
      </h1>

      <p style={{ opacity: 0.7, marginBottom: 28 }}>
        Last updated: {new Date().toISOString().slice(0, 10)}
      </p>

      <p style={{ marginBottom: 22, fontSize: 17 }}>
        We respect your privacy. LastWord Pro does not store analyzed messages
        beyond the processing required to generate results.
      </p>

      <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 30, marginBottom: 10 }}>
        Information We Collect
      </h2>
      <ul style={{ paddingLeft: 22, marginBottom: 22 }}>
        <li style={{ marginBottom: 8 }}>Email or account information if provided</li>
        <li>Usage analytics for improving the service</li>
      </ul>

      <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 30, marginBottom: 10 }}>
        How We Use Information
      </h2>
      <p style={{ marginBottom: 22, fontSize: 17 }}>
        Data is used only to operate and improve the service. We do not sell
        personal information to third parties.
      </p>

      <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 30, marginBottom: 10 }}>
        Third-Party Services
      </h2>
      <p style={{ marginBottom: 22, fontSize: 17 }}>
        Payments may be processed through third-party providers. These providers
        have their own privacy policies.
      </p>

      <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 30, marginBottom: 10 }}>
        Contact
      </h2>
      <p style={{ fontSize: 17 }}>support@lastwordpro.com</p>
    </main>
  );
}