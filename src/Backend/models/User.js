const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema({
name: String,
email: { type: String, unique: true },
password: String,
role: { type: String, enum: ["Student", "Admin", "Counselor"], default: "Student" }
}, { timestamps: true });


userSchema.pre("save", async function () {
if (this.isModified("password")) {
this.password = await bcrypt.hash(this.password, 10);
}
});


userSchema.methods.comparePassword = function (pass) {
return bcrypt.compare(pass, this.password);
};


module.exports = mongoose.models.User || mongoose.model("User", userSchema);