 require('./config/database');// connect this script to the database
 const Movie = require('./models/movie');
 const Performer = require('./models/performer');
 const data = require('./data');
const { resolveInclude } = require('ejs');

//  const p = new Promise(function(resolve, reject) {
//     setTimeout(function() {
//       //resolve to my data list if value is odd
//       let val = 15;

//       if(val % 2 == 1){
//         resolve({data: [10, 31, 22, 65, 73]});
//       }else{
//         reject("Something is wrong!");
//       }
      
//       //reject otherwise
      
//     }, 2000);
//   });
//   console.log(p);

//   p.then(function(result) {
//     console.log(result);
//   })
//   .catch(function(err){
//     console.log(err);
//   })

//   //console.log(data) //error

// function asyncAdd(a, b, delay) {
//     return new Promise(function(resolve) {
//       setTimeout(function() {
//         resolve(a + b);
//       }, delay);
//     });
//   }

//   asyncAdd(5, 10, 2000)
//  .then(function(sum) {
//    console.log(sum);
//    return asyncAdd(sum, 100, 1000);
//  })
//  .then(function(sum) {
//    console.log(sum);
//    return asyncAdd(sum, 1000, 2000);
//  })
//  .then(function(sum) {
//    console.log(sum);
//  });

// Movie.deleteMany({})
//  .then(function(results) {
//    console.log(results);
//    process.exit();
//  });

//  Movie.deleteMany({})
//  .then(function(results) {
//    console.log('Deleted movies: ', results);
//    return Performer.deleteMany({});
//  })
//  .then(function(results) {
//    console.log('Deleted performers:', results);
//  })
//  .then(function() {
//    process.exit();
//  });

// clear out all movies and performers to prevent dups
const p1 = Movie.deleteMany({});
const p2 = Performer.deleteMany({});

Promise.all([p1, p2])
 .then(function(results) {
   
   //Write two statements to create performers and movies
   //const p = Performer.create(data.performers);
   //const m = Movie.create(data.movies);
   
   //then use Promise.all to resolve the promises
   //return Promise.all([p, m]);
   //Alternatively it can be done in one statement
   return Promise.all([Performer.create(data.performers), Movie.create(data.movies)]);
 })
 .then(function(results) {
   console.log(results);
 })
 .then(function(movies) {
    return Promise.all([
      Performer.findOne({name: 'Mark Hamill'}),
      Movie.findOne({title: 'Star Wars - A New Hope'})
    ]);
  })
  .then(function(results) {  // one day we'll destructure this!
    const mark = results[0];
    const starWars = results[1];
    starWars.cast.push(mark);
    return starWars.save();
  })
  .then(function(result) {
    console.log(result);
    process.exit();
  })
 .catch(function(err){
     console.log(err);
 })