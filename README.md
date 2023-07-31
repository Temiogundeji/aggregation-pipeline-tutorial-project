# Aggregation Pipeline Tutorial Project

## Introduction:
This is a project used in explaining the mongodb aggregation pipeline. Through this project, you will understand:
 - Aggregation pipeline stages.
 - How to perform various operations in mongodb.
 - How to generate reports using mongodb aggregation pipeline.
 - How to optimize your aggregation pipeline queries.
 - How to handle relationship across documents in mongodb.

## Technology used:
 - Nodejs 
 - Express
 - Mongodb
 - bcrypt 
 - jwt

## What we will be building
A blog application with interesting features that would help us leverage various mongodb aggregation pipeline concepts we have learned. Below are the features of the project we will be building:
  - [x] User can login.
  - [x] User can register.
  - [x] User can post article.
  - [x] User can post comment on articles.
  - [x] View specific article
  - []  User can update articles.
  - [] User can delete articles.
  - User can view articles by categories.
  - User can view articles with the highest number of upvotes.
  - Users can view articles with the highest number of comments.
  - Users can retrieve the most recent articles:
  - Sort articles by their creation date in descending order.
  - Limit the results to a specific number of articles.
  - Retrieve the most commented articles:
  - Count the number of comments for each article.
  - Sort articles based on the comment count in descending order.
  - Limit the results to a specific number of articles.
  - Retrieve articles with their respective author information:
  - Perform a lookup to join the User collection with the Article collection using the author's user ID.
  - Add the author information to each article.
  - Retrieve articles and their comment count:
  - Perform a lookup to join the Article collection with the Comment collection using the article's ID.
  - Group the articles by their ID and calculate the count of comments for each article.
  - Retrieve articles and their average comment ratings:
  - Perform a lookup to join the Article collection with the Comment collection using the article's ID.
  - Group the articles by their ID and calculate the average rating of comments for each article.
  - Retrieve users with the number of articles they have written:
  - Perform a lookup to join the User collection with the Article collection using the author's user ID.
  - Group the users by their ID and calculate the count of articles for each user.
  - Retrieve articles with the most recent comments:
  - Sort comments by their creation date in descending order.
  - Limit the comments to a specific number.
  - Perform a lookup to join the Article collection with the Comment collection using the article's ID.
  - Add the most recent comments to each article.

This article will build out some of the features above (60%) to ensure we almost implement all the concept you have learned theoretically in the article. The rest will be left for you as an exercise to help to master mongodb aggregation pipeline.

I hope you find this article helpful in your journey to learning mongodb aggregation framework.
Thanks.