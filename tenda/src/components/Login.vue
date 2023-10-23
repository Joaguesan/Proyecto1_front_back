<template>
    <v-container class="bg-grey rounded-lg w-50">
        <v-responsive class="align-center text-center fill-height">

            <v-row>
                <v-col cols="4"></v-col>
                <v-col cols="4"> LOGIN FORM </v-col>
                <v-col cols="4"></v-col>
            </v-row>
            <form>
                <v-row>
                <v-col cols="4"><label for="user">Usuari </label></v-col>
                <v-col cols="4"> <input class="bg-white" type="text" id="user" v-model="usuari"> </v-col>
                <v-col cols="4"></v-col>
            </v-row>    
            <v-row>
                <v-col cols="4"> <label for="pswd">Contrasenya </label></v-col>
                <v-col cols="4"> <input class="bg-white" type="password" id="pswd" v-model="contrasenya"> </v-col>
                <v-col cols="4"></v-col>
            </v-row> 
               
                
            </form>

        </v-responsive>
    </v-container>
</template>
  
<script setup>
//
</script>
  