import App from "./app.js";
import 'dotenv/config';
const app = App;

const port = process.env.PORT;
const host = process.env.HOST;


app.listen(port, host, () => {
  console.log(`Server is listening at http://${host}:${port}`);
});
