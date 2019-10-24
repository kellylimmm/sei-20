var React = require('react');


class Login extends React.Component {
  render() {
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
        <div className="container">
    <div className="d-flex justify-content-center h-100">
        <div className="card">
            <div className="card-header">
                <h3>Sign In</h3>

            </div>
            <div className="card-body">
                 <form method="POST" action="/login">
                    <div className="input-group form-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                        </div>
                        <input type="text" className="form-control" placeholder="username" name="name"/>

                    </div>
                    <div className="input-group form-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fas fa-key"></i></span>
                        </div>
                        <input type="password" className="form-control" placeholder="password" name="password"/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn float-right login_btn" a href="/register"/>
                    </div>
                </form>
            </div>
            <div className="card-footer">
                <div className="d-flex justify-content-center links">
                    Don't have an account?<a href="/register">Sign Up</a>
                </div>

            </div>
        </div>
    </div>
</div>

        </body>
      </html>
    );
  }
}

module.exports = Login;