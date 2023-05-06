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

## 3. Security
#### Definition:
User data should be secured at rest and in transition in order to prevent unothorized access and comply with local laws and regulations.
#### Acceptance Criteria:
- User data will be incrypted at transition and incrypted at rest.
- Users will be grouped into user pools during sign up. 
- This will provide limited access to data modification and accessing as per use case.

## 4. Maintainability
#### Definition: 
The software should be easily mantainable by both internal, or new external party, with clear concise documentation and code.
#### Acceptance Criteria:
- Code linters and standard linting rules will be apllied to ensure code uniformality.
- A 3-person review procedure will be used to ensure that all solutions provided are effecient and employ the best procedures.
- New features implemented will be explained thouroghly with each **Pull Request**, which will alos be tested and evluated by at least 3 parties prior to deployment.
- This will be a serverless application in it's core, which means that other than optimizing implementation, there won't be a server to mantain.

