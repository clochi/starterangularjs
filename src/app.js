setTimeout(() => alert('funca con es6 ;)'), 1000)

const miArray = [1,2,3,4,5,6,7,8,9,10];

let miVar = miArray.map((item) => {
  return `<p>Este es el ${item}</p>`
})

document.write(miVar)
