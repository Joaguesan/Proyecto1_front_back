<template fill-height >
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
        <v-navigation-drawer>
            <v-list>
                <v-list-item class="listItem" id="botoEstats" @click="this.mostrarDivsCanvi(1)" title="Gràfic Estats">
                </v-list-item>
                <v-list-item class="listItem" @click="this.mostrarDivsCanvi(2)" title="Gràfic Comandes/Hora"></v-list-item>
                <v-list-item class="listItem" @click="this.mostrarDivsCanvi(3)" title="Gràfic Ingresos"></v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
            <div id="divEstats" v-if="mostrarDivs[0]">Selecciona unes dades per visualitzar</div>
            <div v-if="carregant"><img src="../assets/carregant.gif" alt="carregant..."></div>
            <div v-else>
                <img v-if="mostrarDivs[1]" transition="fade-transition"
                    src="http://dam.inspedralbes.cat:3333/mostrarGraficoEstados" alt="Gràfic Estats">
                <img v-if="mostrarDivs[2]" transition="fade-transition"
                    src="http://dam.inspedralbes.cat:3333/mostrarGraficoHoras" alt="Gràfic Comanda/Hores">
                <img v-if="mostrarDivs[3]" transition="fade-transition"
                    src="http://damtr1g3.dam.inspedralbes.cat:3333/mostrarGraficoIngresos"
                    alt="Gràfic Ingresos Comanda/Hores">
            </div>
        </v-main>
    </v-layout>
</template>
<style>
.fade-leave-active {
    transition: all 0.5s ease;
}

.fade-enter-active {
    transition: all 5s ease;

}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
    {
    opacity: 0;
}


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
        bg: "rgb( 252,175,1)",
        model: 1,
        nombre: "Gestio Comandas",
        mostrarDivs: [true, false, false, false],
        link: 'gestiocomandes',
        carregant: false

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
            this.carregant = true;
            for (let i = 0; i < this.mostrarDivs.length; i++) {
                console.log("A")
                this.mostrarDivs[i] = false;
            }
            this.mostrarDivs[num] = true
            this.carregant = false;
        },
    }
}
</script>