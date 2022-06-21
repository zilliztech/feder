# Feder for Python

## 0.6.0

Support search-by-vector

```
searchByVec(vector [, imgUrl=None, isDisplayed=True])
```

## 0.7.0

Each action (search or overview) command generates a new div with a random id.

Different actions will no longer share an output cell.

## 0.8.0

Support chain functions.

```
federPy.setSearchParams(params).search()
```