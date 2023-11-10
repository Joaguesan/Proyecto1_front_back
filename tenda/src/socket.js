import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  recarregar: false
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : "http://damtr1g3.dam.inspedralbes.cat:3333/";

export const socket = io("http://damtr1g3.dam.inspedralbes.cat:3333/", {
  withCredentials: true
});

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("recarregat", () => {
  console.log("recarregat")
  state.recarregar = false;
});
socket.on("comandaNova", () => {
  console.log("COMANDA NOVA")
  state.recarregar = true;
});
socket.on("ProductoNuevo", () => {
  console.log("ProductoNuevo NOVA")
  state.recarregar = true;
});