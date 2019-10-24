var React = require('react');


class ShowTransaction extends React.Component {
    render() {
        console.log(this.props.debtor);

        let debtor = this.props.sum.map(el => {


            let url = "/transaction/" + el.name + "?_method=DELETE";
            console.log(url)

            return (
                <div>
                    <p>
                        {el.name}
                    </p>
                    <p>
                        {el.amount}
                    </p>
                    <form action={url} method="POST">
                    <button> Delete </button>
                    </form>
                </div>
            )

        })

    return (
        <html>
            <body>
                <h1> Expenses: </h1>


                {debtor}


                <a href="/transaction/add"><button>Add Transaction</button></a>

            </body>
        </html>
    )

    }
}

module.exports = ShowTransaction;