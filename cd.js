const puppeteer = require("puppeteer");
const nodemailer = require("nodemailer");
require("dotenv").config();

//laisser headless = false
const url =
  "https://www.cdiscount.com/bijouterie/montres/water-resist/f-12604-cas4971850968801.html?idOffre=1970534356#mpos=0|mp";
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  await page.setViewport({
    width: 1200,
    height: 1000,
  });

  // Ajoute une pause de 2 secondes avant d'accéder à l'élément du prix
  await page.waitFor(2000);

  //     pdf
  //   await page.pdf({
  //     path: "page.pdf",
  //     format: "A4",
  //   });

  // image
  // await page.screenshot({
  //     path: "image.png",
  // });

  // get <body>
  // let bodyHTML =
  //     await page.evaluate(() =>
  //         document.body.innerHTML);
  // console.log(bodyHTML);

  // get data "itemprop=price"
  let data = await page.evaluate(() => {
    return document.querySelector("span[itemprop=price]").innerText;
  });
  console.log("Le prix est de " + data);
  let newData = await data.substring(0, 4);
  // pour arrondir

  const limitPrice = 42;

  if (parseInt(newData) < limitPrice) {
    sendNotification(newData);
  }

  async function sendNotification(price) {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter
      .sendMail({
        from: process.env.MAIL_USER,
        to: process.env.MAIL_USER,
        subject: "Prix sous les " + limitPrice,
        html: "Le prix est de " + price,
      })
      .then(() => console.log("Message envoyé"));
  }

  await browser.close();
})();
