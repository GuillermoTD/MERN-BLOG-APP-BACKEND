import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const Login = (req, res) => {
  res.send("login");
};

export const Signup = async (req, res) => {
  try {
    //campos enviados por el front end
    const { email, username, password } = req.body;

    // console.log(req.body)

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

    res.send("Usuario registrado")
  } catch (error) {
    console.log(error);
    res.send({ err: error });
  }

};
