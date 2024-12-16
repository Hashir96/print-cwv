
const puppeteer = require('puppeteer-extra')
const {executablePath} = require('puppeteer')
const prompt = require("prompt-sync")({ sigint: true });

const pageURL = prompt("Please enter the website URL: ");

// Get hostname
const parsedUrl = new URL(pageURL);
  const parsedUrlh = parsedUrl.hostname;

puppeteer.launch({
    executablePath: executablePath(),
    headless: "new",
}).then(async browser => {

async function run(){
    console.log("Please wait")
    try {
    const page = await browser.newPage();
    await page.setViewport({width: 1280, height: 720});
     await page.goto('https://pagespeed.web.dev/');

     await page.waitForTimeout(1000);

    await page.type('#i4', pageURL);

    await page.keyboard.press('Enter');
    await page.waitForTimeout(3000);
    
    await page.waitForSelector('.lh-scores-header', { visible: true, timeout: 0 });

    // Remove cookies banner
    await page.evaluate(_ => {
        const expectedText = /^(Accept|Accept all cookies|Accept all|Allow|Allow all|Allow all cookies|Ok|Ok, Got it.)$/gi;
        const clickAccept = (selector) => {
            const elements = document.querySelectorAll(selector);
            for (const element of elements) {
                if (element.textContent.trim().match(expectedText)) {
                    element.click();
                    return true;
                }
            }

            return false;
        }

        if (clickAccept('a[id*=cookie i], a[class*=cookie i], button[id*=cookie i] , button[class*=cookie i]')) {
            return;
        }

        // a second try
        clickAccept('a, button');
    });

    // Prevent Page breaks
    const scrollDimension = await page.evaluate( () => {
        return {
            height: document.scrollingElement.scrollHeight
        }
    })

    await page.waitForTimeout(2500);


    // Remove characters from the URL
const URLreplace = pageURL.replace(':',"")
const URLName = URLreplace.split('/').join("");
  const fileName = "pagespeed-"+URLName+".pdf"

    //Print page into PDF
    await page.pdf({ path: fileName, printBackground: true, width: 1280, height: scrollDimension.height});
    console.log("Success, please find the PDF file for the results")
} catch (e) {
    console.log("Error"+e)
} finally {
    await browser.close();
    console.log('Press any key to exit');
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0));
}

};

run();
});