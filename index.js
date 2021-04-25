const instagram = require('./functions.js')

const username = require('./config.json')['Username/E-mail'],
    password = require('./config.json').Password,
    tagsForSearch = require('./config.json').Hastags,
    coments = require('./config.json').Coments,
    searchTag = (tag) => `https://www.instagram.com/explore/tags/${tag}/`;


(async () => {

    await instagram.login(username, password)
    
    await instagram.likeAndComentTagsPosts(searchTag, tagsForSearch, coments)

    await instagram.close()

})()