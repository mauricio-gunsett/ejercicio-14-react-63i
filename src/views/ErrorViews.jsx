import { Link } from "react-router-dom"

const ErrorViews = () => {
  return (
    <> 
    <h3 className="text-center mt-5">ho ho. no encontramos este recurso</h3>
    <p className="text-center"> por favor revisa la url o intenta nuevamente</p>
    <div className="text-center">
    <Link to={-1} className="btn btn-dark mt-3">Volver</Link>
    </div>
    </>
  )
}
export default ErrorViews