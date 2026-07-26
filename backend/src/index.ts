import app from "./app";

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend server listening on http://0.0.0.0:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
