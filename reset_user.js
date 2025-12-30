const mongoose = require('mongoose');
const User = require('./backend/models/User');
require('dotenv').config({ path: './backend/.env' });

const emailToReset = process.argv[2];

if (!emailToReset) {
    console.error('Please provide an email to reset.');
    process.exit(1);
}

const resetUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const user = await User.findOne({ email: emailToReset });

        if (!user) {
            console.log('User not found');
            process.exit(1);
        }

        console.log(`Resetting user: ${user.email} (Current Role: ${user.role})`);

        user.role = 'unassigned';
        // Clear Seeker fields
        user.community = undefined;
        user.subSect = undefined;
        user.gotra = undefined;
        user.nakshatra = undefined;
        user.rashi = undefined;
        user.languages = [];
        // Clear Priest fields
        user.specialization = [];
        user.experience = undefined;
        user.qualificationRegular = undefined;
        user.qualificationDharmic = undefined;
        user.preferredTiming = undefined;
        user.occupation = undefined;
        user.bio = undefined;

        await user.save();
        console.log('User reset to unassigned successfully.');
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

resetUser();
