<template>
    <v-layout class="rounded rounded-md">
        <v-app-bar :color="bg" style="color: #021345;" :elevation="2" title="Pick N' Pell">
            <template v-slot:append>
                <v-btn variant="plain" @click="this.$router.push('/analisidades')">
                    Anàlisi de dades
                </v-btn>
                <v-btn variant="plain" @click="cambio">
                    {{ nombre }}
                </v-btn>
            </template>
        </v-app-bar>

        <v-main class=" align-center justify-center background" style="min-height: 300px;">
            <v-container>
                <v-row>
                    <v-col cols="2"></v-col>
                    <v-col cols="8" class="d-flex align-center justify-center">
                        <h1 class=" titol">Productes</h1>
                    </v-col>
                    <v-col cols="2"></v-col>
                </v-row>
                <div style="display: none">
                    {{ this.recarregarEstat }}
                </div>
                <v-row>
                    <v-col cols="10"></v-col>
                    <v-col cols="10"><v-text-field v-model="Buscador" label="Producte a buscar"
                            @keyup.enter="BuscadorProductos()"></v-text-field></v-col>
                    <v-col cols="2">
                        <v-btn color="rgba(249, 208, 82, 1)" @click="abrirAgregar()">Afegir</v-btn>
                        <v-dialog v-model="dialog1" width="auto">
                            <v-card>
                                <v-container>
                                    <v-card-item>
                                        <v-img :src="productoNuevo.Imatge"></v-img>
                                        <v-container>
                                            <v-text-field v-model="productoNuevo.name" :rules="[Regla.required]"
                                                label="Nombre del producto" variante="outlined" required></v-text-field>
                                            <v-text-field v-model="productoNuevo.price" suffix="€" label="Precio"
                                                :rules="[Regla.required]" required></v-text-field>
                                            <v-textarea v-model="productoNuevo.description" :rules="[Regla.required]"
                                                label="Descripcion" auto-grow required></v-textarea>
                                            <v-text-field v-model="productoNuevo.Imatge" :rules="[Regla.required]"
                                                label="URL imagen" variante="outlined" required></v-text-field>
                                            <v-select v-model="productoNuevo.categoria" :items="items"
                                                :rules="[v => !!v || 'Item is required']" label="Categoria" required></v-select>
                                        </v-container>
                                    </v-card-item>
                                    <v-card-actions>
                                        <v-btn color="primary" @click="addProducto()">Acceptar</v-btn>
                                        <v-btn color="primary" @click="dialog1 = false">Cancelar</v-btn>
                                    </v-card-actions>
                                </v-container>
                            </v-card>
                        </v-dialog>
                    </v-col>
                </v-row>
                <!--Habilitados-->
                <v-container>
                    <v-row>
                        <v-col v-for="(variant, i) in productosH" :key="i" cols="3">
                            <v-card v-if="!variant.reveal && variant.Habilitado" class="mx-auto carta" max-width="344"
                                min-height="400">
                                <v-card-item>
                                    <v-img  class="imgCard" :src="variant.Imatge"></v-img>
                                    <v-card-title>{{ variant.NombreProducto }}</v-card-title>
                                    <v-card-subtitle>{{ variant.PrecioUnitario }}€</v-card-subtitle>
                                    <v-card-text>{{ variant.Descripcion }}</v-card-text>
                                </v-card-item>
                                <v-card-actions>
                                    <v-row>
                                        <v-col cols="4">
                                            <v-btn color="primary" @click="editar(variant)">Editar</v-btn>
                                        </v-col>
                                    </v-row>
                                    <v-btn color="primary" @click="Deshabilitar(variant.IDProducto)">Deshabilitar</v-btn>
                                </v-card-actions>
                            </v-card>
                            <!--Edicion Habilitados-->
                            <v-card v-else-if="variant.reveal && variant.Habilitado" class="mx-auto carta" max-width="344">
                                <v-container>
                                    <v-card-item>
                                        <v-img :src="productoNuevo.Imatge"></v-img>
                                        <v-container>
                                            <v-text-field v-model="productoNuevo.name" :rules="[Regla.required]"
                                                variant="outlined" required></v-text-field>
                                            <v-text-field v-model="productoNuevo.price" suffix="€" :rules="[Regla.required]"
                                                required></v-text-field>
                                            <v-textarea v-model="productoNuevo.description" :rules="[Regla.required]"
                                                auto-grow required></v-textarea>
                                            <v-text-field v-model="productoNuevo.Imatge" :rules="[Regla.required]"
                                                variant="outlined" required></v-text-field>
                                        </v-container>
                                    </v-card-item>
                                    <v-card-actions>
                                        <v-btn color="primary" @click="aceptar(variant); variant.reveal = false">Acceptar</v-btn>
                                        <v-btn color="primary" @click="variant.reveal = false">Cancelar</v-btn>
                                    </v-card-actions>
                                </v-container>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
                <v-divider :thickness="5" class="border-opacity-70"></v-divider>
                <v-responsive width="100%"></v-responsive>
                <!--Deshabilitados-->
                <v-container>
                    <v-row>
                        <v-col v-for="(variante, i) in productosDh" :key="i" cols="auto">
                            <v-card v-if="!variante.reveal && !variante.Habilitado" class="mx-auto" max-width="344"
                                min-height="400" color="rgb(255, 0, 0, 0.2)">
                                <v-card-item>
                                    <v-img :src="variante.Imatge" class="imgCard"></v-img>
                                    <v-card-title>{{ variante.NombreProducto }}</v-card-title>
                                    <v-card-subtitle>{{ variante.PrecioUnitario }}€</v-card-subtitle>
                                    <v-card-text>{{ variante.Descripcion }}</v-card-text>
                                </v-card-item>
                                <v-card-actions>
                                    <v-btn color="primary" @click="editar(variante)">Editar</v-btn>

                                    <v-btn color="primary" @click="Habilitar(variante.IDProducto)">Habilitar</v-btn>
                                    <v-btn color="primary" @click="dialog = true">Eliminar</v-btn>
                                    <v-dialog v-model="dialog" width="auto">
                                        <v-card>
                                            <v-card-title class="text-h5">
                                                Eliminar {{ variante.NombreProducto }} ?
                                            </v-card-title>
                                            <v-card-text>¿Estas segur que vols eliminar {{ variante.NombreProducto
                                            }}?</v-card-text>
                                            <v-card-actions>
                                                <v-btn color="primary" @click="eliminar(variante)">Acceptar</v-btn>
                                                <v-btn color="primary" @click="dialog = false">Cancelar</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-card-actions>
                            </v-card>

                            <!--edicion deshabilitados-->
                            <v-card v-else-if="variante.reveal && !variante.Habilitado" class="mx-auto" max-width="344">
                                <v-container>
                                    <v-card-item>
                                        <v-img :src="productoNuevo.Imatge"></v-img>
                                        <v-container>
                                            <v-text-field v-model="productoNuevo.name" :rules="[Regla.required]"
                                                variante="outlined" required></v-text-field>
                                            <v-text-field v-model="productoNuevo.price" suffix="€" :rules="[Regla.required]"
                                                required></v-text-field>
                                            <v-textarea v-model="productoNuevo.description" :rules="[Regla.required]"
                                                auto-grow required></v-textarea>
                                            <v-text-field v-model="productoNuevo.Imatge" :rules="[Regla.required]"
                                                variante="outlined" required></v-text-field>
                                        </v-container>
                                    </v-card-item>
                                    <v-card-actions>
                                        <v-btn color="primary" @click="aceptar(variante)">Acceptar</v-btn>
                                        <v-btn color="primary" @click="variante.reveal = false">Cancelar</v-btn>
                                    </v-card-actions>
                                </v-container>
                            </v-card></v-col>
                    </v-row>
                </v-container>
            </v-container>
        </v-main>
    </v-layout>
