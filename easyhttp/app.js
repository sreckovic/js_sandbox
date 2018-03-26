//const http = new easyHTTP();
const http = new EasyHTTP();

// Get Posts
// http.get('https://jsonplaceholder.typicode.com/posts', function(err, response) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(response);
//   }
// });

// Get Single Post
// http.get('https://jsonplaceholder.typicode.com/posts/1', function(
//   err,
//   response
// ) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(response);
//   }
// });

// Create Data
// const data = {
//   title: 'Custom Post',
//   body: 'This is a custom post'
// };

// Create post
// http.post('https://jsonplaceholder.typicode.com/posts', data, function(
//   err,
//   response
// ) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(response);
//   }
// });

// Update post
// http.put('https://jsonplaceholder.typicode.com/posts/1', data, function(
//   err,
//   response
// ) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(response);
//   }
// });

// Delete Post
// http.delete('https://jsonplaceholder.typicode.com/posts/1', function(
//   err,
//   response
// ) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(response);
//   }
// });

// http
//   .get('https://jsonplaceholder.typicode.com/users')
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

const data = {
  name: 'John Doe',
  username: 'johndoe',
  email: 'jdoe@gmail.com'
};

// http
//   .post('https://jsonplaceholder.typicode.com/users', data)
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

// http
//   .put('https://jsonplaceholder.typicode.com/users/2', data)
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

http
  .delete('https://jsonplaceholder.typicode.com/users/2')
  .then(data => console.log(data))
  .catch(err => console.log(err));
