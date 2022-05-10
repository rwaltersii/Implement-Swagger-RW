const express = require("express");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

// data parser - used to parse post data
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Inventory API",
      version: "1.0.0",
    },
  },
  apis: ["app.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 * /vehicles:
 *   get:
 *     description: Get all vehicles
 *     responses:
 *       200:
 *         description: Success
 *
 */
app.get("/vehicles", (req, res) => {
  res.send([
    {
      make: "Toyota",
      model: "Corolla",
      year: 2007,
      price: "$10,000",
    },
  ]);
});

/**
 * @swagger
 * /vehicle:
 *   post:
 *     description: Get one vehicle
 *     parameters:
 *     - name: model
 *       description: Vehicle Make
 *       in: body
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: Success
 *
 */
app.post("/vehicle", (req, res) => {
  const model = req.body.model;
  res.send({ model });
});

app.listen(3000, () => {
  console.log("Running on port 3000");
});
