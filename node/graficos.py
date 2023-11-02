import json
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib import rcParams
from datetime import datetime
from collections import Counter


with open('log.json', 'r') as file:
    data = json.load(file)

# Función para obtener la franja horaria a partir de una hora dada
def get_time_slot(hour):
    hour = int(hour.split(':')[0])
    if 0 <= hour < 4:
        return '00:00 - 03:59'
    elif 4 <= hour < 8:
        return '04:00 - 07:59'
    elif 8 <= hour < 12:
        return '08:00 - 11:59'
    elif 12 <= hour < 16:
        return '12:00 - 15:59'
    elif 16 <= hour < 20:
        return '16:00 - 19:59'
    else:
        return '20:00 - 23:59'

# Crear un diccionario para contabilizar las franjas horarias
time_slots = {
    '00:00 - 03:59': 0,
    '04:00 - 07:59': 0,
    '08:00 - 11:59': 0,
    '12:00 - 15:59': 0,
    '16:00 - 19:59': 0,
    '20:00 - 23:59': 0
}

for pedido in data:
    fecha_pedido = datetime.fromisoformat(pedido['FechaPedido'])
    hora = fecha_pedido.strftime('%H:%M')
    franja_horaria = get_time_slot(hora)
    time_slots[franja_horaria] += 1

# Extraer franjas horarias y frecuencias
franjas_horarias, frecuencias = zip(*time_slots.items())

# Crear el gráfico de barras
plt.bar(franjas_horarias, frecuencias)
plt.xlabel('Franja horaria')
plt.ylabel('Cantidad de pedidos')
plt.title('Estadísticas de pedidos por franja horaria')

plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig('./estadisticas.jpeg')