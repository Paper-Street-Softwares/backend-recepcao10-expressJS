import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ status: "ok" });
});

app.listen(3000, () => {
  console.log("Server is runing ok. Check http://localhost:3000");
});
