import { Link } from "react-router-dom";

const BlogItem = (props) => {
  const{blog} = props;
  return (
    <article className="col-12 col-md-6 col-lg-4 mb-2">
      <div className="card">
      <img src={blog['image-url']} className="card-img-top" alt={blog.title}/>
      <div className="card-body">
    <h5 className="card-title">{blog.title}</h5>
    <Link to={`/detail/${blog.id}`} className="btn btn-dark w-100">Ver blog </Link>
  </div>
      </div>
    </article>
  )
}
export default BlogItem