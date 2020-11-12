export default function(arr, id, id_type, id='id') {
  console.log(id_type);
  return arr.filter(el => el[id_type] === id)[0];
}