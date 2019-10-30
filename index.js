console.log("starting up!!");

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');
const cookieParser = require('cookie-parser');

var sha256 = require('js-sha256');

var SALT = "payuplah";

// const pool = new pg.Pool(config);

const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

//====================

const url = require('url');


if( process.env.DATABASE_URL ){

  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  //make the configs object
  var configs = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
  };

}else{

  //otherwise we are on the local network
  var configs = {
      user: 'kellylim',
      host: '127.0.0.1',
      database: 'payup_db',
      port: 5432
  };
}

//this is the same


/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(express.static('public'))
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

// ======== Home ====== OK

app.get('/home', (request, response) => {
    response.render('home');
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

        response.redirect('home'); //REDIRECT TO ('/showTransaction')
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

// ======== Show ALL Transactions. Total sum of each name ======== OK

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

// ============= Add Individual amounts ==============


app.post('/transaction/addindividualamount', (request,response) => {

    let text = 'INSERT INTO owings (user_id,amount,name) VALUES($1,$2, $3) RETURNING *';
    let values = [request.cookies['user_id'],request.body.amount,request.body.name];
    pool.query(text, values, (err, result) => {

        if (err) {
            console.log(err);
            response.send("query error");

        } else {
            console.log('query result:', result);
            // response.send( result.rows );
            response.redirect('/transaction/showindividualamount')//REDIRECT TO SHOW TRANSACTION PAGE
        }
    });
});


// ============ Show individual amounts ===============


app.get('/transaction/showindividualamount', (request, response) => {

    const queryString = 'SELECT * from owings';

    pool.query(queryString, (err, result) => {

        if (err) {
            console.log(err);
            response.send("query error");

        } else {
            let data = {
                individual : result.rows
            };
            // response.send( result.rows );

            response.render('showindividualamount', data);
        }
        });
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
            response.redirect('/transaction/showindividualamount')//REDIRECT TO SHOW TRANSACTION PAGE
        }
    });
});

//======== Log out ============== OK

app.get('/logout', (request,response) => {
    response.clearCookie('user_id');
    response.clearCookie('hasLoggedIn');
    response.redirect('/login')
})


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

app.delete('/transaction/:name', (request, response) => {
    console.log('/transaction/:name');
    console.log(request.params, "HHHH")
    // response.send("deleteeee")
    let name = request.params.name;

    const queryString = "DELETE from owings WHERE name = $1";
    const arr = [name]
    pool.query(queryString, arr,(err, result) => {

        if (err) {
            console.log("Error: ", err.message);
        } else {
            response.redirect('/transaction/show');
        }
    });
});


//================ ITEMS ============================


// ================ Render Add Items Page ====== OK

app.get('/transaction/additem', (request, response) => {

  response.render('addItem');
});



// ====== Add Items ========= OK

app.post('/transaction/item', (request,response) => {

    let text = 'INSERT INTO items (user_id,item,name) VALUES($1,$2, $3) RETURNING *';
    let values = [request.cookies['user_id'],request.body.item,request.body.name];
    pool.query(text, values, (err, result) => {

        if (err) {
            console.log(err);
            response.send("query error");

        } else {
            console.log('query result:', result);
            // response.send( result.rows );
            response.redirect('/transaction/showitem')//REDIRECT TO SHOW ITEMS PAGE
        }
    });
});

// ======== Show Item. Landing Page ======== OK

app.get('/transaction/showitem', (request, response) => {

    let user_id = request.cookies['user_id'];
    let hashedValue = sha256(SALT + user_id);
    let id = [user_id];

    if (request.cookies['hasLoggedIn'] === hashedValue) {

        const queryText = 'SELECT * FROM items';

        pool.query(queryText, (err, result) => {

            if (err) {
                console.log(err);
                response.send("query error");


                    } else {
                        let data = {
                            item : result.rows
                        };
                        // response.send( result.rows );
                        console.log(result.rows, "HAHAHA")

                        response.render('showItem', data);
                    }
        });
    }
                // response.send( result.rows );
});


 // ======== Delete Item =============== OK

 app.get('/transaction/deleteitem', (request, response) => {

let id = [request.body.item, request.body.name]

const queryString = 'SELECT * FROM items';

pool.query(queryString, (err, result) => {

    if(err) {
        console.log("Error: ", err.message);
    } else {
        const data = {
            delete : result.rows
        }
    response.render('deleteItem', data);

    }
})

})

app.delete('/transaction/:id/delete', (request, response) => {
    // console.log(request.params, "HHHH")
    // response.send("deleteeee")
    let id = request.params.id;

    const queryString = "DELETE from items WHERE id = $1";
    const arr = [id]
    pool.query(queryString, arr,(err, result) => {

        if (err) {
            console.log("Error: ", err.message);
        } else {
            response.redirect('/transaction/showitem');
        }
    });
});

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

// ========== Currency Converter API ==============


var https = require('https');

function convertCurrency(amount, fromCurrency, toCurrency, cb) {
  var apiKey = 'fbee056ddbf2e385147c';

  fromCurrency = encodeURIComponent(fromCurrency);
  toCurrency = encodeURIComponent(toCurrency);
  var query = fromCurrency + '_' + toCurrency;

  var url = 'https://free.currconv.com/api/v7/convert?q=USD_SGD,GBP_SGD,EUR_SGD,JPY_SGD,AUD_SGD&compact=ultra&apiKey=fbee056ddbf2e385147c';

  https.get(url, function(res){
      var body = '';

      res.on('data', function(chunk){
          body += chunk;
      });

      res.on('end', function(){
          try {
            var jsonObj = JSON.parse(body);

            var val = jsonObj[query];
            if (val) {
              var total = val * amount;
              // cb(null, Math.round(total * 100) / 100);
              cb(null, (total * 100) / 100);

            } else {
              var err = new Error("Value not found for " + query);
              console.log(err);
              cb(err);
            }
          } catch(e) {
            console.log("Parse error: ", e);
            cb(e);
          }
      });
  }).on('error', function(e){
        console.log("Got an error: ", e);
        cb(e);

  });

}

app.get('/currency', (request, response) => {
    convertCurrency(1, 'USD', 'SGD', function(err, amount) {
        let data = {
            currencyUsd : amount
        }
        convertCurrency(1, 'GBP', 'SGD', function(err,amount) {
            data["currencyGbp"] = amount;
            // console.log(amount);

            convertCurrency(1, 'EUR', 'SGD', function(err,amount) {
            data["currencyEur"] = amount;

                convertCurrency(1, 'JPY', 'SGD', function(err,amount) {
                data["currencyJpy"] = amount;

                    convertCurrency(1, 'AUD', 'SGD', function(err,amount) {
                    data["currencyAud"] = amount;

            response.render('currency', data);

                    })

                })

            })
        })

    })

})

app.post('/currency/new', (request,response) => {

});





/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log('~~~ Tuning in to the waves of port '+PORT+' ~~~'));

let onClose = function(){

  console.log("closing");

  server.close(() => {

    console.log('Process terminated');

    pool.end( () => console.log('Shut down db connection pool'));
  })
};

process.on('SIGTERM', onClose);
process.on('SIGINT', onClose);