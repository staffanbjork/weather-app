import { useRouteError } from "react-router-dom";


export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <section className="error-section" id="error-page">
      <h1>Ooops!</h1>
      <p>Ett oväntat fel har inträffat.</p>
    </section>
  )
}