import conf from "../config/config";
import { Client , ID , Databases , Storage , Query  } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectID)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title , slug , content , featuredImage , status , userId }){
        try {
            return await this.databases.createDocument(conf.appWriteDatabaseID , conf.appWriteCollectionID , slug , {
                title,
                content,
                featuredImage,
                status,
                userId
            })
        } catch (error) {
            console.error(error)
        }
    }

    async updatePost(slug , { title , content , featuredImage , status }){
        try {
            return await this.databases.updateDocument(conf.appWriteDatabaseID , conf.appWriteCollectionID , slug , {
                title,
                content,
                featuredImage,
                status,
            })
        } catch (error) {
            console.error(error)
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(conf.appWriteDatabaseID , conf.appWriteCollectionID , slug)
        } catch (error) {
            console.error(error)
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(conf.appWriteDatabaseID , conf.appWriteCollectionID , slug)
        } catch (error) {
            console.error(error)
            return false;
        }
    }

    //Need index in appwrite - database - index to use query
    async getPosts(queries = [ Query.equal("status" , "active") ]) {
        try {
            return await this.databases.listDocuments(conf.appWriteDatabaseID , conf.appWriteCollectionID , queries)
        } catch (error) {
            console.error(error);
            return false
        }
    }

    //for file upload

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(conf.appWriteBucketID . ID.unique() , file)
        } catch (error) {
            console.error(error);
            return false
        }
    } //success returns the file ID used as featuredImage in create/update post

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appWriteBucketID , fileId)
            return true
        } catch (error) {
            console.error(error);
            return false
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(conf.appWriteBucketID , fileId)
    }
}

const service = new Service()
export default service