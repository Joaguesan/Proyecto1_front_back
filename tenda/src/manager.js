export async function getComandes() {
    const response = await fetch(`http://localhost:3000/getorders`,
        {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
    const comandes = await response.json();
    return comandes;
}
export async function getProductesComanda(idComanda) {
    var url = "http://localhost:3000/detailOrder/" + idComanda;
    const response = await fetch(url,
        {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
    const productes = await response.json();
    return productes;
}

export async function getProductos() {
    const response = await fetch(`http://localhost:3000/getProducts`,
        {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
    const productos = await response.json();
    return productos;
}
export async function getUnProducto(id) {
    const response = await fetch(`http://localhost:3000/getOneProduct/${id}`,
        {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
    const producto = await response.json();
    console.log(producto);
    return producto;
}
export async function UpdateProductos(dadesProducte,id) {
    console.log(dadesProducte);
    const response = await fetch(`http://localhost:3000/updateProduct/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadesProducte),
            mode: "cors"
        },);
}
export async function CambiarEstado(dadesProducte,id) {
    console.log(dadesProducte);
    const response = await fetch(`http://localhost:3000/productStatus/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadesProducte),
            mode: "cors"
        },);
}
export async function AddProductos(dadesProducte) {
    const response = await fetch(`http://localhost:3000/addProduct`,
        {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadesProducte),
            mode: "cors"
        },);
}
export async function DescargarImagen(url) {
    const response = await fetch(`http://localhost:3000/imagen`,
        {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(url),
            mode: "cors"
        },);
}

export async function DeleteProducto(dadesProducte){
    console.log(dadesProducte);
    const response= await fetch(`http://localhost:3000/deleteProduct/${dadesProducte.id}`, 
    {method: 'DELETE'});
 
   console.log("quieres borrar la pregunta con id: "+JSON.stringify(dadesProducte))
 }
 
