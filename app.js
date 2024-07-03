const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const port = process.env.SERVER_PORT || 3000;
require('dotenv').config();

async function main() {
	try {
		// Verification database and install database
		await connectDB();

		const app = express();
		app.use(bodyParser.json())
		app.use(bodyParser.urlencoded({ extended: false }))

		const authRoutes = require('./routes/authRoutes');
		app.use('/auth', authRoutes);

		app.listen(port, () => {
			console.log(`OAuth app listening on port ${port}`);
		});
	} catch (error) {
		console.error('Error starting the server:', error);
		process.exit(1); // Exit the process with an error code
	}
}

main();