export default function TermsPage() {
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
        Terms of Service
      </h1>

      <p style={{ opacity: 0.7, marginBottom: 28 }}>
        Last updated: {new Date().toISOString().slice(0, 10)}
      </p>

      <p style={{ marginBottom: 22, fontSize: 17 }}>
        LastWord Pro is a self-serve AI-powered communication risk analysis software product.
        By using this website and the associated services, you agree to the following terms.
      </p>

      <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 30, marginBottom: 10 }}>
        Business Information
      </h2>
      <p style={{ marginBottom: 22, fontSize: 17 }}>
        Legal Business Name: Sahin Serbetci
        <br />
        Trading Name: LastWord Pro
      </p>

      <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 30, marginBottom: 10 }}>
        Nature of the Product
      </h2>
      <p style={{ marginBottom: 22, fontSize: 17 }}>
        LastWord Pro is a self-serve software product. No human review, consulting,
        or done-for-you service is included in the purchase.
      </p>

      <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 30, marginBottom: 10 }}>
        Use of Service
      </h2>
      <p style={{ marginBottom: 22, fontSize: 17 }}>
        The service analyzes professional messages such as emails and LinkedIn
        drafts and generates risk insights and alternative responses. Users are
        responsible for how they use the generated content.
      </p>

      <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 30, marginBottom: 10 }}>
        Payments
      </h2>
      <p style={{ marginBottom: 22, fontSize: 17 }}>
        Access to premium features may require a one-time purchase. Payments are
        processed by our payment provider, Paddle.
      </p>

      <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 30, marginBottom: 10 }}>
        Limitation of Liability
      </h2>
      <p style={{ marginBottom: 22, fontSize: 17 }}>
        LastWord Pro provides analytical insights but does not guarantee
        outcomes or decisions resulting from message usage.
      </p>

      <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 30, marginBottom: 10 }}>
        Contact
      </h2>
      <p style={{ fontSize: 17 }}>support@lastwordpro.com</p>
    </main>
  );
}