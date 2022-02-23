import hnswlib
import numpy as np

dim = 60
num_elements = 100000

data = np.float32(np.random.random((num_elements, dim)))

index = hnswlib.Index(space='l2', dim=dim)

index.init_index(max_elements=num_elements + 20000, ef_construction=100, M=16)

index.set_ef(10)

index.set_num_threads(4)

index.add_items(data)

index_path = 'hnswlib_hnsw.index'

index.save_index(index_path)
