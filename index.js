const express = require('express');
const multer = require('multer');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
const port = 4000;
app.use(methodOverride('_method'));

// Generate a unique ID for each blog post
const { v4: uuidv4 } = require('uuid');

app.set('view engine', 'ejs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/Images');// Setting the destination folder for uploaded images
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Setting the filename for uploaded images
    }
});
// Creating an instance of multer with the specified storage configuration
const upload = multer({ storage: storage });

// CSS style
app.use('/public', express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

//an empty array to store content
let contents = [];

// Route to save content
app.post('/upload', upload.single('image'), (req, res) => {
    let newContent = {
        id: uuidv4(),
        title: req.body.title,
        body: req.body.body,
        image: req.file.filename
    };
    contents.push(newContent);
    res.redirect('/');
});

// Delete a blog post by ID
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const index = contents.findIndex(content => content.id === id);
    if (index !== -1) {
        contents.splice(index, 1);
        res.redirect('/')
    } else {
        res.status(404).send('Image not found');
    }
});

//Edit a blog post
app.get('/edit-post/:id', (req, res) => {
    const postId = req.params.id;
    const post = contents.find(content => content.id === postId);
    res.render('edit-post', { post });
});
app.post('/posts/:id/edit-post', upload.single('newImage'), (req, res) => {
    const postId = req.params.id;
    const updatedPost = {
        id: postId,
        title: req.body.title,
        body: req.body.description,
        image: req.file.filename
    };
    const postIndex = contents.findIndex(content => content.id === postId);
    if (postIndex !== -1) {
        contents[postIndex] = updatedPost;
        res.redirect('/');
    } else {
        res.status(404).send('Post not found');
    }
});



// Route to display contents on home page
app.get('/', (req, res) => {
    res.render('index', { contents: contents });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Route for rendering the post creation form
app.get('/new-post', (req, res) => {
    res.render('new-post');
});

/*
const posts = [];

// Add a new blog post
app.post('/new-post', (req, res) => {
    const newPost = {
        id: uuidv4(),
        title: req.body.title,
        content: req.body.content
    };
    posts.push(newPost);
    res.json(newPost);
});

// Delete a blog post by ID
app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    const index = posts.findIndex(post => post.id === id);
    if (index !== -1) {
        posts.splice(index, 1);
        res.send('Post deleted successfully');
    } else {
        res.status(404).send('Post not found');
    }
});
*/