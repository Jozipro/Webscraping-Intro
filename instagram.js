const puppeteer = require("puppeteer");
const nodemailer = require("nodemailer");
require("dotenv").config();

//laisser headless = false
const url = "https://www.instagram.com";

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  //cookie banner
  await page.click(".mt3GC > button");

  // login - not need if auto login
  //   await page.type("[name=username]", process.env.INSTA_USER, { delay: 100 }); //délai à mettre pour faire plus humain
  //   await page.type("[name=password]", process.env.INSTA_PASS, { delay: 100 });

  // auto connect confirmation
  // await page.waitForSelector('.cmbtv > button', {visible: true}); //en cas souci asynchronicité ; composa pas encore présent
  // await.page.click(".cmbtv > button");

  // notifications
  // await page.waitForSelector('.cmbtv > button', { visible: true });
  // await.page.click(".cmbtv > button");

  await browser.close();
})();
