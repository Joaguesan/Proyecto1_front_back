<template fill-height >
  <v-layout class="rounded rounded-md">
    <v-app-bar :elevation="2" title="Nombre tienda">
      <template v-slot:append>
        <v-btn variant="plain" @click="this.$router.push('/#' )">
            Anàlisi de dades
        </v-btn>
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
        <div style="display: none">
          {{ this.recarregarEstat }}
        </div>
        <v-row>
          <v-col cols="3"><v-select v-model="seleccio" density="compact"
              :items="['Pendents', 'En Preparacio', 'Preparades', 'Entregades', 'Rebutjades']"
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
            <v-row v-if="this.comandesPreparades">
              <v-expansion-panels>
                <v-expansion-panel v-for="(comanda, i) in this.comandes" :key="i" @click="getDadesClient(comanda.IDCliente)"  >
                  <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
                    Comanda {{ comanda.IDPedido }}
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-row>
                      <v-col cols="2">Client: {{ comanda.IDCliente }} </v-col>
                      <v-col cols="2">Data Comanda: {{ comanda.FechaPedido }}</v-col>
                      <v-col cols="2">
                        <p class="nose">
                          Direcció:
                          {{ clients[comanda.IDCliente][0].Direccion }}
                        </p>
                      </v-col>
                      <v-col cols="2">
                        <p class="nose">
                          Teléfon:
                          {{ clients[comanda.IDCliente][0].Telefono }}
                        </p>
                      </v-col>
                      <v-col cols="2">Estat: {{ comanda.Estado }}</v-col>
                      <v-col cols="2">Import Total: {{ comanda.Total }}€</v-col>
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

            <v-row v-if="this.comandesEntregades">
              <v-col cols="2">Id Comanda</v-col>
              <v-col cols="2">Id Client</v-col>
              <v-col cols="2">Data Creació</v-col>
              <v-col cols="2">Import total</v-col>
              <v-col cols="2">Temps total</v-col>
              <v-col cols="2">Estat</v-col>
            </v-row>
            <v-row v-if="this.comandesEntregades" :class="[
              index % 2 === 0 ? 'bg-grey-lighten-2' : 'bg-white'
            ]" v-for="(comanda, index) in comandes" :key=index>
              <v-col cols="2">{{ comanda.IDPedido }}</v-col>
              <v-col cols="2">{{ comanda.IDCliente }}</v-col>
              <v-col cols="2">{{ comanda.FechaPedido }}</v-col>
              <v-col cols="2">{{ comanda.Total }}</v-col>
              <v-col cols="2">temps</v-col>
              <v-col cols="2">{{ comanda.Estado }}</v-col>
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
            <v-row v-if="this.comandesRebutjades">
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
                        <li v-for="producte in this.productes[comanda.IDPedido]">
                            {{ producte.NombreProducto }} x {{ producte.Cantidad }}
                          </li>
                          </p>
                      </v-col>
                      <v-col cols="2">
                        Estat: {{ comanda.Estado }}
                      </v-col>
                      <v-col cols="2"></v-col>
                    </v-row>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
          </v-container>
        </v-row>
        <v-row v-if="comandesEnPreparacio">
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
              <v-btn color="success" class="mt-12" @click="llestSiNo = true, this.comandaSeleccionada=comanda.IDPedido">
                Tancar
              </v-btn>

              <v-overlay v-model="overlay" v-if="this.comandaSeleccionada === comanda.IDPedido" contained
                class="align-center justify-center">
                <v-card-text class="carta">
                  <ul>
                    <li v-for="producte in this.productes[comanda.IDPedido]">
                      {{ producte.NombreProducto }} x {{ producte.Cantidad }}
                    </li>
                  </ul>
                </v-card-text>
                <v-btn color="success" @click="overlay = false">
                  Tancar
                </v-btn>
              </v-overlay>
              <br><br>
            </v-card>
            <v-dialog v-model="llestSiNo" v-if="this.comandaSeleccionada === comanda.IDPedido"  persistent width="auto">
              <v-card>
                <v-card-title class="text-h5">
                  Esta la comanda {{comanda.IDPedido }} llesta per a enviament?
                </v-card-title>
                <v-card-text> Un cop estigui enviada no es podrá recuperar. </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green-darken-1" variant="text"
                    @click="llestSiNo = false, llestaPerEnviar(comanda.IDPedido)">
                    Enviar
                  </v-btn>
                  <v-btn color="green-darken-1" variant="text" @click="llestSiNo = false">
                    Cancelar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
<script>
import { getComandes, getProductesComanda, getClient } from '@/manager'
import { socket, state } from "@/socket";
export default {
  data: () => ({
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
    clients: new Map()


  }),
  created() {
    this.buscarComandes('Pendents');
    
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
    async recargar() {
      console.log("Dades actualitzades")
      await getComandes().then((response) => { this.comandesGlobal = response })

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
    getDadesClient(idClient){
        console.log("DADES DEL CLIENT")
      getClient(idClient).then((response) => { this.clients[idClient] = response } )
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
          this.comandesPreparades= false;
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
      console.log("A")
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


}


//
</script>
