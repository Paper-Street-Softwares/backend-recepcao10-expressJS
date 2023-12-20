const { Router } = require("express");
const VisitaController = require("../controllers/visitaController.js");

const visitaRouter = Router();
const visitaController = new VisitaController();

visitaRouter.get(
  // #swagger.tags = ['Visitas']
  // #swagger.summary = 'Lista todas as visitas existentes.'
  // #swagger.description = 'Lista todas as visitas existentes.'
  /* #swagger.responses[200] = {
            description: 'OK',
            schema:   {
    "visitDate": "25/12/2024",
    "id": "65808c0b65189e5f65c6577d",
    "visitante": {
      "name": "Ed",
      "id": "65808b8eeb9b0c4212971c64"
    }}}
    */
  "/api/visitas",
  visitaController.findAll
);
visitaRouter.get(
  // #swagger.tags = ['Visitas']
  // #swagger.summary = 'Mostra apenas uma visita baseado no id informado.'
  // #swagger.description = 'Mostra apenas uma visita baseado no id informado.'
  /* #swagger.responses[200] = {
            description: 'OK',
            schema:   
            {
  "visitDate": "25/12/2024",
  "id": "65808c0b65189e5f65c6577d",
  "createdAt": "2023-12-18T18:14:35.214Z",
  "updatedAt": "2023-12-18T18:14:35.214Z",
  "visitante": {
    "name": "Ed",
    "id": "65808b8eeb9b0c4212971c64",
    "visits": [
      {
        "visitDate": "25/12/2024"
      }
    ],
    "_count": {
      "visits": 1
    }}}}
    */
  "/api/visitas/:id",
  visitaController.findOne
);
visitaRouter.post(
  // #swagger.tags = ['Visitas']
  // #swagger.summary = 'Cria uma nova visita.'
  // #swagger.description = 'Cria uma nova visita.'
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Payload',
            schema: {
  "$visitDate": "10/10/2023",
  "$visitanteId": "65808b8eeb9b0c4212971c64",
  }} 
  */
  /* #swagger.responses[200] = {
            description: 'OK',
            schema:   
            {
  "visitDate": "25/12/2024",
  "id": "65808c0b65189e5f65c6577d",
  "createdAt": "2023-12-18T18:14:35.214Z",
  "updatedAt": "2023-12-18T18:14:35.214Z",
  "visitante": {
    "name": "Ed",
    "id": "65808b8eeb9b0c4212971c64",
    "visits": [
      {
        "visitDate": "25/12/2024"
      }
    ],
    "_count": {
      "visits": 1
    }}}}
    */
  "/api/visitas",
  visitaController.create
);
visitaRouter.patch(
  // #swagger.tags = ['Visitas']
  // #swagger.summary = 'Atualizado os dados de uma visita existente baseado no id informado.'
  // #swagger.description = 'Atualizado os dados de uma visita existente baseado no id informado.'
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Payload',
            schema: {
  "visitDate": "10/10/2023"
  }} 
  */
  /* #swagger.responses[200] = {
            description: 'OK',
            schema:   
            {
  "visitDate": "25/12/2024",
  "id": "65808c0b65189e5f65c6577d",
  "createdAt": "2023-12-18T18:14:35.214Z",
  "updatedAt": "2023-12-18T18:14:35.214Z",
  "visitante": {
    "name": "Ed",
    "id": "65808b8eeb9b0c4212971c64",
    "visits": [
      {
        "visitDate": "25/12/2024"
      }
    ],
    "_count": {
      "visits": 1
    }}}}
    */
  "/api/visitas/:id",
  visitaController.update
);
visitaRouter.delete(
  // #swagger.tags = ['Visitas']
  // #swagger.summary = 'Apaga um visita existente baseado no id informado.'
  // #swagger.description = 'Apaga um visita existente baseado no id informado.'
  /* #swagger.responses[200] = {
            description: 'OK',
            schema:   
            {
  "visitDate": "25/12/2024",
  "id": "65808c0b65189e5f65c6577d",
  "createdAt": "2023-12-18T18:14:35.214Z",
  "updatedAt": "2023-12-18T18:14:35.214Z",
  "visitante": {
    "name": "Ed",
    "id": "65808b8eeb9b0c4212971c64",
    "visits": [
      {
        "visitDate": "25/12/2024"
      }
    ],
    "_count": {
      "visits": 1
    }}}}
    */
  "/api/visitas/:id",
  visitaController.delete
);

module.exports = visitaRouter;
