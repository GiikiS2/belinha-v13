let client = require("../index.js");

function rmvd(data) {
  return data.filter((value, index) => data.indexOf(value) === index);
}
let categorias = rmvd(client.commands.map((c) => c.categoria));

module.exports.categorias = categorias

function common (array1, array2){
  return array1.filter(value => array2.includes(value));
}

module.exports.common = common