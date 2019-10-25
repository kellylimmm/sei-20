var React = require("react");

class DeleteItem extends React.Component {
  render() {
    console.log(this.props, "LLLLL")
    return (
      <html>
        <head />
        <body>

             <form action={"/transaction/" + "item" + "?_method=DELETE"} method="POST">
                <p>Name: </p> <input type="text" name="name"/><br/>
                <p>Item: </p> <input type="text" name="item"/><br/>
                <input type="submit"/>
            </form>

        </body>
      </html>
    );
  }
}

module.exports = DeleteItem;