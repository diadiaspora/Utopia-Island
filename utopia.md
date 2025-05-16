# Utopia Island

## User Stories

- As a visitor (AAV), when I browse to the app I want to see a "home/landing" page that makes me want to signup!

-  AAV, I want to be able to click "Sign Up" to become a user so that I can access all of the app's features.

- As a User (AAU), when I log in/sign up, I want to view the instructions for the app. 

- AAU, I want to view the profile of current citizens

- AAU, I want to update the profile of current citizens

- AAU, I want to be able to banish/delete the profile of unwanted citizens. 

- AAU, I want to add/invite new citizens. 


| HTTP Method       | Path/Endpoint/URI  | CRUD Operation | Route Name | Has Data Payload | Purpose                        | Render/Redirect Action             |
| :---------------- | :----------------  | :------------- | :--------  | :--------------- | :----------------------------- | :----------------------------------|  
| GET               | `/`                | READ           | index      |                  | Explain app                    | `res.render('home.ejs')`           |
| GET               | `/auth/sign-in`    | READ           | show       |                  | Show a form to sign in         | `res.render('auth/sign-up.ejs')`   |
| POST              | `/auth/sign-in`    | UPDATE         | update     | YES              | Submit form to sign in         | `res.redirect('citizens.ejs')`     |
| GET               | `/citizens`        | READ           | show       |                  | View current citizens list     | `res.render('citizens.ejs')`       |
| GET               | `/citizens/id`     | READ           | show       |                  | View specific citizens profile | `res.render('citizens/:id.ejs')`   |
| GET               | `/citizens/id`     | READ           | show       | No               | Show a form to update          |                                    |
|                   |                    |                |            |                  | citizen profile                | `res.render('citizens/:id.ejs')`   |
| PUT               | `/citizens/id`     | UPDATE         | update     | YES              | Submit a form to update        |                                    |
|                   |                    |                |            |                  | citizen profile                | `res.redirect('citizens/:id.ejs')` |
| DELETE            | `/citizens/id`     | DELETE         | delete     |                  | Delete citizen profile         | `res.redirect('citizens.ejs')`     |
| GET               | `/citizens/new`    | READ           | show       | YES              | show form to add new           |                                    |
|                   |                    |                |            |                  | citizen profile to society     | `res.render('citizens/new.ejs')`   |
| POST              | `/citizens/new`    | CREATE         | create     | YES              | Create/ADD a new citizen       |                                    |
|                   |                    |                |            |                  | profile to society             | `res.redirect('citizens.ejs')`     |
| POST              | `/auth/sign-up`    | CREATE         | create     | YES              | Add new user                   | `res.redirect('citizens.ejs')`     |

> ### Entity Relationship Diagrams

## USER

| Field             | Type               | Options        | 
| :---------------- | :----------------  | :------------- | 
| ID                | Object Id          |                |            
| Username          | String             |                |           
| Password          | String             |                |           
|                   |                    |                |           

## CITIZENS

| Field             | Type               | Options        | 
| :---------------- | :----------------  | :------------- | 
| ID                | String             |                |            
| Name              | String             |                |           
| Former Position   | String             |                |           
| Current Position  | String             |                |  
| Rating            | Number             |                |   
| Reason            | String             |                |   

    
