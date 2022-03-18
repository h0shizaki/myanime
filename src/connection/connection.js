const mongoose = require('mongoose')

const connectToDB = async () => {
    const URI = process.env.MONGODB_URI;
    try {
        await mongoose.connect(URI)
    } catch (err) {
        console.error(err)
    }

}

const insertToDB = async (payload, model) => {
    connectToDB();
    result = await model.create(payload);
    return result;

}

const findAll = async (model) => {
    connectToDB();

    result = await model.find({});
    return result;

}

// export default connectToDB ;
module.exports = {
    connectToDB,
    insertToDB,
    findAll
};