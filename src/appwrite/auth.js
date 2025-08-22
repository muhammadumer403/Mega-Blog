import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";


export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)  // Make sure this is your actual Appwrite endpoint
      .setProject(conf.appwriteProjectId);  // Make sure this is your actual project ID
    this.account = new Account(this.client);
  }

  // Create a new user account
   // Ensure ID is imported

async createAccount({ email, password, name }) {
    try {
        // Create the user account
        const userAccount = await this.account.create(
            ID.unique(), // Generates a unique ID
            email,
            password,
            name
        );

        console.log("User account created successfully:", userAccount);

        // Automatically log the user in after account creation
        const session = await this.account.createEmailPasswordSession(email, password);
        console.log("User logged in successfully:", session);

        return { userAccount, session };
    } catch (error) {
        console.error("Account creation failed:", error);
        throw error; // Rethrow the error to be handled by the calling function
    }
}


  // Log in the user with email and password
  async login({ email, password }) {
    try {
      // Create a session with email and password
      const session = await this.account.createEmailPasswordSession(email, password);
      console.log("User logged in:", session);
      return session;  // Return the session so it can be used later
    } catch (error) {
      console.error("Login failed:", error);
      throw error;  // Rethrow the error to be handled by the calling function
    }
  }

  // Get the current logged-in user
  async getCurrentUser() {
    if (!this.account || typeof this.account.get !== "function") {
      console.error("this.account is not properly initialized.");
      throw new Error("Account service not available.");
    }
  
    try {
      const user = await this.account.get();
      console.log("Current logged-in user:", user);
      return user;
    } catch (error) {
      console.error("Error fetching current user:", error.message, error);
      throw error; // Ensure calling function handles this error
    }
  }
  

  // Log out the user
  async logout() {
    try {
      await this.account.deleteSessions();  // Delete all sessions (logout)
      console.log("User logged out");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;  // Rethrow the error to be handled by the calling function
    }
  }
}

// Create an instance of the AuthService
const authService = new AuthService();

export default authService;
