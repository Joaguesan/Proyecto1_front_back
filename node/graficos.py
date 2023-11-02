import json
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib import rcParams
from collections import Counter


with open('log.json', 'r') as file:
    data = json.load(file)

horas = [pedido['FechaPedido'].split('T')[1].split('.')[0] for pedido in data]

frecuencia_horas = dict(Counter(horas))

horas, frecuencias = zip(*sorted(frecuencia_horas.items()))

plt.bar(horas, frecuencias)
plt.xlabel('Hora del día')
plt.ylabel('Cantidad de pedidos')
plt.title('Estadísticas de pedidos por hora')
plt.xticks(rotation=45)  # Rotar las etiquetas del eje x para una mejor legibilidad

plt.tight_layout()
plt.savefig('./estadisticas.jpeg')