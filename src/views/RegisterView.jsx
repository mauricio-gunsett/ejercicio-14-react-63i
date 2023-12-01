import RegisterForm from "../components/Register/RegisterForm"

const RegisterView = () => {
  return (
    <>
        <h1>Registro</h1>
       <hr />
      <section className="bg-light p-4 rounded">
        <section className="alert alert-info">
            La contraseña deberá tener entre 8 y 15 carácteres, al menos, 1 minúscula, 1 mayúscula
        </section>
        <RegisterForm />
      </section>
      </>
  )
}
export default RegisterView