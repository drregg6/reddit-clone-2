export default function(arr, id, id_type='id') {
  return arr.filter(el => el[id_type] === id)[0];
}