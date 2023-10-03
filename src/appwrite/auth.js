/* eslint-disable no-useless-catch */
import config from "../config/config";
import { Client, Account, ID } from "appwrite";

const VITE_APPWRITE_URL = "https://cloud.appwrite.io/v1";
const VITE_APPWRITE_PROJECT_ID = "651b924ca6482e4a3bbc";
const VITE_APPWRITE_DATABASE_ID = "651b931618da54b5aa27";
const VITE_APPWRITE_COLLECTION_ID = "651b93398cf3f2e90e66";
const VITE_APPWRITE_BUCKET_ID = "651b94365f8e485c6f80";


export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(VITE_APPWRITE_URL)
      .setProject(VITE_APPWRITE_PROJECT_ID);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;

