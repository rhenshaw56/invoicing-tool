import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import App from '../src/App';

// import movies from "../src/api/movies.route"
// import users from "../src/api/users.route"

const app = express();

process.env.NODE_ENV !== "prod" && app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Register api routes
// app.use("/api/v1/movies", movies);
// app.use("/api/v1/user", users);

const Html = ({ body, styles, title }) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
      ${styles}
    </head>
    <body style="margin:0">
      <div id="app">${body}</div>
    </body>
  </html>
`;


app.get('/', (req, res) => {
  const sheet = new ServerStyleSheet();

  const body = ReactDOMServer.renderToString(sheet.collectStyles(<App />));
  const styles = sheet.getStyleTags();
  const title = 'Invoice Tool';

  return res.send(
    Html({
      body,
      styles,
      title
    })
  );
});
app.use("/status", express.static("build"))
app.use(express.static('./build'));
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

export default app
