export const registrationTemplate = (name = "User", verifyEmailUrl) => `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa; padding: 40px 0;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background-color: #15803d; padding: 20px; color: white; text-align: center;">
        <h1 style="margin: 0; font-size: 28px;">Welcome to <span style="color: #ffcc00;">kartIt</span>!</h1>
      </div>
      
      <!-- Body -->
      <div style="padding: 30px;">
        <p style="font-size: 16px;">Hi <strong>${name}</strong>,</p>
        <p style="font-size: 16px;">Thank you for registering on <strong>kartIt</strong> – your one-stop shop for everything! 🛒</p>
        <p style="font-size: 16px;">To complete your registration and activate your account, please verify your email address by clicking the button below:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verifyEmailUrl}" style="background-color: #15803d; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Verify Email
          </a>
        </div>

        <p style="font-size: 14px; color: #555;">If you didn’t create an account on kartIt, you can safely ignore this email.</p>
        
        <p style="font-size: 16px;">Cheers,<br/>Team kartIt 🚀</p>
      </div>

      <!-- Footer -->
      <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #888;">
        © ${new Date().getFullYear()} kartIt by Keshav Singhania. All rights reserved.
      </div>

    </div>
  </div>
`;
