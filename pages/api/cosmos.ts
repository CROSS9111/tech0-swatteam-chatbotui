const { CosmosClient } = require("@azure/cosmos");

const databaseId = process.env.COSMOS_DB_ID;
const containerId = process.env.COSMOS_CON_ID;
const endpoint = "https://cosmosdb-entchatgpt-kizoe.documents.azure.com:443/"; 
//URLは直接入力でないとエラー
const key = process.env.COSMOS_DB_KEY;
const client = new CosmosClient({ endpoint, key });

const saveToCosmosDB = async (item: any) => {    

    console.log("item",item)

    const container = client.database(databaseId).container(containerId);
    try {
        const { resource: createdItem } = await container.items.create(item);
        console.log(`Item created:\n${JSON.stringify(createdItem, null, 2)}`);
        return createdItem;
    } catch (error) {
        const anyError = error as any; // errorをany型にキャスト
        console.error(`Error creating item: ${anyError.message}`);
        throw new Error(`Failed to save item to Cosmos DB: ${anyError.message}`);
    }
};

export default saveToCosmosDB;