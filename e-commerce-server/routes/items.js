const express = require("express");
const router = express.Router();
const Item = require("../models/item");

const defaultSortBy = [
  { field: "rate", asc: false },
  { field: "price", asc: true },
  { field: "vote", asc: false }
];

// get list
router.get("/", (req, res) => {
  let sortBy = JSON.parse(
    req.header("sortBy") || JSON.stringify(defaultSortBy)
  );
  sortBy = sortBy
    .map(({ field, asc }) => `${asc ? "" : "-"}${field}`)
    .join(" ");

  const page = Number(req.header("page") || 1);
  const limit = Number(req.header("limit") || 4);
  const skip = (page - 1) * limit;

  Item.aggregate()
    .count("count")
    .exec()
    .then(result => {
      let numOfPages = result[0] ? Math.ceil(result[0].count / limit) : 0;
      Item.aggregate()
        .collation({ locale: "id" })
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(items => res.json({ error: false, numOfPages, items }))
        .catch(err => res.json({ error: true, message: err }));
    })
    .catch(err => res.json({ error: true, message: err }));
});

// filter
router.post("/filter", (req, res) => {
  let {
    categories,
    title,
    minPrice,
    maxPrice,
    minRate,
    maxRate,
    capacities,
    sortBy,
    page,
    limit
  } = req.body;

  let filter = {
    ...(categories && { category: { $in: JSON.parse(categories) } }),
    ...(title && { title: { $regex: title, $options: "i" } }),
    ...((minPrice || maxPrice) && {
      price: {
        ...(minPrice && { $gte: minPrice }),
        ...(maxPrice && { $lte: maxPrice })
      }
    }),
    ...((minRate || maxRate) && {
      rate: {
        ...(minRate && { $gte: minRate }),
        ...(maxRate && { $lte: maxRate })
      }
    }),
    ...(capacities && {
      capacities: { $elemMatch: { $in: JSON.parse(capacities) } }
    })
  };

  sortBy = JSON.parse(sortBy || JSON.stringify(defaultSortBy));
  sortBy = sortBy
    .map(({ field, asc }) => `${asc ? "" : "-"}${field}`)
    .join(" ");

  const skip = (page - 1) * limit;

  Item.aggregate()
    .match(filter)
    .count("count")
    .exec()
    .then(result => {
      let numOfPages = result[0] ? Math.ceil(result[0].count / limit) : 0;
      Item.aggregate()
        .collation({ locale: "id" })
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .exec()
        .then(items => res.json({ error: false, numOfPages, items }))
        .catch(err => res.json({ error: true, message: err }));
    })
    .catch(err => res.json({ error: true, message: err }));
});

// add
router.post("/", (req, res) => {
  let {
    itemId,
    category,
    title,
    price,
    rate,
    description,
    detail,
    brand,
    colors,
    stock,
    capacities,
    filename,
    vote,
    testimonials

  } = req.body;


  let itemAdded =
    new Item({
      itemId,
      category,
      title,
      price,
      rate,
      description,
      detail,
      brand,
      colors,
      stock,
      capacities,
      filename,
      vote,
      testimonials
    })
    ;

  itemAdded.save()
    .then(item => res.json({ error: false, itemAdded: item }))
    .catch(err => res.json({ error: true, message: err }));
});

// update vote, rate, stock, and/or testimonials of an item
router.put("/:itemId", (req, res) => {
  let { itemId } = req.params;
  // vote, rate, & stock are already calculated at front-end
  // testimonials are already added at front-end
  let { vote, rate, stock, testimonials } = req.body;
  let itemUpdated = {
    ...(vote && { vote }),
    ...(rate && { rate }),
    ...(stock && { stock }),
    ...(testimonials && { testimonials: JSON.parse(testimonials) })
  };

  Item.findOneAndUpdate({ itemId }, itemUpdated, err => {
    if (err) res.json({ error: true, message: err });
    else {
      res.json({ error: false, itemId, ...itemUpdated });
    }
  });
});

module.exports = router;
