export async function getComandes() {
    const response = await fetch(`http://damtr1g3.dam.inspedralbes.cat:3333/getorders`,
        {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
    const comandes = await response.json();
    return comandes;
}
export async function getProductesComanda(idComanda) {
    var url = "http://damtr1g3.dam.inspedralbes.cat:3333/detailOrder/" + idComanda;
    const response = await fetch(url,
        {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
    const productes = await response.json();
    return productes;
}
export async function getClient() {
    var url = "http://damtr1g3.dam.inspedralbes.cat:3333/getClients/";
    const response = await fetch(url,
        {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
    const dades = await response.json();
    return dades;
}
export async function getProductos() {
    const response = await fetch(`http://damtr1g3.dam.inspedralbes.cat:3333/getProducts`,
        {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
    const productos = await response.json();
    return productos;
}
export async function getUnProducto(id) {
    const response = await fetch(`http://damtr1g3.dam.inspedralbes.cat:3333/getOneProduct/${id}`,
        {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
    const producto = await response.json();
    console.log(producto);
    return producto;
}
export async function UpdateProductos(dadesProducte, id) {
    console.log(dadesProducte);
    const response = await fetch(`http://damtr1g3.dam.inspedralbes.cat:3333/updateProduct/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadesProducte),
            mode: "cors"
        },);
}
export async function CambiarEstado(dadesProducte, id) {
    console.log(dadesProducte);
    const response = await fetch(`http://damtr1g3.dam.inspedralbes.cat:3333/productStatus/${id}`,
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
    const response = await fetch(`http://damtr1g3.dam.inspedralbes.cat:3333/addProduct`,
        {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadesProducte),
            mode: "cors"
        },);
}
export async function DescargarImagen(url) {
    const response = await fetch(`http://damtr1g3.dam.inspedralbes.cat:3333/imagen`,
        {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(url),
            mode: "cors"
        },);
}

export async function DeleteProducto(dadesProducte) {
    console.log(dadesProducte);
    const response = await fetch(`http://damtr1g3.dam.inspedralbes.cat:3333/deleteProduct/${dadesProducte.id}`,
        { method: 'DELETE' });

    console.log("quieres borrar la pregunta con id: " + JSON.stringify(dadesProducte))
}

export async function getTempsComanda() {
    var url = "http://damtr1g3.dam.inspedralbes.cat:3333/getTemps";
    const response = await fetch(url,
        {
            method: 'GET', headers: {
                'Content-Type': 'application/json',
            },
        },);
    const temps = await response.json();
    return temps;

}
