const express = require('express')
const nodemailer = require('nodemailer')
const handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')


const app = express()


app.get('/sendEmail', (req,res)=>{

  //this is the nodemailer transporter that is required inorder to send the email
        let transporter = nodemailer.createTransport({
            host: "example.yourdomain.com", // this is the smtp host name acquired from your smpt provider
            port: 587,
            secure: false, 
            auth: {
              user: "example@domain.com",//this is the smtp user name acquired from your smpt provider
              pass: "yourpassword"//this is the smtp password for the user acquired from your smpt provider
            },
            tls:{
                rejectUnauthorized:false/*this enables you to make a request when you are not in the same
                                          as the smtp server*/
            }
        });
    
    
        var source = fs.readFileSync(path.join(__dirname, 'test.hbs'), 'utf8'); // this reads the handlebar template
        var template = handlebars.compile(source);//this renders the handlebar template
        let mailOptions = {
            from: '"YourName" <example@yourdomain.com>', //enter the sender email address and name
            to: "recipient.Domainname.com", //the email address of the recipient
            subject: "KEep Safe || test email", //the subject of the email
            text: "You have Just sent your first email", //the email as a text
            html:template({name : "john doe"})//this is the template. We substitute the name property with john doe
        }
    
       transporter.sendMail(mailOptions, (error, info)=>{ //the actual request that send the email
            if(error){
              console.log(error)
              return res.status('500').json({message:"Something went wrong, email was not sent"}) 
            }
           console.log("Message sent: %s", info.messageId);
           return res.status('200').json({message:"email sent successfully"}) 
        });

          
})


app.listen(3000,()=>{
    console.log("server started at port 3000")
})