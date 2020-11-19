Var express = require('express');
var router = express.Router();



//Create films data
let films=[{
    film:"test",
    id:"0"
}];

//GET films listing
router.get('/',(req, res)=>{
    //GET List of user and return JSON
    res.status(200).json({films});
});

//Get One film
router.get('/:id',(req, res)=>{
    //GET id en params
    const { id }=req.params;
    //Find film in DB
    const film=_.find(users, ["id", id]);
    //Return film
    if(!film){
        res.status(404).json({
            message:'Movie not found!!! '
        });

    }else{
        res.status(200).json({
            message:'Movie found!!!',
            film
        });
    }
});

//PUT new film
router.put('/',(req, res)=>{
    //GET the data from request from request
    const {film}= req.body;
    //Create new unique id
    const id=_.uniqueId();
    //Insert it in array
    films.push({film, id});
    //Return message
    res.json({
        message: 'just added ${id}',
        film:{film, id}
    });
    
});

//Update film.
router.post('/:id',(req, res)=>{
    //GET the :id of the user we want to update from the params of the request
    const {id}=req.params;
    //Get the new data of the user we want to update from the body of the request
    const {film}=req.body;
    //Find in DB
    const filmToUpdate=_.find(films, ["id",id]);
    //Update data with new data (js is by adress)
    filmToUpdate.film= film;

    //Return message
    res.json({
        message:'just update ${id} with ${film}'
    });
});

//Delete film.
router.delete('/:id',(req,res)=>{
    //GET the :id of the user we want to delete from the params of the request
    const {id}=req.params;
    //Remove from "DB"
    _.remove(films,["id",id]);
    //Return message
    res.json({
        message:'Just removed ${id}'
    });
})
