const express = require("express");
const app = express();
// const client = require("@mailchimp/mailchimp_marketing");
// const request = require("request");
const https = require("https");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const mail = req.body.mail;
    const data = {
            email_address: mail,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
    }; 
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/fc47bde86a/members";
    const options = {
        method: "POST",
        auth: "psakshi989@gmail.com:adacc4405458b5cea097378a44ebbc5f-us21"
    };
    const request = https.request(url, options, function(response){
        if(response.statusCode == 200){
            res.send("Successfully subscribed!");
        } else{
            res.send("There was an error while signing up, please try again!");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});

app.listen(3000, function () {
    console.log("Server is running on the port 3000");
});
//api key
//adacc4405458b5cea097378a44ebbc5f-us21

//List ID
//fc47bde86a