import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/*Este middleware valida que el token enviado sea valido, 
si es asi entonces se permite el procesamiento del request*/
export const authenticateToken = (req, res, next) => {
  /*se valida el header de tipo autorizacion que es el 
  que contendra el token que enviara el front*/
  const header = req.headers["authorization"];

  //Se valida si el front esta enviado un header de tipo bearer token que contenga el token para autenticacion
  const token = header && header.split(" ")[1]; // 'Bearer <token>'
  if (!header) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, tokenContent) => {
    if (err) return res.sendStatus(403); // en caso de que el token no sea el correcto
    //Aqui entonces procedemos a permitir que lo enviado desde el front sea recibido por la ruta correspondiente en el campo username
    req.username = tokenContent;
    next();
  });
};

export const cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.access_token;

  req.session = { user: null };

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    req.session.user = user;
    res.json(token);
    next();
  } catch (error) {
    res.json({ error });
  }
};

export const Login = async (req, res) => {
  //campos enviados por el front end
  try {
    const { email, username, password } = req.body;

    //validar si existe el usuario ingresado o el correo
    const userExist = await UserModel.findOne({ username });
    const userEmail = await UserModel.findOne({ email });

    //Se valida que tanto el usuario como el email enviados por el front end no sean ni null ni undefined
    // if ((userExist !== null && !userExist !== undefined) && (!userEmail !== null && !userEmail !== undefined)) {
    //   console.log("tan lo do");
    // }

    //Se valida que al menos el usuario o el correo sean enviados
    if (userExist === null || undefined || userEmail === null || undefined) {
      console.log("uno de los dos esta vacio");
    }

    const user = await UserModel.find({ username, userEmail });

    console.log(user);

    //Se compara la contraseña enviada del front con la que el usuario tiene en la base de datos
    const comparedPassword = bcrypt.compare(password, userExist.password);

    if (!comparedPassword) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }
    // se crea el token
    const token = jwt.sign(
      { username: user.password },
      process.env.JWT_SECRET_TOKEN,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("access_token", token, {
      httpOnly: true, //La cookie solo puede ser accedida desde el servidor y no podra ser leida desde el navegador con document.cookie
      secure: true, //la cookie solo funciona con https
      sameSite: "strict", //La cookie solo puede accederse desde el mismo dominio
      maxAge: 1000 * 60 * 60,
    });
    // console.log(userExist);

    res.json(token);
  } catch (error) {
    console.log(error);
  }
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
