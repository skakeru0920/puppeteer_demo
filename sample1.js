const pupp = require("puppeteer");

(async () => {
	const browser = await pupp.launch({ headless: false, slowMo: 100 });
	const page = await browser.newPage();

	await page.goto("https://www.google.co.jp");

	await page.type("input[name=q]", "コードクリサリス 東京");
	await page.keyboard.press("Enter");
	await page.waitForSelector(".LC20lb", { visible: true });
	await page.click(".LC20lb");
	await page.waitForTimeout(2000);
    
	await page.screenshot({ path: `${Date.now()}.png` });
	await browser.close();
})();
