const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, cb) {
      const newArr = collection instanceof Array ? collection.slice() : Object.values(collection)
      for (let i = 0; i < newArr.length; i++) {
        cb(newArr[i])
      }
      return collection
    },

    map: function(arr, cb) {
      if (!(arr instanceof Array))
      arr = Object.values(arr)

      const newArr = []

      for (let idx = 0; idx < arr.length; idx++)
        newArr.push(cb(arr[idx]))

      return newArr
    },

    reduce: function(c, callback, acc) {
      let collection = c.slice(0)

			if (!acc) {
				acc = collection[0]
				collection = collection.slice(1)
			}

			let len = collection.length;

			for (let i = 0; i < len; i++) {
				acc = callback(acc, collection[i], collection)
			}
			return acc;
    },

    find: function(c, predicate) {
      if (!(c instanceof Array))
      c = Object.values(c)

      for (let idx = 0; idx < c.length; idx++)
        if (predicate(c[idx])) return c[idx]
      return undefined
    },

    filter: function(c, predicate) {
      if (!(c instanceof Array))
      c = Object.values(c)
      const newArr = []
      for (let idx = 0; idx < c.length; idx++)
        if (predicate(c[idx])) newArr.push(c[idx])
        return newArr
    },

    size: function(c) {
      if (!(c instanceof Array))
      c = Object.values(c)
      return c.length
    },

    first: function(arr, n=false) {
      return n ? arr.slice(0,n) : arr[0]
    },

    last: function(arr, n=false) {
      return n ? arr.slice(-n) : arr[arr.length-1]
    },
    
    compact: function(arr) {
      const newArr = []
      for (let i = 0; i < arr.length; i++) {
        if (!!arr[i] == true) newArr.push(arr[i])
      }
      return newArr
    },

    sortBy: function(collection, callback) {
      const newArr = [...collection]
      return newArr.sort(function(a, b) {
        return callback(a) - callback(b)
      })
    },

    unpack: function(receiver, arr) {
      for (let val of arr)
        receiver.push(val)
    },

    flatten: function(collection, shallow, newArr=[]) {
      if (!Array.isArray(collection)) return newArr.push(collection)
      if (shallow) {
        for (let val of collection)
          Array.isArray(val) ? this.unpack(newArr, val) : newArr.push(val)
      } else {
        for (let val of collection) {
          this.flatten(val, false, newArr)
        }
      }
      return newArr
    },

    uniqSorted: function(collection, iteratee) {
      const sorted = [collection[0]]
      for (let idx = 1; idx < collection.length; idx++) {
        if (sorted[idx-1] !== collection[idx])
          sorted.push(collection[idx])
      }
      return sorted
    },

    uniq: function(collection, sorted=false, iteratee=false) {
      if (sorted) {
        return fi.uniqSorted(collection, iteratee)
      } else if (!iteratee) {
        return Array.from(new Set(collection))
      } else {
        const modifiedVals = new Set()
        const uniqVals = new Set()
        for (let val of collection) {
          const moddedVal = iteratee(val)
          if (!modifiedVals.has(moddedVal)) {
            modifiedVals.add(moddedVal)
            uniqVals.add(val)
          }
        }
        return Array.from(uniqVals)
      }
    },

    keys: function(obj) {
      // Using for loop
      const keys = []
      for (let key in obj){
        keys.push(key)
      }
      return keys
    },

    values: function(obj) {
      // Using for loop
      const values = []
      for (let key in obj){
        values.push(obj[key])
      }
      return values

      // Using the custom 'map' method from above
      // return this.map(obj, (value) => value)

    },

    functions: function(obj) {
      const functionNames = []

      for (let key in obj) {
        if (typeof obj[key] === "function"){
          functionNames.push(key)
        }
      }

      return functionNames.sort()
    },


  }
})()

fi.libraryMethod()
