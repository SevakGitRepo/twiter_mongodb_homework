POST localhost:8080/users/register
        first_name (3-50) 
        last_name  (3-50)
        age        (18-80) 
        email (you can't create 2 account use same email)
        password
POST localhost:8080/users/login
        email
        password
DELETE localhost:8080/users

GET localhost:8080/users

-------------------------------------------
POST localhost:8080/posts
        title (0-50)
        content (10-500)
        + valid token

PUT localhost:8080/posts/:id
        title (0-50)
        content (10-500)
        + valid token
GET localhost:8080/posts

GET localhost:8080/posts/:email

You can see all twit and all twit by email but  
For create twit or update you need token. If you have valid token you can't
change twit another twit because system compare your email with twit email   

