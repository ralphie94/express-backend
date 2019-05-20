const express = require('express');
const router = express.Router();

const User = require("../models/User")

/* GET users listing. */
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.json({user})
  } catch(err) {
    res.json({err})
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json({
      user,
      success: user ? true : false
    })
  } catch(err) {
    res.json({err})
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json({
      status: 200,
      data: updatedUser
    })
  } catch(err){
    console.log(err);
  }
});

router.delete('/:userId/movies/:movieId', async (req, res) => {
  console.log('hello')
  try {
    // console.log(req.params)
    // const deletedMovie = await User.findByIdAndRemove(req.params.id);
    const foundUser = await User.findById(req.params.userId)
    // console.log(foundUser)
    foundUser.movies = foundUser.movies.filter(m => m.id != Number(req.params.movieId))
    await foundUser.save()
    console.log(foundUser, 'new')
    res.json({
      status: 200,
      data: foundUser
    })
  } catch(err){
    // console.log(err)
  }
});

router.post('/login', async (req, res) => {
  console.log('hit')
  try {
    const foundUser = await User.findOne({username: req.body.username})
    req.session.userId = foundUser._id
    res.json({
      user: foundUser,
      success: foundUser ? true : false
    })
  } catch(err) {
    res.json({err})
  }
})

router.post("/add", async(req,res)=>{
  try{
    const foundUser = await User.findById(req.session.userId)
    const movie ={
      title:req.body.title,
      image:req.body.poster_path,
      id: req.body.id

    }
    foundUser.movies.push(movie)
    foundUser.save()
    res.json({
      success:true,
      message: "movie has been added",
      data: foundUser
    })
  }catch(err){
    console.log(err)
  }
})

module.exports = router;
