<template fill-height >
    <v-layout class="rounded rounded-md">
        <v-app-bar style="background:#4DB5D8; color: white;" :elevation="2" title="Pick N' Pell">
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
        <v-navigation-drawer>
            <v-list>
                <v-list-item class="listItem" id="botoEstats" @click="this.mostrarDivsCanvi(1)" title="Gràfic Estats">
                </v-list-item>
                <v-list-item class="listItem" @click="this.mostrarDivsCanvi(2)" title="Gràfic Comandes/Hora"></v-list-item>
                <v-list-item class="listItem" @click="this.mostrarDivsCanvi(3)" title="Dades 3"></v-list-item>
        </v-list>
        </v-navigation-drawer>

        <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
            <div id="divEstats" v-if="mostrarDivs[0]">Selecciona unes dades per visualitzar</div>
            <div v-if="mostrarDivs[1]"><img src="http://dam.inspedralbes.cat:3333/mostrarGraficoEstados"
                    alt="Gràfic Estats"></div>
            <div v-if="mostrarDivs[2]"> <img src="http://dam.inspedralbes.cat:3333/mostrarGraficoHoras"
                    alt="Gràfif Comanda/Hores"></div>

        </v-main>
    </v-layout>
</template>
<style>
.listItem {
    padding: 5%;
}

.listItem:hover {
    transition: 0.5s;
    color: white;
    background-color: #4DB5D8;
}

.prova {
    color: white;
    background-color: #4DB5D8;
}

</style>
<script>

export default {
    data: () => ({
        model: 1,
        nombre: "Gestio Comandas",
        mostrarDivs: [true, false, false, false],
        link: 'gestiocomandes'

    }),
    created() {
    },

    methods: {
        cambio() {
            this.nombre = this.nombre === 'Gestio Comandas' ? 'Gestio Productes' : 'Gestio Comandas'
            this.$router.push(this.link)
            this.link = this.link === 'gestiocomandes' ? 'gestioproductes' : 'gestiocomandes'
        },
        mostrarDivsCanvi(num) {
            for (let i = 0; i < this.mostrarDivs.length; i++) {
                console.log("A")
                this.mostrarDivs[i] = false;
            }
            this.mostrarDivs[num] = true
            document.getElementById("botoEstats").set
        }
    }
}
</script>