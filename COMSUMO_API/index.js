const URLbase="https://jsonplaceholder.typicode.com/posts"; //Meto en una varibale la url de donde voy a consultar

const showData=(url)=>{  // funcion encargada de buscar, obtener y posteriormente dibujar estos datos
    fetch(url) //inicamos una peticion fetch que internamente devulve una promesa por eso el then aca abajo
    .then((response)=>{ // este then devolver una respuesta 
        if(!response.ok){ // Aca utilizamo el objeto response.ok que duelve un valor (true or false) si la peticion tuvo exito o no
            throw new Error("Hubo un error al traer los datos"); // En el caso de no haber tenido exito lanzamos un error con throw y damos una descripcion de error
        }
        return response.json();// En el caso de que halla saltado la intancia de error retornamos la respuesta y la convertimos a un objeto json. 
    })
    .then(data=>{ // aca recibimos la los datos masticados y listo para su uso
        showBeatiful(data); // llamamos a esta funcion que se encargara de dibujar toda la data
    })
    .catch(err=>{ // En el caso de haber un error hacemos lo siguiente
        const $err=document.querySelector("#error-message"); // llamamos a un div que conentra los errores que puedan surgir
        $err.innerHTML=err.message; // y como contenido lanzamos este error

        setTimeout(()=>{ // utilizamos este timer para que dicho error quede solamente por unos segundos pero que luego se borre
            $err.innerHTML="";
        },3000);
    })
}


const showBeatiful=(data)=>{  //Funcion encargada de dibujar en la pagina los datos de la peticion y estos datos son justamente el parametro 
   for(let i=0;i<data.length;i++){ // iniciamops un bucle for para recorrer los datos
    const $containerData=document.querySelector('#post-list');//Llamamos al container en el que se dibujaran estos datos 

    $containerData.innerHTML+=`
        <li class="mejor">
            <a>El UserId del usuario es <strong>${data[i].userId} </strong></a> <br>
            <a>El id del usuario es <strong>${data[i].id} </strong></a> <br>
            <a>El titulo del usuario es <strong>${data[i].title}</strong></a> <br>
            <a>El cuerpo del usuario es <strong> ${data[i].body}</strong></a> <br>
        </li>
    `; // Dibujamos los datos tomando en cuenta la posicion de la iteracion 
   }
}


const $button=document.getElementById('fetch-posts'); //Seleccionamos un boton que es el que desencadenara todo lo anterior

$button.addEventListener("click",()=>{ //hacemos un evento de click 
    showData(URLbase); // llamamos la funcion vista incialmente y como parametro la url a la que debe ir a buscar los datos
});

