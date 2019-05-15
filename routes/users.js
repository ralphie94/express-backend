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
    res.json({user})
  } catch(err) {
    res.json({err})
  }
});

router.put('/', (req, res) => {
  return res.json({data: 'Received a PUT HTTP method users'});
});

router.delete('/', (req, res) => {
  return res.json({data: 'Received a DELETE HTTP method users'});
});

router.post('/login', async (req, res) => {
  console.log('hit')
  try {
    const foundUser = await User.findOne({username: req.body.username})
    req.session.userId = foundUser._id
    res.json({
      user: foundUser,
      success: true
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
      image:req.body.poster_path
    }
    foundUser.movie.push(movie)
    foundUser.save()
    res.json({
      success:true,
      message: "movie has been added"
    })
  }catch(err){
    console.log(err)
  }
})

module.exports = router;
