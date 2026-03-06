export default function SaaSFooter() {
  return (
    <footer
      style={{
        marginTop: 80,
        padding: "40px 20px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        textAlign: "center",
        fontSize: 14,
        opacity: 0.8
      }}
    >
      <div style={{ marginBottom: 10 }}>
        © {new Date().getFullYear()} LastWord Pro
      </div>

      <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
        <a href="/terms">Terms</a>
        <a href="/privacy">Privacy</a>
        <a href="/refund">Refund</a>
      </div>
    </footer>
  );
}