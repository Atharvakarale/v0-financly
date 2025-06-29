import { MongoClient } from "mongodb"
import { sampleTransactions } from "../data/sample-transactions"

const MONGODB_URI =
  "mongodb+srv://Atharva_k:atharva262004@cluster0.widhcvt.mongodb.net/financly?retryWrites=true&w=majority&appName=Cluster0"

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db("financly")
    const transactionsCollection = db.collection("transactions")

    // Clear existing data
    await transactionsCollection.deleteMany({})
    console.log("Cleared existing transactions")

    // Insert new data
    const result = await transactionsCollection.insertMany(sampleTransactions)
    console.log(`Inserted ${result.insertedCount} transactions`)

    // Create indexes for better performance
    await transactionsCollection.createIndex({ user_id: 1 })
    await transactionsCollection.createIndex({ date: -1 })
    await transactionsCollection.createIndex({ category: 1 })
    await transactionsCollection.createIndex({ status: 1 })

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await client.close()
  }
}

seedDatabase()
