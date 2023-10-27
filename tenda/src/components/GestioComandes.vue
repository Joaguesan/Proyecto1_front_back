<template fill-height >
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
      <v-container class="">
        <v-row>
          <v-col cols="2"></v-col>
          <v-col class="d-flex justify-center align-center">
            <h1>Gestió Comandes</h1>
          </v-col>
          <v-col cols="2"></v-col>
        </v-row>

        <v-row>
          <v-col cols="3"><v-select v-model="seleccio" density="compact" :items="['Pendents', 'Acceptades', 'Tancades']"
              @update:menu=buscarComandes(seleccio)></v-select></v-col>
          <v-col cols="6"></v-col>
          <v-col cols="3"><v-btn @click="dialog = true;" class="">Cercar Comandes</v-btn>
            <v-dialog v-model="dialog" width="auto">
              <v-card>
                <v-card-text>ID a buscar: </v-card-text>
                <v-text-field v-model="IDPedido" :counter="10" label="ID comanda" required hide-details
                  @key.up.enter=""></v-text-field>
                <v-card-actions>
                  <v-btn color="primary" class="w-50" variant="text" block
                    @click="buscarComanda(IDPedido); dialog = false">Buscar</v-btn>
                  <v-btn color="primary" class="w-50" variant="text" block @click="dialog = false">Tancar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
        <v-row>
          <v-container>
            <v-row v-if="this.comandesTancades">
              <v-col cols="2">Id Comanda</v-col>
              <v-col cols="2">Id Client</v-col>
              <v-col cols="2">Data Creació</v-col>
              <v-col cols="2">Import total</v-col>
              <v-col cols="2">Estat</v-col>
              <v-col cols="2">Temps total</v-col>

            </v-row>


            <v-row v-if="this.comandesTancades" :class="[
              index % 2 === 0 ? 'bg-grey-lighten-2' : 'bg-white'
            ]" v-for="(comanda, index) in comandes" :key=index>
              <v-col cols="2">{{ comanda.IDPedido }}</v-col>
              <v-col cols="2">{{ comanda.IDCliente }}</v-col>
              <v-col cols="2">{{ comanda.FechaPedido }}</v-col>
              <v-col cols="2">{{ comanda.Total }}</v-col>
              <v-col cols="2">{{ comanda.Estado }}</v-col>
              <v-col cols="2">temps</v-col>
            </v-row>
            <v-row v-if="this.comandesPendents">
              <v-expansion-panels>
                <v-expansion-panel v-for="(comanda, i) in this.comandes" :key="i">
                  <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
                    Comanda {{ comanda.IDPedido }}
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-row>
                      <v-col cols="2">Client: {{ comanda.IDCliente }} </v-col>
                      <v-col cols="2">FechaPedido: {{ comanda.FechaPedido }}</v-col>
                      <v-col cols="2">
                        <p class="nose">
                          Descripció:
                          {{ comanda.Comentario }}
                        </p>
                      </v-col>
                      <v-col cols="2">
                        <p class="nose">
                          Productes:
                          febbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
                        </p>
                      </v-col>
                      <v-col cols="2"><v-btn @click="productosComanda(comanda.IDPedido)/*comandaAcceptada(comanda.IDPedido)*/">Acceptar</v-btn></v-col>
                      <v-col cols="2"><v-btn @click="comandaRebutjada(comanda.IDPedido)">Rebutjar</v-btn></v-col>
                    </v-row>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
          </v-container>
        </v-row>
        <v-row v-if="comandesAcceptades">
          <v-col cols="4" v-for="(comanda, i) in this.comandes" :key="i">
            <v-card width="250">
              <v-card-title>
                Comanda {{ comanda.IDPedido }}
              </v-card-title>
              <v-card-subtitle>
                Client {{ comanda.IDCliente }}
              </v-card-subtitle>
              <v-btn color="success" class="mt-12" @click="cambiarOverlay(comanda.IDPedido)">
                Veure Comanda
              </v-btn>
              <v-btn color="success" class="mt-12" @click="tancar(comanda)">
                Tancar
              </v-btn>

              <v-overlay v-model="overlay" v-if="this.comandaSeleccionada === comanda.IDPedido" contained
                class="align-center justify-center">
                <v-card-text class="carta">
                  <ul>
                    <li v-for="producte in comanda">
                      {{ producte.nom }} -- {{ producte.quantitat }}
                    </li>
                  </ul>
                </v-card-text>
                <v-btn color="success" @click="overlay = false">
                  Hide Overlay
                </v-btn>
              </v-overlay>
              <br><br>
            </v-card>
          </v-col>

        </v-row>

      </v-container>

    </v-main>
  </v-layout>
