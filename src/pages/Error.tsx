import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  return (
    <div className="error">
        <h1>Page Not Found</h1>
        <p>Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
        <p>{(useRouteError() as { statusText?: string, message?: string })?.statusText || (useRouteError() as { message?: string })?.message}</p>
        <div className="navback">
            <Link to="/" className="nav">Go back</Link>
            <Link to="contact" className="nav">Contact us</Link>
        </div>
    </div>
  );
};

export default Error;