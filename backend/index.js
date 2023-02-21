const promise= new Promise((resolve,reject)=>{
    console.log("This promise is resolved and the number of resolve is 12")
    resolve(12)
})

const fetchData= await promise;
console.log(fetchData)