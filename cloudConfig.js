const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "wanderlust_DEV",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

module.exports = { cloudinary, storage };



/*
====================================
☁️ CLOUDINARY CONFIGURATION SUMMARY
====================================

1️⃣ Purpose
------------
This file integrates **Cloudinary** with your Express app
to store uploaded images in the cloud instead of locally.

2️⃣ Dependencies
----------------
- cloudinary → Cloud-based image and video management service.
- multer-storage-cloudinary → Enables Multer to upload directly to Cloudinary.

3️⃣ Configuration
-----------------
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,      // Your Cloudinary account name
  api_key: process.env.CLOUD_API_KEY,      // Cloudinary API key
  api_secret: process.env.CLOUD_API_SECRET // Cloudinary API secret
});

4️⃣ Storage Setup
-----------------
const storage = new CloudinaryStorage({
  cloudinary,                // Cloudinary instance
  params: {
    folder: "wanderlust_DEV",            // Folder name in Cloudinary dashboard
    allowedFormats: ["jpeg", "png", "jpg"], // Restrict file formats
  },
});

5️⃣ Export
-----------
module.exports = { cloudinary, storage };

✅ This allows usage like:
   const { storage } = require("./cloudConfig");
   const upload = multer({ storage });

====================================
💡 Summary:
This setup ensures all uploaded images (via Multer)
are automatically stored in your Cloudinary "wanderlust_DEV" folder.
====================================
*/
