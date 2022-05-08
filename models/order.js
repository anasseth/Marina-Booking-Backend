// General Structure For Creating an API Model/Schema/Structure
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: String,
  description: String,
  price_per_person: String,
  person_qty: String,
  dateFrom: String,
  dateTo: String,
  firstName: String,
  lastName: String,
  email: String,
  address: String,
  contact: String,
  additionalInfo: String,
  phoneNumber: String,
  paypal: Boolean,
  stripe: Boolean,
  creditCard: Boolean,
  creditCardNumber: String,
  status: String,
  boat: {
    boat_name: String,
    boat_detail: String,
    boat_price_per_person: String,
    boat_qty: String,
    boat_stay: String,
  },
});

bookingSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
