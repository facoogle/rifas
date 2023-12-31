require('dotenv').config();
const { Rifa, Numero, User } = require('../db');
const { spawn } = require('child_process');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
 HOST_EMAIL,
 PORT_EMAIL,
 EMAIL,
 EMAIL_PASS,
 DB_HOST,
 DB_PORT,
 CLIENT_PORT,
 REACT_APP_HOST,
 AUTH_SECRET,
 AUTH_EXPIRES,
 AUTH_ROUNDS,
} = process.env;

//-------------------- Rifas Controllers --------------------------

const createRifa = async (req, res) => {
 const { product, imgProduct, description, numbersPrice, totalNumbers } =
  req.body;

 try {
  const rifa = await Rifa.create(
   {
    product,
    imgProduct,
    description,
    numbersPrice,
    numeros: [], // Incluir un array vacío para la relación 'numeros'
   },
   {
    include: 'numeros', // Incluir la relación 'numeros' al crear la rifa
   },
  );

  const numbers = [];

  for (let i = 1; i <= totalNumbers; i++) {
   numbers.push({
    number: i,
    available: true,
    RifaId: rifa.id,
   });
  }

  await Numero.bulkCreate(numbers);

  res.json(rifa);
 } catch (err) {
  console.log(err.message);
 }
};

const checkRifas = async (req, res) => {
 try {
  const rifas = await Rifa.findAll({ include: 'numeros' });
  res.json(rifas);
 } catch (error) {
  res.status(500).json({ 'Error en el servidor: ': error.message });
 }
};

const buyRifa = async (req, res) => {
 try {
  const { rifaId, number, userId } = req.body;
  const rifa = await Rifa.findByPk(rifaId, {
   include: { model: Numero, as: 'numeros', include: User },
  });

  const selectedNumber = rifa.numeros.find((n) => n.number === number);

  if (selectedNumber && selectedNumber.available) {
   selectedNumber.available = false;
   selectedNumber.userId = userId;

   try {
    await selectedNumber.save(); // Guardar los cambios en la instancia de Número
   } catch (err) {
    console.log(err.message);
   }

   // Asociar el número comprado con el usuario correspondiente
   const user = await User.findByPk(userId);
   await selectedNumber.setUser(user);

   res.send({ rifa, userId }); // El número se compró exitosamente
  } else {
   res
    .status(409)
    .send(`El número ${number} de la rifa ${rifa.product} ya está comprado`); // El número ya está comprado o no existe
  }
 } catch (err) {
  res.status(500).json({ 'Error en el servidor: ': err.message });
 }
};

const rifaDetail = async (req, res) => {
 let { id } = req.params;
 try {
  const rifa = await Rifa.findByPk(id, { include: 'numeros' });
  console.log();
  res.status(200).json(rifa);
 } catch (error) {
  res.status(500).json({ 'Error en el servidor: ': error.message });
 }
};

module.exports = {
 createRifa,
 checkRifas,
 rifaDetail,
 buyRifa,
};
