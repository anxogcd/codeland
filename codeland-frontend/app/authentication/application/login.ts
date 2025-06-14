import User from "../domain/User.model";

const login = (username: string, password: string) => {
  const user = new User(username, password);

  if (!user.validateEmail()) {
    throw new Error("Invalid email format");
  }

  // Lógica de autenticación (validación de credenciales, etc.)
  // Aquí iría la integración con la base de datos o un servicio externo
  return true; // Si la autenticación fue exitosa
};

export default login;
