var React = require('react');

class Register extends React.Component {
    render() {
        return (
            <html>
                <body>
                    <form method="POST" action = "/register">
                    <h1> Register Here: </h1>
                        <p>
                            Username
                            <br/>
                            <input name ="name"/>
                        </p>
                        <p>
                            Password
                            <br/>
                            <input name ="password" type="password"/>
                        </p>
                        <p>
                            <input type ="submit"/>
                        </p>
                    </form>
                </body>
            </html>
        );
    }
}

module.exports = Register;