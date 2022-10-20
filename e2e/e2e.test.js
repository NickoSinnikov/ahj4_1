import puppetteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(300000); // default puppeteer timeout

describe("Credit Card Validator form", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = "http://localhost:9000";

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on("error", reject);
      server.on("message", message => {
        if (message === "ok") {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });
  describe("card number validate form", () => {
    test("should add do something", async () => {
      await page.goto(baseUrl);
      const form = await page.$("[data-widget=number-card-form-widget]");
      const input = await form.$("[data-id=num-card-input]");
      await input.type("4684533814593872");
      const button = await form.$("[id=num-card-submit]");
      await button.click();
      await page.waitForSelector(".valid");
    });
  });
});
