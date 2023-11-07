<template class="h-100" fill-height >
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


    <v-main class="align-center h-100 justify-center background">
      <v-container>
        <v-row>
          <v-col class="d-flex justify-center align-center ">
            <h1 class="titol">Gestió Comandes</h1>
          </v-col>
          <v-col cols="9"></v-col>
        </v-row>
        <div style="display: none">
          {{ this.recarregarEstat }}
        </div>
        <v-row>
          <v-col cols="3"><v-select v-model="seleccio" density="compact"
              :items="['Pendents', 'En Preparacio', 'Preparades', 'Entregades', 'Rebutjades']"
              @update:menu=buscarComandes(seleccio)
              style="background-color: rgba(249, 208, 82, 0.9); margin-top: 2%; border:black solid 1px ; border-radius: 10px;"></v-select></v-col>
          <v-col cols="6"></v-col>
          <v-col cols="3"><!--
            Botó per a cercar comanda
            
            <v-btn @click="dialog = true;" class="">Cercar Comandes</v-btn>
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
          --></v-col>
        </v-row>
        <v-row>
          <v-container>
            <v-row v-if="this.comandesPreparades">
              <v-expansion-panels>
                <v-expansion-panel style="background:rgb(249, 208, 82)" v-for="(comanda, i) in this.comandes" :key="i">
                  <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
                    <b>Comanda {{ comanda.IDPedido }}</b>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text style="background:#ffffff">
                    <v-row>
                      <v-col cols="1">Client: {{ comanda.IDCliente }} </v-col>
                      <v-col cols="2" class="nose">Data Comanda: {{ comanda.FechaPedido }}</v-col>
                      <v-col cols="2">
                        <p class="nose">
                          Direcció:

                          {{ clients[clients.indexOf(clients.find((client) => client.IDCliente ==
                            comanda.IDCliente))].Direccion }}
                        </p>
                      </v-col>
                      <v-col cols="2">
                        <p class="nose">
                          Teléfon:
                          {{ clients[clients.indexOf(clients.find((client) => client.IDCliente ==
                            comanda.IDCliente))].Telefono }}
                        </p>
                      </v-col>
                      <v-col cols="2">Import Total: {{ comanda.Total }}€</v-col>
                      <v-col cols="3"><v-btn @click="comandaEntregada(comanda.IDPedido)">Entregada</v-btn></v-col>
                    </v-row>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
            <!--<v-row v-if="this.comandesPreparades">
              <v-col cols="2">Id Comanda</v-col>
              <v-col cols="2">Id Client</v-col>
              <v-col cols="2">Data Creació</v-col>
              <v-col cols="2">Import total</v-col>
              <v-col cols="2">Direcció</v-col>
              <v-col cols="2">Estat</v-col>
            </v-row>
            <v-row v-if="this.comandesPreparades" :class="[
              index % 2 === 0 ? 'bg-grey-lighten-2' : 'bg-white'
            ]" v-for="(comanda, index) in comandes" :key=index>
              <v-col cols="2">{{ comanda.IDPedido }}</v-col>
              <v-col cols="2">{{ comanda.IDCliente }}</v-col>
              <v-col cols="2">{{ comanda.FechaPedido }}</v-col>
              <v-col cols="2">{{ comanda.Total }}</v-col>
              <v-col cols="2" class="nose">{{clients[comanda.IDCliente].Direccion}}</v-col>
              <v-col cols="2">{{ comanda.Estado }}</v-col>
            </v-row>-->

            <v-row style="background-color: rgb( 252,175,1); color: black ;" v-if="this.comandesEntregades">
              <v-col cols="2">Id Comanda</v-col>
              <v-col cols="3">Id Client</v-col>
              <v-col cols="3">Data Creació</v-col>
              <v-col cols="2">Import total</v-col>
              <v-col cols="2">Temps total</v-col>
            </v-row>
            <v-row v-if="this.comandesEntregades" :class="[
              index % 2 === 0 ? 'orangeBackground' : 'bg-white'
            ]" v-for="(comanda, index) in comandes" :key=index>
              <v-col cols="2">{{ comanda.IDPedido }}</v-col>
              <v-col cols="3">{{ comanda.IDCliente }}</v-col>
              <v-col cols="3" class="nose">{{ comanda.FechaPedido }}</v-col>
              <v-col cols="2">{{ comanda.Total }}</v-col>
              <v-col cols="2">{{ mostrarTemps(comanda.IDPedido) }}</v-col>
            </v-row>
            <v-row v-if="this.comandesPendents">
              <v-expansion-panels>
                <v-expansion-panel style="background:rgb(249, 208, 82)" v-for="(comanda, i) in this.comandes" :key="i">
                  <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
                    <b> Comanda {{ comanda.IDPedido }}</b>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text style="background:#ffffff">

                    <v-row style="padding: 10px;">
                      <v-col cols="2">Client: {{ comanda.IDCliente }} </v-col>
                      <v-col cols="2" class="nose">FechaPedido: {{ comanda.FechaPedido }}</v-col>
                      <v-col cols="2">
                        <p class="nose">
                          Descripció:
                          {{ comanda.Comentario }}
                        </p>
                      </v-col>
                      <v-col cols="2">
                        <p class="nose">
                          Productes:
                        <ul>
                          <li v-for="producte in this.productes[comanda.IDPedido]">
                            {{ producte.NombreProducto }} x {{ producte.Cantidad }}
                          </li>
                        </ul>
                        </p>
                      </v-col>
                      <v-col cols="2"><v-btn @click="comandaAcceptada(comanda.IDPedido)">Acceptar</v-btn></v-col>
                      <v-col cols="2"><v-btn @click="comandaRebutjada(comanda.IDPedido)">Rebutjar</v-btn></v-col>
                    </v-row>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
            <v-row style="background-color: rgb( 252,175,1); color: black ;" v-if="this.comandesRebutjades">
              <v-col cols="2">Id Comanda</v-col>
              <v-col cols="3">Id Client</v-col>
              <v-col cols="3">Data Creació</v-col>
              <v-col cols="2">Import total</v-col>
              <v-col cols="2">Temps total</v-col>
            </v-row>
            <v-row v-if="this.comandesRebutjades" :class="[
              index % 2 === 0 ? 'orangeBackground' : 'bg-white'
            ]" v-for="(comanda, index) in comandes" :key=index>
              <v-col cols="2">{{ comanda.IDPedido }}</v-col>
              <v-col cols="3">{{ comanda.IDCliente }}</v-col>
              <v-col cols="3" class="nose">{{ comanda.FechaPedido }}</v-col>
              <v-col cols="2">{{ comanda.Total }}</v-col>
              <v-col cols="2">temps</v-col>
            </v-row>
            <v-row v-if="comandesEnPreparacio">
              <v-col cols="4" v-for="(comanda, i) in this.comandes" :key="i">
                <v-card :style="{'background-color':  this.tempsOberta[this.tempsOberta.indexOf(this.tempsOberta.find((element) => element.id == comanda.IDPedido))].temps  > 5 ? 'red' :  this.tempsOberta[this.tempsOberta.indexOf(this.tempsOberta.find((element) => element.id == comanda.IDPedido))].temps > 2 ? 'rgb(249, 208, 82)' : '#6cbf28',  'border': '#021345 solid 1px'}" width="250">
                  <v-card-title>
                    Comanda {{ comanda.IDPedido }}
                  </v-card-title>
                  <v-card-subtitle>
                    Client {{ comanda.IDCliente }}, {{ this.tempsOberta[this.tempsOberta.indexOf(this.tempsOberta.find((element) => element.id == comanda.IDPedido))].temps }} Minuts

                  </v-card-subtitle>
                  <v-container class="btncenter">
                    <v-btn color="#4DB5D8" @click="cambiarOverlay(comanda.IDPedido)">
                      Veure Comanda
                    </v-btn>
                    <v-btn color="#4DB5D8" class="mt-12"
                      @click="llestSiNo = true, this.comandaSeleccionada = comanda.IDPedido">
                      Tancar
                    </v-btn>
                  </v-container>
                  <v-overlay v-model="overlay" v-if="this.comandaSeleccionada === comanda.IDPedido" contained
                    class="align-center justify-center">
                    <v-card-text class="carta">
                      <ul>
                        <li v-for="producte in this.productes[comanda.IDPedido]">
                          {{ producte.NombreProducto }} x {{ producte.Cantidad }}
                        </li>
                      </ul>
                    </v-card-text>
                    <v-btn color="#4DB5D8" @click="overlay = false">
                      Tancar
                    </v-btn>
                  </v-overlay>
                  <br><br>
                </v-card>
                <v-dialog v-model="llestSiNo" v-if="this.comandaSeleccionada === comanda.IDPedido" persistent
                  width="auto">
                  <v-card>
                    <v-card-title class="text-h5">
                      Esta la comanda {{ comanda.IDPedido }} llesta per a enviament?
                    </v-card-title>
                    <v-card-text> Un cop estigui enviada no es podrá recuperar. </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="#4DB5D8" variant="text" @click="llestSiNo = false, llestaPerEnviar(comanda.IDPedido)">
                        Enviar
                      </v-btn>
                      <v-btn color="#4DB5D8" variant="text" @click="llestSiNo = false">
                        Cancelar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
          </v-container>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>

