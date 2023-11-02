<template fill-height >
    <v-layout class="rounded rounded-md">
        <v-app-bar :elevation="2" title="Nombre tienda">
            <template v-slot:append>
                <v-btn variant="plain" @click="this.$router.push('/analisidades')">
                    Anàlisi de dades
                </v-btn>
                <v-btn variant="plain" @click="cambio">
                    {{ nombre }}
                </v-btn>
                <v-btn icon="	mdi-chevron-down"></v-btn>
            </template>
        </v-app-bar>
       

        <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
            Les dades s'aNALITZEN AQUI
        </v-main>
    </v-layout>
</template>
<script>
export default {
    data: () => ({
        nombre: "Gestio Comandas",
        link: "gestioproductes",
    }),
    created() {

    },

    methods: {
        cambio() {
            this.nombre = this.nombre === 'Gestio Comandas' ? 'Gestio Productes' : 'Gestio Comandas'
            this.$router.push(this.link)
            this.link = this.link === 'gestiocomandes' ? 'gestioproductes' : 'gestiocomandes'
        }
    }
}
</script>