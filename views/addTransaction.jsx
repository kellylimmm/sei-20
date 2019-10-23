var React = require("react");

class AddTransaction extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Please key in Name and Amount:</h3>
             <form action="/transaction" method="POST">
                <p>Name: </p> <input type="text" name="name"/><br/>
                <p>Amount: </p> <input type="number" name="amount"/><br/>
                <input type="submit"/>
            </form>

        </body>
      </html>
    );
  }
}

module.exports = AddTransaction;