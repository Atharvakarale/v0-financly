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

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" })
  }

  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    const db = client.db("financly")
    const usersCollection = db.collection("users")

    // Find user by email
    const user = await usersCollection.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" })

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Internal server error" })
  } finally {
    await client.close()
  }
}
