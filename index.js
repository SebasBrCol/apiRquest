const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");
app.use(express.static("public"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Function to fetch advice from API
const getAdvice = async () => {
    try {
        const response = await axios.get("https://api.adviceslip.com/advice");
        return response.data.slip.advice;
    } catch (error) {
        console.error("Error fetching advice:", error.message);
        return "Could not fetch advice. Please try again later.";
    }
};

// Route for homepage
app.get("/", async (req, res) => {
    const advice = await getAdvice();
    res.render("index", { advice });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});