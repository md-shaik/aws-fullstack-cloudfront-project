
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "";

export default function App() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("Click the button to test the backend.");
  const [loading, setLoading] = useState(false);

  async function checkBackend() {
    setLoading(true);
    setStatus("Connecting to Flask backend...");

    try {
      const response = await fetch(`${API_URL}/api/health`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      setMessage(data.status);
      setStatus("Backend connection successful!");
    } catch (error) {
      setMessage("");
      setStatus(`Connection failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <h1>My AWS Full Stack Application</h1>
      <p>React Frontend + Python Flask Backend</p>

      <button onClick={checkBackend} disabled={loading}>
        {loading ? "Checking..." : "Test Backend Connection"}
      </button>

      <p>{status}</p>

      {message && <h2>Backend Status: {message}</h2>}

      <footer>
        Deployed using AWS EC2, S3 and CloudFront
      </footer>
    </main>
  );
}
