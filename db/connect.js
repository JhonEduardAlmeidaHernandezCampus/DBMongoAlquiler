import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config("../");

export async function con(){
    try {
        const uri = `mongodb+srv://${process.env.User}:${process.env.Password}@cluster0.rpldcx9.mongodb.net/${process.env.Database}`
        const option = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        const client = await MongoClient.connect(uri, option);
        return client.db();

    } catch (error) {
        return {status: 500, message: error}
        
    }
}