import dbConnect from './mongo'; // Update the path as necessary

async function testDbConnection() {
  try {
    // Connect to the database
    const db = await dbConnect();
    
    // Perform a simple operation to ensure the connection works
    const adminDb = db.admin();
    const { databases } = await adminDb.listDatabases();
    
    console.log('Successfully connected to the database');
    console.log('Databases:', databases);
    
    // Optional: Test inserting a document
    const testCollection = db.collection('test-collection');
    const result = await testCollection.insertOne({ test: 'data' });
    console.log('Insert result:', result);

    // Clean up test data
    await testCollection.deleteOne({ _id: result.insertedId });
  } catch (error) {
    console.error('Failed to connect to the database:', error.message);
  }
}

export default testDbConnection
// Call the test function
testDbConnection();
