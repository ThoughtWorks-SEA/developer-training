# Agile software delivery

## Agile manifesto

http://agilemanifesto.org/

While there is value in the items on the right, we value the items on the left more:

> Individuals and interactions over processes and tools<br>
> Working software over comprehensive documentation<br>
> Customer collaboration over contract negotiation<br>
> Responding to change over following a plan

<iframe width="560" height="315" src="https://www.youtube.com/embed/gf7pBZxOCtY?start=95" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Agile principles

http://agilemanifesto.org/principles.html

<iframe width="560" height="315" src="https://www.youtube.com/embed/jSayJF0epJs?start=29" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Agile methodologies and frameworks

The agile manifesto does not dictate how we should go about delivering software. As a result several flavors have emerged. They include Extreme Programming, Scrum, Kanban, and many others.

In a typical software development team, you might hear terms like product backlog, product owner, sprints, and retrospectives. These come from [Scrum](https://www.scrumguides.org/scrum-guide.html).

Other terms like pair programming, test-driven development, iterations, user stories, spikes, stand up meetings, and continuous integration come from [Extreme Programming](http://www.extremeprogramming.org/index.html).

## User stories

### Writing user stories

As a... (role)<br>
I want to... (new feature)<br>
So that... (value)<br>

Example:

```
As a potential customer
I want to read book reviews
So that I can decide which one to buy
```

**User stories should be INVEST:**

- Independent: Should be self-contained in a way that allows to be released without depending on one another.
- Negotiable: Only capture the essence of user's need, leaving room for conversation. User story should not be written like contract.
- Valuable: Delivers value to end user.
- Estimable: User stories have to able to be estimated so it can be properly prioritized and fit into sprints.
- Small: A user story is a small chunk of work that allows it to be completed in about 3 to 4 days.
- Testable: A user story has to be confirmed via pre-written acceptance criteria.

**Lifecycle of a user story:**

The user stories will be moved from left to right in a [kanban board](https://www.atlassian.com/agile/kanban/boards) in this order:

1. Backlog (this is where prioritisation and analysis occurs)
2. Ready for development
3. Development (this is where the developer will be implementing the feature)
4. Ready for testing
5. Testing (done by the QA (Quality Analyst) or another team member)
6. Ready for showcase (to the Product Owner for feedback/approval)
7. Done (in production)

Before a story is moved to stage #3 and worked on, a **kick off** needs to be done to align everyone's understanding of what the user story is about and what is expected from it.

Before a story is moved to stage #4 to be picked up by the QA, a **desk check** needs to be done as a preliminary test of the implemented functinality.

Read more on kick offs and desk checks [here in this blog](https://www.thoughtworks.com/insights/blog/defect-prevention-using-agile-techniques).

### Acceptance criteria

Given (context) <br>
When (action) <br>
Then (expectation) <br>

This should ideally include all happy paths, alternate paths, and sad paths (e.g. error page).

Examples:

**User can read reviews for a book**

```
Given: The user is on the page for a book
When: The user clicks on the 'reviews' link
Then: The user will be redirected to a page with a list of reviews for the book
```

**User can purchase a book**

```
Given: The user is on the page for a book
And: The user is *not* logged in
When: The user clicks on the 'Add to cart' button
Then: The user will be prompted to log in first

Given: The user is on the page for a book
And: The user is logged in
When: The user clicks on the 'Add to cart' button
Then: The book will be added into the user's cart
```

### Estimation

Stories are assigned points to _estimate_ the complexity of its implementation. It typically uses the fibonacci number (1, 2, 3, 5, 8...) to estimate the story points.

Read more on how to do the estimation [here](https://www.visual-paradigm.com/scrum/what-is-story-point-in-agile/).

Read what Ron Jeffries, one of the founders of Extreme Programming, has to say about story points [here](https://ronjeffries.com/articles/019-01ff/story-points/Index.html)

## Ceremonies

### Stand up meetings

Daily morning meetings involving everyone in the core team - typically the Product Owners, Developers, and Project Managers.

There are many ways of running your stand up meetings. Commonly, everyone will **take turns to answer 3 questions**:

1. What did I work on yesterday?
2. What will I be working on today?
3. Do I have any blockers?

With these questions, the team will be able to get a sense of the progress, and also helps in flagging out issues/blockers if there are any that are impeding progress.

Another way is to simply **go through the kanban board** (be it physical or with an online tool like Trello or Jira) **from left to right, top to bottom to cover all the cards.** Each person will talk about the card they are working on, and quickly talk about their progress on the card and if they have any blockers.

### Retrospective

A retrospective is a way for us to look back at the work we've done in the sprint and reflect on them so as to improve the way we work together. There are some great resources online for suggestions on ways to conduct a [fun retrospective](http://www.funretrospectives.com).

#### [Energizer](http://www.funretrospectives.com/category/energizer/)

This is a very short fun activity to reset ourselves from what we were previously working on and get ourselves ready for the meeting. The activity should be fun and not work or programming related.

#### Check-in

It's important to learn if everyone in the team is willing to share during a retrospective meeting. Check-ins help get a sense of how everyone is feeling.

#### Prime directive

Before starting a retrospective, get everyone to recite the prime directive. It's important that the entire team recite it together because we want to enforce the idea that we are all trying to do the best we can within our limitations.

> Regardless of what we discover, we understand and truly believe that everyone did the best job they could, given what they knew at the time, their skills and abilities, the resources available, and the situation at hand.

#### Action items

Action items emerge from the discussions of the retrospective and people (usually in pairs or even the entire team) are assigned to be responsible for each item.

#### Check-out

This is a very short activity to end the entire session.
