import json
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib import rcParams
from collections import Counter


with open('log.json', 'r') as file:
    data = json.load(file)

estado_contador = {}

for pedido in data:
    estado = pedido["Estado"]
    if(estado in estado_contador):
        estado_contador[estado] +=1
    else:
        estado_contador[estado] = 1

etiquetas = list(estado_contador.keys())
valores = list(estado_contador.values())

plt.bar(etiquetas, valores, color=["green","red","purple","yellow", "orange", "blue"])
plt.xlabel("Estado del pedido")
plt.ylabel("Cantidad de pedidos")
plt.title("Contador de pedidos por estado")

plt.savefig('./grafico2.jpeg')