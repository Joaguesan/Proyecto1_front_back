<template fill-height >
    <v-layout class="rounded rounded-md">
        <v-app-bar class="navbar" title="Gestió Comandes">
            <template v-slot:append>
          <v-btn  >Gestió Comandes</v-btn>
          <v-btn>Gestió Productes</v-btn>

        </template>
        </v-app-bar>


        <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
            <v-container class="">
                    <v-row>
                        <v-col cols="2"></v-col>
                        <v-col cols="8" justify="center" ><h1>Gestió Comandes</h1></v-col>
                        <v-col cols="2"></v-col>
                    </v-row>
                                            
            </v-container>

        </v-main>
    </v-layout>
</template>
<style>
</style>
  
<script setup>
//
</script>
  