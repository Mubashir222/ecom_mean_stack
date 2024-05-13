const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const {DbConnect} = require('./database/Connection');
const errorHandler = require("./error/ErrorHandler")
const userRoutes = require('./routes/UserRoutes');
const forgotPasswordRoutes = require('./routes/ChangePasswordRoutes');
const AdminRoutes = require('./routes/AdminRoutes');
const UploadImageRoutes = require('./routes/UploadImgRoutes');
const BlogRoutes = require("./routes/BlogRoutes")
const CommonRoutes = require("./routes/CommonRoutes")
const ContactRoutes = require("./routes/ContactRoutes")
const UserApplication = require("./routes/UserApplyFormRoutes")
const MultiFiles = require("./routes/MultiFilesRoutes")
const Dropdown = require("./routes/DropdownOptionRoutes")
const DropdownOptionData = require("./routes/DropdownOptionDataRoutes")
const bodyParser = require('body-parser');

const app = express();
dotenv.config();

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}));

DbConnect();

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));

app.use(errorHandler);


app.use('/api', userRoutes);
app.use('/user', forgotPasswordRoutes);
app.use('/admin', AdminRoutes);
app.use('/data', UploadImageRoutes);
app.use('/blog', BlogRoutes);
app.use('/common', CommonRoutes);
app.use('/contact', ContactRoutes);
app.use('/application', UserApplication);
app.use('/multi-files', MultiFiles);
app.use('/dropdown', Dropdown)
app.use('/dropdown-option-data', DropdownOptionData)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
});
