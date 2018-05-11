const router = require('express').Router();
const Project = require('../models/Project');
const User = require('../models/User');
const Review = require('../models/Review');
const upload = require('multer')({dest: './public/pics'});
const mongoose = require("mongoose");
const Offer = require('../models/Offer');


const checkRole = (req, res, next)=>{
  User.findOne({username: req.body.username})
  .then(user=>{
    if(user.role ==="WORKER"){
      console.log(user)
    return next();
    }
    // res.send('no hay acceso');
  }).catch(e=> console.log(e))
  }



/*
router.get('/jobs/:id', (req,res)=>{
  const projects= Project.find()

  let _id = req.params.id
  Project.findById({_id})
  .populate('user')
  .then(project=>{
  console.log(project);
  res.render("auth/job-detail",{project})
  })
  })

router.get('/users', (req, res, next)=>{
    const users= User.find()
    .populate('projects','title')
    .then(users=>{
    res.render('auth/users', {users,project:req.project});
    })
  });

router.get('/jobs', (req, res, next)=>{
  const projects= Project.find()
  .populate('user','name')
  .then(projects=>{
    console.log(projects)
    res.render('auth/jobs', {projects,user:req.user});

  })})


router.post('/new', (req,res, next)=>{
    req.body.user = req.user._id;
    console.log(req.body);
    Offer.create(req.body)
    .then(offer=>{
        req.user.offer.push(project._id);
        return User.findByIdAndUpdate(req.user._id, req.user)
    })
    .then(user=>{
        res.redirect('/profile')
    })
    .catch(e=>next(e))

});
*/

////////////////////////////Offers///////////////
/*
router.post('/new', (req,res, next)=>{
  req.body.offers = [];
    req.body.user = req.user._id;
    console.log(req.body);
    Offer.create(req.body)
    .then(offer=>{
        req.user.offers.push(offer._id);
        return User.findByIdAndUpdate(req.user._id, req.user)
    })
    .then(user=>{
      console.log(req.body);
        res.redirect('/profile')
    })
    .catch(e=>next(console.log(e)))
  });


  router.post('/new',(req,res, next)=>{
      req.body.user = req.user._id;
      console.log(req.body);
      Offer.create(req.body)
      .then(project=>{
          req.user.projects.push(project._id);
          return User.findByIdAndUpdate(req.user._id, req.user)
      })
      .then(user=>{
          res.redirect('/profile')
      })
      .catch(e=>next(e))

  });*/


  router.get('/offer-detail', (req, res, next)=>{
    const offers = Offer.find()
    .then(offer=>{
      res.render('auth/offers-detail', {offer})
    })
    });



    router.post('/offers', (req, res, next)=>{
  req.body.offers = [];
  req.body.user = req.user._id;
  Offer.create(req.body)
  .then(offer=>{
    req.body.offers.push(offer._id);
      req.user.offers.push(offer);
      let project_update = Project.findByIdAndUpdate(offer.projects, {$push: {offers: offer._id}}, {new:true})
      let user_update = User.findByIdAndUpdate(req.user._id, req.user)

      Promise.all([project_update, user_update])
        .then(()=>{
          res.redirect('/profile')
        })

    })});




    router.get('/offers', (req, res, next)=>{
      const offers = Offer.find()
      .populate('user')
      .then(offers=>{
        res.render('auth/offers',{offers, user:req.user, project:req.project})
      })
    })



  router.post('/new',(req,res, next)=>{

    console.log("perro", req.body);

      req.body.offers = [];
      req.body.user = req.user._id;
      Offer.create(req.body)
      .then(offer=>{
        req.body.offers.push(offer._id);
          req.user.offers.push(offer);

          let project_update = Project.findByIdAndUpdate(offer.projects, {$push: {offers: offer._id}}, {new:true})
          let user_update = User.findByIdAndUpdate(req.user._id, req.user)

          Promise.all([project_update, user_update])
            .then(()=>{
              res.redirect('/profile')
            })


          //return User.findByIdAndUpdate(req.user._id, req.user)
      })
      // .then(user=>{
      //     res.redirect('/profile')
      // })
      .catch(e=>next(e))

  });











module.exports = router;
