import { useRouteError } from 'react-router-dom';

/**
 * using https://reactrouter.com/en/main/start/tutorial
 * @returns error page for routing errors
 */
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  let statusText: unknown;
  let message: unknown;

  if (error && error instanceof Object && 'statusText' in error) {
    statusText = error.statusText;

    if ('message' in error) {
      message = error.message;
    }
  }

  const detail = `${statusText || message}`;

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {detail && <p>
        <i>{'' + detail}</i>
      </p>}
    </div>
  );
}
