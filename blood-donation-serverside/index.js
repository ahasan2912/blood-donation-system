const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const nodemailer = require("nodemailer");

//middleware 
app.use(cors());
app.use(express.json());

// send eamil using nodemailer
const sendEmail = (emailAddress, emailData) => {
    // create a transpoter
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        },
    });
    transporter.verify((error, success) => {
        if (error) {
            console.log(error)
        }
        else {
            console.log('Transpoter is ready to eamil.', success)
        }
    })

    // transporter.sendMail()
    const mailBody = {
        from: process.env.NODEMAILER_USER, // sender address
        to: emailAddress, // list of receivers
        subject: emailData?.subject, // Subject line
        html: `<p>${emailData?.message}</p>`, // html body
    }

    // send Email
    transporter.sendMail(mailBody, (error, info) => {
        if (error) {
            console.log(error)
        }
        else {
            console.log(info)
            console.log('Email Sent' + info?.response);
        }
    })
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.w0iow.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const db = client.db('blood-donation');
        const userCollection = db.collection('users');
        const donorCollection = db.collection('donors');
        const bloodRequestCollection = db.collection('recipients');
        const bookedDonorCollection = db.collection('bookedDonors');
        const bookedDonorHistoryCollection = db.collection('donateHistory');
        const allReadyBookedCollection = db.collection('allReadyBooked');
        const hospitalCollection = db.collection('hospital');
        const hospitalBloodCollection = db.collection('hospitalBooked');

        // user related api
        app.post('/users', async (req, res) => {
            const user = req.body;
            const query = { email: user?.email }
            const existingUser = await userCollection.findOne(query);
            if (existingUser) {
                return res.send({ message: 'user already exists', insertedId: null })
            } else {
                const result = await userCollection.insertOne({
                    ...user,
                    timestamp: Date.now(),
                    role: 'user'
                });
                res.send(result);
            }
        });

        // total user api
        app.get('/all/users', async (req, res) => {
            const result = await userCollection.find().toArray();
            res.send(result)
        })

        // user role api
        app.get('/users/role/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            try {
                const result = await userCollection.findOne(query);
                if (result) {
                    res.send({ role: result?.role });
                } else {
                    res.status(404).send({ message: "User not found", role: null });
                }
            } catch (error) {
                res.status(500).send({ message: "Server error", role: null });
            }
        })

        // user delete api
        app.delete('/user/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const result = await userCollection.deleteOne(query);

                if (result.deletedCount === 0) {
                    return res.status(404).send({ message: 'User not found or already deleted' });
                }

                res.send({ message: 'User deleted successfully', result });
            } catch (error) {
                console.error('Error deleting user:', error);
                res.status(500).send({ message: 'Internal Server Error', error: error.message });
            }
        });

        // total user api
        app.get('/all/hospital', async (req, res) => {
            const result = await hospitalCollection.find().toArray();
            res.send(result)
        })

        // blood-donor-api for post api
        app.post('/donors', async (req, res) => {
            try {
                const donor = req.body;
                // Check if the donor already exists (by email)
                const existingDonor = await donorCollection.findOne({ email: donor.email });
                if (existingDonor) {
                    return res.status(409).send({ message: 'You have already registered as a donor.' });
                }

                // Check if the you already donor not Registration Recipient
                const existingRecipient = await bloodRequestCollection.findOne({ email: donor.email });
                if (existingRecipient) {
                    return res.status(409).send({ message: 'You have already registered as a Recipient.' });
                }

                // Check if the you already hospital not resgistration donor
                const existingHospital = await hospitalCollection.findOne({ email: donor.email });
                if (existingHospital) {
                    return res.status(409).send({ message: 'You have already registered as a Hospital.' });
                }

                // Check if the your role are admin
                const existAdmin = await userCollection.findOne({ email: donor?.email });
                if (existAdmin?.role === 'admin') {
                    return res.status(409).send({ message: 'Your role have alreay Admin, So you can not Donor.' });
                }

                const donorResult = await donorCollection.insertOne(donor);
                // Update user role in userCollection (user → donor)
                const filter = { email: donor.email };
                const updateDoc = { $set: { role: 'donor' } };
                const userResult = await userCollection.updateOne(filter, updateDoc);
                res.status(201).send({
                    message: 'Donor successfully added and user role updated to donor.',
                    donorResult,
                    userResult,
                });

            } catch (error) {
                console.error('Error adding donor:', error);
                res.status(500).send({ message: 'Internal Server Error' });
            }
        })

        //hospital form post
        app.post('/hospital', async (req, res) => {
            try {
                const hospital = req.body;
                const existingHospital = await hospitalCollection.findOne({ email: hospital.email });
                if (existingHospital) {
                    return res.status(409).send({ message: 'You have already registered as a hospital.' });
                }
                const hospitalResult = await hospitalCollection.insertOne(hospital);
                res.status(201).send({
                    message: 'Hospital successfully added .',
                    hospitalResult

                });
            }
            catch (error) {
                res.status(500).send({ message: 'Internal Server Error' });
            }
        })

        // get hospital data
        app.get('/hospital/:email', async (req, res) => {
            try {
                const email = req.params.email;
                const query = { email: email };
                const result = await hospitalCollection.find(query).toArray();
                res.send(result);
            } catch (error) {
                res.status(500).send({ message: 'Failed to fetch hospitals', error });
            }
        });

        app.get('/hospital-blood', async (req, res) => {
            try {
                const email = req.query.email;
                const query = {};

                if (email) {
                    query['donorInfo.email'] = email;
                }

                const result = await hospitalBloodCollection.find(query).toArray();
                res.send(result);
            } catch (error) {
                res.status(500).send({ message: 'Failed to fetch data', error });
            }
        });

        // Nodemailer
        app.patch('/hospital/update-role/:id', async (req, res) => {
            const hospitalId = req.params.id;
            const { role } = req.body;

            if (role !== 'hospital') {
                return res.status(400).send({ message: 'Invalid role provided.' });
            }

            try {
                const hospital = await hospitalCollection.findOne({ _id: new ObjectId(hospitalId) });
                if (!hospital) {
                    return res.status(404).send({ message: 'Hospital not found.' });
                }

                const result = await userCollection.updateOne(
                    { email: hospital?.email },
                    { $set: { role: role } }
                );
                // send Eamil
                sendEmail(hospital?.email, {
                    subject: 'Your Access Request Has Been Approved',
                    message: ` 
                    Your request to access the blood donation system has been approved by the admin. 
                    You can now log in and proceed with your operations.

                    Thank you,
                    Admin Team
                    `
                })

                if (result.matchedCount === 0) {
                    return res.status(404).send({ message: 'User not found with this email.' });
                }
                res.send(result);
            } catch (error) {
                console.error("Error updating hospital role:");
                res.status(500).send({ message: 'Failed to update hospital role.', error });
            }
        });

        // delete hospital role and NodeMailer
        app.delete('/users/hospital/:email', async (req, res) => {
            const email = req.params.email;
            const result = await userCollection.deleteOne({ email });

            // send Eamil
            sendEmail(email, {
                subject: 'Your Access Has Been Revoked',
                message: ` 
                    This is to inform you that your access to the blood donation system has been deleted/revoked by the admin.
                    If you believe this is a mistake or need further assistance, please contact the admin team.

                    Thank you,
                    Admin Team
                    `
            })
            res.send(result);
        });
        //delete from hospital database
        app.delete('/hospitals/:email', async (req, res) => {
            const email = req.params.email;
            const result = await hospitalCollection.deleteOne({ email });
            res.send(result);
        });
        // for hospital blood
        app.post('/hospitalBloodRequests', async (req, res) => {
            try {
                const requestData = req.body;

                const result = await hospitalBloodCollection.insertOne(requestData);

                res.send({ success: true, message: 'Request saved', insertedId: result.insertedId });
            } catch (error) {
                res.status(500).send({ success: false, message: 'Failed to save request' });
            }
        });

        app.get('/donors', async (req, res) => {
            const email = req.query.email;
            const query = {}
            if (email) {
                query.email = email;
            }
            try {
                const donors = await donorCollection.find(query).toArray(); // empty query fetches all
                res.send(donors);
            } catch (error) {
                console.error(error);
                res.status(500).send({ error: 'Failed to fetch donors' });
            }
        });

        // donor delete api
        app.delete('/donor/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const result = await donorCollection.deleteOne(query);

                if (result.deletedCount === 0) {
                    return res.status(404).send({ message: 'Donor not found or already deleted' });
                }
                res.send({ message: 'Donor deleted successfully', result });
            } catch (error) {
                console.error('Error deleting donor:', error);
                res.status(500).send({ message: 'Internal Server Error', error: error.message });
            }
        });

        // single donor api
        app.get('/donor/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const result = await donorCollection.findOne(query);
                res.send(result);
            } catch (err) {
                console.log(err);
                res.status(500).send({ error: "Server error" });
            }
        })

        // blood-recipient-api
        app.post('/recipients', async (req, res) => {
            try {
                const recipient = req.body;

                const existingDonor = await donorCollection.findOne({ email: recipient.email });
                if (existingDonor) {
                    return res.status(409).send({ message: 'You have already registered as a donor.' });
                }

                // Check if the you already hospital not resgistration Recipient
                const existingHospital = await hospitalCollection.findOne({ email: recipient.email });
                if (existingHospital) {
                    return res.status(409).send({ message: 'You have already registered as a Hospital.' });
                }

                // Check if the your role are admin
                const existAdmin = await userCollection.findOne({ email: recipient?.email });
                if (existAdmin?.role === 'admin') {
                    return res.status(409).send({ message: 'Your role have alreay Admin, So you can not Recipient.' });
                }

                // Check if the donor already exists (by email)
                const existingRecipient = await bloodRequestCollection.findOne({ email: recipient.email });
                if (existingRecipient) {
                    const recipientResult = await bloodRequestCollection.insertOne(recipient);
                    return res.status(200).send({
                        message: 'Recipient request submitted successfully!',
                        recipientResult
                    });
                }

                const recipientResult = await bloodRequestCollection.insertOne(recipient);
                // Update user role in userCollection (user → donor)
                const filter = { email: recipient.email };
                const updateDoc = { $set: { role: 'recepient' } };
                const userResult = await userCollection.updateOne(filter, updateDoc);
                res.status(201).send({
                    message: 'Donor successfully added and user role updated to donor.',
                    recipientResult,
                    userResult,
                });
            } catch (error) {
                console.error('Error adding donor:', error);
                res.status(500).send({ message: 'Internal Server Error' });
            }

        })

        // blood-recipient-api for get
        app.get('/recipients', async (req, res) => {
            try {
                const recipient = await bloodRequestCollection.find().toArray();
                res.send(recipient)
            } catch (error) {
                console.log('Error fetching recipient:', error);
                res.status(500).send({ message: 'Internal Server Error' });
            }
        })

        // delete recipient
        app.delete('/recipient/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const result = await bloodRequestCollection.deleteOne(query);

                if (result.deletedCount === 0) {
                    return res.status(404).send({ message: 'Recipient not found or already deleted' });
                }
                res.send({ message: 'Recipient deleted successfully', result });
            } catch (error) {
                console.error('Error deleting recipient:', error);
                res.status(500).send({ message: 'Internal Server Error', error: error.message });
            }
        });

        // get receipent
        app.get('/recipient-requests', async (req, res) => {
            const email = req.query.email;
            const query = { role: 'recipient' };
            if (email) {
                query.email = email;
            }
            const result = await bloodRequestCollection.find(query).toArray();
            res.send(result)
        })

        // delete request
        app.delete('/recipient-requests/:id', async (req, res) => {
            const id = req.params.id;
            try {
                const result = await bloodRequestCollection.deleteOne({ _id: new ObjectId(id) });
                if (result.deletedCount === 1) {
                    res.send({ message: 'Request deleted successfully' });
                } else {
                    res.status(404).send({ error: 'Request not found' });
                }
            } catch (error) {
                res.status(500).send({ error: 'Failed to delete request' });
            }
        });

        app.get('/recipients/:email', async (req, res) => {
            const email = req.params.email;
            const recipient = await bloodRequestCollection.findOne({ email });
            res.send(recipient);
        });

        //booked donor and NodeMailer
        app.post('/booked-donors', async (req, res) => {
            const booking = req.body;
            const result = await bookedDonorCollection.insertOne(booking);

            if (result?.insertedId) {
                // send Eamil
                sendEmail(booking?.donorEmail, {
                    subject: 'Urgent Blood Donation Request',
                    message: `Dear ${booking?.donorName}, 
                     I urgently need blood type of ( ${booking?.donorBloodType} ). If you are available to donate, it would mean a lot. Update on the website or Phone call me if you’re able to donate. Thanks! Contract number: ${booking?.donorContact}.
                     Best regards ${booking?.recipientName}
                     `
                })
            }
            res.send(result);
        });

        app.get('/booked-donors', async (req, res) => {
            try {
                const { email, userEmail } = req.query;

                let query = {};
                if (email) {
                    query.donorEmail = email;
                }
                if (userEmail) {
                    query.recipientEmail = userEmail;
                }

                if (!email && !userEmail) {
                    return res.status(400).send({ message: "Query param 'email' or 'userEmail' is required" });
                }

                const result = await bookedDonorCollection.find(query).toArray();
                res.send(result);
            } catch (error) {
                console.error("Error fetching booked donors:", error);
                res.status(500).send({ message: "Internal Server Error" });
            }
        });

        // Donor collection update after Accept button
        app.patch('/donors/update-last-donation/:email', async (req, res) => {
            const email = req.params.email;
            // Helper function to format date as YYYY-MM-DD
            const formatDate = (date) => {
                const y = date.getFullYear();
                const m = String(date.getMonth() + 1).padStart(2, '0');
                const d = String(date.getDate()).padStart(2, '0');
                return `${y}-${m}-${d}`;
            };

            try {
                const formattedDate = formatDate(new Date());

                const updateDoc = {
                    $set: {
                        lastDonation: formattedDate,
                        status: 'Pending',
                    },
                    $inc: {
                        donationCount: 1,
                    },
                };

                const result = await donorCollection.updateOne({ email }, updateDoc);

                if (result.matchedCount === 0) {
                    return res.status(404).send({ error: 'Donor not found' });
                }

                if (result.modifiedCount === 0) {
                    return res.status(200).send({ message: 'No changes made. Already up to date.' });
                }

                res.send({
                    message: 'Last donation date, status, and count updated successfully',
                    lastDonation: formattedDate,
                });
            } catch (err) {
                console.error('Failed to update donor last donation:', err);
                res.status(500).send({ error: 'Internal server error' });
            }
        });

        // Donor collection update after Reject button
        app.patch('/donors/update-donor-status/:email', async (req, res) => {
            const email = req.params.email;
            try {
                const updateDoc = {
                    $set: {
                        status: 'Pending',
                    },
                };

                const result = await donorCollection.updateOne({ email }, updateDoc);
                if (result.matchedCount === 0) {
                    return res.status(404).send({ error: 'Donor not found' });
                }

                if (result.modifiedCount === 0) {
                    return res.status(200).send({ message: 'No changes made. Already up to date.' });
                }

                res.send({ message: 'Donor updated successfully' });
            } catch (err) {
                console.error('Failed to update donor last donation:', err);
                res.status(500).send({ error: 'Internal server error' });
            }
        });

        // Update booked donor request status
        app.patch('/booked-donors/update-status/:id', async (req, res) => {
            const id = req.params.id;
            const { status } = req.body;
            console.log(id, status);
            if (!status) {
                return res.status(400).send({ error: 'Status field is required' });
            }

            try {
                const result = await bookedDonorCollection.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: { status } }
                );

                console.log(result);

                if (result.matchedCount === 0) {
                    return res.status(404).send({ error: 'Booking not found' });
                }

                if (result.modifiedCount === 0) {
                    return res.status(200).send({ message: 'Status already up to date' });
                }

                res.send({ message: 'Status updated successfully' });
            } catch (err) {
                console.error('Failed to update booked donor status:', err);
                res.status(500).send({ error: 'Internal Server Error' });
            }
        });

        // donor information update
        app.patch('/donors/update-status/:email', async (req, res) => {
            const email = req.params.email;
            const { status } = req.body;

            if (!status) {
                return res.status(400).send({ message: 'Status field is required.' });
            }
            const filter = { email };
            const updateDoc = {
                $set: { status },
            };
            try {
                const result = await donorCollection.updateOne(filter, updateDoc);
                if (result.matchedCount === 0) {
                    return res.status(404).send({ message: 'Donor not found.' });
                }
                if (result.modifiedCount === 0) {
                    return res.status(200).send({ message: 'Donor status is already up to date.' });
                }
                res.send({ message: 'Donor status updated successfully.', result });
            } catch (err) {
                console.error('Failed to update donor status:', err);
                res.status(500).send({ error: 'Internal Server Error' });
            }
        });

        // Booked confirm and Nodemailer
        app.post('/booked-donors/confirm', async (req, res) => {
            try {
                const data = req.body;
                const result = await allReadyBookedCollection.insertOne(data);

                if (result?.insertedId) {
                    // send Eamil
                    sendEmail(data?.recipientEmail, {
                        subject: 'Blood Donation Confirmation',
                        message: `Dear ${data?.recipientName}, I am available and ready to donate blood. Let me know the details of where and when to come. If any problme please connectwith me ${data?.donorContact}.
                        Best regards ${data?.donorName}
                    `
                    })
                }

                res.send(result);
            } catch (error) {
                console.error('Error confirming donor:', error);
                res.status(500).send({ message: 'Failed to confirm donor' });
            }
        });

        // Booked Donor History and Rejected Email by Nodemailer
        app.post('/booked-donors/history', async (req, res) => {
            try {
                const data = req.body;
                const result = await bookedDonorHistoryCollection.insertOne(data);

                if (result?.insertedId) {
                    // send Eamil
                    sendEmail(data?.recipientEmail, {
                        subject: 'Unable to Donate',
                        message: `I am sorry to inform you that I would not be able to donate blood at this time due to personal reasons or unavailability. Please try to find another donor as soon as possible. I hope your situation improves quickly.
                        Best regards ${data?.donorName}
                    `})
                }
                res.send(result);
            } catch (error) {
                console.error('Error confirming donor:', error);
                res.status(500).send({ message: 'Failed to confirm donor' });
            }
        });

        // get Booked sepcific email
        app.get('/booked-donors/confirmed/:email', async (req, res) => {
            const email = req.params.email;
            try {
                const query = { recipientEmail: email }
                const confirmedDonors = await allReadyBookedCollection.find(query).toArray();
                res.send(confirmedDonors);
            } catch (error) {
                console.error('Error fetching confirmed donors:', error);
                res.status(500).send({ message: 'Failed to fetch confirmed donors' });
            }
        });

        // get History specific email
        app.get('/booked-donors/history/:email', async (req, res) => {
            const email = req.params.email;
            try {
                const donorHistory = await bookedDonorHistoryCollection.find({ donorEmail: email }).toArray();
                const requestHistory = await bookedDonorHistoryCollection.find({ recipientEmail: email }).toArray();
                res.send({ donorHistory, requestHistory });
            } catch (error) {
                console.error('Error fetching confirmed donors:', error);
                res.status(500).send({ message: 'Failed to fetch confirmed donors' });
            }
        });

        /*--------------------------------new------------------------------ */
        app.get('/accepted-requests', async (req, res) => {
            const result = await hospitalBloodCollection.find({ 'requestStatus': 'Accepted' }).toArray();
            res.send(result);
        });

        app.patch('/hospital-blood-status/:id', async (req, res) => {
            const { id } = req.params;
            const updatedStatus = req.body.status; // e.g. { status: 'Accepted' }

            const result = await hospitalBloodCollection.updateOne(
                { _id: new ObjectId(id) },
                {
                    $set: {
                        requestStatus: updatedStatus,
                        acceptedAt: new Date()
                    }
                }
            );
            res.send(result);
        });

        app.patch('/hospital-blood-reject/:id', async (req, res) => {
            const { id } = req.params;
            const updateStatus = req.body.status;
            const result = await hospitalBloodCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { requestStatus: updateStatus } }
            );
            res.send(result);
        })

        app.get('/hospital-blood', async (req, res) => {
            try {
                const email = req.query.email;
                const query = {};

                if (email) {
                    query['donorInfo.email'] = email;
                }

                const result = await hospitalBloodCollection.find(query).toArray();
                res.send(result);
            } catch (error) {
                res.status(500).send({ message: 'Failed to fetch data', error });
            }
        });

        app.get('/hospitalBloodRequests/:email', async (req, res) => {
            try {
                const email = req.params.email;
                const requests = await hospitalBloodCollection.find({ recipientEmail: email }).toArray();
                res.status(200).json(requests);
            } catch (error) {
                console.error('Error fetching hospital blood requests:', error);
                res.status(500).json({ message: 'Internal server error while fetching requests.' });
            }
        });

        app.post('/hospitalBloodRequests', async (req, res) => {
            try {
                const requestData = req.body;

                const result = await hospitalBloodCollection.insertOne(requestData);

                res.send({ success: true, message: 'Request saved', insertedId: result.insertedId });
            } catch (error) {
                res.status(500).send({ success: false, message: 'Failed to save request' });
            }
        });

        app.get('/all/booked/donor', async (req, res) => {
            const result = await allReadyBookedCollection.find().toArray();
            res.send(result)
        })

    } finally {
        // all time catch this result
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("Blood Donation Server is running");
})

app.listen(port, () => {
    console.log(`Blood Donation Server is running on ${port}`);
})
