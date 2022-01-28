# 2021-1-7

import faiss
import numpy as np
d = 60                           # dimension
nb = 100000                      # database size
nq = 10                      # nb of queries
np.random.seed(1234)             # make reproducible
xb = np.random.random((nb, d)).astype('float32')
xb[:, 0] += np.arange(nb) / 1000.
xq = np.random.random((nq, d)).astype('float32')
xq[:, 0] += np.arange(nq) / 1000.


nlist = 510
index = faiss.index_factory(d, 'IVF%s,Flat' % nlist)
index.train(xb)
index.add(xb)
index.nprobe = 15

D, I = index.search(xq, 5)
print(I)

faiss.write_index(index, 'index')

# index = faiss.read_index('index')