const app = require("./server");
const port = 3000;

app.get("/", (req, res) => {
  res.send({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Server runing on port ${port}. Check: http://localhost:${port}`);
});
