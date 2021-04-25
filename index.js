const instagram = require('./functions.js')

const username= require('./config.json')['Username/E-mail'],
    password= require('./config.json').Password,
    searchTag = (tag) => `https://www.instagram.com/explore/tags/${tag}/`,
    tagsForSearch = ['futebol', 'vasco', 'brasileirão', 'brasileirao', 
    'flamengo', 'palmeiras', 'curintia', 'papao', 'cruzeiro', 'inter', 
    'atlético-MG', 'fluminense', 'clube do remo'],
    coments = ['brabo d +', 'boa !!!', 'parabéns pelo trabalho, admiro mto seus posts',
    'incrível !!!', 'loucura !!!', 'd + mermão'];


(async () => {

    await instagram.login(username, password)
    
    await instagram.likeAndComentTagsPosts(searchTag, tagsForSearch, coments)

    await instagram.close()

})()