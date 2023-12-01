import { useMutation, useQueryClient } from "@tanstack/react-query";

import Swal from "sweetalert2";
import { toast } from "sonner";

import { deleteBlogFn } from "../../../api/blogs";
import { useBlog } from "../../../stores/useBlogs";

const TableRow = (props) => {
    const {blog,index} = props;

//Zustand------------------------------------------------
    const { setBlogToEdit } = useBlog();
    
//TANSTACQUERY------------------------------------------------

        const queryClient = useQueryClient();

  const {mutate: deleteBlog} =  useMutation({
        mutationFn: deleteBlogFn,
        onSuccess: ()=>{
            Swal.close();
            toast.success('Blog eliminado')

            queryClient.invalidateQueries('blogs')
        },
        onError: () =>{
            Swal.close();
            toast.error('Ocurrió un error eliminando el blog')
        }
    })
//HANDLERS------------------------------------------------

//EDIT
const handleEdit = ()=>{
    setBlogToEdit(blog)
}

//DELETE
    const handleDelete = () => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: `Estás por eliminar de manera definitiva el blog ${blog.title}`,
            showCancelButton:true,
            confirmButtonText: "Si eliminar",
            cancelButtonText: "No",
        }).then((res)=>{
            if(res.isConfirmed){
                Swal.showLoading();
                //mutacion de la eliminacion
                deleteBlog(blog.id)
            }
        });
    }

//RENDER------------------------------------------------
  return (
    <tr>
        <td>{index+1}</td>
        <td>{blog.title}</td>
        <td>
            <img src={blog["image-url"]} alt={blog.title} className="admin-table-img" />
        </td>
        <td>
            {blog.content}
        </td>
        <td>
            <button type="button" className="btn btn-warning" onClick={handleEdit}>Editar</button>
            <button type="button" className="btn btn-danger ms-2" onClick={handleDelete}>Eliminar</button>
        </td>
    </tr>
  )
}
export default TableRow