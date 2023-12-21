const { Router } = require("express");
const UserController = require("../controllers/userController.js");

const userRouter = Router();
const userController = new UserController();

userRouter.get(
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Lista todas os usuários existentes.'
  // #swagger.description = 'Lista todos os usuários existentes.'
  /* #swagger.responses[200] = {
            description: 'OK',
            schema:   {
    "id": "65808c0b65189e5f65c6577d",
    "name": "Ed",
    "email": "email@email.com"
    }}
    */
  "/api/users",
  userController.findAll
);
userRouter.get(
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Mostra apenas um usuário baseado no id informado.'
  // #swagger.description = 'Mostra apenas um usuário baseado no id informado.'
  /* #swagger.responses[200] = {
            description: 'OK',
            schema: {
  "id": "65808b8eeb9b0c4212971c64",
  "name": "Edison",
  "email": "email@email.com",
  "createdAt": "2023-12-18T18:12:30.436Z",
  "updatedAt": "2023-12-18T18:12:30.436Z",}}
  */
  "/api/users/:id",
  userController.findOne
);
userRouter.post(
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Cria um novo usuário.'
  // #swagger.description = 'Cria um novo usuário.'
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Payload',
            schema: {
  "$name": "Ed",
  "$email": "email@email.com",
  "$password": "password",
  }} 
  */
  /* #swagger.responses[200] = {
            description: 'OK',
            schema: {
  "id": "65808b8eeb9b0c4212971c64",
  "name": "Ed",
  "email": "email@email.com",
  "password": "password",
  "createdAt": "2023-12-18T18:12:30.436Z",
  "updatedAt": "2023-12-18T18:12:30.436Z",
  }}}
  */
  "/api/users",
  userController.create
);
userRouter.patch(
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Atualiza os dados de um usuário existente baseado no id informado.'
  // #swagger.description = 'Atualiza os dados de um visitante existente baseado no id informado.'
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Payload',
            schema: {
  "$name": "Ed",
  "$email": "email@email.com",
  "$password": "password",
  }} 
  */
  /* #swagger.responses[200] = {
            description: 'OK',
            schema: {
  "id": "65808b8eeb9b0c4212971c64",
  "name": "Ed",
  "email": "email@email.com",
  "password": "password",
  "createdAt": "2023-12-18T18:12:30.436Z",
  "updatedAt": "2023-12-18T18:12:30.436Z",
  }}}
  */
  "/api/users/:id",
  userController.update
);
userRouter.delete(
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Apaga um usuário existente baseado no id informado.'
  // #swagger.description = 'Apaga um usuário existente baseado no id informado.'
  /* #swagger.responses[200] = {
            description: 'OK',
            schema: {
  "id": "65808b8eeb9b0c4212971c64",
  "name": "Edison",
  "email": "email@email.com",
  "createdAt": "2023-12-18T18:12:30.436Z",
  "updatedAt": "2023-12-18T18:12:30.436Z",}}
  */
  "/api/users/:id",
  userController.delete
);

module.exports = userRouter;
