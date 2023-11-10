<template fill-height >
    <v-layout class="rounded rounded-md">
        <v-app-bar :color="bg" style="color: #021345;" :elevation="2" title="Pick N' Pell">
            <template v-slot:append>
                <v-btn variant="plain" @click="this.$router.push('/gestioproductes')">
                    Gestio Productes
                </v-btn>
                <v-btn variant="plain" @click="cambio">
                    {{ nombre }}
                </v-btn>
            </template>
        </v-app-bar>
        <v-navigation-drawer class="navbar">
            <v-list>
                <v-list-item class="listItem" id="botoEstats" @click="this.mostrarDivsCanvi(1)" title="Gràfic Estats">
                </v-list-item>
                <v-list-item class="listItem" @click="this.mostrarDivsCanvi(2)" title="Gràfic Comandes/Hora"></v-list-item>
                <v-list-item class="listItem" @click="this.mostrarDivsCanvi(4)" title="Ventes de producte"></v-list-item>
                <v-list-item class="listItem" @click="this.mostrarDivsCanvi(3)" title="Gràfic Ingressos/Hora"></v-list-item>
                <v-list-item class="listItem" @click="this.mostrarDivsCanvi(5)" title="Ingressos Mensuals"></v-list-item>
                <v-list-item class="listItem" @click="this.mostrarDivsCanvi(6); diners()" title="Caixa Diaria"></v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main class="d-flex align-center justify-center background" style="min-height: 300px;">
            <div id="divEstats" class="elevation-24 hithere" v-if="mostrarDivs[0]">
                <h2>Selecciona unes dades per visualitzar</h2>
            </div>
            <div style="display: none">
                {{ this.recarregarEstat }}
            </div>
            <template v-if="mostrarDivs[1]">
                <v-img class="elevation-24 imatge" alt="Gràfic Estats" lazy-src="../assets/imatgeCarregant.jpg"
                    max-width="900" src="http://dam.inspedralbes.cat:3333/mostrarGraficoEstados">
                    <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                            <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                        </div>
                    </template>
                </v-img>
            </template>
            <template v-if="mostrarDivs[2]">
                <v-img class="elevation-24" alt="Gràfic Horas" lazy-src="../assets/imatgeCarregant.jpg" max-width="900"
                    src="http://dam.inspedralbes.cat:3333/mostrarGraficoHoras">
                    <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                            <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                        </div>
                    </template>
                </v-img>
            </template>
            <template v-if="mostrarDivs[3]">
                <v-img class="elevation-24" alt="Gràfic Ingresos" lazy-src="../assets/imatgeCarregant.jpg" max-width="900"
                    src="http://dam.inspedralbes.cat:3333/mostrarGraficoIngresos">
                    <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                            <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                        </div>
                    </template>
                </v-img>
            </template>
            <template v-if="mostrarDivs[4]">
                <v-img class="elevation-24" alt="Dades Productes" lazy-src="../assets/imatgeCarregant.jpg" max-width="900"
                    src="http://dam.inspedralbes.cat:3333/mostrarDatosProductos">
                    <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                            <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                        </div>
                    </template>
                </v-img>
            </template>
            <template v-if="mostrarDivs[5]">
                <v-img class="elevation-24" alt="Dades Productes" lazy-src="../assets/imatgeCarregant.jpg" max-width="900"
                    src="http://dam.inspedralbes.cat:3333/mostrarGraficoIngresosMensuales">
                    <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                            <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                        </div>
                    </template>
                </v-img>
            </template>
            <template v-if="mostrarDivs[6]">
                <div class="diners">
                    <h1>Diners Pendents: {{ this.dinersOberts }}€</h1>
                    <br>
                    <h1> Diners Cobrats: {{ this.dinersTancats }}€</h1>
                </div>

            </template>
        </v-main>
    </v-layout>
</template>
<style>
/* .imatge{
    height: 50%;
    width: 50%;
} */


.hithere {
    animation: hithere 3s ease infinite;
}

@keyframes hithere {
    30% {
        transform: scale(1.2);
    }

    40%,
    60% {
        transform: rotate(-10deg) scale(1.2);
    }

    50% {
        transform: rotate(10deg) scale(1.2);
    }

    70% {
        transform: rotate(0deg) scale(1.2);
    }

    100% {
        transform: scale(1);
    }
}


#divEstats {
    background-color: #ffffff;
    color: 021345;
    padding: 5px;
    border: #021345 1px solid;
    border-radius: 20px;

}

.diners {
    background-color: #ffffff;
    color: 021345;
    padding: 15px;
    border: #021345 1px solid;
    border-radius: 20px;
}

.navbar {
    background-color: #52b9d8 !important;

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

.listItem {
    padding: 5%;
}

.listItem:hover {
    transition: 0.5s;
    color: white;
    background-color: rgb(252, 175, 1);
}

.listItem:focus {
    color: white;
    background-color: rgb(252, 175, 1);
}

.prova {
    color: white;
    background-color: #4DB5D8;
}
</style>
<script>
import { getCaixa } from '@/manager'
import { socket, state } from "@/socket";

export default {
    data: () => ({
        bg: "rgb( 252,175,1)",
        model: 1,
        nombre: "Gestio Comandas",
        mostrarDivs: [true, false, false, false, false, false, false],
        link: 'gestiocomandes',
        carregant: false,
        dinersOberts: 0,
        dinersTancats: 0

    }),
    created() {
    },

    methods: {
        diners() {
            getCaixa().then((response) => {
                this.dinersOberts = response["obertes"]
                this.dinersTancats = response["tancades"]
            })
        },
        cambio() {
            this.nombre = this.nombre === 'Gestio Comandas' ? 'Gestio Productes' : 'Gestio Comandas'
            this.$router.push(this.link)
            this.link = this.link === 'gestiocomandes' ? 'gestioproductes' : 'gestiocomandes'
        },
        mostrarDivsCanvi(num) {
            this.carregant = true;
            for (let i = 0; i < this.mostrarDivs.length; i++) {
                //console.log("A")
                this.mostrarDivs[i] = false;
            }
            this.mostrarDivs[num] = true
            this.carregant = false;
        },
    },
    computed: {
        recarregarEstat() {
            if (state.recarregar) {
                this.diners();
                socket.emit('recarregat');
                state.recarregar = false;
                //console.log("OK")
            }
            return state.recarregar
        }
    }
}
</script>