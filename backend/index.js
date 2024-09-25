const express = require("express");
const bodyparser = require("body-parser");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require("cors");
const { createInvoice } = require("./createInvoice");
const app = express();
const nodemailer = require("nodemailer");
const fs = require("fs");
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "vocalperfume@gmail.com",
    pass: "caowzpcvixekwpki",
  },
});

app.use(cors());

const port = 8888;

app.use(bodyparser.json());

var instance = new Razorpay({
  key_id: "rzp_test_qoANfvd3uvzgTp",
  key_secret: "tLLi9RIeCnRL0ZWnPt3MT80r",
});

app.post("/create/orderId", (req, res) => {
  var options = {
    amount: req.body.amount, // amount in the smallest currency unit
    currency: "INR",
    receipt: "rcp1",
  };
  instance.orders.create(options, function (err, order) {
    res.send({ orderId: order.id });
  });
});

function generateHeader(doc) {
  doc
    .image("logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("ACME Inc.", 110, 57)
    .fontSize(10)
    .text("ACME Inc.", 200, 50, { align: "right" })
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("New York, NY, 10025", 200, 80, { align: "right" })
    .moveDown();
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your business.",
      50,
      780,
      { align: "center", width: 500 }
    );
}

app.post("/payment/success", async (req, res) => {
  try {
    // getting the details back from our font-end

    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      amount,
      basket,
      user,
      address,
      guestEmail,
    } = req.body;

    // Creating our own digest
    // The format should be like this:

    // const digest = hmac_sha256(
    //   orderCreationId + "|" + razorpayPaymentId,
    //   "kjhjdjahdjlash"
    // );

    const shasum = crypto.createHmac("sha256", "tLLi9RIeCnRL0ZWnPt3MT80r");

    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest("hex");

    console.log("hello");

    // comaparing our digest with the actual signature
    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: "Transaction not legit!" });

    // THE PAYMENT IS LEGIT & VERIFIED
    // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT
    console.log("basket >>>", basket);

    const line_items = basket?.map((item) => {
      return { item_id: item.id, quantity: item.quantity };
    });

    // instance.invoices.create(
    //   {
    //     type: "invoice",
    //     date: 1589994898,
    //     customer: {
    //       name: user.fullname,
    //       email: user.email,
    //       contact: parseInt(address.phoneNumber),
    //     },
    //     currency: "INR",
    //     line_items: line_items,
    //   },
    //   (err, result) => {
    //     if (err) {
    //       console.log(err);
    //     }
    //     console.log(result);
    //   }
    // );

    const invoice = {
      shipping: {
        name: address.fullname,
        address: `${address.lineOne} ${address.lineTwo}`,
        city: address.city,
        state: address.state,
        phoneNumber: address.phoneNumber,
        postal_code: address.zipcode,
      },
      items: basket?.map((item) => {
        return {
          item: item.name,
          price: item.price,
          quantity: item.quantity,
          amount: item.amount,
          type: item.type,
        };
      }),
      subtotal: amount,
      paid: 0,
      invoice_nr: orderCreationId,
    };
    console.log("line_items >>>", line_items);

    createInvoice(invoice, `./${orderCreationId}.pdf`);
    console.log("invoice sending");
    let mailContent = {
      from: "vocalperfume@gmail.com",
      to: `${user ? user?.email : guestEmail},pd06072001@gmail.com`,
      subject: "You have Successfully Purcharsed Vocal Mist Perfume",
      text: "This is the invoice of your purcharsed product.",
      attachments: [
        {
          // filename and content type is derived from path
          filename: `${orderCreationId}.pdf`,
          path: `./${orderCreationId}.pdf`,
        },
      ],
    };

    transporter.sendMail(mailContent, function (error, data) {
      if (error) {
        console.log("Unable to send mail", error);
      } else {
        console.log("Email send successfully");
      }
    });

    res.json({
      msg: "success",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      amount: amount,
      basket: basket,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get("/", (req, res) => res.status(200).send("Home Page"));
app.listen(port, () => console.log("listening on the port", port));
