# usage about backend REST API

## Authentication : bearer token
## :id means _id of the mongoDB document

## user

### Login
method : POST  
path :  http://localhost:3001/user_no_auth/login  
body : { UserId, UserPassword }  

return success, token  

### Create
method : POST  
path : http://localhost:3001/user_no_auth/join  
body : { UserId, UserPassword, Nickname }  

return success, created user  

### Read
method : GET  
path : http://localhost:3001/user/  

return success, user (authenticated with token)  

### Read nickname
method : GET  
path : http://localhost:3001/user/:id  

return success, nickname of user of id  

### Update
method : PATCH  
path : http://localhost:3001/user  
body : { UserPassword, Nickname } ; at least one  

return success, updated user (authenticated with token)  

### Delete
method : DELETE  
path : http://localhost:3001/user  

return success, deleted user (authenticated with token)  

## problem

### Create
method : POST  
path : http://localhost:3001/problem  
body : { Title, Description, TestCase } ; TestCast = [{Input : String, Output: String}]  

return success, created problem  

### Read
method : GET  
path : http://localhost:3001/problem  
query-string : { Title, Writer }

return success, problems  

### Read one
method : GET  
path : http://localhost:3001/problem/:id  

return success, problem  

### Update
method : PATCH  
path : http://localhost:3001/problem/:id  
body : { Title, Description, TestCase } ; TestCast = [{Input : String, Output: String}] ; at least one  

return success, updated problem  

### Delete
method : DELETE  
path : http://localhost:3001/problem/:id  

return success,deleted problem  

## post

### Create
method : POST  
path : http://localhost:3001/post  
body : { Title, Body }  

return success, created post  

### Read
method : GET  
path : http://localhost:3001/post  
query-string : { Title, Writer }

return success, posts  

### Read one
method : GET  
path : http://localhost:3001/post/:id  

return success, post  

### Update
method : PATCH  
path : http://localhost:3001/post/:id  

return success, updated post  

### Delete
method : DELETE  
path : http://localhost:3001/post/:id  

return success, deleted post  

## comment

### Create
method : POST  
path : http://localhost:3001/comment  
body : { Title, Body, RefPost, ToComment } ; ToComment is optional, RefPost and ToComment is _id of mongoDB document  

return success, created comment  

### Read
method : GET  
path : http://localhost:3001/comment  
query-string : { RefPost, ToComment, Writer } 
return success, comments  

### Update
method : PATCH  
path : http://localhost:3001/comment/:id  
body : { Title, Body } ; at least one

return success, updated comment  

### Delete
method : DELETE  
path : http://localhost:3001/comment/:id  

return success, deleted comment  

## score

### Create
method : POST
path : http://localhost:3001/score
body : { Code, RefProblem } 

return success, score

### Read
method : GET
path : http://localhost:3001/score

return success, scores

### Read one
method : GET
path : http://localhost:3001/score/:id

return success, score
