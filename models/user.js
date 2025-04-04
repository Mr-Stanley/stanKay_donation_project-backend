const database = require('../configuration/database.js'); 
const { OAuth2Client } = require('google-auth-library');
const mongoose = require('mongoose');


const GOOGLE_CLIENT_ID ="305442303084-f27u9i18c0jc472hc68a3dqiiepo10vg.apps.googleusercontent.com"
;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'donor' },
    google_id: { type: String, unique: true, sparse: true } 
  });

  const UserModel = mongoose.model('User', userSchema);



class UserClass {
  static async create({ name, email, role = 'donor' }) {
    const user = new UserModel({ name, email, role });
    console.log('User before save:', user); // Add this
    await user.save(); 
    return { id: user._id, name, email, role };
  }


static async findByEmail(email) {
    return await User.findOne({ email }); 
  }
    
   

static async findOrCreateByGoogle(profile) {
    const { sub: googleId, email, name } = profile;
    let user = await UserModel.findOne({ $or: [{ google_id: googleId }, { email }] });
    
    if (!user) {
      user = new UserModel({ google_id: googleId, email, name, role: 'donor' });
      await user.save();
    }
    return { id: user._id, google_id: googleId, email, name, role: user.role };
  }

  static async loginWithGoogle(idToken) {
    const { OAuth2Client } = require('google-auth-library');
    const GOOGLE_CLIENT_ID = "305442303084-f27u9i18c0jc472hc68a3dqiiepo10vg.apps.googleusercontent.com";
    const client = new OAuth2Client(GOOGLE_CLIENT_ID);

    try {
      const ticket = await client.verifyIdToken({
        idToken,
        audience: GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      return await this.findOrCreateByGoogle(payload);
    } catch (error) {
      console.error('Google token verification failed:', error);
      return null;
    }
  }
}
Object.assign(UserClass, UserModel); 

module.exports = UserModel;