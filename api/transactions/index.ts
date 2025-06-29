import type { NextApiRequest, NextApiResponse } from "next"
import { MongoClient, ObjectId } from "mongodb"
import jwt from "jsonwebtoken"

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://Atharva_k:atharva262004@cluster0.widhcvt.mongodb.net/financly?retryWrites=true&w=majority&appName=Cluster0"
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

function verifyToken(req: NextApiRequest) {
  const token = req.headers.authorization?.replace("Bearer ", "")

  if (!token) {
    throw new Error("No token provided")
  }

  return jwt.verify(token, JWT_SECRET)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new MongoClient(MONGODB_URI)

  try {
    // Verify authentication
    const decoded = verifyToken(req)

    await client.connect()
    const db = client.db("financly")
    const transactionsCollection = db.collection("transactions")

    switch (req.method) {
      case "GET":
        const { page = 1, limit = 10, search, category, status } = req.query

        const filter: any = {}

        if (search) {
          filter.$or = [{ user_id: { $regex: search, $options: "i" } }, { amount: { $regex: search, $options: "i" } }]
        }

        if (category && category !== "all") {
          filter.category = category
        }

        if (status && status !== "all") {
          filter.status = status
        }

        const transactions = await transactionsCollection
          .find(filter)
          .sort({ date: -1 })
          .skip((Number(page) - 1) * Number(limit))
          .limit(Number(limit))
          .toArray()

        const total = await transactionsCollection.countDocuments(filter)

        res.status(200).json({
          transactions,
          pagination: {
            page: Number(page),
            limit: Number(limit),
            total,
            pages: Math.ceil(total / Number(limit)),
          },
        })
        break

      case "POST":
        const newTransaction = {
          ...req.body,
          date: new Date().toISOString(),
          createdAt: new Date(),
        }

        const result = await transactionsCollection.insertOne(newTransaction)

        res.status(201).json({
          id: result.insertedId,
          ...newTransaction,
        })
        break

      case "DELETE":
        const { id } = req.query

        if (!id) {
          return res.status(400).json({ message: "Transaction ID is required" })
        }

        await transactionsCollection.deleteOne({ _id: new ObjectId(id as string) })

        res.status(200).json({ message: "Transaction deleted successfully" })
        break

      case "PUT":
        const { id: updateId } = req.query

        if (!updateId) {
          return res.status(400).json({ message: "Transaction ID is required" })
        }

        const updateResult = await transactionsCollection.updateOne(
          { _id: new ObjectId(updateId as string) },
          { $set: { ...req.body, updatedAt: new Date() } },
        )

        if (updateResult.matchedCount === 0) {
          return res.status(404).json({ message: "Transaction not found" })
        }

        res.status(200).json({ message: "Transaction updated successfully" })
        break

      default:
        res.status(405).json({ message: "Method not allowed" })
    }
  } catch (error) {
    console.error("API error:", error)
    res.status(500).json({ message: "Internal server error" })
  } finally {
    await client.close()
  }
}
