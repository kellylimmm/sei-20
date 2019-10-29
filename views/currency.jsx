var React = require("react");

class Currency extends React.Component {
  render() {

    console.log("CURRENCY");
    return (
      <html>
           <head>
                <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
                <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
                <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"/>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous"/>
                <link rel="stylesheet" type="text/css" href="/styles.css"/>

            </head>

        <body>

        <nav class="navbar navbar-expand-lg">
          <a class="navbar-brand" href="/home">Home</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
            <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Amounts
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a class="dropdown-item" href="/transaction/show">Total Amount</a>
                <a class="dropdown-item" href="/transaction/showindividualamount">Show Individual Amount</a>

        </div>
      </li>
              <a class="nav-item nav-link" href="/transaction/showitem">Show Item</a>

              <a class="nav-item nav-link" href="/logout">Log Out</a>
            </div>
          </div>
        </nav>

         <div className="container">
    <div className="d-flex justify-content-center h-100">
        <div className="card">
            <div className="card-header">
               <h3>Currency Conversion Rate (per 60 mins):</h3>

            </div>

            <p className="row justify-content-center"> 1 USD to SGD = {this.props.currencyUsd.toFixed(4)} </p>
             <p className="row justify-content-center"> 1 GBP to SGD = {this.props.currencyGbp.toFixed(4)} </p>
              <p className="row justify-content-center"> 1 EUR to SGD = {this.props.currencyEur.toFixed(4)} </p>
              <p className="row justify-content-center"> 1 JPY to SGD = {this.props.currencyJpy.toFixed(4)} </p>
              <p className="row justify-content-center"> 1 AUD to SGD = {this.props.currencyAud.toFixed(4)} </p>



        </div>
    </div>
</div>
    <script src= '/script.js'></script>


        </body>
      </html>
    );
  }
}

module.exports = Currency;