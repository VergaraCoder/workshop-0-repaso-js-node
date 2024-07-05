const urlProducts="https://api.escuelajs.co/api/v1/products"; // url de productos a obtener

const $select=document.getElementById("platzi"); //Elemento html que se encarga de devolver un valor que se selecciono (etiqueta select)
const $selectFilter=document.getElementById("filter"); //Este elemento es otro select igual que el anterior solo que este se encarga de organizar los producto de las categorias por 2 parametros


const $containerMis=document.querySelector(".containerMistakes"); //Container creado para la aparicion de errores
const $container=document.querySelector(".containerProducts"); // container principal , este se encarga de estar para mostrar todos los productos 
const $inputFilter=document.querySelector(".inputSearch"); // Este input se encarga de buscar un producto por su precio
const $button=document.querySelector("#search"); // boton encargado de inciar los filtros


const object={  //Este objeto fue creado para saber de manera mas sencilla que opcion escogio el usuario ya que cada categoria no tiene su nombre como tal si no que tiene un identificador (id) para cada categoria
    electronics:2, //la categoria de elctronica o tecnologia tiene el id =2
    plan:3, //la categoria de plan tiene el id =3
    shoes:4, //la categoria de tenis tiene el id =4
    caps:5, //la categoria de gorras tiene el id =5
    watches:18, //la categoria de relojes tiene el id =18
    perfumes:19 //la categoria de perfumes tiene el id =19
}




const showProducts=(url,opcion)=>{  // fucnion encargada de mostrar los productos en pantalla   pasandole como parametro la url y la opcion escogida por el usuario
    fetch(url)  //hacemos la peticion con fetch 
    .then(response=>{ // pasamos la respuesta por un then 
        if(!response.ok){ // en el caso de la la respuesta de false significa que la peticion tuvo un inconveniente 
            throw new Error("No se pudo traer los datos"); //e instanciamos un error con un mensaje descriptivo
        }
        return response.json(); // si todo salio bien retornamos el objeto de respuesta ya convertido a json()
    })
    .then(data=>{ // A este punto ya el objeto esta listo para hacer operaciones con
        showData(data,opcion); // llammos a la funcion showData para que esta se encarge de dibujar los productos en la pagina y la pasamos los mismo parametros
    })
    .catch(err=>{ // en e caso de haber un error lo capturamos y hacemos algo con el
        $containerMis.innerHTML=err.message; // cojemos el contenedor de errores llamado anterioemnete y le ponemos el mensaje de error
        setTimeout(()=>{ // usamos en timer para mostrar el error por unos cuantos segundos para luego borrarlo
            $containerMis.innerHTML="";
        },3000);
    })
}


const showProducts2=(url,opcion,category)=>{ //  funcion encargada de hacer casi lo mimo que la anterior solo que esta se encarga de luego llamar a una funcion que esta aca dentro para que filtre , por eso esta funcion tiene 3 parametros
    fetch(url) //hacemos la peticion con fetch esperando una promesa
    .then(response=>{ // cojemos a respuesta para procesarla 
        if(!response.ok){ // en el caso de que la respuesta halla sido negativa
            throw new Error("No se pudo traer los datos");  // instanciamos un error con su descripcion
        }
        return response.json(); // si todo salio bien retornamos el objeto ya convertido  json()
    })
    .then(data=>{ // ya con el dato listo 
        filter(data,opcion,category); //llamamos a la funcion encargada de hacer el filtraje y le pasamos los mismos parametros que su funcion padre
     })
    .catch(err=>{  // manejmos el error de la misma manera que la funcion anterior
        $containerMis.innerHTML=err.message;
        setTimeout(()=>{
            $containerMis.innerHTML="";
        },3000);
    })
}

