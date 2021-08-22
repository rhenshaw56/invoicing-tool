import React from 'react';
import fs from 'fs';
import express from "express";
import path from 'path';
import { ChunkExtractor } from '@loadable/server'
import fetch from 'unfetch';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { ApolloServer, gql } from 'apollo-server-express';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import bodyParser from "body-parser";
import morgan from "morgan";
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet as StyledStyleSheet } from 'styled-components';
import { ServerStyleSheets as MaterialStyleSheet, ThemeProvider } from '@material-ui/core/styles';

import App from '../client/App';
import {typeDefs, resolvers} from './gql';
import CrudService from './dao';
import Html from './component';


import models from './models';

const statsFile = path.resolve(`${__dirname}/loadable-stats.json`);

const extractor = new ChunkExtractor({ statsFile })




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
    const filePath = path.resolve(__dirname, '..', 'build', 'index.html');

    fs.readFile(filePath, 'utf8', async (err, htmlData) => {
      if (err) {
        console.error('err', err);
        return res.status(404).end();
      }

      const client = new ApolloClient({
        ssrMode: true,
        link: createHttpLink({
          uri: 'http://localhost:3006/graphql',
          fetch,
          credentials: 'same-origin',
        }),
        cache: new InMemoryCache(),
      });

      const materialSheet = new MaterialStyleSheet();
      const styledSheet = new StyledStyleSheet();

      const serverApp = ReactDOMServer.renderToString(styledSheet.collectStyles(
        materialSheet.collect(
        <ApolloProvider client={client}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ApolloProvider>
      )));
      const materialStyles = materialSheet.toString();
      const styledStyles = styledSheet.getStyleElement();
      const title = 'Invoice Tool';

      await getDataFromTree(serverApp).then((_args) => {
        // Extract the entirety of the Apollo Client cache's current state
        const initialState = client.extract();

        // Add both the page content and the cache state to a top-level component
        const html = ReactDOMServer.renderToStaticMarkup(<Html title={title} content={serverApp} state={initialState} css={materialStyles} styles={styledStyles} />);

        // Render the component to static markup and return it
        res.status(200);
        res.end(
          htmlData.replace(
          '<div id="root"></div>',
          `<div id="root">${html}</div>`
        ));
      });

    });




  });
  app.use(express.static("build"));
  app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

  return app;
}
