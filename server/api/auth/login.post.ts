import {H3Event} from 'h3'

// This is a mock user database for demo purposes
// In a real application, you would connect to a database
const users = [
    {
        id: '1',
        email: 'admin@example.com',
        password: 'admin123', // In real apps, passwords should be hashed
        name: 'Admin User',
        role: 'admin'
    },
    {
        id: '2',
        email: 'user@example.com',
        password: 'user123',
        name: 'Regular User',
        role: 'user'
    }
]

export default defineEventHandler(async (event: H3Event) => {
    try {
        const body = await readBody(event)
        const {email, password} = body

        if (!email || !password) {
            throw createError({
                statusCode: 400,
                message: 'Email and password are required'
            })
        }

        // Find user by email
        const user = users.find(u => u.email === email)

        // Check if user exists and password matches
        if (!user || user.password !== password) {
            throw createError({
                statusCode: 401,
                message: 'Invalid email or password'
            })
        }

        // Create a user object without password to return
        const {password: _, ...userWithoutPassword} = user

        // Generate a mock JWT token (in a real app, use a proper JWT library)
        const token = `mock-jwt-token-${Date.now()}-${user.id}`

        return {
            user: userWithoutPassword,
            token
        }
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || 'Authentication failed'
        })
    }
})