</template>
<style>
.titol {
  border: #021345 1px solid;
  color: #021345;
  background-color: rgba(249, 208, 82, 1);
  border-radius: 10px;
  padding: 2%;
  padding-left: 4%;
  padding-right: 4%;
}
.imgCard{
    max-width: 300px !important;
    max-height: 200px !important;
}
.carta{
    background-color: rgba(249, 208, 82, 1) !important;

}
.background {
  overflow-y: auto;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: url('../assets/fons.png') center center;
  background-size: 100%;
  background-color: #52b9d8;
  background-attachment: fixed;
}
</style>
<script>
import { getProductos, UpdateProductos, AddProductos, DeleteProducto, DescargarImagen } from '@/manager'
import { socket, state } from "@/socket";
export default {
    data: () => ({
        bg: "rgb( 252,175,1)",
        nombre: "Gestio Productes",
        link: "gestiocomandes",
        dialog: false,
        dialog1: false,
        Buscador: "",

        select: null,
        items: [
            'Hamburguesa',
            'Beguda',
            'Complement'
        ],
        productoNuevo: {
            id: "",
            name: "",
            price: "",
            description: "",
            Imatge: "",
            categoria: ""
        },
        productos1: [],
        productosH: [],
        productosDh: [],
        Regla: {
            required: value => !!value || 'Es requereix'
        }
    }),
    methods: {
        connectar() {
            socket.connect();
        },
        desconnectar() {
            socket.disconnect();
        },
        cambio() {
            this.nombre = this.nombre === 'Gestio Comandas' ? 'Gestio Productes' : 'Gestio Comandas'
            this.$router.push(this.link)
            this.link = this.link === 'gestiocomandes' ? 'gestioproductes' : 'gestiocomandes'
        },
        afegir() {
            this.dialog = this.dialog === false ? true : false
        },
        editar(producto) {
            this.productoNuevo.id = producto.IDProducto
            this.productoNuevo.name = producto.NombreProducto
            this.productoNuevo.price = producto.PrecioUnitario
            this.productoNuevo.description = producto.Descripcion
            this.productoNuevo.Imatge = producto.Imatge
            this.productoNuevo.categoria = producto.categoria
            producto.reveal = true
        },
        aceptar(variant) {
            var name = "producto" + this.productoNuevo.name
            let url1 = {
                nombre: name,
                url: this.productoNuevo.Imatge
            }
            DescargarImagen(url1)
            this.productoNuevo.Imatge = name
            socket.emit("ActuProducto", this.productoNuevo)
        },
        Deshabilitar(i) {
            socket.emit('Habilitada', i)
        },
        Habilitar(i) {
            socket.emit('Deshabilitada', i)
        },
        eliminar(variant) {
            let id = {
                "id": variant.IDProducto
            }
            socket.emit("EliminarProducto", id)
            this.dialog = false

        },
        addProducto() {
            var name = "producto" + this.productoNuevo.name
            let url1 = {
                nombre: name,
                url: this.productoNuevo.Imatge
            }
            DescargarImagen(url1)
            this.productoNuevo.Imatge = name
            socket.emit("NuevoProducto", this.productoNuevo)
            this.dialog1 = false
            this.productoNuevo.name = ""
            this.productoNuevo.price = ""
            this.productoNuevo.description = ""
            this.productoNuevo.Imatge = ""
            this.productoNuevo.categoria = ""
        },
        async recargar() {
            await getProductos().then((response) => {
                this.productos1 = response
                console.log("SI");
                this.productosH = this.productos1.filter(product => product.Habilitado == 1)
                this.productosDh = this.productos1.filter(product => product.Habilitado == 0)
            })
        },
        abrirAgregar() {
            this.productoNuevo.name = ""
            this.productoNuevo.price = ""
            this.productoNuevo.description = ""
            this.productoNuevo.Imatge = ""
            this.dialog1 = true
        }
    }, created() {
        this.recargar()

    },
    computed: {
        estat() {
            return state.connected
        },
        recarregarEstat() {
            if (state.recarregar) {
                this.recargar();
                socket.emit('recarregat');
                state.recarregar = false;
                console.log("OK")
            }
            return state.recarregar
        },
        BuscadorProductos() {
            if (this.Buscador == "") {
                this.productosH = this.productos1.filter(product => product.Habilitado == 1)
                this.productosDh = this.productos1.filter(product => product.Habilitado == 0)
            } else {
                this.productosH = this.productos1.filter(product => product.NombreProducto.toLowerCase().includes(this.Buscador.toLowerCase()))
                this.productosDh = this.productos1.filter(product => product.NombreProducto.toLowerCase().includes(this.Buscador.toLowerCase()))
            }
        }
    }
}
</script>