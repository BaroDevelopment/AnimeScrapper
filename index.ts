import puppeteer from 'puppeteer'

const MAC_EXECUTABLE_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

(
    async () => {
        const browser = await puppeteer.launch({headless: false, defaultViewport: null, slowMo: 5, executablePath: MAC_EXECUTABLE_PATH});
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36')

        await page.goto('https://vuetifyjs.com/en/getting-started/quick-start', {waitUntil: "networkidle2"})

        await page.type('input[id="doc-search"]', 'Kosomak George' , {delay: 20})
        await page.keyboard.press('Enter');

        // await browser.close();
    }
)()

async function crunchyRoll(page){
    await page.goto('http://www.crunchyroll.com/videos/anime/updated', {waitUntil: "networkidle2"})
    const data = []
    const entries = await page.$$('ul[class*="portrait-grid"] > li')
    for (const entry of entries){

        const title = await entry.$eval(('span[class*="series-title"]'), node => node.textContent.trim())
        const episode = await entry.$eval(('span[class*="series-data"]'), node => node.textContent.split('–')[0].replace('Ep', 'Episode').trim())
        const url = 'https://www.crunchyroll.com/' + await entry.$eval(('a[class*="portrait-element"]'), node => node.getAttribute('href'))
        const img = await entry.$eval(('img[class="portrait"]'), node => node.getAttribute('src'))
        data.push({title, episode, url, img})
    }
    return data
}

async function gogoAnime(page){
    await page.goto('https://www9.gogoanime.io/', {waitUntil: "networkidle2"})
    const data = []
    const entries = await page.$$('ul[class="items"] > li')
    for (const entry of entries){

        const title = await entry.$eval(('p[class="name"] > a'), node => node.textContent.trim())
        const episode = await entry.$eval(('p[class="episode"]'), node => node.textContent.trim())
        const url = 'https://www1.gogoanime.movie' + await entry.$eval(('div[class="img"] > a'), node => node.getAttribute('href'))
        const img = await entry.$eval(('div[class="img"] > a > img'), node => node.getAttribute('src'))
        data.push({title, episode, url, img})
    }
    return data
}

async function nineAnime(page){
    await page.goto('https://9anime.ru/updated', {waitUntil: "networkidle2"})
    const data = []
    const entries = await page.$$('div[class="film-list"] > div[class="item"]')
    for (let entry of entries) {
        const title = await entry.$eval(('a[class="name"'), node => node && node.textContent && node.textContent.trim());
        const episode = await entry.$eval(('div[class="status"'), node => node && node.textContent && node.textContent.trim());
        const url = await entry.$eval(('div[class="inner"]'), node => node && node.firstElementChild && node.firstElementChild.getAttribute('href'));
        const img = 'http:' + await entry.$eval(('img'), node => node && node.getAttribute('src'));
        data.push({title, episode, url, img})
    }
    return data
}