</template>

<style >
.buscador {
  border: 1px solid black;
  border-radius: 10px;
  width: 100%;
  height: 60%;
}

.carta {
  background-color: white;
  border-radius: 10px;
}

.nose {
  height: 100%;
  width: 100%;
  word-wrap: break-word;
}

.v-btn {
  min-width: 0;
}
</style>
<script  >
import { getComandes,getProductesComanda } from '@/manager'
import io from 'socket.io-client';
export default {
  data: () => ({
    comandaSeleccionada: null,
    cercar: false,
    seleccio: 'Pendents',
    nombre: "Gestio Comandas",
    link: "gestioproductes",
    ultimaColumna: "Hola",
    dialog: false,
    IDPedido: "",
    overlay: false,
    comandes: [],
    comandesGlobal: [],
    comandesPendents: true,
    comandesAcceptades: false,
    comandesTancades: false,
    socket: null,
    prova: []


  }),
  created() {
    this.buscarComandes("Pendents");
    this.socket = io("http://testprojecte.dam.inspedralbes.cat:3044")
    this.socket.on('connected', (data)=>{
      console.log("Connectat")
    })

  },
  methods: {
    filterById(jsonObject, id)
     {return jsonObject.filter(function(jsonObject) {return (jsonObject['IDPedido'] == id);})[0];},
     
     recargar(){
      getComandes().then(response => this.comandesGlobal = response)
    },
    productosComanda(idComanda){
      //var comandaActual = this.filterById(this.comandesGlobal, idComanda);
      console.log(this.prova);
      getProductesComanda(idComanda).then((response) => {this.prova = response});
      console.log(this.prova);
    },

    cambio() {
      this.nombre = this.nombre === 'Gestio Comandas' ? 'Gestio Productes' : 'Gestio Comandas'
      this.$router.push(this.link)
      this.link = this.link === 'gestiocomandes' ? 'gestioproductes' : 'gestiocomandes'
    },
    cambiarOverlay(comandaId) {
      this.comandaSeleccionada = comandaId;
      this.overlay = !this.overlay
    },
    buscarComandes(Estado) {
      this.recargar();
      this.comandes = this.comandesGlobal.filter(comanda => comanda.Estado === Estado);
      switch (Estado) {
        case 'Pendents':
          this.comandesPendents = true;
          this.comandesAcceptades = false;
          this.comandesTancades = false;
          break
        case 'Acceptades':
          this.comandesPendents = false;
          this.comandesAcceptades = true;
          this.comandesTancades = false;
          break
        case 'Tancades':
          this.comandesPendents = false;
          this.comandesAcceptades = false;
          this.comandesTancades = true;
          break
      }
    },

    buscarComanda(id) {
      this.comandes = this.comandesGlobal.filter(comanda => comanda.IDPedido == id);
      this.IDPedido = "";
    },
    comandaAcceptada(id) {
      console.log("S'ha acceptat la comanda amb id: " + id)
    },
    comandaRebutjada(id) {
      console.log("S'ha rebutjat la comanda amb id: " + id)

    },
    tancar(comanda) {
      comanda.Estado = "Tancades"

    }
  },
  computed: {
    /*DatosFiltrados() {
      let keysToSort = Object.keys(this.comandes);

      // Filtrar la clave 'tiempo' si está presente
      keysToSort = keysToSort.filter(key => key !== 'tiempo');
      keysToSort = keysToSort.filter(key => key !== 'intentos');

      if (this.sortBy === 'keys') {
        // Ordenar por claves alfabéticamente
        return this.keysToSort.filter(comanda => comanda.Estado === seleccio);
      } else if (this.sortBy === 'values') {
        // Ordenar por valores (aciertos) de manera descendente
        return keysToSort.findIndex();
      }

      // Por defecto, devolver las claves ordenadas alfabéticamente
      return this.keysToSort;
    }*/
  },

}


//
</script>
    