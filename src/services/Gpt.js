
import OpenAI from "openai";
import UserService from "./User";

export default class GptService{
    constructor(){
        this.openAi = new OpenAI({apiKey:process.env.OPENAI_API_KEY || "fortest"})
    }

    async  simpleAsk(user){
        try {
            const chat = await this.openAi.chat.completions.create({
                messages:[{role:"user", content: user.message}],
                model:"gpt-4o-mini",
                max_tokens: 450
            })
            const content = chat.choices[0].message.content
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
