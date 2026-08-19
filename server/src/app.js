import express from "express";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
    }),
);

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.status(200).json({
        message: "Nail tech API is running",
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
