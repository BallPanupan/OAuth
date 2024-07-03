const { client } = require('../mongodb');

async function createUsersCollection() {
	const db = client.db();
	const usersCollectionExists = await db.listCollections({ name: 'users' }).hasNext();

	// Manual Validation: You can manually validate data before inserting or 
	// updating it into the database using standard JavaScript logic.

	const schema = {
		firstName: 'string',
		lastName: 'string',
		email: 'string',
		username: 'string',
		password: 'string',
	}
	
	if (!usersCollectionExists) {
		await db.createCollection('users');

		// Create an index on the email field
		await db.collection('users').createIndex({ email: 1 }, { unique: true });
		console.log('[ Database ]: Create a `users` Collection.')
	}

}

async function getUsersCollection() {
	await createUsersCollection();
	return client.db().collection('users');
}

module.exports = getUsersCollection;
