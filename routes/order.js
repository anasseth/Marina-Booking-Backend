const express = require("express");
const req = require("express/lib/request");
var router = express.Router();

// Importing Transporter Fuction from email.js file
const transporter = require("../email/email");

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

// Get All Order Data
router.get("/", (request, response) => {
  Booking.find({}).then((records) => {
    response.json(records);
  });
});


// Create New Order & Generate Email
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
    contact: body.contact,
    additionalInfo: body.additionalInfo,
    phoneNumber: body.phoneNumber,
    paypal: body.paypal,
    stripe: body.stripe,
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

  //setting message body Here !
  // You may change according to your own requirements
  var message = {
    from: "marina.spot.booking@gmail.com",
    to: new_booking.email,
    subject: "Booking Confirmation | Marina Spot",
    text: `
    Hello ${new_booking.firstName},

    Your Booking for ${new_booking.name} has been confirmed from ${new_booking.dateFrom} to ${new_booking.dateTo}. 

    Booking Details

    Name : ${new_booking.firstName} ${new_booking.lastName}
    Stay Period : ${new_booking.boat.boat_stay} Days
    Location : ${new_booking.name}
    Boat : ${new_booking.boat.boat_name}

    Best Regards,
    Marina Spot Booking Team`,
  };

  console.log(body);
  console.log(new_booking);

  new_booking
    .save()
    .then((savedBooking) => {
      // When Data Successfully Saved. Returned Saved Object
      response.json(savedBooking);
    })
    .catch((err) => {
      // Incase of Error Print in Console
      console.error(err);
    })
    .finally(() => {
      // When Object Save. Generate Email to the mentione Email
      transporter.sendMail(message, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      });
    });
});

// Get Order Detail By ID
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

// Delete Order API By ID
router.delete("/:id", (request, response, next) => {
  Booking.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

module.exports = router;
