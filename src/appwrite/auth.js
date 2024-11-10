import conf from "../config/config";
import { Client, Account, ID } from "appwrite";

class AuthService {
    client = new Client()
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectID)
        this.account = new Account(this.client)
    }

    async createAccount({ email , password , name }) {
        try {
            const userAccount = await this.account.create(ID.unique() , email , password , name)
            if(userAccount) { 
                //Either login the user directly or show a popup
                return this.login({ email , password })
            }
            else { return userAccount  }
        } catch (error) {
            console.error(error)
        }
    }

    async login({ email , password }){
        try{
            await this.account.createEmailPasswordSession(ID.unique() , email , password)
        }
        catch(error) {
            console.error(error)
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.error(error)
        }
        return null
    }

    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.error(error)
        }
    }
}

const authService = new AuthService()
export default authService