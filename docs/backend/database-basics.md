# Introduction to Databases

Databases used in Web development are generally classified into relational databases and non-relational databases. Relational databases or SQL databases uses a relational data model to store data. On the other hand, non-relational databases are often known as NoSQL databases.

# SQL vs NoSQL

Other than SQL databases like (e.g. PostgreSQL, MySQL), there are also NoSQL databases (e.g. MongoDB, DynamoDB).
Here is an good article on [Comparing MongoDB vs PostgreSQL](https://www.mongodb.com/compare/mongodb-postgresql).

<iframe width="560" height="315" src="https://www.youtube.com/embed/ruz-vK8IesE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


*Organisation of Data*

In relational databases, the data are kept in tables of rows, while document-oriented databases keep their data in collections of documents.

| Relational DB | Document DB |
| ------------- | ----------- |
| Table         | Collection  |
| Row           | Document    |
| Index         | Index       |
| Foreign Key   | Reference   |

# Relational Database
Relational Database was proposed by Edgar Codd (IBM Research) in 1969. It has since become the dominant database model for applications. A language called `SQL` (Structured Query Language) was developed to work with relational databases.

Today there are many commercial `Relational Database Management System` (RDBMS) such as `Oracle`, `Microsoft SQL Server`. There are also many free, open-source RDBMS such as `MySQL`, `PostgreSQL`.

# Non-relational Database
The technology to store and retrieve unstructuted data have existed in the late 1960’s, but the term `NoSQL` was only became popular when Carlo Strozzi first used the term to name his light weight relational database in 1998. Today the non-relational databases is very much different than NoSQL databases back then.

`MongoDB` is a popular open-source NoSQL non-relational database. It is a document-orientated database that is flexible and scalable. It is best used for large amounts of unstructured data.

# More References
- https://jelvix.com/blog/relational-vs-non-relational-database
- https://medium.com/@zhenwu93/relational-vs-non-relational-databases-8336870da8bc
- https://www.mongodb.com/nosql-explained
- https://www.oracle.com/sg/database/what-is-database/
- https://www.datastax.com/blog/evolution-nosql
