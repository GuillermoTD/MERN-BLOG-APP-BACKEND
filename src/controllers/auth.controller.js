import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const Login = async (req, res) => {
  //campos enviados por el front end
  const { email, username, password } = req.body;

  //validar si existe el usuario ingresado o el correo
  const userExist = await UserModel.findOne({ username });
  const userEmail = await UserModel.findOne({ email });


  //Se valida que tanto el usuario como el email enviados por el front end no sean ni null ni undefined
  // if ((userExist !== null && !userExist !== undefined) && (!userEmail !== null && !userEmail !== undefined)) {
  //   console.log("tan lo do");
  // }

  //Se valida que al menos el usuario o el correo sean enviados 
  if ((userExist === null || undefined) || (userEmail === null || undefined)) {
    console.log("uno de los dos esta vacio")
  }

  console.log(userExist);
  console.log(userEmail);

  res.json("login");
};

export const Signup = async (req, res) => {
  try {
    //campos enviados por el front end
    const { email, username, password } = req.body;

    //validar si existe el usuario ingresado o el correo
    const userExist = await UserModel.findOne({ username });
    const emailExist = await UserModel.findOne({ email });

    if (userExist || emailExist)
      return res.status(400).json({ error: "Usuario ya existe" });

    //se encripta contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    //Nuevo usuario
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    //Se guarda el usuario

    await newUser.save();

    res.send("Usuario registrado");
  } catch (error) {
    console.log(error);
    res.send({ err: error });
  }
};
