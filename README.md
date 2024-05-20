# Let's Link

## Inspiration
Most of our group members struggle to find good times to link up with our friends. We wanted to create a tool that was easy to access to solve this problem. That's when we came up with Let's Link. We envisioned a tool to read your calendar and tell you when the most optimal times to meet with your friends are.

## What it Does
Let's Link simply requires you and your guests to allow Google Calendar read access. From that, we read your calendars and determine the most optimal times for all parties to meet, given a time range, event length, and an ideal time of day. We give you as many opportunities as possible for you to pick and link up with your friends!

## How We Built It
- **Frontend:** React and TypeScript
- **Backend:** Next.js
- **Database:** MongoDB
- **Authentication and Calendar Access:** Google Authentication and Google Calendar Freebusy API

We wrote an algorithm to interpret and analyze the given calendar data, using a weighting system to determine which times work the best for all participants. The results are displayed in beautiful React components for the end user to easily pick the best and easiest times that work for them.

## Challenges We Ran Into
We faced several challenges during the development of Let's Link:
- **Idea Development:** Deciding on a feasible scope and direction for the project was difficult.
- **Authentication:** Handling Google account sessions and authentication was often buggy, sometimes causing access issues.
- **Algorithm Design:** Writing the algorithm to parse and interpret calendar data and determining its priorities was complex.

## Accomplishments That We're Proud Of
- **UI/UX Design:** We're extremely proud of our user interface and experience, especially our confetti effect.
- **Resilience:** We overcame numerous challenges and survived on pure caffeine for almost 24 hours.
- **Algorithm and Integration:** Successfully developing our weighting algorithm and integrating Google Calendar.
- **Learning and Teamwork:** Learning from this project and each other to develop this application.

## What We Learned
- **Teamwork:** Working together is essential to success.
- **Problem Solving:** From troubleshooting authentication errors to optimizing algorithms.
- **Algorithm Design:** Creating and designing algorithms to optimize computation time and process data.

## What's Next for Let's Link
We're going to keep working on Let's Link to improve and refine its features and functionality. 

## Built With
- MongoDB
- Next.js
- React
- TypeScript

## Getting Started
To get started with Let's Link, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/lets-link.git
    ```
2. Install dependencies:
    ```bash
    cd lets-link
    npm install
    ```
3. Set up environment variables for MongoDB, Google API keys, and other configurations.

4. Run the development server:
    ```bash
    npm run dev
    ```

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for more details.
