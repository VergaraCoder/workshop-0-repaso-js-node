
const products = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 1500, stock: 10 },
    { id: 2, name: 'Smartphone', category: 'Electronics', price: 800, stock: 20 },
    { id: 3, name: 'Headphones', category: 'Electronics', price: 100, stock: 30 },
    { id: 4, name: 'T-shirt', category: 'Clothing', price: 20, stock: 50 },
    { id: 5, name: 'Jeans', category: 'Clothing', price: 50, stock: 40 },
    { id: 6, name: 'Sneakers', category: 'Clothing', price: 80, stock: 30 },
    { id: 7, name: 'Backpack', category: 'Accessories', price: 40, stock: 25 },
    { id: 8, name: 'Watch', category: 'Accessories', price: 60, stock: 20 },
    { id: 9, name: 'Sunglasses', category: 'Accessories', price: 30, stock: 35 }
];

const $container=document.querySelector(".containerProducts"); //container que contendra y dibujara los productos

const sumTotal=(products)=>{
    let sum=0;                                          //Iniamos una varibale en cero 
    const resultado=products.reduce((acc,item)=>{ //Activamos reduce pasandole 2 parametros que son el acomulador y el objeto actual 
        sum=acc+item.price;         //La varibale suma empieza a tomar valor y este es la suma de la propiedad price del elemento actual , mas el acomulador que en un principio en cero
        return sum;   // retornamos el valor total de la suma antes hecha
    },0) // este parametro es opcional e indica el valor por el cual se empezara la operacion , solo lo puse para estar conciente que podia incluir otro valor opcional ahi
    return resultado;   //Retornamos el valor de la suma que es todo lo que hicimos dentro de reduce
}


const filterCategories=(products,option)=>{ // Pasamos 2 parametros a la funcion que son la lista de productos, y la opcion de categoria
    const filters=products.filter((item)=>{ //Activamos el metodo filter y como parametro el elemento que se recorre actualmente
        return item.category==option;   //Ponemos una condicion para que se vayan filtrando los objetos y debe cumplir con que la categoria del objeto actual debe ser igual a la opcion del parametro
    }); 
    return filters;   // Finalmente retornamos el valor de (filters)-> Que son todos los objeto que cumplieron la condicion interna de filter
}


const showFilter=(data)=>{  //Funcion encargada de mostrar o dibujar los productos filtrados , pasamos como parametro dichos objetos
    $container.innerHTML="";        //Todo lo que tenga container lo borramos 
    for(x of data){     //Iniciamos un for que nos recorreo los objetos, como es un objeto lo mas apropiado seria usar in pero lo voy a dejar asi
        $container.innerHTML+=` 
        <div class="product">
            <h1>Nombre Producto: ${x.name}</h1>
            <h2>Categoria: ${x.category}</h2>
            <h2>Precio: ${x.price}</h2>                             
            <h2>Displonibles: ${x.stock}</h2>
        </div>
        `;

        //En lo anteiror solo dibujamos las propiedades dentro de etiquetas html para mejorar visualmente en contenido y mas facil de maniupular ala hora de dar estilos

    }
}

const sumCategory=(data)=>{  // Funcion encargada de sumar todos los productos de una categoria, le pasamos la data ya filtrada comon parametro
    let suma=0;  // iniciamos la varibale en 0 para irla sumando
    const resultado= data.reduce((acc,item)=>{//El acoumulador del resultado con el elemento acutal como parametros
        return suma=acc+item.price;  //Retornamos dicha suma
    },0);  // nuevamente el parametro opcional pero por gusto lo dejo

    return resultado;  //retornamos el valor de la suma dado del metodo reduce
}

const searchProductByName=(data,productName)=>{  // funcion encargada de buscar los productos por nombre le paso como parametro , los productos , y el nombre del producto
    const result= data.find((item)=>{ // Inicamos el metodo find pasando como parametro el elemento que esta siendo recorrido actualmente
        return item.name.toLowerCase()==productName.toLowerCase();  // convertimos tanto el nombre del producto , como el nombre del producto dado por el usuario si coinciden y hacer una busqueda mas amigable y retornamos dicho objeto
    });
    return result;  // retornamos el objeto que concide con la condicion dicha dentro de result
}


