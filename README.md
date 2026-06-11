I sincerely apologize for the video quality. I recorded the demonstration as requested, but due to a technical issue with my laptop's screen recording software, the captured video became blurry and the on-screen text is not clearly visible. The application itself was functioning correctly during the recording. Thank you for your understanding, and I would be happy to provide a new recording if given the opportunity.
# CarMatch AI 🚗

## Project Overview

CarMatch AI is a full-stack MERN application that helps users discover the most suitable car based on their personal requirements. Instead of manually comparing multiple vehicles across different websites, users simply enter their preferences and receive personalized recommendations along with AI-generated buying advice.

The application combines a recommendation engine with Generative AI to provide practical explanations, pros and cons, hidden trade-offs, and alternative options.

---

# What Did You Build and Why?

I built an AI-powered car recommendation platform that helps users shortlist vehicles based on their needs.

Users provide:

- Budget
- Family Size
- Usage Type
- Fuel Type
- Buying Priority

The system:

1. Matches the user's preferences against a curated car database.
2. Calculates a match percentage.
3. Returns the top three recommended vehicles.
4. Generates an AI explanation that helps users understand why a specific car is a good fit.

### Why?

Buying a car often involves comparing dozens of options, specifications, reviews, and opinions. This creates decision fatigue and confusion.

CarMatch AI simplifies this process by:

- Reducing research time
- Providing personalized recommendations
- Explaining recommendations in simple language
- Highlighting trade-offs before purchase

The goal was to create a practical buying assistant rather than just another car listing platform.

---

# What Did You Deliberately Cut?

Because the assignment was time-constrained, I focused on the core recommendation experience and intentionally excluded:

### Admin Features

- Admin dashboard
- Car management UI
- Role-based access control

### User Features

- Authentication
- User accounts
- Saved recommendations
- Wishlist/Favorites

### Vehicle Features

- Car image management
- Detailed specifications
- Comparison tables
- Review system

### Advanced AI Features

- Conversational chatbot
- Multi-turn recommendation refinement
- Sentiment analysis of reviews

### Third-Party Integrations

- Live car pricing APIs
- Insurance APIs
- Loan calculators

These features would improve the product but were outside the scope of the assignment timeline.

---

# Tech Stack

## Frontend

### React.js

Used for:

- Dynamic user interface
- Form management
- State management
- Recommendation display

### CSS3

Used for:

- Responsive design
- Modern dashboard UI
- Animations and interactions

### Why React?

React allows fast UI development with reusable components and efficient state handling.

---

## Backend

### Node.js

Used for:

- Server-side execution
- API handling

### Express.js

Used for:

- REST API development
- Route management
- Middleware integration

### Why Express?

Express is lightweight, simple, and ideal for quickly building scalable APIs.

---

## Database

### MongoDB

Used for:

- Car data storage
- Flexible schema design

### Mongoose

Used for:

- Schema modeling
- Database operations

### Why MongoDB?

Car information is naturally represented as documents, making MongoDB a good fit for rapid development.

---

## AI Layer

### OpenRouter API

Used to access LLM models.

### AI Usage

The AI generates:

- Why the car matches
- Pros
- Cons
- Hidden trade-offs
- Final buying advice
- Alternative car explanations

### Why AI?

Traditional recommendation systems provide only scores.

AI transforms recommendation results into natural-language insights that are easier for users to understand.

---

# Application Architecture

## Frontend

### Components

- Preference Form
- Recommendation Cards
- AI Explanation Panel

### State Management

Managed using React Hooks:

- formData
- recommendations
- selectedCar
- explanation
- loading
- aiLoading

---

## Backend

### Models

#### Car

Stores:

- Name
- Brand
- Price
- Fuel Type
- Family Type
- Usage
- Priorities
- Mileage
- Seating Capacity

### Controllers

#### Car Controller

Handles:

- Seeding cars
- Fetching cars
- Recommendation generation

#### AI Controller

Handles:

- Prompt creation
- AI communication
- Recommendation explanation generation

### Routes

#### POST /api/cars/seed

Seeds sample car data.

#### POST /api/cars/recommend

Returns top recommended cars.

#### POST /api/cars/explain

Generates AI explanation.

#### GET /api/cars

Returns available cars.

---

# Recommendation Logic

Each car receives a score based on user preferences.

### Budget Match

+30 points

### Family Type Match

+20 points

### Fuel Type Match

+20 points

### Usage Match

+15 points

### Priority Match

+15 points

Maximum Score = 100

The cars are then sorted by score and the top three recommendations are returned.

---

# What Did You Delegate To AI Tools?

AI tools were used to assist with:

### Prompt Engineering

Generating structured prompts for car explanations.

### Content Generation

Creating:

- Pros
- Cons
- Trade-offs
- Advice

### UI Suggestions

Improving layout ideas and styling concepts.

### Code Review

Identifying bugs and suggesting fixes.

---

# What Did You Build Manually?

The following were built manually:

### Database Design

- Car schema
- MongoDB integration

### Business Logic

- Matching algorithm
- Recommendation scoring

### API Development

- Express routes
- Controllers
- Error handling

### Frontend Development

- Form creation
- State management
- API integration
- Recommendation cards

### Deployment

- Render backend deployment
- Vercel frontend deployment

---

# Where Did AI Help Most?

AI was most helpful in generating buyer-friendly explanations.

Instead of showing:

Match Score: 90%

the AI can explain:

- Why the vehicle fits the user's needs
- What strengths it offers
- What compromises the user should be aware of

This makes recommendations more actionable and understandable.

---

# Where Did AI Get In The Way?

Some challenges included:

### Generic Responses

Early outputs were often too broad.

### Prompt Iteration

Multiple prompt refinements were required to achieve useful results.

### Formatting Issues

Responses sometimes required additional formatting instructions.

### Consistency

The same recommendation could occasionally produce slightly different wording.

---

# Challenges Faced

### Recommendation Tuning

Balancing weights between budget, family size, fuel type, and priorities.

### API Integration

Connecting recommendation results with AI explanations.

### Deployment Issues

Handling:

- Environment variables
- Backend URLs
- API communication
- CORS configuration

### Data Modeling

Creating a simplified but realistic vehicle dataset.

---

# If I Had Another 4 Hours

I would add:

## Vehicle Comparison Tool

Compare multiple shortlisted vehicles side-by-side.

## Saved Recommendations

Allow users to save and revisit recommendations.

## Real Vehicle Images

Add manufacturer vehicle images.

## Car Specification Pages

Detailed specifications and feature breakdowns.

## Advanced Recommendation Engine

Weighted priorities and user-adjustable importance sliders.

## Review Analysis

Analyze owner reviews and summarize common opinions.

## AI Chat Assistant

Allow users to ask follow-up questions such as:

- Is this car good for long trips?
- How expensive is maintenance?
- Is it suitable for city driving?

## User Accounts

Save preferences and recommendation history.

## Better Analytics

Track recommendation trends and user behavior.

---

# Conclusion

CarMatch AI demonstrates how MERN Stack and Generative AI can be combined to solve a real-world consumer problem.

The application focuses on reducing buyer confusion, simplifying vehicle research, and providing transparent, personalized recommendations.

By combining rule-based matching with AI-generated explanations, the platform delivers both accurate recommendations and understandable buying advice, creating a more confident car purchasing experience.
