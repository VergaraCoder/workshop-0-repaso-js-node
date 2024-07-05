class estado{  //creamos la clase 
    constructor(){} // dejamos el connstructor vacio 
    verEstado(){ //creamos un metodo que nos ayudara a ver el estado en el que esta l aplicacion
        let estado1="reposo";  // hay un estado activo pero hasta el momento no se puede ver
        return function(){  //retornamos una funcion que esta es la que se encargara de mostrar y de incluso cambiar el estado
            return{ // Esta funcion devolvera un objeto que es el encargado de cambiar y mostrar dichos estados
                active:function(){  // Esta primer propiedad tiene una funcion como valor 
                    estado1="activo"; //Cambia su estado a activo
                    console.log(estado1); //lo mostramos
                },
                inProcess:function (){  //otra propiedad con otra funcion interna encargada de cambiar y mostrar el estado
                    estado1="en proceso";
                    console.log(estado1);

                },
                finish:function(){  //otra propiedad con otra funcion interna encargada de cambiar y mostrar el estado
                    estado1="FInalizado";
                    console.log(estado1);

                }
            }
        }

    }
}

const estado1=new estado();  //instanciamos un objeto

const verEstadoAplicacion= estado1.verEstado(); //accedemos al metodo de verEstado que devuelve una funcion;

const verEstado2=verEstadoAplicacion(); //Esta otro funcion devolver el objeto que sera el encargado de cambiar el estado dependiendo de la propiedad escogida;

verEstado2.active();  //Accedemos a la propiedad que procede a activar el estado
verEstado2.finish();  //Accedemos a la propiedad que procese a finalizar el estado



