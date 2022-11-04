const {Configuration, OpenAIApi} =  require('openai')
require('dotenv').config()

const config = new Configuration({
    apiKey: process.env.API_KEY
})

const ai = new OpenAIApi(config)

const compute = async (word) => {
    const compute = await ai.createCompletion({
        model: 'text-davinci-002',
        prompt: word,
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    })

    let computed = compute.data.choices[0].text;
    let numbers = computed.replace(/\D/g, 'z').match(/\d+/g).length
    let answer = computed.replace(/\D/g, 'z').match(/\d+/g)?.[numbers - 1];
    return answer;
}

module.exports = {compute}