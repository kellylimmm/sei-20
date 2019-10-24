console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const cookieParser = require('cookie-parser');

var sha256 = require('js-sha256');

var SALT = "payuplah";

// Initialise postgres client
const config = {
  user: 'kellylim',
  host: '127.0.0.1',
  database: 'payup_db',
  port: 5432,
};

const pool = new pg.Pool(config);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(methodOverride('_method'));


// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

// Set the configuration to tell express to use cookie parser
app.use(cookieParser());


// ======= User to register ====== OK

app.get('/register', (request,response) => {
    response.render('register')

});

app.post('/register', (request,response) => {
    console.log(request.body);

    let hashedPassword = sha256(request.body.password + SALT);

    const queryString ='INSERT INTO users (name,password) VALUES ($1, $2) RETURNING *';

    const values = [
    request.body.name,
    hashedPassword,
    ];

    pool.query(queryString, values, (err,result) =>{

        if (err) {
          console.error('query error:', err.stack);
          response.send( 'query error' );
        } else {
          console.log('query result:', result);


          response.redirect( 'login' );
        }
      });
})

// ====== User to login ======== OK

app.get('/login', (request, response) => {
    response.render('login');
})

app.post('/login', (request, response) => {
    let requestUsername = request.body.name;
    let requestPassword = request.body.password;

    const queryString = "SELECT * FROM users WHERE name= '"+requestUsername+"'";
    console.log("db query", queryString);

    pool.query(queryString, (err, result) => {

        if (err) {
            console.error('query error: ', err.stack);
            response.send('query error');
        } else {
            console.log('query result: ', result.rows);


if (result.rows.length > 0) {

    let hashedRequestPassword = sha256(requestPassword + SALT);
    console.log("hashed request password : " + hashedRequestPassword);

    if (hashedRequestPassword === result.rows[0].password) {
        let user_id = result.rows[0].id
        let hashedCookie = sha256(SALT+ user_id);


        response.cookie('user_id', user_id);
        response.cookie('hasLoggedIn', hashedCookie);

        response.redirect('/transaction/show'); //REDIRECT TO ('/showTransaction')
    } else {
        response.status(403).send('wrong password');
    }

}

else {
    response.status(403).send('NO USERNAME!');
}
        }

    });

});

// ======== Show Transaction. Landing Page ========

app.get('/transaction/show', (request, response) => {

    let user_id = request.cookies['user_id'];
    let hashedValue = sha256(SALT + user_id);
    let id = [user_id];

    if (request.cookies['hasLoggedIn'] === hashedValue) {

        const queryString = 'SELECT * FROM owings';

        pool.query(queryString, (err, debtor) => {

            if (err) {
                console.log(err);
                response.send("query error");

            } else {
                console.log(debtor,"AAAAA")
                const queryString = 'SELECT SUM(amount) AS amount,name FROM owings GROUP BY name,user_id HAVING user_id = $1';

                pool.query(queryString, id, (err, sum) => {

                    if (err) {
                        console.log(err);
                        response.send("query error");

                    } else {
                        let data = {
                            sum : sum.rows,
                            debtor : debtor.rows
                        };
                        // response.send( result.rows );

                        response.render('showTransaction', data);
                    }
                });
            }
                // response.send( result.rows );
        });
    }
});

// ================ Render Add Transaction Page ====== OK

app.get('/transaction/add', (request, response) => {

  response.render('addTransaction');
});



// ====== Add Transaction Amount ========= OK

app.post('/transaction/', (request,response) => {

    let text = 'INSERT INTO owings (user_id,amount,name) VALUES($1,$2, $3) RETURNING *';
    let values = [request.cookies['user_id'],request.body.amount,request.body.name];
    pool.query(text, values, (err, result) => {

        if (err) {
            console.log(err);
            response.send("query error");

        } else {
            console.log('query result:', result);
            // response.send( result.rows );
            response.redirect('/transaction/show')//REDIRECT TO SHOW TRANSACTION PAGE
        }
    });
});

// ===== Delete a Transaction ===== OK

app.get('/transaction/delete', (request, response) => {
let id = [request.body.amount, request.body.name]

const queryString = 'SELECT * FROM owings';

pool.query(queryString, (err, result) => {

    if(err) {
        console.log("Error: ", err.message);
    } else {
        const data = {
            delete : result.rows
        }
    response.redirect('deleteTransaction', data);

    }
})

})

app.delete('/transaction/:id', (request, response) => {
    console.log(request.params, "HHHH")
    // response.send("deleteeee")
    let id = request.params.id;

    const queryString = "DELETE from owings WHERE id= " + id;

    pool.query(queryString, (err, result) => {

        if (err) {
            console.log("Error: ", err.message);
        } else {
            response.redirect('/transaction/show');
        }
    });
});


//======== Update a Transaction =========

// app.put('/transaction/:id/', (request,response) => {

//     // let id = parseInt(request.body.id);
//     let name = request.body.name;
//     let amount = request.body.amount;

//     const values = [name, photo_url, nationality];
//     const queryString = "UPDATE owings SET name=$1, amount=$2 WHERE id=" + request.params.id;

//     // const values = [request.body.name, request.body.photo_url, request.body.nationality];

//     pool.query(queryString, values, (err,result) => {
//     if (err) {
//         console.log('error', err.message);
//         response.send('query error');
//     } else {

//         response.send('Edited Transaction!');
//     }

// })
// });


//=========== Cookies ======= OK

app.get('/special', (request,response) => {

    let user_id = request.cookies['user_id'];
    let hashedValue = sha256(SALT + user_id);


if (request.cookies['hasLoggedIn'] === hashedValue) {
    response.send("LOGGED IN");
} else {
    response.redirect('/login');
}


});




/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

let onClose = function(){

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);