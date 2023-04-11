const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
    const {prompt} = req.body;

    // const imageSize = size == 'S' ? '256x256' : size == 'M' ? '512x512' : '1024x1024'

    try {
        const response = await openai.createImage({
            prompt,
            n: 1,
            size: '512x512'
        })

        const imageUrl = response.data.data[0].url

        res.status(200).json({
            info: "success",
            image: imageUrl
        })
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
        res.status(400).json({
            info: "error",
            image: null
        })
    }
}

module.exports = { generateImage }