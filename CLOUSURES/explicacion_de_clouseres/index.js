function contador() {
    let count = 0; // Variable privada dentro del closure

    return {  // retornamos un objeto
        incrementar: function() { // la primera propiedad es incremenetar y esta en utilizada para incrementar la variable count
            count++;
            console.log('Contador incrementado:', count);
        },
        decrementar: function() { // la segunda propiedad es restar  y esta en utilizada para restar la variable count
            count--;
            console.log('Contador decrementado:', count);
        },
        obtenerValor: function() { //Esta funcion simplemente obtiene el valor actual de count
            return count;
        }
    };
}

// Creamos una instancia de contador
const miContador = contador();

// Usamos los métodos del closure
miContador.incrementar(); // Salida: Contador incrementado: 1
miContador.incrementar(); // Salida: Contador incrementado: 2
miContador.decrementar(); // Salida: Contador decrementado: 1

console.log('Valor actual del contador:', miContador.obtenerValor()); // Salida: Valor actual del contador: 1
