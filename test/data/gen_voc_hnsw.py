import csv
import json
import numpy as np
import hnswlib

with open("vectors.csv") as f:
    _data = csv.DictReader(f)
    data = [row for row in _data]
    vectors = [np.array(json.loads(d['vector']), dtype='float32')
               for d in data]
    num_elements = len(vectors)
    dim = len(vectors[0])
    print(num_elements, dim)

    index = hnswlib.Index(space='l2', dim=dim)

    # index.init_index(max_elements=num_elements + 20000, ef_construction=32, M=8)
    index.init_index(max_elements=num_elements + 20000, ef_construction=100, M=8)

    index.set_ef(10)

    index.set_num_threads(4)

    index.add_items(vectors)

    index_path = 'hnswlib_hnsw_voc_17k.index'

    index.save_index(index_path)

    labels, distances = index.knn_query(vectors[0], 5)
    print(labels)
    print(distances)
