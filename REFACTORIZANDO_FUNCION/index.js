//2- Refectoriza una funcion del siguiente codigo(CCODIGO DEJADO EN EL REPOSITORIO DEL TEAM LEADER Y SE SUPONE QUE ES PARA REFECTORIZAR UNA FUNCION DE LA MIMSA)



// Just playing around
class Person {

    constructor(name, age, spanElement) {
        this.name = name;
        this.age = age;
        this.spanElement = spanElement;
    }

    greet() {  // Minima aplicacion de los clouseres.
        const saludo= `Hola ${this.name} tu edad es ${this.age}`;
        return function(){
            console.log(saludo);
        }
    }

    changeSpanContent(content){
        this.spanElement.innerHTML = content;
    }

    concatenateTitleContent($titleContent, $titleElement){
        $titleElement.innerHTML += $titleContent;
    }

}

const $spanElement = document.getElementsByTagName('SPAN')[0]
const $btnChangeSpan = document.querySelector('BUTTON')
const nicolas = new Person('Nicolas', 25, document.getElementsByTagName('SPAN')[0])
$btnChangeSpan.addEventListener('click', () => {
    nicolas.changeSpanContent('Esto lo escribio Nicolas');
    nicolas.concatenateTitleContent(' Esto fue lo que agregó Nicolas al titulo', document.getElementsByTagName('H1')[0])
})

// con distpach event
const myCustomEvent = new Event('myCustomEvent')
$btnChangeSpan.addEventListener('myCustomEvent', () => {
    nicolas.changeSpanContent('Esto lo escribio Nicolas Desde MyCustomEvent');
    nicolas.concatenateTitleContent(' Esto fue lo que agregó Nicolas al titulo desde MyCustomEvent', document.getElementsByTagName('H1')[0])
    fetch('data.json').then(e => e.json()).then(e => console.log(e))
})

$btnChangeSpan.addEventListener('mouseover', () => {
    $btnChangeSpan.dispatchEvent(myCustomEvent)
});