# Worthy

A budget solution that focuses on a user's worth rather than their available bank balance. Worth can be higher, lower or even same as the sum of all your money sources.

This solution also targets to solve the problem of effectively visualizing the effects of shared transactions. Money withdrawn from a bank to conduct a shared transaction consists of two components: the actual money deducted (say, $60) and the worth offset (which will be $20 if the transaction was shared among 3 fellas). So effectively, your worth is decremented by $20 and you are owed $40.

<br />

#### Technical details (expectations?)

- __@frontend__ React
- __@backend__  FirebaseDB
- __@hosting__   Google App Engine

<br />

#### Setting up the project for development

1. Download this repo from Github & extract
2. Open terminal, navigate to the root directory of this repo and type `npm install` (this will install all development dependencies for this project)
3. Now type `clear && grunt watchify` (this will cook up the front-end assets and start listening for changes to your pre-compiled files such as SASS)

<br />

#### Running into troubles?

1. `sudo gem install -n /usr/local/bin GEM_NAME_HERE`

<br />

#### Author
[Navdeep Singh Bagga](www.navdeepsb.com "Navdeep's online portfolio")