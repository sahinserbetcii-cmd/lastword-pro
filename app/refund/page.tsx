export default function RefundPage() {
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
        Refund Policy
      </h1>

      <p style={{ opacity: 0.7, marginBottom: 28 }}>
        Last updated: {new Date().toISOString().slice(0, 10)}
      </p>

      <p style={{ marginBottom: 22, fontSize: 17 }}>
        Customers may request a refund within 14 days of purchase by contacting
        support@lastwordpro.com.
      </p>

      <p style={{ marginBottom: 22, fontSize: 17 }}>
        Refunds are processed through Paddle in accordance with Paddle&apos;s refund policy.
      </p>
<p style={{ marginBottom: 22, fontSize: 17 }}>
No additional refund conditions or exceptions apply beyond Paddle's applicable refund handling requirements.
</p>
      <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 30, marginBottom: 10 }}>
        Contact
      </h2>
      <p style={{ fontSize: 17 }}>support@lastwordpro.com</p>
    </main>
  );
}