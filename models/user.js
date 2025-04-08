const { OAuth2Client } = require('google-auth-library');
const mongoose = require('mongoose');


const GOOGLE_CLIENT_ID ="305442303084-f27u9i18c0jc472hc68a3dqiiepo10vg.apps.googleusercontent.com";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'donor' },
    google_id: { type: String, unique: true, sparse: true } 
  });


  userSchema.statics.createUser = async function ({ name, email, role = 'donor' }) {
    const user = new this({ name, email, role });
    await user.save();
    return { id: user._id, name, email, role };
  };

  userSchema.statics.findByEmail = async function (email) {
    return this.findOne({ email });
  };
    
   

  userSchema.statics.findOrCreateByGoogle = async function (profile) {
    const { sub: googleId, email, name } = profile;
    let user = await this.findOne({ $or: [{ google_id: googleId }, { email }] });
    if (!user) {
      user = new this({ google_id: googleId, email, name, role: 'donor' });
      await user.save();
    }
    return { id: user._id, google_id: googleId, email, name, role: user.role };
  };
  
  userSchema.statics.loginWithGoogle = async function (idToken) {
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
  };
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;