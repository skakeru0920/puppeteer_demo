/*
	"scripts": {
		"test": "mocha test  --timeout=0"
	}
*/

const puppeteer = require("puppeteer");
const chai = require("chai");

let browser;
let expect;
let page;

describe("Google", () => {
	beforeEach(async () => {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 100,
		});
		expect = chai.expect;
		page = await browser.newPage();
		await page.goto("https://google.com");
	});

	afterEach(() => {
		browser.close();
	});

	it("リンク先のtitleが'Google'", async () => {
		expect(await page.title()).to.be.equal("Google");
	});

	it("googleにアクセスして、コードクリサリスを検索、一番上を選択してタイトルがコードクリサリスになる", async () => {
		await page.type("input[name=q]", "コードクリサリス 東京");
		await page.keyboard.press("Enter");
		await page.waitForSelector(".LC20lb", { visible: true });
		await page.click(".LC20lb");
		await page.waitForTimeout(2000);
		expect(await page.title()).to.be.equal(
			"シリコンバレー式最難関プログラミングブートキャンプ | 💻🚀コードクリサリス"
		);
	});
});

describe("HOTEL PLANISPHERE", () => {
	beforeEach(async () => {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 50,
		});
		expect = chai.expect;
		page = await browser.newPage();
		await page.setViewport({
			width: 1366,
			height: 768,
		});
		await page.goto("https://hotel.testplanisphere.dev/ja/");
	});

	afterEach(() => {
		browser.close();
	});

	it("ログインしないで宿泊予約ができる", async () => {
		let aTags = await page.$x('//a[contains(text(), "宿泊予約")]');
		await aTags[0].click();
		await page.waitForNavigation();

		aTags = await page.$x('//a[contains(text(), "このプランで予約")]');
		await aTags[0].click();
		await page.waitForTimeout(2000);

		page = (await browser.pages())[2];

		await page.type("input[name=username]", "testuser");
		await page.select('select[name="contact"]', "no");

		aTags = await page.$x('//button[contains(text(), "予約内容を確認する")]');
		await aTags[0].click();
		await page.waitForNavigation();

		aTags = await page.$x('//button[contains(text(), "この内容で予約する")]');
		await aTags[0].click();
		await page.waitForTimeout(500);

		const modal = await page.$(".modal");
		expect(await modal).not.to.be.equal(null);
	});

	it("ログインができる", async () => {
		let aTags = await page.$x('//a[contains(text(), "ログイン")]');
		await aTags[0].click();
		await page.waitForTimeout(2000);

		await page.type("input[name=email]", "ichiro@example.com");

		await page.type("input[name=password]", "password");
		await page.keyboard.press("Enter");
		await page.waitForTimeout(2000);

		aTags = await page.$x('//a[contains(text(), "宿泊予約")]');
		await aTags[0].click();
		await page.waitForNavigation();

		aTags = await page.$x('//a[contains(text(), "このプランで予約")]');
		await aTags[0].click();
		await page.waitForTimeout(2000);

		page = (await browser.pages())[2];

		await page.select('select[name="contact"]', "no");

		aTags = await page.$x('//button[contains(text(), "予約内容を確認する")]');
		await aTags[0].click();
		await page.waitForNavigation();

		aTags = await page.$x('//button[contains(text(), "この内容で予約する")]');
		await aTags[0].click();
		await page.waitForTimeout(500);

		const modal = await page.$(".modal");
		expect(await modal).not.to.be.equal(null);
	});
});

// xdescribe("twitter", () => {
// 	beforeEach(async () => {
// 		browser = await puppeteer.launch({
// 			headless: false,
// 			slowMo: 100,
// 		});
// 		expect = chai.expect;
// 		page = await browser.newPage();
// 		await page.goto("https://twitter.com/i/flow/login", {
// 			waitUntil: "networkidle2",
// 		});
// 	});

// 	afterEach(() => {
// 		browser.close();
// 	});

// 	it("ログインが成功した際に/homeに遷移する", async () => {
// 		await page.type("input[name=text]", process.env.USER_NAME);
// 		await page.keyboard.press("Enter");
// 		await page.waitForTimeout(2000);
// 		await page.type("input[name=password]", process.env.PASSWORD);
// 		await page.keyboard.press("Enter");
// 		await page.waitForTimeout(2000);
// 		expect(await page.url()).to.be.equal("https://twitter.com/home");
// 	});
// });
