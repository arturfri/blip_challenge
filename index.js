const express = require('express')
const app = express();
const axios = require('axios')

const PORT = process.env.PORT || 3333;

app.get('/', (req, res) => res.send('Welcome!'))

app.get('/github', async(req, res) => {
    try {
      const response = await axios.get('https://api.github.com/orgs/takenet/repos?direction=asc')
      // console.log(Array.isArray(response.data))
      // const topics = await axios.get(`https://api.github.com/repos/takenet/${response.data[0].name}/languages`,{headers: {
      //   "Accept": "application/vnd.github.v3+json"
      // }})
      const formatedValues = {}
      response.data.filter(r => r.language === 'C#').slice(0, 5).forEach((item, index) => {
        formatedValues[index] = {
          name: item.full_name,
          description: item.description,
          image: item.owner.avatar_url,
        }
      })
      console.log(formatedValues)
      return res.send(formatedValues)
    } catch (error) {
      console.log({error})
      console.log(error.data)
      return res.status(400).send('Houve um erro ao acessar as informações')
    }
})

app.listen(PORT, () => console.log('Hello World!')) 