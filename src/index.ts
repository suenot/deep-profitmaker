require('dotenv').config();

// import * as Sentry from '@sentry/node';
// import * as Tracing from '@sentry/tracing';
import bodyParser from 'body-parser';
import Debug from 'debug';
import express from 'express';
import gql from 'graphql-tag';
import _ from 'lodash';
// import 'source-map-support/register';
import { generateApolloClient } from '../hasura';
// import { middlewares } from './integrations/tinkoff-split/middlewares';
// import { paymentStageHandler } from './integrations/tinkoff-split/payment-stage-handler';
// import { sharingProviderStageHandler } from './integrations/tinkoff-split/sharing_provider-stage-handler';
// import { usingStageHandler } from './integrations/tinkoff-split/using-stage-handler';

const PORT_ENV = process.env.PORT;

// const PAYMENT_QUERY = gql`query ($paymentId: Int, $nodeId: String) { payments(where: {id: {_eq: $paymentId}, nodeId: {_eq: $nodeId} }) { id nodeId } }`;

// const DELETE_PAYMENT = gql`mutation DeleteNotification($paymentId: Int) { delete_payments(where: {id: {_eq: $paymentId}}) { returning { id } } }`;

// const INSERT_JSON = gql`mutation insertJson($paymentId: String, $json: jsonb) { update_nodes(where: {id: {_eq: $paymentId}}, _set: {json: $json}) { returning { id } } }`;
// const APPEND_JSON = gql`mutation insertJson($paymentId: String, $json: jsonb) { update_nodes(where: {id: {_eq: $paymentId}}, _append: {json: $json}) { returning { id } } }`;

// const NODE_QUERY = gql`query ($nodeId: String) {
//   nodes(where: {
//     id: {_eq: $nodeId}
//   }) { id source_id target_id key type format string number boolean json date point path }
// }`;

const debug = Debug('server:index');

// export const setStage = async (nodeId, stage, client) => {
//   debug('setStage', { nodeId, stage, client: typeof client });
//   console.trace('setStage');
//   if (!nodeId) return { error: '!nodeId' };
//   if (!stage) return { error: '!stage' };
//   return await client.mutate({ mutation: UPDATE_STAGE, variables: { nodeId, stage } });
// };

// export const setError = async (paymentNode, response, client) => {
//   debug('setError', { paymentNode, response, client: typeof client });
//   if (!paymentNode.id) return { error: '!paymentNode.id' };
//   if (!paymentNode.json) {
//     await client.mutate({
//       mutation: INSERT_JSON,
//       variables: {
//         paymentId: paymentNode.id,
//         json: { pay: { type: 'tinkoff', response } },
//       },
//     });
//   } else if (paymentNode.json && !paymentNode.json.pay) {
//     await client.mutate({
//       mutation: APPEND_JSON,
//       variables: {
//         paymentId: paymentNode.id,
//         json: { pay: { type: 'tinkoff', response } },
//       },
//     });
//   } else if (paymentNode.json && paymentNode.json.pay) {
//     const newJson = _.cloneDeep(paymentNode.json);
//     newJson.pay.response = response;
//     debug('setError newJson', JSON.stringify(newJson));
//     await client.mutate({
//       mutation: INSERT_JSON,
//       variables: {
//         paymentId: paymentNode.id,
//         json: newJson,
//       },
//     });
//   }
//   await client.mutate({ mutation: UPDATE_STAGE, variables: { nodeId: paymentNode.id, stage: 'rejected' } });
// };

export const initialize = (
  app = express(),
  client = generateApolloClient(),
  onRequest?,
  onListen?,
) => {

  // Sentry.init({
  //   dsn: process.env.SENTRY_DSN,
  //   maxBreadcrumbs: 50,
  //   debug: true,
  //   release,
  //   integrations: [
  //     new Sentry.Integrations.Http({ tracing: true }),
  //     new Tracing.Integrations.Express({
  //       app,
  //     }),
  //   ]});
  // app.use(Sentry.Handlers.requestHandler());
  // app.get('/debug-sentry', (req, res) => {
  //   throw new Error('Sentry test!');
  // });

  // const deletePayment = async (id) => {
  //   if (!id) return { error: '!id' };
  //   return await client.mutate({
  //     mutation: DELETE_PAYMENT,
  //     variables: { paymentId: id },
  //   });
  // };

  app.get('/healthz', (req, res) => res.send({ status: 'ok' }));
  app.use(bodyParser.json());

  // middlewares({ app, client });
  // app.post('/', async (req, res) => {
  //   if (onRequest) await onRequest(req, res);
  //   debug('request /', req.body);

  //   const { id, nodeId } = _.get(req, 'body.event.data.new', {});
  //   debug('input', { id, nodeId });

  //   if (!id) await res.json({ error: '!id' });
  //   if (!nodeId) await res.json({ error: '!nodeId' });

  //   const paymentRow = _.get(
  //     await client.query({
  //       query: PAYMENT_QUERY,
  //       variables: {
  //         paymentId: +id, nodeId,
  //       },
  //     }),
  //     'data.payments.0',
  //   );

  //   if (!paymentRow) {
  //     debug('illegal', { id, nodeId });
  //     await deletePayment(id);
  //     return await res.json({ error: 'illegal' });
  //   }

  //   const inputNode = _.get(
  //     await client.query({
  //       query: NODE_QUERY,
  //       variables: { nodeId },
  //     }),
  //     'data.nodes.0',
  //   );

  //   if (!inputNode) {
  //     debug('!node', { id, nodeId });
  //     await deletePayment(id);
  //     return await res.json({ error: '!node' });
  //   }

  //   const stageNode = _.get(
  //     await client.query({
  //       query: STAGE_BY_NODE,
  //       variables: { nodeId: inputNode.id },
  //     }),
  //     'data.nodes.0',
  //   );

  //   debug('loaded', { inputNode, stageNode });

  //   // const result = await handleNode({ inputNode, client });
  //   let result;
  //   if (inputNode?.type === 'payment') {
  //     result = await paymentStageHandler({ inputNode, stageNode, client });
  //   } else if (inputNode?.type === 'using') {
  //     result = await usingStageHandler({ inputNode, stageNode, client });
  //   } else if (inputNode?.type === 'sharing_provider') {
  //     result = await sharingProviderStageHandler({ inputNode, stageNode, client });
  //   }
  //   await res.json(result || { error: 'unexpected' });

  //   debug('deletePayment', { id, nodeId });
  //   await deletePayment(id);
  // });

  app.listen(PORT_ENV, () => {
    console.log(`Listening on port ${PORT_ENV}!`);
    console.log('Hello bugfixers!');
    if (onListen) onListen(app);
  });
};
