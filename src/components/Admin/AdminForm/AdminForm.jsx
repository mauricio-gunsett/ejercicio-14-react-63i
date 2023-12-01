import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import Swal from "sweetalert2";

import { postBlogFn, putBlogFn } from "../../../api/blogs";

import { useBlog } from "../../../stores/useBlogs";

import Input from "../../Input/input";
import Textarea from "../../Textarea/Textarea";



const AdminForm = () => {

// REACT HUK FROM------------------------------------------

  //  traemos
  const {
    register,
    handleSubmit: onSubmitRHF,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

//ZUSTAND-------------------------------------------------
const {blog, clearBlog} = useBlog();
const isEditing = !!blog;

// en el caso que este editando un blog
if(isEditing){
  setValue('title',blog.title);
  setValue('image-url',blog['image-url']);
  setValue('content',blog.content)
}



//TQUERY------------------------------------------------

const queryClient = useQueryClient();
//CREATE (POST)
const {mutate: postBlog} = useMutation({
  mutationFn: postBlogFn,
  onSuccess: () => {
    // mensaje de exito
    Swal.close()
    toast.success("Blog guardado correctamente")

    // reseter el formulario
    reset()

    //indicar que la tabla se tiene que recargar 
    queryClient.invalidateQueries( 'blogs')
  },
  onError: () => {
    Swal.close()
    toast.error ('Ocurrió un error al guardar el blog');
  }
})


//UPDATE (PUT)
const {mutate: putBlog} = useMutation({
  mutationFn: putBlogFn,
  onSuccess: () => {
    // mensaje de exito
    Swal.close()
    toast.success("Blog guardado correctamente")

    // reseter el formulario
    reset()

    //limpiar estado global
    clearBlog()

    //indicar que la tabla se tiene que recargar 
    queryClient.invalidateQueries( 'blogs')
  },
  onError: () => {
    Swal.close()
    toast.error ('Ocurrió un error al guardar el blog');
  }
})

// HANDLERS---------------------------------------------------

  const handleSubmit = (data) => {
    Swal.showLoading()

    if(isEditing){
      putBlog({...data, id: blog.id});
    } else{
    postBlog(data) 
    }
  };

  // RENDER---------------------------------------------------
 
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
