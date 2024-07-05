

let nombre="fernando";
console.log(nombre);  //saldra error ya que con let es como si la variable no existirera 


var nombre2="pedro"; 
console.log(nombre2); //Saldra undefined ya que var se eleva hasta el ambito global ya que no estamos dentro de ninguna funcion por ejemplo por lo cual en el ambito global este se eleva y se inicializa en undefined.

const nombre3="jaime";
console.log(nombre3); //Ya ni hablar de const ya que tambien tiene el mimso comportamiento de let y no se eleva por lo que no existen en el ambito global en este caso 



comer();//En el caso de las funciones en distinto ya que uno de los primeros procesos que se hacen en javascript es el reconicimiento de funciones y estas se elevan para que se puedan usar sin ningun problema.


function comer(){
    console.log("Estamos comiendo");
}