const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagValue = await Tag.findAll({
      include: [{model: Product, through: ProductTag, as: 'tag_many_prod'}]
    });
    res.status(404).json(tagValue);
  }catch(err){
    res.status(200).json(err)
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagValue = await Category.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'tag_many_prod'}]
    });    
    res.status(202).json(tagValue);
  }catch(err){
    res.status(440).json(err);
  } 
});

router.post('/', (req, res) => {
  // create a new tag
  try{
    const tagValue = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(202).json(tagValue);
  }catch(err){
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try{
    const tagValue = await Tag.update({
      tag_name: req.body.tag_name,
    },
    {
      where:{
        id: req.params.id
      }
    });
    if(!tagValue){
      res.status(404).json({message: 'id value not found'});
      return;
    }
    res.status(202).json(tagValue);
  }catch(err){
    res.status(404).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try{
    const tagValue = await Tag.destroy({ 
      where:{
        id: req.params.id
      },
    });
    if(!tagValue){
      res.status(404).json({message: 'id value not found'});
      return;
    }
    res.status(202).json(tagValue);
  }catch(err){
    res.status(404).json(err);
  }
});

module.exports = router;
