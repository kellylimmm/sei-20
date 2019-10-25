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

            <nav class="navbar">
  <a class="navbar-brand" href="#">Home</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="/transaction/show">Show Transaction <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/transaction/add">Add Transaction</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>

    </ul>

  </div>
</nav>


                <h1 className="row justify-content-center"> Otang: </h1>

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

                <a href="/transaction/add" className="row justify-content-center"><button>Add Transaction</button></a>

            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

            </body>
        </html>
    )

    }
}

module.exports = ShowTransaction;