import type { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { MongoClient } from "mongodb"

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://Atharva_k:atharva262004@cluster0.widhcvt.mongodb.net/financly?retryWrites=true&w=majority&appName=Cluster0"
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" })
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" })
  }

  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    const db = client.db("financly")
    const usersCollection = db.collection("users")

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const result = await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    })

    // Generate JWT token
    const token = jwt.sign({ userId: result.insertedId, email }, JWT_SECRET, { expiresIn: "7d" })

    res.status(201).json({
      token,
      user: {
        id: result.insertedId,
        name,
        email,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ message: "Internal server error" })
  } finally {
    await client.close()
  }
}
