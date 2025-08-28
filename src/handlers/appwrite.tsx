import { Client, Account } from "appwrite";

console.log("Endpoint:", import.meta.env.VITE_APPWRITE_ENDPOINT);
console.log("Project ID:", import.meta.env.VITE_APPWRITE_PROJECT_ID);

const client = new Client()
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setDevKey(import.meta.env.VITE_DEV_API_KEY);

const account = new Account(client);

export { client, account };
