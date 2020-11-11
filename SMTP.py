import smtplib, ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage

port = 465  # For SSL
smtp_server = "smtp.gmail.com" #gmail smtp server address
sender_email = "ccf2.developer@gmail.com"  # Enter your address
receiver_email = "ccf2.developer@gmail.com"  # Enter receiver address (oliviakfung@gmail.com)
password = input("Type your password and press enter: ") #using input to avoid hardcoding password

message = MIMEMultipart("alternative")
message["Subject"] = "Skincare Public Service Annoucement"
message["From"] = sender_email
message["To"] = receiver_email

with open('./output/tweet_text/output.csv') as f:
    tweet_content = (f.read())

with open('./output/tweet_image/image_url.txt') as f:
    image_url = (f.read())

message_text = """\

See the LATEST products in skincare!!! Doctors hate these simple tricks
that will make you look TEN years YOUNGER!!! NUMBER FOUR will SHOCK you!!!

Sean Garrette's Tweets:
{}
Sean Garrette's Images Links:
{}
""".format(tweet_content, image_url).replace(u"\u2018", "'").replace(u"\u2019", "'").replace(u"\u2026", "'")

image_name = './img/'

message_html = """\
<html>
  <body style="background-color:#fbefef;">
    <p style="text-align:center;">
    <img src="cid:image1" alt="asian woman just after a shower" width="250" height="250">
    </p>
    <section">
    <br>
    Hey Liv,
    <br>
    <br>
       It is another beautiful day and I am loving the wonky eyelid.
       Since you are always looking for a reason to shop (probably while
       I am waiting to watch a show with you) I thought you might want to
       hear about Sean Garrette's latest picks.
       <br>
       <br>
       <lh> <strong>Useful Links </strong> </lh>
        <ol>
            <li><a href="https://www.dermstore.com/">Dermstore</a></li>
            <li><a href="https://www.sephora.com/">Sephora</a></li>
            <li><a href="https://www.ulta.com/">Sephora</a></li>
            <li><a href="https://sokoglam.com/">Soko Glam</a></li>
        </ol>
       Below are Sean G's recent twitter mentions, hopefully he has a
       few suggestions for you.
    </section>
    <section>
       <br>
       <strong> Sean Garrette's Tweets: </strong>
       <br>
       {}
       <br>
       <br>
       <strong> Sean Garrette's Images Links: </strong>
       {}
    </section>
  </body>
</html>
""".format(tweet_content, image_url)

# This assumes the image is in the current directory
with open('./image1.jpg', 'rb') as fp:
    msgImage = MIMEImage(fp.read(), _subtype="jpeg")


# Define the image's ID as referenced above
msgImage.add_header('Content-ID', '<image1>')
message.attach(msgImage)

# Turn these into plain/html MIMEText objects
part1 = MIMEText(message_text, "plain")
part2 = MIMEText(message_html, "html")

# Add HTML/plain-text parts to MIMEMultipart message
# The email client will try to render the last part first
message.attach(part1)
message.attach(part2)

# Create a secure SSL context
context = ssl.create_default_context()

with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
    server.login(sender_email, password)
    server.sendmail(
        sender_email, receiver_email, message.as_string()
        )

