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
                                        <v-img :src="productoNuevo.imagen"></v-img>
                                        <v-container>
                                            <v-text-field v-model="productoNuevo.nombre" :rules="[Regla.required]"  label="Nombre del producto"
                                                variante="outlined" required></v-text-field>
                                            <v-text-field v-model="productoNuevo.precio_unitario" suffix="€" label="Precio"
                                                :rules="[Regla.required]" required></v-text-field>
                                            <v-textarea v-model="productoNuevo.descripcion" :rules="[Regla.required]" label="Descripcion"
                                                auto-grow required></v-textarea>
                                            <v-text-field v-model="productoNuevo.imagen" :rules="[Regla.required]" label="URL imagen"
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
                        <v-col v-for="(variant, i) in productos" :key="i" cols="3">
                            <v-card v-if="!variant.reveal & variant.habilitado" class="mx-auto" max-width="344"
                                min-height="400">
                                <v-card-item>
                                    <v-img :src="variant.imagen"></v-img>
                                    <v-card-title>{{ variant.nombre }}</v-card-title>
                                    <v-card-subtitle>{{ variant.precio_unitario }}€</v-card-subtitle>
                                    <v-card-text>{{ variant.descripcion }}</v-card-text>
                                </v-card-item>
                                <v-card-actions>
                                    <v-btn color="primary" @click="editar(variant)">Editar</v-btn>

                                    <v-btn color="primary" @click="Deshabilitar(i)">Deshabilitar</v-btn>
                                </v-card-actions>
                            </v-card>
                            <v-card v-else-if="variant.reveal & variant.habilitado" class="mx-auto" max-width="344">
                                <v-container>
                                    <v-card-item>
                                        <v-img :src="productoViejo.imagen"></v-img>
                                        <v-container>
                                            <v-text-field v-model="productoViejo.nombre" :rules="[Regla.required]"
                                                variant="outlined" required></v-text-field>
                                            <v-text-field v-model="productoViejo.precio_unitario" suffix="€"
                                                :rules="[Regla.required]" required></v-text-field>
                                            <v-textarea v-model="productoViejo.descripcion" :rules="[Regla.required]"
                                                auto-grow required></v-textarea>
                                            <v-text-field v-model="productoViejo.imagen" :rules="[Regla.required]"
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
                        <v-col v-for="(variante, i) in productos" :key="i" cols="auto">
                            <v-card v-if="!variante.reveal & !variante.habilitado" class="mx-auto" max-width="344"
                                min-height="400" color="rgb(255, 0, 0, 0.2)">
                                <v-card-item>
                                    <v-img :src="variante.imagen"></v-img>
                                    <v-card-title>{{ variante.nombre }}</v-card-title>
                                    <v-card-subtitle>{{ variante.precio_unitario }}€</v-card-subtitle>
                                    <v-card-text>{{ variante.descripcion }}</v-card-text>
                                </v-card-item>
                                <v-card-actions>
                                    <v-btn color="primary" @click="editar(variante)">Editar</v-btn>

                                    <v-btn color="primary" @click="Deshabilitar(i)">Habilitar</v-btn>
                                    <v-btn color="primary" @click="dialog = true">Eliminar</v-btn>
                                    <v-dialog v-model="dialog" width="auto">
                                        <v-card>
                                            <v-card-title class="text-h5">
                                               Eliminar {{ variante.nombre }} ?
                                            </v-card-title>
                                            <v-card-text>¿Estas seguro que quieres eliminar {{ variante.nombre }}?</v-card-text>
                                            <v-card-actions>
                                                <v-btn color="primary" @click="dialog = false">Aceptar</v-btn>
                                                <v-btn color="primary" @click="dialog = false">Cancelar</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-card-actions>
                            </v-card>
                            <v-card v-else-if="variante.reveal & !variante.habilitado" class="mx-auto" max-width="344">
                                <v-container>
                                    <v-card-item>
                                        <v-img :src="productoViejo.imagen"></v-img>
                                        <v-container>
                                            <v-text-field v-model="productoViejo.nombre" :rules="[Regla.required]"
                                                variante="outlined" required></v-text-field>
                                            <v-text-field v-model="productoViejo.precio_unitario" suffix="€"
                                                :rules="[Regla.required]" required></v-text-field>
                                            <v-textarea v-model="productoViejo.descripcion" :rules="[Regla.required]"
                                                auto-grow required></v-textarea>
                                            <v-text-field v-model="productoViejo.imagen" :rules="[Regla.required]"
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
export default {
    data: () => ({
        nombre: "Gestio Productes",
        link: "gestiocomandes",
        dialog: false,
        dialog1: false,
        productoViejo: {
            nombre: "",
            precio_unitario: "",
            descripcion: "",
            imagen: ""
        },productoNuevo: {
            id:"",
            nombre: "",
            precio_unitario: "",
            descripcion: "",
            imagen: ""
        },
        productos: [
            {
                "id": 1,
                "nombre": "Hamburguesa Clásica",
                "descripcion": "Una deliciosa hamburguesa clásica con carne, lechuga, tomate y mayonesa.",
                "precio_unitario": 5.99,
                "imagen": "https://s1.abcstatics.com/media/gurme/2023/08/31/s/smash-burger.jpg-kbOC--420x236@abc.jpg",
                "habilitado": true
            },
            {
                "id": 2,
                "nombre": "Hamburguesa de Pollo",
                "descripcion": "Una jugosa hamburguesa de pollo con lechuga, tomate y salsa especial.",
                "precio_unitario": 6.49,
                "imagen": "https://s1.abcstatics.com/media/gurme/2023/08/31/s/smash-burger.jpg-kbOC--420x236@abc.jpg",
                "habilitado": true
            },
            {
                "id": 3,
                "nombre": "Hamburguesa Doble Queso",
                "descripcion": "Una hamburguesa doble con queso cheddar derretido, cebolla y salsa de mostaza.",
                "precio_unitario": 7.99,
                "imagen": "https://s1.abcstatics.com/media/gurme/2023/08/31/s/smash-burger.jpg-kbOC--420x236@abc.jpg",
                "habilitado": true
            },
            {
                "id": 4,
                "nombre": "Hamburguesa Vegetariana",
                "descripcion": "Una hamburguesa vegetariana con patty de garbanzos, lechuga, tomate y mayonesa vegana.",
                "precio_unitario": 6.99,
                "imagen": "https://s1.abcstatics.com/media/gurme/2023/08/31/s/smash-burger.jpg-kbOC--420x236@abc.jpg",
                "habilitado": true
            },
            {
                "id": 5,
                "nombre": "Hamburguesa con Bacon",
                "descripcion": "Una hamburguesa con crujiente bacon, queso suizo, lechuga y salsa barbacoa.",
                "precio_unitario": 8.49,
                "imagen": "https://s1.abcstatics.com/media/gurme/2023/08/31/s/smash-burger.jpg-kbOC--420x236@abc.jpg",
                "habilitado": true
            }
        ],
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
            this.productoViejo.nombre = producto.nombre
            this.productoViejo.precio_unitario = producto.precio_unitario
            this.productoViejo.descripcion = producto.descripcion
            this.productoViejo.imagen = producto.imagen
            producto.reveal = true
        },
        aceptar(variant) {
            variant.nombre = this.productoViejo.nombre
            variant.precio_unitario = this.productoViejo.precio_unitario
            variant.descripcion = this.productoViejo.descripcion
            variant.imagen = this.productoViejo.imagen
            variant.reveal = false
        },
        Deshabilitar(i) {
            this.productos[i].habilitado = this.productos[i].habilitado === false ? true : false
        },
        eliminar() {
            dialog = true
        },
        addProducto(){
            this.productoNuevo.id = this.productos.length+1
            this.productos.push(this.productoNuevo)
            this.dialog1=false
        }
    }
}
</script>