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
                        <v-btn @click="dialog = true">Afegir</v-btn>
                        <v-dialog v-model="dialog" width="auto">
                            <v-card>

                                <v-card-actions>
                                    <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-col>
                </v-row>
                <v-row>
                    <v-container>

                    </v-container>
                </v-row>
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
        productos: []
    }),
    methods: {
        cambio() {
            this.nombre = this.nombre === 'Gestio Productes' ? 'Gestio Comandas' : 'Gestio Productes'
            this.$router.push(this.link)
            this.link = this.link === 'gestiocomandes' ? 'gestioproductes' : 'gestiocomandes'
        },
        afegir(){
            this.dialog = this.dialog === false ? true : false
        }
    }
}
</script>