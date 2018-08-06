export function mapObject(object, callback) {
  return Object.keys(object).map(function(key) {
    if (object[key] !== null && object[key] != "") {
      return callback(key, object[key]);
    }
  });
}
