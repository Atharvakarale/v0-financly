import type { NextApiRequest, NextApiResponse } from "next"
import { MongoClient } from "mongodb"
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
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const client = new MongoClient(MONGODB_URI)

  try {
    // Verify authentication
    const decoded = verifyToken(req)

    await client.connect()
    const db = client.db("financly")
    const transactionsCollection = db.collection("transactions")

    const { columns } = req.query
    const selectedColumns = columns
      ? (columns as string).split(",")
      : ["id", "date", "amount", "category", "status", "user_id"]

    const transactions = await transactionsCollection.find({}).toArray()

    // Generate CSV content
    const headers = selectedColumns.join(",")
    const csvRows = transactions.map((transaction) => {
      return selectedColumns
        .map((column) => {
          if (column === "date") {
            return new Date(transaction.date).toLocaleDateString()
          }
          return transaction[column] || ""
        })
        .join(",")
    })

    const csvContent = [headers, ...csvRows].join("\n")

    res.setHeader("Content-Type", "text/csv")
    res.setHeader("Content-Disposition", "attachment; filename=transactions.csv")
    res.status(200).send(csvContent)
  } catch (error) {
    console.error("Export error:", error)
    res.status(500).json({ message: "Internal server error" })
  } finally {
    await client.close()
  }
}
