import config from "../config/config.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

const VITE_APPWRITE_URL = "https://cloud.appwrite.io/v1";
const VITE_APPWRITE_PROJECT_ID = "651b924ca6482e4a3bbc";
const VITE_APPWRITE_DATABASE_ID = "651b931618da54b5aa27";
const VITE_APPWRITE_COLLECTION_ID = "651b93398cf3f2e90e66";
const VITE_APPWRITE_BUCKET_ID = "651b94365f8e485c6f80";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(VITE_APPWRITE_URL)
      .setProject(VITE_APPWRITE_PROJECT_ID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        VITE_APPWRITE_DATABASE_ID,
        VITE_APPWRITE_COLLECTION_ID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        VITE_APPWRITE_DATABASE_ID,
        VITE_APPWRITE_COLLECTION_ID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        VITE_APPWRITE_DATABASE_ID,
        VITE_APPWRITE_COLLECTION_ID,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        VITE_APPWRITE_DATABASE_ID,
        VITE_APPWRITE_COLLECTION_ID,
        slug
      );
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        VITE_APPWRITE_DATABASE_ID,
        VITE_APPWRITE_COLLECTION_ID,
        queries
      );
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }

  // file upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        VITE_APPWRITE_BUCKET_ID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(VITE_APPWRITE_BUCKET_ID, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(VITE_APPWRITE_BUCKET_ID, fileId);
  }
}

const service = new Service();
export default service;
