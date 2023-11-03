import { useForm } from "react-hook-form";

import { toast } from "sonner";

import Input from "../../input/input";
import Textarea from "../../Textarea/Textarea";

import { generateId } from "../../../helpers/helpers";

const AdminForm = (props) => {
  const{ setBlogs } = props;

  //  traemos
  const {
    register,
    handleSubmit: onSubmitRHF,
    formState: { errors },
    reset,
  } = useForm();

  const handleSubmit = (data) => {
    const newBlog = {...data, id: generateId()};
    setBlogs((prev)=>[...prev, newBlog])

    toast.success("Blog guardado correctamente")
    
    reset()
  };
  return (
    <form className="card p-3" onSubmit={onSubmitRHF(handleSubmit)}>
      <Input
        register={register}
        options={{
          required: true,
          minLength: 4,
          maxLength: 30,
        }}
        label="Titulo"
        name="title"
        placeholder="Ravioles"
        error={!!errors.title}
      />
      <Input
        register={register}
        options={{
          required: true,
          minLength: 4,
          pattern: /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|webp|jpeg)/i,
        }}
        className="mt-2"
        type="url"
        label="Enlace a imagen"
        name="image-url"
        placeholder="https://google.com"
        error={!!errors["image-url"]}
      />
      <Textarea
        register={register}
        options={{
          reqired: true,
          minLength: 5,
          maxLength: 3000,
        }}
        className="mt-2"
        label="Contenido del blog"
        name="content"
        placeholder="hola"
        error={!!errors.content}
      />
      <div className="text-end">
        <button type="submit" className="btn btn-danger mt-3">
          Guardar
        </button>
      </div>
    </form>
  );
};
export default AdminForm;
