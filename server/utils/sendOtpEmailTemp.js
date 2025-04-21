export const sendOtpEmailTemp = (name = "User", otp = "123456") => `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa; padding: 40px 0;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background-color: #15803d; padding: 20px; color: white; text-align: center;">
        <h1 style="margin: 0; font-size: 28px;">Reset Your Password</h1>
      </div>
      
      <!-- Body -->
      <div style="padding: 30px;">
        <p style="font-size: 16px;">Hi <strong>${name}</strong>,</p>
        <p style="font-size: 16px;">We received a request to reset your password for your <strong>kartIt</strong> account.</p>
        <p style="font-size: 16px;">Use the OTP below to reset your password:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <div style="display: inline-block; background-color: #15803d; color: white; padding: 14px 28px; border-radius: 8px; font-size: 24px; letter-spacing: 4px; font-weight: bold;">
            ${otp}
          </div>
        </div>

        <p style="font-size: 14px; color: #555;">This OTP is valid for the next 10 minutes. If you did not request a password reset, please ignore this email.</p>

        <p style="font-size: 16px;">Stay safe,<br/>Team kartIt 🔐</p>
      </div>

      <!-- Footer -->
      <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #888;">
        © ${new Date().getFullYear()} kartIt by Keshav Singhania. All rights reserved.
      </div>

    </div>
  </div>
`;
