import json
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from matplotlib import rcParams
from datetime import datetime

# Agafem les dades dels productes 
with open('productes.json', 'r') as file:
    dataProductes = json.load(file)

# Agafem les dades dels productes x comanda
with open('log2.json', 'r') as file:
    dataComandes = json.load(file)

x_labels = []
# Crear un diccionario para contabilizar els cops que s'ha demanat cada producte
producte_times = {}
for producte in dataProductes:
    producte_times[producte['IDProducto']] = 0
    x_labels.append(producte['NombreProducto'])


for producteComanda in dataComandes:
    producte_times[producteComanda['IDProducto']] =  producte_times[producteComanda['IDProducto']] + 1



# Extraer franjas horarias y montos
ids, montos = zip(*producte_times.items())
# Crear el gráfico de barras
x_pos = []
for id in ids:
    x_pos.append(len(x_pos) + 1)
print(x_labels)
plt.bar(x_pos, montos)
plt.xticks(x_pos, x_labels)
plt.xlabel('ID Producte')
plt.ylabel('Num de cops demanat')
plt.title('Demandes per producte')
plt.xticks(rotation=90)
plt.tight_layout()
plt.savefig('./estadisticas_productos.jpeg')