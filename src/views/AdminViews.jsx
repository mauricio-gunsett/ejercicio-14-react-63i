import { useQuery } from "@tanstack/react-query";
import AdminForm from "../components/Admin/AdminForm/AdminForm";
import AdminTable from "../components/Admin/AdminTable/AdminTable";
import { getBlogsFn } from "../api/blogs";

const AdminViews = () => {
  const {
    data: blogs,
    isError,
    isLoading,
  } = useQuery({ queryKey: ["blogs"], queryFn: getBlogsFn });

  // caso de error
  if (isError) {
    return (
      <>
        <h1>Panel de administracion</h1>
        <AdminForm />
        <div className="alert alert-danger mt-3">
          Ocurrio un error cargando los blogs
        </div>
      </>
    );
  }

  // return optimista
  return (
    <>
      <h1>Panel de administracion</h1>
      <hr />
      <AdminForm />
      {isLoading ? (
        <h3 className="mt-3 text-center">Cargando... </h3>
      ) : (<AdminTable blogs={blogs} />
      )}
    </>
  );
};
export default AdminViews;
