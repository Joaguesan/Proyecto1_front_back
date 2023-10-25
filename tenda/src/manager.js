export async function getProductos() {
    const response = await fetch(`http://localhost:3000/getProducts`,
        {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
    const productos = await response.json();
    return productos;
}
export async function UpdateProductos(dadesProducte,id) {
    const response = await fetch(`http://localhost:3000//updateProduct/${id}`,
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
