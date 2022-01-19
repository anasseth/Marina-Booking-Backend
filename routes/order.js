const express = require("express");
var router = express.Router();
const Booking = require("../models/order");
router.use(express.static("build"));

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

router.use(requestLogger);

router.get("/", (request, response) => {
  Booking.find({}).then((records) => {
    response.json(records);
  });
});

router.post("/", (request, response) => {
  const body = request.body;
  console.log(request.body);
  if (body.name == undefined) {
    return response.status(400).json({ error: "content missing" });
  }
  const new_booking = new Booking({
    name: body.name,
    description: body.description,
    price_per_person: body.price_per_person,
    person_qty: body.person_qty,
    dateFrom: body.dateFrom,
    dateTo: body.dateTo,
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    address: body.address,
    phoneNumber: body.phoneNumber,
    paypal: body.paypal,
    creditCard: body.creditCard,
    creditCardNumber: body.creditCardNumber,
    status: body.status,
    boat: {
      boat_name: body.boat.boat_name,
      boat_detail: body.boat.boat_detail,
      boat_price_per_person: body.boat.boat_price_per_person,
      boat_qty: body.boat.boat_qty,
      boat_stay: body.boat.boat_stay,
    },
  });

  console.log(body);
  console.log(new_booking);

  new_booking.save().then((savedBooking) => {
    response.json(savedBooking);
  });
});

router.get("/:id", (request, response, next) => {
  Booking.findById(request.params.id)
    .then((record) => {
      if (record) {
        response.json(record);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log("WAT IS THIS");
      next(error);
    });
});

router.delete("/:id", (request, response, next) => {
  Booking.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

module.exports = router;
