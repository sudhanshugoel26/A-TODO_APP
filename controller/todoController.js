var bodyParser=require('body-parser')
var mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/todo',{ useNewUrlParser: true })
//var db=mongoose.connection
var todoSchema=new mongoose.Schema({
	item: String
})

var TodoCollection=mongoose.model('TodoCollection',todoSchema)
//var itemONe=TodoCollection({item:'buy flowers'}).save(function(err){
//	if(err) throw err
//		console.log('Item Saved')
//})
//data=[{item:'get milk'},{item:'go for a walk'} ,{item:'watch tv'}]
var urlencodedParser=bodyParser.urlencoded({extended: false})

module.exports=function(app){

app.get('/todo',function(req,res){

	//get data from  mongodb and pass it to view
	TodoCollection.find({},function(err,data){
		if(err) throw err
	    res.render('todo',{todos:data})
	})
 

})
app.post('/todo',urlencodedParser,function(req,res){

	//get data from view and add it to mongodb
	var newItem=TodoCollection(req.body).save(function(err,data){
		if(err) throw err;
		res.json(data)
	})
//data.push(req.body)
//res.json(data)
})

app.delete('/todo/:item',function(req,res){
	//delete the requested item from mongodb
	TodoCollection.find({item:req.params.item.replace(/\/-/g," ")}).remove(function(err,data){
		if(err) throw err
		res.json(data)
	})
//data=data.filter(function(todo){
	//return todo.item.replace(/ /g,'-') !==req.params.item//if it returns true item will be in the array and if false it will be out of the array
//})
//res.json(data)

})
}