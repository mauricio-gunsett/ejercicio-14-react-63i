const TableRow = (props) => {
    const {blog,index} = props;

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
            <button type="button" className="btn btn-warning">Editar</button>
            <button type="button" className="btn btn-danger my-3">Eliminar</button>
        </td>
    </tr>
  )
}
export default TableRow