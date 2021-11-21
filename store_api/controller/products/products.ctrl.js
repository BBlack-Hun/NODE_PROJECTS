const Product = require('../../models/Product');
const asyncWrapper = require('../../middleWare/async');

exports.get_products_static = asyncWrapper(async (req, res) => {
  const products = await Product.find({}).sort('name').select('name price');
  // .limit(10);
  // skip은 파라미터로 입력 받은 페이지 만큼 skip을 하고 출력한다.

  res.status(200).json({ products, hbHits: products.length });
});

exports.get_products = asyncWrapper(async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    s;
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }; // regex로 fullbname을 입력하지 않아도 입력한 것이 포함되어 있으면 출력해줌
  }

  // console.log(queryObject);
  let result = Product.find(queryObject);
  // sort
  if (sort) {
    const sortList = sort.split(',').join(' '); //,로 쪼갠후 공백으로 다시 문자열로 만든다.
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  if (fields) {
    const fieldsList = fields.split(',').join(' '); //,로 쪼갠후 공백으로 다시 문자열로 만든다.
    result = result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  // 23
  // 4 7 7 7 2

  const products = await result;
  res.status(200).json({ products, hbHits: products.length });
});

exports.create_product = asyncWrapper(async (req, res) => {
  res.send('hi');
});

exports.get_product = asyncWrapper(async (req, res) => {
  res.status(200).json();
});

exports.update_product = asyncWrapper(async (req, res) => {
  res.status(200).json();
});

exports.delete_product = asyncWrapper(async (req, res) => {
  res.status(200).json();
});
