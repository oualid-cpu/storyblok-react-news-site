const basePath = import.meta.env.BASE_URL;

function Navigation() {
    return (
        <nav className="site-nav">
            <a href={basePath}>Home</a>
            <a href={`${basePath}politics`}>Politics</a>
            <a href={`${basePath}technology`}>Technology</a>
            <a href={`${basePath}sports`}>Sports</a>
        </nav>
    );
}

export default Navigation;