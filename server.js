const express =require('express');
 
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

// Define routes
app.use('/api/gallery', require('./routes/api/gallery'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  
  app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'client', 'build','index.html'));
  })
}

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

