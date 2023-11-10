import json
from datetime import datetime

# Agafem les dades dels productes x comanda
with open('log.json', 'r') as file:
    dataComandes = json.load(file)


# Crear un diccionario para contabilizar els cops que s'ha demanat cada producte
mes = str(datetime.now())
comandes = {
    "obertes": 0.0,
    "tancades": 0.0
}
for comanda in dataComandes:
    if(comanda['FechaPedido'][0:10] == str(mes)[0:10]):
        if(comanda['Estado'] == "Entregades"):
            comandes["tancades"] = comandes["tancades"] + float(comanda['Total'])
        elif(comanda['Estado'] != "Rebutjades"):
            comandes["obertes"] = comandes["obertes"] + float(comanda['Total'])

comandes["obertes"] = round(comandes["obertes"], 2)
comandes["tancades"] = round(comandes["tancades"], 2)

json_object = json.dumps(comandes, indent = 4) 
print(json_object)
# print("PENDENT " + str(comandes['obertes']))
# print("COBRAT " + str(comandes['tancades']))


