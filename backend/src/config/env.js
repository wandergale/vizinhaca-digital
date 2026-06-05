const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

if (!DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in environment variables');
}

if (!PORT) {
    throw new Error('PORT is not defined in environment variables');
}

module.exports = {
    PORT,
    JWT_SECRET,
    DATABASE_URL
};