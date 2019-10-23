const routes = require('express').Router();
const MenuController = require('../controllers/menuController');

const managerMiddleware = (req,res,next) => {
  if(req.session.position === 'manager'){
    next()
  }
  else{
    res.redirect('/')
  }
}

routes.use(managerMiddleware);

//HOME
routes.get('/', MenuController.allMenu)



//=================CRUD MENU=============//


// //create
routes.get('/menus/add', (req, res) => {
    let err = []

    for (const key in req.query) {
        err.push(req.query[key])
    }
    res.render('pages/menu/newMenu', {err})
})

routes.post('/menus/add', MenuController.create)
// routes.post('/menus/add', (req, res) => {
//     console.log(req.body);
    
// })






// //edit & update
routes.get('/menus/edit/:id', MenuController.editPage)
routes.post('/menus/edit/:id', MenuController.update)


// //delete
routes.get('/menus/delete/:id', MenuController.delete)




module.exports = routes;