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
                    <v-col cols="3"><v-select v-model="seleccio" density="compact"
                            :items="['Pendents', 'Acceptades', 'Tancades']" @update:menu=buscarComandes(seleccio) ></v-select></v-col>
                    <v-col cols="6"></v-col>
                    <v-col cols="3"><v-btn @click="dialog = true" class="">Cercar Comandes</v-btn>
                        <v-dialog v-model="dialog" width="auto">
                            <v-card>
                                <v-card-text>ID a buscar: </v-card-text>
                                <v-text-field v-model="idcomanda" :counter="10" label="ID comanda"
                                    required hide-details @key.up.enter=""></v-text-field>
                                <v-card-actions>
                                    <v-btn color="primary" block @click="buscarComanda(idcomanda); dialog = false">Close Dialog</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-col>
                </v-row>
                <v-row>
                    <v-container>
                        <v-row>
                            <v-col cols="2">Id Comanda</v-col>
                            <v-col cols="2">Id Client</v-col>
                            <v-col cols="2">Data Creació</v-col>
                            <v-col cols="2">Import total</v-col>
                            <v-col cols="2">Estat</v-col>
                            <v-col cols="2">{{ textoColumna }}</v-col>

                        </v-row>
                        <v-row :class="[
                            index % 2 === 0 ? 'bg-grey-lighten-2' : 'bg-white'
                        ]" v-for="(comanda, index) in comandes"
                            :key=index>
                            <v-col cols="2">{{ comanda.idComanda }}</v-col>
                            <v-col cols="2">{{ comanda.idClient }}</v-col>
                            <v-col cols="2">{{ comanda.data }}</v-col>
                            <v-col cols="2">{{ comanda.import }}</v-col>
                            <v-col cols="2">{{ comanda.estat }}</v-col>
                            <v-col cols="2">
                                <div v-if="comanda.estat === 'Pendents'"><v-btn>A</v-btn><v-btn>X</v-btn></div>
                                <div v-if="comanda.estat === 'Acceptades'"><v-btn>Tancar</v-btn></div>
                                <div v-if="comanda.estat === 'Tancades'">temps</div>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-row>

            </v-container>

        </v-main>
    </v-layout>
</template>
<style></style>
  
<script >
export default {
    data: () => ({
        seleccio: 'Pendents',
        nombre: "Gestio Comandas",
        link: "gestioproductes",
        ultimaColumna: "Hola",
        dialog: false,
        idcomanda:"",
        comandes:  [],
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
]

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
        buscarComandes(estat){
            console.log(estat)
            this.comandes = this.comandesGlobal.filter(comanda => comanda.estat === estat);
            console.log(this.comandes)
        },
        buscarComanda(id){
            this.comandes = this.comandesGlobal.filter(comanda => comanda.idComanda == id);
            console.log(this.comandes)
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
  