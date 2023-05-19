const submitbtn=document.getElementById('submitbtn');
const form=document.getElementById('forms');
const amount=document.getElementById('amt');
const description=document.getElementById('desc');
const category=document.getElementById('cat');
const ul=document.getElementById('detailAdded')
// Submit button functionality
submitbtn.addEventListener('click',add)
function add(e){
    e.preventDefault();
    if(amount.value==''||description.value==''){
        const msg=document.getElementById('msg')
        msg.textContent='Enter all Fields';
        msg.style.color='red'
        setTimeout(()=>{msg.remove()},3000);
    }
    else{
        
        const obj={
            'amount': amount.value,
            'category':category.value,
            'description':description.value,
            'id':`${Object.keys(localStorage).length + 1}`
        } 

        const li=document.createElement('li')
        li.innerText=(`${amount.value} : ${category.value} : ${description.value} `);
        li.innerText=(`${amount.value} : ${category.value} : ${description.value}  `);
        const dltbtn=document.createElement('button');
        dltbtn.class='dlt';
        dltbtn.id=`${obj.id}`
        dltbtn.textContent='Delete';
        dltbtn.style.background='#ff4444'
        const editbtn=document.createElement('button');
        editbtn.class='edit';
        editbtn.id=`${obj.id}`
        editbtn.textContent='Edit';
        li.appendChild(editbtn);
        li.appendChild(dltbtn);
        ul.appendChild(li);
        amount.value='';
        category.value='';
        description.value='';
        //adding to LS
        addToLS(obj);
          
}
  
}
function addToLS(obj){
    localStorage.setItem(obj.id,JSON.stringify(obj));
}        
// Display from LS in frontend
{   const keys=Object.keys(localStorage);
    keys.forEach((key)=>{
        const eachkey=JSON.parse(localStorage.getItem(key));
        const li=document.createElement('li')
        li.innerText=(`${eachkey.amount} : ${eachkey.category} : ${eachkey.description} `);
        li.innerText=(`${eachkey.amount} : ${eachkey.category} : ${eachkey.description}  `);
        const dltbtn=document.createElement('button');
        dltbtn.class='dlt';
        dltbtn.id=`${eachkey.id}`;
        dltbtn.textContent='Delete';
        dltbtn.style.background='#ff4444'
        const editbtn=document.createElement('button');
        editbtn.class='edit';
        editbtn.id=`${eachkey.id}`
        editbtn.textContent='Edit';
        li.appendChild(editbtn);
        li.appendChild(dltbtn);
        ul.appendChild(li);
    })
}
//dlt edit btn functionality
ul.addEventListener('click',func)
function func(e){
    if(e.target.class==='dlt'){
        localStorage.removeItem(e.target.id);
        ul.removeChild(e.target.parentElement);
        console.log(e.target.parentElement );
        
    }
    else if(e.target.class==='edit'){
        const toBeEdited=e.target.id;
        const toBeEditedObj=JSON.parse(localStorage.getItem(toBeEdited));
        localStorage.removeItem(toBeEdited);
        amount.value=toBeEditedObj.amount;
        category.value=toBeEditedObj.category;
        description.value=toBeEditedObj.description;
        ul.removeChild(e.target.parentElement);
        console.log(e.target.parentElement );
    }
}