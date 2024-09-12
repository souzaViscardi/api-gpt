
import OpenAI from "openai";
import UserService from "./User";

export default class GptService{
    constructor(){
        this.openAi = new OpenAI({apiKey:process.env.OPENAI_API_KEY || "fortest"})
    }

    async  simpleAsk(user){
        try {
            // const chat = await this.openAi.chat.completions.create({
            //     messages:[{role:"user", content: user.message}],
            //     model:"gpt-4o-mini",
            //     max_tokens: 450
            // })
            // const content = chat.choices[0].message.content
            const content = "\"Shrek\" é uma animação que conta a história de um ogro chamado Shrek que vive isolado em um pântano. Sua vida tranquila é interrompida quando diversas criaturas de contos de fadas invadem seu lar, enviadas pelo malvado Lorde Farquaad. Para recuperar sua paz, Shrek aceita resgatar a princesa Fiona, que está presa em uma torre guardada por um dragão. Ele é acompanhado por um burro falante e divertido. Ao longo da jornada, Shrek descobre que Fiona guarda um segredo e que a verdadeira beleza pode ser mais do que o exterior. O filme é uma comédia sobre aceitação, amizade e amor verdadeiro."
            const userService = new UserService()
            const data = {
                email: user.email, 
                ask: user.message, 
                resposnse: content
            }
            await userService.saveGptIteration(data)
            return content
        } catch (error) {
            throw new Error(`Error in simpleAsk: ${error.message}`);
        }
    }
}