const verifyStockProducts=(data)=>{  // funcion encargad de verificar si todos los productos estan disponibles actualmente
    const resultado=data.every((item)=>{ // llamamos el metodo every para retornar un valor booleano si todos los elementos del array cumplen con una condicion
        return item.stock > 0; //Esta en la condicion y para verificar si todos los productos todavia estan disponibles verificando que su stock sea mayor que cero
    });
    return resultado;  // retornamos el boleano
}

const $select=document.getElementById("categories");   //elemento html que contiene el valor seleccionado en las categorias

const $buttonSumCategory=document.querySelector(".buttonSum");  //boton encargado de hacer cumplir la suma de todos los precios de una categoria

const $buttonSumTotal=document.querySelector(".buttonSum2"); // boton encargado de hacer la suma del precio de todos los productos

const $inputSearch=document.getElementById("searchName"); // input donde se escribira el nombre del producto que se desea encontrar

const $buttonSearch=document.querySelector(".search"); // boton que activa la busqueda dependiendo del valor del inpur anterior

const $buttonVerify=document.querySelector(".verify"); // boton que verifica si todos los productos estan disponibles

$select.addEventListener("change",()=>{  //Hacemos un evento para $select de tipo change que se activa cada vez que este cambie su valor
    const result=filterCategories(products,$select.value); //llamamos a la funcion para filtrar por categorias y pasamos como parametro el objeto de productos y el valor de $select (ESTE VALOR ES LA CATEGORIA SELECCIONADA)

    showFilter(result);  // Llamamos a la funcion encargada de pintar todos los productos
});


$buttonSumCategory.addEventListener("click",()=>{  // activamos un evento de click para el boton encargado de activar la suma de todos los precios de una categoria
    const filter=filterCategories(products,$select.value); //llamamos a la funcion que filtra dichos productos pasando como parametro del objeto de productos y el valor actual de la categoria($select.value)
    const result=sumCategory(filter);  //llamamos a la funcion encargada de hacer la suma de los objetos ya filtrados en la funcion anterior
    $container.innerHTML=`
        <h1>El precio total de esta categoria es : ${result}</h1>
    `;
    //Dibujamos el precio 
});


$buttonSumTotal.addEventListener("click",()=>{    // evento de click para boton que activa la suma de los precios de todas las categorias
    const result=sumTotal(products);   //llamamos a la funcion encargada de hacer la suma total de todo el objeto products decalarado al inicio del fichero
    $container.innerHTML=`
        <h1>El precio de todas las categorias es : ${result}</h1>
    `;
    //Dibujamos la suma total de todos los productos
});

$buttonSearch.addEventListener("click",()=>{   //hacemos evento de click para el boton encargado de activar la busqueda de producto or nombre
    try{  //en este caso pude haberlo hecho con condicionales pero deicido hacer con manejo de excepciones
        const result=searchProductByName(products,$inputSearch.value);  // llamamos a la funcion encargada de filtrarme el producto que cumpla con el nombre dado por el usuario

        $container.innerHTML=` 
        <div class="product">
            <h1>Nombre Producto: ${result.name}</h1>
            <h2>Categoria: ${result.category}</h2>
            <h2>Precio: ${result.price}</h2>
            <h2>Displonibles: ${result.stock}</h2>
        </div>
        `;
        //Dibujamos dicho producto
    }
    catch(err){  // en el caso de que pase algo , ya sea que el usuario de un nombre que no es ingrese algo raro , activamos el catch 
        $container.innerHTML=`<h1>No se a encontrado el producto</h1>`;  
    }    // y dibujamos que no se encontro el productos  
});

$buttonVerify.addEventListener("click",()=>{    //Boton que verifica si todos los productos estan disponibles
    const result= verifyStockProducts(products);   // llamamos a la funcion que se encarga de realizar dicha verificacion
    if(result){ //En el caso de que sea true dibujamos el siguiente
        $container.innerHTML=`
            <h1>Actualmente SI estan todos disponibles</h1>
      `;
    }else{ //En el caso de que sea false dibujamos lo siguiente
        $container.innerHTML=`
        <h1>Actualmente NO estan todos disponibles</h1>
        `;
    }
});