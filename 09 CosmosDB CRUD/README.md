# CosmosDB CRUD operations

### Create Employee example

POST
```
{
    "hrmId": "HRM5000",
    "empName": "Kartikeya",
    "ctMailId": "kartikeya@celebaltech.com",
    "rmHrmId": "HRM1234",
    "rmName": "Someone",
    "password": "abcd1234",
    "designation": "Intern", // Intern, Trainee or Associate
    "role": "Admin" // optional, defaults to Reader if ommited
}
```