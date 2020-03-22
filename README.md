# HelpDAO donation portal ⛑

The idea for HelpDAO is to provide software for local *help squads* to form and help vulnerable groups in the current COVID-19 pandemic. [Read more in the website](https://helpdao.org).

For that, we will create software-based organizations using [Aragon](https://aragon.org). Supervisors and volunteers will use the [Aragon app](https://app.aragon.org) to approve expenses (e.g. food, medicines) from volunteers.

But donors will likely be non-technical and not very involved, and so we need to make it extremely easy for them to donate.

For that the flow should be as follows:
1. Donor opens website and reads about the mission of that help squad
2. Donor introduces credit card and donated
3. After payment, donor is shown a link to join the Telegram group of the help squad
4. Donor joins the Telegram group, where supervisors and volunteers are sending proof (pictures, videos...) that they are making good use of the donated funds and helping vulnerable people

# Components of the donation portal
## Donation portal maker
We need a way for those who want to help squad to easily create their own website.
Their website may be as simple as a name for the help squad and a description.

<img width="744" alt="PNG image" src="https://user-images.githubusercontent.com/718208/77250623-2228e180-6c41-11ea-9c6d-3b2e6d0b53bd.png">

## Donation portal
It should contain the name of the help squad and its description.
It will show:
- Amount of funds donated: Total amount that has been donated to that help squad
- Amount of funds remaining: How much money the help squad has remaining
- Donate button: Will open payment window

<img width="695" alt="PNG image 2" src="https://user-images.githubusercontent.com/718208/77250625-23f2a500-6c41-11ea-998b-c0ef8b520e8e.png">


## Payment process
The payment will go to an [Aragon DAO](https://aragon.org), which will act as a collaborative *digital piggybank* that allows supervisors and volunteers to spend the money. Since it works with cryptocurrencies, we need to be able to convert credit card payments to cryptocurrency.

We can use Dai, which a stable cryprocurrency. 1 Dai always equals 1 US Dollar.
For that, here are some alternatives:
[Wyre](https://www.sendwyre.com/) | [Ramp](https://instant.ramp.network/) | [Moonpay] (https://www.moonpay.io/)

## Chat group
The important thing is that donors should be close to the help squad in order to build trust and ensure their funds will be spent correctly.
After donating, they will receive a link to enter the Telegram chat (maybe WhatsApp too?) where the supervisors and volunteers are putting the money at work.
