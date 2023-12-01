import { useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { toast } from "sonner";

import { postUserFn } from "../../api/users";
import { useSession } from "../../stores/useSession";

import Input from "../input/Input";




const RegisterForm = () => {
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
   const{mutate: postUser} = useMutation({
        mutationFn: postUserFn,
        onSuccess: (data) =>{
            //msj exito
            Swal.close();
            toast.success('Bienvenido')
            
            // Loguear al usuario
                login({...data, password: undefined})

            // Navegar a inicio pero estando logueado 
            navigate('/')
        },
        onError: ()=>{
            Swal.close();
            toast.success('Ocurrio un error al registrar un usuario')
        }
    })

  // HANDLERS---------------------------------------------------------------
  const handleSubmit = (data) => {
    Swal.showLoading();
    postUser({...data, isAdmin: false});
  };
   // RENDER --------------------------------------------------------------
  return (
    <form onSubmit={onSubmitRHF(handleSubmit)} className="row">
      <div className="col-12 col-md-6">
        <Input
          label="Nombre"
          name="firstname"
          placeholder="Ingrese su nombre"
          register={register}
          error={!!errors?.firstname}
          className="mb-2"
          options={{
            minLength: 3,
            maxaLength:25,
            required: true,
          }}
        />
      </div>
      <div className="col-12 col-md-6">
        <Input
          label="Apellido"
          placeholder="Ingrese su Apellido"
          name="lastname"
          register={register}
          error={!!errors?.lastname}
          className="mb-2"
          options={{
            minLength: 3,
            maxaLength:25,
            required: true,
          }}
        />
      </div>
      <div className="col-12 col-md-6">
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
      </div>
      <div className="col-12 col-md-6">
        <Input
          label="Contraseña"
          type="password"
          placeholder="Ingrese su contraseña"
          name="password"
          register={register}
          error={!!errors?.password}
          className ='mb-3'
          options={{
            minLength: 8,
            maxaLength:15,
            pattern: /^(?=.*[a-z])(?=.*[A-Z]).{8,15}$/,
            required: true,
          }}
        />
      </div>
      <div>
      <button className="btn btn-primary w-100 mt-2" type="submit">
        Registrarse
      </button>
      </div>
    </form>
  );
};
export default RegisterForm;
