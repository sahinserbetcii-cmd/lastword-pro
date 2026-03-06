export default function CancelPage() {
  return (
    <main
      style={{
        maxWidth: 600,
        margin: "120px auto",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>
        Payment Cancelled
      </h1>

      <p style={{ fontSize: 18, opacity: 0.8 }}>
        You can try again anytime.
      </p>
    </main>
  );
}