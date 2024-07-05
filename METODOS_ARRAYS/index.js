
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

const $container=document.querySelector(".containerProducts");

const sumTotal=(products)=>{
    let sum=0;
    const resultado=products.reduce((acc,item)=>{
        sum=acc+item.price;
        return sum;
    },0)
    return resultado;
}


const filterCategories=(products,option)=>{
    const filters=products.filter((item)=>{
        return item.category==option;
    });
    return filters;
}


const showFilter=(data)=>{
    $container.innerHTML="";
    for(x of data){
        $container.innerHTML+=`
        <div class="product">
            <h1>Nombre Producto: ${x.name}</h1>
            <h2>Categoria: ${x.category}</h2>
            <h2>Precio: ${x.price}</h2>
            <h2>Displonibles: ${x.stock}</h2>
        </div>
        `;
    }
}

const sumCategory=(data,option)=>{
    let suma=0;
    const resultado= data.reduce((acc,item)=>{
        if(item.category==option){
            suma=acc+item.price;
        }
        return suma;
    },0);

    return resultado;
}

const searchProductByName=(data,productName)=>{
    const result= data.find((item)=>{
        return item.name.toLowerCase()==productName.toLowerCase();;
    });
    return result;
}


const verifyStockProducts=(data)=>{
    const resultado=data.every((item)=>{
        return item.stock !==0;
    });
    return resultado;
}

const $select=document.getElementById("categories");

const $buttonSumCategory=document.querySelector(".buttonSum");

const $buttonSumTotal=document.querySelector(".buttonSum2");

const $inputSearch=document.getElementById("searchName");

const $buttonSearch=document.querySelector(".search");

const $buttonVerify=document.querySelector(".verify");

$select.addEventListener("change",()=>{
    const result=filterCategories(products,$select.value);

    showFilter(result);
});


$buttonSumCategory.addEventListener("click",()=>{
    const result=sumCategory(products,$select.value);
    $container.innerHTML=`
        <h1>El precio total de esta categoria es : ${result}</h1>
    `;
});


$buttonSumTotal.addEventListener("click",()=>{
    const result=sumTotal(products);
    $container.innerHTML=`
        <h1>El precio de todas las categorias es : ${result}</h1>
    `;
});

$buttonSearch.addEventListener("click",()=>{
    try{
        const result=searchProductByName(products,$inputSearch.value);

        $container.innerHTML=`
        <div class="product">
            <h1>Nombre Producto: ${result.name}</h1>
            <h2>Categoria: ${result.category}</h2>
            <h2>Precio: ${result.price}</h2>
            <h2>Displonibles: ${result.stock}</h2>
        </div>
        `;
    }
    catch(err){
        $container.innerHTML=`<h1>No se a encontrado el producto</h1>`;
    }
});

$buttonVerify.addEventListener("click",()=>{
    const result= verifyStockProducts(products);
    if(result){
        $container.innerHTML=`
            <h1>Actualmente SI estan todos disponibles</h1>
      `;
    }else{
        $container.innerHTML=`
        <h1>Actualmente NO estan todos disponibles</h1>
        `;
    }
});