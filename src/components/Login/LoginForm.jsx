import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import Swal from "sweetalert2";
import { toast } from "sonner";

import { useSession } from "../../stores/useSession";
import { postLoginFn } from "../../api/auth";
import Input from "../Input/Input";





const LoginForm = () => {
  //ZUSTAND----------------------------------------------------------------

  const {login} = useSession();

  //RRD ----------------------------------------------------------------

  const navigate = useNavigate();

 //RHF  ----------------------------------------------------------------


  const {
    register,
    formState: { errors },
    handleSubmit: onSubmitRHF,
  } = useForm();

  // TQUERY----------------------------------------------------------------
  const{mutate: postLogin} = useMutation({
    mutationFn: postLoginFn,
    onSuccess: (data) =>{
        //msj exito
        Swal.close();
        toast.success('Bienvenido')
        
        // Loguear al usuario
            login(data)

        // Navegar a inicio pero estando logueado 
        navigate('/')
    },
    onError: (err)=>{
        Swal.close();
        toast.error(err.message)
    }
})

// HANDLERS---------------------------------------------------------------


  const handleSubmit = (data) => {
    Swal.showLoading();
    postLogin(data)
  };

  // RENDER ----------------------------------------------------------- 

  return (
    <form onSubmit={onSubmitRHF(handleSubmit)}>
      <Input
        label="Nombre de usuario"
        placeholder="Ingrese nombre de usuario"
        name="username"
        register={register}
        error={!!errors?.username}
        className="mb-2"
        options={{
          minLength: 3,
          maxaLength:25,
          required: true,
        }}
      />
      <Input
        label="Contraseña"
        type="password"
        placeholder="Ingrese su contraseña"
        name="password"
        register={register}
        error={!!errors?.password}
        options={{
          minLength: 8,
          maxaLength:15,
          required: true,
        }}
      />
      <button className="btn btn-primary w-100 mt-2" type="submit">
        Ingresar
      </button>
      <p className="mb-0 mt-4">
        Sos nuevo?<Link to="/register"> Registraté acá</Link>
      </p>
    </form>
  );
};
export default LoginForm;
