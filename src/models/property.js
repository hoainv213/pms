import mongoose from 'mongoose';
const {Schema, Model} = mongoose;
const schema = new Schema({

});

class Property extends Model {

}

export default mongoose.model(Property, schema, 'properties');