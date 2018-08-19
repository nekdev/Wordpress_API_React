export function mapObject(object, callback) {
  return Object.keys(object).map(function(key) {
    if (object[key] !== null && object[key] != "") {
      return callback(key, object[key]);
    }
  });
}
export function arrayToObject(array) {
  array.reduce((obj, item) => {
    obj[item.id] = item;
    return obj;
  }, {});
}