<style >
.orangeBackground {
  background-color: rgb(249, 208, 82);
}

.buscador {
  border: 1px solid black;
  border-radius: 10px;
  width: 100%;
  height: 60%;
}

.btncenter {
  align-items: center;
  text-align: center;
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

.logo {
  height: 100%;
  width: 30%;
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
  background-color: red;
  background-attachment: fixed;
}

.titol {
  border: #021345 1px solid;
  padding: 2%;
  color: #021345;
  background-color: rgba(249, 208, 82, 1);
  border-radius: 10px;
}
</style>
<script>
import { getComandes, getProductesComanda, getClient, getTempsComanda } from '@/manager'
import { socket, state } from "@/socket";
export default {
  data: () => ({
    bg: "rgb( 252,175,1)",
    llestSiNo: false,
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
    comandesEnPreparacio: false,
    comandesEntregades: false,
    comandesPreparades: false,
    comandesRebutjades: false,
    productes: new Map(),
    clients: [],
    temps: [],
    tempsOberta: []

  }),
  created() {
    this.buscarComandes('Pendents');


  },
  mounted() {
    // Establece un intervalo de 30 segundos (30000 milisegundos) para ejecutar la función repetidamente
    this.intervalo = setInterval(() => {
      this.calcularTemps();
      console.log("ACTUALITZAT AMB INTERVAL")
    }, 30000);
  },
  methods: {

    connectar() {
      socket.connect();
    },
    desconnectar() {
      socket.disconnect();
    },

    filterById(jsonObject, id) { return jsonObject.filter(function (jsonObject) { return (jsonObject['IDPedido'] == id); })[0]; },


    comandaAcceptada(idComanda) {
      socket.emit('Acceptada', idComanda);
    },
    comandaRebutjada(idComanda) {
      socket.emit('Rebutjada', idComanda);
    },
    llestaPerEnviar(idComanda) {
      socket.emit('Llesta', idComanda)
    },
    comandaEntregada(idComanda) {
      socket.emit('Entregada', idComanda)
    },
    async recargar() {
      console.log("Dades actualitzades")
      await getComandes().then((response) => { this.comandesGlobal = response })
      this.calcularTemps();
    },
    async productosComanda() {
      this.productes.clear;
      this.comandesGlobal.forEach(comanda => {
        var id = comanda.IDPedido.toString();
        console.log(id)
        getProductesComanda(comanda.IDPedido).then((response) => {
          this.productes[id] = response
        })
      }
      );
    },
    getDadesClient() {
      console.log("DADES DEL CLIENT")
      getClient().then((response) => {
        console.log("get DAdes client => ", response);
        this.clients = response
      })
    },
    getTemps() {
      getTempsComanda().then((response) => {
        this.temps = response
        console.log("GET DADES TEMPS =>", this.temps)
      });
    },
    mostrarTemps(id) {
      let index = this.temps.indexOf(this.temps.find((temp) => temp.IDPedido ==
        id));
      let resultat = null;
      console.log("INDEX " + index)
      if (index != -1) {
        resultat = this.temps[index].Tiempo
      } else {
        resultat = "NA"
      }
      return resultat;
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
    calcularTemps() {
      this.tempsOberta = []
      const fechaActual = new Date();
      this.comandesGlobal.forEach(comanda => {
        var fecha = new Date(comanda.FechaPedido);
        var diferenciaEnMilisegundos = fecha - fechaActual;
        var segundos = Math.floor(diferenciaEnMilisegundos / 1000);
        var minutos = Math.floor(segundos / 60);
        var minutos = minutos*-1; 
        this.tempsOberta.push({id: comanda.IDPedido, temps: minutos})
        console.log("SI S'ha FET")
      });
    },

    buscarComandes(Estado) {
      this.getTemps();
      this.getDadesClient()
      this.recargar().then(() => {
        this.comandes = this.comandesGlobal.filter(comanda => comanda.Estado === Estado), this.productosComanda()
      })
      switch (Estado) {
        case 'Pendents':
          this.comandesPendents = true;
          this.comandesEnPreparacio = false;
          this.comandesPreparades = false;
          this.comandesRebutjades = false
          this.comandesEntregades = false
          break
        case 'En Preparacio':
          this.comandesPendents = false;
          this.comandesEnPreparacio = true;
          this.comandesPreparades = false;
          this.comandesRebutjades = false
          this.comandesEntregades = false
          break
        case 'Preparades':
          this.comandesPendents = false;
          this.comandesEnPreparacio = false;
          this.comandesPreparades = true;
          this.comandesRebutjades = false
          this.comandesEntregades = false

          break
        case 'Entregades':
          this.comandesPendents = false;
          this.comandesEnPreparacio = false;
          this.comandesPreparades = false;
          this.comandesEntregades = true
          this.comandesRebutjades = false
          break;
        case 'Rebutjades':
          this.comandesPendents = false;
          this.comandesEnPreparacio = false;
          this.comandesPreparades = false;
          this.comandesRebutjades = true;
          this.comandesEntregades = false
          break
        default:
          this.comandesPendents = true;
          this.comandesEnPreparacio = false;
          this.comandesPreparades = false;
          this.comandesRebutjades = false
          this.comandesEntregades = false
          break
      }
    },

    buscarComanda(id) {
      this.comandes = this.comandesGlobal.filter(comanda => comanda.IDPedido == id);
      this.IDPedido = "";
    },
    tancar(comanda) {
      comanda.Estado = "Preparades"

    }
  },
  computed: {
    estat() {
      return state.connected
    },
    recarregarEstat() {
      if (state.recarregar) {
        this.buscarComandes(this.seleccio);
        socket.emit('recarregat');
        state.recarregar = false;
        console.log("OK")
      }
      return state.recarregar
    },
  },
  beforeDestroy() {
    // Limpia el intervalo cuando el componente se destruye para evitar fugas de memoria
    clearInterval(this.intervalo);
  }


}


//
</script>
