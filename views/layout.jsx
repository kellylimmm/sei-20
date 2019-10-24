const React = require('react');

class Layout extends React.Component {
    render() {
        return (
           <html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>
                    <title>Tunr</title>
                </head>
                <body>
                    <div className="container">

                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <span className="navbar-brand">Tunr</span>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="nav mr-auto mt-lg-0">
                                    <li className="nav-item">
                                        <a className="nav-link" href="http://localhost:3000/">Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="http://localhost:3000/artists/">See All Artists</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="http://localhost:3000/artists/new">New Artist</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="http://localhost:3000/playlists">See All Playlist</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="http://localhost:3000/playlists/new">New Playlist</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="http://localhost:3000/favorites/new">See All Songs</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="http://localhost:3000/favorites">Favorites</a>
                                    </li>
                                </ul>
                                <form className="form-inline my-2 my-lg-0" method="GET" action={"/login"}>
                                    <input className="btn btn-outline-success my-2 my-sm-0" type="submit" value="Log In"/>
                                </form>
                                <form className="form-inline my-2 my-lg-0" method="GET" action={"/register"}>
                                    <input className="btn btn-outline-success my-2 my-sm-0" type="submit" value="Register"/>
                                </form>
                            </div>
                        </nav>

                        <div className="jumbotron">
                            {this.props.children}
                        </div>

                    </div>
                    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossOrigin="anonymous"></script>
                    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossOrigin="anonymous"></script>
                </body>
            </html>
        );
    };
};

module.exports = Layout;