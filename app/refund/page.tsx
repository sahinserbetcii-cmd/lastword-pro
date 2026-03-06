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
        LastWord Pro offers a one-time purchase for professional access.
      </p>

      <h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 30, marginBottom: 10 }}>
  Refund Eligibility
</h2>
<p style={{ marginBottom: 22, fontSize: 17 }}>
  If you experience a technical issue or an accidental purchase, you may request
  a refund within 7 days of purchase. Approved refunds will be processed through
  our payment provider.
</p>

<h2 style={{ fontSize: 22, fontWeight: 600, marginTop: 30, marginBottom: 10 }}>
  How to Request
</h2>
<p style={{ fontSize: 17 }}>
  Please contact support@lastwordpro.com with your purchase details. If your
  request is approved, the refund will be issued through Paddle.
</p>
    </main>
  );
}