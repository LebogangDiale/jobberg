const app = require('./app');
const port = process.env.PORT || 4316;


app.listen(port,'0.0.0.0', () => {
    console.log(`server is listening ${port}`);
});