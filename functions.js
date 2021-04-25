const puppeteer = require('puppeteer');

const instagram = {
    browser: null,
    page: null,

    login : async (username, password) => {

        instagram.browser = await puppeteer.launch({headless: false})
        instagram.page = await instagram.browser.newPage()
        await instagram.page.goto('https://www.instagram.com/', {waitUntil: 'networkidle2'})

        await instagram.page.type('input[name="username"]', username, {delay: 0})
        await instagram.page.type('input[name="password"]', password, {delay: 0})
        
        let loginButton = await instagram.page.$x('//div[contains(text(), "Entrar")]')
        await loginButton[0].click()

        await instagram.page.waitForSelector('nav svg[aria-label = "Página inicial"]')

        await delay(5000)

    },
    
    likeAndComentTagsPosts : async (searchTag, tags, coments) => {
        for(let tag of tags){
            
            await instagram.page.goto(searchTag(tag), {waitUntil: "networkidle2"})

            let posts = await instagram.page.$$('article > div:nth-child(3) img[decoding = "auto"]')
            
            for(let i = 0; i < posts.length; i++){
                let post = posts[i]

                await delay(randomNumber(1000, 2000))
                await post.click()
                await delay(randomNumber(1000, 2000))

                // Like and Coment 

                let isLikeble = await instagram.page.$('section svg[aria-label = "Curtir"]') 

                if(isLikeble){
                    await instagram.page.click('svg[aria-label = "Curtir"]')

                    let textarea = await instagram.page.$('textarea[aria-label = "Adicione um comentário..."]')
                    let toComent = randomNumber(1, 4)

                    if(textarea && toComent === 1){
                        await instagram.page.type('textarea[aria-label = "Adicione um comentário..."]', 
                        coments[randomNumber(0, coments.length)], {delay: randomNumber(200, 300)})

                        await instagram.page.click('form > button[type = "submit"]')
                        await delay(randomNumber(7000, 10000))
                    }
                }

                await instagram.page.click('svg[aria-label="Fechar"]')

            }
            await delay (5000)
        }
    },

    close : async () => {
        await instagram.browser.close()
    }

}

function delay(time) {
    return new Promise (function (resolve) {
        setTimeout(resolve, time)
    })
}

function randomNumber (min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

module.exports = instagram