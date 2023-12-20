const { Router } = require("express");
const VisitanteController = require("../controllers/visitanteController.js");

const visitanteRouter = Router();
const visitanteController = new VisitanteController();

visitanteRouter.get(
  // #swagger.tags = ['Visitantes']
  // #swagger.summary = 'Lista todos os visitantes existentes.'
  // #swagger.description = 'Lista todos os visitantes existentes.'
  /* #swagger.responses[200] = {
            description: 'OK',
            schema: {
    "name": "Ed",
    "id": "65808b8eeb9b0c4212971c64",
    "visits": [
      {
        "visitDate": "25/12/2024"
      }
    ],
    "_count": {
      "visits": 1
    }}} 
  */

  "/api/visitantes",
  visitanteController.findAll
);
visitanteRouter.get(
  // #swagger.tags = ['Visitantes']
  // #swagger.summary = 'Mostra apenas um visitante baseado no id informado.'
  // #swagger.description = 'Mostra apenas um visitante baseado no id informado.'
  /* #swagger.responses[200] = {
            description: 'OK',
            schema: {
  "name": "Ed",
  "id": "65808b8eeb9b0c4212971c64",
  "phone": "5561992781077",
  "gender": "masculino",
  "age": 30,
  "cityAndState": "cityAndState",
  "religion": "religon",
  "smallGroup": "smallGroup",
  "bibleStudy": "bibleStudy",
  "createdAt": "2023-12-18T18:12:30.436Z",
  "updatedAt": "2023-12-18T18:12:30.436Z",
  "visits": [
    {
      "visitDate": "25/12/2024",
      "id": "65808c0b65189e5f65c6577d"
    }
  ],
  "_count": {
    "visits": 0
  }}}
  */

  "/api/visitantes/:id",
  visitanteController.findOne
);
visitanteRouter.post(
  // #swagger.tags = ['Visitantes']
  // #swagger.summary = 'Cria um novo visitante.'
  // #swagger.description = 'Cria um novo visitante.'
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Payload',
            schema: {
  "$name": "Ed",
  "$phone": "5561992781077",
  "$gender": "Masculino",
  "$age": 30,
  "$address": "Endereço",
  "$cityAndState": "São Paulo - SP",
  "$religion": "Adventista",
  "$smallGroup": "Não frequenta",
  "$bibleStudy": "Sim, com amigo",
  }} 
  */
  /* #swagger.responses[200] = {
            description: 'OK',
            schema: {
  "name": "Ed",
  "id": "65808b8eeb9b0c4212971c64",
  "phone": "5561992781077",
  "gender": "masculino",
  "age": 30,
  "cityAndState": "cityAndState",
  "religion": "religon",
  "smallGroup": "smallGroup",
  "bibleStudy": "bibleStudy",
  "createdAt": "2023-12-18T18:12:30.436Z",
  "updatedAt": "2023-12-18T18:12:30.436Z",
  "visits": [],
  "_count": {
    "visits": 0
  }}}
  */
  "/api/visitantes",
  visitanteController.create
);
visitanteRouter.patch(
  // #swagger.tags = ['Visitantes']
  // #swagger.summary = 'Atualizado os dados de um visitante existente baseado no id informado.'
  // #swagger.description = 'Atualizado os dados de um visitante existente baseado no id informado.'
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Payload',
            schema: {
  "name": "Ed",
  "phone": "5561992781077",
  "gender": "Masculino",
  "age": 30,
  "address": "Endereço",
  "cityAndState": "São Paulo - SP",
  "religion": "Adventista",
  "smallGroup": "Não frequenta",
  "bibleStudy": "Sim, com amigo",
  }} 
  */
  /* #swagger.responses[200] = {
            description: 'OK',
            schema: {
  "name": "Ed",
  "id": "65808b8eeb9b0c4212971c64",
  "phone": "5561992781077",
  "gender": "masculino",
  "age": 30,
  "cityAndState": "cityAndState",
  "religion": "religon",
  "smallGroup": "smallGroup",
  "bibleStudy": "bibleStudy",
  "createdAt": "2023-12-18T18:12:30.436Z",
  "updatedAt": "2023-12-18T18:12:30.436Z",
  "visits": [],
  "_count": {
    "visits": 0
  }}}
  */
  "/api/visitantes/:id",
  visitanteController.update
);
visitanteRouter.delete(
  // #swagger.tags = ['Visitantes']
  // #swagger.summary = 'Apaga um visitante existente baseado no id informado.'
  // #swagger.description = 'Apaga um visitante existente baseado no id informado.'
  /* #swagger.responses[200] = {
            description: 'OK',
            schema: {
  "name": "Ed",
  "id": "65808b8eeb9b0c4212971c64",
  "phone": "5561992781077",
  "gender": "masculino",
  "age": 30,
  "cityAndState": "cityAndState",
  "religion": "religon",
  "smallGroup": "smallGroup",
  "bibleStudy": "bibleStudy",
  "createdAt": "2023-12-18T18:12:30.436Z",
  "updatedAt": "2023-12-18T18:12:30.436Z",
  "visits": [],
  "_count": {
    "visits": 0
  }}}
  */
  "/api/visitantes/:id",
  visitanteController.delete
);

module.exports = visitanteRouter;
