require('dotenv').config()
const puppeteer = require('puppeteer');
const VALUE_TO_SWITCH = process.argv[2] == '0' ? false : true;

(async () => {
    const browser = await puppeteer.launch({ headless: true, slowMo: 100 });
    const [page] = await browser.pages();

    // AUTH
    await page.goto(process.env.RT_HOST, {timeout: 0});
    await page.waitForSelector('#username');
    await page.$eval('#username', (el, value) => el.value = value, process.env.RT_USER);
    await page.$eval('#password', (el, value) => el.value = value, process.env.RT_PASS);
    const loginBtn = await page.$('#save');
    await loginBtn.click();
    await page.waitForSelector('#advance');


    
    // TURN ON/OFF THE WIFI
    await page.goto(`${process.env.RT_HOST}/wrl_basic.html`, {timeout: 0});
    await page.waitForSelector('[name="wifiEn"]');
    const switchBtn = await page.$(VALUE_TO_SWITCH ? '#wifiEn1' : '#wifiEn2');
    await switchBtn.click();
    const confirmBtn = await page.$('#save');
    await confirmBtn.click();
    await page.waitFor(2000);
    
    await browser.close();
})();