//Problem 1: List all of the post titles having more than six words

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(posts => {
    const postsFiltered = posts
      .filter(post => post.title.split(' ').length > 6)
      .map(post => post.title);

    console.log("Post titles with more than six words:");
    console.log(postsFiltered);
  })
  .catch(error => console.error(error));

// Problem 2: Show a word frequency map for all of the body contents of the posts

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(posts => {
    // Combine the body contents of all posts into a single string
    const allBodies = posts.map(post => post.body).join(' ');

    // Split the combined body content into words
    const words = allBodies.split(/\s+/);

    // Create a word frequency map using reduce
    const wordFrequencyMap = words.reduce((frequencyMap, word) => {
      if (frequencyMap.hasOwnProperty(word)) {
        frequencyMap[word]++;
      } else {
        frequencyMap[word] = 1;
      }
      return frequencyMap;
    }, {});

    console.log("Word Frequency Map for Post Bodies:");
    console.log(wordFrequencyMap);
  })
  .catch(error => console.error(error));