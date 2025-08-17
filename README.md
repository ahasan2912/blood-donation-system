# Project Name: Smart blood donation system
The Smart Blood Donation Platform is a full-stack application that efficiently connects blood donors, recipients, and hospitals. It enables seamless donor registration, quick matching of urgent blood requests, and leverages NodeMailer to send automated email notifications for effective communication. By reducing delays and improving coordination, the platform plays a vital role in saving lives and strengthening healthcare outcomes.
# Role Base
Blood donation System four roles: **Admin**,**Donor**,**Recipient** and **Hospital**.
- **Admin Email:** ahasanhabib2912@gmail.com
- **Admin Password:** %Diu123%

## 1. Admin
- Manage users (donors, recipients, hospitals).
- Approve or reject hospital requests.
- Monitor blood requests and donation history.
- Send notifications to donors or recipients.

## 2. Hospital
- Send request to the Admin for approval.
- Create urgent blood requests.
- View list of available donors by blood group & location.
- Track donor confirmations and request status.

## 3. Donor
- Register with name, blood group, contact info, location.
- Receive notifications via email (NodeMailer).
- Accept or reject a donation request.
- Track personal donation history.

## 4. Recipient
- Request blood (with type, units, urgency, location).
- Get notified when a donor accepts.
- Contact donor via phone/email.
- Track request status in dashboard.
- View available donors by **blood type and location, ensuring both division and district** match the recipient’s requirements.

## 5. Tech Stack
- **Frontend:** React.js, Tailwind CSS, DaisyUI.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB.
- **Authentication:** Firebase Authentication.
- **Email Service:** NodeMailer.
- **Hosting:** Firebase (Frontend), Vercel (Backend).

## 6. Features
- User Authentication (Login / Register with Firebase).
- Donor Profile Management.
- Real-time Blood Request System.
- Automated Email Notifications for urgent requests.
- Hospital-side request approval & management.
- Admin Dashboard for monitoring all activities.
- Responsive UI with Tailwind CSS.

## 7. Future Improvements
- Location-based donor search using Google Maps API.
- Mobile App version with Flutter/React Native.
- Realtime communication between donors, recipients, and hospitals using Socket.IO.

## 8. Installation & Setup
- git clone https://github.com/ahasan2912/blood-donation-system.git
- cd blood-donation-clientside
- npm install
- cd blood-donation-serverside
- npm install

## 9. Deploying with Firebase
## [Live-site: ](https://blood-donation-applicati-eff4d.web.app/)
