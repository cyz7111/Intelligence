const http =require('http')
const serve=http.createServer((request,response)=>{
    console.log(11);
    response.end('hello')
})
serve.listen(4000)