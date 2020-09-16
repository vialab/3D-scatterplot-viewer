const PORT = 8080;

let express = require("express");
let bodyparser = require("body-parser");

let StringTrimMiddleware = require("./src/Middleware/TrimStrings");
let ValidationMiddleware = require("./src/Middleware/ValidationMiddleware");

let DatasetServer = require("./src/Controllers/DatasetServer");
let SubmissionController = require("./src/Controllers/Submission");
let ValidationController = require("./src/Controllers/Validation");

let app = express();

app.use(bodyparser.json());

app.get("/api/datasets/:folder/:file", DatasetServer.GetFile);
app.post("/api/submit",
	StringTrimMiddleware,
	ValidationMiddleware,
	SubmissionController.Submit
);
app.get("/api/IsFieldFull/:field",
	ValidationController.CheckIfFieldFull
);

app.get("/api/ping",
	(req, res) => res.send("pong")
);

app.listen(PORT, () =>
{
	console.log(`Server listening on port ${PORT}`)
});