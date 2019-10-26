var React = require('react');


class ShowTransaction extends React.Component {
    render() {
        console.log(this.props.debtor);

        let debtor = this.props.sum.map(el => {


            let url = "/transaction/" + el.name + "?_method=DELETE";
            console.log(url)

            return (
                <div>
                    <tr>
                          <th scope="row"></th>
                          <td>{el.name}</td>
                          <td>{el.amount}</td>
                          <td><form action={url} method="POST">
                          <button> Delete </button>
                          </form>
                          </td>
                    </tr>
                </div>
            )

        })

    return (
        <html>
            <head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
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
    <a class="nav-item nav-link" href="/transaction/showindividualamount">Show Individual Amount</a>
      <a class="nav-item nav-link active" href="/transaction/additem">Add Item <span class="sr-only">(current)</span></a>
      <a class="nav-item nav-link" href="/transaction/showitem">Show Item</a>
      <a class="nav-item nav-link" href="/logout">Log Out</a>
    </div>
  </div>
</nav>

                <h1 className="row justify-content-center mb-3"> Tally: </h1>

                <table class="table">
                      <thead>
                            <tr>
                              <th scope="col"></th>
                              <th scope="col">Name</th>
                              <th scope="col">Amount</th>
                              <th scope="col">Paid</th>
                            </tr>
                      </thead>

                      <tbody>
                    {debtor}
                      </tbody>
                </table>

                <a href="/transaction/add" className="row justify-content-center"><button>Add Amount</button></a>

            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

            </body>
        </html>
    )

    }
}

module.exports = ShowTransaction;