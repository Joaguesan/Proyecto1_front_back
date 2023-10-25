<template>
    <v-layout class="rounded rounded-md">
        <v-app-bar :elevation="2" title="Nombre tienda">
            <template v-slot:append>
                <v-btn variant="plain" @click="cambio">
                    {{ nombre }}
                </v-btn>
                <v-btn icon="	mdi-chevron-down"></v-btn>
            </template>
        </v-app-bar>

        <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
            <v-container>
                <v-row>
                    <v-col cols="2"></v-col>
                    <v-col cols="8" class="d-flex align-center justify-center">
                        <h1>Productes</h1>
                    </v-col>
                    <v-col cols="2"></v-col>
                </v-row>
                <v-row>
                    <v-col cols="10"></v-col>
                    <v-col cols="2">
                        <v-btn @click="dialog1 = true">Afegir</v-btn>
                        <v-dialog v-model="dialog1" width="auto">
                            <v-card>
                                <v-container>
                                    <v-card-item>
                                        <v-img :src="productoNuevo.Imatge"></v-img>
                                        <v-container>
                                            <v-text-field v-model="productoNuevo.NombreProducto" :rules="[Regla.required]"  label="Nombre del producto"
                                                variante="outlined" required></v-text-field>
                                            <v-text-field v-model="productoNuevo.PrecioUnitario" suffix="€" label="Precio"
                                                :rules="[Regla.required]" required></v-text-field>
                                            <v-textarea v-model="productoNuevo.Descripcion" :rules="[Regla.required]" label="Descripcion"
                                                auto-grow required></v-textarea>
                                            <v-text-field v-model="productoNuevo.Imatge" :rules="[Regla.required]" label="URL imagen"
                                                variante="outlined" required></v-text-field>
                                        </v-container>
                                    </v-card-item>
                                    <v-card-actions>
                                        <v-btn color="primary" @click="addProducto()">Aceptar</v-btn>
                                        <v-btn color="primary" @click="dialog1 = false">Cancelar</v-btn>
                                    </v-card-actions>
                                </v-container>
                            </v-card>
                        </v-dialog>
                    </v-col>
                </v-row>
                <v-container>
                    <v-row>
                        <v-col v-for="(variant, i) in productos1" :key="i" cols="3">
                            <v-card v-if="!variant.reveal & variant.Habilitado" class="mx-auto" max-width="344"
                                min-height="400">
                                <v-card-item>
                                    <v-img :src="variant.Imatge"></v-img>
                                    <v-card-title>{{ variant.NombreProducto }}</v-card-title>
                                    <v-card-subtitle>{{ variant.PrecioUnitario }}€</v-card-subtitle>
                                    <v-card-text>{{ variant.Descripcion }}</v-card-text>
                                </v-card-item>
                                <v-card-actions>
                                    <v-btn color="primary" @click="editar(variant)">Editar</v-btn>

                                    <v-btn color="primary" @click="Deshabilitar(i)">Deshabilitar</v-btn>
                                </v-card-actions>
                            </v-card>
                            <v-card v-else-if="variant.reveal & variant.Habilitado" class="mx-auto" max-width="344">
                                <v-container>
                                    <v-card-item>
                                        <v-img :src="productoViejo.Imatge"></v-img>
                                        <v-container>
                                            <v-text-field v-model="productoViejo.NombreProducto" :rules="[Regla.required]"
                                                variant="outlined" required></v-text-field>
                                            <v-text-field v-model="productoViejo.PrecioUnitario" suffix="€"
                                                :rules="[Regla.required]" required></v-text-field>
                                            <v-textarea v-model="productoViejo.Descripcion" :rules="[Regla.required]"
                                                auto-grow required></v-textarea>
                                            <v-text-field v-model="productoViejo.Imatge" :rules="[Regla.required]"
                                                variant="outlined" required></v-text-field>
                                        </v-container>
                                    </v-card-item>
                                    <v-card-actions>
                                        <v-btn color="primary" @click="aceptar(variant)">Aceptar</v-btn>
                                        <v-btn color="primary" @click="variant.reveal = false">Cancelar</v-btn>
                                    </v-card-actions>
                                </v-container>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
                <v-divider :thickness="5" class="border-opacity-70"></v-divider>
                <v-container>
                    <v-row justify="left">
                        <v-col v-for="(variante, i) in productos1" :key="i" cols="auto">
                            <v-card v-if="!variante.reveal & !variante.Habilitado" class="mx-auto" max-width="344"
                                min-height="400" color="rgb(255, 0, 0, 0.2)">
                                <v-card-item>
                                    <v-img :src="variante.Imatge"></v-img>
                                    <v-card-title>{{ variante.NombreProducto }}</v-card-title>
                                    <v-card-subtitle>{{ variante.PrecioUnitario }}€</v-card-subtitle>
                                    <v-card-text>{{ variante.Descripcion }}</v-card-text>
                                </v-card-item>
                                <v-card-actions>
                                    <v-btn color="primary" @click="editar(variante)">Editar</v-btn>

                                    <v-btn color="primary" @click="Deshabilitar(i)">Habilitar</v-btn>
                                    <v-btn color="primary" @click="dialog = true">Eliminar</v-btn>
                                    <v-dialog v-model="dialog" width="auto">
                                        <v-card>
                                            <v-card-title class="text-h5">
                                               Eliminar {{ variante.NombreProducto }} ?
                                            </v-card-title>
                                            <v-card-text>¿Estas seguro que quieres eliminar {{ variante.NombreProducto }}?</v-card-text>
                                            <v-card-actions>
                                                <v-btn color="primary" @click="dialog = false">Aceptar</v-btn>
                                                <v-btn color="primary" @click="dialog = false">Cancelar</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-card-actions>
                            </v-card>
                            <v-card v-else-if="variante.reveal & !variante.Habilitado" class="mx-auto" max-width="344">
                                <v-container>
                                    <v-card-item>
                                        <v-img :src="productoViejo.Imatge"></v-img>
                                        <v-container>
                                            <v-text-field v-model="productoViejo.NombreProducto" :rules="[Regla.required]"
                                                variante="outlined" required></v-text-field>
                                            <v-text-field v-model="productoViejo.PrecioUnitario" suffix="€"
                                                :rules="[Regla.required]" required></v-text-field>
                                            <v-textarea v-model="productoViejo.Descripcion" :rules="[Regla.required]"
                                                auto-grow required></v-textarea>
                                            <v-text-field v-model="productoViejo.Imatge" :rules="[Regla.required]"
                                                variante="outlined" required></v-text-field>
                                        </v-container>
                                    </v-card-item>
                                    <v-card-actions>
                                        <v-btn color="primary" @click="aceptar(variante)">Aceptar</v-btn>
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
<script>
import { getProductos } from '@/manager'
export default {
    data: () => ({
        nombre: "Gestio Productes",
        link: "gestiocomandes",
        dialog: false,
        dialog1: false,
        productoViejo: {
            NombreProducto: "",
            PrecioUnitario: "",
            Descripcion: "",
            Imatge: ""
        },productoNuevo: {
            id:"",
            NombreProducto: "",
            PrecioUnitario: "",
            Descripcion: "",
            Imatge: ""
        },
        productos1:[],
        Regla: {
            required: value => !!value || 'Es requereix'
        }
    }),
    methods: {
        cambio() {
            this.nombre = this.nombre === 'Gestio Comandas' ? 'Gestio Productes' : 'Gestio Comandas'
            this.$router.push(this.link)
            this.link = this.link === 'gestiocomandes' ? 'gestioproductes' : 'gestiocomandes'
        },
        afegir() {
            this.dialog = this.dialog === false ? true : false
        },
        editar(producto) {
            this.productoViejo.NombreProducto = producto.NombreProducto
            this.productoViejo.PrecioUnitario = producto.PrecioUnitario
            this.productoViejo.Descripcion = producto.Descripcion
            this.productoViejo.Imatge = producto.Imatge
            producto.reveal = true
        },
        aceptar(variant) {
            variant.NombreProducto = this.productoViejo.NombreProducto
            variant.PrecioUnitario = this.productoViejo.PrecioUnitario
            variant.Descripcion = this.productoViejo.Descripcion
            variant.Imatge = this.productoViejo.Imatge
            variant.reveal = false
        },
        Deshabilitar(i) {
            this.productos1[i].Habilitado = this.productos1[i].Habilitado === false ? true : false
        },
        eliminar() {
            dialog = true
        },
        addProducto(){
            this.productoNuevo.id = this.productos1.length+1
            this.productos1.push(this.productoNuevo)
            this.dialog1=false
        }
    },created() {
        getProductos().then(response => this.productos1=response)
  }
}
</script>