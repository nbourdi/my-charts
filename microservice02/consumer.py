from json import dumps
#from kafka import KafkaProducer
#from kafka import KafkaConsumer
#from pymongo import MongoClient
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import sys


'''consumer = KafkaConsumer(
    'chart1_parser',
     bootstrap_servers=['localhost:9092'],
     auto_offset_reset='earliest',
     enable_auto_commit=True,
     group_id='my-group',
     value_deserializer=lambda x: loads(x.decode('utf-8')))
#producer = KafkaProducer(bootstrap_servers=['localhost:9092'],
 #                        value_serializer=lambda x: 
 #                       dumps(x).encode('utf-8'))

#for message in consumer:
 #   series = message.value
 #  collection.insert_one(message)
 #   print('{} added to {}'.format(message, collection))
'''
#def create_bar_chart(char, val):

series = [('red', 'blue', 'red', 'red', 'blue', 'green', 'yellow', 'magenta'), ('M', 'F', 'F', 'M', 'F', 'F', 'M', 'F')]

tit1 = str(sys.argv[1])
tit2 = str(sys.argv[2])
data = sys.agrv[3]
print(tit1)
print(tit2)
print(data)
'''
characteristics = np.array(series[0])
values = np.array(series[1])

dataset = pd.DataFrame({'char': characteristics, 'values': values})

data = {}

for value in dataset['values'].unique():
    arr = []
    for color in dataset['char'].unique():
        counts = dataset[(dataset['values'] == value) & (dataset['char'] == color)]['char'].count()
        arr.append(counts)
    print(arr)
    data[value] = np.array(arr)

print(data)
chars = np.array(dataset['char'].unique())
print(chars)
width = (1.8 / chars.size)

fig, ax = plt.subplots()
bottom = np.zeros(chars.size)

for val, val_count in data.items():
    p = ax.bar(chars, val_count, width, label=val, bottom=bottom)
    bottom += val_count
    ax.bar_label(p, label_type='center')

ax.set_title('Number of penguins by sex')
ax.legend()

plt.show()'''