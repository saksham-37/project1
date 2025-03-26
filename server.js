const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../frontend"))); // Serve static files

// Route to serve homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Route to serve signup page
app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/signup.html"));
});

// Route to handle signup form submission
app.post("/signup", (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    console.log("New User Signed Up:", { username, email, password });

    return res.status(201).json({ message: "Signup successful!" });
});

// Route to serve login page
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

// Route to handle login form submission
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required!" });
    }

    console.log("User Logged In:", { email, password });

    return res.status(200).json({ message: "Login successful!", redirectTo: "/" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
