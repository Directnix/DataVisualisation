const express = require('express');
const router = express.Router();

router.get('/data', (req, res) => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets:[{
          label: 'Hot data',
          data: [rand(),rand(),rand(),rand(),rand(),rand(),rand()],
        },
        {
          label: 'Cool data',
          data: [rand(),rand(),rand(),rand(),rand(),rand(),rand()],
        }],
      }

    res.send(data);
});

router.get('/piedata', (req, res) => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets:[{
          label: 'Pie data',
          data: [rand(),rand(),rand(),rand()],
        }]
    };
    res.send(data);
});

router.get('/colors', (req, res) => {
    const data = {
        colors: [
            '#fdd835',
            '#e91e63',
            '#fff59d',
            '#f9a825',
            '#f57f17',
            '#ffff00',
            '#ffd600',
          ]
      }

    res.send(data);
});

function rand(){
    return Math.random() * (20 - 1) + 1;
}

module.exports = router;
