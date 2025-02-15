# MongoDB

To establish the connection, type `mongosh`.

1. **Exit the shell**: 
    ```shell
    quit
    ```
    
2. **Clear the output**: 
    ```shell
    cls
    ```

3. **Show all the Databases**:
    ```shell
    show dbs
    ```
    This command lists all the databases on the server.

4. **Select a Database**:
    ```shell
    use <database>
    ```
    This command switches to the specified database. If the database does not exist, it will be created.

5. **Create a Database**:
    ```shell
    use <database>
    ```
    This command creates the database if it doesn't exist but won't show up in `show dbs` until it contains some data.

6. **Create a Collection**:
    ```shell
    db.createCollection("name")
    ```
    This command creates a new collection within the selected database.

7. **Drop a Database**:
    ```shell
    db.dropDatabase()
    ```
    This command deletes the current database.

8. **Add a Document to the Collection `students`**:
    ```shell
    db.students.insertOne({key: value, key1: value2})
    ```
    This command inserts a single document into the `students` collection.

9. **Get the Current Documents**:
    ```shell
    db.students.find()
    ```
    This command retrieves all documents from the `students` collection.

10. **Insert Multiple Documents into the Collection**:
     ```shell
     db.students.insertMany([{key: value, key1: value1}, {key: value, key1: value1}, {key: value, key1: value1}])
     ```
     This command inserts multiple documents into the `students` collection.

11. **Data Types in MongoDB**:
     1. **String**: Enclosed within single or double quotes.
     2. **Integer**: Whole number.
     3. **Double**: Decimal number.
     4. **Boolean**: Either `true` or `false`.
     5. **Date**: Use `new Date("2025-02-14T00:00")`.
     6. **Null**: Represents a null value.
     7. **Array**: Contains multiple values.
     8. **Nested Document**: Represented by key-value pairs.

12. **Sort Documents Based on a Condition**:
     ```shell
     db.students.find().sort({name: 1})
     ```
     Sorts documents by name in alphabetical order.
     ```shell
     db.students.find().sort({name: -1})
     ```
     Sorts documents by name in reverse alphabetical order.

13. **Limit the Documents Returned by `find` Method**:
     ```shell
     db.students.find().limit(4)
     ```
     Limits the query to 4 documents and shows them in ascending order based on the object ID.

14. **Combine `sort` and `find` Methods**:
     ```shell
     db.students.find().sort({gpa: 1}).limit(2)
     ```
     Sorts the documents by GPA in ascending order and shows two documents.

15. **Find a Particular Document (Acts Like `WHERE` Clause)**:
     ```shell
     db.students.find({query parameters separated by comma}, {projection parameter})
     ```
     The projection parameter is like the `SELECT` statement and the query is the `WHERE` clause.

16. **Update a Document**:
     ```shell
     db.students.updateOne({condition/field}, {$set: {update/add new field}})
     ```
     ```shell
     db.students.updateOne({condition/field}, {$unset: {update/remove field}})
     ```
     ```shell
     db.students.updateMany({}, {$set: {update/add new field}})
     ```
     Applies to all documents.
     ```shell
     db.students.updateMany({fullTime: {$exists: false}}, {$set: {fullTime: true}})
     ```

17. **Delete a Document**:
     ```shell
     db.students.deleteOne({name: "Jeevith"})
     ```
     ```shell
     db.students.deleteMany({field: something})
     ```

18. **Comparison Operators**:
     - Not equal to: 
        ```shell
        db.students.find({name: {$ne: "particular_name"}})
        ```
     - Less than or equal to: 
        ```shell
        db.students.find({age: {$lte: value}})
        ```
     - Less than: 
        ```shell
        db.students.find({age: {$lt: value}})
        ```
     - Greater than: 
        ```shell
        db.students.find({age: {$gt: value}})
        ```
     - Greater than or equal to: 
        ```shell
        db.students.find({age: {$gte: value}})
        ```
     - Between range: 
        ```shell
        db.students.find({gpa: {$gte: value1, $lte: value2}})
        ```
     - In operator: 
        ```shell
        db.students.find({name: {$in: [value1, value2]}})
        ```
     - Not in operator: 
        ```shell
        db.students.find({name: {$nin: [value1, value2]}})
        ```

19. **Logical Operators**:
     - And operator: 
        ```shell
        db.students.find({$and: [{fulltime: true}, {age: {$gte: value1, $lte: value2}}]})
        ```
     - Or operator: 
        ```shell
        db.students.find({$or: [{fulltime: true}, {age: {$gte: value1, $lte: value2}}]})
        ```
     - Nor operator: 
        ```shell
        db.students.find({$nor: [{fulltime: true}, {age: {$gte: value1, $lte: value2}}]})
        ```
     - Not operator: 
        ```shell
        db.students.find({age: {$not: {$gte: value}}})
        ```

20. **Indexes**:
     ```shell
     db.students.createIndex({name: 1})
     ```
     Creates an index on the `name` field to sort based on the name.

21. **Show Collections**:
     ```shell
     show collections
     ```
     Lists all collections in the current database.