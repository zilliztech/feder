import csv
import json
import numpy as np
import faiss

with open("voc_vectors.csv") as f:
    _data = csv.DictReader(f)
    data = [row for row in _data]
    vectors = [np.array(json.loads(d['vector']), dtype='float32')
               for d in data]
    num_elements = len(vectors)
    dim = len(vectors[0])
    print(num_elements, dim)

    nlist = 200
    index = faiss.index_factory(dim, 'IVF%s,Flat' % nlist)
    vectors = np.array(vectors)
    index.train(vectors[:num_elements // 3])
    index.add(vectors)

    D, I = index.search(vectors[5:6], 5)
    print(D)
    print(I)

    faiss.write_index(index, 'faiss_ivf_flat_voc_17k_train_33%.index')
