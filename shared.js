const { MongoClient } = require("mongodb");

module.exports = {
  selectedDb: {},
  async connect() {
    try {
      const client = await MongoClient.connect(
        "mongodb+srv://vijayoffcl:E5XwmavXxl4h5EnK@cluster0.16pmykl.mongodb.net/?retryWrites=true&w=majority"
      );
      this.selectedDb = client.db("BookHall");
      console.log(this.selectedDb);
    } catch (error) {
      console.log(error);
    }
  },
};
