(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target2) => __defProp(target2, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target2, module, copyDefault, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target2, key) && (copyDefault || key !== "default"))
          __defProp(target2, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target2;
  };
  var __toESM = (module, isNodeMode) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/umap-js/dist/utils.js
  var require_utils = __commonJS({
    "node_modules/umap-js/dist/utils.js"(exports) {
      "use strict";
      var __values = exports && exports.__values || function(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
          return m.call(o);
        return {
          next: function() {
            if (o && i >= o.length)
              o = void 0;
            return { value: o && o[i++], done: !o };
          }
        };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      function tauRandInt(n, random) {
        return Math.floor(random() * n);
      }
      exports.tauRandInt = tauRandInt;
      function tauRand(random) {
        return random();
      }
      exports.tauRand = tauRand;
      function norm(vec) {
        var e_1, _a;
        var result = 0;
        try {
          for (var vec_1 = __values(vec), vec_1_1 = vec_1.next(); !vec_1_1.done; vec_1_1 = vec_1.next()) {
            var item = vec_1_1.value;
            result += Math.pow(item, 2);
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (vec_1_1 && !vec_1_1.done && (_a = vec_1.return))
              _a.call(vec_1);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
        return Math.sqrt(result);
      }
      exports.norm = norm;
      function empty(n) {
        var output = [];
        for (var i = 0; i < n; i++) {
          output.push(void 0);
        }
        return output;
      }
      exports.empty = empty;
      function range(n) {
        return empty(n).map(function(_, i) {
          return i;
        });
      }
      exports.range = range;
      function filled(n, v) {
        return empty(n).map(function() {
          return v;
        });
      }
      exports.filled = filled;
      function zeros(n) {
        return filled(n, 0);
      }
      exports.zeros = zeros;
      function ones(n) {
        return filled(n, 1);
      }
      exports.ones = ones;
      function linear(a, b, len) {
        return empty(len).map(function(_, i) {
          return a + i * ((b - a) / (len - 1));
        });
      }
      exports.linear = linear;
      function sum(input) {
        return input.reduce(function(sum2, val) {
          return sum2 + val;
        });
      }
      exports.sum = sum;
      function mean(input) {
        return sum(input) / input.length;
      }
      exports.mean = mean;
      function max(input) {
        var max2 = 0;
        for (var i = 0; i < input.length; i++) {
          max2 = input[i] > max2 ? input[i] : max2;
        }
        return max2;
      }
      exports.max = max;
      function max2d(input) {
        var max2 = 0;
        for (var i = 0; i < input.length; i++) {
          for (var j = 0; j < input[i].length; j++) {
            max2 = input[i][j] > max2 ? input[i][j] : max2;
          }
        }
        return max2;
      }
      exports.max2d = max2d;
      function rejectionSample(nSamples, poolSize, random) {
        var result = zeros(nSamples);
        for (var i = 0; i < nSamples; i++) {
          var rejectSample = true;
          while (rejectSample) {
            var j = tauRandInt(poolSize, random);
            var broken = false;
            for (var k = 0; k < i; k++) {
              if (j === result[k]) {
                broken = true;
                break;
              }
            }
            if (!broken) {
              rejectSample = false;
            }
            result[i] = j;
          }
        }
        return result;
      }
      exports.rejectionSample = rejectionSample;
      function reshape2d(x, a, b) {
        var rows = [];
        var count = 0;
        var index = 0;
        if (x.length !== a * b) {
          throw new Error("Array dimensions must match input length.");
        }
        for (var i = 0; i < a; i++) {
          var col = [];
          for (var j = 0; j < b; j++) {
            col.push(x[index]);
            index += 1;
          }
          rows.push(col);
          count += 1;
        }
        return rows;
      }
      exports.reshape2d = reshape2d;
    }
  });

  // node_modules/umap-js/dist/heap.js
  var require_heap = __commonJS({
    "node_modules/umap-js/dist/heap.js"(exports) {
      "use strict";
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k))
              result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var utils = __importStar(require_utils());
      function makeHeap(nPoints, size) {
        var makeArrays = function(fillValue) {
          return utils.empty(nPoints).map(function() {
            return utils.filled(size, fillValue);
          });
        };
        var heap = [];
        heap.push(makeArrays(-1));
        heap.push(makeArrays(Infinity));
        heap.push(makeArrays(0));
        return heap;
      }
      exports.makeHeap = makeHeap;
      function rejectionSample(nSamples, poolSize, random) {
        var result = utils.zeros(nSamples);
        for (var i = 0; i < nSamples; i++) {
          var rejectSample = true;
          var j = 0;
          while (rejectSample) {
            j = utils.tauRandInt(poolSize, random);
            var broken = false;
            for (var k = 0; k < i; k++) {
              if (j === result[k]) {
                broken = true;
                break;
              }
            }
            if (!broken)
              rejectSample = false;
          }
          result[i] = j;
        }
        return result;
      }
      exports.rejectionSample = rejectionSample;
      function heapPush(heap, row, weight, index, flag) {
        row = Math.floor(row);
        var indices = heap[0][row];
        var weights = heap[1][row];
        var isNew = heap[2][row];
        if (weight >= weights[0]) {
          return 0;
        }
        for (var i = 0; i < indices.length; i++) {
          if (index === indices[i]) {
            return 0;
          }
        }
        return uncheckedHeapPush(heap, row, weight, index, flag);
      }
      exports.heapPush = heapPush;
      function uncheckedHeapPush(heap, row, weight, index, flag) {
        var indices = heap[0][row];
        var weights = heap[1][row];
        var isNew = heap[2][row];
        if (weight >= weights[0]) {
          return 0;
        }
        weights[0] = weight;
        indices[0] = index;
        isNew[0] = flag;
        var i = 0;
        var iSwap = 0;
        while (true) {
          var ic1 = 2 * i + 1;
          var ic2 = ic1 + 1;
          var heapShape2 = heap[0][0].length;
          if (ic1 >= heapShape2) {
            break;
          } else if (ic2 >= heapShape2) {
            if (weights[ic1] > weight) {
              iSwap = ic1;
            } else {
              break;
            }
          } else if (weights[ic1] >= weights[ic2]) {
            if (weight < weights[ic1]) {
              iSwap = ic1;
            } else {
              break;
            }
          } else {
            if (weight < weights[ic2]) {
              iSwap = ic2;
            } else {
              break;
            }
          }
          weights[i] = weights[iSwap];
          indices[i] = indices[iSwap];
          isNew[i] = isNew[iSwap];
          i = iSwap;
        }
        weights[i] = weight;
        indices[i] = index;
        isNew[i] = flag;
        return 1;
      }
      exports.uncheckedHeapPush = uncheckedHeapPush;
      function buildCandidates(currentGraph, nVertices, nNeighbors, maxCandidates, random) {
        var candidateNeighbors = makeHeap(nVertices, maxCandidates);
        for (var i = 0; i < nVertices; i++) {
          for (var j = 0; j < nNeighbors; j++) {
            if (currentGraph[0][i][j] < 0) {
              continue;
            }
            var idx = currentGraph[0][i][j];
            var isn = currentGraph[2][i][j];
            var d = utils.tauRand(random);
            heapPush(candidateNeighbors, i, d, idx, isn);
            heapPush(candidateNeighbors, idx, d, i, isn);
            currentGraph[2][i][j] = 0;
          }
        }
        return candidateNeighbors;
      }
      exports.buildCandidates = buildCandidates;
      function deheapSort(heap) {
        var indices = heap[0];
        var weights = heap[1];
        for (var i = 0; i < indices.length; i++) {
          var indHeap = indices[i];
          var distHeap = weights[i];
          for (var j = 0; j < indHeap.length - 1; j++) {
            var indHeapIndex = indHeap.length - j - 1;
            var distHeapIndex = distHeap.length - j - 1;
            var temp1 = indHeap[0];
            indHeap[0] = indHeap[indHeapIndex];
            indHeap[indHeapIndex] = temp1;
            var temp2 = distHeap[0];
            distHeap[0] = distHeap[distHeapIndex];
            distHeap[distHeapIndex] = temp2;
            siftDown(distHeap, indHeap, distHeapIndex, 0);
          }
        }
        return { indices, weights };
      }
      exports.deheapSort = deheapSort;
      function siftDown(heap1, heap2, ceiling, elt) {
        while (elt * 2 + 1 < ceiling) {
          var leftChild = elt * 2 + 1;
          var rightChild = leftChild + 1;
          var swap = elt;
          if (heap1[swap] < heap1[leftChild]) {
            swap = leftChild;
          }
          if (rightChild < ceiling && heap1[swap] < heap1[rightChild]) {
            swap = rightChild;
          }
          if (swap === elt) {
            break;
          } else {
            var temp1 = heap1[elt];
            heap1[elt] = heap1[swap];
            heap1[swap] = temp1;
            var temp2 = heap2[elt];
            heap2[elt] = heap2[swap];
            heap2[swap] = temp2;
            elt = swap;
          }
        }
      }
      function smallestFlagged(heap, row) {
        var ind = heap[0][row];
        var dist = heap[1][row];
        var flag = heap[2][row];
        var minDist = Infinity;
        var resultIndex = -1;
        for (var i = 0; i > ind.length; i++) {
          if (flag[i] === 1 && dist[i] < minDist) {
            minDist = dist[i];
            resultIndex = i;
          }
        }
        if (resultIndex >= 0) {
          flag[resultIndex] = 0;
          return Math.floor(ind[resultIndex]);
        } else {
          return -1;
        }
      }
      exports.smallestFlagged = smallestFlagged;
    }
  });

  // node_modules/umap-js/dist/matrix.js
  var require_matrix = __commonJS({
    "node_modules/umap-js/dist/matrix.js"(exports) {
      "use strict";
      var __read = exports && exports.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
          return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"]))
              m.call(i);
          } finally {
            if (e)
              throw e.error;
          }
        }
        return ar;
      };
      var __values = exports && exports.__values || function(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
          return m.call(o);
        return {
          next: function() {
            if (o && i >= o.length)
              o = void 0;
            return { value: o && o[i++], done: !o };
          }
        };
      };
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k))
              result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var _a;
      var utils = __importStar(require_utils());
      var SparseMatrix = function() {
        function SparseMatrix2(rows, cols, values, dims) {
          this.entries = /* @__PURE__ */ new Map();
          this.nRows = 0;
          this.nCols = 0;
          if (rows.length !== cols.length || rows.length !== values.length) {
            throw new Error("rows, cols and values arrays must all have the same length");
          }
          this.nRows = dims[0];
          this.nCols = dims[1];
          for (var i = 0; i < values.length; i++) {
            var row = rows[i];
            var col = cols[i];
            this.checkDims(row, col);
            var key = this.makeKey(row, col);
            this.entries.set(key, { value: values[i], row, col });
          }
        }
        SparseMatrix2.prototype.makeKey = function(row, col) {
          return row + ":" + col;
        };
        SparseMatrix2.prototype.checkDims = function(row, col) {
          var withinBounds = row < this.nRows && col < this.nCols;
          if (!withinBounds) {
            throw new Error("row and/or col specified outside of matrix dimensions");
          }
        };
        SparseMatrix2.prototype.set = function(row, col, value) {
          this.checkDims(row, col);
          var key = this.makeKey(row, col);
          if (!this.entries.has(key)) {
            this.entries.set(key, { value, row, col });
          } else {
            this.entries.get(key).value = value;
          }
        };
        SparseMatrix2.prototype.get = function(row, col, defaultValue) {
          if (defaultValue === void 0) {
            defaultValue = 0;
          }
          this.checkDims(row, col);
          var key = this.makeKey(row, col);
          if (this.entries.has(key)) {
            return this.entries.get(key).value;
          } else {
            return defaultValue;
          }
        };
        SparseMatrix2.prototype.getAll = function(ordered) {
          if (ordered === void 0) {
            ordered = true;
          }
          var rowColValues = [];
          this.entries.forEach(function(value) {
            rowColValues.push(value);
          });
          if (ordered) {
            rowColValues.sort(function(a, b) {
              if (a.row === b.row) {
                return a.col - b.col;
              } else {
                return a.row - b.row;
              }
            });
          }
          return rowColValues;
        };
        SparseMatrix2.prototype.getDims = function() {
          return [this.nRows, this.nCols];
        };
        SparseMatrix2.prototype.getRows = function() {
          return Array.from(this.entries, function(_a2) {
            var _b = __read(_a2, 2), key = _b[0], value = _b[1];
            return value.row;
          });
        };
        SparseMatrix2.prototype.getCols = function() {
          return Array.from(this.entries, function(_a2) {
            var _b = __read(_a2, 2), key = _b[0], value = _b[1];
            return value.col;
          });
        };
        SparseMatrix2.prototype.getValues = function() {
          return Array.from(this.entries, function(_a2) {
            var _b = __read(_a2, 2), key = _b[0], value = _b[1];
            return value.value;
          });
        };
        SparseMatrix2.prototype.forEach = function(fn) {
          this.entries.forEach(function(value) {
            return fn(value.value, value.row, value.col);
          });
        };
        SparseMatrix2.prototype.map = function(fn) {
          var vals = [];
          this.entries.forEach(function(value) {
            vals.push(fn(value.value, value.row, value.col));
          });
          var dims = [this.nRows, this.nCols];
          return new SparseMatrix2(this.getRows(), this.getCols(), vals, dims);
        };
        SparseMatrix2.prototype.toArray = function() {
          var _this = this;
          var rows = utils.empty(this.nRows);
          var output = rows.map(function() {
            return utils.zeros(_this.nCols);
          });
          this.entries.forEach(function(value) {
            output[value.row][value.col] = value.value;
          });
          return output;
        };
        return SparseMatrix2;
      }();
      exports.SparseMatrix = SparseMatrix;
      function transpose(matrix) {
        var cols = [];
        var rows = [];
        var vals = [];
        matrix.forEach(function(value, row, col) {
          cols.push(row);
          rows.push(col);
          vals.push(value);
        });
        var dims = [matrix.nCols, matrix.nRows];
        return new SparseMatrix(rows, cols, vals, dims);
      }
      exports.transpose = transpose;
      function identity(size) {
        var _a2 = __read(size, 1), rows = _a2[0];
        var matrix = new SparseMatrix([], [], [], size);
        for (var i = 0; i < rows; i++) {
          matrix.set(i, i, 1);
        }
        return matrix;
      }
      exports.identity = identity;
      function pairwiseMultiply(a, b) {
        return elementWise(a, b, function(x, y) {
          return x * y;
        });
      }
      exports.pairwiseMultiply = pairwiseMultiply;
      function add(a, b) {
        return elementWise(a, b, function(x, y) {
          return x + y;
        });
      }
      exports.add = add;
      function subtract(a, b) {
        return elementWise(a, b, function(x, y) {
          return x - y;
        });
      }
      exports.subtract = subtract;
      function maximum(a, b) {
        return elementWise(a, b, function(x, y) {
          return x > y ? x : y;
        });
      }
      exports.maximum = maximum;
      function multiplyScalar(a, scalar) {
        return a.map(function(value) {
          return value * scalar;
        });
      }
      exports.multiplyScalar = multiplyScalar;
      function eliminateZeros(m) {
        var zeroIndices = /* @__PURE__ */ new Set();
        var values = m.getValues();
        var rows = m.getRows();
        var cols = m.getCols();
        for (var i = 0; i < values.length; i++) {
          if (values[i] === 0) {
            zeroIndices.add(i);
          }
        }
        var removeByZeroIndex = function(_, index) {
          return !zeroIndices.has(index);
        };
        var nextValues = values.filter(removeByZeroIndex);
        var nextRows = rows.filter(removeByZeroIndex);
        var nextCols = cols.filter(removeByZeroIndex);
        return new SparseMatrix(nextRows, nextCols, nextValues, m.getDims());
      }
      exports.eliminateZeros = eliminateZeros;
      function normalize(m, normType) {
        if (normType === void 0) {
          normType = "l2";
        }
        var e_1, _a2;
        var normFn = normFns[normType];
        var colsByRow = /* @__PURE__ */ new Map();
        m.forEach(function(_, row2, col) {
          var cols = colsByRow.get(row2) || [];
          cols.push(col);
          colsByRow.set(row2, cols);
        });
        var nextMatrix = new SparseMatrix([], [], [], m.getDims());
        var _loop_1 = function(row2) {
          var cols = colsByRow.get(row2).sort();
          var vals = cols.map(function(col) {
            return m.get(row2, col);
          });
          var norm = normFn(vals);
          for (var i = 0; i < norm.length; i++) {
            nextMatrix.set(row2, cols[i], norm[i]);
          }
        };
        try {
          for (var _b = __values(colsByRow.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var row = _c.value;
            _loop_1(row);
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a2 = _b.return))
              _a2.call(_b);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
        return nextMatrix;
      }
      exports.normalize = normalize;
      var normFns = (_a = {}, _a["max"] = function(xs) {
        var max = -Infinity;
        for (var i = 0; i < xs.length; i++) {
          max = xs[i] > max ? xs[i] : max;
        }
        return xs.map(function(x) {
          return x / max;
        });
      }, _a["l1"] = function(xs) {
        var sum = 0;
        for (var i = 0; i < xs.length; i++) {
          sum += xs[i];
        }
        return xs.map(function(x) {
          return x / sum;
        });
      }, _a["l2"] = function(xs) {
        var sum = 0;
        for (var i = 0; i < xs.length; i++) {
          sum += Math.pow(xs[i], 2);
        }
        return xs.map(function(x) {
          return Math.sqrt(Math.pow(x, 2) / sum);
        });
      }, _a);
      function elementWise(a, b, op) {
        var visited = /* @__PURE__ */ new Set();
        var rows = [];
        var cols = [];
        var vals = [];
        var operate = function(row2, col2) {
          rows.push(row2);
          cols.push(col2);
          var nextValue = op(a.get(row2, col2), b.get(row2, col2));
          vals.push(nextValue);
        };
        var valuesA = a.getValues();
        var rowsA = a.getRows();
        var colsA = a.getCols();
        for (var i = 0; i < valuesA.length; i++) {
          var row = rowsA[i];
          var col = colsA[i];
          var key = row + ":" + col;
          visited.add(key);
          operate(row, col);
        }
        var valuesB = b.getValues();
        var rowsB = b.getRows();
        var colsB = b.getCols();
        for (var i = 0; i < valuesB.length; i++) {
          var row = rowsB[i];
          var col = colsB[i];
          var key = row + ":" + col;
          if (visited.has(key))
            continue;
          operate(row, col);
        }
        var dims = [a.nRows, a.nCols];
        return new SparseMatrix(rows, cols, vals, dims);
      }
      function getCSR(x) {
        var entries = [];
        x.forEach(function(value2, row2, col2) {
          entries.push({ value: value2, row: row2, col: col2 });
        });
        entries.sort(function(a, b) {
          if (a.row === b.row) {
            return a.col - b.col;
          } else {
            return a.row - b.row;
          }
        });
        var indices = [];
        var values = [];
        var indptr = [];
        var currentRow = -1;
        for (var i = 0; i < entries.length; i++) {
          var _a2 = entries[i], row = _a2.row, col = _a2.col, value = _a2.value;
          if (row !== currentRow) {
            currentRow = row;
            indptr.push(i);
          }
          indices.push(col);
          values.push(value);
        }
        return { indices, values, indptr };
      }
      exports.getCSR = getCSR;
    }
  });

  // node_modules/umap-js/dist/tree.js
  var require_tree = __commonJS({
    "node_modules/umap-js/dist/tree.js"(exports) {
      "use strict";
      var __read = exports && exports.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
          return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"]))
              m.call(i);
          } finally {
            if (e)
              throw e.error;
          }
        }
        return ar;
      };
      var __spread = exports && exports.__spread || function() {
        for (var ar = [], i = 0; i < arguments.length; i++)
          ar = ar.concat(__read(arguments[i]));
        return ar;
      };
      var __values = exports && exports.__values || function(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
          return m.call(o);
        return {
          next: function() {
            if (o && i >= o.length)
              o = void 0;
            return { value: o && o[i++], done: !o };
          }
        };
      };
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k))
              result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var utils = __importStar(require_utils());
      var FlatTree = function() {
        function FlatTree2(hyperplanes, offsets, children, indices) {
          this.hyperplanes = hyperplanes;
          this.offsets = offsets;
          this.children = children;
          this.indices = indices;
        }
        return FlatTree2;
      }();
      exports.FlatTree = FlatTree;
      function makeForest(data, nNeighbors, nTrees, random) {
        var leafSize = Math.max(10, nNeighbors);
        var trees = utils.range(nTrees).map(function(_, i) {
          return makeTree(data, leafSize, i, random);
        });
        var forest = trees.map(function(tree) {
          return flattenTree(tree, leafSize);
        });
        return forest;
      }
      exports.makeForest = makeForest;
      function makeTree(data, leafSize, n, random) {
        if (leafSize === void 0) {
          leafSize = 30;
        }
        var indices = utils.range(data.length);
        var tree = makeEuclideanTree(data, indices, leafSize, n, random);
        return tree;
      }
      function makeEuclideanTree(data, indices, leafSize, q, random) {
        if (leafSize === void 0) {
          leafSize = 30;
        }
        if (indices.length > leafSize) {
          var splitResults = euclideanRandomProjectionSplit(data, indices, random);
          var indicesLeft = splitResults.indicesLeft, indicesRight = splitResults.indicesRight, hyperplane = splitResults.hyperplane, offset = splitResults.offset;
          var leftChild = makeEuclideanTree(data, indicesLeft, leafSize, q + 1, random);
          var rightChild = makeEuclideanTree(data, indicesRight, leafSize, q + 1, random);
          var node = { leftChild, rightChild, isLeaf: false, hyperplane, offset };
          return node;
        } else {
          var node = { indices, isLeaf: true };
          return node;
        }
      }
      function euclideanRandomProjectionSplit(data, indices, random) {
        var dim = data[0].length;
        var leftIndex = utils.tauRandInt(indices.length, random);
        var rightIndex = utils.tauRandInt(indices.length, random);
        rightIndex += leftIndex === rightIndex ? 1 : 0;
        rightIndex = rightIndex % indices.length;
        var left = indices[leftIndex];
        var right = indices[rightIndex];
        var hyperplaneOffset = 0;
        var hyperplaneVector = utils.zeros(dim);
        for (var i = 0; i < hyperplaneVector.length; i++) {
          hyperplaneVector[i] = data[left][i] - data[right][i];
          hyperplaneOffset -= hyperplaneVector[i] * (data[left][i] + data[right][i]) / 2;
        }
        var nLeft = 0;
        var nRight = 0;
        var side = utils.zeros(indices.length);
        for (var i = 0; i < indices.length; i++) {
          var margin = hyperplaneOffset;
          for (var d = 0; d < dim; d++) {
            margin += hyperplaneVector[d] * data[indices[i]][d];
          }
          if (margin === 0) {
            side[i] = utils.tauRandInt(2, random);
            if (side[i] === 0) {
              nLeft += 1;
            } else {
              nRight += 1;
            }
          } else if (margin > 0) {
            side[i] = 0;
            nLeft += 1;
          } else {
            side[i] = 1;
            nRight += 1;
          }
        }
        var indicesLeft = utils.zeros(nLeft);
        var indicesRight = utils.zeros(nRight);
        nLeft = 0;
        nRight = 0;
        for (var i = 0; i < side.length; i++) {
          if (side[i] === 0) {
            indicesLeft[nLeft] = indices[i];
            nLeft += 1;
          } else {
            indicesRight[nRight] = indices[i];
            nRight += 1;
          }
        }
        return {
          indicesLeft,
          indicesRight,
          hyperplane: hyperplaneVector,
          offset: hyperplaneOffset
        };
      }
      function flattenTree(tree, leafSize) {
        var nNodes = numNodes(tree);
        var nLeaves = numLeaves(tree);
        var hyperplanes = utils.range(nNodes).map(function() {
          return utils.zeros(tree.hyperplane ? tree.hyperplane.length : 0);
        });
        var offsets = utils.zeros(nNodes);
        var children = utils.range(nNodes).map(function() {
          return [-1, -1];
        });
        var indices = utils.range(nLeaves).map(function() {
          return utils.range(leafSize).map(function() {
            return -1;
          });
        });
        recursiveFlatten(tree, hyperplanes, offsets, children, indices, 0, 0);
        return new FlatTree(hyperplanes, offsets, children, indices);
      }
      function recursiveFlatten(tree, hyperplanes, offsets, children, indices, nodeNum, leafNum) {
        var _a;
        if (tree.isLeaf) {
          children[nodeNum][0] = -leafNum;
          (_a = indices[leafNum]).splice.apply(_a, __spread([0, tree.indices.length], tree.indices));
          leafNum += 1;
          return { nodeNum, leafNum };
        } else {
          hyperplanes[nodeNum] = tree.hyperplane;
          offsets[nodeNum] = tree.offset;
          children[nodeNum][0] = nodeNum + 1;
          var oldNodeNum = nodeNum;
          var res = recursiveFlatten(tree.leftChild, hyperplanes, offsets, children, indices, nodeNum + 1, leafNum);
          nodeNum = res.nodeNum;
          leafNum = res.leafNum;
          children[oldNodeNum][1] = nodeNum + 1;
          res = recursiveFlatten(tree.rightChild, hyperplanes, offsets, children, indices, nodeNum + 1, leafNum);
          return { nodeNum: res.nodeNum, leafNum: res.leafNum };
        }
      }
      function numNodes(tree) {
        if (tree.isLeaf) {
          return 1;
        } else {
          return 1 + numNodes(tree.leftChild) + numNodes(tree.rightChild);
        }
      }
      function numLeaves(tree) {
        if (tree.isLeaf) {
          return 1;
        } else {
          return numLeaves(tree.leftChild) + numLeaves(tree.rightChild);
        }
      }
      function makeLeafArray(rpForest) {
        var e_1, _a;
        if (rpForest.length > 0) {
          var output = [];
          try {
            for (var rpForest_1 = __values(rpForest), rpForest_1_1 = rpForest_1.next(); !rpForest_1_1.done; rpForest_1_1 = rpForest_1.next()) {
              var tree = rpForest_1_1.value;
              output.push.apply(output, __spread(tree.indices));
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (rpForest_1_1 && !rpForest_1_1.done && (_a = rpForest_1.return))
                _a.call(rpForest_1);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
          return output;
        } else {
          return [[-1]];
        }
      }
      exports.makeLeafArray = makeLeafArray;
      function selectSide(hyperplane, offset, point, random) {
        var margin = offset;
        for (var d = 0; d < point.length; d++) {
          margin += hyperplane[d] * point[d];
        }
        if (margin === 0) {
          var side = utils.tauRandInt(2, random);
          return side;
        } else if (margin > 0) {
          return 0;
        } else {
          return 1;
        }
      }
      function searchFlatTree(point, tree, random) {
        var node = 0;
        while (tree.children[node][0] > 0) {
          var side = selectSide(tree.hyperplanes[node], tree.offsets[node], point, random);
          if (side === 0) {
            node = tree.children[node][0];
          } else {
            node = tree.children[node][1];
          }
        }
        var index = -1 * tree.children[node][0];
        return tree.indices[index];
      }
      exports.searchFlatTree = searchFlatTree;
    }
  });

  // node_modules/umap-js/dist/nn_descent.js
  var require_nn_descent = __commonJS({
    "node_modules/umap-js/dist/nn_descent.js"(exports) {
      "use strict";
      var __values = exports && exports.__values || function(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
          return m.call(o);
        return {
          next: function() {
            if (o && i >= o.length)
              o = void 0;
            return { value: o && o[i++], done: !o };
          }
        };
      };
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k))
              result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var heap = __importStar(require_heap());
      var matrix = __importStar(require_matrix());
      var tree = __importStar(require_tree());
      var utils = __importStar(require_utils());
      function makeNNDescent(distanceFn, random) {
        return function nNDescent(data, leafArray, nNeighbors, nIters, maxCandidates, delta, rho, rpTreeInit) {
          if (nIters === void 0) {
            nIters = 10;
          }
          if (maxCandidates === void 0) {
            maxCandidates = 50;
          }
          if (delta === void 0) {
            delta = 1e-3;
          }
          if (rho === void 0) {
            rho = 0.5;
          }
          if (rpTreeInit === void 0) {
            rpTreeInit = true;
          }
          var nVertices = data.length;
          var currentGraph = heap.makeHeap(data.length, nNeighbors);
          for (var i = 0; i < data.length; i++) {
            var indices = heap.rejectionSample(nNeighbors, data.length, random);
            for (var j = 0; j < indices.length; j++) {
              var d = distanceFn(data[i], data[indices[j]]);
              heap.heapPush(currentGraph, i, d, indices[j], 1);
              heap.heapPush(currentGraph, indices[j], d, i, 1);
            }
          }
          if (rpTreeInit) {
            for (var n = 0; n < leafArray.length; n++) {
              for (var i = 0; i < leafArray[n].length; i++) {
                if (leafArray[n][i] < 0) {
                  break;
                }
                for (var j = i + 1; j < leafArray[n].length; j++) {
                  if (leafArray[n][j] < 0) {
                    break;
                  }
                  var d = distanceFn(data[leafArray[n][i]], data[leafArray[n][j]]);
                  heap.heapPush(currentGraph, leafArray[n][i], d, leafArray[n][j], 1);
                  heap.heapPush(currentGraph, leafArray[n][j], d, leafArray[n][i], 1);
                }
              }
            }
          }
          for (var n = 0; n < nIters; n++) {
            var candidateNeighbors = heap.buildCandidates(currentGraph, nVertices, nNeighbors, maxCandidates, random);
            var c = 0;
            for (var i = 0; i < nVertices; i++) {
              for (var j = 0; j < maxCandidates; j++) {
                var p = Math.floor(candidateNeighbors[0][i][j]);
                if (p < 0 || utils.tauRand(random) < rho) {
                  continue;
                }
                for (var k = 0; k < maxCandidates; k++) {
                  var q = Math.floor(candidateNeighbors[0][i][k]);
                  var cj = candidateNeighbors[2][i][j];
                  var ck = candidateNeighbors[2][i][k];
                  if (q < 0 || !cj && !ck) {
                    continue;
                  }
                  var d = distanceFn(data[p], data[q]);
                  c += heap.heapPush(currentGraph, p, d, q, 1);
                  c += heap.heapPush(currentGraph, q, d, p, 1);
                }
              }
            }
            if (c <= delta * nNeighbors * data.length) {
              break;
            }
          }
          var sorted = heap.deheapSort(currentGraph);
          return sorted;
        };
      }
      exports.makeNNDescent = makeNNDescent;
      function makeInitializations(distanceFn) {
        function initFromRandom(nNeighbors, data, queryPoints, _heap, random) {
          for (var i = 0; i < queryPoints.length; i++) {
            var indices = utils.rejectionSample(nNeighbors, data.length, random);
            for (var j = 0; j < indices.length; j++) {
              if (indices[j] < 0) {
                continue;
              }
              var d = distanceFn(data[indices[j]], queryPoints[i]);
              heap.heapPush(_heap, i, d, indices[j], 1);
            }
          }
        }
        function initFromTree(_tree, data, queryPoints, _heap, random) {
          for (var i = 0; i < queryPoints.length; i++) {
            var indices = tree.searchFlatTree(queryPoints[i], _tree, random);
            for (var j = 0; j < indices.length; j++) {
              if (indices[j] < 0) {
                return;
              }
              var d = distanceFn(data[indices[j]], queryPoints[i]);
              heap.heapPush(_heap, i, d, indices[j], 1);
            }
          }
          return;
        }
        return { initFromRandom, initFromTree };
      }
      exports.makeInitializations = makeInitializations;
      function makeInitializedNNSearch(distanceFn) {
        return function nnSearchFn(data, graph, initialization, queryPoints) {
          var e_1, _a;
          var _b = matrix.getCSR(graph), indices = _b.indices, indptr = _b.indptr;
          for (var i = 0; i < queryPoints.length; i++) {
            var tried = new Set(initialization[0][i]);
            while (true) {
              var vertex = heap.smallestFlagged(initialization, i);
              if (vertex === -1) {
                break;
              }
              var candidates = indices.slice(indptr[vertex], indptr[vertex + 1]);
              try {
                for (var candidates_1 = __values(candidates), candidates_1_1 = candidates_1.next(); !candidates_1_1.done; candidates_1_1 = candidates_1.next()) {
                  var candidate = candidates_1_1.value;
                  if (candidate === vertex || candidate === -1 || tried.has(candidate)) {
                    continue;
                  }
                  var d = distanceFn(data[candidate], queryPoints[i]);
                  heap.uncheckedHeapPush(initialization, i, d, candidate, 1);
                  tried.add(candidate);
                }
              } catch (e_1_1) {
                e_1 = { error: e_1_1 };
              } finally {
                try {
                  if (candidates_1_1 && !candidates_1_1.done && (_a = candidates_1.return))
                    _a.call(candidates_1);
                } finally {
                  if (e_1)
                    throw e_1.error;
                }
              }
            }
          }
          return initialization;
        };
      }
      exports.makeInitializedNNSearch = makeInitializedNNSearch;
      function initializeSearch(forest, data, queryPoints, nNeighbors, initFromRandom, initFromTree, random) {
        var e_2, _a;
        var results = heap.makeHeap(queryPoints.length, nNeighbors);
        initFromRandom(nNeighbors, data, queryPoints, results, random);
        if (forest) {
          try {
            for (var forest_1 = __values(forest), forest_1_1 = forest_1.next(); !forest_1_1.done; forest_1_1 = forest_1.next()) {
              var tree_1 = forest_1_1.value;
              initFromTree(tree_1, data, queryPoints, results, random);
            }
          } catch (e_2_1) {
            e_2 = { error: e_2_1 };
          } finally {
            try {
              if (forest_1_1 && !forest_1_1.done && (_a = forest_1.return))
                _a.call(forest_1);
            } finally {
              if (e_2)
                throw e_2.error;
            }
          }
        }
        return results;
      }
      exports.initializeSearch = initializeSearch;
    }
  });

  // node_modules/ml-levenberg-marquardt/node_modules/is-any-array/lib/index.js
  var require_lib = __commonJS({
    "node_modules/ml-levenberg-marquardt/node_modules/is-any-array/lib/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var toString = Object.prototype.toString;
      function isAnyArray(object) {
        return toString.call(object).endsWith("Array]");
      }
      exports.default = isAnyArray;
    }
  });

  // node_modules/is-any-array/lib/index.js
  var require_lib2 = __commonJS({
    "node_modules/is-any-array/lib/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isAnyArray = void 0;
      var toString = Object.prototype.toString;
      function isAnyArray(value) {
        return toString.call(value).endsWith("Array]");
      }
      exports.isAnyArray = isAnyArray;
    }
  });

  // node_modules/ml-array-max/lib/index.js
  var require_lib3 = __commonJS({
    "node_modules/ml-array-max/lib/index.js"(exports, module) {
      "use strict";
      var isAnyArray = require_lib2();
      function max(input, options = {}) {
        if (!isAnyArray.isAnyArray(input)) {
          throw new TypeError("input must be an array");
        }
        if (input.length === 0) {
          throw new TypeError("input must not be empty");
        }
        const { fromIndex = 0, toIndex = input.length } = options;
        if (fromIndex < 0 || fromIndex >= input.length || !Number.isInteger(fromIndex)) {
          throw new Error("fromIndex must be a positive integer smaller than length");
        }
        if (toIndex <= fromIndex || toIndex > input.length || !Number.isInteger(toIndex)) {
          throw new Error("toIndex must be an integer greater than fromIndex and at most equal to length");
        }
        let maxValue = input[fromIndex];
        for (let i = fromIndex + 1; i < toIndex; i++) {
          if (input[i] > maxValue)
            maxValue = input[i];
        }
        return maxValue;
      }
      module.exports = max;
    }
  });

  // node_modules/ml-array-min/lib/index.js
  var require_lib4 = __commonJS({
    "node_modules/ml-array-min/lib/index.js"(exports, module) {
      "use strict";
      var isAnyArray = require_lib2();
      function min(input, options = {}) {
        if (!isAnyArray.isAnyArray(input)) {
          throw new TypeError("input must be an array");
        }
        if (input.length === 0) {
          throw new TypeError("input must not be empty");
        }
        const { fromIndex = 0, toIndex = input.length } = options;
        if (fromIndex < 0 || fromIndex >= input.length || !Number.isInteger(fromIndex)) {
          throw new Error("fromIndex must be a positive integer smaller than length");
        }
        if (toIndex <= fromIndex || toIndex > input.length || !Number.isInteger(toIndex)) {
          throw new Error("toIndex must be an integer greater than fromIndex and at most equal to length");
        }
        let minValue = input[fromIndex];
        for (let i = fromIndex + 1; i < toIndex; i++) {
          if (input[i] < minValue)
            minValue = input[i];
        }
        return minValue;
      }
      module.exports = min;
    }
  });

  // node_modules/ml-array-rescale/lib/index.js
  var require_lib5 = __commonJS({
    "node_modules/ml-array-rescale/lib/index.js"(exports, module) {
      "use strict";
      var isAnyArray = require_lib2();
      var max = require_lib3();
      var min = require_lib4();
      function _interopDefaultLegacy(e) {
        return e && typeof e === "object" && "default" in e ? e : { "default": e };
      }
      var max__default = /* @__PURE__ */ _interopDefaultLegacy(max);
      var min__default = /* @__PURE__ */ _interopDefaultLegacy(min);
      function rescale(input, options = {}) {
        if (!isAnyArray.isAnyArray(input)) {
          throw new TypeError("input must be an array");
        } else if (input.length === 0) {
          throw new TypeError("input must not be empty");
        }
        let output;
        if (options.output !== void 0) {
          if (!isAnyArray.isAnyArray(options.output)) {
            throw new TypeError("output option must be an array if specified");
          }
          output = options.output;
        } else {
          output = new Array(input.length);
        }
        const currentMin = min__default["default"](input);
        const currentMax = max__default["default"](input);
        if (currentMin === currentMax) {
          throw new RangeError("minimum and maximum input values are equal. Cannot rescale a constant array");
        }
        const {
          min: minValue = options.autoMinMax ? currentMin : 0,
          max: maxValue = options.autoMinMax ? currentMax : 1
        } = options;
        if (minValue >= maxValue) {
          throw new RangeError("min option must be smaller than max option");
        }
        const factor = (maxValue - minValue) / (currentMax - currentMin);
        for (let i = 0; i < input.length; i++) {
          output[i] = (input[i] - currentMin) * factor + minValue;
        }
        return output;
      }
      module.exports = rescale;
    }
  });

  // node_modules/ml-matrix/matrix.js
  var require_matrix2 = __commonJS({
    "node_modules/ml-matrix/matrix.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var rescale = require_lib5();
      function _interopDefaultLegacy(e) {
        return e && typeof e === "object" && "default" in e ? e : { "default": e };
      }
      var rescale__default = /* @__PURE__ */ _interopDefaultLegacy(rescale);
      var indent = " ".repeat(2);
      var indentData = " ".repeat(4);
      function inspectMatrix() {
        return inspectMatrixWithOptions(this);
      }
      function inspectMatrixWithOptions(matrix, options = {}) {
        const { maxRows = 15, maxColumns = 10, maxNumSize = 8 } = options;
        return `${matrix.constructor.name} {
${indent}[
${indentData}${inspectData(matrix, maxRows, maxColumns, maxNumSize)}
${indent}]
${indent}rows: ${matrix.rows}
${indent}columns: ${matrix.columns}
}`;
      }
      function inspectData(matrix, maxRows, maxColumns, maxNumSize) {
        const { rows, columns } = matrix;
        const maxI = Math.min(rows, maxRows);
        const maxJ = Math.min(columns, maxColumns);
        const result = [];
        for (let i = 0; i < maxI; i++) {
          let line = [];
          for (let j = 0; j < maxJ; j++) {
            line.push(formatNumber(matrix.get(i, j), maxNumSize));
          }
          result.push(`${line.join(" ")}`);
        }
        if (maxJ !== columns) {
          result[result.length - 1] += ` ... ${columns - maxColumns} more columns`;
        }
        if (maxI !== rows) {
          result.push(`... ${rows - maxRows} more rows`);
        }
        return result.join(`
${indentData}`);
      }
      function formatNumber(num, maxNumSize) {
        const numStr = String(num);
        if (numStr.length <= maxNumSize) {
          return numStr.padEnd(maxNumSize, " ");
        }
        const precise = num.toPrecision(maxNumSize - 2);
        if (precise.length <= maxNumSize) {
          return precise;
        }
        const exponential = num.toExponential(maxNumSize - 2);
        const eIndex = exponential.indexOf("e");
        const e = exponential.slice(eIndex);
        return exponential.slice(0, maxNumSize - e.length) + e;
      }
      function installMathOperations(AbstractMatrix2, Matrix2) {
        AbstractMatrix2.prototype.add = function add(value) {
          if (typeof value === "number")
            return this.addS(value);
          return this.addM(value);
        };
        AbstractMatrix2.prototype.addS = function addS(value) {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, this.get(i, j) + value);
            }
          }
          return this;
        };
        AbstractMatrix2.prototype.addM = function addM(matrix) {
          matrix = Matrix2.checkMatrix(matrix);
          if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
            throw new RangeError("Matrices dimensions must be equal");
          }
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, this.get(i, j) + matrix.get(i, j));
            }
          }
          return this;
        };
        AbstractMatrix2.add = function add(matrix, value) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.add(value);
        };
        AbstractMatrix2.prototype.sub = function sub(value) {
          if (typeof value === "number")
            return this.subS(value);
          return this.subM(value);
        };
        AbstractMatrix2.prototype.subS = function subS(value) {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, this.get(i, j) - value);
            }
          }
          return this;
        };
        AbstractMatrix2.prototype.subM = function subM(matrix) {
          matrix = Matrix2.checkMatrix(matrix);
          if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
            throw new RangeError("Matrices dimensions must be equal");
          }
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, this.get(i, j) - matrix.get(i, j));
            }
          }
          return this;
        };
        AbstractMatrix2.sub = function sub(matrix, value) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.sub(value);
        };
        AbstractMatrix2.prototype.subtract = AbstractMatrix2.prototype.sub;
        AbstractMatrix2.prototype.subtractS = AbstractMatrix2.prototype.subS;
        AbstractMatrix2.prototype.subtractM = AbstractMatrix2.prototype.subM;
        AbstractMatrix2.subtract = AbstractMatrix2.sub;
        AbstractMatrix2.prototype.mul = function mul(value) {
          if (typeof value === "number")
            return this.mulS(value);
          return this.mulM(value);
        };
        AbstractMatrix2.prototype.mulS = function mulS(value) {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, this.get(i, j) * value);
            }
          }
          return this;
        };
        AbstractMatrix2.prototype.mulM = function mulM(matrix) {
          matrix = Matrix2.checkMatrix(matrix);
          if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
            throw new RangeError("Matrices dimensions must be equal");
          }
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, this.get(i, j) * matrix.get(i, j));
            }
          }
          return this;
        };
        AbstractMatrix2.mul = function mul(matrix, value) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.mul(value);
        };
        AbstractMatrix2.prototype.multiply = AbstractMatrix2.prototype.mul;
        AbstractMatrix2.prototype.multiplyS = AbstractMatrix2.prototype.mulS;
        AbstractMatrix2.prototype.multiplyM = AbstractMatrix2.prototype.mulM;
        AbstractMatrix2.multiply = AbstractMatrix2.mul;
        AbstractMatrix2.prototype.div = function div(value) {
          if (typeof value === "number")
            return this.divS(value);
          return this.divM(value);
        };
        AbstractMatrix2.prototype.divS = function divS(value) {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, this.get(i, j) / value);
            }
          }
          return this;
        };
        AbstractMatrix2.prototype.divM = function divM(matrix) {
          matrix = Matrix2.checkMatrix(matrix);
          if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
            throw new RangeError("Matrices dimensions must be equal");
          }
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, this.get(i, j) / matrix.get(i, j));
            }
          }
          return this;
        };
        AbstractMatrix2.div = function div(matrix, value) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.div(value);
        };
        AbstractMatrix2.prototype.divide = AbstractMatrix2.prototype.div;
        AbstractMatrix2.prototype.divideS = AbstractMatrix2.prototype.divS;
        AbstractMatrix2.prototype.divideM = AbstractMatrix2.prototype.divM;
        AbstractMatrix2.divide = AbstractMatrix2.div;
        AbstractMatrix2.prototype.mod = function mod(value) {
          if (typeof value === "number")
            return this.modS(value);
          return this.modM(value);
        };
        AbstractMatrix2.prototype.modS = function modS(value) {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, this.get(i, j) % value);
            }
          }
          return this;
        };
        AbstractMatrix2.prototype.modM = function modM(matrix) {
          matrix = Matrix2.checkMatrix(matrix);
          if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
            throw new RangeError("Matrices dimensions must be equal");
          }
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, this.get(i, j) % matrix.get(i, j));
            }
          }
          return this;
        };
        AbstractMatrix2.mod = function mod(matrix, value) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.mod(value);
        };
        AbstractMatrix2.prototype.modulus = AbstractMatrix2.prototype.mod;
        AbstractMatrix2.prototype.modulusS = AbstractMatrix2.prototype.modS;
        AbstractMatrix2.prototype.modulusM = AbstractMatrix2.prototype.modM;
        AbstractMatrix2.modulus = AbstractMatrix2.mod;
        AbstractMatrix2.prototype.and = function and(value) {
          if (typeof value === "number")
            return this.andS(value);
          return this.andM(value);
        };
        AbstractMatrix2.prototype.andS = function andS(value) {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, this.get(i, j) & value);
            }
          }
          return this;
        };
        AbstractMatrix2.prototype.andM = function andM(matrix) {
          matrix = Matrix2.checkMatrix(matrix);
          if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
            throw new RangeError("Matrices dimensions must be equal");
          }
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, this.get(i, j) & matrix.get(i, j));
            }
          }
          return this;
        };
        AbstractMatrix2.and = function and(matrix, value) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.and(value);
        };
        AbstractMatrix2.prototype.or = function or(value) {
          if (typeof value === "number")
            return this.orS(value);
          return this.orM(value);
        };
        AbstractMatrix2.prototype.orS = function orS(value) {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, this.get(i, j) | value);
            }
          }
          return this;
        };
        AbstractMatrix2.prototype.orM = function orM(matrix) {
          matrix = Matrix2.checkMatrix(matrix);
          if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
            throw new RangeError("Matrices dimensions must be equal");
          }
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, this.get(i, j) | matrix.get(i, j));
            }
          }
          return this;
        };
        AbstractMatrix2.or = function or(matrix, value) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.or(value);
        };
        AbstractMatrix2.prototype.xor = function xor(value) {
          if (typeof value === "number")
            return this.xorS(value);
          return this.xorM(value);
        };
        AbstractMatrix2.prototype.xorS = function xorS(value) {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, this.get(i, j) ^ value);
            }
          }
          return this;
        };
        AbstractMatrix2.prototype.xorM = function xorM(matrix) {
          matrix = Matrix2.checkMatrix(matrix);
          if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
            throw new RangeError("Matrices dimensions must be equal");
          }
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, this.get(i, j) ^ matrix.get(i, j));
            }
          }
          return this;
        };
        AbstractMatrix2.xor = function xor(matrix, value) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.xor(value);
        };
        AbstractMatrix2.prototype.leftShift = function leftShift(value) {
          if (typeof value === "number")
            return this.leftShiftS(value);
          return this.leftShiftM(value);
        };
        AbstractMatrix2.prototype.leftShiftS = function leftShiftS(value) {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, this.get(i, j) << value);
            }
          }
          return this;
        };
        AbstractMatrix2.prototype.leftShiftM = function leftShiftM(matrix) {
          matrix = Matrix2.checkMatrix(matrix);
          if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
            throw new RangeError("Matrices dimensions must be equal");
          }
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, this.get(i, j) << matrix.get(i, j));
            }
          }
          return this;
        };
        AbstractMatrix2.leftShift = function leftShift(matrix, value) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.leftShift(value);
        };
        AbstractMatrix2.prototype.signPropagatingRightShift = function signPropagatingRightShift(value) {
          if (typeof value === "number")
            return this.signPropagatingRightShiftS(value);
          return this.signPropagatingRightShiftM(value);
        };
        AbstractMatrix2.prototype.signPropagatingRightShiftS = function signPropagatingRightShiftS(value) {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, this.get(i, j) >> value);
            }
          }
          return this;
        };
        AbstractMatrix2.prototype.signPropagatingRightShiftM = function signPropagatingRightShiftM(matrix) {
          matrix = Matrix2.checkMatrix(matrix);
          if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
            throw new RangeError("Matrices dimensions must be equal");
          }
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, this.get(i, j) >> matrix.get(i, j));
            }
          }
          return this;
        };
        AbstractMatrix2.signPropagatingRightShift = function signPropagatingRightShift(matrix, value) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.signPropagatingRightShift(value);
        };
        AbstractMatrix2.prototype.rightShift = function rightShift(value) {
          if (typeof value === "number")
            return this.rightShiftS(value);
          return this.rightShiftM(value);
        };
        AbstractMatrix2.prototype.rightShiftS = function rightShiftS(value) {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, this.get(i, j) >>> value);
            }
          }
          return this;
        };
        AbstractMatrix2.prototype.rightShiftM = function rightShiftM(matrix) {
          matrix = Matrix2.checkMatrix(matrix);
          if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
            throw new RangeError("Matrices dimensions must be equal");
          }
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, this.get(i, j) >>> matrix.get(i, j));
            }
          }
          return this;
        };
        AbstractMatrix2.rightShift = function rightShift(matrix, value) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.rightShift(value);
        };
        AbstractMatrix2.prototype.zeroFillRightShift = AbstractMatrix2.prototype.rightShift;
        AbstractMatrix2.prototype.zeroFillRightShiftS = AbstractMatrix2.prototype.rightShiftS;
        AbstractMatrix2.prototype.zeroFillRightShiftM = AbstractMatrix2.prototype.rightShiftM;
        AbstractMatrix2.zeroFillRightShift = AbstractMatrix2.rightShift;
        AbstractMatrix2.prototype.not = function not() {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, ~this.get(i, j));
            }
          }
          return this;
        };
        AbstractMatrix2.not = function not(matrix) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.not();
        };
        AbstractMatrix2.prototype.abs = function abs() {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.abs(this.get(i, j)));
            }
          }
          return this;
        };
        AbstractMatrix2.abs = function abs(matrix) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.abs();
        };
        AbstractMatrix2.prototype.acos = function acos() {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.acos(this.get(i, j)));
            }
          }
          return this;
        };
        AbstractMatrix2.acos = function acos(matrix) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.acos();
        };
        AbstractMatrix2.prototype.acosh = function acosh() {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.acosh(this.get(i, j)));
            }
          }
          return this;
        };
        AbstractMatrix2.acosh = function acosh(matrix) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.acosh();
        };
        AbstractMatrix2.prototype.asin = function asin() {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.asin(this.get(i, j)));
            }
          }
          return this;
        };
        AbstractMatrix2.asin = function asin(matrix) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.asin();
        };
        AbstractMatrix2.prototype.asinh = function asinh() {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.asinh(this.get(i, j)));
            }
          }
          return this;
        };
        AbstractMatrix2.asinh = function asinh(matrix) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.asinh();
        };
        AbstractMatrix2.prototype.atan = function atan() {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.atan(this.get(i, j)));
            }
          }
          return this;
        };
        AbstractMatrix2.atan = function atan(matrix) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.atan();
        };
        AbstractMatrix2.prototype.atanh = function atanh() {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.atanh(this.get(i, j)));
            }
          }
          return this;
        };
        AbstractMatrix2.atanh = function atanh(matrix) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.atanh();
        };
        AbstractMatrix2.prototype.cbrt = function cbrt() {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.cbrt(this.get(i, j)));
            }
          }
          return this;
        };
        AbstractMatrix2.cbrt = function cbrt(matrix) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.cbrt();
        };
        AbstractMatrix2.prototype.ceil = function ceil() {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.ceil(this.get(i, j)));
            }
          }
          return this;
        };
        AbstractMatrix2.ceil = function ceil(matrix) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.ceil();
        };
        AbstractMatrix2.prototype.clz32 = function clz32() {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.clz32(this.get(i, j)));
            }
          }
          return this;
        };
        AbstractMatrix2.clz32 = function clz32(matrix) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.clz32();
        };
        AbstractMatrix2.prototype.cos = function cos() {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.cos(this.get(i, j)));
            }
          }
          return this;
        };
        AbstractMatrix2.cos = function cos(matrix) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.cos();
        };
        AbstractMatrix2.prototype.cosh = function cosh() {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.cosh(this.get(i, j)));
            }
          }
          return this;
        };
        AbstractMatrix2.cosh = function cosh(matrix) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.cosh();
        };
        AbstractMatrix2.prototype.exp = function exp() {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.exp(this.get(i, j)));
            }
          }
          return this;
        };
        AbstractMatrix2.exp = function exp(matrix) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.exp();
        };
        AbstractMatrix2.prototype.expm1 = function expm1() {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.expm1(this.get(i, j)));
            }
          }
          return this;
        };
        AbstractMatrix2.expm1 = function expm1(matrix) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.expm1();
        };
        AbstractMatrix2.prototype.floor = function floor() {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.floor(this.get(i, j)));
            }
          }
          return this;
        };
        AbstractMatrix2.floor = function floor(matrix) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.floor();
        };
        AbstractMatrix2.prototype.fround = function fround() {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.fround(this.get(i, j)));
            }
          }
          return this;
        };
        AbstractMatrix2.fround = function fround(matrix) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.fround();
        };
        AbstractMatrix2.prototype.log = function log() {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.log(this.get(i, j)));
            }
          }
          return this;
        };
        AbstractMatrix2.log = function log(matrix) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.log();
        };
        AbstractMatrix2.prototype.log1p = function log1p() {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.log1p(this.get(i, j)));
            }
          }
          return this;
        };
        AbstractMatrix2.log1p = function log1p(matrix) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.log1p();
        };
        AbstractMatrix2.prototype.log10 = function log10() {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.log10(this.get(i, j)));
            }
          }
          return this;
        };
        AbstractMatrix2.log10 = function log10(matrix) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.log10();
        };
        AbstractMatrix2.prototype.log2 = function log2() {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.log2(this.get(i, j)));
            }
          }
          return this;
        };
        AbstractMatrix2.log2 = function log2(matrix) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.log2();
        };
        AbstractMatrix2.prototype.round = function round() {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.round(this.get(i, j)));
            }
          }
          return this;
        };
        AbstractMatrix2.round = function round(matrix) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.round();
        };
        AbstractMatrix2.prototype.sign = function sign() {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.sign(this.get(i, j)));
            }
          }
          return this;
        };
        AbstractMatrix2.sign = function sign(matrix) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.sign();
        };
        AbstractMatrix2.prototype.sin = function sin() {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.sin(this.get(i, j)));
            }
          }
          return this;
        };
        AbstractMatrix2.sin = function sin(matrix) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.sin();
        };
        AbstractMatrix2.prototype.sinh = function sinh() {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.sinh(this.get(i, j)));
            }
          }
          return this;
        };
        AbstractMatrix2.sinh = function sinh(matrix) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.sinh();
        };
        AbstractMatrix2.prototype.sqrt = function sqrt() {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.sqrt(this.get(i, j)));
            }
          }
          return this;
        };
        AbstractMatrix2.sqrt = function sqrt(matrix) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.sqrt();
        };
        AbstractMatrix2.prototype.tan = function tan() {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.tan(this.get(i, j)));
            }
          }
          return this;
        };
        AbstractMatrix2.tan = function tan(matrix) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.tan();
        };
        AbstractMatrix2.prototype.tanh = function tanh() {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.tanh(this.get(i, j)));
            }
          }
          return this;
        };
        AbstractMatrix2.tanh = function tanh(matrix) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.tanh();
        };
        AbstractMatrix2.prototype.trunc = function trunc() {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.trunc(this.get(i, j)));
            }
          }
          return this;
        };
        AbstractMatrix2.trunc = function trunc(matrix) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.trunc();
        };
        AbstractMatrix2.pow = function pow(matrix, arg0) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.pow(arg0);
        };
        AbstractMatrix2.prototype.pow = function pow(value) {
          if (typeof value === "number")
            return this.powS(value);
          return this.powM(value);
        };
        AbstractMatrix2.prototype.powS = function powS(value) {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.pow(this.get(i, j), value));
            }
          }
          return this;
        };
        AbstractMatrix2.prototype.powM = function powM(matrix) {
          matrix = Matrix2.checkMatrix(matrix);
          if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
            throw new RangeError("Matrices dimensions must be equal");
          }
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.pow(this.get(i, j), matrix.get(i, j)));
            }
          }
          return this;
        };
      }
      function checkRowIndex(matrix, index, outer) {
        let max = outer ? matrix.rows : matrix.rows - 1;
        if (index < 0 || index > max) {
          throw new RangeError("Row index out of range");
        }
      }
      function checkColumnIndex(matrix, index, outer) {
        let max = outer ? matrix.columns : matrix.columns - 1;
        if (index < 0 || index > max) {
          throw new RangeError("Column index out of range");
        }
      }
      function checkRowVector(matrix, vector) {
        if (vector.to1DArray) {
          vector = vector.to1DArray();
        }
        if (vector.length !== matrix.columns) {
          throw new RangeError("vector size must be the same as the number of columns");
        }
        return vector;
      }
      function checkColumnVector(matrix, vector) {
        if (vector.to1DArray) {
          vector = vector.to1DArray();
        }
        if (vector.length !== matrix.rows) {
          throw new RangeError("vector size must be the same as the number of rows");
        }
        return vector;
      }
      function checkIndices(matrix, rowIndices, columnIndices) {
        return {
          row: checkRowIndices(matrix, rowIndices),
          column: checkColumnIndices(matrix, columnIndices)
        };
      }
      function checkRowIndices(matrix, rowIndices) {
        if (typeof rowIndices !== "object") {
          throw new TypeError("unexpected type for row indices");
        }
        let rowOut = rowIndices.some((r) => {
          return r < 0 || r >= matrix.rows;
        });
        if (rowOut) {
          throw new RangeError("row indices are out of range");
        }
        if (!Array.isArray(rowIndices))
          rowIndices = Array.from(rowIndices);
        return rowIndices;
      }
      function checkColumnIndices(matrix, columnIndices) {
        if (typeof columnIndices !== "object") {
          throw new TypeError("unexpected type for column indices");
        }
        let columnOut = columnIndices.some((c) => {
          return c < 0 || c >= matrix.columns;
        });
        if (columnOut) {
          throw new RangeError("column indices are out of range");
        }
        if (!Array.isArray(columnIndices))
          columnIndices = Array.from(columnIndices);
        return columnIndices;
      }
      function checkRange(matrix, startRow, endRow, startColumn, endColumn) {
        if (arguments.length !== 5) {
          throw new RangeError("expected 4 arguments");
        }
        checkNumber("startRow", startRow);
        checkNumber("endRow", endRow);
        checkNumber("startColumn", startColumn);
        checkNumber("endColumn", endColumn);
        if (startRow > endRow || startColumn > endColumn || startRow < 0 || startRow >= matrix.rows || endRow < 0 || endRow >= matrix.rows || startColumn < 0 || startColumn >= matrix.columns || endColumn < 0 || endColumn >= matrix.columns) {
          throw new RangeError("Submatrix indices are out of range");
        }
      }
      function newArray(length, value = 0) {
        let array = [];
        for (let i = 0; i < length; i++) {
          array.push(value);
        }
        return array;
      }
      function checkNumber(name, value) {
        if (typeof value !== "number") {
          throw new TypeError(`${name} must be a number`);
        }
      }
      function checkNonEmpty(matrix) {
        if (matrix.isEmpty()) {
          throw new Error("Empty matrix has no elements to index");
        }
      }
      function sumByRow(matrix) {
        let sum = newArray(matrix.rows);
        for (let i = 0; i < matrix.rows; ++i) {
          for (let j = 0; j < matrix.columns; ++j) {
            sum[i] += matrix.get(i, j);
          }
        }
        return sum;
      }
      function sumByColumn(matrix) {
        let sum = newArray(matrix.columns);
        for (let i = 0; i < matrix.rows; ++i) {
          for (let j = 0; j < matrix.columns; ++j) {
            sum[j] += matrix.get(i, j);
          }
        }
        return sum;
      }
      function sumAll(matrix) {
        let v = 0;
        for (let i = 0; i < matrix.rows; i++) {
          for (let j = 0; j < matrix.columns; j++) {
            v += matrix.get(i, j);
          }
        }
        return v;
      }
      function productByRow(matrix) {
        let sum = newArray(matrix.rows, 1);
        for (let i = 0; i < matrix.rows; ++i) {
          for (let j = 0; j < matrix.columns; ++j) {
            sum[i] *= matrix.get(i, j);
          }
        }
        return sum;
      }
      function productByColumn(matrix) {
        let sum = newArray(matrix.columns, 1);
        for (let i = 0; i < matrix.rows; ++i) {
          for (let j = 0; j < matrix.columns; ++j) {
            sum[j] *= matrix.get(i, j);
          }
        }
        return sum;
      }
      function productAll(matrix) {
        let v = 1;
        for (let i = 0; i < matrix.rows; i++) {
          for (let j = 0; j < matrix.columns; j++) {
            v *= matrix.get(i, j);
          }
        }
        return v;
      }
      function varianceByRow(matrix, unbiased, mean) {
        const rows = matrix.rows;
        const cols = matrix.columns;
        const variance = [];
        for (let i = 0; i < rows; i++) {
          let sum1 = 0;
          let sum2 = 0;
          let x = 0;
          for (let j = 0; j < cols; j++) {
            x = matrix.get(i, j) - mean[i];
            sum1 += x;
            sum2 += x * x;
          }
          if (unbiased) {
            variance.push((sum2 - sum1 * sum1 / cols) / (cols - 1));
          } else {
            variance.push((sum2 - sum1 * sum1 / cols) / cols);
          }
        }
        return variance;
      }
      function varianceByColumn(matrix, unbiased, mean) {
        const rows = matrix.rows;
        const cols = matrix.columns;
        const variance = [];
        for (let j = 0; j < cols; j++) {
          let sum1 = 0;
          let sum2 = 0;
          let x = 0;
          for (let i = 0; i < rows; i++) {
            x = matrix.get(i, j) - mean[j];
            sum1 += x;
            sum2 += x * x;
          }
          if (unbiased) {
            variance.push((sum2 - sum1 * sum1 / rows) / (rows - 1));
          } else {
            variance.push((sum2 - sum1 * sum1 / rows) / rows);
          }
        }
        return variance;
      }
      function varianceAll(matrix, unbiased, mean) {
        const rows = matrix.rows;
        const cols = matrix.columns;
        const size = rows * cols;
        let sum1 = 0;
        let sum2 = 0;
        let x = 0;
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            x = matrix.get(i, j) - mean;
            sum1 += x;
            sum2 += x * x;
          }
        }
        if (unbiased) {
          return (sum2 - sum1 * sum1 / size) / (size - 1);
        } else {
          return (sum2 - sum1 * sum1 / size) / size;
        }
      }
      function centerByRow(matrix, mean) {
        for (let i = 0; i < matrix.rows; i++) {
          for (let j = 0; j < matrix.columns; j++) {
            matrix.set(i, j, matrix.get(i, j) - mean[i]);
          }
        }
      }
      function centerByColumn(matrix, mean) {
        for (let i = 0; i < matrix.rows; i++) {
          for (let j = 0; j < matrix.columns; j++) {
            matrix.set(i, j, matrix.get(i, j) - mean[j]);
          }
        }
      }
      function centerAll(matrix, mean) {
        for (let i = 0; i < matrix.rows; i++) {
          for (let j = 0; j < matrix.columns; j++) {
            matrix.set(i, j, matrix.get(i, j) - mean);
          }
        }
      }
      function getScaleByRow(matrix) {
        const scale = [];
        for (let i = 0; i < matrix.rows; i++) {
          let sum = 0;
          for (let j = 0; j < matrix.columns; j++) {
            sum += Math.pow(matrix.get(i, j), 2) / (matrix.columns - 1);
          }
          scale.push(Math.sqrt(sum));
        }
        return scale;
      }
      function scaleByRow(matrix, scale) {
        for (let i = 0; i < matrix.rows; i++) {
          for (let j = 0; j < matrix.columns; j++) {
            matrix.set(i, j, matrix.get(i, j) / scale[i]);
          }
        }
      }
      function getScaleByColumn(matrix) {
        const scale = [];
        for (let j = 0; j < matrix.columns; j++) {
          let sum = 0;
          for (let i = 0; i < matrix.rows; i++) {
            sum += Math.pow(matrix.get(i, j), 2) / (matrix.rows - 1);
          }
          scale.push(Math.sqrt(sum));
        }
        return scale;
      }
      function scaleByColumn(matrix, scale) {
        for (let i = 0; i < matrix.rows; i++) {
          for (let j = 0; j < matrix.columns; j++) {
            matrix.set(i, j, matrix.get(i, j) / scale[j]);
          }
        }
      }
      function getScaleAll(matrix) {
        const divider = matrix.size - 1;
        let sum = 0;
        for (let j = 0; j < matrix.columns; j++) {
          for (let i = 0; i < matrix.rows; i++) {
            sum += Math.pow(matrix.get(i, j), 2) / divider;
          }
        }
        return Math.sqrt(sum);
      }
      function scaleAll(matrix, scale) {
        for (let i = 0; i < matrix.rows; i++) {
          for (let j = 0; j < matrix.columns; j++) {
            matrix.set(i, j, matrix.get(i, j) / scale);
          }
        }
      }
      var AbstractMatrix = class {
        static from1DArray(newRows, newColumns, newData) {
          let length = newRows * newColumns;
          if (length !== newData.length) {
            throw new RangeError("data length does not match given dimensions");
          }
          let newMatrix = new Matrix(newRows, newColumns);
          for (let row = 0; row < newRows; row++) {
            for (let column = 0; column < newColumns; column++) {
              newMatrix.set(row, column, newData[row * newColumns + column]);
            }
          }
          return newMatrix;
        }
        static rowVector(newData) {
          let vector = new Matrix(1, newData.length);
          for (let i = 0; i < newData.length; i++) {
            vector.set(0, i, newData[i]);
          }
          return vector;
        }
        static columnVector(newData) {
          let vector = new Matrix(newData.length, 1);
          for (let i = 0; i < newData.length; i++) {
            vector.set(i, 0, newData[i]);
          }
          return vector;
        }
        static zeros(rows, columns) {
          return new Matrix(rows, columns);
        }
        static ones(rows, columns) {
          return new Matrix(rows, columns).fill(1);
        }
        static rand(rows, columns, options = {}) {
          if (typeof options !== "object") {
            throw new TypeError("options must be an object");
          }
          const { random = Math.random } = options;
          let matrix = new Matrix(rows, columns);
          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
              matrix.set(i, j, random());
            }
          }
          return matrix;
        }
        static randInt(rows, columns, options = {}) {
          if (typeof options !== "object") {
            throw new TypeError("options must be an object");
          }
          const { min = 0, max = 1e3, random = Math.random } = options;
          if (!Number.isInteger(min))
            throw new TypeError("min must be an integer");
          if (!Number.isInteger(max))
            throw new TypeError("max must be an integer");
          if (min >= max)
            throw new RangeError("min must be smaller than max");
          let interval = max - min;
          let matrix = new Matrix(rows, columns);
          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
              let value = min + Math.round(random() * interval);
              matrix.set(i, j, value);
            }
          }
          return matrix;
        }
        static eye(rows, columns, value) {
          if (columns === void 0)
            columns = rows;
          if (value === void 0)
            value = 1;
          let min = Math.min(rows, columns);
          let matrix = this.zeros(rows, columns);
          for (let i = 0; i < min; i++) {
            matrix.set(i, i, value);
          }
          return matrix;
        }
        static diag(data, rows, columns) {
          let l = data.length;
          if (rows === void 0)
            rows = l;
          if (columns === void 0)
            columns = rows;
          let min = Math.min(l, rows, columns);
          let matrix = this.zeros(rows, columns);
          for (let i = 0; i < min; i++) {
            matrix.set(i, i, data[i]);
          }
          return matrix;
        }
        static min(matrix1, matrix2) {
          matrix1 = this.checkMatrix(matrix1);
          matrix2 = this.checkMatrix(matrix2);
          let rows = matrix1.rows;
          let columns = matrix1.columns;
          let result = new Matrix(rows, columns);
          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
              result.set(i, j, Math.min(matrix1.get(i, j), matrix2.get(i, j)));
            }
          }
          return result;
        }
        static max(matrix1, matrix2) {
          matrix1 = this.checkMatrix(matrix1);
          matrix2 = this.checkMatrix(matrix2);
          let rows = matrix1.rows;
          let columns = matrix1.columns;
          let result = new this(rows, columns);
          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
              result.set(i, j, Math.max(matrix1.get(i, j), matrix2.get(i, j)));
            }
          }
          return result;
        }
        static checkMatrix(value) {
          return AbstractMatrix.isMatrix(value) ? value : new Matrix(value);
        }
        static isMatrix(value) {
          return value != null && value.klass === "Matrix";
        }
        get size() {
          return this.rows * this.columns;
        }
        apply(callback) {
          if (typeof callback !== "function") {
            throw new TypeError("callback must be a function");
          }
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              callback.call(this, i, j);
            }
          }
          return this;
        }
        to1DArray() {
          let array = [];
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              array.push(this.get(i, j));
            }
          }
          return array;
        }
        to2DArray() {
          let copy = [];
          for (let i = 0; i < this.rows; i++) {
            copy.push([]);
            for (let j = 0; j < this.columns; j++) {
              copy[i].push(this.get(i, j));
            }
          }
          return copy;
        }
        toJSON() {
          return this.to2DArray();
        }
        isRowVector() {
          return this.rows === 1;
        }
        isColumnVector() {
          return this.columns === 1;
        }
        isVector() {
          return this.rows === 1 || this.columns === 1;
        }
        isSquare() {
          return this.rows === this.columns;
        }
        isEmpty() {
          return this.rows === 0 || this.columns === 0;
        }
        isSymmetric() {
          if (this.isSquare()) {
            for (let i = 0; i < this.rows; i++) {
              for (let j = 0; j <= i; j++) {
                if (this.get(i, j) !== this.get(j, i)) {
                  return false;
                }
              }
            }
            return true;
          }
          return false;
        }
        isEchelonForm() {
          let i = 0;
          let j = 0;
          let previousColumn = -1;
          let isEchelonForm = true;
          let checked = false;
          while (i < this.rows && isEchelonForm) {
            j = 0;
            checked = false;
            while (j < this.columns && checked === false) {
              if (this.get(i, j) === 0) {
                j++;
              } else if (this.get(i, j) === 1 && j > previousColumn) {
                checked = true;
                previousColumn = j;
              } else {
                isEchelonForm = false;
                checked = true;
              }
            }
            i++;
          }
          return isEchelonForm;
        }
        isReducedEchelonForm() {
          let i = 0;
          let j = 0;
          let previousColumn = -1;
          let isReducedEchelonForm = true;
          let checked = false;
          while (i < this.rows && isReducedEchelonForm) {
            j = 0;
            checked = false;
            while (j < this.columns && checked === false) {
              if (this.get(i, j) === 0) {
                j++;
              } else if (this.get(i, j) === 1 && j > previousColumn) {
                checked = true;
                previousColumn = j;
              } else {
                isReducedEchelonForm = false;
                checked = true;
              }
            }
            for (let k = j + 1; k < this.rows; k++) {
              if (this.get(i, k) !== 0) {
                isReducedEchelonForm = false;
              }
            }
            i++;
          }
          return isReducedEchelonForm;
        }
        echelonForm() {
          let result = this.clone();
          let h = 0;
          let k = 0;
          while (h < result.rows && k < result.columns) {
            let iMax = h;
            for (let i = h; i < result.rows; i++) {
              if (result.get(i, k) > result.get(iMax, k)) {
                iMax = i;
              }
            }
            if (result.get(iMax, k) === 0) {
              k++;
            } else {
              result.swapRows(h, iMax);
              let tmp = result.get(h, k);
              for (let j = k; j < result.columns; j++) {
                result.set(h, j, result.get(h, j) / tmp);
              }
              for (let i = h + 1; i < result.rows; i++) {
                let factor = result.get(i, k) / result.get(h, k);
                result.set(i, k, 0);
                for (let j = k + 1; j < result.columns; j++) {
                  result.set(i, j, result.get(i, j) - result.get(h, j) * factor);
                }
              }
              h++;
              k++;
            }
          }
          return result;
        }
        reducedEchelonForm() {
          let result = this.echelonForm();
          let m = result.columns;
          let n = result.rows;
          let h = n - 1;
          while (h >= 0) {
            if (result.maxRow(h) === 0) {
              h--;
            } else {
              let p = 0;
              let pivot = false;
              while (p < n && pivot === false) {
                if (result.get(h, p) === 1) {
                  pivot = true;
                } else {
                  p++;
                }
              }
              for (let i = 0; i < h; i++) {
                let factor = result.get(i, p);
                for (let j = p; j < m; j++) {
                  let tmp = result.get(i, j) - factor * result.get(h, j);
                  result.set(i, j, tmp);
                }
              }
              h--;
            }
          }
          return result;
        }
        set() {
          throw new Error("set method is unimplemented");
        }
        get() {
          throw new Error("get method is unimplemented");
        }
        repeat(options = {}) {
          if (typeof options !== "object") {
            throw new TypeError("options must be an object");
          }
          const { rows = 1, columns = 1 } = options;
          if (!Number.isInteger(rows) || rows <= 0) {
            throw new TypeError("rows must be a positive integer");
          }
          if (!Number.isInteger(columns) || columns <= 0) {
            throw new TypeError("columns must be a positive integer");
          }
          let matrix = new Matrix(this.rows * rows, this.columns * columns);
          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
              matrix.setSubMatrix(this, this.rows * i, this.columns * j);
            }
          }
          return matrix;
        }
        fill(value) {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, value);
            }
          }
          return this;
        }
        neg() {
          return this.mulS(-1);
        }
        getRow(index) {
          checkRowIndex(this, index);
          let row = [];
          for (let i = 0; i < this.columns; i++) {
            row.push(this.get(index, i));
          }
          return row;
        }
        getRowVector(index) {
          return Matrix.rowVector(this.getRow(index));
        }
        setRow(index, array) {
          checkRowIndex(this, index);
          array = checkRowVector(this, array);
          for (let i = 0; i < this.columns; i++) {
            this.set(index, i, array[i]);
          }
          return this;
        }
        swapRows(row1, row2) {
          checkRowIndex(this, row1);
          checkRowIndex(this, row2);
          for (let i = 0; i < this.columns; i++) {
            let temp = this.get(row1, i);
            this.set(row1, i, this.get(row2, i));
            this.set(row2, i, temp);
          }
          return this;
        }
        getColumn(index) {
          checkColumnIndex(this, index);
          let column = [];
          for (let i = 0; i < this.rows; i++) {
            column.push(this.get(i, index));
          }
          return column;
        }
        getColumnVector(index) {
          return Matrix.columnVector(this.getColumn(index));
        }
        setColumn(index, array) {
          checkColumnIndex(this, index);
          array = checkColumnVector(this, array);
          for (let i = 0; i < this.rows; i++) {
            this.set(i, index, array[i]);
          }
          return this;
        }
        swapColumns(column1, column2) {
          checkColumnIndex(this, column1);
          checkColumnIndex(this, column2);
          for (let i = 0; i < this.rows; i++) {
            let temp = this.get(i, column1);
            this.set(i, column1, this.get(i, column2));
            this.set(i, column2, temp);
          }
          return this;
        }
        addRowVector(vector) {
          vector = checkRowVector(this, vector);
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, this.get(i, j) + vector[j]);
            }
          }
          return this;
        }
        subRowVector(vector) {
          vector = checkRowVector(this, vector);
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, this.get(i, j) - vector[j]);
            }
          }
          return this;
        }
        mulRowVector(vector) {
          vector = checkRowVector(this, vector);
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, this.get(i, j) * vector[j]);
            }
          }
          return this;
        }
        divRowVector(vector) {
          vector = checkRowVector(this, vector);
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, this.get(i, j) / vector[j]);
            }
          }
          return this;
        }
        addColumnVector(vector) {
          vector = checkColumnVector(this, vector);
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, this.get(i, j) + vector[i]);
            }
          }
          return this;
        }
        subColumnVector(vector) {
          vector = checkColumnVector(this, vector);
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, this.get(i, j) - vector[i]);
            }
          }
          return this;
        }
        mulColumnVector(vector) {
          vector = checkColumnVector(this, vector);
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, this.get(i, j) * vector[i]);
            }
          }
          return this;
        }
        divColumnVector(vector) {
          vector = checkColumnVector(this, vector);
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, this.get(i, j) / vector[i]);
            }
          }
          return this;
        }
        mulRow(index, value) {
          checkRowIndex(this, index);
          for (let i = 0; i < this.columns; i++) {
            this.set(index, i, this.get(index, i) * value);
          }
          return this;
        }
        mulColumn(index, value) {
          checkColumnIndex(this, index);
          for (let i = 0; i < this.rows; i++) {
            this.set(i, index, this.get(i, index) * value);
          }
          return this;
        }
        max() {
          if (this.isEmpty()) {
            return NaN;
          }
          let v = this.get(0, 0);
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              if (this.get(i, j) > v) {
                v = this.get(i, j);
              }
            }
          }
          return v;
        }
        maxIndex() {
          checkNonEmpty(this);
          let v = this.get(0, 0);
          let idx = [0, 0];
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              if (this.get(i, j) > v) {
                v = this.get(i, j);
                idx[0] = i;
                idx[1] = j;
              }
            }
          }
          return idx;
        }
        min() {
          if (this.isEmpty()) {
            return NaN;
          }
          let v = this.get(0, 0);
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              if (this.get(i, j) < v) {
                v = this.get(i, j);
              }
            }
          }
          return v;
        }
        minIndex() {
          checkNonEmpty(this);
          let v = this.get(0, 0);
          let idx = [0, 0];
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              if (this.get(i, j) < v) {
                v = this.get(i, j);
                idx[0] = i;
                idx[1] = j;
              }
            }
          }
          return idx;
        }
        maxRow(row) {
          checkRowIndex(this, row);
          if (this.isEmpty()) {
            return NaN;
          }
          let v = this.get(row, 0);
          for (let i = 1; i < this.columns; i++) {
            if (this.get(row, i) > v) {
              v = this.get(row, i);
            }
          }
          return v;
        }
        maxRowIndex(row) {
          checkRowIndex(this, row);
          checkNonEmpty(this);
          let v = this.get(row, 0);
          let idx = [row, 0];
          for (let i = 1; i < this.columns; i++) {
            if (this.get(row, i) > v) {
              v = this.get(row, i);
              idx[1] = i;
            }
          }
          return idx;
        }
        minRow(row) {
          checkRowIndex(this, row);
          if (this.isEmpty()) {
            return NaN;
          }
          let v = this.get(row, 0);
          for (let i = 1; i < this.columns; i++) {
            if (this.get(row, i) < v) {
              v = this.get(row, i);
            }
          }
          return v;
        }
        minRowIndex(row) {
          checkRowIndex(this, row);
          checkNonEmpty(this);
          let v = this.get(row, 0);
          let idx = [row, 0];
          for (let i = 1; i < this.columns; i++) {
            if (this.get(row, i) < v) {
              v = this.get(row, i);
              idx[1] = i;
            }
          }
          return idx;
        }
        maxColumn(column) {
          checkColumnIndex(this, column);
          if (this.isEmpty()) {
            return NaN;
          }
          let v = this.get(0, column);
          for (let i = 1; i < this.rows; i++) {
            if (this.get(i, column) > v) {
              v = this.get(i, column);
            }
          }
          return v;
        }
        maxColumnIndex(column) {
          checkColumnIndex(this, column);
          checkNonEmpty(this);
          let v = this.get(0, column);
          let idx = [0, column];
          for (let i = 1; i < this.rows; i++) {
            if (this.get(i, column) > v) {
              v = this.get(i, column);
              idx[0] = i;
            }
          }
          return idx;
        }
        minColumn(column) {
          checkColumnIndex(this, column);
          if (this.isEmpty()) {
            return NaN;
          }
          let v = this.get(0, column);
          for (let i = 1; i < this.rows; i++) {
            if (this.get(i, column) < v) {
              v = this.get(i, column);
            }
          }
          return v;
        }
        minColumnIndex(column) {
          checkColumnIndex(this, column);
          checkNonEmpty(this);
          let v = this.get(0, column);
          let idx = [0, column];
          for (let i = 1; i < this.rows; i++) {
            if (this.get(i, column) < v) {
              v = this.get(i, column);
              idx[0] = i;
            }
          }
          return idx;
        }
        diag() {
          let min = Math.min(this.rows, this.columns);
          let diag = [];
          for (let i = 0; i < min; i++) {
            diag.push(this.get(i, i));
          }
          return diag;
        }
        norm(type = "frobenius") {
          let result = 0;
          if (type === "max") {
            return this.max();
          } else if (type === "frobenius") {
            for (let i = 0; i < this.rows; i++) {
              for (let j = 0; j < this.columns; j++) {
                result = result + this.get(i, j) * this.get(i, j);
              }
            }
            return Math.sqrt(result);
          } else {
            throw new RangeError(`unknown norm type: ${type}`);
          }
        }
        cumulativeSum() {
          let sum = 0;
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              sum += this.get(i, j);
              this.set(i, j, sum);
            }
          }
          return this;
        }
        dot(vector2) {
          if (AbstractMatrix.isMatrix(vector2))
            vector2 = vector2.to1DArray();
          let vector1 = this.to1DArray();
          if (vector1.length !== vector2.length) {
            throw new RangeError("vectors do not have the same size");
          }
          let dot = 0;
          for (let i = 0; i < vector1.length; i++) {
            dot += vector1[i] * vector2[i];
          }
          return dot;
        }
        mmul(other) {
          other = Matrix.checkMatrix(other);
          let m = this.rows;
          let n = this.columns;
          let p = other.columns;
          let result = new Matrix(m, p);
          let Bcolj = new Float64Array(n);
          for (let j = 0; j < p; j++) {
            for (let k = 0; k < n; k++) {
              Bcolj[k] = other.get(k, j);
            }
            for (let i = 0; i < m; i++) {
              let s = 0;
              for (let k = 0; k < n; k++) {
                s += this.get(i, k) * Bcolj[k];
              }
              result.set(i, j, s);
            }
          }
          return result;
        }
        strassen2x2(other) {
          other = Matrix.checkMatrix(other);
          let result = new Matrix(2, 2);
          const a11 = this.get(0, 0);
          const b11 = other.get(0, 0);
          const a12 = this.get(0, 1);
          const b12 = other.get(0, 1);
          const a21 = this.get(1, 0);
          const b21 = other.get(1, 0);
          const a22 = this.get(1, 1);
          const b22 = other.get(1, 1);
          const m1 = (a11 + a22) * (b11 + b22);
          const m2 = (a21 + a22) * b11;
          const m3 = a11 * (b12 - b22);
          const m4 = a22 * (b21 - b11);
          const m5 = (a11 + a12) * b22;
          const m6 = (a21 - a11) * (b11 + b12);
          const m7 = (a12 - a22) * (b21 + b22);
          const c00 = m1 + m4 - m5 + m7;
          const c01 = m3 + m5;
          const c10 = m2 + m4;
          const c11 = m1 - m2 + m3 + m6;
          result.set(0, 0, c00);
          result.set(0, 1, c01);
          result.set(1, 0, c10);
          result.set(1, 1, c11);
          return result;
        }
        strassen3x3(other) {
          other = Matrix.checkMatrix(other);
          let result = new Matrix(3, 3);
          const a00 = this.get(0, 0);
          const a01 = this.get(0, 1);
          const a02 = this.get(0, 2);
          const a10 = this.get(1, 0);
          const a11 = this.get(1, 1);
          const a12 = this.get(1, 2);
          const a20 = this.get(2, 0);
          const a21 = this.get(2, 1);
          const a22 = this.get(2, 2);
          const b00 = other.get(0, 0);
          const b01 = other.get(0, 1);
          const b02 = other.get(0, 2);
          const b10 = other.get(1, 0);
          const b11 = other.get(1, 1);
          const b12 = other.get(1, 2);
          const b20 = other.get(2, 0);
          const b21 = other.get(2, 1);
          const b22 = other.get(2, 2);
          const m1 = (a00 + a01 + a02 - a10 - a11 - a21 - a22) * b11;
          const m2 = (a00 - a10) * (-b01 + b11);
          const m3 = a11 * (-b00 + b01 + b10 - b11 - b12 - b20 + b22);
          const m4 = (-a00 + a10 + a11) * (b00 - b01 + b11);
          const m5 = (a10 + a11) * (-b00 + b01);
          const m6 = a00 * b00;
          const m7 = (-a00 + a20 + a21) * (b00 - b02 + b12);
          const m8 = (-a00 + a20) * (b02 - b12);
          const m9 = (a20 + a21) * (-b00 + b02);
          const m10 = (a00 + a01 + a02 - a11 - a12 - a20 - a21) * b12;
          const m11 = a21 * (-b00 + b02 + b10 - b11 - b12 - b20 + b21);
          const m12 = (-a02 + a21 + a22) * (b11 + b20 - b21);
          const m13 = (a02 - a22) * (b11 - b21);
          const m14 = a02 * b20;
          const m15 = (a21 + a22) * (-b20 + b21);
          const m16 = (-a02 + a11 + a12) * (b12 + b20 - b22);
          const m17 = (a02 - a12) * (b12 - b22);
          const m18 = (a11 + a12) * (-b20 + b22);
          const m19 = a01 * b10;
          const m20 = a12 * b21;
          const m21 = a10 * b02;
          const m22 = a20 * b01;
          const m23 = a22 * b22;
          const c00 = m6 + m14 + m19;
          const c01 = m1 + m4 + m5 + m6 + m12 + m14 + m15;
          const c02 = m6 + m7 + m9 + m10 + m14 + m16 + m18;
          const c10 = m2 + m3 + m4 + m6 + m14 + m16 + m17;
          const c11 = m2 + m4 + m5 + m6 + m20;
          const c12 = m14 + m16 + m17 + m18 + m21;
          const c20 = m6 + m7 + m8 + m11 + m12 + m13 + m14;
          const c21 = m12 + m13 + m14 + m15 + m22;
          const c22 = m6 + m7 + m8 + m9 + m23;
          result.set(0, 0, c00);
          result.set(0, 1, c01);
          result.set(0, 2, c02);
          result.set(1, 0, c10);
          result.set(1, 1, c11);
          result.set(1, 2, c12);
          result.set(2, 0, c20);
          result.set(2, 1, c21);
          result.set(2, 2, c22);
          return result;
        }
        mmulStrassen(y) {
          y = Matrix.checkMatrix(y);
          let x = this.clone();
          let r1 = x.rows;
          let c1 = x.columns;
          let r2 = y.rows;
          let c2 = y.columns;
          if (c1 !== r2) {
            console.warn(`Multiplying ${r1} x ${c1} and ${r2} x ${c2} matrix: dimensions do not match.`);
          }
          function embed(mat, rows, cols) {
            let r3 = mat.rows;
            let c3 = mat.columns;
            if (r3 === rows && c3 === cols) {
              return mat;
            } else {
              let resultat = AbstractMatrix.zeros(rows, cols);
              resultat = resultat.setSubMatrix(mat, 0, 0);
              return resultat;
            }
          }
          let r = Math.max(r1, r2);
          let c = Math.max(c1, c2);
          x = embed(x, r, c);
          y = embed(y, r, c);
          function blockMult(a, b, rows, cols) {
            if (rows <= 512 || cols <= 512) {
              return a.mmul(b);
            }
            if (rows % 2 === 1 && cols % 2 === 1) {
              a = embed(a, rows + 1, cols + 1);
              b = embed(b, rows + 1, cols + 1);
            } else if (rows % 2 === 1) {
              a = embed(a, rows + 1, cols);
              b = embed(b, rows + 1, cols);
            } else if (cols % 2 === 1) {
              a = embed(a, rows, cols + 1);
              b = embed(b, rows, cols + 1);
            }
            let halfRows = parseInt(a.rows / 2, 10);
            let halfCols = parseInt(a.columns / 2, 10);
            let a11 = a.subMatrix(0, halfRows - 1, 0, halfCols - 1);
            let b11 = b.subMatrix(0, halfRows - 1, 0, halfCols - 1);
            let a12 = a.subMatrix(0, halfRows - 1, halfCols, a.columns - 1);
            let b12 = b.subMatrix(0, halfRows - 1, halfCols, b.columns - 1);
            let a21 = a.subMatrix(halfRows, a.rows - 1, 0, halfCols - 1);
            let b21 = b.subMatrix(halfRows, b.rows - 1, 0, halfCols - 1);
            let a22 = a.subMatrix(halfRows, a.rows - 1, halfCols, a.columns - 1);
            let b22 = b.subMatrix(halfRows, b.rows - 1, halfCols, b.columns - 1);
            let m1 = blockMult(AbstractMatrix.add(a11, a22), AbstractMatrix.add(b11, b22), halfRows, halfCols);
            let m2 = blockMult(AbstractMatrix.add(a21, a22), b11, halfRows, halfCols);
            let m3 = blockMult(a11, AbstractMatrix.sub(b12, b22), halfRows, halfCols);
            let m4 = blockMult(a22, AbstractMatrix.sub(b21, b11), halfRows, halfCols);
            let m5 = blockMult(AbstractMatrix.add(a11, a12), b22, halfRows, halfCols);
            let m6 = blockMult(AbstractMatrix.sub(a21, a11), AbstractMatrix.add(b11, b12), halfRows, halfCols);
            let m7 = blockMult(AbstractMatrix.sub(a12, a22), AbstractMatrix.add(b21, b22), halfRows, halfCols);
            let c11 = AbstractMatrix.add(m1, m4);
            c11.sub(m5);
            c11.add(m7);
            let c12 = AbstractMatrix.add(m3, m5);
            let c21 = AbstractMatrix.add(m2, m4);
            let c22 = AbstractMatrix.sub(m1, m2);
            c22.add(m3);
            c22.add(m6);
            let resultat = AbstractMatrix.zeros(2 * c11.rows, 2 * c11.columns);
            resultat = resultat.setSubMatrix(c11, 0, 0);
            resultat = resultat.setSubMatrix(c12, c11.rows, 0);
            resultat = resultat.setSubMatrix(c21, 0, c11.columns);
            resultat = resultat.setSubMatrix(c22, c11.rows, c11.columns);
            return resultat.subMatrix(0, rows - 1, 0, cols - 1);
          }
          return blockMult(x, y, r, c);
        }
        scaleRows(options = {}) {
          if (typeof options !== "object") {
            throw new TypeError("options must be an object");
          }
          const { min = 0, max = 1 } = options;
          if (!Number.isFinite(min))
            throw new TypeError("min must be a number");
          if (!Number.isFinite(max))
            throw new TypeError("max must be a number");
          if (min >= max)
            throw new RangeError("min must be smaller than max");
          let newMatrix = new Matrix(this.rows, this.columns);
          for (let i = 0; i < this.rows; i++) {
            const row = this.getRow(i);
            if (row.length > 0) {
              rescale__default["default"](row, { min, max, output: row });
            }
            newMatrix.setRow(i, row);
          }
          return newMatrix;
        }
        scaleColumns(options = {}) {
          if (typeof options !== "object") {
            throw new TypeError("options must be an object");
          }
          const { min = 0, max = 1 } = options;
          if (!Number.isFinite(min))
            throw new TypeError("min must be a number");
          if (!Number.isFinite(max))
            throw new TypeError("max must be a number");
          if (min >= max)
            throw new RangeError("min must be smaller than max");
          let newMatrix = new Matrix(this.rows, this.columns);
          for (let i = 0; i < this.columns; i++) {
            const column = this.getColumn(i);
            if (column.length) {
              rescale__default["default"](column, {
                min,
                max,
                output: column
              });
            }
            newMatrix.setColumn(i, column);
          }
          return newMatrix;
        }
        flipRows() {
          const middle = Math.ceil(this.columns / 2);
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < middle; j++) {
              let first = this.get(i, j);
              let last = this.get(i, this.columns - 1 - j);
              this.set(i, j, last);
              this.set(i, this.columns - 1 - j, first);
            }
          }
          return this;
        }
        flipColumns() {
          const middle = Math.ceil(this.rows / 2);
          for (let j = 0; j < this.columns; j++) {
            for (let i = 0; i < middle; i++) {
              let first = this.get(i, j);
              let last = this.get(this.rows - 1 - i, j);
              this.set(i, j, last);
              this.set(this.rows - 1 - i, j, first);
            }
          }
          return this;
        }
        kroneckerProduct(other) {
          other = Matrix.checkMatrix(other);
          let m = this.rows;
          let n = this.columns;
          let p = other.rows;
          let q = other.columns;
          let result = new Matrix(m * p, n * q);
          for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
              for (let k = 0; k < p; k++) {
                for (let l = 0; l < q; l++) {
                  result.set(p * i + k, q * j + l, this.get(i, j) * other.get(k, l));
                }
              }
            }
          }
          return result;
        }
        kroneckerSum(other) {
          other = Matrix.checkMatrix(other);
          if (!this.isSquare() || !other.isSquare()) {
            throw new Error("Kronecker Sum needs two Square Matrices");
          }
          let m = this.rows;
          let n = other.rows;
          let AxI = this.kroneckerProduct(Matrix.eye(n, n));
          let IxB = Matrix.eye(m, m).kroneckerProduct(other);
          return AxI.add(IxB);
        }
        transpose() {
          let result = new Matrix(this.columns, this.rows);
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              result.set(j, i, this.get(i, j));
            }
          }
          return result;
        }
        sortRows(compareFunction = compareNumbers) {
          for (let i = 0; i < this.rows; i++) {
            this.setRow(i, this.getRow(i).sort(compareFunction));
          }
          return this;
        }
        sortColumns(compareFunction = compareNumbers) {
          for (let i = 0; i < this.columns; i++) {
            this.setColumn(i, this.getColumn(i).sort(compareFunction));
          }
          return this;
        }
        subMatrix(startRow, endRow, startColumn, endColumn) {
          checkRange(this, startRow, endRow, startColumn, endColumn);
          let newMatrix = new Matrix(endRow - startRow + 1, endColumn - startColumn + 1);
          for (let i = startRow; i <= endRow; i++) {
            for (let j = startColumn; j <= endColumn; j++) {
              newMatrix.set(i - startRow, j - startColumn, this.get(i, j));
            }
          }
          return newMatrix;
        }
        subMatrixRow(indices, startColumn, endColumn) {
          if (startColumn === void 0)
            startColumn = 0;
          if (endColumn === void 0)
            endColumn = this.columns - 1;
          if (startColumn > endColumn || startColumn < 0 || startColumn >= this.columns || endColumn < 0 || endColumn >= this.columns) {
            throw new RangeError("Argument out of range");
          }
          let newMatrix = new Matrix(indices.length, endColumn - startColumn + 1);
          for (let i = 0; i < indices.length; i++) {
            for (let j = startColumn; j <= endColumn; j++) {
              if (indices[i] < 0 || indices[i] >= this.rows) {
                throw new RangeError(`Row index out of range: ${indices[i]}`);
              }
              newMatrix.set(i, j - startColumn, this.get(indices[i], j));
            }
          }
          return newMatrix;
        }
        subMatrixColumn(indices, startRow, endRow) {
          if (startRow === void 0)
            startRow = 0;
          if (endRow === void 0)
            endRow = this.rows - 1;
          if (startRow > endRow || startRow < 0 || startRow >= this.rows || endRow < 0 || endRow >= this.rows) {
            throw new RangeError("Argument out of range");
          }
          let newMatrix = new Matrix(endRow - startRow + 1, indices.length);
          for (let i = 0; i < indices.length; i++) {
            for (let j = startRow; j <= endRow; j++) {
              if (indices[i] < 0 || indices[i] >= this.columns) {
                throw new RangeError(`Column index out of range: ${indices[i]}`);
              }
              newMatrix.set(j - startRow, i, this.get(j, indices[i]));
            }
          }
          return newMatrix;
        }
        setSubMatrix(matrix, startRow, startColumn) {
          matrix = Matrix.checkMatrix(matrix);
          if (matrix.isEmpty()) {
            return this;
          }
          let endRow = startRow + matrix.rows - 1;
          let endColumn = startColumn + matrix.columns - 1;
          checkRange(this, startRow, endRow, startColumn, endColumn);
          for (let i = 0; i < matrix.rows; i++) {
            for (let j = 0; j < matrix.columns; j++) {
              this.set(startRow + i, startColumn + j, matrix.get(i, j));
            }
          }
          return this;
        }
        selection(rowIndices, columnIndices) {
          let indices = checkIndices(this, rowIndices, columnIndices);
          let newMatrix = new Matrix(rowIndices.length, columnIndices.length);
          for (let i = 0; i < indices.row.length; i++) {
            let rowIndex = indices.row[i];
            for (let j = 0; j < indices.column.length; j++) {
              let columnIndex = indices.column[j];
              newMatrix.set(i, j, this.get(rowIndex, columnIndex));
            }
          }
          return newMatrix;
        }
        trace() {
          let min = Math.min(this.rows, this.columns);
          let trace = 0;
          for (let i = 0; i < min; i++) {
            trace += this.get(i, i);
          }
          return trace;
        }
        clone() {
          let newMatrix = new Matrix(this.rows, this.columns);
          for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
              newMatrix.set(row, column, this.get(row, column));
            }
          }
          return newMatrix;
        }
        sum(by) {
          switch (by) {
            case "row":
              return sumByRow(this);
            case "column":
              return sumByColumn(this);
            case void 0:
              return sumAll(this);
            default:
              throw new Error(`invalid option: ${by}`);
          }
        }
        product(by) {
          switch (by) {
            case "row":
              return productByRow(this);
            case "column":
              return productByColumn(this);
            case void 0:
              return productAll(this);
            default:
              throw new Error(`invalid option: ${by}`);
          }
        }
        mean(by) {
          const sum = this.sum(by);
          switch (by) {
            case "row": {
              for (let i = 0; i < this.rows; i++) {
                sum[i] /= this.columns;
              }
              return sum;
            }
            case "column": {
              for (let i = 0; i < this.columns; i++) {
                sum[i] /= this.rows;
              }
              return sum;
            }
            case void 0:
              return sum / this.size;
            default:
              throw new Error(`invalid option: ${by}`);
          }
        }
        variance(by, options = {}) {
          if (typeof by === "object") {
            options = by;
            by = void 0;
          }
          if (typeof options !== "object") {
            throw new TypeError("options must be an object");
          }
          const { unbiased = true, mean = this.mean(by) } = options;
          if (typeof unbiased !== "boolean") {
            throw new TypeError("unbiased must be a boolean");
          }
          switch (by) {
            case "row": {
              if (!Array.isArray(mean)) {
                throw new TypeError("mean must be an array");
              }
              return varianceByRow(this, unbiased, mean);
            }
            case "column": {
              if (!Array.isArray(mean)) {
                throw new TypeError("mean must be an array");
              }
              return varianceByColumn(this, unbiased, mean);
            }
            case void 0: {
              if (typeof mean !== "number") {
                throw new TypeError("mean must be a number");
              }
              return varianceAll(this, unbiased, mean);
            }
            default:
              throw new Error(`invalid option: ${by}`);
          }
        }
        standardDeviation(by, options) {
          if (typeof by === "object") {
            options = by;
            by = void 0;
          }
          const variance = this.variance(by, options);
          if (by === void 0) {
            return Math.sqrt(variance);
          } else {
            for (let i = 0; i < variance.length; i++) {
              variance[i] = Math.sqrt(variance[i]);
            }
            return variance;
          }
        }
        center(by, options = {}) {
          if (typeof by === "object") {
            options = by;
            by = void 0;
          }
          if (typeof options !== "object") {
            throw new TypeError("options must be an object");
          }
          const { center = this.mean(by) } = options;
          switch (by) {
            case "row": {
              if (!Array.isArray(center)) {
                throw new TypeError("center must be an array");
              }
              centerByRow(this, center);
              return this;
            }
            case "column": {
              if (!Array.isArray(center)) {
                throw new TypeError("center must be an array");
              }
              centerByColumn(this, center);
              return this;
            }
            case void 0: {
              if (typeof center !== "number") {
                throw new TypeError("center must be a number");
              }
              centerAll(this, center);
              return this;
            }
            default:
              throw new Error(`invalid option: ${by}`);
          }
        }
        scale(by, options = {}) {
          if (typeof by === "object") {
            options = by;
            by = void 0;
          }
          if (typeof options !== "object") {
            throw new TypeError("options must be an object");
          }
          let scale = options.scale;
          switch (by) {
            case "row": {
              if (scale === void 0) {
                scale = getScaleByRow(this);
              } else if (!Array.isArray(scale)) {
                throw new TypeError("scale must be an array");
              }
              scaleByRow(this, scale);
              return this;
            }
            case "column": {
              if (scale === void 0) {
                scale = getScaleByColumn(this);
              } else if (!Array.isArray(scale)) {
                throw new TypeError("scale must be an array");
              }
              scaleByColumn(this, scale);
              return this;
            }
            case void 0: {
              if (scale === void 0) {
                scale = getScaleAll(this);
              } else if (typeof scale !== "number") {
                throw new TypeError("scale must be a number");
              }
              scaleAll(this, scale);
              return this;
            }
            default:
              throw new Error(`invalid option: ${by}`);
          }
        }
        toString(options) {
          return inspectMatrixWithOptions(this, options);
        }
      };
      AbstractMatrix.prototype.klass = "Matrix";
      if (typeof Symbol !== "undefined") {
        AbstractMatrix.prototype[Symbol.for("nodejs.util.inspect.custom")] = inspectMatrix;
      }
      function compareNumbers(a, b) {
        return a - b;
      }
      AbstractMatrix.random = AbstractMatrix.rand;
      AbstractMatrix.randomInt = AbstractMatrix.randInt;
      AbstractMatrix.diagonal = AbstractMatrix.diag;
      AbstractMatrix.prototype.diagonal = AbstractMatrix.prototype.diag;
      AbstractMatrix.identity = AbstractMatrix.eye;
      AbstractMatrix.prototype.negate = AbstractMatrix.prototype.neg;
      AbstractMatrix.prototype.tensorProduct = AbstractMatrix.prototype.kroneckerProduct;
      var Matrix = class extends AbstractMatrix {
        constructor(nRows, nColumns) {
          super();
          if (Matrix.isMatrix(nRows)) {
            return nRows.clone();
          } else if (Number.isInteger(nRows) && nRows >= 0) {
            this.data = [];
            if (Number.isInteger(nColumns) && nColumns >= 0) {
              for (let i = 0; i < nRows; i++) {
                this.data.push(new Float64Array(nColumns));
              }
            } else {
              throw new TypeError("nColumns must be a positive integer");
            }
          } else if (Array.isArray(nRows)) {
            const arrayData = nRows;
            nRows = arrayData.length;
            nColumns = nRows ? arrayData[0].length : 0;
            if (typeof nColumns !== "number") {
              throw new TypeError("Data must be a 2D array with at least one element");
            }
            this.data = [];
            for (let i = 0; i < nRows; i++) {
              if (arrayData[i].length !== nColumns) {
                throw new RangeError("Inconsistent array dimensions");
              }
              this.data.push(Float64Array.from(arrayData[i]));
            }
          } else {
            throw new TypeError("First argument must be a positive number or an array");
          }
          this.rows = nRows;
          this.columns = nColumns;
        }
        set(rowIndex, columnIndex, value) {
          this.data[rowIndex][columnIndex] = value;
          return this;
        }
        get(rowIndex, columnIndex) {
          return this.data[rowIndex][columnIndex];
        }
        removeRow(index) {
          checkRowIndex(this, index);
          this.data.splice(index, 1);
          this.rows -= 1;
          return this;
        }
        addRow(index, array) {
          if (array === void 0) {
            array = index;
            index = this.rows;
          }
          checkRowIndex(this, index, true);
          array = Float64Array.from(checkRowVector(this, array));
          this.data.splice(index, 0, array);
          this.rows += 1;
          return this;
        }
        removeColumn(index) {
          checkColumnIndex(this, index);
          for (let i = 0; i < this.rows; i++) {
            const newRow = new Float64Array(this.columns - 1);
            for (let j = 0; j < index; j++) {
              newRow[j] = this.data[i][j];
            }
            for (let j = index + 1; j < this.columns; j++) {
              newRow[j - 1] = this.data[i][j];
            }
            this.data[i] = newRow;
          }
          this.columns -= 1;
          return this;
        }
        addColumn(index, array) {
          if (typeof array === "undefined") {
            array = index;
            index = this.columns;
          }
          checkColumnIndex(this, index, true);
          array = checkColumnVector(this, array);
          for (let i = 0; i < this.rows; i++) {
            const newRow = new Float64Array(this.columns + 1);
            let j = 0;
            for (; j < index; j++) {
              newRow[j] = this.data[i][j];
            }
            newRow[j++] = array[i];
            for (; j < this.columns + 1; j++) {
              newRow[j] = this.data[i][j - 1];
            }
            this.data[i] = newRow;
          }
          this.columns += 1;
          return this;
        }
      };
      installMathOperations(AbstractMatrix, Matrix);
      var BaseView = class extends AbstractMatrix {
        constructor(matrix, rows, columns) {
          super();
          this.matrix = matrix;
          this.rows = rows;
          this.columns = columns;
        }
      };
      var MatrixColumnView = class extends BaseView {
        constructor(matrix, column) {
          checkColumnIndex(matrix, column);
          super(matrix, matrix.rows, 1);
          this.column = column;
        }
        set(rowIndex, columnIndex, value) {
          this.matrix.set(rowIndex, this.column, value);
          return this;
        }
        get(rowIndex) {
          return this.matrix.get(rowIndex, this.column);
        }
      };
      var MatrixColumnSelectionView = class extends BaseView {
        constructor(matrix, columnIndices) {
          columnIndices = checkColumnIndices(matrix, columnIndices);
          super(matrix, matrix.rows, columnIndices.length);
          this.columnIndices = columnIndices;
        }
        set(rowIndex, columnIndex, value) {
          this.matrix.set(rowIndex, this.columnIndices[columnIndex], value);
          return this;
        }
        get(rowIndex, columnIndex) {
          return this.matrix.get(rowIndex, this.columnIndices[columnIndex]);
        }
      };
      var MatrixFlipColumnView = class extends BaseView {
        constructor(matrix) {
          super(matrix, matrix.rows, matrix.columns);
        }
        set(rowIndex, columnIndex, value) {
          this.matrix.set(rowIndex, this.columns - columnIndex - 1, value);
          return this;
        }
        get(rowIndex, columnIndex) {
          return this.matrix.get(rowIndex, this.columns - columnIndex - 1);
        }
      };
      var MatrixFlipRowView = class extends BaseView {
        constructor(matrix) {
          super(matrix, matrix.rows, matrix.columns);
        }
        set(rowIndex, columnIndex, value) {
          this.matrix.set(this.rows - rowIndex - 1, columnIndex, value);
          return this;
        }
        get(rowIndex, columnIndex) {
          return this.matrix.get(this.rows - rowIndex - 1, columnIndex);
        }
      };
      var MatrixRowView = class extends BaseView {
        constructor(matrix, row) {
          checkRowIndex(matrix, row);
          super(matrix, 1, matrix.columns);
          this.row = row;
        }
        set(rowIndex, columnIndex, value) {
          this.matrix.set(this.row, columnIndex, value);
          return this;
        }
        get(rowIndex, columnIndex) {
          return this.matrix.get(this.row, columnIndex);
        }
      };
      var MatrixRowSelectionView = class extends BaseView {
        constructor(matrix, rowIndices) {
          rowIndices = checkRowIndices(matrix, rowIndices);
          super(matrix, rowIndices.length, matrix.columns);
          this.rowIndices = rowIndices;
        }
        set(rowIndex, columnIndex, value) {
          this.matrix.set(this.rowIndices[rowIndex], columnIndex, value);
          return this;
        }
        get(rowIndex, columnIndex) {
          return this.matrix.get(this.rowIndices[rowIndex], columnIndex);
        }
      };
      var MatrixSelectionView = class extends BaseView {
        constructor(matrix, rowIndices, columnIndices) {
          let indices = checkIndices(matrix, rowIndices, columnIndices);
          super(matrix, indices.row.length, indices.column.length);
          this.rowIndices = indices.row;
          this.columnIndices = indices.column;
        }
        set(rowIndex, columnIndex, value) {
          this.matrix.set(this.rowIndices[rowIndex], this.columnIndices[columnIndex], value);
          return this;
        }
        get(rowIndex, columnIndex) {
          return this.matrix.get(this.rowIndices[rowIndex], this.columnIndices[columnIndex]);
        }
      };
      var MatrixSubView = class extends BaseView {
        constructor(matrix, startRow, endRow, startColumn, endColumn) {
          checkRange(matrix, startRow, endRow, startColumn, endColumn);
          super(matrix, endRow - startRow + 1, endColumn - startColumn + 1);
          this.startRow = startRow;
          this.startColumn = startColumn;
        }
        set(rowIndex, columnIndex, value) {
          this.matrix.set(this.startRow + rowIndex, this.startColumn + columnIndex, value);
          return this;
        }
        get(rowIndex, columnIndex) {
          return this.matrix.get(this.startRow + rowIndex, this.startColumn + columnIndex);
        }
      };
      var MatrixTransposeView = class extends BaseView {
        constructor(matrix) {
          super(matrix, matrix.columns, matrix.rows);
        }
        set(rowIndex, columnIndex, value) {
          this.matrix.set(columnIndex, rowIndex, value);
          return this;
        }
        get(rowIndex, columnIndex) {
          return this.matrix.get(columnIndex, rowIndex);
        }
      };
      var WrapperMatrix1D = class extends AbstractMatrix {
        constructor(data, options = {}) {
          const { rows = 1 } = options;
          if (data.length % rows !== 0) {
            throw new Error("the data length is not divisible by the number of rows");
          }
          super();
          this.rows = rows;
          this.columns = data.length / rows;
          this.data = data;
        }
        set(rowIndex, columnIndex, value) {
          let index = this._calculateIndex(rowIndex, columnIndex);
          this.data[index] = value;
          return this;
        }
        get(rowIndex, columnIndex) {
          let index = this._calculateIndex(rowIndex, columnIndex);
          return this.data[index];
        }
        _calculateIndex(row, column) {
          return row * this.columns + column;
        }
      };
      var WrapperMatrix2D = class extends AbstractMatrix {
        constructor(data) {
          super();
          this.data = data;
          this.rows = data.length;
          this.columns = data[0].length;
        }
        set(rowIndex, columnIndex, value) {
          this.data[rowIndex][columnIndex] = value;
          return this;
        }
        get(rowIndex, columnIndex) {
          return this.data[rowIndex][columnIndex];
        }
      };
      function wrap(array, options) {
        if (Array.isArray(array)) {
          if (array[0] && Array.isArray(array[0])) {
            return new WrapperMatrix2D(array);
          } else {
            return new WrapperMatrix1D(array, options);
          }
        } else {
          throw new Error("the argument is not an array");
        }
      }
      var LuDecomposition = class {
        constructor(matrix) {
          matrix = WrapperMatrix2D.checkMatrix(matrix);
          let lu = matrix.clone();
          let rows = lu.rows;
          let columns = lu.columns;
          let pivotVector = new Float64Array(rows);
          let pivotSign = 1;
          let i, j, k, p, s, t, v;
          let LUcolj, kmax;
          for (i = 0; i < rows; i++) {
            pivotVector[i] = i;
          }
          LUcolj = new Float64Array(rows);
          for (j = 0; j < columns; j++) {
            for (i = 0; i < rows; i++) {
              LUcolj[i] = lu.get(i, j);
            }
            for (i = 0; i < rows; i++) {
              kmax = Math.min(i, j);
              s = 0;
              for (k = 0; k < kmax; k++) {
                s += lu.get(i, k) * LUcolj[k];
              }
              LUcolj[i] -= s;
              lu.set(i, j, LUcolj[i]);
            }
            p = j;
            for (i = j + 1; i < rows; i++) {
              if (Math.abs(LUcolj[i]) > Math.abs(LUcolj[p])) {
                p = i;
              }
            }
            if (p !== j) {
              for (k = 0; k < columns; k++) {
                t = lu.get(p, k);
                lu.set(p, k, lu.get(j, k));
                lu.set(j, k, t);
              }
              v = pivotVector[p];
              pivotVector[p] = pivotVector[j];
              pivotVector[j] = v;
              pivotSign = -pivotSign;
            }
            if (j < rows && lu.get(j, j) !== 0) {
              for (i = j + 1; i < rows; i++) {
                lu.set(i, j, lu.get(i, j) / lu.get(j, j));
              }
            }
          }
          this.LU = lu;
          this.pivotVector = pivotVector;
          this.pivotSign = pivotSign;
        }
        isSingular() {
          let data = this.LU;
          let col = data.columns;
          for (let j = 0; j < col; j++) {
            if (data.get(j, j) === 0) {
              return true;
            }
          }
          return false;
        }
        solve(value) {
          value = Matrix.checkMatrix(value);
          let lu = this.LU;
          let rows = lu.rows;
          if (rows !== value.rows) {
            throw new Error("Invalid matrix dimensions");
          }
          if (this.isSingular()) {
            throw new Error("LU matrix is singular");
          }
          let count = value.columns;
          let X = value.subMatrixRow(this.pivotVector, 0, count - 1);
          let columns = lu.columns;
          let i, j, k;
          for (k = 0; k < columns; k++) {
            for (i = k + 1; i < columns; i++) {
              for (j = 0; j < count; j++) {
                X.set(i, j, X.get(i, j) - X.get(k, j) * lu.get(i, k));
              }
            }
          }
          for (k = columns - 1; k >= 0; k--) {
            for (j = 0; j < count; j++) {
              X.set(k, j, X.get(k, j) / lu.get(k, k));
            }
            for (i = 0; i < k; i++) {
              for (j = 0; j < count; j++) {
                X.set(i, j, X.get(i, j) - X.get(k, j) * lu.get(i, k));
              }
            }
          }
          return X;
        }
        get determinant() {
          let data = this.LU;
          if (!data.isSquare()) {
            throw new Error("Matrix must be square");
          }
          let determinant2 = this.pivotSign;
          let col = data.columns;
          for (let j = 0; j < col; j++) {
            determinant2 *= data.get(j, j);
          }
          return determinant2;
        }
        get lowerTriangularMatrix() {
          let data = this.LU;
          let rows = data.rows;
          let columns = data.columns;
          let X = new Matrix(rows, columns);
          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
              if (i > j) {
                X.set(i, j, data.get(i, j));
              } else if (i === j) {
                X.set(i, j, 1);
              } else {
                X.set(i, j, 0);
              }
            }
          }
          return X;
        }
        get upperTriangularMatrix() {
          let data = this.LU;
          let rows = data.rows;
          let columns = data.columns;
          let X = new Matrix(rows, columns);
          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
              if (i <= j) {
                X.set(i, j, data.get(i, j));
              } else {
                X.set(i, j, 0);
              }
            }
          }
          return X;
        }
        get pivotPermutationVector() {
          return Array.from(this.pivotVector);
        }
      };
      function hypotenuse(a, b) {
        let r = 0;
        if (Math.abs(a) > Math.abs(b)) {
          r = b / a;
          return Math.abs(a) * Math.sqrt(1 + r * r);
        }
        if (b !== 0) {
          r = a / b;
          return Math.abs(b) * Math.sqrt(1 + r * r);
        }
        return 0;
      }
      var QrDecomposition = class {
        constructor(value) {
          value = WrapperMatrix2D.checkMatrix(value);
          let qr = value.clone();
          let m = value.rows;
          let n = value.columns;
          let rdiag = new Float64Array(n);
          let i, j, k, s;
          for (k = 0; k < n; k++) {
            let nrm = 0;
            for (i = k; i < m; i++) {
              nrm = hypotenuse(nrm, qr.get(i, k));
            }
            if (nrm !== 0) {
              if (qr.get(k, k) < 0) {
                nrm = -nrm;
              }
              for (i = k; i < m; i++) {
                qr.set(i, k, qr.get(i, k) / nrm);
              }
              qr.set(k, k, qr.get(k, k) + 1);
              for (j = k + 1; j < n; j++) {
                s = 0;
                for (i = k; i < m; i++) {
                  s += qr.get(i, k) * qr.get(i, j);
                }
                s = -s / qr.get(k, k);
                for (i = k; i < m; i++) {
                  qr.set(i, j, qr.get(i, j) + s * qr.get(i, k));
                }
              }
            }
            rdiag[k] = -nrm;
          }
          this.QR = qr;
          this.Rdiag = rdiag;
        }
        solve(value) {
          value = Matrix.checkMatrix(value);
          let qr = this.QR;
          let m = qr.rows;
          if (value.rows !== m) {
            throw new Error("Matrix row dimensions must agree");
          }
          if (!this.isFullRank()) {
            throw new Error("Matrix is rank deficient");
          }
          let count = value.columns;
          let X = value.clone();
          let n = qr.columns;
          let i, j, k, s;
          for (k = 0; k < n; k++) {
            for (j = 0; j < count; j++) {
              s = 0;
              for (i = k; i < m; i++) {
                s += qr.get(i, k) * X.get(i, j);
              }
              s = -s / qr.get(k, k);
              for (i = k; i < m; i++) {
                X.set(i, j, X.get(i, j) + s * qr.get(i, k));
              }
            }
          }
          for (k = n - 1; k >= 0; k--) {
            for (j = 0; j < count; j++) {
              X.set(k, j, X.get(k, j) / this.Rdiag[k]);
            }
            for (i = 0; i < k; i++) {
              for (j = 0; j < count; j++) {
                X.set(i, j, X.get(i, j) - X.get(k, j) * qr.get(i, k));
              }
            }
          }
          return X.subMatrix(0, n - 1, 0, count - 1);
        }
        isFullRank() {
          let columns = this.QR.columns;
          for (let i = 0; i < columns; i++) {
            if (this.Rdiag[i] === 0) {
              return false;
            }
          }
          return true;
        }
        get upperTriangularMatrix() {
          let qr = this.QR;
          let n = qr.columns;
          let X = new Matrix(n, n);
          let i, j;
          for (i = 0; i < n; i++) {
            for (j = 0; j < n; j++) {
              if (i < j) {
                X.set(i, j, qr.get(i, j));
              } else if (i === j) {
                X.set(i, j, this.Rdiag[i]);
              } else {
                X.set(i, j, 0);
              }
            }
          }
          return X;
        }
        get orthogonalMatrix() {
          let qr = this.QR;
          let rows = qr.rows;
          let columns = qr.columns;
          let X = new Matrix(rows, columns);
          let i, j, k, s;
          for (k = columns - 1; k >= 0; k--) {
            for (i = 0; i < rows; i++) {
              X.set(i, k, 0);
            }
            X.set(k, k, 1);
            for (j = k; j < columns; j++) {
              if (qr.get(k, k) !== 0) {
                s = 0;
                for (i = k; i < rows; i++) {
                  s += qr.get(i, k) * X.get(i, j);
                }
                s = -s / qr.get(k, k);
                for (i = k; i < rows; i++) {
                  X.set(i, j, X.get(i, j) + s * qr.get(i, k));
                }
              }
            }
          }
          return X;
        }
      };
      var SingularValueDecomposition = class {
        constructor(value, options = {}) {
          value = WrapperMatrix2D.checkMatrix(value);
          if (value.isEmpty()) {
            throw new Error("Matrix must be non-empty");
          }
          let m = value.rows;
          let n = value.columns;
          const {
            computeLeftSingularVectors = true,
            computeRightSingularVectors = true,
            autoTranspose = false
          } = options;
          let wantu = Boolean(computeLeftSingularVectors);
          let wantv = Boolean(computeRightSingularVectors);
          let swapped = false;
          let a;
          if (m < n) {
            if (!autoTranspose) {
              a = value.clone();
              console.warn("Computing SVD on a matrix with more columns than rows. Consider enabling autoTranspose");
            } else {
              a = value.transpose();
              m = a.rows;
              n = a.columns;
              swapped = true;
              let aux = wantu;
              wantu = wantv;
              wantv = aux;
            }
          } else {
            a = value.clone();
          }
          let nu = Math.min(m, n);
          let ni = Math.min(m + 1, n);
          let s = new Float64Array(ni);
          let U = new Matrix(m, nu);
          let V = new Matrix(n, n);
          let e = new Float64Array(n);
          let work = new Float64Array(m);
          let si = new Float64Array(ni);
          for (let i = 0; i < ni; i++)
            si[i] = i;
          let nct = Math.min(m - 1, n);
          let nrt = Math.max(0, Math.min(n - 2, m));
          let mrc = Math.max(nct, nrt);
          for (let k = 0; k < mrc; k++) {
            if (k < nct) {
              s[k] = 0;
              for (let i = k; i < m; i++) {
                s[k] = hypotenuse(s[k], a.get(i, k));
              }
              if (s[k] !== 0) {
                if (a.get(k, k) < 0) {
                  s[k] = -s[k];
                }
                for (let i = k; i < m; i++) {
                  a.set(i, k, a.get(i, k) / s[k]);
                }
                a.set(k, k, a.get(k, k) + 1);
              }
              s[k] = -s[k];
            }
            for (let j = k + 1; j < n; j++) {
              if (k < nct && s[k] !== 0) {
                let t = 0;
                for (let i = k; i < m; i++) {
                  t += a.get(i, k) * a.get(i, j);
                }
                t = -t / a.get(k, k);
                for (let i = k; i < m; i++) {
                  a.set(i, j, a.get(i, j) + t * a.get(i, k));
                }
              }
              e[j] = a.get(k, j);
            }
            if (wantu && k < nct) {
              for (let i = k; i < m; i++) {
                U.set(i, k, a.get(i, k));
              }
            }
            if (k < nrt) {
              e[k] = 0;
              for (let i = k + 1; i < n; i++) {
                e[k] = hypotenuse(e[k], e[i]);
              }
              if (e[k] !== 0) {
                if (e[k + 1] < 0) {
                  e[k] = 0 - e[k];
                }
                for (let i = k + 1; i < n; i++) {
                  e[i] /= e[k];
                }
                e[k + 1] += 1;
              }
              e[k] = -e[k];
              if (k + 1 < m && e[k] !== 0) {
                for (let i = k + 1; i < m; i++) {
                  work[i] = 0;
                }
                for (let i = k + 1; i < m; i++) {
                  for (let j = k + 1; j < n; j++) {
                    work[i] += e[j] * a.get(i, j);
                  }
                }
                for (let j = k + 1; j < n; j++) {
                  let t = -e[j] / e[k + 1];
                  for (let i = k + 1; i < m; i++) {
                    a.set(i, j, a.get(i, j) + t * work[i]);
                  }
                }
              }
              if (wantv) {
                for (let i = k + 1; i < n; i++) {
                  V.set(i, k, e[i]);
                }
              }
            }
          }
          let p = Math.min(n, m + 1);
          if (nct < n) {
            s[nct] = a.get(nct, nct);
          }
          if (m < p) {
            s[p - 1] = 0;
          }
          if (nrt + 1 < p) {
            e[nrt] = a.get(nrt, p - 1);
          }
          e[p - 1] = 0;
          if (wantu) {
            for (let j = nct; j < nu; j++) {
              for (let i = 0; i < m; i++) {
                U.set(i, j, 0);
              }
              U.set(j, j, 1);
            }
            for (let k = nct - 1; k >= 0; k--) {
              if (s[k] !== 0) {
                for (let j = k + 1; j < nu; j++) {
                  let t = 0;
                  for (let i = k; i < m; i++) {
                    t += U.get(i, k) * U.get(i, j);
                  }
                  t = -t / U.get(k, k);
                  for (let i = k; i < m; i++) {
                    U.set(i, j, U.get(i, j) + t * U.get(i, k));
                  }
                }
                for (let i = k; i < m; i++) {
                  U.set(i, k, -U.get(i, k));
                }
                U.set(k, k, 1 + U.get(k, k));
                for (let i = 0; i < k - 1; i++) {
                  U.set(i, k, 0);
                }
              } else {
                for (let i = 0; i < m; i++) {
                  U.set(i, k, 0);
                }
                U.set(k, k, 1);
              }
            }
          }
          if (wantv) {
            for (let k = n - 1; k >= 0; k--) {
              if (k < nrt && e[k] !== 0) {
                for (let j = k + 1; j < n; j++) {
                  let t = 0;
                  for (let i = k + 1; i < n; i++) {
                    t += V.get(i, k) * V.get(i, j);
                  }
                  t = -t / V.get(k + 1, k);
                  for (let i = k + 1; i < n; i++) {
                    V.set(i, j, V.get(i, j) + t * V.get(i, k));
                  }
                }
              }
              for (let i = 0; i < n; i++) {
                V.set(i, k, 0);
              }
              V.set(k, k, 1);
            }
          }
          let pp = p - 1;
          let eps = Number.EPSILON;
          while (p > 0) {
            let k, kase;
            for (k = p - 2; k >= -1; k--) {
              if (k === -1) {
                break;
              }
              const alpha = Number.MIN_VALUE + eps * Math.abs(s[k] + Math.abs(s[k + 1]));
              if (Math.abs(e[k]) <= alpha || Number.isNaN(e[k])) {
                e[k] = 0;
                break;
              }
            }
            if (k === p - 2) {
              kase = 4;
            } else {
              let ks;
              for (ks = p - 1; ks >= k; ks--) {
                if (ks === k) {
                  break;
                }
                let t = (ks !== p ? Math.abs(e[ks]) : 0) + (ks !== k + 1 ? Math.abs(e[ks - 1]) : 0);
                if (Math.abs(s[ks]) <= eps * t) {
                  s[ks] = 0;
                  break;
                }
              }
              if (ks === k) {
                kase = 3;
              } else if (ks === p - 1) {
                kase = 1;
              } else {
                kase = 2;
                k = ks;
              }
            }
            k++;
            switch (kase) {
              case 1: {
                let f = e[p - 2];
                e[p - 2] = 0;
                for (let j = p - 2; j >= k; j--) {
                  let t = hypotenuse(s[j], f);
                  let cs = s[j] / t;
                  let sn = f / t;
                  s[j] = t;
                  if (j !== k) {
                    f = -sn * e[j - 1];
                    e[j - 1] = cs * e[j - 1];
                  }
                  if (wantv) {
                    for (let i = 0; i < n; i++) {
                      t = cs * V.get(i, j) + sn * V.get(i, p - 1);
                      V.set(i, p - 1, -sn * V.get(i, j) + cs * V.get(i, p - 1));
                      V.set(i, j, t);
                    }
                  }
                }
                break;
              }
              case 2: {
                let f = e[k - 1];
                e[k - 1] = 0;
                for (let j = k; j < p; j++) {
                  let t = hypotenuse(s[j], f);
                  let cs = s[j] / t;
                  let sn = f / t;
                  s[j] = t;
                  f = -sn * e[j];
                  e[j] = cs * e[j];
                  if (wantu) {
                    for (let i = 0; i < m; i++) {
                      t = cs * U.get(i, j) + sn * U.get(i, k - 1);
                      U.set(i, k - 1, -sn * U.get(i, j) + cs * U.get(i, k - 1));
                      U.set(i, j, t);
                    }
                  }
                }
                break;
              }
              case 3: {
                const scale = Math.max(Math.abs(s[p - 1]), Math.abs(s[p - 2]), Math.abs(e[p - 2]), Math.abs(s[k]), Math.abs(e[k]));
                const sp = s[p - 1] / scale;
                const spm1 = s[p - 2] / scale;
                const epm1 = e[p - 2] / scale;
                const sk = s[k] / scale;
                const ek = e[k] / scale;
                const b = ((spm1 + sp) * (spm1 - sp) + epm1 * epm1) / 2;
                const c = sp * epm1 * (sp * epm1);
                let shift = 0;
                if (b !== 0 || c !== 0) {
                  if (b < 0) {
                    shift = 0 - Math.sqrt(b * b + c);
                  } else {
                    shift = Math.sqrt(b * b + c);
                  }
                  shift = c / (b + shift);
                }
                let f = (sk + sp) * (sk - sp) + shift;
                let g = sk * ek;
                for (let j = k; j < p - 1; j++) {
                  let t = hypotenuse(f, g);
                  if (t === 0)
                    t = Number.MIN_VALUE;
                  let cs = f / t;
                  let sn = g / t;
                  if (j !== k) {
                    e[j - 1] = t;
                  }
                  f = cs * s[j] + sn * e[j];
                  e[j] = cs * e[j] - sn * s[j];
                  g = sn * s[j + 1];
                  s[j + 1] = cs * s[j + 1];
                  if (wantv) {
                    for (let i = 0; i < n; i++) {
                      t = cs * V.get(i, j) + sn * V.get(i, j + 1);
                      V.set(i, j + 1, -sn * V.get(i, j) + cs * V.get(i, j + 1));
                      V.set(i, j, t);
                    }
                  }
                  t = hypotenuse(f, g);
                  if (t === 0)
                    t = Number.MIN_VALUE;
                  cs = f / t;
                  sn = g / t;
                  s[j] = t;
                  f = cs * e[j] + sn * s[j + 1];
                  s[j + 1] = -sn * e[j] + cs * s[j + 1];
                  g = sn * e[j + 1];
                  e[j + 1] = cs * e[j + 1];
                  if (wantu && j < m - 1) {
                    for (let i = 0; i < m; i++) {
                      t = cs * U.get(i, j) + sn * U.get(i, j + 1);
                      U.set(i, j + 1, -sn * U.get(i, j) + cs * U.get(i, j + 1));
                      U.set(i, j, t);
                    }
                  }
                }
                e[p - 2] = f;
                break;
              }
              case 4: {
                if (s[k] <= 0) {
                  s[k] = s[k] < 0 ? -s[k] : 0;
                  if (wantv) {
                    for (let i = 0; i <= pp; i++) {
                      V.set(i, k, -V.get(i, k));
                    }
                  }
                }
                while (k < pp) {
                  if (s[k] >= s[k + 1]) {
                    break;
                  }
                  let t = s[k];
                  s[k] = s[k + 1];
                  s[k + 1] = t;
                  if (wantv && k < n - 1) {
                    for (let i = 0; i < n; i++) {
                      t = V.get(i, k + 1);
                      V.set(i, k + 1, V.get(i, k));
                      V.set(i, k, t);
                    }
                  }
                  if (wantu && k < m - 1) {
                    for (let i = 0; i < m; i++) {
                      t = U.get(i, k + 1);
                      U.set(i, k + 1, U.get(i, k));
                      U.set(i, k, t);
                    }
                  }
                  k++;
                }
                p--;
                break;
              }
            }
          }
          if (swapped) {
            let tmp = V;
            V = U;
            U = tmp;
          }
          this.m = m;
          this.n = n;
          this.s = s;
          this.U = U;
          this.V = V;
        }
        solve(value) {
          let Y = value;
          let e = this.threshold;
          let scols = this.s.length;
          let Ls = Matrix.zeros(scols, scols);
          for (let i = 0; i < scols; i++) {
            if (Math.abs(this.s[i]) <= e) {
              Ls.set(i, i, 0);
            } else {
              Ls.set(i, i, 1 / this.s[i]);
            }
          }
          let U = this.U;
          let V = this.rightSingularVectors;
          let VL = V.mmul(Ls);
          let vrows = V.rows;
          let urows = U.rows;
          let VLU = Matrix.zeros(vrows, urows);
          for (let i = 0; i < vrows; i++) {
            for (let j = 0; j < urows; j++) {
              let sum = 0;
              for (let k = 0; k < scols; k++) {
                sum += VL.get(i, k) * U.get(j, k);
              }
              VLU.set(i, j, sum);
            }
          }
          return VLU.mmul(Y);
        }
        solveForDiagonal(value) {
          return this.solve(Matrix.diag(value));
        }
        inverse() {
          let V = this.V;
          let e = this.threshold;
          let vrows = V.rows;
          let vcols = V.columns;
          let X = new Matrix(vrows, this.s.length);
          for (let i = 0; i < vrows; i++) {
            for (let j = 0; j < vcols; j++) {
              if (Math.abs(this.s[j]) > e) {
                X.set(i, j, V.get(i, j) / this.s[j]);
              }
            }
          }
          let U = this.U;
          let urows = U.rows;
          let ucols = U.columns;
          let Y = new Matrix(vrows, urows);
          for (let i = 0; i < vrows; i++) {
            for (let j = 0; j < urows; j++) {
              let sum = 0;
              for (let k = 0; k < ucols; k++) {
                sum += X.get(i, k) * U.get(j, k);
              }
              Y.set(i, j, sum);
            }
          }
          return Y;
        }
        get condition() {
          return this.s[0] / this.s[Math.min(this.m, this.n) - 1];
        }
        get norm2() {
          return this.s[0];
        }
        get rank() {
          let tol = Math.max(this.m, this.n) * this.s[0] * Number.EPSILON;
          let r = 0;
          let s = this.s;
          for (let i = 0, ii = s.length; i < ii; i++) {
            if (s[i] > tol) {
              r++;
            }
          }
          return r;
        }
        get diagonal() {
          return Array.from(this.s);
        }
        get threshold() {
          return Number.EPSILON / 2 * Math.max(this.m, this.n) * this.s[0];
        }
        get leftSingularVectors() {
          return this.U;
        }
        get rightSingularVectors() {
          return this.V;
        }
        get diagonalMatrix() {
          return Matrix.diag(this.s);
        }
      };
      function inverse(matrix, useSVD = false) {
        matrix = WrapperMatrix2D.checkMatrix(matrix);
        if (useSVD) {
          return new SingularValueDecomposition(matrix).inverse();
        } else {
          return solve(matrix, Matrix.eye(matrix.rows));
        }
      }
      function solve(leftHandSide, rightHandSide, useSVD = false) {
        leftHandSide = WrapperMatrix2D.checkMatrix(leftHandSide);
        rightHandSide = WrapperMatrix2D.checkMatrix(rightHandSide);
        if (useSVD) {
          return new SingularValueDecomposition(leftHandSide).solve(rightHandSide);
        } else {
          return leftHandSide.isSquare() ? new LuDecomposition(leftHandSide).solve(rightHandSide) : new QrDecomposition(leftHandSide).solve(rightHandSide);
        }
      }
      function determinant(matrix) {
        matrix = Matrix.checkMatrix(matrix);
        if (matrix.isSquare()) {
          if (matrix.columns === 0) {
            return 1;
          }
          let a, b, c, d;
          if (matrix.columns === 2) {
            a = matrix.get(0, 0);
            b = matrix.get(0, 1);
            c = matrix.get(1, 0);
            d = matrix.get(1, 1);
            return a * d - b * c;
          } else if (matrix.columns === 3) {
            let subMatrix0, subMatrix1, subMatrix2;
            subMatrix0 = new MatrixSelectionView(matrix, [1, 2], [1, 2]);
            subMatrix1 = new MatrixSelectionView(matrix, [1, 2], [0, 2]);
            subMatrix2 = new MatrixSelectionView(matrix, [1, 2], [0, 1]);
            a = matrix.get(0, 0);
            b = matrix.get(0, 1);
            c = matrix.get(0, 2);
            return a * determinant(subMatrix0) - b * determinant(subMatrix1) + c * determinant(subMatrix2);
          } else {
            return new LuDecomposition(matrix).determinant;
          }
        } else {
          throw Error("determinant can only be calculated for a square matrix");
        }
      }
      function xrange(n, exception) {
        let range = [];
        for (let i = 0; i < n; i++) {
          if (i !== exception) {
            range.push(i);
          }
        }
        return range;
      }
      function dependenciesOneRow(error, matrix, index, thresholdValue = 1e-9, thresholdError = 1e-9) {
        if (error > thresholdError) {
          return new Array(matrix.rows + 1).fill(0);
        } else {
          let returnArray = matrix.addRow(index, [0]);
          for (let i = 0; i < returnArray.rows; i++) {
            if (Math.abs(returnArray.get(i, 0)) < thresholdValue) {
              returnArray.set(i, 0, 0);
            }
          }
          return returnArray.to1DArray();
        }
      }
      function linearDependencies(matrix, options = {}) {
        const { thresholdValue = 1e-9, thresholdError = 1e-9 } = options;
        matrix = Matrix.checkMatrix(matrix);
        let n = matrix.rows;
        let results = new Matrix(n, n);
        for (let i = 0; i < n; i++) {
          let b = Matrix.columnVector(matrix.getRow(i));
          let Abis = matrix.subMatrixRow(xrange(n, i)).transpose();
          let svd = new SingularValueDecomposition(Abis);
          let x = svd.solve(b);
          let error = Matrix.sub(b, Abis.mmul(x)).abs().max();
          results.setRow(i, dependenciesOneRow(error, x, i, thresholdValue, thresholdError));
        }
        return results;
      }
      function pseudoInverse(matrix, threshold = Number.EPSILON) {
        matrix = Matrix.checkMatrix(matrix);
        if (matrix.isEmpty()) {
          return matrix.transpose();
        }
        let svdSolution = new SingularValueDecomposition(matrix, { autoTranspose: true });
        let U = svdSolution.leftSingularVectors;
        let V = svdSolution.rightSingularVectors;
        let s = svdSolution.diagonal;
        for (let i = 0; i < s.length; i++) {
          if (Math.abs(s[i]) > threshold) {
            s[i] = 1 / s[i];
          } else {
            s[i] = 0;
          }
        }
        return V.mmul(Matrix.diag(s).mmul(U.transpose()));
      }
      function covariance(xMatrix, yMatrix = xMatrix, options = {}) {
        xMatrix = new Matrix(xMatrix);
        let yIsSame = false;
        if (typeof yMatrix === "object" && !Matrix.isMatrix(yMatrix) && !Array.isArray(yMatrix)) {
          options = yMatrix;
          yMatrix = xMatrix;
          yIsSame = true;
        } else {
          yMatrix = new Matrix(yMatrix);
        }
        if (xMatrix.rows !== yMatrix.rows) {
          throw new TypeError("Both matrices must have the same number of rows");
        }
        const { center = true } = options;
        if (center) {
          xMatrix = xMatrix.center("column");
          if (!yIsSame) {
            yMatrix = yMatrix.center("column");
          }
        }
        const cov = xMatrix.transpose().mmul(yMatrix);
        for (let i = 0; i < cov.rows; i++) {
          for (let j = 0; j < cov.columns; j++) {
            cov.set(i, j, cov.get(i, j) * (1 / (xMatrix.rows - 1)));
          }
        }
        return cov;
      }
      function correlation(xMatrix, yMatrix = xMatrix, options = {}) {
        xMatrix = new Matrix(xMatrix);
        let yIsSame = false;
        if (typeof yMatrix === "object" && !Matrix.isMatrix(yMatrix) && !Array.isArray(yMatrix)) {
          options = yMatrix;
          yMatrix = xMatrix;
          yIsSame = true;
        } else {
          yMatrix = new Matrix(yMatrix);
        }
        if (xMatrix.rows !== yMatrix.rows) {
          throw new TypeError("Both matrices must have the same number of rows");
        }
        const { center = true, scale = true } = options;
        if (center) {
          xMatrix.center("column");
          if (!yIsSame) {
            yMatrix.center("column");
          }
        }
        if (scale) {
          xMatrix.scale("column");
          if (!yIsSame) {
            yMatrix.scale("column");
          }
        }
        const sdx = xMatrix.standardDeviation("column", { unbiased: true });
        const sdy = yIsSame ? sdx : yMatrix.standardDeviation("column", { unbiased: true });
        const corr = xMatrix.transpose().mmul(yMatrix);
        for (let i = 0; i < corr.rows; i++) {
          for (let j = 0; j < corr.columns; j++) {
            corr.set(i, j, corr.get(i, j) * (1 / (sdx[i] * sdy[j])) * (1 / (xMatrix.rows - 1)));
          }
        }
        return corr;
      }
      var EigenvalueDecomposition = class {
        constructor(matrix, options = {}) {
          const { assumeSymmetric = false } = options;
          matrix = WrapperMatrix2D.checkMatrix(matrix);
          if (!matrix.isSquare()) {
            throw new Error("Matrix is not a square matrix");
          }
          if (matrix.isEmpty()) {
            throw new Error("Matrix must be non-empty");
          }
          let n = matrix.columns;
          let V = new Matrix(n, n);
          let d = new Float64Array(n);
          let e = new Float64Array(n);
          let value = matrix;
          let i, j;
          let isSymmetric = false;
          if (assumeSymmetric) {
            isSymmetric = true;
          } else {
            isSymmetric = matrix.isSymmetric();
          }
          if (isSymmetric) {
            for (i = 0; i < n; i++) {
              for (j = 0; j < n; j++) {
                V.set(i, j, value.get(i, j));
              }
            }
            tred2(n, e, d, V);
            tql2(n, e, d, V);
          } else {
            let H = new Matrix(n, n);
            let ort = new Float64Array(n);
            for (j = 0; j < n; j++) {
              for (i = 0; i < n; i++) {
                H.set(i, j, value.get(i, j));
              }
            }
            orthes(n, H, ort, V);
            hqr2(n, e, d, V, H);
          }
          this.n = n;
          this.e = e;
          this.d = d;
          this.V = V;
        }
        get realEigenvalues() {
          return Array.from(this.d);
        }
        get imaginaryEigenvalues() {
          return Array.from(this.e);
        }
        get eigenvectorMatrix() {
          return this.V;
        }
        get diagonalMatrix() {
          let n = this.n;
          let e = this.e;
          let d = this.d;
          let X = new Matrix(n, n);
          let i, j;
          for (i = 0; i < n; i++) {
            for (j = 0; j < n; j++) {
              X.set(i, j, 0);
            }
            X.set(i, i, d[i]);
            if (e[i] > 0) {
              X.set(i, i + 1, e[i]);
            } else if (e[i] < 0) {
              X.set(i, i - 1, e[i]);
            }
          }
          return X;
        }
      };
      function tred2(n, e, d, V) {
        let f, g, h, i, j, k, hh, scale;
        for (j = 0; j < n; j++) {
          d[j] = V.get(n - 1, j);
        }
        for (i = n - 1; i > 0; i--) {
          scale = 0;
          h = 0;
          for (k = 0; k < i; k++) {
            scale = scale + Math.abs(d[k]);
          }
          if (scale === 0) {
            e[i] = d[i - 1];
            for (j = 0; j < i; j++) {
              d[j] = V.get(i - 1, j);
              V.set(i, j, 0);
              V.set(j, i, 0);
            }
          } else {
            for (k = 0; k < i; k++) {
              d[k] /= scale;
              h += d[k] * d[k];
            }
            f = d[i - 1];
            g = Math.sqrt(h);
            if (f > 0) {
              g = -g;
            }
            e[i] = scale * g;
            h = h - f * g;
            d[i - 1] = f - g;
            for (j = 0; j < i; j++) {
              e[j] = 0;
            }
            for (j = 0; j < i; j++) {
              f = d[j];
              V.set(j, i, f);
              g = e[j] + V.get(j, j) * f;
              for (k = j + 1; k <= i - 1; k++) {
                g += V.get(k, j) * d[k];
                e[k] += V.get(k, j) * f;
              }
              e[j] = g;
            }
            f = 0;
            for (j = 0; j < i; j++) {
              e[j] /= h;
              f += e[j] * d[j];
            }
            hh = f / (h + h);
            for (j = 0; j < i; j++) {
              e[j] -= hh * d[j];
            }
            for (j = 0; j < i; j++) {
              f = d[j];
              g = e[j];
              for (k = j; k <= i - 1; k++) {
                V.set(k, j, V.get(k, j) - (f * e[k] + g * d[k]));
              }
              d[j] = V.get(i - 1, j);
              V.set(i, j, 0);
            }
          }
          d[i] = h;
        }
        for (i = 0; i < n - 1; i++) {
          V.set(n - 1, i, V.get(i, i));
          V.set(i, i, 1);
          h = d[i + 1];
          if (h !== 0) {
            for (k = 0; k <= i; k++) {
              d[k] = V.get(k, i + 1) / h;
            }
            for (j = 0; j <= i; j++) {
              g = 0;
              for (k = 0; k <= i; k++) {
                g += V.get(k, i + 1) * V.get(k, j);
              }
              for (k = 0; k <= i; k++) {
                V.set(k, j, V.get(k, j) - g * d[k]);
              }
            }
          }
          for (k = 0; k <= i; k++) {
            V.set(k, i + 1, 0);
          }
        }
        for (j = 0; j < n; j++) {
          d[j] = V.get(n - 1, j);
          V.set(n - 1, j, 0);
        }
        V.set(n - 1, n - 1, 1);
        e[0] = 0;
      }
      function tql2(n, e, d, V) {
        let g, h, i, j, k, l, m, p, r, dl1, c, c2, c3, el1, s, s2;
        for (i = 1; i < n; i++) {
          e[i - 1] = e[i];
        }
        e[n - 1] = 0;
        let f = 0;
        let tst1 = 0;
        let eps = Number.EPSILON;
        for (l = 0; l < n; l++) {
          tst1 = Math.max(tst1, Math.abs(d[l]) + Math.abs(e[l]));
          m = l;
          while (m < n) {
            if (Math.abs(e[m]) <= eps * tst1) {
              break;
            }
            m++;
          }
          if (m > l) {
            do {
              g = d[l];
              p = (d[l + 1] - g) / (2 * e[l]);
              r = hypotenuse(p, 1);
              if (p < 0) {
                r = -r;
              }
              d[l] = e[l] / (p + r);
              d[l + 1] = e[l] * (p + r);
              dl1 = d[l + 1];
              h = g - d[l];
              for (i = l + 2; i < n; i++) {
                d[i] -= h;
              }
              f = f + h;
              p = d[m];
              c = 1;
              c2 = c;
              c3 = c;
              el1 = e[l + 1];
              s = 0;
              s2 = 0;
              for (i = m - 1; i >= l; i--) {
                c3 = c2;
                c2 = c;
                s2 = s;
                g = c * e[i];
                h = c * p;
                r = hypotenuse(p, e[i]);
                e[i + 1] = s * r;
                s = e[i] / r;
                c = p / r;
                p = c * d[i] - s * g;
                d[i + 1] = h + s * (c * g + s * d[i]);
                for (k = 0; k < n; k++) {
                  h = V.get(k, i + 1);
                  V.set(k, i + 1, s * V.get(k, i) + c * h);
                  V.set(k, i, c * V.get(k, i) - s * h);
                }
              }
              p = -s * s2 * c3 * el1 * e[l] / dl1;
              e[l] = s * p;
              d[l] = c * p;
            } while (Math.abs(e[l]) > eps * tst1);
          }
          d[l] = d[l] + f;
          e[l] = 0;
        }
        for (i = 0; i < n - 1; i++) {
          k = i;
          p = d[i];
          for (j = i + 1; j < n; j++) {
            if (d[j] < p) {
              k = j;
              p = d[j];
            }
          }
          if (k !== i) {
            d[k] = d[i];
            d[i] = p;
            for (j = 0; j < n; j++) {
              p = V.get(j, i);
              V.set(j, i, V.get(j, k));
              V.set(j, k, p);
            }
          }
        }
      }
      function orthes(n, H, ort, V) {
        let low = 0;
        let high = n - 1;
        let f, g, h, i, j, m;
        let scale;
        for (m = low + 1; m <= high - 1; m++) {
          scale = 0;
          for (i = m; i <= high; i++) {
            scale = scale + Math.abs(H.get(i, m - 1));
          }
          if (scale !== 0) {
            h = 0;
            for (i = high; i >= m; i--) {
              ort[i] = H.get(i, m - 1) / scale;
              h += ort[i] * ort[i];
            }
            g = Math.sqrt(h);
            if (ort[m] > 0) {
              g = -g;
            }
            h = h - ort[m] * g;
            ort[m] = ort[m] - g;
            for (j = m; j < n; j++) {
              f = 0;
              for (i = high; i >= m; i--) {
                f += ort[i] * H.get(i, j);
              }
              f = f / h;
              for (i = m; i <= high; i++) {
                H.set(i, j, H.get(i, j) - f * ort[i]);
              }
            }
            for (i = 0; i <= high; i++) {
              f = 0;
              for (j = high; j >= m; j--) {
                f += ort[j] * H.get(i, j);
              }
              f = f / h;
              for (j = m; j <= high; j++) {
                H.set(i, j, H.get(i, j) - f * ort[j]);
              }
            }
            ort[m] = scale * ort[m];
            H.set(m, m - 1, scale * g);
          }
        }
        for (i = 0; i < n; i++) {
          for (j = 0; j < n; j++) {
            V.set(i, j, i === j ? 1 : 0);
          }
        }
        for (m = high - 1; m >= low + 1; m--) {
          if (H.get(m, m - 1) !== 0) {
            for (i = m + 1; i <= high; i++) {
              ort[i] = H.get(i, m - 1);
            }
            for (j = m; j <= high; j++) {
              g = 0;
              for (i = m; i <= high; i++) {
                g += ort[i] * V.get(i, j);
              }
              g = g / ort[m] / H.get(m, m - 1);
              for (i = m; i <= high; i++) {
                V.set(i, j, V.get(i, j) + g * ort[i]);
              }
            }
          }
        }
      }
      function hqr2(nn, e, d, V, H) {
        let n = nn - 1;
        let low = 0;
        let high = nn - 1;
        let eps = Number.EPSILON;
        let exshift = 0;
        let norm = 0;
        let p = 0;
        let q = 0;
        let r = 0;
        let s = 0;
        let z = 0;
        let iter = 0;
        let i, j, k, l, m, t, w, x, y;
        let ra, sa, vr, vi;
        let notlast, cdivres;
        for (i = 0; i < nn; i++) {
          if (i < low || i > high) {
            d[i] = H.get(i, i);
            e[i] = 0;
          }
          for (j = Math.max(i - 1, 0); j < nn; j++) {
            norm = norm + Math.abs(H.get(i, j));
          }
        }
        while (n >= low) {
          l = n;
          while (l > low) {
            s = Math.abs(H.get(l - 1, l - 1)) + Math.abs(H.get(l, l));
            if (s === 0) {
              s = norm;
            }
            if (Math.abs(H.get(l, l - 1)) < eps * s) {
              break;
            }
            l--;
          }
          if (l === n) {
            H.set(n, n, H.get(n, n) + exshift);
            d[n] = H.get(n, n);
            e[n] = 0;
            n--;
            iter = 0;
          } else if (l === n - 1) {
            w = H.get(n, n - 1) * H.get(n - 1, n);
            p = (H.get(n - 1, n - 1) - H.get(n, n)) / 2;
            q = p * p + w;
            z = Math.sqrt(Math.abs(q));
            H.set(n, n, H.get(n, n) + exshift);
            H.set(n - 1, n - 1, H.get(n - 1, n - 1) + exshift);
            x = H.get(n, n);
            if (q >= 0) {
              z = p >= 0 ? p + z : p - z;
              d[n - 1] = x + z;
              d[n] = d[n - 1];
              if (z !== 0) {
                d[n] = x - w / z;
              }
              e[n - 1] = 0;
              e[n] = 0;
              x = H.get(n, n - 1);
              s = Math.abs(x) + Math.abs(z);
              p = x / s;
              q = z / s;
              r = Math.sqrt(p * p + q * q);
              p = p / r;
              q = q / r;
              for (j = n - 1; j < nn; j++) {
                z = H.get(n - 1, j);
                H.set(n - 1, j, q * z + p * H.get(n, j));
                H.set(n, j, q * H.get(n, j) - p * z);
              }
              for (i = 0; i <= n; i++) {
                z = H.get(i, n - 1);
                H.set(i, n - 1, q * z + p * H.get(i, n));
                H.set(i, n, q * H.get(i, n) - p * z);
              }
              for (i = low; i <= high; i++) {
                z = V.get(i, n - 1);
                V.set(i, n - 1, q * z + p * V.get(i, n));
                V.set(i, n, q * V.get(i, n) - p * z);
              }
            } else {
              d[n - 1] = x + p;
              d[n] = x + p;
              e[n - 1] = z;
              e[n] = -z;
            }
            n = n - 2;
            iter = 0;
          } else {
            x = H.get(n, n);
            y = 0;
            w = 0;
            if (l < n) {
              y = H.get(n - 1, n - 1);
              w = H.get(n, n - 1) * H.get(n - 1, n);
            }
            if (iter === 10) {
              exshift += x;
              for (i = low; i <= n; i++) {
                H.set(i, i, H.get(i, i) - x);
              }
              s = Math.abs(H.get(n, n - 1)) + Math.abs(H.get(n - 1, n - 2));
              x = y = 0.75 * s;
              w = -0.4375 * s * s;
            }
            if (iter === 30) {
              s = (y - x) / 2;
              s = s * s + w;
              if (s > 0) {
                s = Math.sqrt(s);
                if (y < x) {
                  s = -s;
                }
                s = x - w / ((y - x) / 2 + s);
                for (i = low; i <= n; i++) {
                  H.set(i, i, H.get(i, i) - s);
                }
                exshift += s;
                x = y = w = 0.964;
              }
            }
            iter = iter + 1;
            m = n - 2;
            while (m >= l) {
              z = H.get(m, m);
              r = x - z;
              s = y - z;
              p = (r * s - w) / H.get(m + 1, m) + H.get(m, m + 1);
              q = H.get(m + 1, m + 1) - z - r - s;
              r = H.get(m + 2, m + 1);
              s = Math.abs(p) + Math.abs(q) + Math.abs(r);
              p = p / s;
              q = q / s;
              r = r / s;
              if (m === l) {
                break;
              }
              if (Math.abs(H.get(m, m - 1)) * (Math.abs(q) + Math.abs(r)) < eps * (Math.abs(p) * (Math.abs(H.get(m - 1, m - 1)) + Math.abs(z) + Math.abs(H.get(m + 1, m + 1))))) {
                break;
              }
              m--;
            }
            for (i = m + 2; i <= n; i++) {
              H.set(i, i - 2, 0);
              if (i > m + 2) {
                H.set(i, i - 3, 0);
              }
            }
            for (k = m; k <= n - 1; k++) {
              notlast = k !== n - 1;
              if (k !== m) {
                p = H.get(k, k - 1);
                q = H.get(k + 1, k - 1);
                r = notlast ? H.get(k + 2, k - 1) : 0;
                x = Math.abs(p) + Math.abs(q) + Math.abs(r);
                if (x !== 0) {
                  p = p / x;
                  q = q / x;
                  r = r / x;
                }
              }
              if (x === 0) {
                break;
              }
              s = Math.sqrt(p * p + q * q + r * r);
              if (p < 0) {
                s = -s;
              }
              if (s !== 0) {
                if (k !== m) {
                  H.set(k, k - 1, -s * x);
                } else if (l !== m) {
                  H.set(k, k - 1, -H.get(k, k - 1));
                }
                p = p + s;
                x = p / s;
                y = q / s;
                z = r / s;
                q = q / p;
                r = r / p;
                for (j = k; j < nn; j++) {
                  p = H.get(k, j) + q * H.get(k + 1, j);
                  if (notlast) {
                    p = p + r * H.get(k + 2, j);
                    H.set(k + 2, j, H.get(k + 2, j) - p * z);
                  }
                  H.set(k, j, H.get(k, j) - p * x);
                  H.set(k + 1, j, H.get(k + 1, j) - p * y);
                }
                for (i = 0; i <= Math.min(n, k + 3); i++) {
                  p = x * H.get(i, k) + y * H.get(i, k + 1);
                  if (notlast) {
                    p = p + z * H.get(i, k + 2);
                    H.set(i, k + 2, H.get(i, k + 2) - p * r);
                  }
                  H.set(i, k, H.get(i, k) - p);
                  H.set(i, k + 1, H.get(i, k + 1) - p * q);
                }
                for (i = low; i <= high; i++) {
                  p = x * V.get(i, k) + y * V.get(i, k + 1);
                  if (notlast) {
                    p = p + z * V.get(i, k + 2);
                    V.set(i, k + 2, V.get(i, k + 2) - p * r);
                  }
                  V.set(i, k, V.get(i, k) - p);
                  V.set(i, k + 1, V.get(i, k + 1) - p * q);
                }
              }
            }
          }
        }
        if (norm === 0) {
          return;
        }
        for (n = nn - 1; n >= 0; n--) {
          p = d[n];
          q = e[n];
          if (q === 0) {
            l = n;
            H.set(n, n, 1);
            for (i = n - 1; i >= 0; i--) {
              w = H.get(i, i) - p;
              r = 0;
              for (j = l; j <= n; j++) {
                r = r + H.get(i, j) * H.get(j, n);
              }
              if (e[i] < 0) {
                z = w;
                s = r;
              } else {
                l = i;
                if (e[i] === 0) {
                  H.set(i, n, w !== 0 ? -r / w : -r / (eps * norm));
                } else {
                  x = H.get(i, i + 1);
                  y = H.get(i + 1, i);
                  q = (d[i] - p) * (d[i] - p) + e[i] * e[i];
                  t = (x * s - z * r) / q;
                  H.set(i, n, t);
                  H.set(i + 1, n, Math.abs(x) > Math.abs(z) ? (-r - w * t) / x : (-s - y * t) / z);
                }
                t = Math.abs(H.get(i, n));
                if (eps * t * t > 1) {
                  for (j = i; j <= n; j++) {
                    H.set(j, n, H.get(j, n) / t);
                  }
                }
              }
            }
          } else if (q < 0) {
            l = n - 1;
            if (Math.abs(H.get(n, n - 1)) > Math.abs(H.get(n - 1, n))) {
              H.set(n - 1, n - 1, q / H.get(n, n - 1));
              H.set(n - 1, n, -(H.get(n, n) - p) / H.get(n, n - 1));
            } else {
              cdivres = cdiv(0, -H.get(n - 1, n), H.get(n - 1, n - 1) - p, q);
              H.set(n - 1, n - 1, cdivres[0]);
              H.set(n - 1, n, cdivres[1]);
            }
            H.set(n, n - 1, 0);
            H.set(n, n, 1);
            for (i = n - 2; i >= 0; i--) {
              ra = 0;
              sa = 0;
              for (j = l; j <= n; j++) {
                ra = ra + H.get(i, j) * H.get(j, n - 1);
                sa = sa + H.get(i, j) * H.get(j, n);
              }
              w = H.get(i, i) - p;
              if (e[i] < 0) {
                z = w;
                r = ra;
                s = sa;
              } else {
                l = i;
                if (e[i] === 0) {
                  cdivres = cdiv(-ra, -sa, w, q);
                  H.set(i, n - 1, cdivres[0]);
                  H.set(i, n, cdivres[1]);
                } else {
                  x = H.get(i, i + 1);
                  y = H.get(i + 1, i);
                  vr = (d[i] - p) * (d[i] - p) + e[i] * e[i] - q * q;
                  vi = (d[i] - p) * 2 * q;
                  if (vr === 0 && vi === 0) {
                    vr = eps * norm * (Math.abs(w) + Math.abs(q) + Math.abs(x) + Math.abs(y) + Math.abs(z));
                  }
                  cdivres = cdiv(x * r - z * ra + q * sa, x * s - z * sa - q * ra, vr, vi);
                  H.set(i, n - 1, cdivres[0]);
                  H.set(i, n, cdivres[1]);
                  if (Math.abs(x) > Math.abs(z) + Math.abs(q)) {
                    H.set(i + 1, n - 1, (-ra - w * H.get(i, n - 1) + q * H.get(i, n)) / x);
                    H.set(i + 1, n, (-sa - w * H.get(i, n) - q * H.get(i, n - 1)) / x);
                  } else {
                    cdivres = cdiv(-r - y * H.get(i, n - 1), -s - y * H.get(i, n), z, q);
                    H.set(i + 1, n - 1, cdivres[0]);
                    H.set(i + 1, n, cdivres[1]);
                  }
                }
                t = Math.max(Math.abs(H.get(i, n - 1)), Math.abs(H.get(i, n)));
                if (eps * t * t > 1) {
                  for (j = i; j <= n; j++) {
                    H.set(j, n - 1, H.get(j, n - 1) / t);
                    H.set(j, n, H.get(j, n) / t);
                  }
                }
              }
            }
          }
        }
        for (i = 0; i < nn; i++) {
          if (i < low || i > high) {
            for (j = i; j < nn; j++) {
              V.set(i, j, H.get(i, j));
            }
          }
        }
        for (j = nn - 1; j >= low; j--) {
          for (i = low; i <= high; i++) {
            z = 0;
            for (k = low; k <= Math.min(j, high); k++) {
              z = z + V.get(i, k) * H.get(k, j);
            }
            V.set(i, j, z);
          }
        }
      }
      function cdiv(xr, xi, yr, yi) {
        let r, d;
        if (Math.abs(yr) > Math.abs(yi)) {
          r = yi / yr;
          d = yr + r * yi;
          return [(xr + r * xi) / d, (xi - r * xr) / d];
        } else {
          r = yr / yi;
          d = yi + r * yr;
          return [(r * xr + xi) / d, (r * xi - xr) / d];
        }
      }
      var CholeskyDecomposition = class {
        constructor(value) {
          value = WrapperMatrix2D.checkMatrix(value);
          if (!value.isSymmetric()) {
            throw new Error("Matrix is not symmetric");
          }
          let a = value;
          let dimension = a.rows;
          let l = new Matrix(dimension, dimension);
          let positiveDefinite = true;
          let i, j, k;
          for (j = 0; j < dimension; j++) {
            let d = 0;
            for (k = 0; k < j; k++) {
              let s = 0;
              for (i = 0; i < k; i++) {
                s += l.get(k, i) * l.get(j, i);
              }
              s = (a.get(j, k) - s) / l.get(k, k);
              l.set(j, k, s);
              d = d + s * s;
            }
            d = a.get(j, j) - d;
            positiveDefinite &= d > 0;
            l.set(j, j, Math.sqrt(Math.max(d, 0)));
            for (k = j + 1; k < dimension; k++) {
              l.set(j, k, 0);
            }
          }
          this.L = l;
          this.positiveDefinite = Boolean(positiveDefinite);
        }
        isPositiveDefinite() {
          return this.positiveDefinite;
        }
        solve(value) {
          value = WrapperMatrix2D.checkMatrix(value);
          let l = this.L;
          let dimension = l.rows;
          if (value.rows !== dimension) {
            throw new Error("Matrix dimensions do not match");
          }
          if (this.isPositiveDefinite() === false) {
            throw new Error("Matrix is not positive definite");
          }
          let count = value.columns;
          let B = value.clone();
          let i, j, k;
          for (k = 0; k < dimension; k++) {
            for (j = 0; j < count; j++) {
              for (i = 0; i < k; i++) {
                B.set(k, j, B.get(k, j) - B.get(i, j) * l.get(k, i));
              }
              B.set(k, j, B.get(k, j) / l.get(k, k));
            }
          }
          for (k = dimension - 1; k >= 0; k--) {
            for (j = 0; j < count; j++) {
              for (i = k + 1; i < dimension; i++) {
                B.set(k, j, B.get(k, j) - B.get(i, j) * l.get(i, k));
              }
              B.set(k, j, B.get(k, j) / l.get(k, k));
            }
          }
          return B;
        }
        get lowerTriangularMatrix() {
          return this.L;
        }
      };
      var nipals = class {
        constructor(X, options = {}) {
          X = WrapperMatrix2D.checkMatrix(X);
          let { Y } = options;
          const {
            scaleScores = false,
            maxIterations = 1e3,
            terminationCriteria = 1e-10
          } = options;
          let u;
          if (Y) {
            if (Array.isArray(Y) && typeof Y[0] === "number") {
              Y = Matrix.columnVector(Y);
            } else {
              Y = WrapperMatrix2D.checkMatrix(Y);
            }
            if (Y.rows !== X.rows) {
              throw new Error("Y should have the same number of rows as X");
            }
            u = Y.getColumnVector(0);
          } else {
            u = X.getColumnVector(0);
          }
          let diff = 1;
          let t, q, w, tOld;
          for (let counter = 0; counter < maxIterations && diff > terminationCriteria; counter++) {
            w = X.transpose().mmul(u).div(u.transpose().mmul(u).get(0, 0));
            w = w.div(w.norm());
            t = X.mmul(w).div(w.transpose().mmul(w).get(0, 0));
            if (counter > 0) {
              diff = t.clone().sub(tOld).pow(2).sum();
            }
            tOld = t.clone();
            if (Y) {
              q = Y.transpose().mmul(t).div(t.transpose().mmul(t).get(0, 0));
              q = q.div(q.norm());
              u = Y.mmul(q).div(q.transpose().mmul(q).get(0, 0));
            } else {
              u = t;
            }
          }
          if (Y) {
            let p = X.transpose().mmul(t).div(t.transpose().mmul(t).get(0, 0));
            p = p.div(p.norm());
            let xResidual = X.clone().sub(t.clone().mmul(p.transpose()));
            let residual = u.transpose().mmul(t).div(t.transpose().mmul(t).get(0, 0));
            let yResidual = Y.clone().sub(t.clone().mulS(residual.get(0, 0)).mmul(q.transpose()));
            this.t = t;
            this.p = p.transpose();
            this.w = w.transpose();
            this.q = q;
            this.u = u;
            this.s = t.transpose().mmul(t);
            this.xResidual = xResidual;
            this.yResidual = yResidual;
            this.betas = residual;
          } else {
            this.w = w.transpose();
            this.s = t.transpose().mmul(t).sqrt();
            if (scaleScores) {
              this.t = t.clone().div(this.s.get(0, 0));
            } else {
              this.t = t;
            }
            this.xResidual = X.sub(t.mmul(w.transpose()));
          }
        }
      };
      exports.AbstractMatrix = AbstractMatrix;
      exports.CHO = CholeskyDecomposition;
      exports.CholeskyDecomposition = CholeskyDecomposition;
      exports.EVD = EigenvalueDecomposition;
      exports.EigenvalueDecomposition = EigenvalueDecomposition;
      exports.LU = LuDecomposition;
      exports.LuDecomposition = LuDecomposition;
      exports.Matrix = Matrix;
      exports.MatrixColumnSelectionView = MatrixColumnSelectionView;
      exports.MatrixColumnView = MatrixColumnView;
      exports.MatrixFlipColumnView = MatrixFlipColumnView;
      exports.MatrixFlipRowView = MatrixFlipRowView;
      exports.MatrixRowSelectionView = MatrixRowSelectionView;
      exports.MatrixRowView = MatrixRowView;
      exports.MatrixSelectionView = MatrixSelectionView;
      exports.MatrixSubView = MatrixSubView;
      exports.MatrixTransposeView = MatrixTransposeView;
      exports.NIPALS = nipals;
      exports.Nipals = nipals;
      exports.QR = QrDecomposition;
      exports.QrDecomposition = QrDecomposition;
      exports.SVD = SingularValueDecomposition;
      exports.SingularValueDecomposition = SingularValueDecomposition;
      exports.WrapperMatrix1D = WrapperMatrix1D;
      exports.WrapperMatrix2D = WrapperMatrix2D;
      exports.correlation = correlation;
      exports.covariance = covariance;
      exports["default"] = Matrix;
      exports.determinant = determinant;
      exports.inverse = inverse;
      exports.linearDependencies = linearDependencies;
      exports.pseudoInverse = pseudoInverse;
      exports.solve = solve;
      exports.wrap = wrap;
    }
  });

  // node_modules/ml-levenberg-marquardt/lib/index.js
  var require_lib6 = __commonJS({
    "node_modules/ml-levenberg-marquardt/lib/index.js"(exports, module) {
      "use strict";
      function _interopDefault(ex) {
        return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
      }
      var isArray = _interopDefault(require_lib());
      var mlMatrix = require_matrix2();
      function errorCalculation(data, parameters, parameterizedFunction) {
        let error = 0;
        const func = parameterizedFunction(parameters);
        for (let i = 0; i < data.x.length; i++) {
          error += Math.abs(data.y[i] - func(data.x[i]));
        }
        return error;
      }
      function gradientFunction(data, evaluatedData, params2, gradientDifference, paramFunction) {
        const n = params2.length;
        const m = data.x.length;
        let ans = new Array(n);
        for (let param = 0; param < n; param++) {
          ans[param] = new Array(m);
          let auxParams = params2.slice();
          auxParams[param] += gradientDifference;
          let funcParam = paramFunction(auxParams);
          for (let point = 0; point < m; point++) {
            ans[param][point] = evaluatedData[point] - funcParam(data.x[point]);
          }
        }
        return new mlMatrix.Matrix(ans);
      }
      function matrixFunction(data, evaluatedData) {
        const m = data.x.length;
        let ans = new Array(m);
        for (let point = 0; point < m; point++) {
          ans[point] = [data.y[point] - evaluatedData[point]];
        }
        return new mlMatrix.Matrix(ans);
      }
      function step(data, params2, damping, gradientDifference, parameterizedFunction) {
        let value = damping * gradientDifference * gradientDifference;
        let identity = mlMatrix.Matrix.eye(params2.length, params2.length, value);
        const func = parameterizedFunction(params2);
        let evaluatedData = new Float64Array(data.x.length);
        for (let i = 0; i < data.x.length; i++) {
          evaluatedData[i] = func(data.x[i]);
        }
        let gradientFunc = gradientFunction(data, evaluatedData, params2, gradientDifference, parameterizedFunction);
        let matrixFunc = matrixFunction(data, evaluatedData);
        let inverseMatrix = mlMatrix.inverse(identity.add(gradientFunc.mmul(gradientFunc.transpose())));
        params2 = new mlMatrix.Matrix([params2]);
        params2 = params2.sub(inverseMatrix.mmul(gradientFunc).mmul(matrixFunc).mul(gradientDifference).transpose());
        return params2.to1DArray();
      }
      function levenbergMarquardt(data, parameterizedFunction, options = {}) {
        let {
          maxIterations = 100,
          gradientDifference = 0.1,
          damping = 0,
          errorTolerance = 0.01,
          minValues,
          maxValues,
          initialValues
        } = options;
        if (damping <= 0) {
          throw new Error("The damping option must be a positive number");
        } else if (!data.x || !data.y) {
          throw new Error("The data parameter must have x and y elements");
        } else if (!isArray(data.x) || data.x.length < 2 || !isArray(data.y) || data.y.length < 2) {
          throw new Error("The data parameter elements must be an array with more than 2 points");
        } else if (data.x.length !== data.y.length) {
          throw new Error("The data parameter elements must have the same size");
        }
        let parameters = initialValues || new Array(parameterizedFunction.length).fill(1);
        let parLen = parameters.length;
        maxValues = maxValues || new Array(parLen).fill(Number.MAX_SAFE_INTEGER);
        minValues = minValues || new Array(parLen).fill(Number.MIN_SAFE_INTEGER);
        if (maxValues.length !== minValues.length) {
          throw new Error("minValues and maxValues must be the same size");
        }
        if (!isArray(parameters)) {
          throw new Error("initialValues must be an array");
        }
        let error = errorCalculation(data, parameters, parameterizedFunction);
        let converged = error <= errorTolerance;
        let iteration;
        for (iteration = 0; iteration < maxIterations && !converged; iteration++) {
          parameters = step(data, parameters, damping, gradientDifference, parameterizedFunction);
          for (let k = 0; k < parLen; k++) {
            parameters[k] = Math.min(Math.max(minValues[k], parameters[k]), maxValues[k]);
          }
          error = errorCalculation(data, parameters, parameterizedFunction);
          if (isNaN(error))
            break;
          converged = error <= errorTolerance;
        }
        return {
          parameterValues: parameters,
          parameterError: error,
          iterations: iteration
        };
      }
      module.exports = levenbergMarquardt;
    }
  });

  // node_modules/umap-js/dist/umap.js
  var require_umap = __commonJS({
    "node_modules/umap-js/dist/umap.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : new P(function(resolve2) {
              resolve2(result.value);
            }).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __generator = exports && exports.__generator || function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t[0] & 1)
            throw t[1];
          return t[1];
        }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (_)
            try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                return t;
              if (y = 0, t)
                op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _.label < t[2]) {
                    _.label = t[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e) {
              op = [6, e];
              y = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      var __read = exports && exports.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
          return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"]))
              m.call(i);
          } finally {
            if (e)
              throw e.error;
          }
        }
        return ar;
      };
      var __spread = exports && exports.__spread || function() {
        for (var ar = [], i = 0; i < arguments.length; i++)
          ar = ar.concat(__read(arguments[i]));
        return ar;
      };
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k))
              result[k] = mod[k];
        }
        result["default"] = mod;
        return result;
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var heap = __importStar(require_heap());
      var matrix = __importStar(require_matrix());
      var nnDescent = __importStar(require_nn_descent());
      var tree = __importStar(require_tree());
      var utils = __importStar(require_utils());
      var ml_levenberg_marquardt_1 = __importDefault(require_lib6());
      var SMOOTH_K_TOLERANCE = 1e-5;
      var MIN_K_DIST_SCALE = 1e-3;
      var UMAP2 = function() {
        function UMAP3(params2) {
          if (params2 === void 0) {
            params2 = {};
          }
          var _this = this;
          this.learningRate = 1;
          this.localConnectivity = 1;
          this.minDist = 0.1;
          this.nComponents = 2;
          this.nEpochs = 0;
          this.nNeighbors = 15;
          this.negativeSampleRate = 5;
          this.random = Math.random;
          this.repulsionStrength = 1;
          this.setOpMixRatio = 1;
          this.spread = 1;
          this.transformQueueSize = 4;
          this.targetMetric = "categorical";
          this.targetWeight = 0.5;
          this.targetNNeighbors = this.nNeighbors;
          this.distanceFn = euclidean;
          this.isInitialized = false;
          this.rpForest = [];
          this.embedding = [];
          this.optimizationState = new OptimizationState();
          var setParam = function(key) {
            if (params2[key] !== void 0)
              _this[key] = params2[key];
          };
          setParam("distanceFn");
          setParam("learningRate");
          setParam("localConnectivity");
          setParam("minDist");
          setParam("nComponents");
          setParam("nEpochs");
          setParam("nNeighbors");
          setParam("negativeSampleRate");
          setParam("random");
          setParam("repulsionStrength");
          setParam("setOpMixRatio");
          setParam("spread");
          setParam("transformQueueSize");
        }
        UMAP3.prototype.fit = function(X) {
          this.initializeFit(X);
          this.optimizeLayout();
          return this.embedding;
        };
        UMAP3.prototype.fitAsync = function(X, callback) {
          if (callback === void 0) {
            callback = function() {
              return true;
            };
          }
          return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  this.initializeFit(X);
                  return [4, this.optimizeLayoutAsync(callback)];
                case 1:
                  _a.sent();
                  return [2, this.embedding];
              }
            });
          });
        };
        UMAP3.prototype.setSupervisedProjection = function(Y, params2) {
          if (params2 === void 0) {
            params2 = {};
          }
          this.Y = Y;
          this.targetMetric = params2.targetMetric || this.targetMetric;
          this.targetWeight = params2.targetWeight || this.targetWeight;
          this.targetNNeighbors = params2.targetNNeighbors || this.targetNNeighbors;
        };
        UMAP3.prototype.setPrecomputedKNN = function(knnIndices, knnDistances) {
          this.knnIndices = knnIndices;
          this.knnDistances = knnDistances;
        };
        UMAP3.prototype.initializeFit = function(X) {
          if (X.length <= this.nNeighbors) {
            throw new Error("Not enough data points (" + X.length + ") to create nNeighbors: " + this.nNeighbors + ".  Add more data points or adjust the configuration.");
          }
          if (this.X === X && this.isInitialized) {
            return this.getNEpochs();
          }
          this.X = X;
          if (!this.knnIndices && !this.knnDistances) {
            var knnResults = this.nearestNeighbors(X);
            this.knnIndices = knnResults.knnIndices;
            this.knnDistances = knnResults.knnDistances;
          }
          this.graph = this.fuzzySimplicialSet(X, this.nNeighbors, this.setOpMixRatio);
          this.makeSearchFns();
          this.searchGraph = this.makeSearchGraph(X);
          this.processGraphForSupervisedProjection();
          var _a = this.initializeSimplicialSetEmbedding(), head = _a.head, tail = _a.tail, epochsPerSample = _a.epochsPerSample;
          this.optimizationState.head = head;
          this.optimizationState.tail = tail;
          this.optimizationState.epochsPerSample = epochsPerSample;
          this.initializeOptimization();
          this.prepareForOptimizationLoop();
          this.isInitialized = true;
          return this.getNEpochs();
        };
        UMAP3.prototype.makeSearchFns = function() {
          var _a = nnDescent.makeInitializations(this.distanceFn), initFromTree = _a.initFromTree, initFromRandom = _a.initFromRandom;
          this.initFromTree = initFromTree;
          this.initFromRandom = initFromRandom;
          this.search = nnDescent.makeInitializedNNSearch(this.distanceFn);
        };
        UMAP3.prototype.makeSearchGraph = function(X) {
          var knnIndices = this.knnIndices;
          var knnDistances = this.knnDistances;
          var dims = [X.length, X.length];
          var searchGraph = new matrix.SparseMatrix([], [], [], dims);
          for (var i = 0; i < knnIndices.length; i++) {
            var knn = knnIndices[i];
            var distances = knnDistances[i];
            for (var j = 0; j < knn.length; j++) {
              var neighbor = knn[j];
              var distance = distances[j];
              if (distance > 0) {
                searchGraph.set(i, neighbor, distance);
              }
            }
          }
          var transpose = matrix.transpose(searchGraph);
          return matrix.maximum(searchGraph, transpose);
        };
        UMAP3.prototype.transform = function(toTransform) {
          var _this = this;
          var rawData = this.X;
          if (rawData === void 0 || rawData.length === 0) {
            throw new Error("No data has been fit.");
          }
          var nNeighbors = Math.floor(this.nNeighbors * this.transformQueueSize);
          nNeighbors = Math.min(rawData.length, nNeighbors);
          var init = nnDescent.initializeSearch(this.rpForest, rawData, toTransform, nNeighbors, this.initFromRandom, this.initFromTree, this.random);
          var result = this.search(rawData, this.searchGraph, init, toTransform);
          var _a = heap.deheapSort(result), indices = _a.indices, distances = _a.weights;
          indices = indices.map(function(x) {
            return x.slice(0, _this.nNeighbors);
          });
          distances = distances.map(function(x) {
            return x.slice(0, _this.nNeighbors);
          });
          var adjustedLocalConnectivity = Math.max(0, this.localConnectivity - 1);
          var _b = this.smoothKNNDistance(distances, this.nNeighbors, adjustedLocalConnectivity), sigmas = _b.sigmas, rhos = _b.rhos;
          var _c = this.computeMembershipStrengths(indices, distances, sigmas, rhos), rows = _c.rows, cols = _c.cols, vals = _c.vals;
          var size = [toTransform.length, rawData.length];
          var graph = new matrix.SparseMatrix(rows, cols, vals, size);
          var normed = matrix.normalize(graph, "l1");
          var csrMatrix = matrix.getCSR(normed);
          var nPoints = toTransform.length;
          var eIndices = utils.reshape2d(csrMatrix.indices, nPoints, this.nNeighbors);
          var eWeights = utils.reshape2d(csrMatrix.values, nPoints, this.nNeighbors);
          var embedding = initTransform(eIndices, eWeights, this.embedding);
          var nEpochs = this.nEpochs ? this.nEpochs / 3 : graph.nRows <= 1e4 ? 100 : 30;
          var graphMax = graph.getValues().reduce(function(max, val) {
            return val > max ? val : max;
          }, 0);
          graph = graph.map(function(value) {
            return value < graphMax / nEpochs ? 0 : value;
          });
          graph = matrix.eliminateZeros(graph);
          var epochsPerSample = this.makeEpochsPerSample(graph.getValues(), nEpochs);
          var head = graph.getRows();
          var tail = graph.getCols();
          this.assignOptimizationStateParameters({
            headEmbedding: embedding,
            tailEmbedding: this.embedding,
            head,
            tail,
            currentEpoch: 0,
            nEpochs,
            nVertices: graph.getDims()[1],
            epochsPerSample
          });
          this.prepareForOptimizationLoop();
          return this.optimizeLayout();
        };
        UMAP3.prototype.processGraphForSupervisedProjection = function() {
          var _a = this, Y = _a.Y, X = _a.X;
          if (Y) {
            if (Y.length !== X.length) {
              throw new Error("Length of X and y must be equal");
            }
            if (this.targetMetric === "categorical") {
              var lt = this.targetWeight < 1;
              var farDist = lt ? 2.5 * (1 / (1 - this.targetWeight)) : 1e12;
              this.graph = this.categoricalSimplicialSetIntersection(this.graph, Y, farDist);
            }
          }
        };
        UMAP3.prototype.step = function() {
          var currentEpoch = this.optimizationState.currentEpoch;
          if (currentEpoch < this.getNEpochs()) {
            this.optimizeLayoutStep(currentEpoch);
          }
          return this.optimizationState.currentEpoch;
        };
        UMAP3.prototype.getEmbedding = function() {
          return this.embedding;
        };
        UMAP3.prototype.nearestNeighbors = function(X) {
          var _a = this, distanceFn = _a.distanceFn, nNeighbors = _a.nNeighbors;
          var log2 = function(n) {
            return Math.log(n) / Math.log(2);
          };
          var metricNNDescent = nnDescent.makeNNDescent(distanceFn, this.random);
          var round = function(n) {
            return n === 0.5 ? 0 : Math.round(n);
          };
          var nTrees = 5 + Math.floor(round(Math.pow(X.length, 0.5) / 20));
          var nIters = Math.max(5, Math.floor(Math.round(log2(X.length))));
          this.rpForest = tree.makeForest(X, nNeighbors, nTrees, this.random);
          var leafArray = tree.makeLeafArray(this.rpForest);
          var _b = metricNNDescent(X, leafArray, nNeighbors, nIters), indices = _b.indices, weights = _b.weights;
          return { knnIndices: indices, knnDistances: weights };
        };
        UMAP3.prototype.fuzzySimplicialSet = function(X, nNeighbors, setOpMixRatio) {
          if (setOpMixRatio === void 0) {
            setOpMixRatio = 1;
          }
          var _a = this, _b = _a.knnIndices, knnIndices = _b === void 0 ? [] : _b, _c = _a.knnDistances, knnDistances = _c === void 0 ? [] : _c, localConnectivity = _a.localConnectivity;
          var _d = this.smoothKNNDistance(knnDistances, nNeighbors, localConnectivity), sigmas = _d.sigmas, rhos = _d.rhos;
          var _e = this.computeMembershipStrengths(knnIndices, knnDistances, sigmas, rhos), rows = _e.rows, cols = _e.cols, vals = _e.vals;
          var size = [X.length, X.length];
          var sparseMatrix = new matrix.SparseMatrix(rows, cols, vals, size);
          var transpose = matrix.transpose(sparseMatrix);
          var prodMatrix = matrix.pairwiseMultiply(sparseMatrix, transpose);
          var a = matrix.subtract(matrix.add(sparseMatrix, transpose), prodMatrix);
          var b = matrix.multiplyScalar(a, setOpMixRatio);
          var c = matrix.multiplyScalar(prodMatrix, 1 - setOpMixRatio);
          var result = matrix.add(b, c);
          return result;
        };
        UMAP3.prototype.categoricalSimplicialSetIntersection = function(simplicialSet, target2, farDist, unknownDist) {
          if (unknownDist === void 0) {
            unknownDist = 1;
          }
          var intersection = fastIntersection(simplicialSet, target2, unknownDist, farDist);
          intersection = matrix.eliminateZeros(intersection);
          return resetLocalConnectivity(intersection);
        };
        UMAP3.prototype.smoothKNNDistance = function(distances, k, localConnectivity, nIter, bandwidth) {
          if (localConnectivity === void 0) {
            localConnectivity = 1;
          }
          if (nIter === void 0) {
            nIter = 64;
          }
          if (bandwidth === void 0) {
            bandwidth = 1;
          }
          var target2 = Math.log(k) / Math.log(2) * bandwidth;
          var rho = utils.zeros(distances.length);
          var result = utils.zeros(distances.length);
          for (var i = 0; i < distances.length; i++) {
            var lo = 0;
            var hi = Infinity;
            var mid = 1;
            var ithDistances = distances[i];
            var nonZeroDists = ithDistances.filter(function(d2) {
              return d2 > 0;
            });
            if (nonZeroDists.length >= localConnectivity) {
              var index = Math.floor(localConnectivity);
              var interpolation = localConnectivity - index;
              if (index > 0) {
                rho[i] = nonZeroDists[index - 1];
                if (interpolation > SMOOTH_K_TOLERANCE) {
                  rho[i] += interpolation * (nonZeroDists[index] - nonZeroDists[index - 1]);
                }
              } else {
                rho[i] = interpolation * nonZeroDists[0];
              }
            } else if (nonZeroDists.length > 0) {
              rho[i] = utils.max(nonZeroDists);
            }
            for (var n = 0; n < nIter; n++) {
              var psum = 0;
              for (var j = 1; j < distances[i].length; j++) {
                var d = distances[i][j] - rho[i];
                if (d > 0) {
                  psum += Math.exp(-(d / mid));
                } else {
                  psum += 1;
                }
              }
              if (Math.abs(psum - target2) < SMOOTH_K_TOLERANCE) {
                break;
              }
              if (psum > target2) {
                hi = mid;
                mid = (lo + hi) / 2;
              } else {
                lo = mid;
                if (hi === Infinity) {
                  mid *= 2;
                } else {
                  mid = (lo + hi) / 2;
                }
              }
            }
            result[i] = mid;
            if (rho[i] > 0) {
              var meanIthDistances = utils.mean(ithDistances);
              if (result[i] < MIN_K_DIST_SCALE * meanIthDistances) {
                result[i] = MIN_K_DIST_SCALE * meanIthDistances;
              }
            } else {
              var meanDistances = utils.mean(distances.map(utils.mean));
              if (result[i] < MIN_K_DIST_SCALE * meanDistances) {
                result[i] = MIN_K_DIST_SCALE * meanDistances;
              }
            }
          }
          return { sigmas: result, rhos: rho };
        };
        UMAP3.prototype.computeMembershipStrengths = function(knnIndices, knnDistances, sigmas, rhos) {
          var nSamples = knnIndices.length;
          var nNeighbors = knnIndices[0].length;
          var rows = utils.zeros(nSamples * nNeighbors);
          var cols = utils.zeros(nSamples * nNeighbors);
          var vals = utils.zeros(nSamples * nNeighbors);
          for (var i = 0; i < nSamples; i++) {
            for (var j = 0; j < nNeighbors; j++) {
              var val = 0;
              if (knnIndices[i][j] === -1) {
                continue;
              }
              if (knnIndices[i][j] === i) {
                val = 0;
              } else if (knnDistances[i][j] - rhos[i] <= 0) {
                val = 1;
              } else {
                val = Math.exp(-((knnDistances[i][j] - rhos[i]) / sigmas[i]));
              }
              rows[i * nNeighbors + j] = i;
              cols[i * nNeighbors + j] = knnIndices[i][j];
              vals[i * nNeighbors + j] = val;
            }
          }
          return { rows, cols, vals };
        };
        UMAP3.prototype.initializeSimplicialSetEmbedding = function() {
          var _this = this;
          var nEpochs = this.getNEpochs();
          var nComponents = this.nComponents;
          var graphValues = this.graph.getValues();
          var graphMax = 0;
          for (var i = 0; i < graphValues.length; i++) {
            var value = graphValues[i];
            if (graphMax < graphValues[i]) {
              graphMax = value;
            }
          }
          var graph = this.graph.map(function(value2) {
            if (value2 < graphMax / nEpochs) {
              return 0;
            } else {
              return value2;
            }
          });
          this.embedding = utils.zeros(graph.nRows).map(function() {
            return utils.zeros(nComponents).map(function() {
              return utils.tauRand(_this.random) * 20 + -10;
            });
          });
          var weights = [];
          var head = [];
          var tail = [];
          var rowColValues = graph.getAll();
          for (var i = 0; i < rowColValues.length; i++) {
            var entry = rowColValues[i];
            if (entry.value) {
              weights.push(entry.value);
              tail.push(entry.row);
              head.push(entry.col);
            }
          }
          var epochsPerSample = this.makeEpochsPerSample(weights, nEpochs);
          return { head, tail, epochsPerSample };
        };
        UMAP3.prototype.makeEpochsPerSample = function(weights, nEpochs) {
          var result = utils.filled(weights.length, -1);
          var max = utils.max(weights);
          var nSamples = weights.map(function(w) {
            return w / max * nEpochs;
          });
          nSamples.forEach(function(n, i) {
            if (n > 0)
              result[i] = nEpochs / nSamples[i];
          });
          return result;
        };
        UMAP3.prototype.assignOptimizationStateParameters = function(state) {
          Object.assign(this.optimizationState, state);
        };
        UMAP3.prototype.prepareForOptimizationLoop = function() {
          var _a = this, repulsionStrength = _a.repulsionStrength, learningRate = _a.learningRate, negativeSampleRate = _a.negativeSampleRate;
          var _b = this.optimizationState, epochsPerSample = _b.epochsPerSample, headEmbedding = _b.headEmbedding, tailEmbedding = _b.tailEmbedding;
          var dim = headEmbedding[0].length;
          var moveOther = headEmbedding.length === tailEmbedding.length;
          var epochsPerNegativeSample = epochsPerSample.map(function(e) {
            return e / negativeSampleRate;
          });
          var epochOfNextNegativeSample = __spread(epochsPerNegativeSample);
          var epochOfNextSample = __spread(epochsPerSample);
          this.assignOptimizationStateParameters({
            epochOfNextSample,
            epochOfNextNegativeSample,
            epochsPerNegativeSample,
            moveOther,
            initialAlpha: learningRate,
            alpha: learningRate,
            gamma: repulsionStrength,
            dim
          });
        };
        UMAP3.prototype.initializeOptimization = function() {
          var headEmbedding = this.embedding;
          var tailEmbedding = this.embedding;
          var _a = this.optimizationState, head = _a.head, tail = _a.tail, epochsPerSample = _a.epochsPerSample;
          var nEpochs = this.getNEpochs();
          var nVertices = this.graph.nCols;
          var _b = findABParams(this.spread, this.minDist), a = _b.a, b = _b.b;
          this.assignOptimizationStateParameters({
            headEmbedding,
            tailEmbedding,
            head,
            tail,
            epochsPerSample,
            a,
            b,
            nEpochs,
            nVertices
          });
        };
        UMAP3.prototype.optimizeLayoutStep = function(n) {
          var optimizationState = this.optimizationState;
          var head = optimizationState.head, tail = optimizationState.tail, headEmbedding = optimizationState.headEmbedding, tailEmbedding = optimizationState.tailEmbedding, epochsPerSample = optimizationState.epochsPerSample, epochOfNextSample = optimizationState.epochOfNextSample, epochOfNextNegativeSample = optimizationState.epochOfNextNegativeSample, epochsPerNegativeSample = optimizationState.epochsPerNegativeSample, moveOther = optimizationState.moveOther, initialAlpha = optimizationState.initialAlpha, alpha = optimizationState.alpha, gamma = optimizationState.gamma, a = optimizationState.a, b = optimizationState.b, dim = optimizationState.dim, nEpochs = optimizationState.nEpochs, nVertices = optimizationState.nVertices;
          var clipValue = 4;
          for (var i = 0; i < epochsPerSample.length; i++) {
            if (epochOfNextSample[i] > n) {
              continue;
            }
            var j = head[i];
            var k = tail[i];
            var current = headEmbedding[j];
            var other = tailEmbedding[k];
            var distSquared = rDist(current, other);
            var gradCoeff = 0;
            if (distSquared > 0) {
              gradCoeff = -2 * a * b * Math.pow(distSquared, b - 1);
              gradCoeff /= a * Math.pow(distSquared, b) + 1;
            }
            for (var d = 0; d < dim; d++) {
              var gradD = clip(gradCoeff * (current[d] - other[d]), clipValue);
              current[d] += gradD * alpha;
              if (moveOther) {
                other[d] += -gradD * alpha;
              }
            }
            epochOfNextSample[i] += epochsPerSample[i];
            var nNegSamples = Math.floor((n - epochOfNextNegativeSample[i]) / epochsPerNegativeSample[i]);
            for (var p = 0; p < nNegSamples; p++) {
              var k_1 = utils.tauRandInt(nVertices, this.random);
              var other_1 = tailEmbedding[k_1];
              var distSquared_1 = rDist(current, other_1);
              var gradCoeff_1 = 0;
              if (distSquared_1 > 0) {
                gradCoeff_1 = 2 * gamma * b;
                gradCoeff_1 /= (1e-3 + distSquared_1) * (a * Math.pow(distSquared_1, b) + 1);
              } else if (j === k_1) {
                continue;
              }
              for (var d = 0; d < dim; d++) {
                var gradD = 4;
                if (gradCoeff_1 > 0) {
                  gradD = clip(gradCoeff_1 * (current[d] - other_1[d]), clipValue);
                }
                current[d] += gradD * alpha;
              }
            }
            epochOfNextNegativeSample[i] += nNegSamples * epochsPerNegativeSample[i];
          }
          optimizationState.alpha = initialAlpha * (1 - n / nEpochs);
          optimizationState.currentEpoch += 1;
          return headEmbedding;
        };
        UMAP3.prototype.optimizeLayoutAsync = function(epochCallback) {
          var _this = this;
          if (epochCallback === void 0) {
            epochCallback = function() {
              return true;
            };
          }
          return new Promise(function(resolve, reject) {
            var step = function() {
              return __awaiter(_this, void 0, void 0, function() {
                var _a, nEpochs, currentEpoch, epochCompleted, shouldStop, isFinished;
                return __generator(this, function(_b) {
                  try {
                    _a = this.optimizationState, nEpochs = _a.nEpochs, currentEpoch = _a.currentEpoch;
                    this.embedding = this.optimizeLayoutStep(currentEpoch);
                    epochCompleted = this.optimizationState.currentEpoch;
                    shouldStop = epochCallback(epochCompleted) === false;
                    isFinished = epochCompleted === nEpochs;
                    if (!shouldStop && !isFinished) {
                      setTimeout(function() {
                        return step();
                      }, 0);
                    } else {
                      return [2, resolve(isFinished)];
                    }
                  } catch (err) {
                    reject(err);
                  }
                  return [2];
                });
              });
            };
            setTimeout(function() {
              return step();
            }, 0);
          });
        };
        UMAP3.prototype.optimizeLayout = function(epochCallback) {
          if (epochCallback === void 0) {
            epochCallback = function() {
              return true;
            };
          }
          var isFinished = false;
          var embedding = [];
          while (!isFinished) {
            var _a = this.optimizationState, nEpochs = _a.nEpochs, currentEpoch = _a.currentEpoch;
            embedding = this.optimizeLayoutStep(currentEpoch);
            var epochCompleted = this.optimizationState.currentEpoch;
            var shouldStop = epochCallback(epochCompleted) === false;
            isFinished = epochCompleted === nEpochs || shouldStop;
          }
          return embedding;
        };
        UMAP3.prototype.getNEpochs = function() {
          var graph = this.graph;
          if (this.nEpochs > 0) {
            return this.nEpochs;
          }
          var length = graph.nRows;
          if (length <= 2500) {
            return 500;
          } else if (length <= 5e3) {
            return 400;
          } else if (length <= 7500) {
            return 300;
          } else {
            return 200;
          }
        };
        return UMAP3;
      }();
      exports.UMAP = UMAP2;
      function euclidean(x, y) {
        var result = 0;
        for (var i = 0; i < x.length; i++) {
          result += Math.pow(x[i] - y[i], 2);
        }
        return Math.sqrt(result);
      }
      exports.euclidean = euclidean;
      function cosine(x, y) {
        var result = 0;
        var normX = 0;
        var normY = 0;
        for (var i = 0; i < x.length; i++) {
          result += x[i] * y[i];
          normX += Math.pow(x[i], 2);
          normY += Math.pow(y[i], 2);
        }
        if (normX === 0 && normY === 0) {
          return 0;
        } else if (normX === 0 || normY === 0) {
          return 1;
        } else {
          return 1 - result / Math.sqrt(normX * normY);
        }
      }
      exports.cosine = cosine;
      var OptimizationState = function() {
        function OptimizationState2() {
          this.currentEpoch = 0;
          this.headEmbedding = [];
          this.tailEmbedding = [];
          this.head = [];
          this.tail = [];
          this.epochsPerSample = [];
          this.epochOfNextSample = [];
          this.epochOfNextNegativeSample = [];
          this.epochsPerNegativeSample = [];
          this.moveOther = true;
          this.initialAlpha = 1;
          this.alpha = 1;
          this.gamma = 1;
          this.a = 1.5769434603113077;
          this.b = 0.8950608779109733;
          this.dim = 2;
          this.nEpochs = 500;
          this.nVertices = 0;
        }
        return OptimizationState2;
      }();
      function clip(x, clipValue) {
        if (x > clipValue)
          return clipValue;
        else if (x < -clipValue)
          return -clipValue;
        else
          return x;
      }
      function rDist(x, y) {
        var result = 0;
        for (var i = 0; i < x.length; i++) {
          result += Math.pow(x[i] - y[i], 2);
        }
        return result;
      }
      function findABParams(spread, minDist) {
        var curve = function(_a2) {
          var _b = __read(_a2, 2), a2 = _b[0], b2 = _b[1];
          return function(x) {
            return 1 / (1 + a2 * Math.pow(x, 2 * b2));
          };
        };
        var xv = utils.linear(0, spread * 3, 300).map(function(val) {
          return val < minDist ? 1 : val;
        });
        var yv = utils.zeros(xv.length).map(function(val, index) {
          var gte = xv[index] >= minDist;
          return gte ? Math.exp(-(xv[index] - minDist) / spread) : val;
        });
        var initialValues = [0.5, 0.5];
        var data = { x: xv, y: yv };
        var options = {
          damping: 1.5,
          initialValues,
          gradientDifference: 0.1,
          maxIterations: 100,
          errorTolerance: 0.01
        };
        var parameterValues = ml_levenberg_marquardt_1.default(data, curve, options).parameterValues;
        var _a = __read(parameterValues, 2), a = _a[0], b = _a[1];
        return { a, b };
      }
      exports.findABParams = findABParams;
      function fastIntersection(graph, target2, unknownDist, farDist) {
        if (unknownDist === void 0) {
          unknownDist = 1;
        }
        if (farDist === void 0) {
          farDist = 5;
        }
        return graph.map(function(value, row, col) {
          if (target2[row] === -1 || target2[col] === -1) {
            return value * Math.exp(-unknownDist);
          } else if (target2[row] !== target2[col]) {
            return value * Math.exp(-farDist);
          } else {
            return value;
          }
        });
      }
      exports.fastIntersection = fastIntersection;
      function resetLocalConnectivity(simplicialSet) {
        simplicialSet = matrix.normalize(simplicialSet, "max");
        var transpose = matrix.transpose(simplicialSet);
        var prodMatrix = matrix.pairwiseMultiply(transpose, simplicialSet);
        simplicialSet = matrix.add(simplicialSet, matrix.subtract(transpose, prodMatrix));
        return matrix.eliminateZeros(simplicialSet);
      }
      exports.resetLocalConnectivity = resetLocalConnectivity;
      function initTransform(indices, weights, embedding) {
        var result = utils.zeros(indices.length).map(function(z) {
          return utils.zeros(embedding[0].length);
        });
        for (var i = 0; i < indices.length; i++) {
          for (var j = 0; j < indices[0].length; j++) {
            for (var d = 0; d < embedding[0].length; d++) {
              var a = indices[i][j];
              result[i][d] += weights[i][j] * embedding[a][d];
            }
          }
        }
        return result;
      }
      exports.initTransform = initTransform;
    }
  });

  // node_modules/umap-js/dist/index.js
  var require_dist = __commonJS({
    "node_modules/umap-js/dist/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var umap_1 = require_umap();
      exports.UMAP = umap_1.UMAP;
    }
  });

  // esm/Utils/projector/umap.js
  var import_umap_js = __toESM(require_dist(), 1);
  var fixedParams = {
    nComponents: 2
  };
  var UMAP_PROJECT_PARAMETERS = {
    nComponents: "The number of components (dimensions) to project the data to. (default 2)",
    nEpochs: "The number of epochs to optimize embeddings via SGD. (computed automatically)",
    nNeighbors: "The number of nearest neighbors to construct the fuzzy manifold. (default 15)",
    minDist: "The effective minimum distance between embedded points, used with spread to control the clumped/dispersed nature of the embedding. (default 0.1)",
    spread: "The effective scale of embedded points, used with minDist to control the clumped/dispersed nature of the embedding. (default 1.0)",
    random: "A pseudo-random-number generator for controlling stochastic processes. (default Math.random())",
    distanceFn: "A custom distance function to use. (default L2)",
    url: "https://github.com/PAIR-code/umap-js"
  };
  var umapProject = (projectParams = {}) => {
    const params2 = Object.assign({}, projectParams, fixedParams);
    const umap = new import_umap_js.UMAP(params2);
    return (vectors) => umap.fit(vectors);
  };

  // esm/Utils/projector/index.js
  var ProjectMethod = {
    TSNE: "tsne",
    UMAP: "umap",
    MDS: "mds",
    PCA: "pca"
  };
  var projectFuncMap = {
    [ProjectMethod.UMAP]: umapProject
  };
  var projectParamsDescMap = {
    [ProjectMethod.UMAP]: UMAP_PROJECT_PARAMETERS
  };
  var getProjectFunc = (projectMethod, projectParams = {}) => {
    if (projectMethod in projectFuncMap) {
      return projectFuncMap[projectMethod](projectParams);
    }
    console.warn("Unknown project method, use default UMAP");
    return projectFuncMap[ProjectMethod.UMAP](projectParams);
  };
  var getProjectParamsGuide = (projectMethod) => {
    if (projectMethod in projectParamsDescMap) {
      return projectParamsDescMap[projectMethod];
    }
    console.warn("Unknown project method. current support tsne and umap");
    return {};
  };

  // esm/Utils/index.js
  var uint8toChars = (data) => {
    return String.fromCharCode(...data);
  };
  var generateArray = (num) => {
    return Array.from(new Array(num).keys());
  };

  // esm/FederCore/FileReader.js
  var FileReader = class {
    constructor(arrayBuffer) {
      this.data = arrayBuffer;
      this.dataview = new DataView(arrayBuffer);
      this.p = 0;
    }
    get isEmpty() {
      return this.p >= this.data.byteLength;
    }
    readInt8() {
      const int8 = this.dataview.getInt8(this.p, true);
      this.p += 1;
      return int8;
    }
    readUint8() {
      const uint8 = this.dataview.getUint8(this.p, true);
      this.p += 1;
      return uint8;
    }
    readBool() {
      const int8 = this.readInt8();
      return Boolean(int8);
    }
    readInt32() {
      const int32 = this.dataview.getInt32(this.p, true);
      this.p += 4;
      return int32;
    }
    readUint32() {
      const uint32 = this.dataview.getUint32(this.p, true);
      this.p += 4;
      return uint32;
    }
    readUint64() {
      const left = this.readUint32();
      const right = this.readUint32();
      const int64 = left + Math.pow(2, 32) * right;
      if (!Number.isSafeInteger(int64))
        console.warn(int64, "exceeds MAX_SAFE_INTEGER. Precision may be lost");
      return int64;
    }
    readFloat32Array(n) {
      const res = new Float32Array(this.data.slice(this.p, this.p + n * 4));
      this.p += n * 4;
      return res;
    }
    readUint64Array(n) {
      const res = generateArray(n).map((_) => this.readUint64());
      return res;
    }
  };

  // esm/FederCore/FaissFileReader.js
  var FaissFileReader = class extends FileReader {
    constructor(arrayBuffer) {
      super(arrayBuffer);
    }
    readH() {
      const uint8Array = generateArray(4).map((_) => this.readUint8());
      const h = uint8toChars(uint8Array);
      return h;
    }
    readDummy() {
      const dummy = this.readUint64();
      return dummy;
    }
  };

  // esm/FederCore/readInvertedLists.js
  var checkInvH = (h) => {
    if (h !== "ilar") {
      console.warn("[invlists h] not ilar.", h);
    }
  };
  var checkInvListType = (listType) => {
    if (listType !== "full") {
      console.warn("[inverted_lists list_type] only support full.", listType);
    }
  };
  var readArrayInvLists = (reader, invlists) => {
    invlists.listType = reader.readH();
    checkInvListType(invlists.listType);
    invlists.listSizesSize = reader.readUint64();
    invlists.listSizes = generateArray(invlists.listSizesSize).map((_) => reader.readUint64());
    const data = [];
    generateArray(invlists.listSizesSize).forEach((_, i) => {
      const vectors = generateArray(invlists.listSizes[i]).map((_2) => reader.readFloat32Array(invlists.codeSize / 4));
      const ids = reader.readUint64Array(invlists.listSizes[i]);
      data.push({ ids, vectors });
    });
    invlists.data = data;
  };
  var readInvertedLists = (reader, index) => {
    const invlists = {};
    invlists.h = reader.readH();
    checkInvH(invlists.h);
    invlists.nlist = reader.readUint64();
    invlists.codeSize = reader.readUint64();
    readArrayInvLists(reader, invlists);
    index.invlists = invlists;
  };
  var readInvertedLists_default = readInvertedLists;

  // esm/FederCore/faissConfig.js
  var MetricType = {
    METRIC_INNER_PRODUCT: 0,
    METRIC_L2: 1,
    METRIC_L1: 2,
    METRIC_Linf: 3,
    METRIC_Lp: 4,
    METRIC_Canberra: 20,
    METRIC_BrayCurtis: 21,
    METRIC_JensenShannon: 22
  };
  var DirectMapType = {
    NoMap: 0,
    Array: 1,
    Hashtable: 2
  };
  var IndexHeader = {
    IVFFlat: "IwFl",
    FlatL2: "IxF2",
    FlatIR: "IxFI"
  };

  // esm/FederCore/readDirectMap.js
  var checkDmType = (dmType) => {
    if (dmType !== DirectMapType.NoMap) {
      console.warn("[directmap_type] only support NoMap.");
    }
  };
  var checkDmSize = (dmSize) => {
    if (dmSize !== 0) {
      console.warn("[directmap_size] should be 0.");
    }
  };
  var readDirectMap = (reader, index) => {
    const directMap = {};
    directMap.dmType = reader.readUint8();
    checkDmType(directMap.dmType);
    directMap.size = reader.readUint64();
    checkDmSize(directMap.size);
    index.directMap = directMap;
  };
  var readDirectMap_default = readDirectMap;

  // esm/FederCore/readIndexHeader.js
  var checkMetricType = (metricType) => {
    if (metricType !== MetricType.METRIC_L2 && metricType !== MetricType.METRIC_INNER_PRODUCT) {
      console.warn("[metric_type] only support l2 and inner_product.");
    }
  };
  var checkDummy = (dummy_1, dummy_2) => {
    if (dummy_1 !== dummy_2) {
      console.warn("[dummy] not equal.", dummy_1, dummy_2);
    }
  };
  var checkIsTrained = (isTrained) => {
    if (!isTrained) {
      console.warn("[is_trained] should be trained.", isTrained);
    }
  };
  var readIndexHeader = (reader, index) => {
    index.d = reader.readUint32();
    index.ntotal = reader.readUint64();
    const dummy_1 = reader.readDummy();
    const dummy_2 = reader.readDummy();
    checkDummy(dummy_1, dummy_2);
    index.isTrained = reader.readBool();
    checkIsTrained(index.isTrained);
    index.metricType = reader.readUint32();
    checkMetricType(index.metricType);
  };
  var readIndexHeader_default = readIndexHeader;

  // esm/Utils/config.js
  var IndexType = {
    IVFFlat: "IVFFlat",
    FlatL2: "FlatL2",
    FlatIR: "FlatIR",
    Flat: "Flat",
    HNSW: "HNSW"
  };

  // esm/FederCore/faissIndexParser.js
  var readIvfHeader = (reader, index) => {
    readIndexHeader_default(reader, index);
    index.nlist = reader.readUint64();
    index.nprobe = reader.readUint64();
    index.childIndex = readIndex(reader);
    readDirectMap_default(reader, index);
  };
  var readXbVectors = (reader, index) => {
    index.codeSize = reader.readUint64();
    index.vectors = generateArray(index.ntotal).map((_) => reader.readFloat32Array(index.d));
  };
  var readIndex = (reader) => {
    const index = {};
    index.h = reader.readH();
    if (index.h === IndexHeader.IVFFlat) {
      index.indexType = IndexType.IVFFlat;
      readIvfHeader(reader, index);
      readInvertedLists_default(reader, index);
    } else if (index.h === IndexHeader.FlatIR || index.h === IndexHeader.FlatL2) {
      index.indexType = IndexType.Flat;
      readIndexHeader_default(reader, index);
      readXbVectors(reader, index);
    } else {
      console.warn("[index type] not supported -", index.h);
    }
    return index;
  };
  var faissIndexParser = (arraybuffer) => {
    const faissFileReader = new FaissFileReader(arraybuffer);
    const index = readIndex(faissFileReader);
    return index;
  };
  var faissIndexParser_default = faissIndexParser;

  // esm/FederCore/distance.js
  var getDisL2 = (vec1, vec2) => {
    return Math.sqrt(vec1.map((num, i) => num - vec2[i]).map((num) => num * num).reduce((a, c) => a + c, 0));
  };
  var getDisIR = (vec1, vec2) => {
    return vec1.map((num, i) => num * vec2[i]).reduce((acc, cur) => acc + cur, 0);
  };
  var getDisFunc = (metricType) => {
    if (metricType === MetricType.METRIC_L2) {
      return getDisL2;
    } else if (metricType === MetricType.METRIC_INNER_PRODUCT) {
      return getDisIR;
    }
    console.warn("[getDisFunc] wrong metric_type, use L2 (default).", metricType);
    return getDisL2;
  };

  // esm/FederCore/faissFlatSearch.js
  var faissFlatSearch = ({ index, target: target2 }) => {
    const disFunc = getDisFunc(index.metricType);
    const distances = index.vectors.map((vec, id) => ({
      id,
      dis: disFunc(vec, target2)
    }));
    distances.sort((a, b) => a.dis - b.dis);
    return distances;
  };
  var faissFlatSearch_default = faissFlatSearch;

  // esm/FederCore/faissIVFSearch.js
  var faissIVFSearch = ({ index, csListIds, target: target2 }) => {
    const disFunc = getDisFunc(index.metricType);
    const distances = index.invlists.data.reduce((acc, cur, listId) => acc.concat(csListIds.includes(listId) ? cur.ids.map((id, ofs) => ({
      id,
      listId,
      dis: disFunc(cur.vectors[ofs], target2)
    })) : []), []);
    distances.sort((a, b) => a.dis - b.dis);
    return distances;
  };
  var faissIVFSearch_default = faissIVFSearch;

  // esm/FederCore/faissIVFFlatSearch.js
  var faissIVFFlatSearch = ({ index, target: target2, params: params2 = {} }) => {
    const { nprobe = 8, k = 10 } = params2;
    const csAllListIdsAndDistances = faissFlatSearch_default({
      index: index.childIndex,
      target: target2
    });
    const csRes = csAllListIdsAndDistances.slice(0, Math.min(index.nlist, nprobe));
    const csListIds = csRes.map((res2) => res2.id);
    const fsAllIdsAndDistances = faissIVFSearch_default({ index, csListIds, target: target2 });
    const fsRes = fsAllIdsAndDistances.slice(0, Math.min(index.ntotal, k));
    const res = {
      coarse: csAllListIdsAndDistances,
      fine: fsAllIdsAndDistances,
      csResIds: csListIds,
      fsResIds: fsRes.map((d) => d.id)
    };
    return res;
  };
  var faissIVFFlatSearch_default = faissIVFFlatSearch;

  // esm/FederCore/index.js
  var indexSearchHandlerMap = {
    faissIVFFlat: faissIVFFlatSearch_default,
    faissHNSW: null,
    hnswlibHNSW: null
  };
  var FederCore = class {
    constructor({
      data,
      source = "faiss",
      projectMethod = ProjectMethod.UMAP,
      projectParams = {}
    }) {
      this.index = null;
      this.meta = null;
      this.indexParser = null;
      this.indexSearchHandler = null;
      this.projector = null;
      this.data = data;
      this.setIndexSource(source);
      this.parseIndex();
      if (this.index) {
        this.setIndexSearchHandler();
        this[`_updateId2Vec_${this.index.indexType}`]();
      }
      this.setProjectParams(projectMethod, projectParams);
      this.index && this[`_updateIndexMeta_${this.index.indexType}`]();
    }
    setIndexSource(source) {
      this.indexParser = null;
      this.indexSource = source;
      if (source === "faiss") {
        this.indexParser = faissIndexParser_default;
      }
    }
    parseIndex() {
      if (this.indexParser) {
        this.index = this.indexParser(this.data);
      } else {
        console.error("No parser found");
      }
    }
    setIndexSearchHandler() {
      this.indexSearchHandler = indexSearchHandlerMap[this.indexSource + this.index.indexType];
      if (!this.indexSearchHandler) {
        console.error("indexSearchHandler not found");
      }
    }
    _updateId2Vec_IVFFlat() {
      const id2vector = {};
      const inv = this.index.invlists;
      for (let list_no = 0; list_no < inv.nlist; list_no++) {
        inv.data[list_no].ids.forEach((id, ofs) => {
          id2vector[id] = inv.data[list_no].vectors[ofs];
        });
      }
      this.id2vector = id2vector;
    }
    _updateId2Vec_HNSW() {
      const id2vector = {};
      this.id2vector = id2vector;
    }
    _updateIndexMeta_IVFFlat() {
      const indexMeta = {};
      indexMeta.ntotal = this.index.ntotal;
      indexMeta.nlist = this.index.nlist;
      indexMeta.listCentroidProjections = this.project(this.index.childIndex.vectors);
      indexMeta.listIds = this.index.invlists.data.map((d) => d.ids);
      this.indexMeta = indexMeta;
    }
    _updateIndexMeta_HNSW() {
      const indexMeta = {};
      this.indexMeta = indexMeta;
    }
    getTestIdAndVec() {
      if (!this.index) {
        return [null, null];
      }
      const ids = Object.keys(this.id2vector);
      const r = Math.floor(Math.random() * ids.length);
      const testId = ids[r];
      const testVec = this.id2vector[testId];
      return { testId, testVec };
    }
    getVectoreById(id) {
      return this.id2Vector[id] || null;
    }
    setSearchParams(params2) {
      this.searchParams = Object.assign(this.searchParams, params2);
    }
    search(target2) {
      const res = this.indexSearchHandler({
        index: this.index,
        target: target2,
        params: this.searchParams
      });
      return res;
    }
    setProjectParams(projectMethod, projectParams = {}) {
      this.project = getProjectFunc(projectMethod, projectParams);
      this.PROJECT_PARAMETERS = getProjectParamsGuide(projectMethod);
    }
  };

  // esm/Feder.js
  var Feder = class {
    constructor({
      core: core2 = {},
      file = "",
      type = "",
      vis = { render: function() {
      } },
      domContainer
    } = {}) {
      console.info("feder initialized");
      this.core = core2;
      this.vis = vis;
      this.domContainer = domContainer;
      this.vis_records = null;
      this.meta = core2.meta;
      this._render();
    }
    update() {
      this._render();
    }
    search() {
      this.vis_records = core.search(target, params);
      this._render();
    }
    reset() {
      this.vis_records = null;
      this._render();
    }
    _render() {
      this.vis.render(this.meta, this.vis_records, this.domContainer);
    }
  };

  // test/test.js
  window.addEventListener("DOMContentLoaded", () => {
    console.log(Feder);
    console.log(FederCore);
    const container = document.querySelector("#container");
    console.log(container);
  });
})();
