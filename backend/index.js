import express from 'express'
import cors from 'cors'

const app = express();
const PORT = 8080;

app.use(cors());


app.get("/", (req, res) => {
	res.send("Hello TalkToBeavs!");
});


app.listen(PORT, () => {
	console.log(`Server Running on port ${PORT}`);
});







