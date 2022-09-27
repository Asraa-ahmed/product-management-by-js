let title      = document.getElementById('title');
let price      = document.getElementById('price');
let taxes      = document.getElementById('taxes');
let ads          = document.getElementById('ads');
let discount= document.getElementById('discount');
let total      = document.getElementById('total');
let count      = document.getElementById('count');
let category= document.getElementById('category');
let submit    = document.getElementById('submit');
let mood ='create';
let temp;

//get total
function getTotal(){
    if(price.value != ''){
        let result =(+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML= result;
        total.style.background = '#037747';
    }else{
        total.innerHTML = '';
        total.style.background ='#800000';
    }
}

//save in local storage
let datapro;
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}else{
    datapro = [];
}

//create product
submit.onclick = function(){
    let newpro ={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }

    //count
    if(title.value != ''&& price.value != ''){
        if(mood === 'create'){
            if(newpro.count>1){
                for(let i=0;i<newpro.count;i++){
                    datapro.push(newpro)
                }
            }else{
                datapro.push(newpro)
            }
        }else{
            datapro[temp] = newpro;
            mood='create';
            submit.innerHTML ='create';
            count.style.display= 'block';
        }
        clearData();
    }

    //save in local storage
    localStorage.setItem('product', JSON.stringify(datapro))

    showData();
    
}

//clear inputs
function clearData(){
    title.value='';
    price.value= '';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}

//read
function showData(){
    getTotal();
    let table='';
    for(let i=0;i<datapro.length;i++){
        table += 
        `<tr>
        <td>${i+1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick = "updateData(${i})" id="update">Update</button></td>
        <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
    </tr>`;
        
    }
    document.getElementById('tbody').innerHTML=table;
    
//deleteAll
    let btnDelete = document.getElementById('deleteAll');
    if(datapro.length>0){
        btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All (${datapro.length})</button>`;
        btnDelete.style.margin='6px 0'
    }else{
        btnDelete.innerHTML ='';
    }

}
showData();

//delete
function deleteData(i){
    datapro.splice(i,1);
    localStorage.product= JSON.stringify(datapro);
    showData();
}

//deleteAll
function deleteAll(){
    datapro.splice(0);
    localStorage.clear();
    showData();

}

//update
function updateData(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    getTotal()
    category.value = datapro[i].category;
    count.style.display='none';
    submit.innerHTML='Update';
    mood = 'update';
    temp = i ;
    scroll({
        top : 0,
        behavior : 'smooth'
    })
}
//search
let searchMood = 'title';

function getSearchMood(id){

    let searchh = document.getElementById('search');
    
    if(id == 'searchTitle'){
        searchMood ='title';
    }else{
        searchMood = 'category';
    }
    searchh.placeholder='Search By' + searchMood;

    
searchh.focus();
    searchh.value='';
    showData();
}

function searchData(value){
    let tabel = '';
    if(searchMood == 'title'){
        for(let i=0;i<datapro.length;i++){
            if(datapro[i].title.includes(value)){
                tabel += 
                    `<tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick = "updateData(${i})" id="update">Update</button></td>
                        <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
                    </tr>`;
            }
        }
    }else{
        for(let i=0;i<datapro.length;i++){
            if(datapro[i].category.includes(value)){
                tabel += 
                    `<tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick = "updateData(${i})" id="update">Update</button></td>
                        <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
                    </tr>`;
            }
    
        }
    }
    document.getElementById('tbody').innerHTML=tabel;
}
