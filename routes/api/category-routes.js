const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const catIdValue = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(404).json(catIdValue);
  }catch(err){
    res.status(200).json(err);
  }
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const catIdValue = await Category.findByPk(req.params.id, {
      include: [{ model: Product}],
    });
    if(!catIdValue) {
      res.status(404).json({ message: 'value not found'});
      return;
    }
    res.status(202).json(catIdValue);
  }catch(err){
    res.status(440).json(err);
  } 
});

router.post('/', async(req, res) => {
  // create a new category
  try{
    const catIdValue = await Category.create({
      category_name: req.body.category_name
    });
    res.status(202).json(catIdValue);
  }catch(err){
    res.status(400).json(err);
  }
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try{
    const catIdValue = await Category.update({
      category_name: req.body.category_name,
    },
    {
      where:{
        id: req.params.id
      }
    });
    if(!catIdValue){
      res.status(404).json({message: 'id value not found'});
      return;
    }
    res.status(202).json(catIdValue);
  }catch(err){
    res.status(404).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try{
    const catIdValue = await Category.destroy({ 
      where:{
        id: req.params.id
      },
    });
    if(!catIdValue){
      res.status(404).json({message: 'id value not found'});
      return;
    }
    res.status(202).json(catIdValue);
  }catch(err){
    res.status(404).json(err);
  }
});

module.exports = router;
