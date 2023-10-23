<template fill-height >
    <v-container class="bg-grey rounded-lg w-25 text-xs-center fill-height grid-list-md">
        <v-responsive class="align-center text-center fill-height">
            <br><br>

            <v-row>
                <v-col cols="2"></v-col>
                <v-col cols="8"> LOGIN FORM </v-col>
                <v-col cols="2"></v-col>
            </v-row>
            <br><br>
            <form>
                <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="5"><label for="user">Usuari </label></v-col>
                    <v-col cols="5"> <input class="bg-white" type="text" id="user" v-model="usuari"> </v-col>
                    <v-col cols="1"></v-col>
                </v-row>
                <v-row>
                    <v-col cols="1"></v-col>
                    <v-col cols="5"> <label for="pswd">Contrasenya </label></v-col>
                    <v-col cols="5"> <input class="bg-white" type="password" id="pswd" v-model="contrasenya"> </v-col>
                    <v-col cols="1"></v-col>
                </v-row>
                <br><br>
                <v-row>
                    <v-col cols="3"></v-col>
                    <v-col cols="6"> <button class="bg-white w-100 rounded-lg" type="submit">Entrar</button></v-col>
                    <v-col cols="3"></v-col>
                </v-row>
            </form>
            <br><br>

        </v-responsive>
    </v-container>
</template>
  
<script setup>
//
</script>
  