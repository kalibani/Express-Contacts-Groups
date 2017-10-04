function parsing(array, kategori){
  let hasil = []
  for (var i = 0; i < array.length; i++) {
    if (array[i].nilai > 80 && kategori =='A') {
      hasil.push(array[i])
    }if (array[i].nilai > 51 && array[i].nilai < 80 && kategori =='B') {
      hasil.push(array[i])
    }if (array[i].nilai < 50 && kategori =='C') {
      hasil.push(array[i])
    }
  }
  return hasil;
}

arrSiswa = [ { id: 202, name: 'Jainal', gender: 'Male', nilai: 90 },
  { id: 221, name: 'Amel', gender: 'Female', nilai: 75 },
  { id: 224, name: 'Sayyaf', gender: 'Male', nilai: 40 },
  { id: 302, name: 'Renata', gender: 'Female', nilai: 45 }];

console.log(parsing(arrSiswa, 'A')); //[{ id: 202, name: 'Jainal', gender: 'Male', nilai: 90 }];
console.log(parsing(arrSiswa, 'B')); //[{ id: 221, name: 'Amel', gender: 'Female', nilai: 75 }];
console.log(parsing(arrSiswa, 'C')); //[{ id: 224, name: 'Sayyaf', gender: 'Male', nilai: 40}, { id: 302, name: 'Renata', gender: 'Female', nilai: 45 }];
