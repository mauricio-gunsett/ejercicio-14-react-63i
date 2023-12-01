const API_URL = import.meta.env.VITE_API_URL;

export const postLoginFn = async (formdata) => {
  const response = await fetch(`${API_URL}/users`);

  if (!response.ok) {
    throw new Error("Ocurrio un error al loguearse");
  }

  const users = await response.json();

  const foundUser = users.find(
    (item) =>
      item.username === formdata.username && item.passwor === formdata.passwor
  );

    if(!foundUser){
        throw new Error('Usuario o contraseña no válida')
    }
  return {...foundUser, passwor: undefined}
};


