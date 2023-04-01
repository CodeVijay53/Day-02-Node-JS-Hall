const mongo = require("../shared");
const { ObjectId } = require("mongodb");

//Reading response
module.exports.readroom = async (req, res, next) => {
  try {
    var readRes = await mongo.selectedDb.collection("room").find().toArray();
    res.send(readRes);
  } catch (err) {
    console.log(err);
  }
};

//Create
module.exports.createroom = async (req, res, next) => {
  try {
    var createRes = await mongo.selectedDb
      .collection("room")
      .insertOne(req.body);
    res.send(createRes);
  } catch (err) {
    console.log(err);
  }
};

//Update
module.exports.updateroom = async (req, res, next) => {
  try {
    var updateRes = await mongo.selectedDb
      .collection("room")
      .updateOne({ _id: ObjectId(req.params.Id) }, { $set: { ...req.body } });
    res.send(updateRes);
  } catch (err) {
    console.log(err);
  }
};

//Delete
module.exports.deleteroom = async (req, res, next) => {
  try {
    var deleteRes = await mongo.selectedDb
      .collection("room")
      .remove({ _id: ObjectId(req.params.Id) });
    res.send(deleteRes);
  } catch (err) {
    console.log(err);
  }
};

//Create BookRoom
module.exports.createBookRoom = async (req, res, next) => {
  try {
    var createRoom = await mongo.selectedDb
      .collection("bookroom")
      .insertOne(req.body);
    res.send(createRoom);
  } catch (err) {
    console.log(err);
  }
};

//Create Booked data
module.exports.createBookeddata = async (req, res, next) => {
  try {
    var createBookeddata = await mongo.selectedDb
      .collection("booked-data")
      .insertOne(req.body);
    res.send(createBookeddata);
  } catch (err) {
    console.log(err);
  }
};

//Create Room booking list
module.exports.createBookedRoomList = async (req, res, next) => {
  try {
    var createBookedRoomList = await mongo.selectedDb
      .collection("booked-data")
      .aggregate([
        {
          $lookup: {
            from: "bookroom",
            localField: "RoomID",
            foreignField: "RoomID",
            as: "BookedRoomList",
          },
        },
        {
          $unwind: "$BookedRoomList",
        },
        {
          $project: {
            _id: 0,
            RoomName: "$BookedRoomList.RoomName",
            Bookedstatus: "Success",
            CustomerName: "$BookedRoomList.CustomerName",
            Date: "$BookedRoomList.Date",
            StartTime: "$BookedRoomList.StartTime",
            EndTIme: "$BookedRoomList.EndTime",
          },
        },
      ])
      .toArray();
    res.send(createBookedRoomList);
  } catch (err) {
    console.log(err);
  }
};

// Customer with booked data
module.exports.createCustomerData = async (req, res, next) => {
  try {
    const data = await mongo.selectedDb
      .collection("bookroom")
      .aggregate([
        {
          $lookup: {
            from: "booked-data",
            localField: "RoomID",
            foreignField: "RoomID",
            pipeline: [
              {
                $project: {
                  _id: 0,
                },
              },
            ],
            as: "Customer_data",
          },
        },
      ])
      .project({ _id: 0, room_id: 0, Bookingid: 0 })
      .toArray();

    res.send(createCustomerData);
  } catch (err) {
    console.log(err);
  }
};
