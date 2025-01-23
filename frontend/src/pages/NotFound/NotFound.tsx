import { useNavigate } from "react-router"


export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="d-flex w-100 h-100 flex-column justify-content-center text-center gap-5 mt-5 align-items-center">
      <div className="mt-5">
        <h2>Kunde inte hitta sidan</h2>
        <button
          onClick={() => navigate(-1)}
          className=" glass-bg px-5 py-1 mt-5"
          style={{ color: "white" }}
        >
          Tillbaka
        </button>
      </div>
    </div>
  );
}