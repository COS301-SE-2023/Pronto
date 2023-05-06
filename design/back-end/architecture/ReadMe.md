# Quality Requirements
## 1. Performance Requirements

### A. Availability
#### Definition:
#### Acceptance Criteria:

### B. Scalability
#### Definition: 
The product should be at first able to scale to accommodate for typical traffic that would be expected by an instituion during peak times, then this should extend out to multiple institions per region.
#### Acceptance Criteria:
- Autoscalling of the microservices used will be able to accommmodate changing traffic on a regular basis.
- Different instances of the back-end will be deployed per major reason to decouple scaling, allowing for different regions and resources to scale up accordingly.

### C. Perfomance
#### Definition:
The different clients of the product should be fast and higly responsive.
#### Acceptance Criteria:
End-to-End testing will be conducted regulary to test server response times and ensure that a user can quickly perfom each use case or multiple use cases in an acceptable time frame.

## 2. Usability
#### Definition:
Users should be able to navigate and interact with the main features of the tool with ease and intuitively.
#### Acceptance Criteria: 
- We will conduct regular tests with each UI implementation and ask our user to rate their experience
- The reviews will be conducted anonymously using a google form for data collection and rating
- Seperate aspects will be scored seperately
- We are aiming for a **80% satisfactory rate**