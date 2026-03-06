export default function TermsPage() {
  return (
    <main style={{ maxWidth: 720, margin: "80px auto", padding: "0 24px", lineHeight: 1.7 }}>
      
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>Terms of Service</h1>
      <p style={{ opacity: 0.7, marginBottom: 30 }}>
        Last updated: {new Date().toISOString().slice(0, 10)}
      </p>

      <p style={{ marginBottom: 20 }}>
        LastWord Pro is an AI-powered communication risk analysis tool. By using this
        website and the associated services, you agree to the following terms.
      </p>

      <h2 style={{ fontSize: 20, marginTop: 30 }}>Use of Service</h2>
      <p style={{ marginTop: 10 }}>
        The service analyzes professional messages (e.g., emails or LinkedIn drafts)
        and generates risk insights and alternative responses. Users are responsible
        for how they use the generated content.
      </p>

      <h2 style={{ fontSize: 20, marginTop: 30 }}>Payments</h2>
      <p style={{ marginTop: 10 }}>
        Access to premium features may require a one-time purchase. Payments are
        processed by our payment provider.
      </p>

      <h2 style={{ fontSize: 20, marginTop: 30 }}>Limitation of Liability</h2>
      <p style={{ marginTop: 10 }}>
        LastWord Pro provides analytical insights but does not guarantee outcomes
        or decisions resulting from message usage.
      </p>

      <h2 style={{ fontSize: 20, marginTop: 30 }}>Contact</h2>
      <p style={{ marginTop: 10 }}>
        support@lastwordpro.com
      </p>

    </main>
  );
}