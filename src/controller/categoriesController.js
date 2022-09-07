const MyCategory = require('../model/categoryModelOOP');

const categoryIndex = async (req, res) => {
  try {
    // Model
    const categories = await MyCategory.getAll();
    // controller
    res.status(200).json(categories);
  } catch (error) {
    console.log('error ===', error);
    res.status(500).json({ msg: 'some stuff went sideways' });
  }
};

const categoryCount = async (req, res) => {
  try {
    const catsAndCounts = await MyCategory.getCounts();
    res.status(200).json(catsAndCounts);
  } catch (error) {
    console.log('error ===', error);
    res.status(500).json({ msg: 'some stuff went sideways' });
  }
};

const categoryRemove = async (req, res) => {
  const { id } = req.params;
  try {
    if (await MyCategory.delete(id)) {
      res.status(200).json({
        msg: 'category deleted',
      });
    } else {
      res.status(400).json({
        msg: 'nothing deleted',
      });
    }
  } catch (error) {
    console.log('error ===', error);
    res.status(500).json({ msg: 'some stuff went sideways' });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = new MyCategory(name);

    if (await category.save()) {
      res.status(200).json({
        msg: 'category created',
      });
      return;
    }
    res.status(400).json({
      msg: 'nothing created',
    });
  } catch (error) {
    console.log('error ===', error);
    res.status(500).json({ msg: 'some stuff went sideways' });
  }
};

module.exports = {
  categoryIndex,
  categoryCount,
  categoryRemove,
  createCategory,
};
