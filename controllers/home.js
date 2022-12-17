const path = require(`path`)

const home = async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'home.html'))
}

module.exports = home