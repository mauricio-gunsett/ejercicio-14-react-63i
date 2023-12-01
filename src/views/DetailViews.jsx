import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getBlogsByIdFn } from "../api/blogs";

const DetailViews = () => {
  const { id } = useParams();

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blog-by-id"],
    queryFn:()=> getBlogsByIdFn(id),
  });

if(isLoading){
  return (
  <>
  <h1>Cargando...</h1>
  <hr />
  </>
  );
}

if(isError){
  return(
  <>
  <h1>Error</h1>
  <hr />
  <div className="alert alert-danger">Ocurrió un error cargando este blog</div>
  </>
  );
}
// caso blog encontrado
  if(blog){
  return <>
  <h1>{blog.title}</h1>
  <hr />
  <section>
    <img src={blog['image-url']} alt={blog.title} className="content-image" />
  <p className="mb-0">{blog.content}</p>
  </section>
  </>;
  }

  return <></>;
};
export default DetailViews;
