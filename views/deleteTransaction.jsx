var React = require("react");

class DeleteTransaction extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
             <form action={"/transaction/" + "?_method=DELETE"} method="POST">
                <p>Name: </p> <input type="text" name="name"/><br/>
                <p>Amount: </p> <input type="number" name="amount"/><br/>
                <input type="submit"/>
            </form>

        </body>
      </html>
    );
  }
}

module.exports = DeleteTransaction;