function showData(data,opcion){ // Esta es se podria decir que la funcion principal ya que se encarga de mostrar todos los productos  dependiendo de la opcion escogida por el usuario

    $container.innerHTML=""; // borramos todo lo que tenga en su interior este container y procedemos hacer lo sguiente

    let numProducts=0; // iniciamos un variable en cero para verificar si una categoria si teine productos
    for(let i=0;i<data.length;i++){ // inicamos un bucle for tomando como numero de iteraciones la cantidad de datos pasados en data

        let info=data[i]; // Como es un array de objetos , debemos acceder a cada objeto dependiendo de su posicion dentro del array por lo cual lo hacemos con el valor cambiante de i
        
        if(info.category.id==object[opcion]){ // info.category.id representa al numero que tiene asignado cada categoria y si recordamos yo tengia un objeto que esta arriba que corresponde y cada valor de cada categoria 
        //por lo que si por ejemplo(info.category.id=2) y (object[electronics]=2) entonces en este caso la condicion se cumple  
            numProducts++; // Como se encontro un producto que coindice con la opcion de categoria del cliente entonces sumamos la variable
            $container.innerHTML+=`
                <div class="products">
                    <div class="up">
                        <h2>${info.title}</h2>
                    </div>

                    <div class="down">
                        <h3>${info.description}</h3>
                        <h1>$ ${info.price}</h1>
                        <button>Comprar</button>
                    </div>
                </div>
            `;
            //Dibujamos todas las caracteristicas de los productos coincidentes con la opcion hecha por el usuario
        }
    }
    if(numProducts==0){ // En el caso de que la variable numProducts quede en cero es porque no hay ningu producto de esa categoria 
        $container.innerHTML=`<h1>No se encontraron productos para esta categoria</h1>`;
        //Por lo cual dibujamos que no hay productos
    }
}



function filter(data,opcion,category){ // Funcion encargada de segun la opcion dada por el usuario organizaremos los productos de menor a mayor precio y lo haremos por el precio solamente

    if(opcion=="littleToBig"){ // En el caso de que la opcion de organizacion halla sido("littleToBig") -> significa que escogio organizar los productos de menor a mayor precio
        const newData=data.sort((a,b)=>a.price - b.price); // cojemos a sort y le indicamos la condicion de que los items a y b que representan a los objetos y que estos en sus propiedades de price(a.price , b.price) a que es el primer parametro sera menor que b por lo cual se orgaizara de manera ascendente (menor a mayor)
        // filterProducts(newData,category); // llamamos a una funcion encargada de 
        showData(newData,category);
    }
    else if(opcion=="price"){ // En el caso de haber escogido por precio 
        $inputFilter.placeholder="Escribe el precio en especifico"; //Al input le estabelcemos el atributo placholder para darle un texto interno 
        $button.style.display="block"; // El boton de busqueda por precio ls hacemos visible
        $button.addEventListener("click",()=>{ // y le damos un evento de click
            filterPrice(data,$select.value,$inputFilter.value); //llamamos a otra funcion que nos filtra por precio y le pasamos por parametro la data completa , el valor actual de la categoria seleccionada por el usuario y el valor numerico del input que el precio por el que el usuario quiero buscar
        });
    }
    
}


const filterPrice=(data,category,price)=>{ // funcion encargada de filtrar los productos por precio y como argmuento tiene el objeto de productos , la categoria escogida por el usuario y el precio que el usuario puso
    $container.innerHTML=""; // limpiamos el contenedor 
    for(let i=0;i<data.length;i++){ // creamos un bucle for 
        let info=data[i];  // // Como es un array de objetos , debemos acceder a cada objeto dependiendo de su posicion dentro del array por lo cual lo hacemos con el valor cambiante de i

        if(info.category.id==object[category] && info.price==parseInt(price)){ //Aca la condicion debe cumplir conque el nuermo de la categoria debe concidir con el numero que tiene asignado cada categoria en el objeto que esta al incio de este programa y por otro lado que el precio de ese producto conincida con el precio establecido por el usuario
            
            $container.innerHTML+=`
                <div class="products">
                    <div class="up">
                        <h2>${info.title}</h2>
                    </div>

                    <div class="down">
                        <h3>${info.description}</h3>
                        <h1>$ ${info.price}</h1>
                        <button>Comprar</button>
                    </div>
                </div>
            `;
            //Dibujamos ese o esos datos encontrados.
        }
    }
}



$select.addEventListener('change',()=>{   //Evento de tipo change para que se active cada vez que el elemento cambie su estado en este caso su valor
    const value= $select.value; // para simplicidad almacene el valor actual de este elemento en euna variable para posterior pasarla como parametro a la funcion
    showProducts(urlProducts,value);
});


$selectFilter.addEventListener('change',()=>{ //Evento de tipo change para que se active cada vez que el elemento cambie su estado en este caso su valor
    const value= $selectFilter.value; // lo mismo que el elemnto anterior
    showProducts2(urlProducts,value,$select.value);

    $selectFilter.value="Selecciona filtro"; //Cada vez que el elemento cambie de categoria borrarle el valor actual para que el usuario deba volver a seleccionar la categoria 
});