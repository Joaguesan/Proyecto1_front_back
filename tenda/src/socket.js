import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://localhost:3000/gestiocomandes";

export const socket = io(URL);

socket.on("connect", () => {
    console.log("Connectat")
  state.connected = true;
});

socket.on("disconnect", () => {
    console.log("desconnectat")
  state.connected = false;
});

socket.on("foo", (...args) => {
  state.fooEvents.push(args);
});

socket.on("bar", (...args) => {
  state.barEvents.push(args);
});