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
                  <v-text-field v-model="idcomanda" :counter="10" label="ID comanda" required hide-details
                    @key.up.enter=""></v-text-field>
                  <v-card-actions>
                    <v-btn color="primary" class="w-50" variant="text" block
                      @click="buscarComanda(idcomanda); dialog = false">Buscar</v-btn>
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
                <v-col cols="2">{{ comanda.idComanda }}</v-col>
                <v-col cols="2">{{ comanda.idClient }}</v-col>
                <v-col cols="2">{{ comanda.data }}</v-col>
                <v-col cols="2">{{ comanda.import }}</v-col>
                <v-col cols="2">{{ comanda.estat }}</v-col>
                <v-col cols="2">temps</v-col>
              </v-row>
              <v-row v-if="this.comandesPendents">
                <v-expansion-panels>
                  <v-expansion-panel v-for="(comanda, i) in this.comandes" :key="i">
                    <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
                      Comanda {{ comanda.idComanda }}
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <v-row>
                        <v-col cols="2">Client: {{ comanda.idClient }} </v-col>
                        <v-col cols="2">Data: {{ comanda.data }}</v-col>
                        <v-col cols="2">
                          <p class="nose">
                            Descripció:
                            febbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
                          </p>
                        </v-col>
                        <v-col cols="2">
                          <p class="nose">
                            Productes:
                            febbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
                          </p>
                        </v-col>
                        <v-col cols="2"><v-btn @click="comandaAcceptada(comanda.idComanda)">Acceptar</v-btn></v-col>
                        <v-col cols="2"><v-btn @click="comandaRebutjada(comanda.idComanda)">Rebutjar</v-btn></v-col>
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
                  Comanda {{ comanda.idComanda }}
                </v-card-title>
                <v-card-subtitle>
                  Client {{ comanda.idClient }}
                </v-card-subtitle>
                <v-btn color="success" class="mt-12" @click="cambiarOverlay(comanda.idComanda)">
                  Veure Comanda
                </v-btn>
                <v-btn color="success" class="mt-12" @click="tancar(comanda)">
                  Tancar
                </v-btn>

                <v-overlay v-model="overlay"  v-if="this.comandaSeleccionada === comanda.idComanda" contained class="align-center justify-center">
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

  <style>
  .buscador {
    border: 1px solid black;
    border-radius: 10px;
    width: 100%;
    height: 60%;
  }

  .carta{
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
    
  <script >
  export default {
    data: () => ({
      comandaSeleccionada: null,
      cercar: false,
      seleccio: 'Pendents',
      nombre: "Gestio Comandas",
      link: "gestioproductes",
      ultimaColumna: "Hola",
      dialog: false,
      idcomanda: "",
      overlay: false,
      comandes: [],
      comandesGlobal: [
        {
          "idComanda": 1,
          "idClient": 101,
          "data": "2023-10-23",
          "import": 50.99,
          "estat": "Pendents"
        },
        {
          "idComanda": 2,
          "idClient": 102,
          "data": "2023-10-24",
          "import": 75.50,
          "estat": "Pendents"
        },
        {
          "idComanda": 3,
          "idClient": 103,
          "data": "2023-10-25",
          "import": 30.25,
          "estat": "Acceptades"
        },
        {
          "idComanda": 4,
          "idClient": 104,
          "data": "2023-10-26",
          "import": 45.75,
          "estat": "Acceptades"
        },
        {
          "idComanda": 5,
          "idClient": 105,
          "data": "2023-10-27",
          "import": 60.00,
          "estat": "Acceptades"
        },
        {
          "idComanda": 6,
          "idClient": 106,
          "data": "2023-10-28",
          "import": 90.99,
          "estat": "Tancades"
        },
        {
          "idComanda": 7,
          "idClient": 107,
          "data": "2023-10-29",
          "import": 25.49,
          "estat": "Tancades"
        },
        {
          "idComanda": 8,
          "idClient": 108,
          "data": "2023-10-30",
          "import": 55.75,
          "estat": "Tancades"
        },
        {
          "idComanda": 9,
          "idClient": 109,
          "data": "2023-10-31",
          "import": 40.00,
          "estat": "Tancades"
        },
        {
          "idComanda": 10,
          "idClient": 110,
          "data": "2023-11-01",
          "import": 70.25,
          "estat": "Pendents"
        }
      ],
      comandesPendents: true,
      comandesAcceptades: false,
      comandesTancades: false


    }),
    created() {
      this.buscarComandes("Pendents");
    },
    methods: {
      cambio() {
        this.nombre = this.nombre === 'Gestio Productes' ? 'Gestio Comandas' : 'Gestio Productes'
        this.$router.push(this.link)
        this.link = this.link === 'gestiocomandes' ? 'gestioproductes' : 'gestiocomandes'
      },
      cambiarOverlay(comandaId){
        this.comandaSeleccionada = comandaId;
        this.overlay = !this.overlay
      },
      buscarComandes(estat) {
        this.comandes = this.comandesGlobal.filter(comanda => comanda.estat === estat);
        switch (estat) {
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
        this.comandes = this.comandesGlobal.filter(comanda => comanda.idComanda == id);
        this.idcomanda = "";
      },
      comandaAcceptada(id) {
        console.log("S'ha acceptat la comanda amb id: " + id)
      },
      comandaRebutjada(id) {
        console.log("S'ha rebutjat la comanda amb id: " + id)

      },
      tancar(comanda){
        comanda.estat = "Tancades"

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
          return this.keysToSort.filter(comanda => comanda.estat === seleccio);
        } else if (this.sortBy === 'values') {
          // Ordenar por valores (aciertos) de manera descendente
          return keysToSort.findIndex();
        }

        // Por defecto, devolver las claves ordenadas alfabéticamente
        return this.keysToSort;
      }*/
    }

  }

  //
  </script>
    