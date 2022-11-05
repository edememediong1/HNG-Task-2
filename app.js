const express = require("express");
const cors = require("cors")
const arithOpts = require("./utils/helper");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.use(cors({
    origin: '*'
}));

app.get('/', (req, res) => {
    res.status(200).send(
        "Welocome to basic Arithemtic opertions"
    )
})

app.post("/calculate", arithOpts)

// Error handler middleware
app.use((error, req, res, next) => {
    console.log(error)
    const errorStatus = error.status || 500
    res.status(errorStatus).send(error.message)
    next()
})

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
});


