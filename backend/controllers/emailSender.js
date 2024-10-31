const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "rohitkokane073@gmail.com",
    pass: "fwyxjtqziuvmmvmk",
  },
});

async function sendOTP(email, otp) {
  const msg = await transporter.sendMail({
    from: "rohitkokane073@gmail.com",
    to: email,
    subject: "Your One-Time Password (OTP) for Witch",
    html: `<body class="bg-gray-100 font-sans">
  <div class="max-w-lg mx-auto mt-12 bg-white p-8 rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold text-gray-800 text-center mb-6">Your OTP Code</h1>
    
    <p class="text-gray-600 text-center mb-4">Hello,</p>
    <p class="text-gray-600 mb-4">We have received a request to verify your email for <strong class="font-semibold">Witch</strong>. Use the OTP code below to complete the process:</p>
    
    <!-- Display OTP -->
    <div class="text-2xl font-bold text-gray-800 bg-gray-100 p-4 rounded-md text-center mb-4">
      ${otp}
    </div>
    
    <p class="text-gray-600 text-center mb-4">If you did not request this, please ignore this email.</p>
    
    <p class="text-gray-600 text-center mb-4">Thank you,</p>
    <p class="text-gray-800 text-center font-semibold">Witch Ecom</p>
    
    <div class="text-center text-gray-500 mt-6 text-sm">
      <p>© 2024 Witch Ecom. All rights reserved.</p>
    </div>
  </div>
</body>`,
  });
  console.log("OTP Sent");
  return;
}

async function registrationSuccessfullEmail(email) {
  await transporter.sendMail({
    from: "rohitkokane073@gmail.com",
    to: email,
    subject: "Account Created Successfully !!!",
    html: `<body style="font-family: 'Inter', sans-serif; background-color: #f3f4f6; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      
      <!-- Header -->
      <div style="background-color: #10b981; padding: 20px; text-align: center; color: white;">
        <h1 style="font-size: 24px; font-weight: 600; margin: 0;">Welcome to Our Platform!</h1>
      </div>
      
      <!-- Content -->
      <div style="padding: 20px;">
        <h2 style="font-size: 18px; font-weight: 600; color: #1f2937; margin-bottom: 16px;">Account Successfully Created!</h2>
        <p style="color: #4b5563; margin-bottom: 16px;">
          Hi there, <br /><br />
          We're excited to have you on board. Your account has been created successfully. You can now log in and start using our services.
        </p>
        <a href="http://localhost:5173/login" style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 20px;">Login to your account</a>
      </div>
      
      <!-- Footer -->
      <div style="background-color: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px;">
        <p style="margin: 0;">If you have any questions, feel free to reach out to us.</p>
        <p style="margin-top: 8px;">© 2024 Witch. All rights reserved.</p>
      </div>
    </div>
  </body>`,
  });
}

module.exports = { sendOTP, registrationSuccessfullEmail };
