import * as tf from "@tensorflow/tfjs-node";
import * as fs from "fs";
import * as path from "path";
import csv from "csv-parser";
import moment from "moment";

const foodPricesCsvPath = "food_prices.csv";
const modelSavePath = "bangladesh_price_prediction_model";
const seqLength = 10;
const lstmUnits = 32;

const loadCSVData = async () => {
  const data = [];
  let lineCount = 0;
  return new Promise((resolve, reject) => {
    fs.createReadStream(foodPricesCsvPath)
      .pipe(csv())
      .on("data", (row) => {
        if (lineCount < 10000) {
          data.push(row);
          lineCount++;
        } else {
          resolve(data);
        }
      })
      .on("end", () => {
        resolve(data);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

const preprocessData = (data) => {
  const unitConversion = {
    KG: 1,
    L: 1,
    Unit: 1,
  };

  const filteredData = data.filter(
    (row) =>
      row.category !== "non-food" &&
      !["Marmite", "Bunch", "Head"].includes(row.unit)
  );
  const formattedData = filteredData.map((row) => ({
    ...row,
    date: moment(row.date).toDate(),
    usdprice: parseFloat(row.usdprice) * unitConversion[row.unit],
  }));

  return formattedData;
};

const buildModel = () => {
  const model = tf.sequential();
  model.add(
    tf.layers.bidirectional({
      layer: tf.layers.lstm({ units: lstmUnits, returnSequences: true }),
      inputShape: [seqLength, 1],
    })
  );
  model.add(
    tf.layers.bidirectional({
      layer: tf.layers.lstm({ units: lstmUnits, returnSequences: false }),
    })
  );
  model.add(tf.layers.dense({ units: 1, kernelInitializer: "heNormal" })); // Changed kernel initializer

  model.compile({ optimizer: "adam", loss: "meanSquaredError" });
  return model;
};

const trainModel = async (model, X_train, y_train) => {
  await model.fit(X_train, y_train, { epochs: 5, batchSize: 32, verbose: 1 }); // Reduced epochs
};

const saveModel = async (model) => {
  await model.save(`file://${path.resolve(modelSavePath)}`);
};

const main = async () => {
  const rawData = await loadCSVData();
  const formattedData = preprocessData(rawData);

  const X = [];
  const y = [];
  for (let i = 0; i < formattedData.length - seqLength; i++) {
    const xBatch = [];
    for (let j = 0; j < seqLength; j++) {
      xBatch.push([formattedData[i + j].usdprice]);
    }
    X.push(xBatch);
    y.push([formattedData[i + seqLength].usdprice]);
  }
  const X_train = tf.tensor3d(X);
  const y_train = tf.tensor2d(y);

  const model = buildModel();
  await trainModel(model, X_train, y_train);
  await saveModel(model);

  const commodity = "Rice";
  const lastSeq = X.slice(X.length - seqLength).map((x) => x[0]);
  const inputTensor = tf.tensor3d([lastSeq]);
  const prediction = await model.predict(inputTensor);
  console.log(`Predicted price for ${commodity}: ${prediction.dataSync()[0]}`);
};

main()
  .then(() =>
    console.log("Model trained, saved, and predictions made successfully!")
  )
  .catch((error) => console.error("Error:", error));
