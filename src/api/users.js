const API_URL = import.meta.env.VITE_API_URL

export const postUserFn = async (data)=>{
    const response = await fetch(`${API_URL}/users`,{
        method:'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if(!response.ok){
        throw new Error("Ocurrio un error al resgistrar el usuario")
    }
    return data;
}
