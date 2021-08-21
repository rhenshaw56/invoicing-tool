import express from "express";
import { ApolloServer, gql } from 'apollo-server-express';
import bodyParser from "body-parser";
import morgan from "morgan";
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import App from '../client/App';
import {typeDefs, resolvers} from './gql';
import CrudService from './dao';

import models from './models';

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


export async function createExpressApp() {

  const server = new ApolloServer({
    introspection: true,
    playground: true,
    typeDefs,
    resolvers,
    context: { models },
    dataSources: () =>  new CrudService(),
    formatError: error => {
      return error
    },
  });

  const app = express();

  app.use(morgan("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  await server.start();
  console.log(`${server.graphqlPath}`)
  server.applyMiddleware({ app, path: "/graphql" });

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
  app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

  return app;
}
