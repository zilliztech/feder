(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a2, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a2, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a2, prop, b[prop]);
      }
    return a2;
  };
  var __objRest = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x3) => x3.done ? resolve(x3.value) : Promise.resolve(x3.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // node_modules/umap-js/dist/utils.js
  var require_utils = __commonJS({
    "node_modules/umap-js/dist/utils.js"(exports) {
      "use strict";
      var __values = exports && exports.__values || function(o) {
        var m2 = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m2)
          return m2.call(o);
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
      function norm(vec2) {
        var e_1, _a;
        var result = 0;
        try {
          for (var vec_1 = __values(vec2), vec_1_1 = vec_1.next(); !vec_1_1.done; vec_1_1 = vec_1.next()) {
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
      function empty2(n) {
        var output = [];
        for (var i = 0; i < n; i++) {
          output.push(void 0);
        }
        return output;
      }
      exports.empty = empty2;
      function range2(n) {
        return empty2(n).map(function(_, i) {
          return i;
        });
      }
      exports.range = range2;
      function filled(n, v2) {
        return empty2(n).map(function() {
          return v2;
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
      function linear3(a2, b, len) {
        return empty2(len).map(function(_, i) {
          return a2 + i * ((b - a2) / (len - 1));
        });
      }
      exports.linear = linear3;
      function sum2(input) {
        return input.reduce(function(sum3, val) {
          return sum3 + val;
        });
      }
      exports.sum = sum2;
      function mean(input) {
        return sum2(input) / input.length;
      }
      exports.mean = mean;
      function max2(input) {
        var max3 = 0;
        for (var i = 0; i < input.length; i++) {
          max3 = input[i] > max3 ? input[i] : max3;
        }
        return max3;
      }
      exports.max = max2;
      function max2d(input) {
        var max3 = 0;
        for (var i = 0; i < input.length; i++) {
          for (var j = 0; j < input[i].length; j++) {
            max3 = input[i][j] > max3 ? input[i][j] : max3;
          }
        }
        return max3;
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
      function reshape2d(x3, a2, b) {
        var rows = [];
        var count = 0;
        var index2 = 0;
        if (x3.length !== a2 * b) {
          throw new Error("Array dimensions must match input length.");
        }
        for (var i = 0; i < a2; i++) {
          var col = [];
          for (var j = 0; j < b; j++) {
            col.push(x3[index2]);
            index2 += 1;
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
      function heapPush(heap, row, weight, index2, flag) {
        row = Math.floor(row);
        var indices = heap[0][row];
        var weights = heap[1][row];
        var isNew = heap[2][row];
        if (weight >= weights[0]) {
          return 0;
        }
        for (var i = 0; i < indices.length; i++) {
          if (index2 === indices[i]) {
            return 0;
          }
        }
        return uncheckedHeapPush(heap, row, weight, index2, flag);
      }
      exports.heapPush = heapPush;
      function uncheckedHeapPush(heap, row, weight, index2, flag) {
        var indices = heap[0][row];
        var weights = heap[1][row];
        var isNew = heap[2][row];
        if (weight >= weights[0]) {
          return 0;
        }
        weights[0] = weight;
        indices[0] = index2;
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
        indices[i] = index2;
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
          var swap2 = elt;
          if (heap1[swap2] < heap1[leftChild]) {
            swap2 = leftChild;
          }
          if (rightChild < ceiling && heap1[swap2] < heap1[rightChild]) {
            swap2 = rightChild;
          }
          if (swap2 === elt) {
            break;
          } else {
            var temp1 = heap1[elt];
            heap1[elt] = heap1[swap2];
            heap1[swap2] = temp1;
            var temp2 = heap2[elt];
            heap2[elt] = heap2[swap2];
            heap2[swap2] = temp2;
            elt = swap2;
          }
        }
      }
      function smallestFlagged(heap, row) {
        var ind = heap[0][row];
        var dist2 = heap[1][row];
        var flag = heap[2][row];
        var minDist = Infinity;
        var resultIndex = -1;
        for (var i = 0; i > ind.length; i++) {
          if (flag[i] === 1 && dist2[i] < minDist) {
            minDist = dist2[i];
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
        var m2 = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m2)
          return o;
        var i = m2.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m2 = i["return"]))
              m2.call(i);
          } finally {
            if (e)
              throw e.error;
          }
        }
        return ar;
      };
      var __values = exports && exports.__values || function(o) {
        var m2 = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m2)
          return m2.call(o);
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
            rowColValues.sort(function(a2, b) {
              if (a2.row === b.row) {
                return a2.col - b.col;
              } else {
                return a2.row - b.row;
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
      function identity4(size) {
        var _a2 = __read(size, 1), rows = _a2[0];
        var matrix = new SparseMatrix([], [], [], size);
        for (var i = 0; i < rows; i++) {
          matrix.set(i, i, 1);
        }
        return matrix;
      }
      exports.identity = identity4;
      function pairwiseMultiply(a2, b) {
        return elementWise(a2, b, function(x3, y3) {
          return x3 * y3;
        });
      }
      exports.pairwiseMultiply = pairwiseMultiply;
      function add2(a2, b) {
        return elementWise(a2, b, function(x3, y3) {
          return x3 + y3;
        });
      }
      exports.add = add2;
      function subtract(a2, b) {
        return elementWise(a2, b, function(x3, y3) {
          return x3 - y3;
        });
      }
      exports.subtract = subtract;
      function maximum(a2, b) {
        return elementWise(a2, b, function(x3, y3) {
          return x3 > y3 ? x3 : y3;
        });
      }
      exports.maximum = maximum;
      function multiplyScalar(a2, scalar) {
        return a2.map(function(value) {
          return value * scalar;
        });
      }
      exports.multiplyScalar = multiplyScalar;
      function eliminateZeros(m2) {
        var zeroIndices = /* @__PURE__ */ new Set();
        var values = m2.getValues();
        var rows = m2.getRows();
        var cols = m2.getCols();
        for (var i = 0; i < values.length; i++) {
          if (values[i] === 0) {
            zeroIndices.add(i);
          }
        }
        var removeByZeroIndex = function(_, index2) {
          return !zeroIndices.has(index2);
        };
        var nextValues = values.filter(removeByZeroIndex);
        var nextRows = rows.filter(removeByZeroIndex);
        var nextCols = cols.filter(removeByZeroIndex);
        return new SparseMatrix(nextRows, nextCols, nextValues, m2.getDims());
      }
      exports.eliminateZeros = eliminateZeros;
      function normalize2(m2, normType) {
        if (normType === void 0) {
          normType = "l2";
        }
        var e_1, _a2;
        var normFn = normFns[normType];
        var colsByRow = /* @__PURE__ */ new Map();
        m2.forEach(function(_, row2, col) {
          var cols = colsByRow.get(row2) || [];
          cols.push(col);
          colsByRow.set(row2, cols);
        });
        var nextMatrix = new SparseMatrix([], [], [], m2.getDims());
        var _loop_1 = function(row2) {
          var cols = colsByRow.get(row2).sort();
          var vals = cols.map(function(col) {
            return m2.get(row2, col);
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
      exports.normalize = normalize2;
      var normFns = (_a = {}, _a["max"] = function(xs) {
        var max2 = -Infinity;
        for (var i = 0; i < xs.length; i++) {
          max2 = xs[i] > max2 ? xs[i] : max2;
        }
        return xs.map(function(x3) {
          return x3 / max2;
        });
      }, _a["l1"] = function(xs) {
        var sum2 = 0;
        for (var i = 0; i < xs.length; i++) {
          sum2 += xs[i];
        }
        return xs.map(function(x3) {
          return x3 / sum2;
        });
      }, _a["l2"] = function(xs) {
        var sum2 = 0;
        for (var i = 0; i < xs.length; i++) {
          sum2 += Math.pow(xs[i], 2);
        }
        return xs.map(function(x3) {
          return Math.sqrt(Math.pow(x3, 2) / sum2);
        });
      }, _a);
      function elementWise(a2, b, op) {
        var visited = /* @__PURE__ */ new Set();
        var rows = [];
        var cols = [];
        var vals = [];
        var operate = function(row2, col2) {
          rows.push(row2);
          cols.push(col2);
          var nextValue = op(a2.get(row2, col2), b.get(row2, col2));
          vals.push(nextValue);
        };
        var valuesA = a2.getValues();
        var rowsA = a2.getRows();
        var colsA = a2.getCols();
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
        var dims = [a2.nRows, a2.nCols];
        return new SparseMatrix(rows, cols, vals, dims);
      }
      function getCSR(x3) {
        var entries = [];
        x3.forEach(function(value2, row2, col2) {
          entries.push({ value: value2, row: row2, col: col2 });
        });
        entries.sort(function(a2, b) {
          if (a2.row === b.row) {
            return a2.col - b.col;
          } else {
            return a2.row - b.row;
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
        var m2 = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m2)
          return o;
        var i = m2.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m2 = i["return"]))
              m2.call(i);
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
        var m2 = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m2)
          return m2.call(o);
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
        function FlatTree2(hyperplanes, offsets, children2, indices) {
          this.hyperplanes = hyperplanes;
          this.offsets = offsets;
          this.children = children2;
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
        var children2 = utils.range(nNodes).map(function() {
          return [-1, -1];
        });
        var indices = utils.range(nLeaves).map(function() {
          return utils.range(leafSize).map(function() {
            return -1;
          });
        });
        recursiveFlatten(tree, hyperplanes, offsets, children2, indices, 0, 0);
        return new FlatTree(hyperplanes, offsets, children2, indices);
      }
      function recursiveFlatten(tree, hyperplanes, offsets, children2, indices, nodeNum, leafNum) {
        var _a;
        if (tree.isLeaf) {
          children2[nodeNum][0] = -leafNum;
          (_a = indices[leafNum]).splice.apply(_a, __spread([0, tree.indices.length], tree.indices));
          leafNum += 1;
          return { nodeNum, leafNum };
        } else {
          hyperplanes[nodeNum] = tree.hyperplane;
          offsets[nodeNum] = tree.offset;
          children2[nodeNum][0] = nodeNum + 1;
          var oldNodeNum = nodeNum;
          var res = recursiveFlatten(tree.leftChild, hyperplanes, offsets, children2, indices, nodeNum + 1, leafNum);
          nodeNum = res.nodeNum;
          leafNum = res.leafNum;
          children2[oldNodeNum][1] = nodeNum + 1;
          res = recursiveFlatten(tree.rightChild, hyperplanes, offsets, children2, indices, nodeNum + 1, leafNum);
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
        var index2 = -1 * tree.children[node][0];
        return tree.indices[index2];
      }
      exports.searchFlatTree = searchFlatTree;
    }
  });

  // node_modules/umap-js/dist/nn_descent.js
  var require_nn_descent = __commonJS({
    "node_modules/umap-js/dist/nn_descent.js"(exports) {
      "use strict";
      var __values = exports && exports.__values || function(o) {
        var m2 = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m2)
          return m2.call(o);
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
            var c2 = 0;
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
                  c2 += heap.heapPush(currentGraph, p, d, q, 1);
                  c2 += heap.heapPush(currentGraph, q, d, p, 1);
                }
              }
            }
            if (c2 <= delta * nNeighbors * data.length) {
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
      function max2(input, options = {}) {
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
      module.exports = max2;
    }
  });

  // node_modules/ml-array-min/lib/index.js
  var require_lib4 = __commonJS({
    "node_modules/ml-array-min/lib/index.js"(exports, module) {
      "use strict";
      var isAnyArray = require_lib2();
      function min2(input, options = {}) {
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
      module.exports = min2;
    }
  });

  // node_modules/ml-array-rescale/lib/index.js
  var require_lib5 = __commonJS({
    "node_modules/ml-array-rescale/lib/index.js"(exports, module) {
      "use strict";
      var isAnyArray = require_lib2();
      var max2 = require_lib3();
      var min2 = require_lib4();
      function _interopDefaultLegacy(e) {
        return e && typeof e === "object" && "default" in e ? e : { "default": e };
      }
      var max__default = /* @__PURE__ */ _interopDefaultLegacy(max2);
      var min__default = /* @__PURE__ */ _interopDefaultLegacy(min2);
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
      var isAnyArray = require_lib2();
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
        const exponential2 = num.toExponential(maxNumSize - 2);
        const eIndex = exponential2.indexOf("e");
        const e = exponential2.slice(eIndex);
        return exponential2.slice(0, maxNumSize - e.length) + e;
      }
      function installMathOperations(AbstractMatrix2, Matrix2) {
        AbstractMatrix2.prototype.add = function add2(value) {
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
        AbstractMatrix2.add = function add2(matrix, value) {
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
        AbstractMatrix2.prototype.abs = function abs2() {
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              this.set(i, j, Math.abs(this.get(i, j)));
            }
          }
          return this;
        };
        AbstractMatrix2.abs = function abs2(matrix) {
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
        AbstractMatrix2.pow = function pow2(matrix, arg0) {
          const newMatrix = new Matrix2(matrix);
          return newMatrix.pow(arg0);
        };
        AbstractMatrix2.prototype.pow = function pow2(value) {
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
      function checkRowIndex(matrix, index2, outer) {
        let max2 = outer ? matrix.rows : matrix.rows - 1;
        if (index2 < 0 || index2 > max2) {
          throw new RangeError("Row index out of range");
        }
      }
      function checkColumnIndex(matrix, index2, outer) {
        let max2 = outer ? matrix.columns : matrix.columns - 1;
        if (index2 < 0 || index2 > max2) {
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
      function checkRowIndices(matrix, rowIndices) {
        if (!isAnyArray.isAnyArray(rowIndices)) {
          throw new TypeError("row indices must be an array");
        }
        for (let i = 0; i < rowIndices.length; i++) {
          if (rowIndices[i] < 0 || rowIndices[i] >= matrix.rows) {
            throw new RangeError("row indices are out of range");
          }
        }
      }
      function checkColumnIndices(matrix, columnIndices) {
        if (!isAnyArray.isAnyArray(columnIndices)) {
          throw new TypeError("column indices must be an array");
        }
        for (let i = 0; i < columnIndices.length; i++) {
          if (columnIndices[i] < 0 || columnIndices[i] >= matrix.columns) {
            throw new RangeError("column indices are out of range");
          }
        }
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
        let array2 = [];
        for (let i = 0; i < length; i++) {
          array2.push(value);
        }
        return array2;
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
        let sum2 = newArray(matrix.rows);
        for (let i = 0; i < matrix.rows; ++i) {
          for (let j = 0; j < matrix.columns; ++j) {
            sum2[i] += matrix.get(i, j);
          }
        }
        return sum2;
      }
      function sumByColumn(matrix) {
        let sum2 = newArray(matrix.columns);
        for (let i = 0; i < matrix.rows; ++i) {
          for (let j = 0; j < matrix.columns; ++j) {
            sum2[j] += matrix.get(i, j);
          }
        }
        return sum2;
      }
      function sumAll(matrix) {
        let v2 = 0;
        for (let i = 0; i < matrix.rows; i++) {
          for (let j = 0; j < matrix.columns; j++) {
            v2 += matrix.get(i, j);
          }
        }
        return v2;
      }
      function productByRow(matrix) {
        let sum2 = newArray(matrix.rows, 1);
        for (let i = 0; i < matrix.rows; ++i) {
          for (let j = 0; j < matrix.columns; ++j) {
            sum2[i] *= matrix.get(i, j);
          }
        }
        return sum2;
      }
      function productByColumn(matrix) {
        let sum2 = newArray(matrix.columns, 1);
        for (let i = 0; i < matrix.rows; ++i) {
          for (let j = 0; j < matrix.columns; ++j) {
            sum2[j] *= matrix.get(i, j);
          }
        }
        return sum2;
      }
      function productAll(matrix) {
        let v2 = 1;
        for (let i = 0; i < matrix.rows; i++) {
          for (let j = 0; j < matrix.columns; j++) {
            v2 *= matrix.get(i, j);
          }
        }
        return v2;
      }
      function varianceByRow(matrix, unbiased, mean) {
        const rows = matrix.rows;
        const cols = matrix.columns;
        const variance = [];
        for (let i = 0; i < rows; i++) {
          let sum1 = 0;
          let sum2 = 0;
          let x3 = 0;
          for (let j = 0; j < cols; j++) {
            x3 = matrix.get(i, j) - mean[i];
            sum1 += x3;
            sum2 += x3 * x3;
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
          let x3 = 0;
          for (let i = 0; i < rows; i++) {
            x3 = matrix.get(i, j) - mean[j];
            sum1 += x3;
            sum2 += x3 * x3;
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
        let x3 = 0;
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            x3 = matrix.get(i, j) - mean;
            sum1 += x3;
            sum2 += x3 * x3;
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
        const scale2 = [];
        for (let i = 0; i < matrix.rows; i++) {
          let sum2 = 0;
          for (let j = 0; j < matrix.columns; j++) {
            sum2 += Math.pow(matrix.get(i, j), 2) / (matrix.columns - 1);
          }
          scale2.push(Math.sqrt(sum2));
        }
        return scale2;
      }
      function scaleByRow(matrix, scale2) {
        for (let i = 0; i < matrix.rows; i++) {
          for (let j = 0; j < matrix.columns; j++) {
            matrix.set(i, j, matrix.get(i, j) / scale2[i]);
          }
        }
      }
      function getScaleByColumn(matrix) {
        const scale2 = [];
        for (let j = 0; j < matrix.columns; j++) {
          let sum2 = 0;
          for (let i = 0; i < matrix.rows; i++) {
            sum2 += Math.pow(matrix.get(i, j), 2) / (matrix.rows - 1);
          }
          scale2.push(Math.sqrt(sum2));
        }
        return scale2;
      }
      function scaleByColumn(matrix, scale2) {
        for (let i = 0; i < matrix.rows; i++) {
          for (let j = 0; j < matrix.columns; j++) {
            matrix.set(i, j, matrix.get(i, j) / scale2[j]);
          }
        }
      }
      function getScaleAll(matrix) {
        const divider = matrix.size - 1;
        let sum2 = 0;
        for (let j = 0; j < matrix.columns; j++) {
          for (let i = 0; i < matrix.rows; i++) {
            sum2 += Math.pow(matrix.get(i, j), 2) / divider;
          }
        }
        return Math.sqrt(sum2);
      }
      function scaleAll(matrix, scale2) {
        for (let i = 0; i < matrix.rows; i++) {
          for (let j = 0; j < matrix.columns; j++) {
            matrix.set(i, j, matrix.get(i, j) / scale2);
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
          const { min: min2 = 0, max: max2 = 1e3, random = Math.random } = options;
          if (!Number.isInteger(min2))
            throw new TypeError("min must be an integer");
          if (!Number.isInteger(max2))
            throw new TypeError("max must be an integer");
          if (min2 >= max2)
            throw new RangeError("min must be smaller than max");
          let interval2 = max2 - min2;
          let matrix = new Matrix(rows, columns);
          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
              let value = min2 + Math.round(random() * interval2);
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
          let min2 = Math.min(rows, columns);
          let matrix = this.zeros(rows, columns);
          for (let i = 0; i < min2; i++) {
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
          let min2 = Math.min(l, rows, columns);
          let matrix = this.zeros(rows, columns);
          for (let i = 0; i < min2; i++) {
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
          let array2 = [];
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              array2.push(this.get(i, j));
            }
          }
          return array2;
        }
        to2DArray() {
          let copy2 = [];
          for (let i = 0; i < this.rows; i++) {
            copy2.push([]);
            for (let j = 0; j < this.columns; j++) {
              copy2[i].push(this.get(i, j));
            }
          }
          return copy2;
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
          let m2 = result.columns;
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
                for (let j = p; j < m2; j++) {
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
        getRow(index2) {
          checkRowIndex(this, index2);
          let row = [];
          for (let i = 0; i < this.columns; i++) {
            row.push(this.get(index2, i));
          }
          return row;
        }
        getRowVector(index2) {
          return Matrix.rowVector(this.getRow(index2));
        }
        setRow(index2, array2) {
          checkRowIndex(this, index2);
          array2 = checkRowVector(this, array2);
          for (let i = 0; i < this.columns; i++) {
            this.set(index2, i, array2[i]);
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
        getColumn(index2) {
          checkColumnIndex(this, index2);
          let column = [];
          for (let i = 0; i < this.rows; i++) {
            column.push(this.get(i, index2));
          }
          return column;
        }
        getColumnVector(index2) {
          return Matrix.columnVector(this.getColumn(index2));
        }
        setColumn(index2, array2) {
          checkColumnIndex(this, index2);
          array2 = checkColumnVector(this, array2);
          for (let i = 0; i < this.rows; i++) {
            this.set(i, index2, array2[i]);
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
        mulRow(index2, value) {
          checkRowIndex(this, index2);
          for (let i = 0; i < this.columns; i++) {
            this.set(index2, i, this.get(index2, i) * value);
          }
          return this;
        }
        mulColumn(index2, value) {
          checkColumnIndex(this, index2);
          for (let i = 0; i < this.rows; i++) {
            this.set(i, index2, this.get(i, index2) * value);
          }
          return this;
        }
        max(by) {
          if (this.isEmpty()) {
            return NaN;
          }
          switch (by) {
            case "row": {
              const max2 = new Array(this.rows).fill(Number.NEGATIVE_INFINITY);
              for (let row = 0; row < this.rows; row++) {
                for (let column = 0; column < this.columns; column++) {
                  if (this.get(row, column) > max2[row]) {
                    max2[row] = this.get(row, column);
                  }
                }
              }
              return max2;
            }
            case "column": {
              const max2 = new Array(this.columns).fill(Number.NEGATIVE_INFINITY);
              for (let row = 0; row < this.rows; row++) {
                for (let column = 0; column < this.columns; column++) {
                  if (this.get(row, column) > max2[column]) {
                    max2[column] = this.get(row, column);
                  }
                }
              }
              return max2;
            }
            case void 0: {
              let max2 = this.get(0, 0);
              for (let row = 0; row < this.rows; row++) {
                for (let column = 0; column < this.columns; column++) {
                  if (this.get(row, column) > max2) {
                    max2 = this.get(row, column);
                  }
                }
              }
              return max2;
            }
            default:
              throw new Error(`invalid option: ${by}`);
          }
        }
        maxIndex() {
          checkNonEmpty(this);
          let v2 = this.get(0, 0);
          let idx = [0, 0];
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              if (this.get(i, j) > v2) {
                v2 = this.get(i, j);
                idx[0] = i;
                idx[1] = j;
              }
            }
          }
          return idx;
        }
        min(by) {
          if (this.isEmpty()) {
            return NaN;
          }
          switch (by) {
            case "row": {
              const min2 = new Array(this.rows).fill(Number.POSITIVE_INFINITY);
              for (let row = 0; row < this.rows; row++) {
                for (let column = 0; column < this.columns; column++) {
                  if (this.get(row, column) < min2[row]) {
                    min2[row] = this.get(row, column);
                  }
                }
              }
              return min2;
            }
            case "column": {
              const min2 = new Array(this.columns).fill(Number.POSITIVE_INFINITY);
              for (let row = 0; row < this.rows; row++) {
                for (let column = 0; column < this.columns; column++) {
                  if (this.get(row, column) < min2[column]) {
                    min2[column] = this.get(row, column);
                  }
                }
              }
              return min2;
            }
            case void 0: {
              let min2 = this.get(0, 0);
              for (let row = 0; row < this.rows; row++) {
                for (let column = 0; column < this.columns; column++) {
                  if (this.get(row, column) < min2) {
                    min2 = this.get(row, column);
                  }
                }
              }
              return min2;
            }
            default:
              throw new Error(`invalid option: ${by}`);
          }
        }
        minIndex() {
          checkNonEmpty(this);
          let v2 = this.get(0, 0);
          let idx = [0, 0];
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              if (this.get(i, j) < v2) {
                v2 = this.get(i, j);
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
          let v2 = this.get(row, 0);
          for (let i = 1; i < this.columns; i++) {
            if (this.get(row, i) > v2) {
              v2 = this.get(row, i);
            }
          }
          return v2;
        }
        maxRowIndex(row) {
          checkRowIndex(this, row);
          checkNonEmpty(this);
          let v2 = this.get(row, 0);
          let idx = [row, 0];
          for (let i = 1; i < this.columns; i++) {
            if (this.get(row, i) > v2) {
              v2 = this.get(row, i);
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
          let v2 = this.get(row, 0);
          for (let i = 1; i < this.columns; i++) {
            if (this.get(row, i) < v2) {
              v2 = this.get(row, i);
            }
          }
          return v2;
        }
        minRowIndex(row) {
          checkRowIndex(this, row);
          checkNonEmpty(this);
          let v2 = this.get(row, 0);
          let idx = [row, 0];
          for (let i = 1; i < this.columns; i++) {
            if (this.get(row, i) < v2) {
              v2 = this.get(row, i);
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
          let v2 = this.get(0, column);
          for (let i = 1; i < this.rows; i++) {
            if (this.get(i, column) > v2) {
              v2 = this.get(i, column);
            }
          }
          return v2;
        }
        maxColumnIndex(column) {
          checkColumnIndex(this, column);
          checkNonEmpty(this);
          let v2 = this.get(0, column);
          let idx = [0, column];
          for (let i = 1; i < this.rows; i++) {
            if (this.get(i, column) > v2) {
              v2 = this.get(i, column);
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
          let v2 = this.get(0, column);
          for (let i = 1; i < this.rows; i++) {
            if (this.get(i, column) < v2) {
              v2 = this.get(i, column);
            }
          }
          return v2;
        }
        minColumnIndex(column) {
          checkColumnIndex(this, column);
          checkNonEmpty(this);
          let v2 = this.get(0, column);
          let idx = [0, column];
          for (let i = 1; i < this.rows; i++) {
            if (this.get(i, column) < v2) {
              v2 = this.get(i, column);
              idx[0] = i;
            }
          }
          return idx;
        }
        diag() {
          let min2 = Math.min(this.rows, this.columns);
          let diag = [];
          for (let i = 0; i < min2; i++) {
            diag.push(this.get(i, i));
          }
          return diag;
        }
        norm(type2 = "frobenius") {
          let result = 0;
          if (type2 === "max") {
            return this.max();
          } else if (type2 === "frobenius") {
            for (let i = 0; i < this.rows; i++) {
              for (let j = 0; j < this.columns; j++) {
                result = result + this.get(i, j) * this.get(i, j);
              }
            }
            return Math.sqrt(result);
          } else {
            throw new RangeError(`unknown norm type: ${type2}`);
          }
        }
        cumulativeSum() {
          let sum2 = 0;
          for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
              sum2 += this.get(i, j);
              this.set(i, j, sum2);
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
          let m2 = this.rows;
          let n = this.columns;
          let p = other.columns;
          let result = new Matrix(m2, p);
          let Bcolj = new Float64Array(n);
          for (let j = 0; j < p; j++) {
            for (let k = 0; k < n; k++) {
              Bcolj[k] = other.get(k, j);
            }
            for (let i = 0; i < m2; i++) {
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
        mmulStrassen(y3) {
          y3 = Matrix.checkMatrix(y3);
          let x3 = this.clone();
          let r1 = x3.rows;
          let c1 = x3.columns;
          let r2 = y3.rows;
          let c2 = y3.columns;
          if (c1 !== r2) {
            console.warn(`Multiplying ${r1} x ${c1} and ${r2} x ${c2} matrix: dimensions do not match.`);
          }
          function embed(mat, rows, cols) {
            let r3 = mat.rows;
            let c4 = mat.columns;
            if (r3 === rows && c4 === cols) {
              return mat;
            } else {
              let resultat = AbstractMatrix.zeros(rows, cols);
              resultat = resultat.setSubMatrix(mat, 0, 0);
              return resultat;
            }
          }
          let r = Math.max(r1, r2);
          let c3 = Math.max(c1, c2);
          x3 = embed(x3, r, c3);
          y3 = embed(y3, r, c3);
          function blockMult(a2, b, rows, cols) {
            if (rows <= 512 || cols <= 512) {
              return a2.mmul(b);
            }
            if (rows % 2 === 1 && cols % 2 === 1) {
              a2 = embed(a2, rows + 1, cols + 1);
              b = embed(b, rows + 1, cols + 1);
            } else if (rows % 2 === 1) {
              a2 = embed(a2, rows + 1, cols);
              b = embed(b, rows + 1, cols);
            } else if (cols % 2 === 1) {
              a2 = embed(a2, rows, cols + 1);
              b = embed(b, rows, cols + 1);
            }
            let halfRows = parseInt(a2.rows / 2, 10);
            let halfCols = parseInt(a2.columns / 2, 10);
            let a11 = a2.subMatrix(0, halfRows - 1, 0, halfCols - 1);
            let b11 = b.subMatrix(0, halfRows - 1, 0, halfCols - 1);
            let a12 = a2.subMatrix(0, halfRows - 1, halfCols, a2.columns - 1);
            let b12 = b.subMatrix(0, halfRows - 1, halfCols, b.columns - 1);
            let a21 = a2.subMatrix(halfRows, a2.rows - 1, 0, halfCols - 1);
            let b21 = b.subMatrix(halfRows, b.rows - 1, 0, halfCols - 1);
            let a22 = a2.subMatrix(halfRows, a2.rows - 1, halfCols, a2.columns - 1);
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
          return blockMult(x3, y3, r, c3);
        }
        scaleRows(options = {}) {
          if (typeof options !== "object") {
            throw new TypeError("options must be an object");
          }
          const { min: min2 = 0, max: max2 = 1 } = options;
          if (!Number.isFinite(min2))
            throw new TypeError("min must be a number");
          if (!Number.isFinite(max2))
            throw new TypeError("max must be a number");
          if (min2 >= max2)
            throw new RangeError("min must be smaller than max");
          let newMatrix = new Matrix(this.rows, this.columns);
          for (let i = 0; i < this.rows; i++) {
            const row = this.getRow(i);
            if (row.length > 0) {
              rescale__default["default"](row, { min: min2, max: max2, output: row });
            }
            newMatrix.setRow(i, row);
          }
          return newMatrix;
        }
        scaleColumns(options = {}) {
          if (typeof options !== "object") {
            throw new TypeError("options must be an object");
          }
          const { min: min2 = 0, max: max2 = 1 } = options;
          if (!Number.isFinite(min2))
            throw new TypeError("min must be a number");
          if (!Number.isFinite(max2))
            throw new TypeError("max must be a number");
          if (min2 >= max2)
            throw new RangeError("min must be smaller than max");
          let newMatrix = new Matrix(this.rows, this.columns);
          for (let i = 0; i < this.columns; i++) {
            const column = this.getColumn(i);
            if (column.length) {
              rescale__default["default"](column, {
                min: min2,
                max: max2,
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
          let m2 = this.rows;
          let n = this.columns;
          let p = other.rows;
          let q = other.columns;
          let result = new Matrix(m2 * p, n * q);
          for (let i = 0; i < m2; i++) {
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
          let m2 = this.rows;
          let n = other.rows;
          let AxI = this.kroneckerProduct(Matrix.eye(n, n));
          let IxB = Matrix.eye(m2, m2).kroneckerProduct(other);
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
          checkRowIndices(this, rowIndices);
          checkColumnIndices(this, columnIndices);
          let newMatrix = new Matrix(rowIndices.length, columnIndices.length);
          for (let i = 0; i < rowIndices.length; i++) {
            let rowIndex = rowIndices[i];
            for (let j = 0; j < columnIndices.length; j++) {
              let columnIndex = columnIndices[j];
              newMatrix.set(i, j, this.get(rowIndex, columnIndex));
            }
          }
          return newMatrix;
        }
        trace() {
          let min2 = Math.min(this.rows, this.columns);
          let trace = 0;
          for (let i = 0; i < min2; i++) {
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
          const sum2 = this.sum(by);
          switch (by) {
            case "row": {
              for (let i = 0; i < this.rows; i++) {
                sum2[i] /= this.columns;
              }
              return sum2;
            }
            case "column": {
              for (let i = 0; i < this.columns; i++) {
                sum2[i] /= this.rows;
              }
              return sum2;
            }
            case void 0:
              return sum2 / this.size;
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
              if (!isAnyArray.isAnyArray(mean)) {
                throw new TypeError("mean must be an array");
              }
              return varianceByRow(this, unbiased, mean);
            }
            case "column": {
              if (!isAnyArray.isAnyArray(mean)) {
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
              if (!isAnyArray.isAnyArray(center)) {
                throw new TypeError("center must be an array");
              }
              centerByRow(this, center);
              return this;
            }
            case "column": {
              if (!isAnyArray.isAnyArray(center)) {
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
          let scale2 = options.scale;
          switch (by) {
            case "row": {
              if (scale2 === void 0) {
                scale2 = getScaleByRow(this);
              } else if (!isAnyArray.isAnyArray(scale2)) {
                throw new TypeError("scale must be an array");
              }
              scaleByRow(this, scale2);
              return this;
            }
            case "column": {
              if (scale2 === void 0) {
                scale2 = getScaleByColumn(this);
              } else if (!isAnyArray.isAnyArray(scale2)) {
                throw new TypeError("scale must be an array");
              }
              scaleByColumn(this, scale2);
              return this;
            }
            case void 0: {
              if (scale2 === void 0) {
                scale2 = getScaleAll(this);
              } else if (typeof scale2 !== "number") {
                throw new TypeError("scale must be a number");
              }
              scaleAll(this, scale2);
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
      function compareNumbers(a2, b) {
        return a2 - b;
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
          } else if (isAnyArray.isAnyArray(nRows)) {
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
        removeRow(index2) {
          checkRowIndex(this, index2);
          this.data.splice(index2, 1);
          this.rows -= 1;
          return this;
        }
        addRow(index2, array2) {
          if (array2 === void 0) {
            array2 = index2;
            index2 = this.rows;
          }
          checkRowIndex(this, index2, true);
          array2 = Float64Array.from(checkRowVector(this, array2));
          this.data.splice(index2, 0, array2);
          this.rows += 1;
          return this;
        }
        removeColumn(index2) {
          checkColumnIndex(this, index2);
          for (let i = 0; i < this.rows; i++) {
            const newRow = new Float64Array(this.columns - 1);
            for (let j = 0; j < index2; j++) {
              newRow[j] = this.data[i][j];
            }
            for (let j = index2 + 1; j < this.columns; j++) {
              newRow[j - 1] = this.data[i][j];
            }
            this.data[i] = newRow;
          }
          this.columns -= 1;
          return this;
        }
        addColumn(index2, array2) {
          if (typeof array2 === "undefined") {
            array2 = index2;
            index2 = this.columns;
          }
          checkColumnIndex(this, index2, true);
          array2 = checkColumnVector(this, array2);
          for (let i = 0; i < this.rows; i++) {
            const newRow = new Float64Array(this.columns + 1);
            let j = 0;
            for (; j < index2; j++) {
              newRow[j] = this.data[i][j];
            }
            newRow[j++] = array2[i];
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
          checkColumnIndices(matrix, columnIndices);
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
          checkRowIndices(matrix, rowIndices);
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
          checkRowIndices(matrix, rowIndices);
          checkColumnIndices(matrix, columnIndices);
          super(matrix, rowIndices.length, columnIndices.length);
          this.rowIndices = rowIndices;
          this.columnIndices = columnIndices;
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
          let index2 = this._calculateIndex(rowIndex, columnIndex);
          this.data[index2] = value;
          return this;
        }
        get(rowIndex, columnIndex) {
          let index2 = this._calculateIndex(rowIndex, columnIndex);
          return this.data[index2];
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
      function wrap(array2, options) {
        if (isAnyArray.isAnyArray(array2)) {
          if (array2[0] && isAnyArray.isAnyArray(array2[0])) {
            return new WrapperMatrix2D(array2);
          } else {
            return new WrapperMatrix1D(array2, options);
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
          let i, j, k, p, s, t, v2;
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
              v2 = pivotVector[p];
              pivotVector[p] = pivotVector[j];
              pivotVector[j] = v2;
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
          let X2 = value.subMatrixRow(this.pivotVector, 0, count - 1);
          let columns = lu.columns;
          let i, j, k;
          for (k = 0; k < columns; k++) {
            for (i = k + 1; i < columns; i++) {
              for (j = 0; j < count; j++) {
                X2.set(i, j, X2.get(i, j) - X2.get(k, j) * lu.get(i, k));
              }
            }
          }
          for (k = columns - 1; k >= 0; k--) {
            for (j = 0; j < count; j++) {
              X2.set(k, j, X2.get(k, j) / lu.get(k, k));
            }
            for (i = 0; i < k; i++) {
              for (j = 0; j < count; j++) {
                X2.set(i, j, X2.get(i, j) - X2.get(k, j) * lu.get(i, k));
              }
            }
          }
          return X2;
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
          let X2 = new Matrix(rows, columns);
          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
              if (i > j) {
                X2.set(i, j, data.get(i, j));
              } else if (i === j) {
                X2.set(i, j, 1);
              } else {
                X2.set(i, j, 0);
              }
            }
          }
          return X2;
        }
        get upperTriangularMatrix() {
          let data = this.LU;
          let rows = data.rows;
          let columns = data.columns;
          let X2 = new Matrix(rows, columns);
          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
              if (i <= j) {
                X2.set(i, j, data.get(i, j));
              } else {
                X2.set(i, j, 0);
              }
            }
          }
          return X2;
        }
        get pivotPermutationVector() {
          return Array.from(this.pivotVector);
        }
      };
      function hypotenuse(a2, b) {
        let r = 0;
        if (Math.abs(a2) > Math.abs(b)) {
          r = b / a2;
          return Math.abs(a2) * Math.sqrt(1 + r * r);
        }
        if (b !== 0) {
          r = a2 / b;
          return Math.abs(b) * Math.sqrt(1 + r * r);
        }
        return 0;
      }
      var QrDecomposition = class {
        constructor(value) {
          value = WrapperMatrix2D.checkMatrix(value);
          let qr = value.clone();
          let m2 = value.rows;
          let n = value.columns;
          let rdiag = new Float64Array(n);
          let i, j, k, s;
          for (k = 0; k < n; k++) {
            let nrm = 0;
            for (i = k; i < m2; i++) {
              nrm = hypotenuse(nrm, qr.get(i, k));
            }
            if (nrm !== 0) {
              if (qr.get(k, k) < 0) {
                nrm = -nrm;
              }
              for (i = k; i < m2; i++) {
                qr.set(i, k, qr.get(i, k) / nrm);
              }
              qr.set(k, k, qr.get(k, k) + 1);
              for (j = k + 1; j < n; j++) {
                s = 0;
                for (i = k; i < m2; i++) {
                  s += qr.get(i, k) * qr.get(i, j);
                }
                s = -s / qr.get(k, k);
                for (i = k; i < m2; i++) {
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
          let m2 = qr.rows;
          if (value.rows !== m2) {
            throw new Error("Matrix row dimensions must agree");
          }
          if (!this.isFullRank()) {
            throw new Error("Matrix is rank deficient");
          }
          let count = value.columns;
          let X2 = value.clone();
          let n = qr.columns;
          let i, j, k, s;
          for (k = 0; k < n; k++) {
            for (j = 0; j < count; j++) {
              s = 0;
              for (i = k; i < m2; i++) {
                s += qr.get(i, k) * X2.get(i, j);
              }
              s = -s / qr.get(k, k);
              for (i = k; i < m2; i++) {
                X2.set(i, j, X2.get(i, j) + s * qr.get(i, k));
              }
            }
          }
          for (k = n - 1; k >= 0; k--) {
            for (j = 0; j < count; j++) {
              X2.set(k, j, X2.get(k, j) / this.Rdiag[k]);
            }
            for (i = 0; i < k; i++) {
              for (j = 0; j < count; j++) {
                X2.set(i, j, X2.get(i, j) - X2.get(k, j) * qr.get(i, k));
              }
            }
          }
          return X2.subMatrix(0, n - 1, 0, count - 1);
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
          let X2 = new Matrix(n, n);
          let i, j;
          for (i = 0; i < n; i++) {
            for (j = 0; j < n; j++) {
              if (i < j) {
                X2.set(i, j, qr.get(i, j));
              } else if (i === j) {
                X2.set(i, j, this.Rdiag[i]);
              } else {
                X2.set(i, j, 0);
              }
            }
          }
          return X2;
        }
        get orthogonalMatrix() {
          let qr = this.QR;
          let rows = qr.rows;
          let columns = qr.columns;
          let X2 = new Matrix(rows, columns);
          let i, j, k, s;
          for (k = columns - 1; k >= 0; k--) {
            for (i = 0; i < rows; i++) {
              X2.set(i, k, 0);
            }
            X2.set(k, k, 1);
            for (j = k; j < columns; j++) {
              if (qr.get(k, k) !== 0) {
                s = 0;
                for (i = k; i < rows; i++) {
                  s += qr.get(i, k) * X2.get(i, j);
                }
                s = -s / qr.get(k, k);
                for (i = k; i < rows; i++) {
                  X2.set(i, j, X2.get(i, j) + s * qr.get(i, k));
                }
              }
            }
          }
          return X2;
        }
      };
      var SingularValueDecomposition = class {
        constructor(value, options = {}) {
          value = WrapperMatrix2D.checkMatrix(value);
          if (value.isEmpty()) {
            throw new Error("Matrix must be non-empty");
          }
          let m2 = value.rows;
          let n = value.columns;
          const {
            computeLeftSingularVectors = true,
            computeRightSingularVectors = true,
            autoTranspose = false
          } = options;
          let wantu = Boolean(computeLeftSingularVectors);
          let wantv = Boolean(computeRightSingularVectors);
          let swapped = false;
          let a2;
          if (m2 < n) {
            if (!autoTranspose) {
              a2 = value.clone();
              console.warn("Computing SVD on a matrix with more columns than rows. Consider enabling autoTranspose");
            } else {
              a2 = value.transpose();
              m2 = a2.rows;
              n = a2.columns;
              swapped = true;
              let aux = wantu;
              wantu = wantv;
              wantv = aux;
            }
          } else {
            a2 = value.clone();
          }
          let nu = Math.min(m2, n);
          let ni = Math.min(m2 + 1, n);
          let s = new Float64Array(ni);
          let U = new Matrix(m2, nu);
          let V = new Matrix(n, n);
          let e = new Float64Array(n);
          let work = new Float64Array(m2);
          let si = new Float64Array(ni);
          for (let i = 0; i < ni; i++)
            si[i] = i;
          let nct = Math.min(m2 - 1, n);
          let nrt = Math.max(0, Math.min(n - 2, m2));
          let mrc = Math.max(nct, nrt);
          for (let k = 0; k < mrc; k++) {
            if (k < nct) {
              s[k] = 0;
              for (let i = k; i < m2; i++) {
                s[k] = hypotenuse(s[k], a2.get(i, k));
              }
              if (s[k] !== 0) {
                if (a2.get(k, k) < 0) {
                  s[k] = -s[k];
                }
                for (let i = k; i < m2; i++) {
                  a2.set(i, k, a2.get(i, k) / s[k]);
                }
                a2.set(k, k, a2.get(k, k) + 1);
              }
              s[k] = -s[k];
            }
            for (let j = k + 1; j < n; j++) {
              if (k < nct && s[k] !== 0) {
                let t = 0;
                for (let i = k; i < m2; i++) {
                  t += a2.get(i, k) * a2.get(i, j);
                }
                t = -t / a2.get(k, k);
                for (let i = k; i < m2; i++) {
                  a2.set(i, j, a2.get(i, j) + t * a2.get(i, k));
                }
              }
              e[j] = a2.get(k, j);
            }
            if (wantu && k < nct) {
              for (let i = k; i < m2; i++) {
                U.set(i, k, a2.get(i, k));
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
              if (k + 1 < m2 && e[k] !== 0) {
                for (let i = k + 1; i < m2; i++) {
                  work[i] = 0;
                }
                for (let i = k + 1; i < m2; i++) {
                  for (let j = k + 1; j < n; j++) {
                    work[i] += e[j] * a2.get(i, j);
                  }
                }
                for (let j = k + 1; j < n; j++) {
                  let t = -e[j] / e[k + 1];
                  for (let i = k + 1; i < m2; i++) {
                    a2.set(i, j, a2.get(i, j) + t * work[i]);
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
          let p = Math.min(n, m2 + 1);
          if (nct < n) {
            s[nct] = a2.get(nct, nct);
          }
          if (m2 < p) {
            s[p - 1] = 0;
          }
          if (nrt + 1 < p) {
            e[nrt] = a2.get(nrt, p - 1);
          }
          e[p - 1] = 0;
          if (wantu) {
            for (let j = nct; j < nu; j++) {
              for (let i = 0; i < m2; i++) {
                U.set(i, j, 0);
              }
              U.set(j, j, 1);
            }
            for (let k = nct - 1; k >= 0; k--) {
              if (s[k] !== 0) {
                for (let j = k + 1; j < nu; j++) {
                  let t = 0;
                  for (let i = k; i < m2; i++) {
                    t += U.get(i, k) * U.get(i, j);
                  }
                  t = -t / U.get(k, k);
                  for (let i = k; i < m2; i++) {
                    U.set(i, j, U.get(i, j) + t * U.get(i, k));
                  }
                }
                for (let i = k; i < m2; i++) {
                  U.set(i, k, -U.get(i, k));
                }
                U.set(k, k, 1 + U.get(k, k));
                for (let i = 0; i < k - 1; i++) {
                  U.set(i, k, 0);
                }
              } else {
                for (let i = 0; i < m2; i++) {
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
                    for (let i = 0; i < m2; i++) {
                      t = cs * U.get(i, j) + sn * U.get(i, k - 1);
                      U.set(i, k - 1, -sn * U.get(i, j) + cs * U.get(i, k - 1));
                      U.set(i, j, t);
                    }
                  }
                }
                break;
              }
              case 3: {
                const scale2 = Math.max(Math.abs(s[p - 1]), Math.abs(s[p - 2]), Math.abs(e[p - 2]), Math.abs(s[k]), Math.abs(e[k]));
                const sp = s[p - 1] / scale2;
                const spm1 = s[p - 2] / scale2;
                const epm1 = e[p - 2] / scale2;
                const sk = s[k] / scale2;
                const ek = e[k] / scale2;
                const b = ((spm1 + sp) * (spm1 - sp) + epm1 * epm1) / 2;
                const c2 = sp * epm1 * (sp * epm1);
                let shift = 0;
                if (b !== 0 || c2 !== 0) {
                  if (b < 0) {
                    shift = 0 - Math.sqrt(b * b + c2);
                  } else {
                    shift = Math.sqrt(b * b + c2);
                  }
                  shift = c2 / (b + shift);
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
                  if (wantu && j < m2 - 1) {
                    for (let i = 0; i < m2; i++) {
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
                  if (wantu && k < m2 - 1) {
                    for (let i = 0; i < m2; i++) {
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
          this.m = m2;
          this.n = n;
          this.s = s;
          this.U = U;
          this.V = V;
        }
        solve(value) {
          let Y2 = value;
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
              let sum2 = 0;
              for (let k = 0; k < scols; k++) {
                sum2 += VL.get(i, k) * U.get(j, k);
              }
              VLU.set(i, j, sum2);
            }
          }
          return VLU.mmul(Y2);
        }
        solveForDiagonal(value) {
          return this.solve(Matrix.diag(value));
        }
        inverse() {
          let V = this.V;
          let e = this.threshold;
          let vrows = V.rows;
          let vcols = V.columns;
          let X2 = new Matrix(vrows, this.s.length);
          for (let i = 0; i < vrows; i++) {
            for (let j = 0; j < vcols; j++) {
              if (Math.abs(this.s[j]) > e) {
                X2.set(i, j, V.get(i, j) / this.s[j]);
              }
            }
          }
          let U = this.U;
          let urows = U.rows;
          let ucols = U.columns;
          let Y2 = new Matrix(vrows, urows);
          for (let i = 0; i < vrows; i++) {
            for (let j = 0; j < urows; j++) {
              let sum2 = 0;
              for (let k = 0; k < ucols; k++) {
                sum2 += X2.get(i, k) * U.get(j, k);
              }
              Y2.set(i, j, sum2);
            }
          }
          return Y2;
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
          let a2, b, c2, d;
          if (matrix.columns === 2) {
            a2 = matrix.get(0, 0);
            b = matrix.get(0, 1);
            c2 = matrix.get(1, 0);
            d = matrix.get(1, 1);
            return a2 * d - b * c2;
          } else if (matrix.columns === 3) {
            let subMatrix0, subMatrix1, subMatrix2;
            subMatrix0 = new MatrixSelectionView(matrix, [1, 2], [1, 2]);
            subMatrix1 = new MatrixSelectionView(matrix, [1, 2], [0, 2]);
            subMatrix2 = new MatrixSelectionView(matrix, [1, 2], [0, 1]);
            a2 = matrix.get(0, 0);
            b = matrix.get(0, 1);
            c2 = matrix.get(0, 2);
            return a2 * determinant(subMatrix0) - b * determinant(subMatrix1) + c2 * determinant(subMatrix2);
          } else {
            return new LuDecomposition(matrix).determinant;
          }
        } else {
          throw Error("determinant can only be calculated for a square matrix");
        }
      }
      function xrange(n, exception) {
        let range2 = [];
        for (let i = 0; i < n; i++) {
          if (i !== exception) {
            range2.push(i);
          }
        }
        return range2;
      }
      function dependenciesOneRow(error, matrix, index2, thresholdValue = 1e-9, thresholdError = 1e-9) {
        if (error > thresholdError) {
          return new Array(matrix.rows + 1).fill(0);
        } else {
          let returnArray = matrix.addRow(index2, [0]);
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
          let x3 = svd.solve(b);
          let error = Matrix.sub(b, Abis.mmul(x3)).abs().max();
          results.setRow(i, dependenciesOneRow(error, x3, i, thresholdValue, thresholdError));
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
        if (typeof yMatrix === "object" && !Matrix.isMatrix(yMatrix) && !isAnyArray.isAnyArray(yMatrix)) {
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
        if (typeof yMatrix === "object" && !Matrix.isMatrix(yMatrix) && !isAnyArray.isAnyArray(yMatrix)) {
          options = yMatrix;
          yMatrix = xMatrix;
          yIsSame = true;
        } else {
          yMatrix = new Matrix(yMatrix);
        }
        if (xMatrix.rows !== yMatrix.rows) {
          throw new TypeError("Both matrices must have the same number of rows");
        }
        const { center = true, scale: scale2 = true } = options;
        if (center) {
          xMatrix.center("column");
          if (!yIsSame) {
            yMatrix.center("column");
          }
        }
        if (scale2) {
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
          let X2 = new Matrix(n, n);
          let i, j;
          for (i = 0; i < n; i++) {
            for (j = 0; j < n; j++) {
              X2.set(i, j, 0);
            }
            X2.set(i, i, d[i]);
            if (e[i] > 0) {
              X2.set(i, i + 1, e[i]);
            } else if (e[i] < 0) {
              X2.set(i, i - 1, e[i]);
            }
          }
          return X2;
        }
      };
      function tred2(n, e, d, V) {
        let f, g, h, i, j, k, hh, scale2;
        for (j = 0; j < n; j++) {
          d[j] = V.get(n - 1, j);
        }
        for (i = n - 1; i > 0; i--) {
          scale2 = 0;
          h = 0;
          for (k = 0; k < i; k++) {
            scale2 = scale2 + Math.abs(d[k]);
          }
          if (scale2 === 0) {
            e[i] = d[i - 1];
            for (j = 0; j < i; j++) {
              d[j] = V.get(i - 1, j);
              V.set(i, j, 0);
              V.set(j, i, 0);
            }
          } else {
            for (k = 0; k < i; k++) {
              d[k] /= scale2;
              h += d[k] * d[k];
            }
            f = d[i - 1];
            g = Math.sqrt(h);
            if (f > 0) {
              g = -g;
            }
            e[i] = scale2 * g;
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
        let g, h, i, j, k, l, m2, p, r, dl1, c2, c22, c3, el1, s, s2;
        for (i = 1; i < n; i++) {
          e[i - 1] = e[i];
        }
        e[n - 1] = 0;
        let f = 0;
        let tst1 = 0;
        let eps = Number.EPSILON;
        for (l = 0; l < n; l++) {
          tst1 = Math.max(tst1, Math.abs(d[l]) + Math.abs(e[l]));
          m2 = l;
          while (m2 < n) {
            if (Math.abs(e[m2]) <= eps * tst1) {
              break;
            }
            m2++;
          }
          if (m2 > l) {
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
              p = d[m2];
              c2 = 1;
              c22 = c2;
              c3 = c2;
              el1 = e[l + 1];
              s = 0;
              s2 = 0;
              for (i = m2 - 1; i >= l; i--) {
                c3 = c22;
                c22 = c2;
                s2 = s;
                g = c2 * e[i];
                h = c2 * p;
                r = hypotenuse(p, e[i]);
                e[i + 1] = s * r;
                s = e[i] / r;
                c2 = p / r;
                p = c2 * d[i] - s * g;
                d[i + 1] = h + s * (c2 * g + s * d[i]);
                for (k = 0; k < n; k++) {
                  h = V.get(k, i + 1);
                  V.set(k, i + 1, s * V.get(k, i) + c2 * h);
                  V.set(k, i, c2 * V.get(k, i) - s * h);
                }
              }
              p = -s * s2 * c3 * el1 * e[l] / dl1;
              e[l] = s * p;
              d[l] = c2 * p;
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
        let f, g, h, i, j, m2;
        let scale2;
        for (m2 = low + 1; m2 <= high - 1; m2++) {
          scale2 = 0;
          for (i = m2; i <= high; i++) {
            scale2 = scale2 + Math.abs(H.get(i, m2 - 1));
          }
          if (scale2 !== 0) {
            h = 0;
            for (i = high; i >= m2; i--) {
              ort[i] = H.get(i, m2 - 1) / scale2;
              h += ort[i] * ort[i];
            }
            g = Math.sqrt(h);
            if (ort[m2] > 0) {
              g = -g;
            }
            h = h - ort[m2] * g;
            ort[m2] = ort[m2] - g;
            for (j = m2; j < n; j++) {
              f = 0;
              for (i = high; i >= m2; i--) {
                f += ort[i] * H.get(i, j);
              }
              f = f / h;
              for (i = m2; i <= high; i++) {
                H.set(i, j, H.get(i, j) - f * ort[i]);
              }
            }
            for (i = 0; i <= high; i++) {
              f = 0;
              for (j = high; j >= m2; j--) {
                f += ort[j] * H.get(i, j);
              }
              f = f / h;
              for (j = m2; j <= high; j++) {
                H.set(i, j, H.get(i, j) - f * ort[j]);
              }
            }
            ort[m2] = scale2 * ort[m2];
            H.set(m2, m2 - 1, scale2 * g);
          }
        }
        for (i = 0; i < n; i++) {
          for (j = 0; j < n; j++) {
            V.set(i, j, i === j ? 1 : 0);
          }
        }
        for (m2 = high - 1; m2 >= low + 1; m2--) {
          if (H.get(m2, m2 - 1) !== 0) {
            for (i = m2 + 1; i <= high; i++) {
              ort[i] = H.get(i, m2 - 1);
            }
            for (j = m2; j <= high; j++) {
              g = 0;
              for (i = m2; i <= high; i++) {
                g += ort[i] * V.get(i, j);
              }
              g = g / ort[m2] / H.get(m2, m2 - 1);
              for (i = m2; i <= high; i++) {
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
        let i, j, k, l, m2, t, w, x3, y3;
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
            x3 = H.get(n, n);
            if (q >= 0) {
              z = p >= 0 ? p + z : p - z;
              d[n - 1] = x3 + z;
              d[n] = d[n - 1];
              if (z !== 0) {
                d[n] = x3 - w / z;
              }
              e[n - 1] = 0;
              e[n] = 0;
              x3 = H.get(n, n - 1);
              s = Math.abs(x3) + Math.abs(z);
              p = x3 / s;
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
              d[n - 1] = x3 + p;
              d[n] = x3 + p;
              e[n - 1] = z;
              e[n] = -z;
            }
            n = n - 2;
            iter = 0;
          } else {
            x3 = H.get(n, n);
            y3 = 0;
            w = 0;
            if (l < n) {
              y3 = H.get(n - 1, n - 1);
              w = H.get(n, n - 1) * H.get(n - 1, n);
            }
            if (iter === 10) {
              exshift += x3;
              for (i = low; i <= n; i++) {
                H.set(i, i, H.get(i, i) - x3);
              }
              s = Math.abs(H.get(n, n - 1)) + Math.abs(H.get(n - 1, n - 2));
              x3 = y3 = 0.75 * s;
              w = -0.4375 * s * s;
            }
            if (iter === 30) {
              s = (y3 - x3) / 2;
              s = s * s + w;
              if (s > 0) {
                s = Math.sqrt(s);
                if (y3 < x3) {
                  s = -s;
                }
                s = x3 - w / ((y3 - x3) / 2 + s);
                for (i = low; i <= n; i++) {
                  H.set(i, i, H.get(i, i) - s);
                }
                exshift += s;
                x3 = y3 = w = 0.964;
              }
            }
            iter = iter + 1;
            m2 = n - 2;
            while (m2 >= l) {
              z = H.get(m2, m2);
              r = x3 - z;
              s = y3 - z;
              p = (r * s - w) / H.get(m2 + 1, m2) + H.get(m2, m2 + 1);
              q = H.get(m2 + 1, m2 + 1) - z - r - s;
              r = H.get(m2 + 2, m2 + 1);
              s = Math.abs(p) + Math.abs(q) + Math.abs(r);
              p = p / s;
              q = q / s;
              r = r / s;
              if (m2 === l) {
                break;
              }
              if (Math.abs(H.get(m2, m2 - 1)) * (Math.abs(q) + Math.abs(r)) < eps * (Math.abs(p) * (Math.abs(H.get(m2 - 1, m2 - 1)) + Math.abs(z) + Math.abs(H.get(m2 + 1, m2 + 1))))) {
                break;
              }
              m2--;
            }
            for (i = m2 + 2; i <= n; i++) {
              H.set(i, i - 2, 0);
              if (i > m2 + 2) {
                H.set(i, i - 3, 0);
              }
            }
            for (k = m2; k <= n - 1; k++) {
              notlast = k !== n - 1;
              if (k !== m2) {
                p = H.get(k, k - 1);
                q = H.get(k + 1, k - 1);
                r = notlast ? H.get(k + 2, k - 1) : 0;
                x3 = Math.abs(p) + Math.abs(q) + Math.abs(r);
                if (x3 !== 0) {
                  p = p / x3;
                  q = q / x3;
                  r = r / x3;
                }
              }
              if (x3 === 0) {
                break;
              }
              s = Math.sqrt(p * p + q * q + r * r);
              if (p < 0) {
                s = -s;
              }
              if (s !== 0) {
                if (k !== m2) {
                  H.set(k, k - 1, -s * x3);
                } else if (l !== m2) {
                  H.set(k, k - 1, -H.get(k, k - 1));
                }
                p = p + s;
                x3 = p / s;
                y3 = q / s;
                z = r / s;
                q = q / p;
                r = r / p;
                for (j = k; j < nn; j++) {
                  p = H.get(k, j) + q * H.get(k + 1, j);
                  if (notlast) {
                    p = p + r * H.get(k + 2, j);
                    H.set(k + 2, j, H.get(k + 2, j) - p * z);
                  }
                  H.set(k, j, H.get(k, j) - p * x3);
                  H.set(k + 1, j, H.get(k + 1, j) - p * y3);
                }
                for (i = 0; i <= Math.min(n, k + 3); i++) {
                  p = x3 * H.get(i, k) + y3 * H.get(i, k + 1);
                  if (notlast) {
                    p = p + z * H.get(i, k + 2);
                    H.set(i, k + 2, H.get(i, k + 2) - p * r);
                  }
                  H.set(i, k, H.get(i, k) - p);
                  H.set(i, k + 1, H.get(i, k + 1) - p * q);
                }
                for (i = low; i <= high; i++) {
                  p = x3 * V.get(i, k) + y3 * V.get(i, k + 1);
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
                  x3 = H.get(i, i + 1);
                  y3 = H.get(i + 1, i);
                  q = (d[i] - p) * (d[i] - p) + e[i] * e[i];
                  t = (x3 * s - z * r) / q;
                  H.set(i, n, t);
                  H.set(i + 1, n, Math.abs(x3) > Math.abs(z) ? (-r - w * t) / x3 : (-s - y3 * t) / z);
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
                  x3 = H.get(i, i + 1);
                  y3 = H.get(i + 1, i);
                  vr = (d[i] - p) * (d[i] - p) + e[i] * e[i] - q * q;
                  vi = (d[i] - p) * 2 * q;
                  if (vr === 0 && vi === 0) {
                    vr = eps * norm * (Math.abs(w) + Math.abs(q) + Math.abs(x3) + Math.abs(y3) + Math.abs(z));
                  }
                  cdivres = cdiv(x3 * r - z * ra + q * sa, x3 * s - z * sa - q * ra, vr, vi);
                  H.set(i, n - 1, cdivres[0]);
                  H.set(i, n, cdivres[1]);
                  if (Math.abs(x3) > Math.abs(z) + Math.abs(q)) {
                    H.set(i + 1, n - 1, (-ra - w * H.get(i, n - 1) + q * H.get(i, n)) / x3);
                    H.set(i + 1, n, (-sa - w * H.get(i, n) - q * H.get(i, n - 1)) / x3);
                  } else {
                    cdivres = cdiv(-r - y3 * H.get(i, n - 1), -s - y3 * H.get(i, n), z, q);
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
          let a2 = value;
          let dimension = a2.rows;
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
              s = (a2.get(j, k) - s) / l.get(k, k);
              l.set(j, k, s);
              d = d + s * s;
            }
            d = a2.get(j, j) - d;
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
          let B2 = value.clone();
          let i, j, k;
          for (k = 0; k < dimension; k++) {
            for (j = 0; j < count; j++) {
              for (i = 0; i < k; i++) {
                B2.set(k, j, B2.get(k, j) - B2.get(i, j) * l.get(k, i));
              }
              B2.set(k, j, B2.get(k, j) / l.get(k, k));
            }
          }
          for (k = dimension - 1; k >= 0; k--) {
            for (j = 0; j < count; j++) {
              for (i = k + 1; i < dimension; i++) {
                B2.set(k, j, B2.get(k, j) - B2.get(i, j) * l.get(i, k));
              }
              B2.set(k, j, B2.get(k, j) / l.get(k, k));
            }
          }
          return B2;
        }
        get lowerTriangularMatrix() {
          return this.L;
        }
      };
      var nipals = class {
        constructor(X2, options = {}) {
          X2 = WrapperMatrix2D.checkMatrix(X2);
          let { Y: Y2 } = options;
          const {
            scaleScores = false,
            maxIterations = 1e3,
            terminationCriteria = 1e-10
          } = options;
          let u4;
          if (Y2) {
            if (isAnyArray.isAnyArray(Y2) && typeof Y2[0] === "number") {
              Y2 = Matrix.columnVector(Y2);
            } else {
              Y2 = WrapperMatrix2D.checkMatrix(Y2);
            }
            if (Y2.rows !== X2.rows) {
              throw new Error("Y should have the same number of rows as X");
            }
            u4 = Y2.getColumnVector(0);
          } else {
            u4 = X2.getColumnVector(0);
          }
          let diff = 1;
          let t, q, w, tOld;
          for (let counter = 0; counter < maxIterations && diff > terminationCriteria; counter++) {
            w = X2.transpose().mmul(u4).div(u4.transpose().mmul(u4).get(0, 0));
            w = w.div(w.norm());
            t = X2.mmul(w).div(w.transpose().mmul(w).get(0, 0));
            if (counter > 0) {
              diff = t.clone().sub(tOld).pow(2).sum();
            }
            tOld = t.clone();
            if (Y2) {
              q = Y2.transpose().mmul(t).div(t.transpose().mmul(t).get(0, 0));
              q = q.div(q.norm());
              u4 = Y2.mmul(q).div(q.transpose().mmul(q).get(0, 0));
            } else {
              u4 = t;
            }
          }
          if (Y2) {
            let p = X2.transpose().mmul(t).div(t.transpose().mmul(t).get(0, 0));
            p = p.div(p.norm());
            let xResidual = X2.clone().sub(t.clone().mmul(p.transpose()));
            let residual = u4.transpose().mmul(t).div(t.transpose().mmul(t).get(0, 0));
            let yResidual = Y2.clone().sub(t.clone().mulS(residual.get(0, 0)).mmul(q.transpose()));
            this.t = t;
            this.p = p.transpose();
            this.w = w.transpose();
            this.q = q;
            this.u = u4;
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
            this.xResidual = X2.sub(t.mmul(w.transpose()));
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
      function gradientFunction(data, evaluatedData, params, gradientDifference, paramFunction) {
        const n = params.length;
        const m2 = data.x.length;
        let ans = new Array(n);
        for (let param = 0; param < n; param++) {
          ans[param] = new Array(m2);
          let auxParams = params.slice();
          auxParams[param] += gradientDifference;
          let funcParam = paramFunction(auxParams);
          for (let point = 0; point < m2; point++) {
            ans[param][point] = evaluatedData[point] - funcParam(data.x[point]);
          }
        }
        return new mlMatrix.Matrix(ans);
      }
      function matrixFunction(data, evaluatedData) {
        const m2 = data.x.length;
        let ans = new Array(m2);
        for (let point = 0; point < m2; point++) {
          ans[point] = [data.y[point] - evaluatedData[point]];
        }
        return new mlMatrix.Matrix(ans);
      }
      function step(data, params, damping, gradientDifference, parameterizedFunction) {
        let value = damping * gradientDifference * gradientDifference;
        let identity4 = mlMatrix.Matrix.eye(params.length, params.length, value);
        const func = parameterizedFunction(params);
        let evaluatedData = new Float64Array(data.x.length);
        for (let i = 0; i < data.x.length; i++) {
          evaluatedData[i] = func(data.x[i]);
        }
        let gradientFunc = gradientFunction(data, evaluatedData, params, gradientDifference, parameterizedFunction);
        let matrixFunc = matrixFunction(data, evaluatedData);
        let inverseMatrix = mlMatrix.inverse(identity4.add(gradientFunc.mmul(gradientFunc.transpose())));
        params = new mlMatrix.Matrix([params]);
        params = params.sub(inverseMatrix.mmul(gradientFunc).mmul(matrixFunc).mul(gradientDifference).transpose());
        return params.to1DArray();
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
        }, trys: [], ops: [] }, f, y3, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v2) {
            return step([n, v2]);
          };
        }
        function step(op) {
          if (f)
            throw new TypeError("Generator is already executing.");
          while (_)
            try {
              if (f = 1, y3 && (t = op[0] & 2 ? y3["return"] : op[0] ? y3["throw"] || ((t = y3["return"]) && t.call(y3), 0) : y3.next) && !(t = t.call(y3, op[1])).done)
                return t;
              if (y3 = 0, t)
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
                  y3 = op[1];
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
              y3 = 0;
            } finally {
              f = t = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      var __read = exports && exports.__read || function(o, n) {
        var m2 = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m2)
          return o;
        var i = m2.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m2 = i["return"]))
              m2.call(i);
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
        function UMAP3(params) {
          if (params === void 0) {
            params = {};
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
            if (params[key] !== void 0)
              _this[key] = params[key];
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
        UMAP3.prototype.fit = function(X2) {
          this.initializeFit(X2);
          this.optimizeLayout();
          return this.embedding;
        };
        UMAP3.prototype.fitAsync = function(X2, callback) {
          if (callback === void 0) {
            callback = function() {
              return true;
            };
          }
          return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  this.initializeFit(X2);
                  return [4, this.optimizeLayoutAsync(callback)];
                case 1:
                  _a.sent();
                  return [2, this.embedding];
              }
            });
          });
        };
        UMAP3.prototype.setSupervisedProjection = function(Y2, params) {
          if (params === void 0) {
            params = {};
          }
          this.Y = Y2;
          this.targetMetric = params.targetMetric || this.targetMetric;
          this.targetWeight = params.targetWeight || this.targetWeight;
          this.targetNNeighbors = params.targetNNeighbors || this.targetNNeighbors;
        };
        UMAP3.prototype.setPrecomputedKNN = function(knnIndices, knnDistances) {
          this.knnIndices = knnIndices;
          this.knnDistances = knnDistances;
        };
        UMAP3.prototype.initializeFit = function(X2) {
          if (X2.length <= this.nNeighbors) {
            throw new Error("Not enough data points (" + X2.length + ") to create nNeighbors: " + this.nNeighbors + ".  Add more data points or adjust the configuration.");
          }
          if (this.X === X2 && this.isInitialized) {
            return this.getNEpochs();
          }
          this.X = X2;
          if (!this.knnIndices && !this.knnDistances) {
            var knnResults = this.nearestNeighbors(X2);
            this.knnIndices = knnResults.knnIndices;
            this.knnDistances = knnResults.knnDistances;
          }
          this.graph = this.fuzzySimplicialSet(X2, this.nNeighbors, this.setOpMixRatio);
          this.makeSearchFns();
          this.searchGraph = this.makeSearchGraph(X2);
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
        UMAP3.prototype.makeSearchGraph = function(X2) {
          var knnIndices = this.knnIndices;
          var knnDistances = this.knnDistances;
          var dims = [X2.length, X2.length];
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
          var init2 = nnDescent.initializeSearch(this.rpForest, rawData, toTransform, nNeighbors, this.initFromRandom, this.initFromTree, this.random);
          var result = this.search(rawData, this.searchGraph, init2, toTransform);
          var _a = heap.deheapSort(result), indices = _a.indices, distances = _a.weights;
          indices = indices.map(function(x3) {
            return x3.slice(0, _this.nNeighbors);
          });
          distances = distances.map(function(x3) {
            return x3.slice(0, _this.nNeighbors);
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
          var graphMax = graph.getValues().reduce(function(max2, val) {
            return val > max2 ? val : max2;
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
          var _a = this, Y2 = _a.Y, X2 = _a.X;
          if (Y2) {
            if (Y2.length !== X2.length) {
              throw new Error("Length of X and y must be equal");
            }
            if (this.targetMetric === "categorical") {
              var lt = this.targetWeight < 1;
              var farDist = lt ? 2.5 * (1 / (1 - this.targetWeight)) : 1e12;
              this.graph = this.categoricalSimplicialSetIntersection(this.graph, Y2, farDist);
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
        UMAP3.prototype.nearestNeighbors = function(X2) {
          var _a = this, distanceFn = _a.distanceFn, nNeighbors = _a.nNeighbors;
          var log2 = function(n) {
            return Math.log(n) / Math.log(2);
          };
          var metricNNDescent = nnDescent.makeNNDescent(distanceFn, this.random);
          var round = function(n) {
            return n === 0.5 ? 0 : Math.round(n);
          };
          var nTrees = 5 + Math.floor(round(Math.pow(X2.length, 0.5) / 20));
          var nIters = Math.max(5, Math.floor(Math.round(log2(X2.length))));
          this.rpForest = tree.makeForest(X2, nNeighbors, nTrees, this.random);
          var leafArray = tree.makeLeafArray(this.rpForest);
          var _b = metricNNDescent(X2, leafArray, nNeighbors, nIters), indices = _b.indices, weights = _b.weights;
          return { knnIndices: indices, knnDistances: weights };
        };
        UMAP3.prototype.fuzzySimplicialSet = function(X2, nNeighbors, setOpMixRatio) {
          if (setOpMixRatio === void 0) {
            setOpMixRatio = 1;
          }
          var _a = this, _b = _a.knnIndices, knnIndices = _b === void 0 ? [] : _b, _c = _a.knnDistances, knnDistances = _c === void 0 ? [] : _c, localConnectivity = _a.localConnectivity;
          var _d = this.smoothKNNDistance(knnDistances, nNeighbors, localConnectivity), sigmas = _d.sigmas, rhos = _d.rhos;
          var _e = this.computeMembershipStrengths(knnIndices, knnDistances, sigmas, rhos), rows = _e.rows, cols = _e.cols, vals = _e.vals;
          var size = [X2.length, X2.length];
          var sparseMatrix = new matrix.SparseMatrix(rows, cols, vals, size);
          var transpose = matrix.transpose(sparseMatrix);
          var prodMatrix = matrix.pairwiseMultiply(sparseMatrix, transpose);
          var a2 = matrix.subtract(matrix.add(sparseMatrix, transpose), prodMatrix);
          var b = matrix.multiplyScalar(a2, setOpMixRatio);
          var c2 = matrix.multiplyScalar(prodMatrix, 1 - setOpMixRatio);
          var result = matrix.add(b, c2);
          return result;
        };
        UMAP3.prototype.categoricalSimplicialSetIntersection = function(simplicialSet, target, farDist, unknownDist) {
          if (unknownDist === void 0) {
            unknownDist = 1;
          }
          var intersection = fastIntersection(simplicialSet, target, unknownDist, farDist);
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
          var target = Math.log(k) / Math.log(2) * bandwidth;
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
              var index2 = Math.floor(localConnectivity);
              var interpolation = localConnectivity - index2;
              if (index2 > 0) {
                rho[i] = nonZeroDists[index2 - 1];
                if (interpolation > SMOOTH_K_TOLERANCE) {
                  rho[i] += interpolation * (nonZeroDists[index2] - nonZeroDists[index2 - 1]);
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
              if (Math.abs(psum - target) < SMOOTH_K_TOLERANCE) {
                break;
              }
              if (psum > target) {
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
          var max2 = utils.max(weights);
          var nSamples = weights.map(function(w) {
            return w / max2 * nEpochs;
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
          var _b = findABParams(this.spread, this.minDist), a2 = _b.a, b = _b.b;
          this.assignOptimizationStateParameters({
            headEmbedding,
            tailEmbedding,
            head,
            tail,
            epochsPerSample,
            a: a2,
            b,
            nEpochs,
            nVertices
          });
        };
        UMAP3.prototype.optimizeLayoutStep = function(n) {
          var optimizationState = this.optimizationState;
          var head = optimizationState.head, tail = optimizationState.tail, headEmbedding = optimizationState.headEmbedding, tailEmbedding = optimizationState.tailEmbedding, epochsPerSample = optimizationState.epochsPerSample, epochOfNextSample = optimizationState.epochOfNextSample, epochOfNextNegativeSample = optimizationState.epochOfNextNegativeSample, epochsPerNegativeSample = optimizationState.epochsPerNegativeSample, moveOther = optimizationState.moveOther, initialAlpha = optimizationState.initialAlpha, alpha = optimizationState.alpha, gamma2 = optimizationState.gamma, a2 = optimizationState.a, b = optimizationState.b, dim = optimizationState.dim, nEpochs = optimizationState.nEpochs, nVertices = optimizationState.nVertices;
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
              gradCoeff = -2 * a2 * b * Math.pow(distSquared, b - 1);
              gradCoeff /= a2 * Math.pow(distSquared, b) + 1;
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
                gradCoeff_1 = 2 * gamma2 * b;
                gradCoeff_1 /= (1e-3 + distSquared_1) * (a2 * Math.pow(distSquared_1, b) + 1);
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
      function euclidean(x3, y3) {
        var result = 0;
        for (var i = 0; i < x3.length; i++) {
          result += Math.pow(x3[i] - y3[i], 2);
        }
        return Math.sqrt(result);
      }
      exports.euclidean = euclidean;
      function cosine(x3, y3) {
        var result = 0;
        var normX = 0;
        var normY = 0;
        for (var i = 0; i < x3.length; i++) {
          result += x3[i] * y3[i];
          normX += Math.pow(x3[i], 2);
          normY += Math.pow(y3[i], 2);
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
      function clip(x3, clipValue) {
        if (x3 > clipValue)
          return clipValue;
        else if (x3 < -clipValue)
          return -clipValue;
        else
          return x3;
      }
      function rDist(x3, y3) {
        var result = 0;
        for (var i = 0; i < x3.length; i++) {
          result += Math.pow(x3[i] - y3[i], 2);
        }
        return result;
      }
      function findABParams(spread, minDist) {
        var curve = function(_a2) {
          var _b = __read(_a2, 2), a3 = _b[0], b2 = _b[1];
          return function(x3) {
            return 1 / (1 + a3 * Math.pow(x3, 2 * b2));
          };
        };
        var xv = utils.linear(0, spread * 3, 300).map(function(val) {
          return val < minDist ? 1 : val;
        });
        var yv = utils.zeros(xv.length).map(function(val, index2) {
          var gte = xv[index2] >= minDist;
          return gte ? Math.exp(-(xv[index2] - minDist) / spread) : val;
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
        var _a = __read(parameterValues, 2), a2 = _a[0], b = _a[1];
        return { a: a2, b };
      }
      exports.findABParams = findABParams;
      function fastIntersection(graph, target, unknownDist, farDist) {
        if (unknownDist === void 0) {
          unknownDist = 1;
        }
        if (farDist === void 0) {
          farDist = 5;
        }
        return graph.map(function(value, row, col) {
          if (target[row] === -1 || target[col] === -1) {
            return value * Math.exp(-unknownDist);
          } else if (target[row] !== target[col]) {
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
              var a2 = indices[i][j];
              result[i][d] += weights[i][j] * embedding[a2][d];
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

  // federjs/FederIndex/parser/FileReader.ts
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
      const int8 = this.dataview.getInt8(this.p);
      this.p += 1;
      return int8;
    }
    readUint8() {
      const uint8 = this.dataview.getUint8(this.p);
      this.p += 1;
      return uint8;
    }
    readBool() {
      const int8 = this.readInt8();
      return Boolean(int8);
    }
    readUint16() {
      const uint16 = this.dataview.getUint16(this.p, true);
      this.p += 2;
      return uint16;
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
        console.warn(int64, "Exceeds MAX_SAFE_INTEGER. Precision may be lost");
      return int64;
    }
    readFloat64() {
      const float64 = this.dataview.getFloat64(this.p, true);
      this.p += 8;
      return float64;
    }
    readDouble() {
      return this.readFloat64();
    }
    readUint32Array(n) {
      const res = Array(n).fill(0).map((_) => this.readUint32());
      return res;
    }
    readFloat32Array(n) {
      const res = new Float32Array(this.data.slice(this.p, this.p + n * 4));
      this.p += n * 4;
      return res;
    }
    readUint64Array(n) {
      const res = Array(n).fill(0).map((_) => this.readUint64());
      return res;
    }
  };

  // federjs/FederIndex/parser/hnswlibParser/HNSWlibFileReader.ts
  var HNSWlibFileReader = class extends FileReader {
    constructor(arrayBuffer) {
      super(arrayBuffer);
    }
    readIsDeleted() {
      return this.readUint8();
    }
    readIsReused() {
      return this.readUint8();
    }
    readLevelOCount() {
      return this.readUint16();
    }
  };

  // federjs/FederIndex/parser/hnswlibParser/index.ts
  var hnswlibIndexParser = (arrayBuffer) => {
    const reader = new HNSWlibFileReader(arrayBuffer);
    const index2 = {};
    index2.offsetLevel0_ = reader.readUint64();
    index2.max_elements_ = reader.readUint64();
    index2.cur_element_count = reader.readUint64();
    index2.size_data_per_element_ = reader.readUint64();
    index2.label_offset_ = reader.readUint64();
    index2.offsetData_ = reader.readUint64();
    index2.dim = (index2.size_data_per_element_ - index2.offsetData_ - 8) / 4;
    index2.maxlevel_ = reader.readUint32();
    index2.enterpoint_node_ = reader.readUint32();
    index2.maxM_ = reader.readUint64();
    index2.maxM0_ = reader.readUint64();
    index2.M = reader.readUint64();
    index2.mult_ = reader.readFloat64();
    index2.ef_construction_ = reader.readUint64();
    index2.size_links_per_element_ = index2.maxM_ * 4 + 4;
    index2.size_links_level0_ = index2.maxM0_ * 4 + 4;
    index2.revSize_ = 1 / index2.mult_;
    index2.ef_ = 10;
    read_data_level0_memory_(reader, index2);
    const linkListSizes = [];
    const linkLists_ = [];
    for (let i = 0; i < index2.cur_element_count; i++) {
      const linkListSize = reader.readUint32();
      linkListSizes.push(linkListSize);
      if (linkListSize === 0) {
        linkLists_[i] = [];
      } else {
        const levelCount = linkListSize / 4 / (index2.maxM_ + 1);
        linkLists_[i] = Array(levelCount).fill(0).map((_) => reader.readUint32Array(index2.maxM_ + 1)).map((linkLists) => linkLists.slice(1, linkLists[0] + 1));
      }
    }
    index2.linkListSizes = linkListSizes;
    index2.linkLists_ = linkLists_;
    console.assert(reader.isEmpty, "HNSWlib Parser Failed. Not empty when the parser completes.");
    return {
      indexType: "hnsw" /* hnsw */,
      ntotal: index2.cur_element_count,
      vectors: index2.vectors,
      maxLevel: index2.maxlevel_,
      linkLists_level0_count: index2.linkLists_level0_count,
      linkLists_level_0: index2.linkLists_level0,
      linkLists_levels: index2.linkLists_,
      enterPoint: index2.enterpoint_node_,
      labels: index2.externalLabel,
      isDeleted: index2.isDeleted,
      numDeleted: index2.num_deleted_,
      M: index2.M,
      ef_construction: index2.ef_construction_
    };
  };
  var read_data_level0_memory_ = (reader, index2) => {
    const isDeleted = [];
    const linkLists_level0_count = [];
    const linkLists_level0 = [];
    const vectors = [];
    const externalLabel = [];
    for (let i = 0; i < index2.cur_element_count; i++) {
      linkLists_level0_count.push(reader.readLevelOCount());
      isDeleted.push(reader.readIsDeleted());
      reader.readIsReused();
      linkLists_level0.push(reader.readUint32Array(index2.maxM0_));
      vectors.push(reader.readFloat32Array(index2.dim));
      externalLabel.push(reader.readUint64());
    }
    index2.isDeleted = isDeleted;
    index2.num_deleted_ = isDeleted.reduce((acc, cur) => acc + cur, 0);
    index2.linkLists_level0_count = linkLists_level0_count;
    index2.linkLists_level0 = linkLists_level0;
    index2.vectors = vectors;
    index2.externalLabel = externalLabel;
  };

  // federjs/FederIndex/Utils.ts
  var uint8toChars = (data) => {
    return String.fromCharCode(...data);
  };

  // federjs/FederIndex/parser/faissParser/FaissFileReader.ts
  var FaissFileReader = class extends FileReader {
    constructor(arrayBuffer) {
      super(arrayBuffer);
    }
    readH() {
      const uint8Array = Array(4).fill(0).map((_) => this.readUint8());
      const h = uint8toChars(uint8Array);
      return h;
    }
    readDummy() {
      const dummy = this.readUint64();
      return dummy;
    }
  };

  // federjs/FederIndex/parser/faissParser/readInvertedLists.ts
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
    invlists.listSizes = Array(invlists.listSizesSize).fill(0).map((_) => reader.readUint64());
    const data = [];
    for (let i = 0; i < invlists.listSizesSize; i++) {
      const vectors = Array(invlists.listSizes[i]).fill(0).map((_) => reader.readFloat32Array(invlists.codeSize / 4));
      const ids = reader.readUint64Array(invlists.listSizes[i]);
      data.push({ ids, vectors });
    }
    invlists.data = data;
  };
  var readInvertedLists = (reader, index2) => {
    const invlists = {};
    invlists.h = reader.readH();
    checkInvH(invlists.h);
    invlists.nlist = reader.readUint64();
    invlists.codeSize = reader.readUint64();
    readArrayInvLists(reader, invlists);
    index2.invlists = invlists;
  };
  var readInvertedLists_default = readInvertedLists;

  // federjs/FederIndex/parser/faissParser/readDirectMap.ts
  var checkDmType = (dmType) => {
    if (dmType !== 0 /* NoMap */) {
      console.warn("[directmap_type] only support NoMap.");
    }
  };
  var checkDmSize = (dmSize) => {
    if (dmSize !== 0) {
      console.warn("[directmap_size] should be 0.");
    }
  };
  var readDirectMap = (reader, index2) => {
    const directMap = {};
    directMap.dmType = reader.readUint8();
    checkDmType(directMap.dmType);
    directMap.size = reader.readUint64();
    checkDmSize(directMap.size);
    index2.directMap = directMap;
  };
  var readDirectMap_default = readDirectMap;

  // federjs/FederIndex/parser/faissParser/readIndexHeader.ts
  var checkMetricType = (metricType) => {
    if (metricType !== 1 /* METRIC_L2 */ && metricType !== 0 /* METRIC_INNER_PRODUCT */) {
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
  var readIndexHeader = (reader, index2) => {
    index2.d = reader.readUint32();
    index2.ntotal = reader.readUint64();
    const dummy_1 = reader.readDummy();
    const dummy_2 = reader.readDummy();
    checkDummy(dummy_1, dummy_2);
    index2.isTrained = reader.readBool();
    checkIsTrained(index2.isTrained);
    index2.metricType = reader.readUint32();
    checkMetricType(index2.metricType);
  };
  var readIndexHeader_default = readIndexHeader;

  // federjs/FederIndex/parser/faissParser/index.ts
  var readIvfHeader = (reader, index2) => {
    readIndexHeader_default(reader, index2);
    index2.nlist = reader.readUint64();
    index2.nprobe = reader.readUint64();
    index2.childIndex = readIndex(reader);
    readDirectMap_default(reader, index2);
  };
  var readXbVectors = (reader, index2) => {
    index2.codeSize = reader.readUint64();
    index2.vectors = Array(index2.ntotal).fill(0).map((_) => reader.readFloat32Array(index2.d));
  };
  var readIndex = (reader) => {
    const index2 = {};
    index2.h = reader.readH();
    if (index2.h === "IwFl" /* ivfflat */) {
      index2.indexType = "ivfflat" /* ivfflat */;
      readIvfHeader(reader, index2);
      readInvertedLists_default(reader, index2);
    } else if (index2.h === "IxFI" /* flatIR */ || index2.h === "IxF2" /* flatL2 */) {
      index2.indexType = "flat" /* flat */;
      readIndexHeader_default(reader, index2);
      readXbVectors(reader, index2);
    } else {
      console.warn("[index type] not supported -", index2.h);
    }
    return index2;
  };
  var faissIndexParser = (arraybuffer) => {
    const faissFileReader = new FaissFileReader(arraybuffer);
    const index2 = readIndex(faissFileReader);
    return index2;
  };

  // federjs/FederIndex/parser/index.ts
  var parserMap = {
    ["hnswlib" /* hnswlib */]: hnswlibIndexParser,
    ["faiss" /* faiss */]: faissIndexParser
  };
  var Parser = class {
    constructor(indexType) {
      this.parse = parserMap[indexType];
    }
  };

  // federjs/Utils/distFunc.ts
  var getDisL2Square = (vec1, vec2) => {
    return vec1.map((num, i) => num - vec2[i]).map((num) => num * num).reduce((a2, c2) => a2 + c2, 0);
  };
  var getDisL2 = (vec1, vec2) => {
    return Math.sqrt(vec1.map((num, i) => num - vec2[i]).map((num) => num * num).reduce((a2, c2) => a2 + c2, 0));
  };
  var getDisIR = (vec1, vec2) => {
    return vec1.map((num, i) => num * vec2[i]).reduce((acc, cur) => acc + cur, 0);
  };
  var getDisFunc = (metricType) => {
    if (metricType === 1 /* METRIC_L2 */) {
      return getDisL2;
    } else if (metricType === 0 /* METRIC_INNER_PRODUCT */) {
      return getDisIR;
    }
    console.warn("[getDisFunc] wrong metric_type, use L2 (default).", metricType);
    return getDisL2;
  };

  // federjs/Utils/PriorityQueue.js
  var PriorityQueue = class {
    constructor(arr = [], key = null) {
      if (typeof key == "string") {
        this._key = (item) => item[key];
      } else
        this._key = key;
      this._tree = [];
      arr.forEach((d) => this.add(d));
    }
    add(item) {
      this._tree.push(item);
      let id2 = this._tree.length - 1;
      while (id2) {
        const fatherId = Math.floor((id2 - 1) / 2);
        if (this._getValue(id2) >= this._getValue(fatherId))
          break;
        else {
          this._swap(fatherId, id2);
          id2 = fatherId;
        }
      }
    }
    get top() {
      return this._tree[0];
    }
    pop() {
      if (this.isEmpty) {
        return "empty";
      }
      const item = this.top;
      if (this._tree.length > 1) {
        const lastItem = this._tree.pop();
        let id2 = 0;
        this._tree[id2] = lastItem;
        while (!this._isLeaf(id2)) {
          const curValue = this._getValue(id2);
          const leftId = id2 * 2 + 1;
          const leftValue = this._getValue(leftId);
          const rightId = leftId >= this._tree.length - 1 ? leftId : id2 * 2 + 2;
          const rightValue = this._getValue(rightId);
          const minValue = Math.min(leftValue, rightValue);
          if (curValue <= minValue)
            break;
          else {
            const minId = leftValue < rightValue ? leftId : rightId;
            this._swap(minId, id2);
            id2 = minId;
          }
        }
      } else {
        this._tree = [];
      }
      return item;
    }
    get isEmpty() {
      return this._tree.length === 0;
    }
    get size() {
      return this._tree.length;
    }
    get _firstLeaf() {
      return Math.floor(this._tree.length / 2);
    }
    _isLeaf(id2) {
      return id2 >= this._firstLeaf;
    }
    _getValue(id2) {
      if (this._key) {
        return this._key(this._tree[id2]);
      } else {
        return this._tree[id2];
      }
    }
    _swap(id0, id1) {
      const tree = this._tree;
      [tree[id0], tree[id1]] = [tree[id1], tree[id0]];
    }
  };
  var PriorityQueue_default = PriorityQueue;

  // federjs/FederIndex/searchHandler/hnswSearch/searchLevel0.ts
  var searchLevelO = ({
    ep_id,
    target,
    vectors,
    ef,
    isDeleted,
    hasDeleted,
    linkLists_level_0,
    disfunc,
    labels
  }) => {
    const top_candidates = new PriorityQueue_default([], (d) => d[0]);
    const candidates = new PriorityQueue_default([], (d) => d[0]);
    const vis_records_level_0 = [];
    const visited = /* @__PURE__ */ new Set();
    let lowerBound;
    if (!hasDeleted || !isDeleted[ep_id]) {
      const dist2 = disfunc(vectors[ep_id], target);
      lowerBound = dist2;
      top_candidates.add([-dist2, ep_id]);
      candidates.add([dist2, ep_id]);
    } else {
      lowerBound = 9999999;
      candidates.add([lowerBound, ep_id]);
    }
    visited.add(ep_id);
    vis_records_level_0.push([labels[ep_id], labels[ep_id], lowerBound]);
    while (!candidates.isEmpty) {
      const curNodePair = candidates.top;
      if (curNodePair[0] > lowerBound && (top_candidates.size === ef || !hasDeleted)) {
        break;
      }
      candidates.pop();
      const curNodeId = curNodePair[1];
      const curLinks = linkLists_level_0[curNodeId];
      curLinks.forEach((candidateId) => {
        if (!visited.has(candidateId)) {
          visited.add(candidateId);
          const dist2 = disfunc(vectors[candidateId], target);
          vis_records_level_0.push([
            labels[curNodeId],
            labels[candidateId],
            dist2
          ]);
          if (top_candidates.size < ef || lowerBound > dist2) {
            candidates.add([dist2, candidateId]);
            if (!hasDeleted || !isDeleted(candidateId)) {
              top_candidates.add([-dist2, candidateId]);
            }
            if (top_candidates.size > ef) {
              top_candidates.pop();
            }
            if (!top_candidates.isEmpty) {
              lowerBound = -top_candidates.top[0];
            }
          }
        } else {
          vis_records_level_0.push([labels[curNodeId], labels[candidateId], -1]);
        }
      });
    }
    return { top_candidates, vis_records_level_0 };
  };
  var searchLevel0_default = searchLevelO;

  // federjs/FederIndex/searchHandler/hnswSearch/index.ts
  var hnswlibHNSWSearch = ({
    index: index2,
    target,
    searchParams = {}
  }) => {
    const { ef = 10, k = 8, metricType = 1 /* METRIC_L2 */ } = searchParams;
    const disfunc = getDisFunc(metricType);
    let topkResults = [];
    const vis_records_all = [];
    const {
      enterPoint,
      vectors,
      maxLevel,
      linkLists_levels,
      linkLists_level_0,
      numDeleted,
      labels,
      isDeleted
    } = index2;
    let curNodeId = enterPoint;
    let curDist = disfunc(vectors[curNodeId], target);
    for (let level = maxLevel; level > 0; level--) {
      const vis_records = [];
      vis_records.push([labels[curNodeId], labels[curNodeId], curDist]);
      let changed = true;
      while (changed) {
        changed = false;
        const curlinks = linkLists_levels[curNodeId][level - 1];
        curlinks.forEach((candidateId) => {
          const dist2 = disfunc(vectors[candidateId], target);
          vis_records.push([labels[curNodeId], labels[candidateId], dist2]);
          if (dist2 < curDist) {
            curDist = dist2;
            curNodeId = candidateId;
            changed = true;
          }
        });
      }
      vis_records_all.push(vis_records);
    }
    const hasDeleted = numDeleted > 0;
    const { top_candidates, vis_records_level_0 } = searchLevel0_default({
      ep_id: curNodeId,
      target,
      vectors,
      ef: Math.max(ef, k),
      hasDeleted,
      isDeleted,
      linkLists_level_0,
      disfunc,
      labels
    });
    vis_records_all.push(vis_records_level_0);
    while (top_candidates.size > k) {
      top_candidates.pop();
    }
    while (top_candidates.size > 0) {
      const res = top_candidates.pop();
      topkResults.push({
        id: labels[res[1]],
        dis: -res[0]
      });
    }
    topkResults = topkResults.reverse();
    return {
      searchRecords: vis_records_all,
      topkResults,
      searchParams: { k, ef }
    };
  };

  // federjs/FederIndex/searchHandler/ivfflatSearch/faissFlatSearch.ts
  var faissFlatSearch = ({ index: index2, target }) => {
    const disFunc = getDisFunc(index2.metricType);
    const distances = index2.vectors.map((vec2, clusterId) => ({
      clusterId,
      distance: disFunc(vec2, target)
    }));
    distances.sort((a2, b) => a2.distance - b.distance);
    return distances;
  };
  var faissFlatSearch_default = faissFlatSearch;

  // federjs/FederIndex/searchHandler/ivfflatSearch/faissIVFSearch.ts
  var faissIVFSearch = ({ index: index2, csListIds, target }) => {
    const disFunc = getDisFunc(index2.metricType);
    const distances = index2.invlists.data.reduce((acc, cur, listId) => acc.concat(csListIds.includes(listId) ? cur.ids.map((id2, ofs) => ({
      id: id2,
      clusterId: listId,
      distance: disFunc(cur.vectors[ofs], target),
      vector: Array.from(cur.vectors[ofs])
    })) : []), []);
    distances.sort((a2, b) => a2.distance - b.distance);
    return distances;
  };
  var faissIVFSearch_default = faissIVFSearch;

  // federjs/FederIndex/searchHandler/ivfflatSearch/index.ts
  var faissIVFFlatSearch = ({
    index: index2,
    target,
    searchParams = {}
  }) => {
    const { nprobe = 8, k = 10 } = searchParams;
    const csAllListIdsAndDistances = faissFlatSearch_default({
      index: index2.childIndex,
      target
    });
    const csRes = csAllListIdsAndDistances.slice(0, Math.min(index2.nlist, nprobe));
    const csListIds = csRes.map((res2) => res2.clusterId);
    const fsAllIdsAndDistances = faissIVFSearch_default({
      index: index2,
      csListIds,
      target
    });
    const fsRes = fsAllIdsAndDistances.slice(0, Math.min(index2.ntotal, k));
    const coarseSearchRecords = csAllListIdsAndDistances;
    const fineSearchRecords = fsAllIdsAndDistances;
    const res = {
      coarseSearchRecords,
      fineSearchRecords,
      nprobeClusterIds: csListIds,
      topKVectorIds: fsRes.map((d) => d.id),
      searchParams: { nprobe, k }
    };
    return res;
  };

  // federjs/FederIndex/searchHandler/index.ts
  var searchFuncMap = {
    ["hnsw" /* hnsw */]: hnswlibHNSWSearch,
    ["ivfflat" /* ivfflat */]: faissIVFFlatSearch
  };
  var SearchHandler = class {
    constructor(indexType) {
      this.search = searchFuncMap[indexType];
    }
  };

  // federjs/FederIndex/metaHandler/ivfflatMeta/index.ts
  var getIvfflatIndexMeta = (index2) => {
    const indexMeta = {
      nlist: index2.nlist,
      ntotal: index2.ntotal,
      clusters: index2.invlists.data.map((d, clusterId) => ({
        clusterId,
        ids: d.ids,
        centroidVector: Array.from(index2.childIndex.vectors[clusterId])
      }))
    };
    return indexMeta;
  };
  var ivfflatMeta_default = getIvfflatIndexMeta;

  // federjs/FederIndex/metaHandler/hnswMeta/index.ts
  var getHnswIndexMeta = (index2, metaParams) => {
    const { numOverviewLevel = 10 } = metaParams;
    const nOverviewLevels = Math.min(numOverviewLevel, index2.maxLevel);
    const overviewGraphLayers = Array(nOverviewLevels).fill(0).map((_, i) => {
      const level = index2.maxLevel - i;
      const nodes = index2.linkLists_levels.map((linkLists, internalId) => linkLists.length >= level ? {
        id: index2.labels[internalId],
        links: linkLists[level - 1].map((iid) => index2.labels[iid])
      } : null).filter((a2) => a2);
      return { level, nodes };
    });
    const indexMeta = {
      efConstruction: index2.ef_construction,
      M: index2.M,
      ntotal: index2.ntotal,
      nlevels: index2.maxLevel + 1,
      nOverviewLevels,
      entryPointId: index2.enterPoint,
      overviewGraphLayers
    };
    return indexMeta;
  };
  var hnswMeta_default = getHnswIndexMeta;

  // federjs/FederIndex/metaHandler/index.ts
  var metaFuncMap = {
    ["hnsw" /* hnsw */]: hnswMeta_default,
    ["ivfflat" /* ivfflat */]: ivfflatMeta_default
  };
  var MetaHandler = class {
    constructor(indexType) {
      this.metaFunc = metaFuncMap[indexType];
    }
    getMeta(index2, metaParams = {}) {
      return this.metaFunc(index2, metaParams);
    }
  };

  // federjs/FederIndex/index.ts
  var FederIndex = class {
    constructor(sourceType) {
      this.parser = new Parser(sourceType);
    }
    initByArrayBuffer(arrayBuffer) {
      this.index = this.parser.parse(arrayBuffer);
      this.indexType = this.index.indexType;
      this.searchHandler = new SearchHandler(this.indexType);
      this.metaHandler = new MetaHandler(this.indexType);
    }
    getIndexType() {
      return __async(this, null, function* () {
        return this.indexType;
      });
    }
    getIndexMeta() {
      return __async(this, arguments, function* (metaParams = {}) {
        return this.metaHandler.getMeta(this.index, metaParams);
      });
    }
    getSearchRecords(_0) {
      return __async(this, arguments, function* (target, searchParams = {}) {
        return this.searchHandler.search({
          index: this.index,
          target,
          searchParams
        });
      });
    }
  };

  // federjs/FederLayout/visDataHandler/hnsw/search/utils.ts
  var connection = "---";
  var getLinkId = (sourceId, targetId) => `${sourceId}${connection}${targetId}`;
  var parseLinkId = (linkId) => linkId.split(connection).map((d) => +d);
  var getLinkIdWithLevel = (sourceId, targetId, level) => `link-${level}-${sourceId}-${targetId}`;
  var getNodeIdWithLevel = (nodeId, level) => `node-${level}-${nodeId}`;
  var getEntryLinkIdWithLevel = (nodeId, level) => `inter-level-${level}-${nodeId}`;
  var deDupLink = (links, source = "source", target = "target") => {
    const linkStringSet = /* @__PURE__ */ new Set();
    return links.filter((link) => {
      const linkString = `${link[source]}---${link[target]}`;
      const linkStringReverse = `${link[target]}---${link[source]}`;
      if (linkStringSet.has(linkString) || linkStringSet.has(linkStringReverse)) {
        return false;
      } else {
        linkStringSet.add(linkString);
        return true;
      }
    });
  };

  // federjs/FederLayout/visDataHandler/hnsw/search/parseVisRecords.ts
  var parseVisRecords = ({
    topkResults,
    searchRecords
  }) => {
    const visData = [];
    const numLevels = searchRecords.length;
    let fineIds = topkResults.map((d) => d.id);
    let entryId = -1;
    for (let i = numLevels - 1; i >= 0; i--) {
      const level = numLevels - 1 - i;
      if (level > 0) {
        fineIds = [entryId];
      }
      const visRecordsLevel = searchRecords[i];
      const id2nodeType = {};
      const linkId2linkType = {};
      const updateNodeType = (nodeId, type2) => {
        if (id2nodeType[nodeId]) {
          id2nodeType[nodeId] = Math.max(id2nodeType[nodeId], type2);
        } else {
          id2nodeType[nodeId] = type2;
        }
      };
      const updateLinkType = (sourceId, targetId, type2) => {
        const linkId = getLinkId(sourceId, targetId);
        if (linkId2linkType[linkId]) {
          linkId2linkType[linkId] = Math.max(linkId2linkType[linkId], type2);
        } else {
          linkId2linkType[linkId] = type2;
        }
      };
      const id2dist = {};
      const sourceMap = {};
      visRecordsLevel.forEach((record) => {
        const [sourceId, targetId, dist2] = record;
        if (sourceId === targetId) {
          entryId = targetId;
          id2dist[targetId] = dist2;
        } else {
          updateNodeType(sourceId, 2 /* Candidate */);
          updateNodeType(targetId, 1 /* Coarse */);
          if (id2dist[targetId] >= 0) {
            updateLinkType(sourceId, targetId, 1 /* Visited */);
          } else {
            id2dist[targetId] = dist2;
            updateLinkType(sourceId, targetId, 2 /* Extended */);
            sourceMap[targetId] = sourceId;
            if (level === 0) {
              const preSourceId = sourceMap[sourceId];
              if (preSourceId >= 0) {
                updateLinkType(preSourceId, sourceId, 3 /* Searched */);
              }
            }
          }
        }
      });
      fineIds.forEach((fineId) => {
        updateNodeType(fineId, 3 /* Fine */);
        let t = fineId;
        while (t in sourceMap) {
          let s = sourceMap[t];
          updateLinkType(s, t, 4 /* Fine */);
          t = s;
        }
      });
      const nodes = Object.keys(id2nodeType).map((id2) => ({
        id: `${id2}`,
        type: id2nodeType[id2],
        dist: id2dist[id2]
      }));
      const links = Object.keys(linkId2linkType).map((linkId) => {
        const [source, target] = parseLinkId(linkId);
        return {
          source: `${source}`,
          target: `${target}`,
          type: linkId2linkType[linkId]
        };
      });
      const visDataLevel = {
        entryIds: [`${entryId}`],
        fineIds: fineIds.map((id2) => `${id2}`),
        links,
        nodes
      };
      visData.push(visDataLevel);
    }
    return visData;
  };
  var parseVisRecords_default = parseVisRecords;

  // node_modules/d3-array/src/ascending.js
  function ascending(a2, b) {
    return a2 == null || b == null ? NaN : a2 < b ? -1 : a2 > b ? 1 : a2 >= b ? 0 : NaN;
  }

  // node_modules/d3-array/src/descending.js
  function descending(a2, b) {
    return a2 == null || b == null ? NaN : b < a2 ? -1 : b > a2 ? 1 : b >= a2 ? 0 : NaN;
  }

  // node_modules/d3-array/src/bisector.js
  function bisector(f) {
    let compare1, compare2, delta;
    if (f.length !== 2) {
      compare1 = ascending;
      compare2 = (d, x3) => ascending(f(d), x3);
      delta = (d, x3) => f(d) - x3;
    } else {
      compare1 = f === ascending || f === descending ? f : zero;
      compare2 = f;
      delta = f;
    }
    function left(a2, x3, lo = 0, hi = a2.length) {
      if (lo < hi) {
        if (compare1(x3, x3) !== 0)
          return hi;
        do {
          const mid = lo + hi >>> 1;
          if (compare2(a2[mid], x3) < 0)
            lo = mid + 1;
          else
            hi = mid;
        } while (lo < hi);
      }
      return lo;
    }
    function right(a2, x3, lo = 0, hi = a2.length) {
      if (lo < hi) {
        if (compare1(x3, x3) !== 0)
          return hi;
        do {
          const mid = lo + hi >>> 1;
          if (compare2(a2[mid], x3) <= 0)
            lo = mid + 1;
          else
            hi = mid;
        } while (lo < hi);
      }
      return lo;
    }
    function center(a2, x3, lo = 0, hi = a2.length) {
      const i = left(a2, x3, lo, hi - 1);
      return i > lo && delta(a2[i - 1], x3) > -delta(a2[i], x3) ? i - 1 : i;
    }
    return { left, center, right };
  }
  function zero() {
    return 0;
  }

  // node_modules/d3-array/src/number.js
  function number(x3) {
    return x3 === null ? NaN : +x3;
  }

  // node_modules/d3-array/src/bisect.js
  var ascendingBisect = bisector(ascending);
  var bisectRight = ascendingBisect.right;
  var bisectLeft = ascendingBisect.left;
  var bisectCenter = bisector(number).center;
  var bisect_default = bisectRight;

  // node_modules/d3-array/src/extent.js
  function extent(values, valueof) {
    let min2;
    let max2;
    if (valueof === void 0) {
      for (const value of values) {
        if (value != null) {
          if (min2 === void 0) {
            if (value >= value)
              min2 = max2 = value;
          } else {
            if (min2 > value)
              min2 = value;
            if (max2 < value)
              max2 = value;
          }
        }
      }
    } else {
      let index2 = -1;
      for (let value of values) {
        if ((value = valueof(value, ++index2, values)) != null) {
          if (min2 === void 0) {
            if (value >= value)
              min2 = max2 = value;
          } else {
            if (min2 > value)
              min2 = value;
            if (max2 < value)
              max2 = value;
          }
        }
      }
    }
    return [min2, max2];
  }

  // node_modules/d3-array/src/ticks.js
  var e10 = Math.sqrt(50);
  var e5 = Math.sqrt(10);
  var e2 = Math.sqrt(2);
  function ticks(start2, stop, count) {
    var reverse, i = -1, n, ticks2, step;
    stop = +stop, start2 = +start2, count = +count;
    if (start2 === stop && count > 0)
      return [start2];
    if (reverse = stop < start2)
      n = start2, start2 = stop, stop = n;
    if ((step = tickIncrement(start2, stop, count)) === 0 || !isFinite(step))
      return [];
    if (step > 0) {
      let r0 = Math.round(start2 / step), r1 = Math.round(stop / step);
      if (r0 * step < start2)
        ++r0;
      if (r1 * step > stop)
        --r1;
      ticks2 = new Array(n = r1 - r0 + 1);
      while (++i < n)
        ticks2[i] = (r0 + i) * step;
    } else {
      step = -step;
      let r0 = Math.round(start2 * step), r1 = Math.round(stop * step);
      if (r0 / step < start2)
        ++r0;
      if (r1 / step > stop)
        --r1;
      ticks2 = new Array(n = r1 - r0 + 1);
      while (++i < n)
        ticks2[i] = (r0 + i) / step;
    }
    if (reverse)
      ticks2.reverse();
    return ticks2;
  }
  function tickIncrement(start2, stop, count) {
    var step = (stop - start2) / Math.max(0, count), power = Math.floor(Math.log(step) / Math.LN10), error = step / Math.pow(10, power);
    return power >= 0 ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power) : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
  }
  function tickStep(start2, stop, count) {
    var step0 = Math.abs(stop - start2) / Math.max(0, count), step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)), error = step0 / step1;
    if (error >= e10)
      step1 *= 10;
    else if (error >= e5)
      step1 *= 5;
    else if (error >= e2)
      step1 *= 2;
    return stop < start2 ? -step1 : step1;
  }

  // node_modules/d3-array/src/minIndex.js
  function minIndex(values, valueof) {
    let min2;
    let minIndex2 = -1;
    let index2 = -1;
    if (valueof === void 0) {
      for (const value of values) {
        ++index2;
        if (value != null && (min2 > value || min2 === void 0 && value >= value)) {
          min2 = value, minIndex2 = index2;
        }
      }
    } else {
      for (let value of values) {
        if ((value = valueof(value, ++index2, values)) != null && (min2 > value || min2 === void 0 && value >= value)) {
          min2 = value, minIndex2 = index2;
        }
      }
    }
    return minIndex2;
  }

  // node_modules/d3-array/src/range.js
  function range(start2, stop, step) {
    start2 = +start2, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start2, start2 = 0, 1) : n < 3 ? 1 : +step;
    var i = -1, n = Math.max(0, Math.ceil((stop - start2) / step)) | 0, range2 = new Array(n);
    while (++i < n) {
      range2[i] = start2 + i * step;
    }
    return range2;
  }

  // node_modules/d3-dispatch/src/dispatch.js
  var noop = { value: () => {
  } };
  function dispatch() {
    for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
      if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t))
        throw new Error("illegal type: " + t);
      _[t] = [];
    }
    return new Dispatch(_);
  }
  function Dispatch(_) {
    this._ = _;
  }
  function parseTypenames(typenames, types) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
      var name = "", i = t.indexOf(".");
      if (i >= 0)
        name = t.slice(i + 1), t = t.slice(0, i);
      if (t && !types.hasOwnProperty(t))
        throw new Error("unknown type: " + t);
      return { type: t, name };
    });
  }
  Dispatch.prototype = dispatch.prototype = {
    constructor: Dispatch,
    on: function(typename, callback) {
      var _ = this._, T = parseTypenames(typename + "", _), t, i = -1, n = T.length;
      if (arguments.length < 2) {
        while (++i < n)
          if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name)))
            return t;
        return;
      }
      if (callback != null && typeof callback !== "function")
        throw new Error("invalid callback: " + callback);
      while (++i < n) {
        if (t = (typename = T[i]).type)
          _[t] = set(_[t], typename.name, callback);
        else if (callback == null)
          for (t in _)
            _[t] = set(_[t], typename.name, null);
      }
      return this;
    },
    copy: function() {
      var copy2 = {}, _ = this._;
      for (var t in _)
        copy2[t] = _[t].slice();
      return new Dispatch(copy2);
    },
    call: function(type2, that) {
      if ((n = arguments.length - 2) > 0)
        for (var args = new Array(n), i = 0, n, t; i < n; ++i)
          args[i] = arguments[i + 2];
      if (!this._.hasOwnProperty(type2))
        throw new Error("unknown type: " + type2);
      for (t = this._[type2], i = 0, n = t.length; i < n; ++i)
        t[i].value.apply(that, args);
    },
    apply: function(type2, that, args) {
      if (!this._.hasOwnProperty(type2))
        throw new Error("unknown type: " + type2);
      for (var t = this._[type2], i = 0, n = t.length; i < n; ++i)
        t[i].value.apply(that, args);
    }
  };
  function get(type2, name) {
    for (var i = 0, n = type2.length, c2; i < n; ++i) {
      if ((c2 = type2[i]).name === name) {
        return c2.value;
      }
    }
  }
  function set(type2, name, callback) {
    for (var i = 0, n = type2.length; i < n; ++i) {
      if (type2[i].name === name) {
        type2[i] = noop, type2 = type2.slice(0, i).concat(type2.slice(i + 1));
        break;
      }
    }
    if (callback != null)
      type2.push({ name, value: callback });
    return type2;
  }
  var dispatch_default = dispatch;

  // node_modules/d3-selection/src/namespaces.js
  var xhtml = "http://www.w3.org/1999/xhtml";
  var namespaces_default = {
    svg: "http://www.w3.org/2000/svg",
    xhtml,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };

  // node_modules/d3-selection/src/namespace.js
  function namespace_default(name) {
    var prefix = name += "", i = prefix.indexOf(":");
    if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns")
      name = name.slice(i + 1);
    return namespaces_default.hasOwnProperty(prefix) ? { space: namespaces_default[prefix], local: name } : name;
  }

  // node_modules/d3-selection/src/creator.js
  function creatorInherit(name) {
    return function() {
      var document2 = this.ownerDocument, uri = this.namespaceURI;
      return uri === xhtml && document2.documentElement.namespaceURI === xhtml ? document2.createElement(name) : document2.createElementNS(uri, name);
    };
  }
  function creatorFixed(fullname) {
    return function() {
      return this.ownerDocument.createElementNS(fullname.space, fullname.local);
    };
  }
  function creator_default(name) {
    var fullname = namespace_default(name);
    return (fullname.local ? creatorFixed : creatorInherit)(fullname);
  }

  // node_modules/d3-selection/src/selector.js
  function none() {
  }
  function selector_default(selector) {
    return selector == null ? none : function() {
      return this.querySelector(selector);
    };
  }

  // node_modules/d3-selection/src/selection/select.js
  function select_default(select) {
    if (typeof select !== "function")
      select = selector_default(select);
    for (var groups = this._groups, m2 = groups.length, subgroups = new Array(m2), j = 0; j < m2; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
          if ("__data__" in node)
            subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
        }
      }
    }
    return new Selection(subgroups, this._parents);
  }

  // node_modules/d3-selection/src/array.js
  function array(x3) {
    return x3 == null ? [] : Array.isArray(x3) ? x3 : Array.from(x3);
  }

  // node_modules/d3-selection/src/selectorAll.js
  function empty() {
    return [];
  }
  function selectorAll_default(selector) {
    return selector == null ? empty : function() {
      return this.querySelectorAll(selector);
    };
  }

  // node_modules/d3-selection/src/selection/selectAll.js
  function arrayAll(select) {
    return function() {
      return array(select.apply(this, arguments));
    };
  }
  function selectAll_default(select) {
    if (typeof select === "function")
      select = arrayAll(select);
    else
      select = selectorAll_default(select);
    for (var groups = this._groups, m2 = groups.length, subgroups = [], parents = [], j = 0; j < m2; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          subgroups.push(select.call(node, node.__data__, i, group));
          parents.push(node);
        }
      }
    }
    return new Selection(subgroups, parents);
  }

  // node_modules/d3-selection/src/matcher.js
  function matcher_default(selector) {
    return function() {
      return this.matches(selector);
    };
  }
  function childMatcher(selector) {
    return function(node) {
      return node.matches(selector);
    };
  }

  // node_modules/d3-selection/src/selection/selectChild.js
  var find = Array.prototype.find;
  function childFind(match) {
    return function() {
      return find.call(this.children, match);
    };
  }
  function childFirst() {
    return this.firstElementChild;
  }
  function selectChild_default(match) {
    return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
  }

  // node_modules/d3-selection/src/selection/selectChildren.js
  var filter = Array.prototype.filter;
  function children() {
    return Array.from(this.children);
  }
  function childrenFilter(match) {
    return function() {
      return filter.call(this.children, match);
    };
  }
  function selectChildren_default(match) {
    return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
  }

  // node_modules/d3-selection/src/selection/filter.js
  function filter_default(match) {
    if (typeof match !== "function")
      match = matcher_default(match);
    for (var groups = this._groups, m2 = groups.length, subgroups = new Array(m2), j = 0; j < m2; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
          subgroup.push(node);
        }
      }
    }
    return new Selection(subgroups, this._parents);
  }

  // node_modules/d3-selection/src/selection/sparse.js
  function sparse_default(update) {
    return new Array(update.length);
  }

  // node_modules/d3-selection/src/selection/enter.js
  function enter_default() {
    return new Selection(this._enter || this._groups.map(sparse_default), this._parents);
  }
  function EnterNode(parent, datum2) {
    this.ownerDocument = parent.ownerDocument;
    this.namespaceURI = parent.namespaceURI;
    this._next = null;
    this._parent = parent;
    this.__data__ = datum2;
  }
  EnterNode.prototype = {
    constructor: EnterNode,
    appendChild: function(child) {
      return this._parent.insertBefore(child, this._next);
    },
    insertBefore: function(child, next) {
      return this._parent.insertBefore(child, next);
    },
    querySelector: function(selector) {
      return this._parent.querySelector(selector);
    },
    querySelectorAll: function(selector) {
      return this._parent.querySelectorAll(selector);
    }
  };

  // node_modules/d3-selection/src/constant.js
  function constant_default(x3) {
    return function() {
      return x3;
    };
  }

  // node_modules/d3-selection/src/selection/data.js
  function bindIndex(parent, group, enter, update, exit, data) {
    var i = 0, node, groupLength = group.length, dataLength = data.length;
    for (; i < dataLength; ++i) {
      if (node = group[i]) {
        node.__data__ = data[i];
        update[i] = node;
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }
    for (; i < groupLength; ++i) {
      if (node = group[i]) {
        exit[i] = node;
      }
    }
  }
  function bindKey(parent, group, enter, update, exit, data, key) {
    var i, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
    for (i = 0; i < groupLength; ++i) {
      if (node = group[i]) {
        keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
        if (nodeByKeyValue.has(keyValue)) {
          exit[i] = node;
        } else {
          nodeByKeyValue.set(keyValue, node);
        }
      }
    }
    for (i = 0; i < dataLength; ++i) {
      keyValue = key.call(parent, data[i], i, data) + "";
      if (node = nodeByKeyValue.get(keyValue)) {
        update[i] = node;
        node.__data__ = data[i];
        nodeByKeyValue.delete(keyValue);
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }
    for (i = 0; i < groupLength; ++i) {
      if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
        exit[i] = node;
      }
    }
  }
  function datum(node) {
    return node.__data__;
  }
  function data_default(value, key) {
    if (!arguments.length)
      return Array.from(this, datum);
    var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
    if (typeof value !== "function")
      value = constant_default(value);
    for (var m2 = groups.length, update = new Array(m2), enter = new Array(m2), exit = new Array(m2), j = 0; j < m2; ++j) {
      var parent = parents[j], group = groups[j], groupLength = group.length, data = arraylike(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
      bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);
      for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
        if (previous = enterGroup[i0]) {
          if (i0 >= i1)
            i1 = i0 + 1;
          while (!(next = updateGroup[i1]) && ++i1 < dataLength)
            ;
          previous._next = next || null;
        }
      }
    }
    update = new Selection(update, parents);
    update._enter = enter;
    update._exit = exit;
    return update;
  }
  function arraylike(data) {
    return typeof data === "object" && "length" in data ? data : Array.from(data);
  }

  // node_modules/d3-selection/src/selection/exit.js
  function exit_default() {
    return new Selection(this._exit || this._groups.map(sparse_default), this._parents);
  }

  // node_modules/d3-selection/src/selection/join.js
  function join_default(onenter, onupdate, onexit) {
    var enter = this.enter(), update = this, exit = this.exit();
    if (typeof onenter === "function") {
      enter = onenter(enter);
      if (enter)
        enter = enter.selection();
    } else {
      enter = enter.append(onenter + "");
    }
    if (onupdate != null) {
      update = onupdate(update);
      if (update)
        update = update.selection();
    }
    if (onexit == null)
      exit.remove();
    else
      onexit(exit);
    return enter && update ? enter.merge(update).order() : update;
  }

  // node_modules/d3-selection/src/selection/merge.js
  function merge_default(context) {
    var selection2 = context.selection ? context.selection() : context;
    for (var groups0 = this._groups, groups1 = selection2._groups, m0 = groups0.length, m1 = groups1.length, m2 = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m2; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group0[i] || group1[i]) {
          merge[i] = node;
        }
      }
    }
    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }
    return new Selection(merges, this._parents);
  }

  // node_modules/d3-selection/src/selection/order.js
  function order_default() {
    for (var groups = this._groups, j = -1, m2 = groups.length; ++j < m2; ) {
      for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0; ) {
        if (node = group[i]) {
          if (next && node.compareDocumentPosition(next) ^ 4)
            next.parentNode.insertBefore(node, next);
          next = node;
        }
      }
    }
    return this;
  }

  // node_modules/d3-selection/src/selection/sort.js
  function sort_default(compare) {
    if (!compare)
      compare = ascending2;
    function compareNode(a2, b) {
      return a2 && b ? compare(a2.__data__, b.__data__) : !a2 - !b;
    }
    for (var groups = this._groups, m2 = groups.length, sortgroups = new Array(m2), j = 0; j < m2; ++j) {
      for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          sortgroup[i] = node;
        }
      }
      sortgroup.sort(compareNode);
    }
    return new Selection(sortgroups, this._parents).order();
  }
  function ascending2(a2, b) {
    return a2 < b ? -1 : a2 > b ? 1 : a2 >= b ? 0 : NaN;
  }

  // node_modules/d3-selection/src/selection/call.js
  function call_default() {
    var callback = arguments[0];
    arguments[0] = this;
    callback.apply(null, arguments);
    return this;
  }

  // node_modules/d3-selection/src/selection/nodes.js
  function nodes_default() {
    return Array.from(this);
  }

  // node_modules/d3-selection/src/selection/node.js
  function node_default() {
    for (var groups = this._groups, j = 0, m2 = groups.length; j < m2; ++j) {
      for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
        var node = group[i];
        if (node)
          return node;
      }
    }
    return null;
  }

  // node_modules/d3-selection/src/selection/size.js
  function size_default() {
    let size = 0;
    for (const node of this)
      ++size;
    return size;
  }

  // node_modules/d3-selection/src/selection/empty.js
  function empty_default() {
    return !this.node();
  }

  // node_modules/d3-selection/src/selection/each.js
  function each_default(callback) {
    for (var groups = this._groups, j = 0, m2 = groups.length; j < m2; ++j) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
        if (node = group[i])
          callback.call(node, node.__data__, i, group);
      }
    }
    return this;
  }

  // node_modules/d3-selection/src/selection/attr.js
  function attrRemove(name) {
    return function() {
      this.removeAttribute(name);
    };
  }
  function attrRemoveNS(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }
  function attrConstant(name, value) {
    return function() {
      this.setAttribute(name, value);
    };
  }
  function attrConstantNS(fullname, value) {
    return function() {
      this.setAttributeNS(fullname.space, fullname.local, value);
    };
  }
  function attrFunction(name, value) {
    return function() {
      var v2 = value.apply(this, arguments);
      if (v2 == null)
        this.removeAttribute(name);
      else
        this.setAttribute(name, v2);
    };
  }
  function attrFunctionNS(fullname, value) {
    return function() {
      var v2 = value.apply(this, arguments);
      if (v2 == null)
        this.removeAttributeNS(fullname.space, fullname.local);
      else
        this.setAttributeNS(fullname.space, fullname.local, v2);
    };
  }
  function attr_default(name, value) {
    var fullname = namespace_default(name);
    if (arguments.length < 2) {
      var node = this.node();
      return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
    }
    return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
  }

  // node_modules/d3-selection/src/window.js
  function window_default(node) {
    return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
  }

  // node_modules/d3-selection/src/selection/style.js
  function styleRemove(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }
  function styleConstant(name, value, priority) {
    return function() {
      this.style.setProperty(name, value, priority);
    };
  }
  function styleFunction(name, value, priority) {
    return function() {
      var v2 = value.apply(this, arguments);
      if (v2 == null)
        this.style.removeProperty(name);
      else
        this.style.setProperty(name, v2, priority);
    };
  }
  function style_default(name, value, priority) {
    return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
  }
  function styleValue(node, name) {
    return node.style.getPropertyValue(name) || window_default(node).getComputedStyle(node, null).getPropertyValue(name);
  }

  // node_modules/d3-selection/src/selection/property.js
  function propertyRemove(name) {
    return function() {
      delete this[name];
    };
  }
  function propertyConstant(name, value) {
    return function() {
      this[name] = value;
    };
  }
  function propertyFunction(name, value) {
    return function() {
      var v2 = value.apply(this, arguments);
      if (v2 == null)
        delete this[name];
      else
        this[name] = v2;
    };
  }
  function property_default(name, value) {
    return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
  }

  // node_modules/d3-selection/src/selection/classed.js
  function classArray(string) {
    return string.trim().split(/^|\s+/);
  }
  function classList(node) {
    return node.classList || new ClassList(node);
  }
  function ClassList(node) {
    this._node = node;
    this._names = classArray(node.getAttribute("class") || "");
  }
  ClassList.prototype = {
    add: function(name) {
      var i = this._names.indexOf(name);
      if (i < 0) {
        this._names.push(name);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    remove: function(name) {
      var i = this._names.indexOf(name);
      if (i >= 0) {
        this._names.splice(i, 1);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    contains: function(name) {
      return this._names.indexOf(name) >= 0;
    }
  };
  function classedAdd(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while (++i < n)
      list.add(names[i]);
  }
  function classedRemove(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while (++i < n)
      list.remove(names[i]);
  }
  function classedTrue(names) {
    return function() {
      classedAdd(this, names);
    };
  }
  function classedFalse(names) {
    return function() {
      classedRemove(this, names);
    };
  }
  function classedFunction(names, value) {
    return function() {
      (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
    };
  }
  function classed_default(name, value) {
    var names = classArray(name + "");
    if (arguments.length < 2) {
      var list = classList(this.node()), i = -1, n = names.length;
      while (++i < n)
        if (!list.contains(names[i]))
          return false;
      return true;
    }
    return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
  }

  // node_modules/d3-selection/src/selection/text.js
  function textRemove() {
    this.textContent = "";
  }
  function textConstant(value) {
    return function() {
      this.textContent = value;
    };
  }
  function textFunction(value) {
    return function() {
      var v2 = value.apply(this, arguments);
      this.textContent = v2 == null ? "" : v2;
    };
  }
  function text_default(value) {
    return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
  }

  // node_modules/d3-selection/src/selection/html.js
  function htmlRemove() {
    this.innerHTML = "";
  }
  function htmlConstant(value) {
    return function() {
      this.innerHTML = value;
    };
  }
  function htmlFunction(value) {
    return function() {
      var v2 = value.apply(this, arguments);
      this.innerHTML = v2 == null ? "" : v2;
    };
  }
  function html_default(value) {
    return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
  }

  // node_modules/d3-selection/src/selection/raise.js
  function raise() {
    if (this.nextSibling)
      this.parentNode.appendChild(this);
  }
  function raise_default() {
    return this.each(raise);
  }

  // node_modules/d3-selection/src/selection/lower.js
  function lower() {
    if (this.previousSibling)
      this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }
  function lower_default() {
    return this.each(lower);
  }

  // node_modules/d3-selection/src/selection/append.js
  function append_default(name) {
    var create2 = typeof name === "function" ? name : creator_default(name);
    return this.select(function() {
      return this.appendChild(create2.apply(this, arguments));
    });
  }

  // node_modules/d3-selection/src/selection/insert.js
  function constantNull() {
    return null;
  }
  function insert_default(name, before) {
    var create2 = typeof name === "function" ? name : creator_default(name), select = before == null ? constantNull : typeof before === "function" ? before : selector_default(before);
    return this.select(function() {
      return this.insertBefore(create2.apply(this, arguments), select.apply(this, arguments) || null);
    });
  }

  // node_modules/d3-selection/src/selection/remove.js
  function remove() {
    var parent = this.parentNode;
    if (parent)
      parent.removeChild(this);
  }
  function remove_default() {
    return this.each(remove);
  }

  // node_modules/d3-selection/src/selection/clone.js
  function selection_cloneShallow() {
    var clone = this.cloneNode(false), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }
  function selection_cloneDeep() {
    var clone = this.cloneNode(true), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }
  function clone_default(deep) {
    return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
  }

  // node_modules/d3-selection/src/selection/datum.js
  function datum_default(value) {
    return arguments.length ? this.property("__data__", value) : this.node().__data__;
  }

  // node_modules/d3-selection/src/selection/on.js
  function contextListener(listener) {
    return function(event) {
      listener.call(this, event, this.__data__);
    };
  }
  function parseTypenames2(typenames) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
      var name = "", i = t.indexOf(".");
      if (i >= 0)
        name = t.slice(i + 1), t = t.slice(0, i);
      return { type: t, name };
    });
  }
  function onRemove(typename) {
    return function() {
      var on = this.__on;
      if (!on)
        return;
      for (var j = 0, i = -1, m2 = on.length, o; j < m2; ++j) {
        if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
        } else {
          on[++i] = o;
        }
      }
      if (++i)
        on.length = i;
      else
        delete this.__on;
    };
  }
  function onAdd(typename, value, options) {
    return function() {
      var on = this.__on, o, listener = contextListener(value);
      if (on)
        for (var j = 0, m2 = on.length; j < m2; ++j) {
          if ((o = on[j]).type === typename.type && o.name === typename.name) {
            this.removeEventListener(o.type, o.listener, o.options);
            this.addEventListener(o.type, o.listener = listener, o.options = options);
            o.value = value;
            return;
          }
        }
      this.addEventListener(typename.type, listener, options);
      o = { type: typename.type, name: typename.name, value, listener, options };
      if (!on)
        this.__on = [o];
      else
        on.push(o);
    };
  }
  function on_default(typename, value, options) {
    var typenames = parseTypenames2(typename + ""), i, n = typenames.length, t;
    if (arguments.length < 2) {
      var on = this.node().__on;
      if (on)
        for (var j = 0, m2 = on.length, o; j < m2; ++j) {
          for (i = 0, o = on[j]; i < n; ++i) {
            if ((t = typenames[i]).type === o.type && t.name === o.name) {
              return o.value;
            }
          }
        }
      return;
    }
    on = value ? onAdd : onRemove;
    for (i = 0; i < n; ++i)
      this.each(on(typenames[i], value, options));
    return this;
  }

  // node_modules/d3-selection/src/selection/dispatch.js
  function dispatchEvent(node, type2, params) {
    var window2 = window_default(node), event = window2.CustomEvent;
    if (typeof event === "function") {
      event = new event(type2, params);
    } else {
      event = window2.document.createEvent("Event");
      if (params)
        event.initEvent(type2, params.bubbles, params.cancelable), event.detail = params.detail;
      else
        event.initEvent(type2, false, false);
    }
    node.dispatchEvent(event);
  }
  function dispatchConstant(type2, params) {
    return function() {
      return dispatchEvent(this, type2, params);
    };
  }
  function dispatchFunction(type2, params) {
    return function() {
      return dispatchEvent(this, type2, params.apply(this, arguments));
    };
  }
  function dispatch_default2(type2, params) {
    return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type2, params));
  }

  // node_modules/d3-selection/src/selection/iterator.js
  function* iterator_default() {
    for (var groups = this._groups, j = 0, m2 = groups.length; j < m2; ++j) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
        if (node = group[i])
          yield node;
      }
    }
  }

  // node_modules/d3-selection/src/selection/index.js
  var root = [null];
  function Selection(groups, parents) {
    this._groups = groups;
    this._parents = parents;
  }
  function selection() {
    return new Selection([[document.documentElement]], root);
  }
  function selection_selection() {
    return this;
  }
  Selection.prototype = selection.prototype = {
    constructor: Selection,
    select: select_default,
    selectAll: selectAll_default,
    selectChild: selectChild_default,
    selectChildren: selectChildren_default,
    filter: filter_default,
    data: data_default,
    enter: enter_default,
    exit: exit_default,
    join: join_default,
    merge: merge_default,
    selection: selection_selection,
    order: order_default,
    sort: sort_default,
    call: call_default,
    nodes: nodes_default,
    node: node_default,
    size: size_default,
    empty: empty_default,
    each: each_default,
    attr: attr_default,
    style: style_default,
    property: property_default,
    classed: classed_default,
    text: text_default,
    html: html_default,
    raise: raise_default,
    lower: lower_default,
    append: append_default,
    insert: insert_default,
    remove: remove_default,
    clone: clone_default,
    datum: datum_default,
    on: on_default,
    dispatch: dispatch_default2,
    [Symbol.iterator]: iterator_default
  };
  var selection_default = selection;

  // node_modules/d3-selection/src/select.js
  function select_default2(selector) {
    return typeof selector === "string" ? new Selection([[document.querySelector(selector)]], [document.documentElement]) : new Selection([[selector]], root);
  }

  // node_modules/d3-selection/src/create.js
  function create_default(name) {
    return select_default2(creator_default(name).call(document.documentElement));
  }

  // node_modules/d3-color/src/define.js
  function define_default(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
  }
  function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for (var key in definition)
      prototype[key] = definition[key];
    return prototype;
  }

  // node_modules/d3-color/src/color.js
  function Color() {
  }
  var darker = 0.7;
  var brighter = 1 / darker;
  var reI = "\\s*([+-]?\\d+)\\s*";
  var reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
  var reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
  var reHex = /^#([0-9a-f]{3,8})$/;
  var reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`);
  var reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`);
  var reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`);
  var reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`);
  var reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`);
  var reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
  var named = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  };
  define_default(Color, color, {
    copy(channels) {
      return Object.assign(new this.constructor(), this, channels);
    },
    displayable() {
      return this.rgb().displayable();
    },
    hex: color_formatHex,
    formatHex: color_formatHex,
    formatHex8: color_formatHex8,
    formatHsl: color_formatHsl,
    formatRgb: color_formatRgb,
    toString: color_formatRgb
  });
  function color_formatHex() {
    return this.rgb().formatHex();
  }
  function color_formatHex8() {
    return this.rgb().formatHex8();
  }
  function color_formatHsl() {
    return hslConvert(this).formatHsl();
  }
  function color_formatRgb() {
    return this.rgb().formatRgb();
  }
  function color(format2) {
    var m2, l;
    format2 = (format2 + "").trim().toLowerCase();
    return (m2 = reHex.exec(format2)) ? (l = m2[1].length, m2 = parseInt(m2[1], 16), l === 6 ? rgbn(m2) : l === 3 ? new Rgb(m2 >> 8 & 15 | m2 >> 4 & 240, m2 >> 4 & 15 | m2 & 240, (m2 & 15) << 4 | m2 & 15, 1) : l === 8 ? rgba(m2 >> 24 & 255, m2 >> 16 & 255, m2 >> 8 & 255, (m2 & 255) / 255) : l === 4 ? rgba(m2 >> 12 & 15 | m2 >> 8 & 240, m2 >> 8 & 15 | m2 >> 4 & 240, m2 >> 4 & 15 | m2 & 240, ((m2 & 15) << 4 | m2 & 15) / 255) : null) : (m2 = reRgbInteger.exec(format2)) ? new Rgb(m2[1], m2[2], m2[3], 1) : (m2 = reRgbPercent.exec(format2)) ? new Rgb(m2[1] * 255 / 100, m2[2] * 255 / 100, m2[3] * 255 / 100, 1) : (m2 = reRgbaInteger.exec(format2)) ? rgba(m2[1], m2[2], m2[3], m2[4]) : (m2 = reRgbaPercent.exec(format2)) ? rgba(m2[1] * 255 / 100, m2[2] * 255 / 100, m2[3] * 255 / 100, m2[4]) : (m2 = reHslPercent.exec(format2)) ? hsla(m2[1], m2[2] / 100, m2[3] / 100, 1) : (m2 = reHslaPercent.exec(format2)) ? hsla(m2[1], m2[2] / 100, m2[3] / 100, m2[4]) : named.hasOwnProperty(format2) ? rgbn(named[format2]) : format2 === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
  }
  function rgbn(n) {
    return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
  }
  function rgba(r, g, b, a2) {
    if (a2 <= 0)
      r = g = b = NaN;
    return new Rgb(r, g, b, a2);
  }
  function rgbConvert(o) {
    if (!(o instanceof Color))
      o = color(o);
    if (!o)
      return new Rgb();
    o = o.rgb();
    return new Rgb(o.r, o.g, o.b, o.opacity);
  }
  function rgb(r, g, b, opacity) {
    return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
  }
  function Rgb(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
  }
  define_default(Rgb, rgb, extend(Color, {
    brighter(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb() {
      return this;
    },
    clamp() {
      return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
    },
    displayable() {
      return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
    },
    hex: rgb_formatHex,
    formatHex: rgb_formatHex,
    formatHex8: rgb_formatHex8,
    formatRgb: rgb_formatRgb,
    toString: rgb_formatRgb
  }));
  function rgb_formatHex() {
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
  }
  function rgb_formatHex8() {
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
  }
  function rgb_formatRgb() {
    const a2 = clampa(this.opacity);
    return `${a2 === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a2 === 1 ? ")" : `, ${a2})`}`;
  }
  function clampa(opacity) {
    return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
  }
  function clampi(value) {
    return Math.max(0, Math.min(255, Math.round(value) || 0));
  }
  function hex(value) {
    value = clampi(value);
    return (value < 16 ? "0" : "") + value.toString(16);
  }
  function hsla(h, s, l, a2) {
    if (a2 <= 0)
      h = s = l = NaN;
    else if (l <= 0 || l >= 1)
      h = s = NaN;
    else if (s <= 0)
      h = NaN;
    return new Hsl(h, s, l, a2);
  }
  function hslConvert(o) {
    if (o instanceof Hsl)
      return new Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color))
      o = color(o);
    if (!o)
      return new Hsl();
    if (o instanceof Hsl)
      return o;
    o = o.rgb();
    var r = o.r / 255, g = o.g / 255, b = o.b / 255, min2 = Math.min(r, g, b), max2 = Math.max(r, g, b), h = NaN, s = max2 - min2, l = (max2 + min2) / 2;
    if (s) {
      if (r === max2)
        h = (g - b) / s + (g < b) * 6;
      else if (g === max2)
        h = (b - r) / s + 2;
      else
        h = (r - g) / s + 4;
      s /= l < 0.5 ? max2 + min2 : 2 - max2 - min2;
      h *= 60;
    } else {
      s = l > 0 && l < 1 ? 0 : h;
    }
    return new Hsl(h, s, l, o.opacity);
  }
  function hsl(h, s, l, opacity) {
    return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
  }
  function Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }
  define_default(Hsl, hsl, extend(Color, {
    brighter(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb() {
      var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
      return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
    },
    clamp() {
      return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
    },
    displayable() {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
    },
    formatHsl() {
      const a2 = clampa(this.opacity);
      return `${a2 === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a2 === 1 ? ")" : `, ${a2})`}`;
    }
  }));
  function clamph(value) {
    value = (value || 0) % 360;
    return value < 0 ? value + 360 : value;
  }
  function clampt(value) {
    return Math.max(0, Math.min(1, value || 0));
  }
  function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
  }

  // node_modules/d3-interpolate/src/basis.js
  function basis(t1, v0, v1, v2, v3) {
    var t2 = t1 * t1, t3 = t2 * t1;
    return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
  }
  function basis_default(values) {
    var n = values.length - 1;
    return function(t) {
      var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
      return basis((t - i / n) * n, v0, v1, v2, v3);
    };
  }

  // node_modules/d3-interpolate/src/basisClosed.js
  function basisClosed_default(values) {
    var n = values.length;
    return function(t) {
      var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
      return basis((t - i / n) * n, v0, v1, v2, v3);
    };
  }

  // node_modules/d3-interpolate/src/constant.js
  var constant_default2 = (x3) => () => x3;

  // node_modules/d3-interpolate/src/color.js
  function linear(a2, d) {
    return function(t) {
      return a2 + t * d;
    };
  }
  function exponential(a2, b, y3) {
    return a2 = Math.pow(a2, y3), b = Math.pow(b, y3) - a2, y3 = 1 / y3, function(t) {
      return Math.pow(a2 + t * b, y3);
    };
  }
  function gamma(y3) {
    return (y3 = +y3) === 1 ? nogamma : function(a2, b) {
      return b - a2 ? exponential(a2, b, y3) : constant_default2(isNaN(a2) ? b : a2);
    };
  }
  function nogamma(a2, b) {
    var d = b - a2;
    return d ? linear(a2, d) : constant_default2(isNaN(a2) ? b : a2);
  }

  // node_modules/d3-interpolate/src/rgb.js
  var rgb_default = function rgbGamma(y3) {
    var color2 = gamma(y3);
    function rgb2(start2, end) {
      var r = color2((start2 = rgb(start2)).r, (end = rgb(end)).r), g = color2(start2.g, end.g), b = color2(start2.b, end.b), opacity = nogamma(start2.opacity, end.opacity);
      return function(t) {
        start2.r = r(t);
        start2.g = g(t);
        start2.b = b(t);
        start2.opacity = opacity(t);
        return start2 + "";
      };
    }
    rgb2.gamma = rgbGamma;
    return rgb2;
  }(1);
  function rgbSpline(spline) {
    return function(colors) {
      var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color2;
      for (i = 0; i < n; ++i) {
        color2 = rgb(colors[i]);
        r[i] = color2.r || 0;
        g[i] = color2.g || 0;
        b[i] = color2.b || 0;
      }
      r = spline(r);
      g = spline(g);
      b = spline(b);
      color2.opacity = 1;
      return function(t) {
        color2.r = r(t);
        color2.g = g(t);
        color2.b = b(t);
        return color2 + "";
      };
    };
  }
  var rgbBasis = rgbSpline(basis_default);
  var rgbBasisClosed = rgbSpline(basisClosed_default);

  // node_modules/d3-interpolate/src/numberArray.js
  function numberArray_default(a2, b) {
    if (!b)
      b = [];
    var n = a2 ? Math.min(b.length, a2.length) : 0, c2 = b.slice(), i;
    return function(t) {
      for (i = 0; i < n; ++i)
        c2[i] = a2[i] * (1 - t) + b[i] * t;
      return c2;
    };
  }
  function isNumberArray(x3) {
    return ArrayBuffer.isView(x3) && !(x3 instanceof DataView);
  }

  // node_modules/d3-interpolate/src/array.js
  function genericArray(a2, b) {
    var nb = b ? b.length : 0, na = a2 ? Math.min(nb, a2.length) : 0, x3 = new Array(na), c2 = new Array(nb), i;
    for (i = 0; i < na; ++i)
      x3[i] = value_default(a2[i], b[i]);
    for (; i < nb; ++i)
      c2[i] = b[i];
    return function(t) {
      for (i = 0; i < na; ++i)
        c2[i] = x3[i](t);
      return c2;
    };
  }

  // node_modules/d3-interpolate/src/date.js
  function date_default(a2, b) {
    var d = new Date();
    return a2 = +a2, b = +b, function(t) {
      return d.setTime(a2 * (1 - t) + b * t), d;
    };
  }

  // node_modules/d3-interpolate/src/number.js
  function number_default(a2, b) {
    return a2 = +a2, b = +b, function(t) {
      return a2 * (1 - t) + b * t;
    };
  }

  // node_modules/d3-interpolate/src/object.js
  function object_default(a2, b) {
    var i = {}, c2 = {}, k;
    if (a2 === null || typeof a2 !== "object")
      a2 = {};
    if (b === null || typeof b !== "object")
      b = {};
    for (k in b) {
      if (k in a2) {
        i[k] = value_default(a2[k], b[k]);
      } else {
        c2[k] = b[k];
      }
    }
    return function(t) {
      for (k in i)
        c2[k] = i[k](t);
      return c2;
    };
  }

  // node_modules/d3-interpolate/src/string.js
  var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
  var reB = new RegExp(reA.source, "g");
  function zero2(b) {
    return function() {
      return b;
    };
  }
  function one(b) {
    return function(t) {
      return b(t) + "";
    };
  }
  function string_default(a2, b) {
    var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
    a2 = a2 + "", b = b + "";
    while ((am = reA.exec(a2)) && (bm = reB.exec(b))) {
      if ((bs = bm.index) > bi) {
        bs = b.slice(bi, bs);
        if (s[i])
          s[i] += bs;
        else
          s[++i] = bs;
      }
      if ((am = am[0]) === (bm = bm[0])) {
        if (s[i])
          s[i] += bm;
        else
          s[++i] = bm;
      } else {
        s[++i] = null;
        q.push({ i, x: number_default(am, bm) });
      }
      bi = reB.lastIndex;
    }
    if (bi < b.length) {
      bs = b.slice(bi);
      if (s[i])
        s[i] += bs;
      else
        s[++i] = bs;
    }
    return s.length < 2 ? q[0] ? one(q[0].x) : zero2(b) : (b = q.length, function(t) {
      for (var i2 = 0, o; i2 < b; ++i2)
        s[(o = q[i2]).i] = o.x(t);
      return s.join("");
    });
  }

  // node_modules/d3-interpolate/src/value.js
  function value_default(a2, b) {
    var t = typeof b, c2;
    return b == null || t === "boolean" ? constant_default2(b) : (t === "number" ? number_default : t === "string" ? (c2 = color(b)) ? (b = c2, rgb_default) : string_default : b instanceof color ? rgb_default : b instanceof Date ? date_default : isNumberArray(b) ? numberArray_default : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object_default : number_default)(a2, b);
  }

  // node_modules/d3-interpolate/src/round.js
  function round_default(a2, b) {
    return a2 = +a2, b = +b, function(t) {
      return Math.round(a2 * (1 - t) + b * t);
    };
  }

  // node_modules/d3-interpolate/src/transform/decompose.js
  var degrees = 180 / Math.PI;
  var identity = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1
  };
  function decompose_default(a2, b, c2, d, e, f) {
    var scaleX, scaleY, skewX;
    if (scaleX = Math.sqrt(a2 * a2 + b * b))
      a2 /= scaleX, b /= scaleX;
    if (skewX = a2 * c2 + b * d)
      c2 -= a2 * skewX, d -= b * skewX;
    if (scaleY = Math.sqrt(c2 * c2 + d * d))
      c2 /= scaleY, d /= scaleY, skewX /= scaleY;
    if (a2 * d < b * c2)
      a2 = -a2, b = -b, skewX = -skewX, scaleX = -scaleX;
    return {
      translateX: e,
      translateY: f,
      rotate: Math.atan2(b, a2) * degrees,
      skewX: Math.atan(skewX) * degrees,
      scaleX,
      scaleY
    };
  }

  // node_modules/d3-interpolate/src/transform/parse.js
  var svgNode;
  function parseCss(value) {
    const m2 = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
    return m2.isIdentity ? identity : decompose_default(m2.a, m2.b, m2.c, m2.d, m2.e, m2.f);
  }
  function parseSvg(value) {
    if (value == null)
      return identity;
    if (!svgNode)
      svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svgNode.setAttribute("transform", value);
    if (!(value = svgNode.transform.baseVal.consolidate()))
      return identity;
    value = value.matrix;
    return decompose_default(value.a, value.b, value.c, value.d, value.e, value.f);
  }

  // node_modules/d3-interpolate/src/transform/index.js
  function interpolateTransform(parse, pxComma, pxParen, degParen) {
    function pop(s) {
      return s.length ? s.pop() + " " : "";
    }
    function translate(xa, ya, xb, yb, s, q) {
      if (xa !== xb || ya !== yb) {
        var i = s.push("translate(", null, pxComma, null, pxParen);
        q.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
      } else if (xb || yb) {
        s.push("translate(" + xb + pxComma + yb + pxParen);
      }
    }
    function rotate(a2, b, s, q) {
      if (a2 !== b) {
        if (a2 - b > 180)
          b += 360;
        else if (b - a2 > 180)
          a2 += 360;
        q.push({ i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number_default(a2, b) });
      } else if (b) {
        s.push(pop(s) + "rotate(" + b + degParen);
      }
    }
    function skewX(a2, b, s, q) {
      if (a2 !== b) {
        q.push({ i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number_default(a2, b) });
      } else if (b) {
        s.push(pop(s) + "skewX(" + b + degParen);
      }
    }
    function scale2(xa, ya, xb, yb, s, q) {
      if (xa !== xb || ya !== yb) {
        var i = s.push(pop(s) + "scale(", null, ",", null, ")");
        q.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
      } else if (xb !== 1 || yb !== 1) {
        s.push(pop(s) + "scale(" + xb + "," + yb + ")");
      }
    }
    return function(a2, b) {
      var s = [], q = [];
      a2 = parse(a2), b = parse(b);
      translate(a2.translateX, a2.translateY, b.translateX, b.translateY, s, q);
      rotate(a2.rotate, b.rotate, s, q);
      skewX(a2.skewX, b.skewX, s, q);
      scale2(a2.scaleX, a2.scaleY, b.scaleX, b.scaleY, s, q);
      a2 = b = null;
      return function(t) {
        var i = -1, n = q.length, o;
        while (++i < n)
          s[(o = q[i]).i] = o.x(t);
        return s.join("");
      };
    };
  }
  var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
  var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

  // node_modules/d3-timer/src/timer.js
  var frame = 0;
  var timeout = 0;
  var interval = 0;
  var pokeDelay = 1e3;
  var taskHead;
  var taskTail;
  var clockLast = 0;
  var clockNow = 0;
  var clockSkew = 0;
  var clock = typeof performance === "object" && performance.now ? performance : Date;
  var setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
    setTimeout(f, 17);
  };
  function now() {
    return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
  }
  function clearNow() {
    clockNow = 0;
  }
  function Timer() {
    this._call = this._time = this._next = null;
  }
  Timer.prototype = timer.prototype = {
    constructor: Timer,
    restart: function(callback, delay, time) {
      if (typeof callback !== "function")
        throw new TypeError("callback is not a function");
      time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
      if (!this._next && taskTail !== this) {
        if (taskTail)
          taskTail._next = this;
        else
          taskHead = this;
        taskTail = this;
      }
      this._call = callback;
      this._time = time;
      sleep();
    },
    stop: function() {
      if (this._call) {
        this._call = null;
        this._time = Infinity;
        sleep();
      }
    }
  };
  function timer(callback, delay, time) {
    var t = new Timer();
    t.restart(callback, delay, time);
    return t;
  }
  function timerFlush() {
    now();
    ++frame;
    var t = taskHead, e;
    while (t) {
      if ((e = clockNow - t._time) >= 0)
        t._call.call(void 0, e);
      t = t._next;
    }
    --frame;
  }
  function wake() {
    clockNow = (clockLast = clock.now()) + clockSkew;
    frame = timeout = 0;
    try {
      timerFlush();
    } finally {
      frame = 0;
      nap();
      clockNow = 0;
    }
  }
  function poke() {
    var now2 = clock.now(), delay = now2 - clockLast;
    if (delay > pokeDelay)
      clockSkew -= delay, clockLast = now2;
  }
  function nap() {
    var t0, t1 = taskHead, t2, time = Infinity;
    while (t1) {
      if (t1._call) {
        if (time > t1._time)
          time = t1._time;
        t0 = t1, t1 = t1._next;
      } else {
        t2 = t1._next, t1._next = null;
        t1 = t0 ? t0._next = t2 : taskHead = t2;
      }
    }
    taskTail = t0;
    sleep(time);
  }
  function sleep(time) {
    if (frame)
      return;
    if (timeout)
      timeout = clearTimeout(timeout);
    var delay = time - clockNow;
    if (delay > 24) {
      if (time < Infinity)
        timeout = setTimeout(wake, time - clock.now() - clockSkew);
      if (interval)
        interval = clearInterval(interval);
    } else {
      if (!interval)
        clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
      frame = 1, setFrame(wake);
    }
  }

  // node_modules/d3-timer/src/timeout.js
  function timeout_default(callback, delay, time) {
    var t = new Timer();
    delay = delay == null ? 0 : +delay;
    t.restart((elapsed) => {
      t.stop();
      callback(elapsed + delay);
    }, delay, time);
    return t;
  }

  // node_modules/d3-transition/src/transition/schedule.js
  var emptyOn = dispatch_default("start", "end", "cancel", "interrupt");
  var emptyTween = [];
  var CREATED = 0;
  var SCHEDULED = 1;
  var STARTING = 2;
  var STARTED = 3;
  var RUNNING = 4;
  var ENDING = 5;
  var ENDED = 6;
  function schedule_default(node, name, id2, index2, group, timing) {
    var schedules = node.__transition;
    if (!schedules)
      node.__transition = {};
    else if (id2 in schedules)
      return;
    create(node, id2, {
      name,
      index: index2,
      group,
      on: emptyOn,
      tween: emptyTween,
      time: timing.time,
      delay: timing.delay,
      duration: timing.duration,
      ease: timing.ease,
      timer: null,
      state: CREATED
    });
  }
  function init(node, id2) {
    var schedule = get2(node, id2);
    if (schedule.state > CREATED)
      throw new Error("too late; already scheduled");
    return schedule;
  }
  function set2(node, id2) {
    var schedule = get2(node, id2);
    if (schedule.state > STARTED)
      throw new Error("too late; already running");
    return schedule;
  }
  function get2(node, id2) {
    var schedule = node.__transition;
    if (!schedule || !(schedule = schedule[id2]))
      throw new Error("transition not found");
    return schedule;
  }
  function create(node, id2, self) {
    var schedules = node.__transition, tween;
    schedules[id2] = self;
    self.timer = timer(schedule, 0, self.time);
    function schedule(elapsed) {
      self.state = SCHEDULED;
      self.timer.restart(start2, self.delay, self.time);
      if (self.delay <= elapsed)
        start2(elapsed - self.delay);
    }
    function start2(elapsed) {
      var i, j, n, o;
      if (self.state !== SCHEDULED)
        return stop();
      for (i in schedules) {
        o = schedules[i];
        if (o.name !== self.name)
          continue;
        if (o.state === STARTED)
          return timeout_default(start2);
        if (o.state === RUNNING) {
          o.state = ENDED;
          o.timer.stop();
          o.on.call("interrupt", node, node.__data__, o.index, o.group);
          delete schedules[i];
        } else if (+i < id2) {
          o.state = ENDED;
          o.timer.stop();
          o.on.call("cancel", node, node.__data__, o.index, o.group);
          delete schedules[i];
        }
      }
      timeout_default(function() {
        if (self.state === STARTED) {
          self.state = RUNNING;
          self.timer.restart(tick, self.delay, self.time);
          tick(elapsed);
        }
      });
      self.state = STARTING;
      self.on.call("start", node, node.__data__, self.index, self.group);
      if (self.state !== STARTING)
        return;
      self.state = STARTED;
      tween = new Array(n = self.tween.length);
      for (i = 0, j = -1; i < n; ++i) {
        if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
          tween[++j] = o;
        }
      }
      tween.length = j + 1;
    }
    function tick(elapsed) {
      var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1), i = -1, n = tween.length;
      while (++i < n) {
        tween[i].call(node, t);
      }
      if (self.state === ENDING) {
        self.on.call("end", node, node.__data__, self.index, self.group);
        stop();
      }
    }
    function stop() {
      self.state = ENDED;
      self.timer.stop();
      delete schedules[id2];
      for (var i in schedules)
        return;
      delete node.__transition;
    }
  }

  // node_modules/d3-transition/src/interrupt.js
  function interrupt_default(node, name) {
    var schedules = node.__transition, schedule, active, empty2 = true, i;
    if (!schedules)
      return;
    name = name == null ? null : name + "";
    for (i in schedules) {
      if ((schedule = schedules[i]).name !== name) {
        empty2 = false;
        continue;
      }
      active = schedule.state > STARTING && schedule.state < ENDING;
      schedule.state = ENDED;
      schedule.timer.stop();
      schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
      delete schedules[i];
    }
    if (empty2)
      delete node.__transition;
  }

  // node_modules/d3-transition/src/selection/interrupt.js
  function interrupt_default2(name) {
    return this.each(function() {
      interrupt_default(this, name);
    });
  }

  // node_modules/d3-transition/src/transition/tween.js
  function tweenRemove(id2, name) {
    var tween0, tween1;
    return function() {
      var schedule = set2(this, id2), tween = schedule.tween;
      if (tween !== tween0) {
        tween1 = tween0 = tween;
        for (var i = 0, n = tween1.length; i < n; ++i) {
          if (tween1[i].name === name) {
            tween1 = tween1.slice();
            tween1.splice(i, 1);
            break;
          }
        }
      }
      schedule.tween = tween1;
    };
  }
  function tweenFunction(id2, name, value) {
    var tween0, tween1;
    if (typeof value !== "function")
      throw new Error();
    return function() {
      var schedule = set2(this, id2), tween = schedule.tween;
      if (tween !== tween0) {
        tween1 = (tween0 = tween).slice();
        for (var t = { name, value }, i = 0, n = tween1.length; i < n; ++i) {
          if (tween1[i].name === name) {
            tween1[i] = t;
            break;
          }
        }
        if (i === n)
          tween1.push(t);
      }
      schedule.tween = tween1;
    };
  }
  function tween_default(name, value) {
    var id2 = this._id;
    name += "";
    if (arguments.length < 2) {
      var tween = get2(this.node(), id2).tween;
      for (var i = 0, n = tween.length, t; i < n; ++i) {
        if ((t = tween[i]).name === name) {
          return t.value;
        }
      }
      return null;
    }
    return this.each((value == null ? tweenRemove : tweenFunction)(id2, name, value));
  }
  function tweenValue(transition2, name, value) {
    var id2 = transition2._id;
    transition2.each(function() {
      var schedule = set2(this, id2);
      (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
    });
    return function(node) {
      return get2(node, id2).value[name];
    };
  }

  // node_modules/d3-transition/src/transition/interpolate.js
  function interpolate_default(a2, b) {
    var c2;
    return (typeof b === "number" ? number_default : b instanceof color ? rgb_default : (c2 = color(b)) ? (b = c2, rgb_default) : string_default)(a2, b);
  }

  // node_modules/d3-transition/src/transition/attr.js
  function attrRemove2(name) {
    return function() {
      this.removeAttribute(name);
    };
  }
  function attrRemoveNS2(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }
  function attrConstant2(name, interpolate, value1) {
    var string00, string1 = value1 + "", interpolate0;
    return function() {
      var string0 = this.getAttribute(name);
      return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
    };
  }
  function attrConstantNS2(fullname, interpolate, value1) {
    var string00, string1 = value1 + "", interpolate0;
    return function() {
      var string0 = this.getAttributeNS(fullname.space, fullname.local);
      return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
    };
  }
  function attrFunction2(name, interpolate, value) {
    var string00, string10, interpolate0;
    return function() {
      var string0, value1 = value(this), string1;
      if (value1 == null)
        return void this.removeAttribute(name);
      string0 = this.getAttribute(name);
      string1 = value1 + "";
      return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }
  function attrFunctionNS2(fullname, interpolate, value) {
    var string00, string10, interpolate0;
    return function() {
      var string0, value1 = value(this), string1;
      if (value1 == null)
        return void this.removeAttributeNS(fullname.space, fullname.local);
      string0 = this.getAttributeNS(fullname.space, fullname.local);
      string1 = value1 + "";
      return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }
  function attr_default2(name, value) {
    var fullname = namespace_default(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate_default;
    return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS2 : attrFunction2)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS2 : attrRemove2)(fullname) : (fullname.local ? attrConstantNS2 : attrConstant2)(fullname, i, value));
  }

  // node_modules/d3-transition/src/transition/attrTween.js
  function attrInterpolate(name, i) {
    return function(t) {
      this.setAttribute(name, i.call(this, t));
    };
  }
  function attrInterpolateNS(fullname, i) {
    return function(t) {
      this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
    };
  }
  function attrTweenNS(fullname, value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0)
        t0 = (i0 = i) && attrInterpolateNS(fullname, i);
      return t0;
    }
    tween._value = value;
    return tween;
  }
  function attrTween(name, value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0)
        t0 = (i0 = i) && attrInterpolate(name, i);
      return t0;
    }
    tween._value = value;
    return tween;
  }
  function attrTween_default(name, value) {
    var key = "attr." + name;
    if (arguments.length < 2)
      return (key = this.tween(key)) && key._value;
    if (value == null)
      return this.tween(key, null);
    if (typeof value !== "function")
      throw new Error();
    var fullname = namespace_default(name);
    return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
  }

  // node_modules/d3-transition/src/transition/delay.js
  function delayFunction(id2, value) {
    return function() {
      init(this, id2).delay = +value.apply(this, arguments);
    };
  }
  function delayConstant(id2, value) {
    return value = +value, function() {
      init(this, id2).delay = value;
    };
  }
  function delay_default(value) {
    var id2 = this._id;
    return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id2, value)) : get2(this.node(), id2).delay;
  }

  // node_modules/d3-transition/src/transition/duration.js
  function durationFunction(id2, value) {
    return function() {
      set2(this, id2).duration = +value.apply(this, arguments);
    };
  }
  function durationConstant(id2, value) {
    return value = +value, function() {
      set2(this, id2).duration = value;
    };
  }
  function duration_default(value) {
    var id2 = this._id;
    return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id2, value)) : get2(this.node(), id2).duration;
  }

  // node_modules/d3-transition/src/transition/ease.js
  function easeConstant(id2, value) {
    if (typeof value !== "function")
      throw new Error();
    return function() {
      set2(this, id2).ease = value;
    };
  }
  function ease_default(value) {
    var id2 = this._id;
    return arguments.length ? this.each(easeConstant(id2, value)) : get2(this.node(), id2).ease;
  }

  // node_modules/d3-transition/src/transition/easeVarying.js
  function easeVarying(id2, value) {
    return function() {
      var v2 = value.apply(this, arguments);
      if (typeof v2 !== "function")
        throw new Error();
      set2(this, id2).ease = v2;
    };
  }
  function easeVarying_default(value) {
    if (typeof value !== "function")
      throw new Error();
    return this.each(easeVarying(this._id, value));
  }

  // node_modules/d3-transition/src/transition/filter.js
  function filter_default2(match) {
    if (typeof match !== "function")
      match = matcher_default(match);
    for (var groups = this._groups, m2 = groups.length, subgroups = new Array(m2), j = 0; j < m2; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
          subgroup.push(node);
        }
      }
    }
    return new Transition(subgroups, this._parents, this._name, this._id);
  }

  // node_modules/d3-transition/src/transition/merge.js
  function merge_default2(transition2) {
    if (transition2._id !== this._id)
      throw new Error();
    for (var groups0 = this._groups, groups1 = transition2._groups, m0 = groups0.length, m1 = groups1.length, m2 = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m2; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group0[i] || group1[i]) {
          merge[i] = node;
        }
      }
    }
    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }
    return new Transition(merges, this._parents, this._name, this._id);
  }

  // node_modules/d3-transition/src/transition/on.js
  function start(name) {
    return (name + "").trim().split(/^|\s+/).every(function(t) {
      var i = t.indexOf(".");
      if (i >= 0)
        t = t.slice(0, i);
      return !t || t === "start";
    });
  }
  function onFunction(id2, name, listener) {
    var on0, on1, sit = start(name) ? init : set2;
    return function() {
      var schedule = sit(this, id2), on = schedule.on;
      if (on !== on0)
        (on1 = (on0 = on).copy()).on(name, listener);
      schedule.on = on1;
    };
  }
  function on_default2(name, listener) {
    var id2 = this._id;
    return arguments.length < 2 ? get2(this.node(), id2).on.on(name) : this.each(onFunction(id2, name, listener));
  }

  // node_modules/d3-transition/src/transition/remove.js
  function removeFunction(id2) {
    return function() {
      var parent = this.parentNode;
      for (var i in this.__transition)
        if (+i !== id2)
          return;
      if (parent)
        parent.removeChild(this);
    };
  }
  function remove_default2() {
    return this.on("end.remove", removeFunction(this._id));
  }

  // node_modules/d3-transition/src/transition/select.js
  function select_default3(select) {
    var name = this._name, id2 = this._id;
    if (typeof select !== "function")
      select = selector_default(select);
    for (var groups = this._groups, m2 = groups.length, subgroups = new Array(m2), j = 0; j < m2; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
          if ("__data__" in node)
            subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
          schedule_default(subgroup[i], name, id2, i, subgroup, get2(node, id2));
        }
      }
    }
    return new Transition(subgroups, this._parents, name, id2);
  }

  // node_modules/d3-transition/src/transition/selectAll.js
  function selectAll_default2(select) {
    var name = this._name, id2 = this._id;
    if (typeof select !== "function")
      select = selectorAll_default(select);
    for (var groups = this._groups, m2 = groups.length, subgroups = [], parents = [], j = 0; j < m2; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          for (var children2 = select.call(node, node.__data__, i, group), child, inherit2 = get2(node, id2), k = 0, l = children2.length; k < l; ++k) {
            if (child = children2[k]) {
              schedule_default(child, name, id2, k, children2, inherit2);
            }
          }
          subgroups.push(children2);
          parents.push(node);
        }
      }
    }
    return new Transition(subgroups, parents, name, id2);
  }

  // node_modules/d3-transition/src/transition/selection.js
  var Selection2 = selection_default.prototype.constructor;
  function selection_default2() {
    return new Selection2(this._groups, this._parents);
  }

  // node_modules/d3-transition/src/transition/style.js
  function styleNull(name, interpolate) {
    var string00, string10, interpolate0;
    return function() {
      var string0 = styleValue(this, name), string1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
    };
  }
  function styleRemove2(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }
  function styleConstant2(name, interpolate, value1) {
    var string00, string1 = value1 + "", interpolate0;
    return function() {
      var string0 = styleValue(this, name);
      return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
    };
  }
  function styleFunction2(name, interpolate, value) {
    var string00, string10, interpolate0;
    return function() {
      var string0 = styleValue(this, name), value1 = value(this), string1 = value1 + "";
      if (value1 == null)
        string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }
  function styleMaybeRemove(id2, name) {
    var on0, on1, listener0, key = "style." + name, event = "end." + key, remove2;
    return function() {
      var schedule = set2(this, id2), on = schedule.on, listener = schedule.value[key] == null ? remove2 || (remove2 = styleRemove2(name)) : void 0;
      if (on !== on0 || listener0 !== listener)
        (on1 = (on0 = on).copy()).on(event, listener0 = listener);
      schedule.on = on1;
    };
  }
  function style_default2(name, value, priority) {
    var i = (name += "") === "transform" ? interpolateTransformCss : interpolate_default;
    return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove2(name)) : typeof value === "function" ? this.styleTween(name, styleFunction2(name, i, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant2(name, i, value), priority).on("end.style." + name, null);
  }

  // node_modules/d3-transition/src/transition/styleTween.js
  function styleInterpolate(name, i, priority) {
    return function(t) {
      this.style.setProperty(name, i.call(this, t), priority);
    };
  }
  function styleTween(name, value, priority) {
    var t, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0)
        t = (i0 = i) && styleInterpolate(name, i, priority);
      return t;
    }
    tween._value = value;
    return tween;
  }
  function styleTween_default(name, value, priority) {
    var key = "style." + (name += "");
    if (arguments.length < 2)
      return (key = this.tween(key)) && key._value;
    if (value == null)
      return this.tween(key, null);
    if (typeof value !== "function")
      throw new Error();
    return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
  }

  // node_modules/d3-transition/src/transition/text.js
  function textConstant2(value) {
    return function() {
      this.textContent = value;
    };
  }
  function textFunction2(value) {
    return function() {
      var value1 = value(this);
      this.textContent = value1 == null ? "" : value1;
    };
  }
  function text_default2(value) {
    return this.tween("text", typeof value === "function" ? textFunction2(tweenValue(this, "text", value)) : textConstant2(value == null ? "" : value + ""));
  }

  // node_modules/d3-transition/src/transition/textTween.js
  function textInterpolate(i) {
    return function(t) {
      this.textContent = i.call(this, t);
    };
  }
  function textTween(value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0)
        t0 = (i0 = i) && textInterpolate(i);
      return t0;
    }
    tween._value = value;
    return tween;
  }
  function textTween_default(value) {
    var key = "text";
    if (arguments.length < 1)
      return (key = this.tween(key)) && key._value;
    if (value == null)
      return this.tween(key, null);
    if (typeof value !== "function")
      throw new Error();
    return this.tween(key, textTween(value));
  }

  // node_modules/d3-transition/src/transition/transition.js
  function transition_default() {
    var name = this._name, id0 = this._id, id1 = newId();
    for (var groups = this._groups, m2 = groups.length, j = 0; j < m2; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          var inherit2 = get2(node, id0);
          schedule_default(node, name, id1, i, group, {
            time: inherit2.time + inherit2.delay + inherit2.duration,
            delay: 0,
            duration: inherit2.duration,
            ease: inherit2.ease
          });
        }
      }
    }
    return new Transition(groups, this._parents, name, id1);
  }

  // node_modules/d3-transition/src/transition/end.js
  function end_default() {
    var on0, on1, that = this, id2 = that._id, size = that.size();
    return new Promise(function(resolve, reject) {
      var cancel = { value: reject }, end = { value: function() {
        if (--size === 0)
          resolve();
      } };
      that.each(function() {
        var schedule = set2(this, id2), on = schedule.on;
        if (on !== on0) {
          on1 = (on0 = on).copy();
          on1._.cancel.push(cancel);
          on1._.interrupt.push(cancel);
          on1._.end.push(end);
        }
        schedule.on = on1;
      });
      if (size === 0)
        resolve();
    });
  }

  // node_modules/d3-transition/src/transition/index.js
  var id = 0;
  function Transition(groups, parents, name, id2) {
    this._groups = groups;
    this._parents = parents;
    this._name = name;
    this._id = id2;
  }
  function transition(name) {
    return selection_default().transition(name);
  }
  function newId() {
    return ++id;
  }
  var selection_prototype = selection_default.prototype;
  Transition.prototype = transition.prototype = {
    constructor: Transition,
    select: select_default3,
    selectAll: selectAll_default2,
    selectChild: selection_prototype.selectChild,
    selectChildren: selection_prototype.selectChildren,
    filter: filter_default2,
    merge: merge_default2,
    selection: selection_default2,
    transition: transition_default,
    call: selection_prototype.call,
    nodes: selection_prototype.nodes,
    node: selection_prototype.node,
    size: selection_prototype.size,
    empty: selection_prototype.empty,
    each: selection_prototype.each,
    on: on_default2,
    attr: attr_default2,
    attrTween: attrTween_default,
    style: style_default2,
    styleTween: styleTween_default,
    text: text_default2,
    textTween: textTween_default,
    remove: remove_default2,
    tween: tween_default,
    delay: delay_default,
    duration: duration_default,
    ease: ease_default,
    easeVarying: easeVarying_default,
    end: end_default,
    [Symbol.iterator]: selection_prototype[Symbol.iterator]
  };

  // node_modules/d3-ease/src/cubic.js
  function cubicInOut(t) {
    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
  }

  // node_modules/d3-transition/src/selection/transition.js
  var defaultTiming = {
    time: null,
    delay: 0,
    duration: 250,
    ease: cubicInOut
  };
  function inherit(node, id2) {
    var timing;
    while (!(timing = node.__transition) || !(timing = timing[id2])) {
      if (!(node = node.parentNode)) {
        throw new Error(`transition ${id2} not found`);
      }
    }
    return timing;
  }
  function transition_default2(name) {
    var id2, timing;
    if (name instanceof Transition) {
      id2 = name._id, name = name._name;
    } else {
      id2 = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
    }
    for (var groups = this._groups, m2 = groups.length, j = 0; j < m2; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          schedule_default(node, name, id2, i, group, timing || inherit(node, id2));
        }
      }
    }
    return new Transition(groups, this._parents, name, id2);
  }

  // node_modules/d3-transition/src/selection/index.js
  selection_default.prototype.interrupt = interrupt_default2;
  selection_default.prototype.transition = transition_default2;

  // node_modules/d3-brush/src/brush.js
  var { abs, max, min } = Math;
  function number1(e) {
    return [+e[0], +e[1]];
  }
  function number2(e) {
    return [number1(e[0]), number1(e[1])];
  }
  var X = {
    name: "x",
    handles: ["w", "e"].map(type),
    input: function(x3, e) {
      return x3 == null ? null : [[+x3[0], e[0][1]], [+x3[1], e[1][1]]];
    },
    output: function(xy) {
      return xy && [xy[0][0], xy[1][0]];
    }
  };
  var Y = {
    name: "y",
    handles: ["n", "s"].map(type),
    input: function(y3, e) {
      return y3 == null ? null : [[e[0][0], +y3[0]], [e[1][0], +y3[1]]];
    },
    output: function(xy) {
      return xy && [xy[0][1], xy[1][1]];
    }
  };
  var XY = {
    name: "xy",
    handles: ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(type),
    input: function(xy) {
      return xy == null ? null : number2(xy);
    },
    output: function(xy) {
      return xy;
    }
  };
  function type(t) {
    return { type: t };
  }

  // node_modules/robust-predicates/esm/util.js
  var epsilon = 11102230246251565e-32;
  var splitter = 134217729;
  var resulterrbound = (3 + 8 * epsilon) * epsilon;
  function sum(elen, e, flen, f, h) {
    let Q, Qnew, hh, bvirt;
    let enow = e[0];
    let fnow = f[0];
    let eindex = 0;
    let findex = 0;
    if (fnow > enow === fnow > -enow) {
      Q = enow;
      enow = e[++eindex];
    } else {
      Q = fnow;
      fnow = f[++findex];
    }
    let hindex = 0;
    if (eindex < elen && findex < flen) {
      if (fnow > enow === fnow > -enow) {
        Qnew = enow + Q;
        hh = Q - (Qnew - enow);
        enow = e[++eindex];
      } else {
        Qnew = fnow + Q;
        hh = Q - (Qnew - fnow);
        fnow = f[++findex];
      }
      Q = Qnew;
      if (hh !== 0) {
        h[hindex++] = hh;
      }
      while (eindex < elen && findex < flen) {
        if (fnow > enow === fnow > -enow) {
          Qnew = Q + enow;
          bvirt = Qnew - Q;
          hh = Q - (Qnew - bvirt) + (enow - bvirt);
          enow = e[++eindex];
        } else {
          Qnew = Q + fnow;
          bvirt = Qnew - Q;
          hh = Q - (Qnew - bvirt) + (fnow - bvirt);
          fnow = f[++findex];
        }
        Q = Qnew;
        if (hh !== 0) {
          h[hindex++] = hh;
        }
      }
    }
    while (eindex < elen) {
      Qnew = Q + enow;
      bvirt = Qnew - Q;
      hh = Q - (Qnew - bvirt) + (enow - bvirt);
      enow = e[++eindex];
      Q = Qnew;
      if (hh !== 0) {
        h[hindex++] = hh;
      }
    }
    while (findex < flen) {
      Qnew = Q + fnow;
      bvirt = Qnew - Q;
      hh = Q - (Qnew - bvirt) + (fnow - bvirt);
      fnow = f[++findex];
      Q = Qnew;
      if (hh !== 0) {
        h[hindex++] = hh;
      }
    }
    if (Q !== 0 || hindex === 0) {
      h[hindex++] = Q;
    }
    return hindex;
  }
  function estimate(elen, e) {
    let Q = e[0];
    for (let i = 1; i < elen; i++)
      Q += e[i];
    return Q;
  }
  function vec(n) {
    return new Float64Array(n);
  }

  // node_modules/robust-predicates/esm/orient2d.js
  var ccwerrboundA = (3 + 16 * epsilon) * epsilon;
  var ccwerrboundB = (2 + 12 * epsilon) * epsilon;
  var ccwerrboundC = (9 + 64 * epsilon) * epsilon * epsilon;
  var B = vec(4);
  var C1 = vec(8);
  var C2 = vec(12);
  var D = vec(16);
  var u = vec(4);
  function orient2dadapt(ax, ay, bx, by, cx, cy, detsum) {
    let acxtail, acytail, bcxtail, bcytail;
    let bvirt, c2, ahi, alo, bhi, blo, _i, _j, _0, s1, s0, t1, t0, u32;
    const acx = ax - cx;
    const bcx = bx - cx;
    const acy = ay - cy;
    const bcy = by - cy;
    s1 = acx * bcy;
    c2 = splitter * acx;
    ahi = c2 - (c2 - acx);
    alo = acx - ahi;
    c2 = splitter * bcy;
    bhi = c2 - (c2 - bcy);
    blo = bcy - bhi;
    s0 = alo * blo - (s1 - ahi * bhi - alo * bhi - ahi * blo);
    t1 = acy * bcx;
    c2 = splitter * acy;
    ahi = c2 - (c2 - acy);
    alo = acy - ahi;
    c2 = splitter * bcx;
    bhi = c2 - (c2 - bcx);
    blo = bcx - bhi;
    t0 = alo * blo - (t1 - ahi * bhi - alo * bhi - ahi * blo);
    _i = s0 - t0;
    bvirt = s0 - _i;
    B[0] = s0 - (_i + bvirt) + (bvirt - t0);
    _j = s1 + _i;
    bvirt = _j - s1;
    _0 = s1 - (_j - bvirt) + (_i - bvirt);
    _i = _0 - t1;
    bvirt = _0 - _i;
    B[1] = _0 - (_i + bvirt) + (bvirt - t1);
    u32 = _j + _i;
    bvirt = u32 - _j;
    B[2] = _j - (u32 - bvirt) + (_i - bvirt);
    B[3] = u32;
    let det = estimate(4, B);
    let errbound = ccwerrboundB * detsum;
    if (det >= errbound || -det >= errbound) {
      return det;
    }
    bvirt = ax - acx;
    acxtail = ax - (acx + bvirt) + (bvirt - cx);
    bvirt = bx - bcx;
    bcxtail = bx - (bcx + bvirt) + (bvirt - cx);
    bvirt = ay - acy;
    acytail = ay - (acy + bvirt) + (bvirt - cy);
    bvirt = by - bcy;
    bcytail = by - (bcy + bvirt) + (bvirt - cy);
    if (acxtail === 0 && acytail === 0 && bcxtail === 0 && bcytail === 0) {
      return det;
    }
    errbound = ccwerrboundC * detsum + resulterrbound * Math.abs(det);
    det += acx * bcytail + bcy * acxtail - (acy * bcxtail + bcx * acytail);
    if (det >= errbound || -det >= errbound)
      return det;
    s1 = acxtail * bcy;
    c2 = splitter * acxtail;
    ahi = c2 - (c2 - acxtail);
    alo = acxtail - ahi;
    c2 = splitter * bcy;
    bhi = c2 - (c2 - bcy);
    blo = bcy - bhi;
    s0 = alo * blo - (s1 - ahi * bhi - alo * bhi - ahi * blo);
    t1 = acytail * bcx;
    c2 = splitter * acytail;
    ahi = c2 - (c2 - acytail);
    alo = acytail - ahi;
    c2 = splitter * bcx;
    bhi = c2 - (c2 - bcx);
    blo = bcx - bhi;
    t0 = alo * blo - (t1 - ahi * bhi - alo * bhi - ahi * blo);
    _i = s0 - t0;
    bvirt = s0 - _i;
    u[0] = s0 - (_i + bvirt) + (bvirt - t0);
    _j = s1 + _i;
    bvirt = _j - s1;
    _0 = s1 - (_j - bvirt) + (_i - bvirt);
    _i = _0 - t1;
    bvirt = _0 - _i;
    u[1] = _0 - (_i + bvirt) + (bvirt - t1);
    u32 = _j + _i;
    bvirt = u32 - _j;
    u[2] = _j - (u32 - bvirt) + (_i - bvirt);
    u[3] = u32;
    const C1len = sum(4, B, 4, u, C1);
    s1 = acx * bcytail;
    c2 = splitter * acx;
    ahi = c2 - (c2 - acx);
    alo = acx - ahi;
    c2 = splitter * bcytail;
    bhi = c2 - (c2 - bcytail);
    blo = bcytail - bhi;
    s0 = alo * blo - (s1 - ahi * bhi - alo * bhi - ahi * blo);
    t1 = acy * bcxtail;
    c2 = splitter * acy;
    ahi = c2 - (c2 - acy);
    alo = acy - ahi;
    c2 = splitter * bcxtail;
    bhi = c2 - (c2 - bcxtail);
    blo = bcxtail - bhi;
    t0 = alo * blo - (t1 - ahi * bhi - alo * bhi - ahi * blo);
    _i = s0 - t0;
    bvirt = s0 - _i;
    u[0] = s0 - (_i + bvirt) + (bvirt - t0);
    _j = s1 + _i;
    bvirt = _j - s1;
    _0 = s1 - (_j - bvirt) + (_i - bvirt);
    _i = _0 - t1;
    bvirt = _0 - _i;
    u[1] = _0 - (_i + bvirt) + (bvirt - t1);
    u32 = _j + _i;
    bvirt = u32 - _j;
    u[2] = _j - (u32 - bvirt) + (_i - bvirt);
    u[3] = u32;
    const C2len = sum(C1len, C1, 4, u, C2);
    s1 = acxtail * bcytail;
    c2 = splitter * acxtail;
    ahi = c2 - (c2 - acxtail);
    alo = acxtail - ahi;
    c2 = splitter * bcytail;
    bhi = c2 - (c2 - bcytail);
    blo = bcytail - bhi;
    s0 = alo * blo - (s1 - ahi * bhi - alo * bhi - ahi * blo);
    t1 = acytail * bcxtail;
    c2 = splitter * acytail;
    ahi = c2 - (c2 - acytail);
    alo = acytail - ahi;
    c2 = splitter * bcxtail;
    bhi = c2 - (c2 - bcxtail);
    blo = bcxtail - bhi;
    t0 = alo * blo - (t1 - ahi * bhi - alo * bhi - ahi * blo);
    _i = s0 - t0;
    bvirt = s0 - _i;
    u[0] = s0 - (_i + bvirt) + (bvirt - t0);
    _j = s1 + _i;
    bvirt = _j - s1;
    _0 = s1 - (_j - bvirt) + (_i - bvirt);
    _i = _0 - t1;
    bvirt = _0 - _i;
    u[1] = _0 - (_i + bvirt) + (bvirt - t1);
    u32 = _j + _i;
    bvirt = u32 - _j;
    u[2] = _j - (u32 - bvirt) + (_i - bvirt);
    u[3] = u32;
    const Dlen = sum(C2len, C2, 4, u, D);
    return D[Dlen - 1];
  }
  function orient2d(ax, ay, bx, by, cx, cy) {
    const detleft = (ay - cy) * (bx - cx);
    const detright = (ax - cx) * (by - cy);
    const det = detleft - detright;
    if (detleft === 0 || detright === 0 || detleft > 0 !== detright > 0)
      return det;
    const detsum = Math.abs(detleft + detright);
    if (Math.abs(det) >= ccwerrboundA * detsum)
      return det;
    return -orient2dadapt(ax, ay, bx, by, cx, cy, detsum);
  }

  // node_modules/robust-predicates/esm/orient3d.js
  var o3derrboundA = (7 + 56 * epsilon) * epsilon;
  var o3derrboundB = (3 + 28 * epsilon) * epsilon;
  var o3derrboundC = (26 + 288 * epsilon) * epsilon * epsilon;
  var bc = vec(4);
  var ca = vec(4);
  var ab = vec(4);
  var at_b = vec(4);
  var at_c = vec(4);
  var bt_c = vec(4);
  var bt_a = vec(4);
  var ct_a = vec(4);
  var ct_b = vec(4);
  var bct = vec(8);
  var cat = vec(8);
  var abt = vec(8);
  var u2 = vec(4);
  var _8 = vec(8);
  var _8b = vec(8);
  var _16 = vec(8);
  var _12 = vec(12);
  var fin = vec(192);
  var fin2 = vec(192);

  // node_modules/robust-predicates/esm/incircle.js
  var iccerrboundA = (10 + 96 * epsilon) * epsilon;
  var iccerrboundB = (4 + 48 * epsilon) * epsilon;
  var iccerrboundC = (44 + 576 * epsilon) * epsilon * epsilon;
  var bc2 = vec(4);
  var ca2 = vec(4);
  var ab2 = vec(4);
  var aa = vec(4);
  var bb = vec(4);
  var cc = vec(4);
  var u3 = vec(4);
  var v = vec(4);
  var axtbc = vec(8);
  var aytbc = vec(8);
  var bxtca = vec(8);
  var bytca = vec(8);
  var cxtab = vec(8);
  var cytab = vec(8);
  var abt2 = vec(8);
  var bct2 = vec(8);
  var cat2 = vec(8);
  var abtt = vec(4);
  var bctt = vec(4);
  var catt = vec(4);
  var _82 = vec(8);
  var _162 = vec(16);
  var _16b = vec(16);
  var _16c = vec(16);
  var _32 = vec(32);
  var _32b = vec(32);
  var _48 = vec(48);
  var _64 = vec(64);
  var fin3 = vec(1152);
  var fin22 = vec(1152);

  // node_modules/robust-predicates/esm/insphere.js
  var isperrboundA = (16 + 224 * epsilon) * epsilon;
  var isperrboundB = (5 + 72 * epsilon) * epsilon;
  var isperrboundC = (71 + 1408 * epsilon) * epsilon * epsilon;
  var ab3 = vec(4);
  var bc3 = vec(4);
  var cd = vec(4);
  var de = vec(4);
  var ea = vec(4);
  var ac = vec(4);
  var bd = vec(4);
  var ce = vec(4);
  var da = vec(4);
  var eb = vec(4);
  var abc = vec(24);
  var bcd = vec(24);
  var cde = vec(24);
  var dea = vec(24);
  var eab = vec(24);
  var abd = vec(24);
  var bce = vec(24);
  var cda = vec(24);
  var deb = vec(24);
  var eac = vec(24);
  var adet = vec(1152);
  var bdet = vec(1152);
  var cdet = vec(1152);
  var ddet = vec(1152);
  var edet = vec(1152);
  var abdet = vec(2304);
  var cddet = vec(2304);
  var cdedet = vec(3456);
  var deter = vec(5760);
  var _83 = vec(8);
  var _8b2 = vec(8);
  var _8c = vec(8);
  var _163 = vec(16);
  var _24 = vec(24);
  var _482 = vec(48);
  var _48b = vec(48);
  var _96 = vec(96);
  var _192 = vec(192);
  var _384x = vec(384);
  var _384y = vec(384);
  var _384z = vec(384);
  var _768 = vec(768);
  var xdet = vec(96);
  var ydet = vec(96);
  var zdet = vec(96);
  var fin4 = vec(1152);

  // node_modules/delaunator/index.js
  var EPSILON = Math.pow(2, -52);
  var EDGE_STACK = new Uint32Array(512);
  var Delaunator = class {
    static from(points, getX = defaultGetX, getY = defaultGetY) {
      const n = points.length;
      const coords = new Float64Array(n * 2);
      for (let i = 0; i < n; i++) {
        const p = points[i];
        coords[2 * i] = getX(p);
        coords[2 * i + 1] = getY(p);
      }
      return new Delaunator(coords);
    }
    constructor(coords) {
      const n = coords.length >> 1;
      if (n > 0 && typeof coords[0] !== "number")
        throw new Error("Expected coords to contain numbers.");
      this.coords = coords;
      const maxTriangles = Math.max(2 * n - 5, 0);
      this._triangles = new Uint32Array(maxTriangles * 3);
      this._halfedges = new Int32Array(maxTriangles * 3);
      this._hashSize = Math.ceil(Math.sqrt(n));
      this._hullPrev = new Uint32Array(n);
      this._hullNext = new Uint32Array(n);
      this._hullTri = new Uint32Array(n);
      this._hullHash = new Int32Array(this._hashSize).fill(-1);
      this._ids = new Uint32Array(n);
      this._dists = new Float64Array(n);
      this.update();
    }
    update() {
      const { coords, _hullPrev: hullPrev, _hullNext: hullNext, _hullTri: hullTri, _hullHash: hullHash } = this;
      const n = coords.length >> 1;
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      for (let i = 0; i < n; i++) {
        const x3 = coords[2 * i];
        const y3 = coords[2 * i + 1];
        if (x3 < minX)
          minX = x3;
        if (y3 < minY)
          minY = y3;
        if (x3 > maxX)
          maxX = x3;
        if (y3 > maxY)
          maxY = y3;
        this._ids[i] = i;
      }
      const cx = (minX + maxX) / 2;
      const cy = (minY + maxY) / 2;
      let minDist = Infinity;
      let i0, i1, i2;
      for (let i = 0; i < n; i++) {
        const d = dist(cx, cy, coords[2 * i], coords[2 * i + 1]);
        if (d < minDist) {
          i0 = i;
          minDist = d;
        }
      }
      const i0x = coords[2 * i0];
      const i0y = coords[2 * i0 + 1];
      minDist = Infinity;
      for (let i = 0; i < n; i++) {
        if (i === i0)
          continue;
        const d = dist(i0x, i0y, coords[2 * i], coords[2 * i + 1]);
        if (d < minDist && d > 0) {
          i1 = i;
          minDist = d;
        }
      }
      let i1x = coords[2 * i1];
      let i1y = coords[2 * i1 + 1];
      let minRadius = Infinity;
      for (let i = 0; i < n; i++) {
        if (i === i0 || i === i1)
          continue;
        const r = circumradius(i0x, i0y, i1x, i1y, coords[2 * i], coords[2 * i + 1]);
        if (r < minRadius) {
          i2 = i;
          minRadius = r;
        }
      }
      let i2x = coords[2 * i2];
      let i2y = coords[2 * i2 + 1];
      if (minRadius === Infinity) {
        for (let i = 0; i < n; i++) {
          this._dists[i] = coords[2 * i] - coords[0] || coords[2 * i + 1] - coords[1];
        }
        quicksort(this._ids, this._dists, 0, n - 1);
        const hull = new Uint32Array(n);
        let j = 0;
        for (let i = 0, d0 = -Infinity; i < n; i++) {
          const id2 = this._ids[i];
          if (this._dists[id2] > d0) {
            hull[j++] = id2;
            d0 = this._dists[id2];
          }
        }
        this.hull = hull.subarray(0, j);
        this.triangles = new Uint32Array(0);
        this.halfedges = new Uint32Array(0);
        return;
      }
      if (orient2d(i0x, i0y, i1x, i1y, i2x, i2y) < 0) {
        const i = i1;
        const x3 = i1x;
        const y3 = i1y;
        i1 = i2;
        i1x = i2x;
        i1y = i2y;
        i2 = i;
        i2x = x3;
        i2y = y3;
      }
      const center = circumcenter(i0x, i0y, i1x, i1y, i2x, i2y);
      this._cx = center.x;
      this._cy = center.y;
      for (let i = 0; i < n; i++) {
        this._dists[i] = dist(coords[2 * i], coords[2 * i + 1], center.x, center.y);
      }
      quicksort(this._ids, this._dists, 0, n - 1);
      this._hullStart = i0;
      let hullSize = 3;
      hullNext[i0] = hullPrev[i2] = i1;
      hullNext[i1] = hullPrev[i0] = i2;
      hullNext[i2] = hullPrev[i1] = i0;
      hullTri[i0] = 0;
      hullTri[i1] = 1;
      hullTri[i2] = 2;
      hullHash.fill(-1);
      hullHash[this._hashKey(i0x, i0y)] = i0;
      hullHash[this._hashKey(i1x, i1y)] = i1;
      hullHash[this._hashKey(i2x, i2y)] = i2;
      this.trianglesLen = 0;
      this._addTriangle(i0, i1, i2, -1, -1, -1);
      for (let k = 0, xp, yp; k < this._ids.length; k++) {
        const i = this._ids[k];
        const x3 = coords[2 * i];
        const y3 = coords[2 * i + 1];
        if (k > 0 && Math.abs(x3 - xp) <= EPSILON && Math.abs(y3 - yp) <= EPSILON)
          continue;
        xp = x3;
        yp = y3;
        if (i === i0 || i === i1 || i === i2)
          continue;
        let start2 = 0;
        for (let j = 0, key = this._hashKey(x3, y3); j < this._hashSize; j++) {
          start2 = hullHash[(key + j) % this._hashSize];
          if (start2 !== -1 && start2 !== hullNext[start2])
            break;
        }
        start2 = hullPrev[start2];
        let e = start2, q;
        while (q = hullNext[e], orient2d(x3, y3, coords[2 * e], coords[2 * e + 1], coords[2 * q], coords[2 * q + 1]) >= 0) {
          e = q;
          if (e === start2) {
            e = -1;
            break;
          }
        }
        if (e === -1)
          continue;
        let t = this._addTriangle(e, i, hullNext[e], -1, -1, hullTri[e]);
        hullTri[i] = this._legalize(t + 2);
        hullTri[e] = t;
        hullSize++;
        let n2 = hullNext[e];
        while (q = hullNext[n2], orient2d(x3, y3, coords[2 * n2], coords[2 * n2 + 1], coords[2 * q], coords[2 * q + 1]) < 0) {
          t = this._addTriangle(n2, i, q, hullTri[i], -1, hullTri[n2]);
          hullTri[i] = this._legalize(t + 2);
          hullNext[n2] = n2;
          hullSize--;
          n2 = q;
        }
        if (e === start2) {
          while (q = hullPrev[e], orient2d(x3, y3, coords[2 * q], coords[2 * q + 1], coords[2 * e], coords[2 * e + 1]) < 0) {
            t = this._addTriangle(q, i, e, -1, hullTri[e], hullTri[q]);
            this._legalize(t + 2);
            hullTri[q] = t;
            hullNext[e] = e;
            hullSize--;
            e = q;
          }
        }
        this._hullStart = hullPrev[i] = e;
        hullNext[e] = hullPrev[n2] = i;
        hullNext[i] = n2;
        hullHash[this._hashKey(x3, y3)] = i;
        hullHash[this._hashKey(coords[2 * e], coords[2 * e + 1])] = e;
      }
      this.hull = new Uint32Array(hullSize);
      for (let i = 0, e = this._hullStart; i < hullSize; i++) {
        this.hull[i] = e;
        e = hullNext[e];
      }
      this.triangles = this._triangles.subarray(0, this.trianglesLen);
      this.halfedges = this._halfedges.subarray(0, this.trianglesLen);
    }
    _hashKey(x3, y3) {
      return Math.floor(pseudoAngle(x3 - this._cx, y3 - this._cy) * this._hashSize) % this._hashSize;
    }
    _legalize(a2) {
      const { _triangles: triangles, _halfedges: halfedges, coords } = this;
      let i = 0;
      let ar = 0;
      while (true) {
        const b = halfedges[a2];
        const a0 = a2 - a2 % 3;
        ar = a0 + (a2 + 2) % 3;
        if (b === -1) {
          if (i === 0)
            break;
          a2 = EDGE_STACK[--i];
          continue;
        }
        const b0 = b - b % 3;
        const al = a0 + (a2 + 1) % 3;
        const bl = b0 + (b + 2) % 3;
        const p0 = triangles[ar];
        const pr = triangles[a2];
        const pl = triangles[al];
        const p1 = triangles[bl];
        const illegal = inCircle(coords[2 * p0], coords[2 * p0 + 1], coords[2 * pr], coords[2 * pr + 1], coords[2 * pl], coords[2 * pl + 1], coords[2 * p1], coords[2 * p1 + 1]);
        if (illegal) {
          triangles[a2] = p1;
          triangles[b] = p0;
          const hbl = halfedges[bl];
          if (hbl === -1) {
            let e = this._hullStart;
            do {
              if (this._hullTri[e] === bl) {
                this._hullTri[e] = a2;
                break;
              }
              e = this._hullPrev[e];
            } while (e !== this._hullStart);
          }
          this._link(a2, hbl);
          this._link(b, halfedges[ar]);
          this._link(ar, bl);
          const br = b0 + (b + 1) % 3;
          if (i < EDGE_STACK.length) {
            EDGE_STACK[i++] = br;
          }
        } else {
          if (i === 0)
            break;
          a2 = EDGE_STACK[--i];
        }
      }
      return ar;
    }
    _link(a2, b) {
      this._halfedges[a2] = b;
      if (b !== -1)
        this._halfedges[b] = a2;
    }
    _addTriangle(i0, i1, i2, a2, b, c2) {
      const t = this.trianglesLen;
      this._triangles[t] = i0;
      this._triangles[t + 1] = i1;
      this._triangles[t + 2] = i2;
      this._link(t, a2);
      this._link(t + 1, b);
      this._link(t + 2, c2);
      this.trianglesLen += 3;
      return t;
    }
  };
  function pseudoAngle(dx, dy) {
    const p = dx / (Math.abs(dx) + Math.abs(dy));
    return (dy > 0 ? 3 - p : 1 + p) / 4;
  }
  function dist(ax, ay, bx, by) {
    const dx = ax - bx;
    const dy = ay - by;
    return dx * dx + dy * dy;
  }
  function inCircle(ax, ay, bx, by, cx, cy, px, py) {
    const dx = ax - px;
    const dy = ay - py;
    const ex = bx - px;
    const ey = by - py;
    const fx = cx - px;
    const fy = cy - py;
    const ap = dx * dx + dy * dy;
    const bp = ex * ex + ey * ey;
    const cp = fx * fx + fy * fy;
    return dx * (ey * cp - bp * fy) - dy * (ex * cp - bp * fx) + ap * (ex * fy - ey * fx) < 0;
  }
  function circumradius(ax, ay, bx, by, cx, cy) {
    const dx = bx - ax;
    const dy = by - ay;
    const ex = cx - ax;
    const ey = cy - ay;
    const bl = dx * dx + dy * dy;
    const cl = ex * ex + ey * ey;
    const d = 0.5 / (dx * ey - dy * ex);
    const x3 = (ey * bl - dy * cl) * d;
    const y3 = (dx * cl - ex * bl) * d;
    return x3 * x3 + y3 * y3;
  }
  function circumcenter(ax, ay, bx, by, cx, cy) {
    const dx = bx - ax;
    const dy = by - ay;
    const ex = cx - ax;
    const ey = cy - ay;
    const bl = dx * dx + dy * dy;
    const cl = ex * ex + ey * ey;
    const d = 0.5 / (dx * ey - dy * ex);
    const x3 = ax + (ey * bl - dy * cl) * d;
    const y3 = ay + (dx * cl - ex * bl) * d;
    return { x: x3, y: y3 };
  }
  function quicksort(ids, dists, left, right) {
    if (right - left <= 20) {
      for (let i = left + 1; i <= right; i++) {
        const temp = ids[i];
        const tempDist = dists[temp];
        let j = i - 1;
        while (j >= left && dists[ids[j]] > tempDist)
          ids[j + 1] = ids[j--];
        ids[j + 1] = temp;
      }
    } else {
      const median = left + right >> 1;
      let i = left + 1;
      let j = right;
      swap(ids, median, i);
      if (dists[ids[left]] > dists[ids[right]])
        swap(ids, left, right);
      if (dists[ids[i]] > dists[ids[right]])
        swap(ids, i, right);
      if (dists[ids[left]] > dists[ids[i]])
        swap(ids, left, i);
      const temp = ids[i];
      const tempDist = dists[temp];
      while (true) {
        do
          i++;
        while (dists[ids[i]] < tempDist);
        do
          j--;
        while (dists[ids[j]] > tempDist);
        if (j < i)
          break;
        swap(ids, i, j);
      }
      ids[left + 1] = ids[j];
      ids[j] = temp;
      if (right - i + 1 >= j - left) {
        quicksort(ids, dists, i, right);
        quicksort(ids, dists, left, j - 1);
      } else {
        quicksort(ids, dists, left, j - 1);
        quicksort(ids, dists, i, right);
      }
    }
  }
  function swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  function defaultGetX(p) {
    return p[0];
  }
  function defaultGetY(p) {
    return p[1];
  }

  // node_modules/d3-delaunay/src/path.js
  var epsilon2 = 1e-6;
  var Path = class {
    constructor() {
      this._x0 = this._y0 = this._x1 = this._y1 = null;
      this._ = "";
    }
    moveTo(x3, y3) {
      this._ += `M${this._x0 = this._x1 = +x3},${this._y0 = this._y1 = +y3}`;
    }
    closePath() {
      if (this._x1 !== null) {
        this._x1 = this._x0, this._y1 = this._y0;
        this._ += "Z";
      }
    }
    lineTo(x3, y3) {
      this._ += `L${this._x1 = +x3},${this._y1 = +y3}`;
    }
    arc(x3, y3, r) {
      x3 = +x3, y3 = +y3, r = +r;
      const x0 = x3 + r;
      const y0 = y3;
      if (r < 0)
        throw new Error("negative radius");
      if (this._x1 === null)
        this._ += `M${x0},${y0}`;
      else if (Math.abs(this._x1 - x0) > epsilon2 || Math.abs(this._y1 - y0) > epsilon2)
        this._ += "L" + x0 + "," + y0;
      if (!r)
        return;
      this._ += `A${r},${r},0,1,1,${x3 - r},${y3}A${r},${r},0,1,1,${this._x1 = x0},${this._y1 = y0}`;
    }
    rect(x3, y3, w, h) {
      this._ += `M${this._x0 = this._x1 = +x3},${this._y0 = this._y1 = +y3}h${+w}v${+h}h${-w}Z`;
    }
    value() {
      return this._ || null;
    }
  };

  // node_modules/d3-delaunay/src/polygon.js
  var Polygon = class {
    constructor() {
      this._ = [];
    }
    moveTo(x3, y3) {
      this._.push([x3, y3]);
    }
    closePath() {
      this._.push(this._[0].slice());
    }
    lineTo(x3, y3) {
      this._.push([x3, y3]);
    }
    value() {
      return this._.length ? this._ : null;
    }
  };

  // node_modules/d3-delaunay/src/voronoi.js
  var Voronoi = class {
    constructor(delaunay, [xmin, ymin, xmax, ymax] = [0, 0, 960, 500]) {
      if (!((xmax = +xmax) >= (xmin = +xmin)) || !((ymax = +ymax) >= (ymin = +ymin)))
        throw new Error("invalid bounds");
      this.delaunay = delaunay;
      this._circumcenters = new Float64Array(delaunay.points.length * 2);
      this.vectors = new Float64Array(delaunay.points.length * 2);
      this.xmax = xmax, this.xmin = xmin;
      this.ymax = ymax, this.ymin = ymin;
      this._init();
    }
    update() {
      this.delaunay.update();
      this._init();
      return this;
    }
    _init() {
      const { delaunay: { points, hull, triangles }, vectors } = this;
      const circumcenters = this.circumcenters = this._circumcenters.subarray(0, triangles.length / 3 * 2);
      for (let i = 0, j = 0, n = triangles.length, x3, y3; i < n; i += 3, j += 2) {
        const t1 = triangles[i] * 2;
        const t2 = triangles[i + 1] * 2;
        const t3 = triangles[i + 2] * 2;
        const x12 = points[t1];
        const y12 = points[t1 + 1];
        const x22 = points[t2];
        const y22 = points[t2 + 1];
        const x32 = points[t3];
        const y32 = points[t3 + 1];
        const dx = x22 - x12;
        const dy = y22 - y12;
        const ex = x32 - x12;
        const ey = y32 - y12;
        const ab4 = (dx * ey - dy * ex) * 2;
        if (Math.abs(ab4) < 1e-9) {
          let a2 = 1e9;
          const r = triangles[0] * 2;
          a2 *= Math.sign((points[r] - x12) * ey - (points[r + 1] - y12) * ex);
          x3 = (x12 + x32) / 2 - a2 * ey;
          y3 = (y12 + y32) / 2 + a2 * ex;
        } else {
          const d = 1 / ab4;
          const bl = dx * dx + dy * dy;
          const cl = ex * ex + ey * ey;
          x3 = x12 + (ey * bl - dy * cl) * d;
          y3 = y12 + (dx * cl - ex * bl) * d;
        }
        circumcenters[j] = x3;
        circumcenters[j + 1] = y3;
      }
      let h = hull[hull.length - 1];
      let p0, p1 = h * 4;
      let x0, x1 = points[2 * h];
      let y0, y1 = points[2 * h + 1];
      vectors.fill(0);
      for (let i = 0; i < hull.length; ++i) {
        h = hull[i];
        p0 = p1, x0 = x1, y0 = y1;
        p1 = h * 4, x1 = points[2 * h], y1 = points[2 * h + 1];
        vectors[p0 + 2] = vectors[p1] = y0 - y1;
        vectors[p0 + 3] = vectors[p1 + 1] = x1 - x0;
      }
    }
    render(context) {
      const buffer = context == null ? context = new Path() : void 0;
      const { delaunay: { halfedges, inedges, hull }, circumcenters, vectors } = this;
      if (hull.length <= 1)
        return null;
      for (let i = 0, n = halfedges.length; i < n; ++i) {
        const j = halfedges[i];
        if (j < i)
          continue;
        const ti = Math.floor(i / 3) * 2;
        const tj = Math.floor(j / 3) * 2;
        const xi = circumcenters[ti];
        const yi = circumcenters[ti + 1];
        const xj = circumcenters[tj];
        const yj = circumcenters[tj + 1];
        this._renderSegment(xi, yi, xj, yj, context);
      }
      let h0, h1 = hull[hull.length - 1];
      for (let i = 0; i < hull.length; ++i) {
        h0 = h1, h1 = hull[i];
        const t = Math.floor(inedges[h1] / 3) * 2;
        const x3 = circumcenters[t];
        const y3 = circumcenters[t + 1];
        const v2 = h0 * 4;
        const p = this._project(x3, y3, vectors[v2 + 2], vectors[v2 + 3]);
        if (p)
          this._renderSegment(x3, y3, p[0], p[1], context);
      }
      return buffer && buffer.value();
    }
    renderBounds(context) {
      const buffer = context == null ? context = new Path() : void 0;
      context.rect(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin);
      return buffer && buffer.value();
    }
    renderCell(i, context) {
      const buffer = context == null ? context = new Path() : void 0;
      const points = this._clip(i);
      if (points === null || !points.length)
        return;
      context.moveTo(points[0], points[1]);
      let n = points.length;
      while (points[0] === points[n - 2] && points[1] === points[n - 1] && n > 1)
        n -= 2;
      for (let i2 = 2; i2 < n; i2 += 2) {
        if (points[i2] !== points[i2 - 2] || points[i2 + 1] !== points[i2 - 1])
          context.lineTo(points[i2], points[i2 + 1]);
      }
      context.closePath();
      return buffer && buffer.value();
    }
    *cellPolygons() {
      const { delaunay: { points } } = this;
      for (let i = 0, n = points.length / 2; i < n; ++i) {
        const cell = this.cellPolygon(i);
        if (cell)
          cell.index = i, yield cell;
      }
    }
    cellPolygon(i) {
      const polygon = new Polygon();
      this.renderCell(i, polygon);
      return polygon.value();
    }
    _renderSegment(x0, y0, x1, y1, context) {
      let S;
      const c0 = this._regioncode(x0, y0);
      const c1 = this._regioncode(x1, y1);
      if (c0 === 0 && c1 === 0) {
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
      } else if (S = this._clipSegment(x0, y0, x1, y1, c0, c1)) {
        context.moveTo(S[0], S[1]);
        context.lineTo(S[2], S[3]);
      }
    }
    contains(i, x3, y3) {
      if ((x3 = +x3, x3 !== x3) || (y3 = +y3, y3 !== y3))
        return false;
      return this.delaunay._step(i, x3, y3) === i;
    }
    *neighbors(i) {
      const ci = this._clip(i);
      if (ci)
        for (const j of this.delaunay.neighbors(i)) {
          const cj = this._clip(j);
          if (cj)
            loop:
              for (let ai = 0, li = ci.length; ai < li; ai += 2) {
                for (let aj = 0, lj = cj.length; aj < lj; aj += 2) {
                  if (ci[ai] == cj[aj] && ci[ai + 1] == cj[aj + 1] && ci[(ai + 2) % li] == cj[(aj + lj - 2) % lj] && ci[(ai + 3) % li] == cj[(aj + lj - 1) % lj]) {
                    yield j;
                    break loop;
                  }
                }
              }
        }
    }
    _cell(i) {
      const { circumcenters, delaunay: { inedges, halfedges, triangles } } = this;
      const e0 = inedges[i];
      if (e0 === -1)
        return null;
      const points = [];
      let e = e0;
      do {
        const t = Math.floor(e / 3);
        points.push(circumcenters[t * 2], circumcenters[t * 2 + 1]);
        e = e % 3 === 2 ? e - 2 : e + 1;
        if (triangles[e] !== i)
          break;
        e = halfedges[e];
      } while (e !== e0 && e !== -1);
      return points;
    }
    _clip(i) {
      if (i === 0 && this.delaunay.hull.length === 1) {
        return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
      }
      const points = this._cell(i);
      if (points === null)
        return null;
      const { vectors: V } = this;
      const v2 = i * 4;
      return V[v2] || V[v2 + 1] ? this._clipInfinite(i, points, V[v2], V[v2 + 1], V[v2 + 2], V[v2 + 3]) : this._clipFinite(i, points);
    }
    _clipFinite(i, points) {
      const n = points.length;
      let P = null;
      let x0, y0, x1 = points[n - 2], y1 = points[n - 1];
      let c0, c1 = this._regioncode(x1, y1);
      let e0, e1 = 0;
      for (let j = 0; j < n; j += 2) {
        x0 = x1, y0 = y1, x1 = points[j], y1 = points[j + 1];
        c0 = c1, c1 = this._regioncode(x1, y1);
        if (c0 === 0 && c1 === 0) {
          e0 = e1, e1 = 0;
          if (P)
            P.push(x1, y1);
          else
            P = [x1, y1];
        } else {
          let S, sx0, sy0, sx1, sy1;
          if (c0 === 0) {
            if ((S = this._clipSegment(x0, y0, x1, y1, c0, c1)) === null)
              continue;
            [sx0, sy0, sx1, sy1] = S;
          } else {
            if ((S = this._clipSegment(x1, y1, x0, y0, c1, c0)) === null)
              continue;
            [sx1, sy1, sx0, sy0] = S;
            e0 = e1, e1 = this._edgecode(sx0, sy0);
            if (e0 && e1)
              this._edge(i, e0, e1, P, P.length);
            if (P)
              P.push(sx0, sy0);
            else
              P = [sx0, sy0];
          }
          e0 = e1, e1 = this._edgecode(sx1, sy1);
          if (e0 && e1)
            this._edge(i, e0, e1, P, P.length);
          if (P)
            P.push(sx1, sy1);
          else
            P = [sx1, sy1];
        }
      }
      if (P) {
        e0 = e1, e1 = this._edgecode(P[0], P[1]);
        if (e0 && e1)
          this._edge(i, e0, e1, P, P.length);
      } else if (this.contains(i, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2)) {
        return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
      }
      return P;
    }
    _clipSegment(x0, y0, x1, y1, c0, c1) {
      while (true) {
        if (c0 === 0 && c1 === 0)
          return [x0, y0, x1, y1];
        if (c0 & c1)
          return null;
        let x3, y3, c2 = c0 || c1;
        if (c2 & 8)
          x3 = x0 + (x1 - x0) * (this.ymax - y0) / (y1 - y0), y3 = this.ymax;
        else if (c2 & 4)
          x3 = x0 + (x1 - x0) * (this.ymin - y0) / (y1 - y0), y3 = this.ymin;
        else if (c2 & 2)
          y3 = y0 + (y1 - y0) * (this.xmax - x0) / (x1 - x0), x3 = this.xmax;
        else
          y3 = y0 + (y1 - y0) * (this.xmin - x0) / (x1 - x0), x3 = this.xmin;
        if (c0)
          x0 = x3, y0 = y3, c0 = this._regioncode(x0, y0);
        else
          x1 = x3, y1 = y3, c1 = this._regioncode(x1, y1);
      }
    }
    _clipInfinite(i, points, vx0, vy0, vxn, vyn) {
      let P = Array.from(points), p;
      if (p = this._project(P[0], P[1], vx0, vy0))
        P.unshift(p[0], p[1]);
      if (p = this._project(P[P.length - 2], P[P.length - 1], vxn, vyn))
        P.push(p[0], p[1]);
      if (P = this._clipFinite(i, P)) {
        for (let j = 0, n = P.length, c0, c1 = this._edgecode(P[n - 2], P[n - 1]); j < n; j += 2) {
          c0 = c1, c1 = this._edgecode(P[j], P[j + 1]);
          if (c0 && c1)
            j = this._edge(i, c0, c1, P, j), n = P.length;
        }
      } else if (this.contains(i, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2)) {
        P = [this.xmin, this.ymin, this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax];
      }
      return P;
    }
    _edge(i, e0, e1, P, j) {
      while (e0 !== e1) {
        let x3, y3;
        switch (e0) {
          case 5:
            e0 = 4;
            continue;
          case 4:
            e0 = 6, x3 = this.xmax, y3 = this.ymin;
            break;
          case 6:
            e0 = 2;
            continue;
          case 2:
            e0 = 10, x3 = this.xmax, y3 = this.ymax;
            break;
          case 10:
            e0 = 8;
            continue;
          case 8:
            e0 = 9, x3 = this.xmin, y3 = this.ymax;
            break;
          case 9:
            e0 = 1;
            continue;
          case 1:
            e0 = 5, x3 = this.xmin, y3 = this.ymin;
            break;
        }
        if ((P[j] !== x3 || P[j + 1] !== y3) && this.contains(i, x3, y3)) {
          P.splice(j, 0, x3, y3), j += 2;
        }
      }
      if (P.length > 4) {
        for (let i2 = 0; i2 < P.length; i2 += 2) {
          const j2 = (i2 + 2) % P.length, k = (i2 + 4) % P.length;
          if (P[i2] === P[j2] && P[j2] === P[k] || P[i2 + 1] === P[j2 + 1] && P[j2 + 1] === P[k + 1])
            P.splice(j2, 2), i2 -= 2;
        }
      }
      return j;
    }
    _project(x0, y0, vx, vy) {
      let t = Infinity, c2, x3, y3;
      if (vy < 0) {
        if (y0 <= this.ymin)
          return null;
        if ((c2 = (this.ymin - y0) / vy) < t)
          y3 = this.ymin, x3 = x0 + (t = c2) * vx;
      } else if (vy > 0) {
        if (y0 >= this.ymax)
          return null;
        if ((c2 = (this.ymax - y0) / vy) < t)
          y3 = this.ymax, x3 = x0 + (t = c2) * vx;
      }
      if (vx > 0) {
        if (x0 >= this.xmax)
          return null;
        if ((c2 = (this.xmax - x0) / vx) < t)
          x3 = this.xmax, y3 = y0 + (t = c2) * vy;
      } else if (vx < 0) {
        if (x0 <= this.xmin)
          return null;
        if ((c2 = (this.xmin - x0) / vx) < t)
          x3 = this.xmin, y3 = y0 + (t = c2) * vy;
      }
      return [x3, y3];
    }
    _edgecode(x3, y3) {
      return (x3 === this.xmin ? 1 : x3 === this.xmax ? 2 : 0) | (y3 === this.ymin ? 4 : y3 === this.ymax ? 8 : 0);
    }
    _regioncode(x3, y3) {
      return (x3 < this.xmin ? 1 : x3 > this.xmax ? 2 : 0) | (y3 < this.ymin ? 4 : y3 > this.ymax ? 8 : 0);
    }
  };

  // node_modules/d3-delaunay/src/delaunay.js
  var tau = 2 * Math.PI;
  var pow = Math.pow;
  function pointX(p) {
    return p[0];
  }
  function pointY(p) {
    return p[1];
  }
  function collinear(d) {
    const { triangles, coords } = d;
    for (let i = 0; i < triangles.length; i += 3) {
      const a2 = 2 * triangles[i], b = 2 * triangles[i + 1], c2 = 2 * triangles[i + 2], cross = (coords[c2] - coords[a2]) * (coords[b + 1] - coords[a2 + 1]) - (coords[b] - coords[a2]) * (coords[c2 + 1] - coords[a2 + 1]);
      if (cross > 1e-10)
        return false;
    }
    return true;
  }
  function jitter(x3, y3, r) {
    return [x3 + Math.sin(x3 + y3) * r, y3 + Math.cos(x3 - y3) * r];
  }
  var Delaunay = class {
    static from(points, fx = pointX, fy = pointY, that) {
      return new Delaunay("length" in points ? flatArray(points, fx, fy, that) : Float64Array.from(flatIterable(points, fx, fy, that)));
    }
    constructor(points) {
      this._delaunator = new Delaunator(points);
      this.inedges = new Int32Array(points.length / 2);
      this._hullIndex = new Int32Array(points.length / 2);
      this.points = this._delaunator.coords;
      this._init();
    }
    update() {
      this._delaunator.update();
      this._init();
      return this;
    }
    _init() {
      const d = this._delaunator, points = this.points;
      if (d.hull && d.hull.length > 2 && collinear(d)) {
        this.collinear = Int32Array.from({ length: points.length / 2 }, (_, i) => i).sort((i, j) => points[2 * i] - points[2 * j] || points[2 * i + 1] - points[2 * j + 1]);
        const e = this.collinear[0], f = this.collinear[this.collinear.length - 1], bounds = [points[2 * e], points[2 * e + 1], points[2 * f], points[2 * f + 1]], r = 1e-8 * Math.hypot(bounds[3] - bounds[1], bounds[2] - bounds[0]);
        for (let i = 0, n = points.length / 2; i < n; ++i) {
          const p = jitter(points[2 * i], points[2 * i + 1], r);
          points[2 * i] = p[0];
          points[2 * i + 1] = p[1];
        }
        this._delaunator = new Delaunator(points);
      } else {
        delete this.collinear;
      }
      const halfedges = this.halfedges = this._delaunator.halfedges;
      const hull = this.hull = this._delaunator.hull;
      const triangles = this.triangles = this._delaunator.triangles;
      const inedges = this.inedges.fill(-1);
      const hullIndex = this._hullIndex.fill(-1);
      for (let e = 0, n = halfedges.length; e < n; ++e) {
        const p = triangles[e % 3 === 2 ? e - 2 : e + 1];
        if (halfedges[e] === -1 || inedges[p] === -1)
          inedges[p] = e;
      }
      for (let i = 0, n = hull.length; i < n; ++i) {
        hullIndex[hull[i]] = i;
      }
      if (hull.length <= 2 && hull.length > 0) {
        this.triangles = new Int32Array(3).fill(-1);
        this.halfedges = new Int32Array(3).fill(-1);
        this.triangles[0] = hull[0];
        inedges[hull[0]] = 1;
        if (hull.length === 2) {
          inedges[hull[1]] = 0;
          this.triangles[1] = hull[1];
          this.triangles[2] = hull[1];
        }
      }
    }
    voronoi(bounds) {
      return new Voronoi(this, bounds);
    }
    *neighbors(i) {
      const { inedges, hull, _hullIndex, halfedges, triangles, collinear: collinear2 } = this;
      if (collinear2) {
        const l = collinear2.indexOf(i);
        if (l > 0)
          yield collinear2[l - 1];
        if (l < collinear2.length - 1)
          yield collinear2[l + 1];
        return;
      }
      const e0 = inedges[i];
      if (e0 === -1)
        return;
      let e = e0, p0 = -1;
      do {
        yield p0 = triangles[e];
        e = e % 3 === 2 ? e - 2 : e + 1;
        if (triangles[e] !== i)
          return;
        e = halfedges[e];
        if (e === -1) {
          const p = hull[(_hullIndex[i] + 1) % hull.length];
          if (p !== p0)
            yield p;
          return;
        }
      } while (e !== e0);
    }
    find(x3, y3, i = 0) {
      if ((x3 = +x3, x3 !== x3) || (y3 = +y3, y3 !== y3))
        return -1;
      const i0 = i;
      let c2;
      while ((c2 = this._step(i, x3, y3)) >= 0 && c2 !== i && c2 !== i0)
        i = c2;
      return c2;
    }
    _step(i, x3, y3) {
      const { inedges, hull, _hullIndex, halfedges, triangles, points } = this;
      if (inedges[i] === -1 || !points.length)
        return (i + 1) % (points.length >> 1);
      let c2 = i;
      let dc = pow(x3 - points[i * 2], 2) + pow(y3 - points[i * 2 + 1], 2);
      const e0 = inedges[i];
      let e = e0;
      do {
        let t = triangles[e];
        const dt = pow(x3 - points[t * 2], 2) + pow(y3 - points[t * 2 + 1], 2);
        if (dt < dc)
          dc = dt, c2 = t;
        e = e % 3 === 2 ? e - 2 : e + 1;
        if (triangles[e] !== i)
          break;
        e = halfedges[e];
        if (e === -1) {
          e = hull[(_hullIndex[i] + 1) % hull.length];
          if (e !== t) {
            if (pow(x3 - points[e * 2], 2) + pow(y3 - points[e * 2 + 1], 2) < dc)
              return e;
          }
          break;
        }
      } while (e !== e0);
      return c2;
    }
    render(context) {
      const buffer = context == null ? context = new Path() : void 0;
      const { points, halfedges, triangles } = this;
      for (let i = 0, n = halfedges.length; i < n; ++i) {
        const j = halfedges[i];
        if (j < i)
          continue;
        const ti = triangles[i] * 2;
        const tj = triangles[j] * 2;
        context.moveTo(points[ti], points[ti + 1]);
        context.lineTo(points[tj], points[tj + 1]);
      }
      this.renderHull(context);
      return buffer && buffer.value();
    }
    renderPoints(context, r) {
      if (r === void 0 && (!context || typeof context.moveTo !== "function"))
        r = context, context = null;
      r = r == void 0 ? 2 : +r;
      const buffer = context == null ? context = new Path() : void 0;
      const { points } = this;
      for (let i = 0, n = points.length; i < n; i += 2) {
        const x3 = points[i], y3 = points[i + 1];
        context.moveTo(x3 + r, y3);
        context.arc(x3, y3, r, 0, tau);
      }
      return buffer && buffer.value();
    }
    renderHull(context) {
      const buffer = context == null ? context = new Path() : void 0;
      const { hull, points } = this;
      const h = hull[0] * 2, n = hull.length;
      context.moveTo(points[h], points[h + 1]);
      for (let i = 1; i < n; ++i) {
        const h2 = 2 * hull[i];
        context.lineTo(points[h2], points[h2 + 1]);
      }
      context.closePath();
      return buffer && buffer.value();
    }
    hullPolygon() {
      const polygon = new Polygon();
      this.renderHull(polygon);
      return polygon.value();
    }
    renderTriangle(i, context) {
      const buffer = context == null ? context = new Path() : void 0;
      const { points, triangles } = this;
      const t0 = triangles[i *= 3] * 2;
      const t1 = triangles[i + 1] * 2;
      const t2 = triangles[i + 2] * 2;
      context.moveTo(points[t0], points[t0 + 1]);
      context.lineTo(points[t1], points[t1 + 1]);
      context.lineTo(points[t2], points[t2 + 1]);
      context.closePath();
      return buffer && buffer.value();
    }
    *trianglePolygons() {
      const { triangles } = this;
      for (let i = 0, n = triangles.length / 3; i < n; ++i) {
        yield this.trianglePolygon(i);
      }
    }
    trianglePolygon(i) {
      const polygon = new Polygon();
      this.renderTriangle(i, polygon);
      return polygon.value();
    }
  };
  function flatArray(points, fx, fy, that) {
    const n = points.length;
    const array2 = new Float64Array(n * 2);
    for (let i = 0; i < n; ++i) {
      const p = points[i];
      array2[i * 2] = fx.call(that, p, i, points);
      array2[i * 2 + 1] = fy.call(that, p, i, points);
    }
    return array2;
  }
  function* flatIterable(points, fx, fy, that) {
    let i = 0;
    for (const p of points) {
      yield fx.call(that, p, i, points);
      yield fy.call(that, p, i, points);
      ++i;
    }
  }

  // node_modules/d3-force/src/center.js
  function center_default(x3, y3) {
    var nodes, strength = 1;
    if (x3 == null)
      x3 = 0;
    if (y3 == null)
      y3 = 0;
    function force() {
      var i, n = nodes.length, node, sx = 0, sy = 0;
      for (i = 0; i < n; ++i) {
        node = nodes[i], sx += node.x, sy += node.y;
      }
      for (sx = (sx / n - x3) * strength, sy = (sy / n - y3) * strength, i = 0; i < n; ++i) {
        node = nodes[i], node.x -= sx, node.y -= sy;
      }
    }
    force.initialize = function(_) {
      nodes = _;
    };
    force.x = function(_) {
      return arguments.length ? (x3 = +_, force) : x3;
    };
    force.y = function(_) {
      return arguments.length ? (y3 = +_, force) : y3;
    };
    force.strength = function(_) {
      return arguments.length ? (strength = +_, force) : strength;
    };
    return force;
  }

  // node_modules/d3-quadtree/src/add.js
  function add_default(d) {
    const x3 = +this._x.call(null, d), y3 = +this._y.call(null, d);
    return add(this.cover(x3, y3), x3, y3, d);
  }
  function add(tree, x3, y3, d) {
    if (isNaN(x3) || isNaN(y3))
      return tree;
    var parent, node = tree._root, leaf = { data: d }, x0 = tree._x0, y0 = tree._y0, x1 = tree._x1, y1 = tree._y1, xm, ym, xp, yp, right, bottom, i, j;
    if (!node)
      return tree._root = leaf, tree;
    while (node.length) {
      if (right = x3 >= (xm = (x0 + x1) / 2))
        x0 = xm;
      else
        x1 = xm;
      if (bottom = y3 >= (ym = (y0 + y1) / 2))
        y0 = ym;
      else
        y1 = ym;
      if (parent = node, !(node = node[i = bottom << 1 | right]))
        return parent[i] = leaf, tree;
    }
    xp = +tree._x.call(null, node.data);
    yp = +tree._y.call(null, node.data);
    if (x3 === xp && y3 === yp)
      return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;
    do {
      parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4);
      if (right = x3 >= (xm = (x0 + x1) / 2))
        x0 = xm;
      else
        x1 = xm;
      if (bottom = y3 >= (ym = (y0 + y1) / 2))
        y0 = ym;
      else
        y1 = ym;
    } while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | xp >= xm));
    return parent[j] = node, parent[i] = leaf, tree;
  }
  function addAll(data) {
    var d, i, n = data.length, x3, y3, xz = new Array(n), yz = new Array(n), x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (i = 0; i < n; ++i) {
      if (isNaN(x3 = +this._x.call(null, d = data[i])) || isNaN(y3 = +this._y.call(null, d)))
        continue;
      xz[i] = x3;
      yz[i] = y3;
      if (x3 < x0)
        x0 = x3;
      if (x3 > x1)
        x1 = x3;
      if (y3 < y0)
        y0 = y3;
      if (y3 > y1)
        y1 = y3;
    }
    if (x0 > x1 || y0 > y1)
      return this;
    this.cover(x0, y0).cover(x1, y1);
    for (i = 0; i < n; ++i) {
      add(this, xz[i], yz[i], data[i]);
    }
    return this;
  }

  // node_modules/d3-quadtree/src/cover.js
  function cover_default(x3, y3) {
    if (isNaN(x3 = +x3) || isNaN(y3 = +y3))
      return this;
    var x0 = this._x0, y0 = this._y0, x1 = this._x1, y1 = this._y1;
    if (isNaN(x0)) {
      x1 = (x0 = Math.floor(x3)) + 1;
      y1 = (y0 = Math.floor(y3)) + 1;
    } else {
      var z = x1 - x0 || 1, node = this._root, parent, i;
      while (x0 > x3 || x3 >= x1 || y0 > y3 || y3 >= y1) {
        i = (y3 < y0) << 1 | x3 < x0;
        parent = new Array(4), parent[i] = node, node = parent, z *= 2;
        switch (i) {
          case 0:
            x1 = x0 + z, y1 = y0 + z;
            break;
          case 1:
            x0 = x1 - z, y1 = y0 + z;
            break;
          case 2:
            x1 = x0 + z, y0 = y1 - z;
            break;
          case 3:
            x0 = x1 - z, y0 = y1 - z;
            break;
        }
      }
      if (this._root && this._root.length)
        this._root = node;
    }
    this._x0 = x0;
    this._y0 = y0;
    this._x1 = x1;
    this._y1 = y1;
    return this;
  }

  // node_modules/d3-quadtree/src/data.js
  function data_default2() {
    var data = [];
    this.visit(function(node) {
      if (!node.length)
        do
          data.push(node.data);
        while (node = node.next);
    });
    return data;
  }

  // node_modules/d3-quadtree/src/extent.js
  function extent_default(_) {
    return arguments.length ? this.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]];
  }

  // node_modules/d3-quadtree/src/quad.js
  function quad_default(node, x0, y0, x1, y1) {
    this.node = node;
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
  }

  // node_modules/d3-quadtree/src/find.js
  function find_default(x3, y3, radius) {
    var data, x0 = this._x0, y0 = this._y0, x1, y1, x22, y22, x32 = this._x1, y32 = this._y1, quads = [], node = this._root, q, i;
    if (node)
      quads.push(new quad_default(node, x0, y0, x32, y32));
    if (radius == null)
      radius = Infinity;
    else {
      x0 = x3 - radius, y0 = y3 - radius;
      x32 = x3 + radius, y32 = y3 + radius;
      radius *= radius;
    }
    while (q = quads.pop()) {
      if (!(node = q.node) || (x1 = q.x0) > x32 || (y1 = q.y0) > y32 || (x22 = q.x1) < x0 || (y22 = q.y1) < y0)
        continue;
      if (node.length) {
        var xm = (x1 + x22) / 2, ym = (y1 + y22) / 2;
        quads.push(new quad_default(node[3], xm, ym, x22, y22), new quad_default(node[2], x1, ym, xm, y22), new quad_default(node[1], xm, y1, x22, ym), new quad_default(node[0], x1, y1, xm, ym));
        if (i = (y3 >= ym) << 1 | x3 >= xm) {
          q = quads[quads.length - 1];
          quads[quads.length - 1] = quads[quads.length - 1 - i];
          quads[quads.length - 1 - i] = q;
        }
      } else {
        var dx = x3 - +this._x.call(null, node.data), dy = y3 - +this._y.call(null, node.data), d2 = dx * dx + dy * dy;
        if (d2 < radius) {
          var d = Math.sqrt(radius = d2);
          x0 = x3 - d, y0 = y3 - d;
          x32 = x3 + d, y32 = y3 + d;
          data = node.data;
        }
      }
    }
    return data;
  }

  // node_modules/d3-quadtree/src/remove.js
  function remove_default3(d) {
    if (isNaN(x3 = +this._x.call(null, d)) || isNaN(y3 = +this._y.call(null, d)))
      return this;
    var parent, node = this._root, retainer, previous, next, x0 = this._x0, y0 = this._y0, x1 = this._x1, y1 = this._y1, x3, y3, xm, ym, right, bottom, i, j;
    if (!node)
      return this;
    if (node.length)
      while (true) {
        if (right = x3 >= (xm = (x0 + x1) / 2))
          x0 = xm;
        else
          x1 = xm;
        if (bottom = y3 >= (ym = (y0 + y1) / 2))
          y0 = ym;
        else
          y1 = ym;
        if (!(parent = node, node = node[i = bottom << 1 | right]))
          return this;
        if (!node.length)
          break;
        if (parent[i + 1 & 3] || parent[i + 2 & 3] || parent[i + 3 & 3])
          retainer = parent, j = i;
      }
    while (node.data !== d)
      if (!(previous = node, node = node.next))
        return this;
    if (next = node.next)
      delete node.next;
    if (previous)
      return next ? previous.next = next : delete previous.next, this;
    if (!parent)
      return this._root = next, this;
    next ? parent[i] = next : delete parent[i];
    if ((node = parent[0] || parent[1] || parent[2] || parent[3]) && node === (parent[3] || parent[2] || parent[1] || parent[0]) && !node.length) {
      if (retainer)
        retainer[j] = node;
      else
        this._root = node;
    }
    return this;
  }
  function removeAll(data) {
    for (var i = 0, n = data.length; i < n; ++i)
      this.remove(data[i]);
    return this;
  }

  // node_modules/d3-quadtree/src/root.js
  function root_default() {
    return this._root;
  }

  // node_modules/d3-quadtree/src/size.js
  function size_default2() {
    var size = 0;
    this.visit(function(node) {
      if (!node.length)
        do
          ++size;
        while (node = node.next);
    });
    return size;
  }

  // node_modules/d3-quadtree/src/visit.js
  function visit_default(callback) {
    var quads = [], q, node = this._root, child, x0, y0, x1, y1;
    if (node)
      quads.push(new quad_default(node, this._x0, this._y0, this._x1, this._y1));
    while (q = quads.pop()) {
      if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1) && node.length) {
        var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
        if (child = node[3])
          quads.push(new quad_default(child, xm, ym, x1, y1));
        if (child = node[2])
          quads.push(new quad_default(child, x0, ym, xm, y1));
        if (child = node[1])
          quads.push(new quad_default(child, xm, y0, x1, ym));
        if (child = node[0])
          quads.push(new quad_default(child, x0, y0, xm, ym));
      }
    }
    return this;
  }

  // node_modules/d3-quadtree/src/visitAfter.js
  function visitAfter_default(callback) {
    var quads = [], next = [], q;
    if (this._root)
      quads.push(new quad_default(this._root, this._x0, this._y0, this._x1, this._y1));
    while (q = quads.pop()) {
      var node = q.node;
      if (node.length) {
        var child, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
        if (child = node[0])
          quads.push(new quad_default(child, x0, y0, xm, ym));
        if (child = node[1])
          quads.push(new quad_default(child, xm, y0, x1, ym));
        if (child = node[2])
          quads.push(new quad_default(child, x0, ym, xm, y1));
        if (child = node[3])
          quads.push(new quad_default(child, xm, ym, x1, y1));
      }
      next.push(q);
    }
    while (q = next.pop()) {
      callback(q.node, q.x0, q.y0, q.x1, q.y1);
    }
    return this;
  }

  // node_modules/d3-quadtree/src/x.js
  function defaultX(d) {
    return d[0];
  }
  function x_default(_) {
    return arguments.length ? (this._x = _, this) : this._x;
  }

  // node_modules/d3-quadtree/src/y.js
  function defaultY(d) {
    return d[1];
  }
  function y_default(_) {
    return arguments.length ? (this._y = _, this) : this._y;
  }

  // node_modules/d3-quadtree/src/quadtree.js
  function quadtree(nodes, x3, y3) {
    var tree = new Quadtree(x3 == null ? defaultX : x3, y3 == null ? defaultY : y3, NaN, NaN, NaN, NaN);
    return nodes == null ? tree : tree.addAll(nodes);
  }
  function Quadtree(x3, y3, x0, y0, x1, y1) {
    this._x = x3;
    this._y = y3;
    this._x0 = x0;
    this._y0 = y0;
    this._x1 = x1;
    this._y1 = y1;
    this._root = void 0;
  }
  function leaf_copy(leaf) {
    var copy2 = { data: leaf.data }, next = copy2;
    while (leaf = leaf.next)
      next = next.next = { data: leaf.data };
    return copy2;
  }
  var treeProto = quadtree.prototype = Quadtree.prototype;
  treeProto.copy = function() {
    var copy2 = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1), node = this._root, nodes, child;
    if (!node)
      return copy2;
    if (!node.length)
      return copy2._root = leaf_copy(node), copy2;
    nodes = [{ source: node, target: copy2._root = new Array(4) }];
    while (node = nodes.pop()) {
      for (var i = 0; i < 4; ++i) {
        if (child = node.source[i]) {
          if (child.length)
            nodes.push({ source: child, target: node.target[i] = new Array(4) });
          else
            node.target[i] = leaf_copy(child);
        }
      }
    }
    return copy2;
  };
  treeProto.add = add_default;
  treeProto.addAll = addAll;
  treeProto.cover = cover_default;
  treeProto.data = data_default2;
  treeProto.extent = extent_default;
  treeProto.find = find_default;
  treeProto.remove = remove_default3;
  treeProto.removeAll = removeAll;
  treeProto.root = root_default;
  treeProto.size = size_default2;
  treeProto.visit = visit_default;
  treeProto.visitAfter = visitAfter_default;
  treeProto.x = x_default;
  treeProto.y = y_default;

  // node_modules/d3-force/src/constant.js
  function constant_default4(x3) {
    return function() {
      return x3;
    };
  }

  // node_modules/d3-force/src/jiggle.js
  function jiggle_default(random) {
    return (random() - 0.5) * 1e-6;
  }

  // node_modules/d3-force/src/collide.js
  function x(d) {
    return d.x + d.vx;
  }
  function y(d) {
    return d.y + d.vy;
  }
  function collide_default(radius) {
    var nodes, radii, random, strength = 1, iterations = 1;
    if (typeof radius !== "function")
      radius = constant_default4(radius == null ? 1 : +radius);
    function force() {
      var i, n = nodes.length, tree, node, xi, yi, ri, ri2;
      for (var k = 0; k < iterations; ++k) {
        tree = quadtree(nodes, x, y).visitAfter(prepare);
        for (i = 0; i < n; ++i) {
          node = nodes[i];
          ri = radii[node.index], ri2 = ri * ri;
          xi = node.x + node.vx;
          yi = node.y + node.vy;
          tree.visit(apply);
        }
      }
      function apply(quad, x0, y0, x1, y1) {
        var data = quad.data, rj = quad.r, r = ri + rj;
        if (data) {
          if (data.index > node.index) {
            var x3 = xi - data.x - data.vx, y3 = yi - data.y - data.vy, l = x3 * x3 + y3 * y3;
            if (l < r * r) {
              if (x3 === 0)
                x3 = jiggle_default(random), l += x3 * x3;
              if (y3 === 0)
                y3 = jiggle_default(random), l += y3 * y3;
              l = (r - (l = Math.sqrt(l))) / l * strength;
              node.vx += (x3 *= l) * (r = (rj *= rj) / (ri2 + rj));
              node.vy += (y3 *= l) * r;
              data.vx -= x3 * (r = 1 - r);
              data.vy -= y3 * r;
            }
          }
          return;
        }
        return x0 > xi + r || x1 < xi - r || y0 > yi + r || y1 < yi - r;
      }
    }
    function prepare(quad) {
      if (quad.data)
        return quad.r = radii[quad.data.index];
      for (var i = quad.r = 0; i < 4; ++i) {
        if (quad[i] && quad[i].r > quad.r) {
          quad.r = quad[i].r;
        }
      }
    }
    function initialize() {
      if (!nodes)
        return;
      var i, n = nodes.length, node;
      radii = new Array(n);
      for (i = 0; i < n; ++i)
        node = nodes[i], radii[node.index] = +radius(node, i, nodes);
    }
    force.initialize = function(_nodes, _random) {
      nodes = _nodes;
      random = _random;
      initialize();
    };
    force.iterations = function(_) {
      return arguments.length ? (iterations = +_, force) : iterations;
    };
    force.strength = function(_) {
      return arguments.length ? (strength = +_, force) : strength;
    };
    force.radius = function(_) {
      return arguments.length ? (radius = typeof _ === "function" ? _ : constant_default4(+_), initialize(), force) : radius;
    };
    return force;
  }

  // node_modules/d3-force/src/link.js
  function index(d) {
    return d.index;
  }
  function find2(nodeById, nodeId) {
    var node = nodeById.get(nodeId);
    if (!node)
      throw new Error("node not found: " + nodeId);
    return node;
  }
  function link_default(links) {
    var id2 = index, strength = defaultStrength, strengths, distance = constant_default4(30), distances, nodes, count, bias, random, iterations = 1;
    if (links == null)
      links = [];
    function defaultStrength(link) {
      return 1 / Math.min(count[link.source.index], count[link.target.index]);
    }
    function force(alpha) {
      for (var k = 0, n = links.length; k < iterations; ++k) {
        for (var i = 0, link, source, target, x3, y3, l, b; i < n; ++i) {
          link = links[i], source = link.source, target = link.target;
          x3 = target.x + target.vx - source.x - source.vx || jiggle_default(random);
          y3 = target.y + target.vy - source.y - source.vy || jiggle_default(random);
          l = Math.sqrt(x3 * x3 + y3 * y3);
          l = (l - distances[i]) / l * alpha * strengths[i];
          x3 *= l, y3 *= l;
          target.vx -= x3 * (b = bias[i]);
          target.vy -= y3 * b;
          source.vx += x3 * (b = 1 - b);
          source.vy += y3 * b;
        }
      }
    }
    function initialize() {
      if (!nodes)
        return;
      var i, n = nodes.length, m2 = links.length, nodeById = new Map(nodes.map((d, i2) => [id2(d, i2, nodes), d])), link;
      for (i = 0, count = new Array(n); i < m2; ++i) {
        link = links[i], link.index = i;
        if (typeof link.source !== "object")
          link.source = find2(nodeById, link.source);
        if (typeof link.target !== "object")
          link.target = find2(nodeById, link.target);
        count[link.source.index] = (count[link.source.index] || 0) + 1;
        count[link.target.index] = (count[link.target.index] || 0) + 1;
      }
      for (i = 0, bias = new Array(m2); i < m2; ++i) {
        link = links[i], bias[i] = count[link.source.index] / (count[link.source.index] + count[link.target.index]);
      }
      strengths = new Array(m2), initializeStrength();
      distances = new Array(m2), initializeDistance();
    }
    function initializeStrength() {
      if (!nodes)
        return;
      for (var i = 0, n = links.length; i < n; ++i) {
        strengths[i] = +strength(links[i], i, links);
      }
    }
    function initializeDistance() {
      if (!nodes)
        return;
      for (var i = 0, n = links.length; i < n; ++i) {
        distances[i] = +distance(links[i], i, links);
      }
    }
    force.initialize = function(_nodes, _random) {
      nodes = _nodes;
      random = _random;
      initialize();
    };
    force.links = function(_) {
      return arguments.length ? (links = _, initialize(), force) : links;
    };
    force.id = function(_) {
      return arguments.length ? (id2 = _, force) : id2;
    };
    force.iterations = function(_) {
      return arguments.length ? (iterations = +_, force) : iterations;
    };
    force.strength = function(_) {
      return arguments.length ? (strength = typeof _ === "function" ? _ : constant_default4(+_), initializeStrength(), force) : strength;
    };
    force.distance = function(_) {
      return arguments.length ? (distance = typeof _ === "function" ? _ : constant_default4(+_), initializeDistance(), force) : distance;
    };
    return force;
  }

  // node_modules/d3-force/src/lcg.js
  var a = 1664525;
  var c = 1013904223;
  var m = 4294967296;
  function lcg_default() {
    let s = 1;
    return () => (s = (a * s + c) % m) / m;
  }

  // node_modules/d3-force/src/simulation.js
  function x2(d) {
    return d.x;
  }
  function y2(d) {
    return d.y;
  }
  var initialRadius = 10;
  var initialAngle = Math.PI * (3 - Math.sqrt(5));
  function simulation_default(nodes) {
    var simulation, alpha = 1, alphaMin = 1e-3, alphaDecay = 1 - Math.pow(alphaMin, 1 / 300), alphaTarget = 0, velocityDecay = 0.6, forces = /* @__PURE__ */ new Map(), stepper = timer(step), event = dispatch_default("tick", "end"), random = lcg_default();
    if (nodes == null)
      nodes = [];
    function step() {
      tick();
      event.call("tick", simulation);
      if (alpha < alphaMin) {
        stepper.stop();
        event.call("end", simulation);
      }
    }
    function tick(iterations) {
      var i, n = nodes.length, node;
      if (iterations === void 0)
        iterations = 1;
      for (var k = 0; k < iterations; ++k) {
        alpha += (alphaTarget - alpha) * alphaDecay;
        forces.forEach(function(force) {
          force(alpha);
        });
        for (i = 0; i < n; ++i) {
          node = nodes[i];
          if (node.fx == null)
            node.x += node.vx *= velocityDecay;
          else
            node.x = node.fx, node.vx = 0;
          if (node.fy == null)
            node.y += node.vy *= velocityDecay;
          else
            node.y = node.fy, node.vy = 0;
        }
      }
      return simulation;
    }
    function initializeNodes() {
      for (var i = 0, n = nodes.length, node; i < n; ++i) {
        node = nodes[i], node.index = i;
        if (node.fx != null)
          node.x = node.fx;
        if (node.fy != null)
          node.y = node.fy;
        if (isNaN(node.x) || isNaN(node.y)) {
          var radius = initialRadius * Math.sqrt(0.5 + i), angle = i * initialAngle;
          node.x = radius * Math.cos(angle);
          node.y = radius * Math.sin(angle);
        }
        if (isNaN(node.vx) || isNaN(node.vy)) {
          node.vx = node.vy = 0;
        }
      }
    }
    function initializeForce(force) {
      if (force.initialize)
        force.initialize(nodes, random);
      return force;
    }
    initializeNodes();
    return simulation = {
      tick,
      restart: function() {
        return stepper.restart(step), simulation;
      },
      stop: function() {
        return stepper.stop(), simulation;
      },
      nodes: function(_) {
        return arguments.length ? (nodes = _, initializeNodes(), forces.forEach(initializeForce), simulation) : nodes;
      },
      alpha: function(_) {
        return arguments.length ? (alpha = +_, simulation) : alpha;
      },
      alphaMin: function(_) {
        return arguments.length ? (alphaMin = +_, simulation) : alphaMin;
      },
      alphaDecay: function(_) {
        return arguments.length ? (alphaDecay = +_, simulation) : +alphaDecay;
      },
      alphaTarget: function(_) {
        return arguments.length ? (alphaTarget = +_, simulation) : alphaTarget;
      },
      velocityDecay: function(_) {
        return arguments.length ? (velocityDecay = 1 - _, simulation) : 1 - velocityDecay;
      },
      randomSource: function(_) {
        return arguments.length ? (random = _, forces.forEach(initializeForce), simulation) : random;
      },
      force: function(name, _) {
        return arguments.length > 1 ? (_ == null ? forces.delete(name) : forces.set(name, initializeForce(_)), simulation) : forces.get(name);
      },
      find: function(x3, y3, radius) {
        var i = 0, n = nodes.length, dx, dy, d2, node, closest;
        if (radius == null)
          radius = Infinity;
        else
          radius *= radius;
        for (i = 0; i < n; ++i) {
          node = nodes[i];
          dx = x3 - node.x;
          dy = y3 - node.y;
          d2 = dx * dx + dy * dy;
          if (d2 < radius)
            closest = node, radius = d2;
        }
        return closest;
      },
      on: function(name, _) {
        return arguments.length > 1 ? (event.on(name, _), simulation) : event.on(name);
      }
    };
  }

  // node_modules/d3-force/src/manyBody.js
  function manyBody_default() {
    var nodes, node, random, alpha, strength = constant_default4(-30), strengths, distanceMin2 = 1, distanceMax2 = Infinity, theta2 = 0.81;
    function force(_) {
      var i, n = nodes.length, tree = quadtree(nodes, x2, y2).visitAfter(accumulate);
      for (alpha = _, i = 0; i < n; ++i)
        node = nodes[i], tree.visit(apply);
    }
    function initialize() {
      if (!nodes)
        return;
      var i, n = nodes.length, node2;
      strengths = new Array(n);
      for (i = 0; i < n; ++i)
        node2 = nodes[i], strengths[node2.index] = +strength(node2, i, nodes);
    }
    function accumulate(quad) {
      var strength2 = 0, q, c2, weight = 0, x3, y3, i;
      if (quad.length) {
        for (x3 = y3 = i = 0; i < 4; ++i) {
          if ((q = quad[i]) && (c2 = Math.abs(q.value))) {
            strength2 += q.value, weight += c2, x3 += c2 * q.x, y3 += c2 * q.y;
          }
        }
        quad.x = x3 / weight;
        quad.y = y3 / weight;
      } else {
        q = quad;
        q.x = q.data.x;
        q.y = q.data.y;
        do
          strength2 += strengths[q.data.index];
        while (q = q.next);
      }
      quad.value = strength2;
    }
    function apply(quad, x1, _, x22) {
      if (!quad.value)
        return true;
      var x3 = quad.x - node.x, y3 = quad.y - node.y, w = x22 - x1, l = x3 * x3 + y3 * y3;
      if (w * w / theta2 < l) {
        if (l < distanceMax2) {
          if (x3 === 0)
            x3 = jiggle_default(random), l += x3 * x3;
          if (y3 === 0)
            y3 = jiggle_default(random), l += y3 * y3;
          if (l < distanceMin2)
            l = Math.sqrt(distanceMin2 * l);
          node.vx += x3 * quad.value * alpha / l;
          node.vy += y3 * quad.value * alpha / l;
        }
        return true;
      } else if (quad.length || l >= distanceMax2)
        return;
      if (quad.data !== node || quad.next) {
        if (x3 === 0)
          x3 = jiggle_default(random), l += x3 * x3;
        if (y3 === 0)
          y3 = jiggle_default(random), l += y3 * y3;
        if (l < distanceMin2)
          l = Math.sqrt(distanceMin2 * l);
      }
      do
        if (quad.data !== node) {
          w = strengths[quad.data.index] * alpha / l;
          node.vx += x3 * w;
          node.vy += y3 * w;
        }
      while (quad = quad.next);
    }
    force.initialize = function(_nodes, _random) {
      nodes = _nodes;
      random = _random;
      initialize();
    };
    force.strength = function(_) {
      return arguments.length ? (strength = typeof _ === "function" ? _ : constant_default4(+_), initialize(), force) : strength;
    };
    force.distanceMin = function(_) {
      return arguments.length ? (distanceMin2 = _ * _, force) : Math.sqrt(distanceMin2);
    };
    force.distanceMax = function(_) {
      return arguments.length ? (distanceMax2 = _ * _, force) : Math.sqrt(distanceMax2);
    };
    force.theta = function(_) {
      return arguments.length ? (theta2 = _ * _, force) : Math.sqrt(theta2);
    };
    return force;
  }

  // node_modules/d3-force/src/radial.js
  function radial_default(radius, x3, y3) {
    var nodes, strength = constant_default4(0.1), strengths, radiuses;
    if (typeof radius !== "function")
      radius = constant_default4(+radius);
    if (x3 == null)
      x3 = 0;
    if (y3 == null)
      y3 = 0;
    function force(alpha) {
      for (var i = 0, n = nodes.length; i < n; ++i) {
        var node = nodes[i], dx = node.x - x3 || 1e-6, dy = node.y - y3 || 1e-6, r = Math.sqrt(dx * dx + dy * dy), k = (radiuses[i] - r) * strengths[i] * alpha / r;
        node.vx += dx * k;
        node.vy += dy * k;
      }
    }
    function initialize() {
      if (!nodes)
        return;
      var i, n = nodes.length;
      strengths = new Array(n);
      radiuses = new Array(n);
      for (i = 0; i < n; ++i) {
        radiuses[i] = +radius(nodes[i], i, nodes);
        strengths[i] = isNaN(radiuses[i]) ? 0 : +strength(nodes[i], i, nodes);
      }
    }
    force.initialize = function(_) {
      nodes = _, initialize();
    };
    force.strength = function(_) {
      return arguments.length ? (strength = typeof _ === "function" ? _ : constant_default4(+_), initialize(), force) : strength;
    };
    force.radius = function(_) {
      return arguments.length ? (radius = typeof _ === "function" ? _ : constant_default4(+_), initialize(), force) : radius;
    };
    force.x = function(_) {
      return arguments.length ? (x3 = +_, force) : x3;
    };
    force.y = function(_) {
      return arguments.length ? (y3 = +_, force) : y3;
    };
    return force;
  }

  // node_modules/d3-format/src/formatDecimal.js
  function formatDecimal_default(x3) {
    return Math.abs(x3 = Math.round(x3)) >= 1e21 ? x3.toLocaleString("en").replace(/,/g, "") : x3.toString(10);
  }
  function formatDecimalParts(x3, p) {
    if ((i = (x3 = p ? x3.toExponential(p - 1) : x3.toExponential()).indexOf("e")) < 0)
      return null;
    var i, coefficient = x3.slice(0, i);
    return [
      coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
      +x3.slice(i + 1)
    ];
  }

  // node_modules/d3-format/src/exponent.js
  function exponent_default(x3) {
    return x3 = formatDecimalParts(Math.abs(x3)), x3 ? x3[1] : NaN;
  }

  // node_modules/d3-format/src/formatGroup.js
  function formatGroup_default(grouping, thousands) {
    return function(value, width) {
      var i = value.length, t = [], j = 0, g = grouping[0], length = 0;
      while (i > 0 && g > 0) {
        if (length + g + 1 > width)
          g = Math.max(1, width - length);
        t.push(value.substring(i -= g, i + g));
        if ((length += g + 1) > width)
          break;
        g = grouping[j = (j + 1) % grouping.length];
      }
      return t.reverse().join(thousands);
    };
  }

  // node_modules/d3-format/src/formatNumerals.js
  function formatNumerals_default(numerals) {
    return function(value) {
      return value.replace(/[0-9]/g, function(i) {
        return numerals[+i];
      });
    };
  }

  // node_modules/d3-format/src/formatSpecifier.js
  var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
  function formatSpecifier(specifier) {
    if (!(match = re.exec(specifier)))
      throw new Error("invalid format: " + specifier);
    var match;
    return new FormatSpecifier({
      fill: match[1],
      align: match[2],
      sign: match[3],
      symbol: match[4],
      zero: match[5],
      width: match[6],
      comma: match[7],
      precision: match[8] && match[8].slice(1),
      trim: match[9],
      type: match[10]
    });
  }
  formatSpecifier.prototype = FormatSpecifier.prototype;
  function FormatSpecifier(specifier) {
    this.fill = specifier.fill === void 0 ? " " : specifier.fill + "";
    this.align = specifier.align === void 0 ? ">" : specifier.align + "";
    this.sign = specifier.sign === void 0 ? "-" : specifier.sign + "";
    this.symbol = specifier.symbol === void 0 ? "" : specifier.symbol + "";
    this.zero = !!specifier.zero;
    this.width = specifier.width === void 0 ? void 0 : +specifier.width;
    this.comma = !!specifier.comma;
    this.precision = specifier.precision === void 0 ? void 0 : +specifier.precision;
    this.trim = !!specifier.trim;
    this.type = specifier.type === void 0 ? "" : specifier.type + "";
  }
  FormatSpecifier.prototype.toString = function() {
    return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
  };

  // node_modules/d3-format/src/formatTrim.js
  function formatTrim_default(s) {
    out:
      for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
        switch (s[i]) {
          case ".":
            i0 = i1 = i;
            break;
          case "0":
            if (i0 === 0)
              i0 = i;
            i1 = i;
            break;
          default:
            if (!+s[i])
              break out;
            if (i0 > 0)
              i0 = 0;
            break;
        }
      }
    return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
  }

  // node_modules/d3-format/src/formatPrefixAuto.js
  var prefixExponent;
  function formatPrefixAuto_default(x3, p) {
    var d = formatDecimalParts(x3, p);
    if (!d)
      return x3 + "";
    var coefficient = d[0], exponent = d[1], i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1, n = coefficient.length;
    return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimalParts(x3, Math.max(0, p + i - 1))[0];
  }

  // node_modules/d3-format/src/formatRounded.js
  function formatRounded_default(x3, p) {
    var d = formatDecimalParts(x3, p);
    if (!d)
      return x3 + "";
    var coefficient = d[0], exponent = d[1];
    return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
  }

  // node_modules/d3-format/src/formatTypes.js
  var formatTypes_default = {
    "%": (x3, p) => (x3 * 100).toFixed(p),
    "b": (x3) => Math.round(x3).toString(2),
    "c": (x3) => x3 + "",
    "d": formatDecimal_default,
    "e": (x3, p) => x3.toExponential(p),
    "f": (x3, p) => x3.toFixed(p),
    "g": (x3, p) => x3.toPrecision(p),
    "o": (x3) => Math.round(x3).toString(8),
    "p": (x3, p) => formatRounded_default(x3 * 100, p),
    "r": formatRounded_default,
    "s": formatPrefixAuto_default,
    "X": (x3) => Math.round(x3).toString(16).toUpperCase(),
    "x": (x3) => Math.round(x3).toString(16)
  };

  // node_modules/d3-format/src/identity.js
  function identity_default(x3) {
    return x3;
  }

  // node_modules/d3-format/src/locale.js
  var map = Array.prototype.map;
  var prefixes = ["y", "z", "a", "f", "p", "n", "\xB5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
  function locale_default(locale2) {
    var group = locale2.grouping === void 0 || locale2.thousands === void 0 ? identity_default : formatGroup_default(map.call(locale2.grouping, Number), locale2.thousands + ""), currencyPrefix = locale2.currency === void 0 ? "" : locale2.currency[0] + "", currencySuffix = locale2.currency === void 0 ? "" : locale2.currency[1] + "", decimal = locale2.decimal === void 0 ? "." : locale2.decimal + "", numerals = locale2.numerals === void 0 ? identity_default : formatNumerals_default(map.call(locale2.numerals, String)), percent = locale2.percent === void 0 ? "%" : locale2.percent + "", minus = locale2.minus === void 0 ? "\u2212" : locale2.minus + "", nan = locale2.nan === void 0 ? "NaN" : locale2.nan + "";
    function newFormat(specifier) {
      specifier = formatSpecifier(specifier);
      var fill = specifier.fill, align = specifier.align, sign = specifier.sign, symbol = specifier.symbol, zero3 = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type2 = specifier.type;
      if (type2 === "n")
        comma = true, type2 = "g";
      else if (!formatTypes_default[type2])
        precision === void 0 && (precision = 12), trim = true, type2 = "g";
      if (zero3 || fill === "0" && align === "=")
        zero3 = true, fill = "0", align = "=";
      var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type2) ? "0" + type2.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type2) ? percent : "";
      var formatType = formatTypes_default[type2], maybeSuffix = /[defgprs%]/.test(type2);
      precision = precision === void 0 ? 6 : /[gprs]/.test(type2) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
      function format2(value) {
        var valuePrefix = prefix, valueSuffix = suffix, i, n, c2;
        if (type2 === "c") {
          valueSuffix = formatType(value) + valueSuffix;
          value = "";
        } else {
          value = +value;
          var valueNegative = value < 0 || 1 / value < 0;
          value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
          if (trim)
            value = formatTrim_default(value);
          if (valueNegative && +value === 0 && sign !== "+")
            valueNegative = false;
          valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
          valueSuffix = (type2 === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");
          if (maybeSuffix) {
            i = -1, n = value.length;
            while (++i < n) {
              if (c2 = value.charCodeAt(i), 48 > c2 || c2 > 57) {
                valueSuffix = (c2 === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                value = value.slice(0, i);
                break;
              }
            }
          }
        }
        if (comma && !zero3)
          value = group(value, Infinity);
        var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
        if (comma && zero3)
          value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
        switch (align) {
          case "<":
            value = valuePrefix + value + valueSuffix + padding;
            break;
          case "=":
            value = valuePrefix + padding + value + valueSuffix;
            break;
          case "^":
            value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
            break;
          default:
            value = padding + valuePrefix + value + valueSuffix;
            break;
        }
        return numerals(value);
      }
      format2.toString = function() {
        return specifier + "";
      };
      return format2;
    }
    function formatPrefix2(specifier, value) {
      var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)), e = Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3, k = Math.pow(10, -e), prefix = prefixes[8 + e / 3];
      return function(value2) {
        return f(k * value2) + prefix;
      };
    }
    return {
      format: newFormat,
      formatPrefix: formatPrefix2
    };
  }

  // node_modules/d3-format/src/defaultLocale.js
  var locale;
  var format;
  var formatPrefix;
  defaultLocale({
    thousands: ",",
    grouping: [3],
    currency: ["$", ""]
  });
  function defaultLocale(definition) {
    locale = locale_default(definition);
    format = locale.format;
    formatPrefix = locale.formatPrefix;
    return locale;
  }

  // node_modules/d3-format/src/precisionFixed.js
  function precisionFixed_default(step) {
    return Math.max(0, -exponent_default(Math.abs(step)));
  }

  // node_modules/d3-format/src/precisionPrefix.js
  function precisionPrefix_default(step, value) {
    return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3 - exponent_default(Math.abs(step)));
  }

  // node_modules/d3-format/src/precisionRound.js
  function precisionRound_default(step, max2) {
    step = Math.abs(step), max2 = Math.abs(max2) - step;
    return Math.max(0, exponent_default(max2) - exponent_default(step)) + 1;
  }

  // node_modules/d3-polygon/src/centroid.js
  function centroid_default(polygon) {
    var i = -1, n = polygon.length, x3 = 0, y3 = 0, a2, b = polygon[n - 1], c2, k = 0;
    while (++i < n) {
      a2 = b;
      b = polygon[i];
      k += c2 = a2[0] * b[1] - b[0] * a2[1];
      x3 += (a2[0] + b[0]) * c2;
      y3 += (a2[1] + b[1]) * c2;
    }
    return k *= 3, [x3 / k, y3 / k];
  }

  // node_modules/d3-polygon/src/contains.js
  function contains_default(polygon, point) {
    var n = polygon.length, p = polygon[n - 1], x3 = point[0], y3 = point[1], x0 = p[0], y0 = p[1], x1, y1, inside = false;
    for (var i = 0; i < n; ++i) {
      p = polygon[i], x1 = p[0], y1 = p[1];
      if (y1 > y3 !== y0 > y3 && x3 < (x0 - x1) * (y3 - y1) / (y0 - y1) + x1)
        inside = !inside;
      x0 = x1, y0 = y1;
    }
    return inside;
  }

  // node_modules/d3-scale/src/init.js
  function initRange(domain, range2) {
    switch (arguments.length) {
      case 0:
        break;
      case 1:
        this.range(domain);
        break;
      default:
        this.range(range2).domain(domain);
        break;
    }
    return this;
  }

  // node_modules/d3-scale/src/constant.js
  function constants(x3) {
    return function() {
      return x3;
    };
  }

  // node_modules/d3-scale/src/number.js
  function number3(x3) {
    return +x3;
  }

  // node_modules/d3-scale/src/continuous.js
  var unit = [0, 1];
  function identity2(x3) {
    return x3;
  }
  function normalize(a2, b) {
    return (b -= a2 = +a2) ? function(x3) {
      return (x3 - a2) / b;
    } : constants(isNaN(b) ? NaN : 0.5);
  }
  function clamper(a2, b) {
    var t;
    if (a2 > b)
      t = a2, a2 = b, b = t;
    return function(x3) {
      return Math.max(a2, Math.min(b, x3));
    };
  }
  function bimap(domain, range2, interpolate) {
    var d0 = domain[0], d1 = domain[1], r0 = range2[0], r1 = range2[1];
    if (d1 < d0)
      d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
    else
      d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
    return function(x3) {
      return r0(d0(x3));
    };
  }
  function polymap(domain, range2, interpolate) {
    var j = Math.min(domain.length, range2.length) - 1, d = new Array(j), r = new Array(j), i = -1;
    if (domain[j] < domain[0]) {
      domain = domain.slice().reverse();
      range2 = range2.slice().reverse();
    }
    while (++i < j) {
      d[i] = normalize(domain[i], domain[i + 1]);
      r[i] = interpolate(range2[i], range2[i + 1]);
    }
    return function(x3) {
      var i2 = bisect_default(domain, x3, 1, j) - 1;
      return r[i2](d[i2](x3));
    };
  }
  function copy(source, target) {
    return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
  }
  function transformer() {
    var domain = unit, range2 = unit, interpolate = value_default, transform2, untransform, unknown, clamp = identity2, piecewise, output, input;
    function rescale() {
      var n = Math.min(domain.length, range2.length);
      if (clamp !== identity2)
        clamp = clamper(domain[0], domain[n - 1]);
      piecewise = n > 2 ? polymap : bimap;
      output = input = null;
      return scale2;
    }
    function scale2(x3) {
      return x3 == null || isNaN(x3 = +x3) ? unknown : (output || (output = piecewise(domain.map(transform2), range2, interpolate)))(transform2(clamp(x3)));
    }
    scale2.invert = function(y3) {
      return clamp(untransform((input || (input = piecewise(range2, domain.map(transform2), number_default)))(y3)));
    };
    scale2.domain = function(_) {
      return arguments.length ? (domain = Array.from(_, number3), rescale()) : domain.slice();
    };
    scale2.range = function(_) {
      return arguments.length ? (range2 = Array.from(_), rescale()) : range2.slice();
    };
    scale2.rangeRound = function(_) {
      return range2 = Array.from(_), interpolate = round_default, rescale();
    };
    scale2.clamp = function(_) {
      return arguments.length ? (clamp = _ ? true : identity2, rescale()) : clamp !== identity2;
    };
    scale2.interpolate = function(_) {
      return arguments.length ? (interpolate = _, rescale()) : interpolate;
    };
    scale2.unknown = function(_) {
      return arguments.length ? (unknown = _, scale2) : unknown;
    };
    return function(t, u4) {
      transform2 = t, untransform = u4;
      return rescale();
    };
  }
  function continuous() {
    return transformer()(identity2, identity2);
  }

  // node_modules/d3-scale/src/tickFormat.js
  function tickFormat(start2, stop, count, specifier) {
    var step = tickStep(start2, stop, count), precision;
    specifier = formatSpecifier(specifier == null ? ",f" : specifier);
    switch (specifier.type) {
      case "s": {
        var value = Math.max(Math.abs(start2), Math.abs(stop));
        if (specifier.precision == null && !isNaN(precision = precisionPrefix_default(step, value)))
          specifier.precision = precision;
        return formatPrefix(specifier, value);
      }
      case "":
      case "e":
      case "g":
      case "p":
      case "r": {
        if (specifier.precision == null && !isNaN(precision = precisionRound_default(step, Math.max(Math.abs(start2), Math.abs(stop)))))
          specifier.precision = precision - (specifier.type === "e");
        break;
      }
      case "f":
      case "%": {
        if (specifier.precision == null && !isNaN(precision = precisionFixed_default(step)))
          specifier.precision = precision - (specifier.type === "%") * 2;
        break;
      }
    }
    return format(specifier);
  }

  // node_modules/d3-scale/src/linear.js
  function linearish(scale2) {
    var domain = scale2.domain;
    scale2.ticks = function(count) {
      var d = domain();
      return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
    };
    scale2.tickFormat = function(count, specifier) {
      var d = domain();
      return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
    };
    scale2.nice = function(count) {
      if (count == null)
        count = 10;
      var d = domain();
      var i0 = 0;
      var i1 = d.length - 1;
      var start2 = d[i0];
      var stop = d[i1];
      var prestep;
      var step;
      var maxIter = 10;
      if (stop < start2) {
        step = start2, start2 = stop, stop = step;
        step = i0, i0 = i1, i1 = step;
      }
      while (maxIter-- > 0) {
        step = tickIncrement(start2, stop, count);
        if (step === prestep) {
          d[i0] = start2;
          d[i1] = stop;
          return domain(d);
        } else if (step > 0) {
          start2 = Math.floor(start2 / step) * step;
          stop = Math.ceil(stop / step) * step;
        } else if (step < 0) {
          start2 = Math.ceil(start2 * step) / step;
          stop = Math.floor(stop * step) / step;
        } else {
          break;
        }
        prestep = step;
      }
      return scale2;
    };
    return scale2;
  }
  function linear2() {
    var scale2 = continuous();
    scale2.copy = function() {
      return copy(scale2, linear2());
    };
    initRange.apply(scale2, arguments);
    return linearish(scale2);
  }

  // node_modules/d3-zoom/src/transform.js
  function Transform(k, x3, y3) {
    this.k = k;
    this.x = x3;
    this.y = y3;
  }
  Transform.prototype = {
    constructor: Transform,
    scale: function(k) {
      return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
    },
    translate: function(x3, y3) {
      return x3 === 0 & y3 === 0 ? this : new Transform(this.k, this.x + this.k * x3, this.y + this.k * y3);
    },
    apply: function(point) {
      return [point[0] * this.k + this.x, point[1] * this.k + this.y];
    },
    applyX: function(x3) {
      return x3 * this.k + this.x;
    },
    applyY: function(y3) {
      return y3 * this.k + this.y;
    },
    invert: function(location) {
      return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
    },
    invertX: function(x3) {
      return (x3 - this.x) / this.k;
    },
    invertY: function(y3) {
      return (y3 - this.y) / this.k;
    },
    rescaleX: function(x3) {
      return x3.copy().domain(x3.range().map(this.invertX, this).map(x3.invert, x3));
    },
    rescaleY: function(y3) {
      return y3.copy().domain(y3.range().map(this.invertY, this).map(y3.invert, y3));
    },
    toString: function() {
      return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
    }
  };
  var identity3 = new Transform(1, 0, 0);
  transform.prototype = Transform.prototype;
  function transform(node) {
    while (!node.__zoom)
      if (!(node = node.parentNode))
        return identity3;
    return node.__zoom;
  }

  // federjs/FederLayout/visDataHandler/hnsw/search/forceSearchView.ts
  var forceSearchView = (visData, targetOrigin = [0, 0], forceIterations = 100) => {
    return new Promise((resolve) => {
      const nodeId2dist = {};
      visData.forEach((levelData) => levelData.nodes.forEach((node) => nodeId2dist[node.id] = node.dist || 0));
      const nodeIds = Object.keys(nodeId2dist);
      const nodes = nodeIds.map((nodeId) => ({
        nodeId,
        dist: nodeId2dist[nodeId]
      }));
      const linksAll = visData.reduce((acc, cur) => acc.concat(cur.links), []);
      const links = deDupLink(linksAll);
      const targetNode = {
        nodeId: "target",
        dist: 0,
        fx: targetOrigin[0],
        fy: targetOrigin[1]
      };
      nodes.push(targetNode);
      const targetLinks = visData[0].fineIds.map((fineId) => ({
        source: `${fineId}`,
        target: "target",
        type: 0 /* None */
      }));
      links.push(...targetLinks);
      const rScale = linear2().domain(extent(nodes.filter((node) => node.dist > 0), (node) => node.dist)).range([10, 1e3]).clamp(true);
      const simulation = simulation_default(nodes).alphaDecay(1 - Math.pow(1e-3, 1 / forceIterations)).force("link", link_default(links).id((d) => `${d.nodeId}`).strength((d) => d.type === 0 /* None */ ? 2 : 0.4)).force("r", radial_default((node) => rScale(node.dist), targetOrigin[0], targetOrigin[1]).strength(1)).force("charge", manyBody_default().strength(-1e4)).on("end", () => {
        const id2forcePos = {};
        nodes.forEach((node) => id2forcePos[node.nodeId] = [node.x, node.y]);
        resolve(id2forcePos);
      });
    });
  };
  var forceSearchView_default = forceSearchView;

  // federjs/FederLayout/visDataHandler/hnsw/search/transformHandler.ts
  var transformHandler = (nodes, { levelCount, width, height, padding, xBias = 0.65, yBias = 0.4, yOver = 0.1 }) => {
    const layerWidth = width - padding[1] - padding[3];
    const layerHeight = (height - padding[0] - padding[2]) / (levelCount - (levelCount - 1) * yOver);
    const xRange = extent(nodes, (node) => node.x);
    const yRange = extent(nodes, (node) => node.y);
    const xOffset = padding[3] + layerWidth * xBias;
    const transformFunc = (x3, y3, level) => {
      const _x = (x3 - xRange[0]) / (xRange[1] - xRange[0]);
      const _y = (y3 - yRange[0]) / (yRange[1] - yRange[0]);
      const newX = xOffset + _x * layerWidth * (1 - xBias) - _y * layerWidth * xBias;
      const newY = padding[0] + layerHeight * (1 - yOver) * (levelCount - 1 - level) + _x * layerHeight * (1 - yBias) + _y * layerHeight * yBias;
      return [newX, newY];
    };
    const layerPos = [
      [layerWidth * xBias, 0],
      [layerWidth, layerHeight * (1 - yBias)],
      [layerWidth * (1 - xBias), layerHeight],
      [0, layerHeight * yBias]
    ];
    const layerPosLevels = Array(levelCount).fill(0).map((_, level) => layerPos.map((coord) => [
      coord[0] + padding[3],
      coord[1] + padding[0] + layerHeight * (1 - yOver) * (levelCount - 1 - level)
    ]));
    return { layerPosLevels, transformFunc };
  };
  var transformHandler_default = transformHandler;

  // federjs/FederLayout/visDataHandler/hnsw/search/computeSearchViewTransition.ts
  var computeSearchViewTransition = ({
    linksLevels,
    entryNodesLevels,
    interLevelGap = 1e3,
    intraLevelGap = 300
  }) => {
    let currentTime = 0;
    const targetShowTime = [];
    const nodeShowTime = {};
    const linkShowTime = {};
    let isPreLinkImportant = true;
    let isSourceChanged = true;
    let preSourceIdWithLevel = "";
    for (let level = linksLevels.length - 1; level >= 0; level--) {
      const links = linksLevels[level];
      if (links.length === 0) {
        const sourceId = entryNodesLevels[level].id;
        const sourceIdWithLevel = getNodeIdWithLevel(sourceId, level);
        nodeShowTime[sourceIdWithLevel] = currentTime;
      } else {
        links.forEach((link) => {
          const sourceId = link.source.id;
          const targetId = link.target.id;
          const sourceIdWithLevel = getNodeIdWithLevel(sourceId, level);
          const targetIdWithLevel = getNodeIdWithLevel(targetId, level);
          const linkIdWithLevel = getLinkIdWithLevel(sourceId, targetId, level);
          const isCurrentLinkImportant = link.type === 3 /* Searched */ || link.type === 4 /* Fine */;
          isSourceChanged = preSourceIdWithLevel !== sourceIdWithLevel;
          const isSourceEntry = !(sourceIdWithLevel in nodeShowTime);
          if (isSourceEntry) {
            if (level < linksLevels.length - 1) {
              const entryLinkIdWithLevel = getEntryLinkIdWithLevel(sourceId, level);
              linkShowTime[entryLinkIdWithLevel] = currentTime;
              const targetLinkIdWithLevel = getEntryLinkIdWithLevel("target", level);
              linkShowTime[targetLinkIdWithLevel] = currentTime;
              currentTime += interLevelGap;
              isPreLinkImportant = true;
            }
            targetShowTime[level] = currentTime;
            nodeShowTime[sourceIdWithLevel] = currentTime;
          }
          if (isPreLinkImportant || isCurrentLinkImportant || isSourceChanged) {
            currentTime += intraLevelGap;
          } else {
            currentTime += intraLevelGap * 0.5;
          }
          linkShowTime[linkIdWithLevel] = currentTime;
          if (!(targetIdWithLevel in nodeShowTime)) {
            nodeShowTime[targetIdWithLevel] = currentTime += intraLevelGap;
          }
          isPreLinkImportant = isCurrentLinkImportant;
          preSourceIdWithLevel = sourceIdWithLevel;
        });
      }
      currentTime += intraLevelGap;
      isPreLinkImportant = true;
      isSourceChanged = true;
    }
    return { targetShowTime, nodeShowTime, linkShowTime, duration: currentTime };
  };
  var computeSearchViewTransition_default = computeSearchViewTransition;

  // federjs/FederLayout/visDataHandler/hnsw/search/index.ts
  var searchViewLayoutHandler = (searchRecords, layoutParams) => __async(void 0, null, function* () {
    const visData = parseVisRecords_default(searchRecords);
    const {
      targetR,
      canvasScale = 1,
      targetOrigin,
      searchViewNodeBasicR,
      searchInterLevelTime,
      searchIntraLevelTime,
      forceIterations
    } = layoutParams;
    const id2forcePos = yield forceSearchView_default(visData, targetOrigin, forceIterations);
    const searchNodesLevels = visData.map((levelData) => levelData.nodes);
    searchNodesLevels.forEach((levelData) => levelData.forEach((node) => {
      node.forcePos = id2forcePos[node.id];
      node.x = node.forcePos[0];
      node.y = node.forcePos[1];
    }));
    const { layerPosLevels, transformFunc } = transformHandler_default(searchNodesLevels.reduce((acc, node) => acc.concat(node), []), layoutParams);
    const searchTarget = {
      id: "target",
      r: targetR * canvasScale,
      searchViewPosLevels: range(visData.length).map((i) => transformFunc(...targetOrigin, i))
    };
    searchNodesLevels.forEach((nodes, level) => {
      nodes.forEach((node) => {
        node.searchViewPosLevels = range(level + 1).map((i) => transformFunc(...node.forcePos, i));
        node.r = (searchViewNodeBasicR + node.type * 0.5) * canvasScale;
      });
    });
    const id2searchNode = {};
    searchNodesLevels.forEach((levelData) => levelData.forEach((node) => id2searchNode[node.id] = node));
    const searchLinksLevels = parseVisRecords_default(searchRecords).map((levelData) => levelData.links.filter((link) => link.type !== 0 /* None */));
    searchLinksLevels.forEach((levelData) => levelData.forEach((link) => {
      const sourceId = link.source;
      const targetId = link.target;
      const sourceNode = id2searchNode[sourceId];
      const targetNode = id2searchNode[targetId];
      link.source = sourceNode;
      link.target = targetNode;
    }));
    const entryNodesLevels = visData.map((levelData) => levelData.entryIds.map((id2) => id2searchNode[id2]));
    const { targetShowTime, nodeShowTime, linkShowTime, duration } = computeSearchViewTransition_default({
      linksLevels: searchLinksLevels,
      entryNodesLevels,
      interLevelGap: searchInterLevelTime,
      intraLevelGap: searchIntraLevelTime
    });
    return {
      visData,
      id2forcePos,
      searchTarget,
      entryNodesLevels,
      searchNodesLevels,
      searchLinksLevels,
      searchLayerPosLevels: layerPosLevels,
      searchTargetShowTime: targetShowTime,
      searchNodeShowTime: nodeShowTime,
      searchLinkShowTime: linkShowTime,
      searchTransitionDuration: duration,
      searchParams: searchRecords.searchParams
    };
  });

  // federjs/FederLayout/visDataHandler/hnsw/index.ts
  var searchViewLayoutHandlerMap = {
    ["default" /* default */]: searchViewLayoutHandler,
    ["hnsw3d" /* hnsw3d */]: searchViewLayoutHandler
  };
  var defaultHnswLayoutParams = {
    padding: [80, 200, 60, 220],
    forceTime: 3e3,
    layerDotNum: 20,
    shortenLineD: 8,
    overviewLinkLineWidth: 2,
    reachableLineWidth: 3,
    shortestPathLineWidth: 4,
    ellipseRation: 1.4,
    shadowBlur: 4,
    mouse2nodeBias: 3,
    highlightRadiusExt: 0.5,
    targetR: 3,
    searchViewNodeBasicR: 1.5,
    searchInterLevelTime: 300,
    searchIntraLevelTime: 100,
    HoveredPanelLine_1_x: 15,
    HoveredPanelLine_1_y: -25,
    HoveredPanelLine_2_x: 30,
    hoveredPanelLineWidth: 2,
    forceIterations: 100,
    targetOrigin: [0, 0]
  };
  var FederLayoutHnsw = class {
    constructor() {
    }
    computeOverviewVisData() {
      return {};
    }
    computeSearchViewVisData(viewType, searchRecords, layoutParams) {
      const searchViewLayoutHandler2 = searchViewLayoutHandlerMap[viewType];
      return searchViewLayoutHandler2(searchRecords, Object.assign({}, defaultHnswLayoutParams, layoutParams));
    }
  };

  // federjs/FederLayout/projector/umap.ts
  var import_umap_js = __toESM(require_dist(), 1);
  var fixedParams = {
    nComponents: 2
  };
  var umapProject = (projectParams = {}) => {
    const params = Object.assign({}, projectParams, fixedParams);
    return (vectors) => {
      const umap = new import_umap_js.UMAP(params);
      return umap.fit(vectors);
    };
  };

  // federjs/FederLayout/projector/index.ts
  var projectorMap = {
    ["umap" /* umap */]: umapProject
  };
  var getProjector = ({
    method,
    params = {}
  }) => {
    if (!(method in projectorMap)) {
      console.error(`No projector for [${method}]`);
    }
    return projectorMap[method](params);
  };
  var projector_default = getProjector;

  // federjs/FederLayout/visDataHandler/ivfflat/getVoronoi.ts
  function getVoronoi(clusters, width, height) {
    const delaunay = Delaunay.from(clusters.map((cluster) => [cluster.x, cluster.y]));
    const voronoi = delaunay.voronoi([0, 0, width, height]);
    return voronoi;
  }

  // federjs/FederLayout/visDataHandler/ivfflat/overview/index.ts
  var IvfflatOverviewLayout = (indexMeta, layoutParams) => {
    const {
      width,
      height,
      canvasScale,
      coarseSearchWithProjection,
      projectMethod,
      projectParams,
      minVoronoiRadius,
      numForceIterations
    } = layoutParams;
    return new Promise((resolve) => {
      const { ntotal } = indexMeta;
      const projector = coarseSearchWithProjection ? getProjector({
        method: projectMethod,
        params: projectParams
      }) : (vecs) => vecs.map((_) => [Math.random(), Math.random()]);
      const centroidProjectPos = projector(indexMeta.clusters.map((cluster) => cluster.centroidVector));
      const canvasWidth = width * canvasScale;
      const canvasHeight = height * canvasScale;
      const allArea = canvasWidth * canvasHeight;
      const clusters = indexMeta.clusters.map(({ clusterId, ids }, i) => ({
        clusterId,
        ids,
        oriProjection: centroidProjectPos[i],
        count: ids.length,
        countP: ids.length / ntotal,
        countArea: allArea * ids.length / ntotal
      }));
      const x3 = linear2().domain(extent(clusters, (cluster) => cluster.oriProjection[0])).range([0, canvasWidth]);
      const y3 = linear2().domain(extent(clusters, (cluster) => cluster.oriProjection[1])).range([0, canvasHeight]);
      clusters.forEach((cluster) => {
        cluster.x = x3(cluster.oriProjection[0]);
        cluster.y = y3(cluster.oriProjection[1]);
        cluster.r = Math.max(minVoronoiRadius * canvasScale, Math.sqrt(cluster.countArea / Math.PI));
      });
      const simulation = simulation_default(clusters).alphaDecay(1 - Math.pow(1e-3, 1 / numForceIterations)).force("collision", collide_default().radius((cluster) => cluster.r)).force("center", center_default(canvasWidth / 2, canvasHeight / 2)).on("tick", () => {
        clusters.forEach((cluster) => {
          cluster.x = Math.max(cluster.r, Math.min(canvasWidth - cluster.r, cluster.x));
          cluster.y = Math.max(cluster.r, Math.min(canvasHeight - cluster.r, cluster.y));
        });
      }).on("end", () => {
        clusters.forEach((cluster) => {
          cluster.forceProjection = [cluster.x, cluster.y];
        });
        const voronoi = getVoronoi(clusters, canvasWidth, canvasHeight);
        clusters.forEach((cluster, i) => {
          const points = voronoi.cellPolygon(i);
          points.pop();
          cluster.OVPolyPoints = points;
          cluster.OVPolyCentroid = centroid_default(points);
        });
        resolve(clusters);
      });
    });
  };
  var overview_default = IvfflatOverviewLayout;

  // federjs/FederLayout/visDataHandler/ivfflat/search/vecSort.ts
  var calAngle = (x3, y3) => {
    let angle = Math.atan(x3 / y3) / Math.PI * 180;
    if (angle < 0) {
      if (x3 < 0) {
        angle += 360;
      } else {
        angle += 180;
      }
    } else {
      if (x3 < 0) {
        angle += 180;
      }
    }
    return angle;
  };
  var vecSort = (vecs, layoutKey, returnKey) => {
    const center = {
      x: vecs.reduce((acc, c2) => acc + c2[layoutKey][0], 0) / vecs.length,
      y: vecs.reduce((acc, c2) => acc + c2[layoutKey][1], 0) / vecs.length
    };
    const angles = vecs.map((vec2) => ({
      _vecSortAngle: calAngle(vec2[layoutKey][0] - center.x, vec2[layoutKey][1] - center.y),
      _key: vec2[returnKey]
    }));
    angles.sort((a2, b) => a2._vecSortAngle - b._vecSortAngle);
    const res = angles.map((vec2) => vec2._key);
    return res;
  };

  // federjs/FederLayout/visDataHandler/ivfflat/search/coarseVoronoi.ts
  var ivfflatSearchViewLayoutCoarseVoronoi = (overviewClusters, searchRecords, layoutParams) => new Promise((resolve) => __async(void 0, null, function* () {
    const { nprobe, k } = searchRecords.searchParams;
    const searchViewClusters = JSON.parse(JSON.stringify(overviewClusters));
    searchViewClusters.forEach((cluster) => {
      cluster.x = cluster.forceProjection[0];
      cluster.y = cluster.forceProjection[1];
    });
    searchRecords.coarseSearchRecords.forEach(({ clusterId, distance }) => searchViewClusters[clusterId].distance = distance);
    searchRecords.nprobeClusterIds.forEach((nprobeClusterId) => searchViewClusters[nprobeClusterId].inNprobe = true);
    const nprobeClusters = searchViewClusters.filter((cluster) => cluster.inNprobe);
    const nprobeClusterOrder = vecSort(nprobeClusters, "OVPolyCentroid", "clusterId");
    const targetClusterId = searchRecords.coarseSearchRecords[0].clusterId;
    const targetCluster = searchViewClusters.find((cluster) => cluster.clusterId === targetClusterId);
    const notTargetNprobeClusterIds = nprobeClusterOrder.filter((clusterId) => clusterId !== targetClusterId);
    const notTargetNprobeClusters = notTargetNprobeClusterIds.map((clusterId) => nprobeClusters.find((cluster) => cluster.clusterId === clusterId));
    const notTargetNprobeClusterLinks = notTargetNprobeClusterIds.map((source) => ({
      source,
      target: targetClusterId
    }));
    const targetClusterX = nprobeClusters.reduce((acc, cluster) => acc + cluster.x, 0) / nprobe;
    const targetClusterY = nprobeClusters.reduce((acc, cluster) => acc + cluster.y, 0) / nprobe;
    targetCluster.x = targetClusterX;
    targetCluster.y = targetClusterY;
    const angleStep = 2 * Math.PI / (nprobe - 1);
    const biasR = targetCluster.r * 0.5;
    notTargetNprobeClusters.forEach((cluster, i) => {
      cluster.x = targetClusterX + biasR * Math.sin(angleStep * i);
      cluster.y = targetClusterY + biasR * Math.cos(angleStep * i);
    });
    const { numForceIterations, width, height, canvasScale, polarOriginBias } = layoutParams;
    const canvasWidth = width * canvasScale;
    const canvasHeight = height * canvasScale;
    const simulation = simulation_default(searchViewClusters).alphaDecay(1 - Math.pow(1e-3, 1 / numForceIterations)).force("links", link_default(notTargetNprobeClusterLinks).id((cluster) => cluster.clusterId).strength((_) => 0.25)).force("collision", collide_default().radius((cluster) => cluster.r).strength(0.1)).force("center", center_default(canvasWidth / 2, canvasHeight / 2)).on("tick", () => {
      searchViewClusters.forEach((cluster) => {
        cluster.x = Math.max(cluster.r, Math.min(canvasWidth - cluster.r, cluster.x));
        cluster.y = Math.max(cluster.r, Math.min(canvasHeight - cluster.r, cluster.y));
      });
    }).on("end", () => {
      searchViewClusters.forEach((cluster) => {
        cluster.SVPos = [cluster.x, cluster.y];
      });
      const voronoi = getVoronoi(searchViewClusters, canvasWidth, canvasHeight);
      searchViewClusters.forEach((cluster, i) => {
        const points = voronoi.cellPolygon(i);
        points.pop();
        cluster.SVPolyPoints = points;
        cluster.SVPolyCentroid = centroid_default(points);
      });
      const targetCluster2 = searchViewClusters.find((cluster) => cluster.clusterId === targetClusterId);
      const centoid_fineClusters_x = nprobeClusters.reduce((acc, cluster) => acc + cluster.SVPolyCentroid[0], 0) / nprobe;
      const centroid_fineClusters_y = nprobeClusters.reduce((acc, cluster) => acc + cluster.SVPolyCentroid[1], 0) / nprobe;
      const _x = centoid_fineClusters_x - targetCluster2.SVPos[0];
      const _y = centroid_fineClusters_y - targetCluster2.SVPos[1];
      const biasR2 = Math.sqrt(_x * _x + _y * _y);
      const targetNode = {
        clusterId: targetClusterId,
        SVPos: [
          targetCluster2.SVPos[0] + targetCluster2.r * 0.4 * (_x / biasR2),
          targetCluster2.SVPos[1] + targetCluster2.r * 0.4 * (_y / biasR2)
        ]
      };
      targetNode.isLeft_coarseLevel = targetNode.SVPos[0] < canvasWidth / 2;
      const polarOrigin = [
        canvasWidth / 2 + (targetNode.isLeft_coarseLevel ? -1 : 1) * polarOriginBias * canvasWidth,
        canvasHeight / 2
      ];
      targetNode.polarPos = polarOrigin;
      const polarMaxR = Math.min(canvasWidth, canvasHeight) * 0.5 - 5;
      const angleStep2 = Math.PI * 2 / nprobeClusterOrder.length;
      nprobeClusters.forEach((cluster) => {
        const order = nprobeClusterOrder.indexOf(cluster.clusterId);
        cluster.polarOrder = order;
        cluster.SVNextLevelPos = [
          polarOrigin[0] + polarMaxR / 2 * Math.sin(angleStep2 * order),
          polarOrigin[1] + polarMaxR / 2 * Math.cos(angleStep2 * order)
        ];
        cluster.SVNextLevelTran = [
          cluster.SVNextLevelPos[0] - cluster.SVPolyCentroid[0],
          cluster.SVNextLevelPos[1] - cluster.SVPolyCentroid[1]
        ];
      });
      resolve({ searchViewClusters, targetNode, polarOrigin, polarMaxR });
    });
  }));
  var coarseVoronoi_default = ivfflatSearchViewLayoutCoarseVoronoi;

  // federjs/Utils/index.ts
  var getPercentile = (items, key, p) => {
    if (items.length === 0)
      return -1;
    items.sort((a2, b) => a2[key] - b[key]);
    p = Math.min(p, 1);
    p = Math.max(p, 0);
    const k = Math.round(p * (items.length - 1));
    return items[k][key];
  };

  // federjs/FederLayout/visDataHandler/ivfflat/search/finePolar.ts
  var ivfflatSearchViewLayoutFinePolar = ({
    searchViewClusters,
    searchRecords,
    layoutParams,
    polarOrigin,
    polarMaxR
  }) => new Promise((resolve) => {
    const { numForceIterations, nonTopkNodeR, canvasScale } = layoutParams;
    const clusterId2cluster = {};
    searchViewClusters.forEach((cluster) => clusterId2cluster[cluster.clusterId] = cluster);
    const searchViewNodes = searchRecords.fineSearchRecords.map(({ id: id2, clusterId, distance }) => ({
      id: id2,
      clusterId,
      distance,
      inTopK: searchRecords.topKVectorIds.indexOf(id2) >= 0
    }));
    searchViewNodes.sort((a2, b) => a2.distance - b.distance);
    const minDis = getPercentile(searchViewNodes, "distance", 0);
    const maxDis = getPercentile(searchViewNodes, "distance", 0.97);
    const r = linear2().domain([minDis, maxDis]).range([polarMaxR * 0.2, polarMaxR]).clamp(true);
    searchViewNodes.forEach((node) => {
      const cluster = clusterId2cluster[node.clusterId];
      const { polarOrder, SVNextLevelPos } = cluster;
      node.polarOrder = polarOrder;
      const randAngle = Math.random() * Math.PI * 2;
      const randBias = [Math.sin, Math.cos].map((f) => cluster.r * Math.random() * 0.7 * f(randAngle));
      node.voronoiPos = SVNextLevelPos.map((d, i) => d + randBias[i]);
      node.x = node.voronoiPos[0];
      node.y = node.voronoiPos[1];
      node.r = r(node.distance);
    });
    const simulation = simulation_default(searchViewNodes).alphaDecay(1 - Math.pow(1e-3, 1 / numForceIterations * 2)).force("collide", collide_default().radius((_) => nonTopkNodeR * canvasScale).strength(0.4)).force("r", radial_default((node) => node.r, ...polarOrigin).strength(1)).on("end", () => {
      searchViewNodes.forEach((node) => {
        node.polarPos = [node.x, node.y];
      });
      resolve(searchViewNodes);
    });
  });
  var finePolar_default = ivfflatSearchViewLayoutFinePolar;

  // federjs/FederLayout/visDataHandler/ivfflat/search/fineProject.ts
  var ivfflatSearchViewLayoutFineProject = ({
    searchViewNodes,
    searchRecords,
    layoutParams
  }) => new Promise((resolve) => {
    const {
      projectPadding,
      width,
      height,
      canvasScale,
      fineSearchWithProjection,
      projectMethod,
      projectParams
    } = layoutParams;
    const projector = fineSearchWithProjection ? projector_default({
      method: projectMethod,
      params: projectParams
    }) : (vecs) => vecs.map((_) => [Math.random(), Math.random()]);
    const searchviewNodesProjection = projector(searchRecords.fineSearchRecords.map((node) => node.vector));
    searchViewNodes.forEach((node, i) => {
      node.projection = searchviewNodesProjection[i];
    });
    const x3 = linear2().domain(extent(searchViewNodes, (node) => node.projection[0])).range([
      projectPadding[3] * canvasScale,
      (width - projectPadding[1]) * canvasScale
    ]);
    const y3 = linear2().domain(extent(searchViewNodes, (node) => node.projection[1])).range([
      projectPadding[0] * canvasScale,
      (height - projectPadding[2]) * canvasScale
    ]);
    searchViewNodes.forEach((node) => {
      node.projectPos = [x3(node.projection[0]), y3(node.projection[1])];
    });
    resolve();
  });
  var fineProject_default = ivfflatSearchViewLayoutFineProject;

  // federjs/FederLayout/visDataHandler/ivfflat/search/index.ts
  var IvfflatSearchViewLayout = (overviewClusters, searchRecords, layoutParams) => {
    return new Promise((resolve) => __async(void 0, null, function* () {
      const { searchViewClusters, targetNode, polarOrigin, polarMaxR } = yield coarseVoronoi_default(overviewClusters, searchRecords, layoutParams);
      const searchViewNodes = yield finePolar_default({
        searchViewClusters,
        searchRecords,
        layoutParams,
        polarOrigin,
        polarMaxR
      });
      yield fineProject_default({
        searchViewNodes,
        searchRecords,
        layoutParams
      });
      resolve({ searchViewClusters, searchViewNodes, targetNode, polarOrigin });
    }));
  };
  var search_default = IvfflatSearchViewLayout;

  // federjs/FederLayout/visDataHandler/ivfflat/index.ts
  var overviewLayoutFuncMap = {
    ["default" /* default */]: overview_default
  };
  var searchViewLayoutFuncMap = {
    ["default" /* default */]: search_default
  };
  var layoutParamsIvfflatDefault = {
    numForceIterations: 100,
    width: 800,
    height: 480,
    canvasScale: 2,
    coarseSearchWithProjection: true,
    fineSearchWithProjection: true,
    projectMethod: "umap" /* umap */,
    projectParams: {},
    polarOriginBias: 0.15,
    nonTopkNodeR: 3,
    minVoronoiRadius: 5,
    projectPadding: [20, 30, 20, 30]
  };
  var FederLayoutIvfflat = class {
    constructor() {
      this.overviewLayoutParams = {};
    }
    computeOverviewVisData(viewType, indexMeta, _layoutParams) {
      return __async(this, null, function* () {
        const layoutParams = Object.assign({}, layoutParamsIvfflatDefault, _layoutParams);
        this.overviewLayoutParams = layoutParams;
        const overviewLayoutFunc = overviewLayoutFuncMap[viewType];
        const overviewClusters = yield overviewLayoutFunc(indexMeta, layoutParams);
        this.overviewClusters = overviewClusters;
        return overviewClusters;
      });
    }
    computeSearchViewVisData(viewType, searchRecords, _layoutParams, indexMeta) {
      return __async(this, null, function* () {
        const layoutParams = Object.assign({}, layoutParamsIvfflatDefault, _layoutParams);
        const searchViewLayoutFunc = searchViewLayoutFuncMap[viewType];
        let isSameLayoutParams = true;
        if (Object.keys(this.overviewLayoutParams).length !== Object.keys(layoutParams).length) {
          isSameLayoutParams = false;
        } else {
          for (let paramKey in this.overviewLayoutParams) {
            if (this.overviewLayoutParams[paramKey] !== layoutParams[paramKey]) {
              isSameLayoutParams = false;
              console.log("paramKey");
              break;
            }
          }
        }
        const shouldUpdateOverviewVisData = !this.overviewClusters || !isSameLayoutParams;
        const overviewClusters = shouldUpdateOverviewVisData ? yield this.computeOverviewVisData(viewType, indexMeta, layoutParams) : this.overviewClusters;
        return searchViewLayoutFunc(overviewClusters, searchRecords, layoutParams);
      });
    }
  };

  // federjs/FederLayout/index.ts
  var federLayoutHandlerMap = {
    ["hnsw" /* hnsw */]: FederLayoutHnsw,
    ["ivfflat" /* ivfflat */]: FederLayoutIvfflat
  };
  var FederLayout = class {
    constructor(federIndex) {
      this.federIndex = federIndex;
      this.indexType = federIndex.indexType;
      this.federLayoutHandler = new federLayoutHandlerMap[federIndex.indexType]();
      this.getIndexMetaPromise = new Promise((resolve) => __async(this, null, function* () {
        this.indexMeta = yield this.federIndex.getIndexMeta();
        resolve();
      }));
    }
    getOverviewVisData(_0) {
      return __async(this, arguments, function* ({
        actionData = {},
        viewType,
        layoutParams = {}
      }) {
        yield this.getIndexMetaPromise;
        return this.federLayoutHandler.computeOverviewVisData(viewType, this.indexMeta, layoutParams);
      });
    }
    getSearchViewVisData(_0) {
      return __async(this, arguments, function* ({
        actionData = {},
        viewType,
        layoutParams = {}
      }) {
        const searchRecords = yield this.federIndex.getSearchRecords(actionData.target, actionData.searchParams);
        console.log("searchRecords got!");
        return this.federLayoutHandler.computeSearchViewVisData(viewType, searchRecords, layoutParams, this.indexMeta);
      });
    }
    getVisData(_0) {
      return __async(this, arguments, function* ({
        actionType,
        actionData,
        viewType = "default" /* default */,
        layoutParams = {}
      }) {
        const visData = actionType === "search" /* search */ ? yield this.getSearchViewVisData({
          actionData,
          viewType,
          layoutParams
        }) : yield this.getOverviewVisData({ actionData, viewType, layoutParams });
        return {
          indexType: this.indexType,
          actionType,
          actionData,
          viewType,
          visData
        };
      });
    }
  };

  // federjs/FederView/InfoPanel/index.ts
  var infoPanel = class {
    constructor(styles = {}, viewParams = {}) {
    }
    init() {
    }
    setContext(context = null) {
    }
    setPosition(pos = null) {
    }
  };

  // federjs/FederView/hnswView/HnswSearchHnsw3dView.ts
  var HnswSearchHnsw3dView = class {
    constructor(visData, viewParams) {
      this.staticPanel = new infoPanel();
      this.clickedPanel = new infoPanel();
      this.hoveredPanel = new infoPanel();
      this.init(visData, viewParams);
    }
    init(visData, viewParams) {
    }
    render() {
    }
  };

  // federjs/FederView/hnswView/HnswSearchView.ts
  var HnswSearchView = class {
    constructor(visData, viewParams) {
      this.staticPanel = new infoPanel();
      this.clickedPanel = new infoPanel();
      this.hoveredPanel = new infoPanel();
      this.init(visData, viewParams);
    }
    init(visData, viewParams) {
    }
    render() {
    }
  };

  // federjs/FederView/renderUtils2D.ts
  var hexWithOpacity = (color2, opacity) => {
    let opacityString = Math.round(opacity * 255).toString(16);
    if (opacityString.length < 2) {
      opacityString = "0" + opacityString;
    }
    return color2 + opacityString;
  };
  var points2path = (points, closePath = false) => {
    return `M${points.join("L")}${closePath ? "Z" : ""}`;
  };
  var draw = ({
    ctx,
    drawFunc = () => {
    },
    fillStyle = "",
    strokeStyle = "",
    lineWidth = 0,
    lineCap = "butt",
    shadowColor = "",
    shadowBlur = 0,
    shadowOffsetX = 0,
    shadowOffsetY = 0,
    isFillLinearGradient = false,
    isStrokeLinearGradient = false,
    gradientPos = [0, 0, 100, 100],
    gradientStopColors = []
  }) => {
    ctx.save();
    let gradient = null;
    if (isFillLinearGradient || isStrokeLinearGradient) {
      gradient = ctx.createLinearGradient(...gradientPos);
      gradientStopColors.forEach((stopColor) => gradient.addColorStop(...stopColor));
    }
    ctx.fillStyle = isFillLinearGradient ? gradient : fillStyle;
    ctx.strokeStyle = isStrokeLinearGradient ? gradient : strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = lineCap;
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;
    drawFunc();
    ctx.restore();
  };
  var drawPolygons = (_a) => {
    var _b = _a, {
      ctx,
      pointsList,
      hasFill = false,
      hasStroke = false
    } = _b, styles = __objRest(_b, [
      "ctx",
      "pointsList",
      "hasFill",
      "hasStroke"
    ]);
    const drawFunc = () => {
      pointsList.forEach((points) => {
        const path = new Path2D(points2path(points, true));
        hasFill && ctx.fill(path);
        hasStroke && ctx.stroke(path);
      });
    };
    draw(__spreadValues({ ctx, drawFunc }, styles));
  };
  var drawCircles = (_a) => {
    var _b = _a, {
      ctx,
      circles,
      hasFill = false,
      hasStroke = false
    } = _b, styles = __objRest(_b, [
      "ctx",
      "circles",
      "hasFill",
      "hasStroke"
    ]);
    const drawFunc = () => {
      circles.forEach(([x3, y3, r]) => {
        ctx.beginPath();
        ctx.arc(x3, y3, r, 0, 2 * Math.PI);
        hasFill && ctx.fill();
        hasStroke && ctx.stroke();
      });
    };
    draw(__spreadValues({ ctx, drawFunc }, styles));
  };

  // federjs/FederView/ivfflatView/renderClusters.ts
  function renderClusters() {
    const {
      canvasScale,
      nonNprobeClusterFill,
      nonNprobeClusterOpacity,
      nonNprobeClusterStroke,
      nonNprobeClusterStrokeWidth,
      nprobeClusterFill,
      nprobeClusterOpacity,
      nprobeClusterStroke,
      nprobeClusterStrokeWidth,
      hoveredClusterFill,
      hoveredClusterOpacity,
      hoveredClusterStroke,
      hoveredClusterStrokeWidth
    } = this.viewParams;
    const nonNprobeClusters = this.searchViewClusters.filter((cluster) => !cluster.inNprobe);
    drawPolygons({
      ctx: this.ctx,
      pointsList: nonNprobeClusters.map((cluster) => cluster.SVPolyPoints),
      hasFill: true,
      fillStyle: hexWithOpacity(nonNprobeClusterFill, nonNprobeClusterOpacity),
      hasStroke: true,
      strokeStyle: nonNprobeClusterStroke,
      lineWidth: nonNprobeClusterStrokeWidth * canvasScale
    });
    const nprobeClusters = this.searchViewClusters.filter((cluster) => cluster.inNprobe);
    drawPolygons({
      ctx: this.ctx,
      pointsList: nprobeClusters.map((cluster) => cluster.SVPolyPoints),
      hasFill: true,
      fillStyle: hexWithOpacity(nprobeClusterFill, nprobeClusterOpacity),
      hasStroke: true,
      strokeStyle: nprobeClusterStroke,
      lineWidth: nprobeClusterStrokeWidth * canvasScale
    });
    this.hoveredCluster && drawPolygons({
      ctx: this.ctx,
      pointsList: [this.hoveredCluster.SVPolyPoints],
      hasFill: true,
      fillStyle: hexWithOpacity(hoveredClusterFill, hoveredClusterOpacity),
      hasStroke: true,
      strokeStyle: hoveredClusterStroke,
      lineWidth: hoveredClusterStrokeWidth * canvasScale
    });
  }

  // federjs/FederView/ivfflatView/renderTarget.ts
  function renderTarget() {
    const position = this.stepType === 0 /* voronoi */ ? this.targetNode.SVPos : this.targetNode.polarPos;
    const { canvasScale, targetOuterR, targetInnerR, targetNodeStroke } = this.viewParams;
    drawCircles({
      ctx: this.ctx,
      circles: [[...position, targetInnerR * canvasScale]],
      hasStroke: true,
      strokeStyle: targetNodeStroke,
      lineWidth: (targetOuterR - targetInnerR) * canvasScale
    });
  }

  // federjs/FederView/ivfflatView/renderNodes.ts
  function renderNodes() {
    const {
      canvasScale,
      topkNodeR,
      topkNodeOpacity,
      nonTopkNodeR,
      nonTopkNodeOpacity,
      highlightNodeR,
      highlightNodeStroke,
      highlightNodeStrokeWidth,
      highlightNodeOpacity
    } = this.viewParams;
    const nprobe = this.searchViewClusters.filter((cluster) => cluster.inNprobe).length;
    const colorScheme = range(nprobe).map((i) => hsl(360 * i / nprobe, 1, 0.5).formatHex());
    const getPos = this.stepType === 1 /* polar */ ? (node) => node.polarPos : (node) => node.projectPos;
    this.ctx.clearRect(0, 0, this.viewParams.width * canvasScale, this.viewParams.height * canvasScale);
    for (let i = 0; i < nprobe; i++) {
      const nodes = this.searchViewNodes.filter((node) => !node.inTopK).filter((node) => node.polarOrder === i);
      drawCircles({
        ctx: this.ctx,
        circles: nodes.map((node) => [
          ...getPos(node),
          nonTopkNodeR * canvasScale
        ]),
        hasFill: true,
        fillStyle: hexWithOpacity(colorScheme[i], nonTopkNodeOpacity)
      });
    }
    for (let i = 0; i < nprobe; i++) {
      const nodes = this.searchViewNodes.filter((node) => node.inTopK).filter((node) => node.polarOrder === i);
      drawCircles({
        ctx: this.ctx,
        circles: nodes.map((node) => [...getPos(node), topkNodeR * canvasScale]),
        hasFill: true,
        fillStyle: hexWithOpacity(colorScheme[i], topkNodeOpacity)
      });
    }
    this.hoveredNode && drawCircles({
      ctx: this.ctx,
      circles: [[...getPos(this.hoveredNode), highlightNodeR * canvasScale]],
      hasFill: true,
      fillStyle: hexWithOpacity(colorScheme[this.hoveredNode.polarOrder], highlightNodeOpacity),
      hasStroke: true,
      strokeStyle: highlightNodeStroke,
      lineWidth: highlightNodeStrokeWidth * canvasScale
    });
  }

  // federjs/FederView/ivfflatView/IvfflatSearchView.ts
  var defaltViewParamsIvfflat = {
    width: 800,
    height: 480,
    canvasScale: 2,
    nonNprobeClusterFill: "#175FFF",
    nonNprobeClusterOpacity: 1,
    nonNprobeClusterStroke: "#000",
    nonNprobeClusterStrokeWidth: 2,
    nprobeClusterFill: "#91FDFF",
    nprobeClusterOpacity: 1,
    nprobeClusterStroke: "#000",
    nprobeClusterStrokeWidth: 2,
    hoveredClusterFill: "#FFFC85",
    hoveredClusterOpacity: 0.8,
    hoveredClusterStroke: "#000",
    hoveredClusterStrokeWidth: 2,
    targetOuterR: 12,
    targetInnerR: 7,
    targetNodeStroke: "#fff",
    topkNodeR: 5,
    topkNodeOpacity: 0.7,
    nonTopkNodeR: 3,
    nonTopkNodeOpacity: 0.4,
    highlightNodeR: 6,
    highlightNodeStroke: "#fff",
    highlightNodeStrokeWidth: 1,
    highlightNodeOpacity: 1
  };
  var IvfflatSearchView3 = class {
    constructor(visData, viewParams) {
      this.hoveredCluster = null;
      this.hoveredNode = null;
      this.stepType = 0 /* voronoi */;
      this.mouseMoveHandler = null;
      this.mouseClickHandler = null;
      this.mouseLeaveHandler = null;
      const { searchViewClusters, searchViewNodes, targetNode, polarOrigin } = visData;
      this.searchViewClusters = searchViewClusters;
      this.searchViewNodes = searchViewNodes;
      this.targetNode = targetNode;
      this.polarOrigin = polarOrigin;
      this.viewParams = Object.assign({}, defaltViewParamsIvfflat, viewParams);
      this.init();
    }
    init() {
      this.initCanvas();
      this.initEventListener();
    }
    initCanvas() {
      const divD3 = create_default("div");
      this.node = divD3.node();
      const { width, height, canvasScale } = this.viewParams;
      const canvasD3 = divD3.append("canvas").attr("width", width).attr("height", height);
      this.ctx = canvasD3.node().getContext("2d");
      this.ctx.scale(1 / canvasScale, 1 / canvasScale);
    }
    initEventListener() {
      const { canvasScale } = this.viewParams;
      this.node.addEventListener("mousemove", (e) => {
        const { offsetX, offsetY } = e;
        const x3 = offsetX * canvasScale;
        const y3 = offsetY * canvasScale;
        this.mouseMoveHandler && this.mouseMoveHandler({ x: x3, y: y3 });
      });
      this.node.addEventListener("click", (e) => {
        const { offsetX, offsetY } = e;
        const x3 = offsetX * canvasScale;
        const y3 = offsetY * canvasScale;
        this.mouseClickHandler && this.mouseClickHandler({ x: x3, y: y3 });
      });
      this.node.addEventListener("mouseleave", () => {
        this.mouseLeaveHandler && this.mouseLeaveHandler();
      });
    }
    render() {
      this.renderProjectView();
    }
    renderVoronoiView() {
      this.stepType = 0 /* voronoi */;
      renderClusters.call(this);
      renderTarget.call(this);
      this.mouseClickHandler = null;
      this.mouseMoveHandler = ({ x: x3, y: y3 }) => {
        const hoveredCluster = this.searchViewClusters.find((cluster) => contains_default(cluster.SVPolyPoints, [x3, y3]));
        if (hoveredCluster !== this.hoveredCluster) {
          this.hoveredCluster = hoveredCluster;
          requestAnimationFrame(() => this.renderVoronoiView());
        }
      };
      this.mouseLeaveHandler = () => {
        this.hoveredCluster = null;
        requestAnimationFrame(() => this.renderVoronoiView());
      };
    }
    renderPolarView() {
      this.stepType = 1 /* polar */;
      this.renderNodesView();
    }
    renderProjectView() {
      this.stepType = 2 /* project */;
      this.renderNodesView();
    }
    renderNodesView() {
      renderNodes.call(this);
      this.mouseClickHandler = null;
      const { highlightNodeR, canvasScale } = this.viewParams;
      const mouseInNodeR = highlightNodeR * canvasScale;
      const threshold = mouseInNodeR * mouseInNodeR;
      const getPos = this.stepType === 1 /* polar */ ? (node) => node.polarPos : (node) => node.projectPos;
      this.mouseMoveHandler = ({ x: x3, y: y3 }) => {
        const distances = this.searchViewNodes.map((node) => getDisL2Square(getPos(node), [x3, y3]));
        const nearestNodeIndex = minIndex(distances);
        const hoveredNode = distances[nearestNodeIndex] < threshold ? this.searchViewNodes[nearestNodeIndex] : null;
        if (hoveredNode !== this.hoveredNode) {
          this.hoveredNode = hoveredNode;
          requestAnimationFrame(() => this.renderNodesView());
        }
      };
      this.mouseLeaveHandler = () => {
        this.hoveredNode = null;
        requestAnimationFrame(() => this.renderNodesView());
      };
    }
  };

  // federjs/FederView/index.ts
  var viewMap = {
    ["hnsw" /* hnsw */ + "search" /* search */ + "hnsw3d" /* hnsw3d */]: HnswSearchHnsw3dView,
    ["hnsw" /* hnsw */ + "search" /* search */ + "default" /* default */]: HnswSearchView,
    ["ivfflat" /* ivfflat */ + "search" /* search */ + "default" /* default */]: IvfflatSearchView3
  };
  var FederView = class {
    constructor({ indexType, actionType, viewType, visData }, viewParams) {
      this.view = new viewMap[indexType + actionType + viewType](visData, viewParams);
    }
    get node() {
      return this.view.node;
    }
    render() {
      this.view.render();
    }
  };

  // test/config.js
  var local = true;
  var ivfflatSource = "faiss";
  var ivfflatIndexFilePath = local ? "data/faiss_ivf_flat_voc_17k.index" : "https://assets.zilliz.com/faiss_ivf_flat_voc_17k_ab112eec72.index";

  // test/index.js
  var testVector = Array(512).fill(0).map((_) => Math.random());
  var testSearchParams = {
    k: 4,
    ef: 6,
    nprobe: 4
  };
  window.addEventListener("DOMContentLoaded", () => __async(void 0, null, function* () {
    const arrayBuffer = yield fetch(ivfflatIndexFilePath).then((res) => res.arrayBuffer());
    const federIndex = new FederIndex(ivfflatSource);
    federIndex.initByArrayBuffer(arrayBuffer);
    const federLayout = new FederLayout(federIndex);
    const visDataAll = yield federLayout.getVisData({
      actionType: "search",
      actionData: {
        target: testVector,
        searchParams: testSearchParams
      },
      viewType: "default",
      layoutParams: {}
    });
    console.log("visDataAll", visDataAll);
    const viewParams = {};
    const federView = new FederView(visDataAll, viewParams);
    console.log("federView", federView);
    document.querySelector("#container").appendChild(federView.node);
    federView.render();
  }));
})();
