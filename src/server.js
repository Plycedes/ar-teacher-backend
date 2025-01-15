const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const path = require("path");

const app = express();

const genAI = new GoogleGenerativeAI("AIzaSyA7_jMqmhVoZT7Cn5zZDxJ0HAGQTR5B9kQ");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.get("/search", async (req, res) => {
    const { prompt } = req.query;

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    res.send({ response: result.response.text() });
});

app.get("/status", (req, res) => {
    res.send({ status: "ok" });
});

app.get("/video", (req, res) => {
    console.log("playing");
    const vidPath = path.join(__dirname, "../", "./storage/video.mp4");
    res.sendFile(vidPath);
});

app.listen(3000, () => {
    console.log("Server is running at port 3000");
});
