const express = require('express')
const app = express();
const axios = require('axios')

const PORT = process.env.PORT || 3333;

app.get('/github', async(req, res) => {
    try {
      const response = await axios.get('https://api.github.com/orgs/takenet/repos?direction=asc')
      // console.log(Array.isArray(response.data))
      // const topics = await axios.get(`https://api.github.com/repos/takenet/${response.data[0].name}/languages`,{headers: {
      //   "Accept": "application/vnd.github.v3+json"
      // }})
      return res.send(response.data.filter(r => r.language === 'C#').slice(0, 5))
    } catch (error) {
      console.log({error})
      console.log(error.data)
      return res.status(400).send('Houve um erro ao acessar as informações')
    }
})

app.listen(PORT, () => console.log('Hello World!')) 