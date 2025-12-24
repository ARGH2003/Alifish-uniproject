import "./Footer.css";
import { useNavigate, useLocation } from "react-router-dom";

function Footer({ showNB = true, totalPages }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname.startsWith("/home");

  const page = Number(location.pathname.split("/")[2]) || 1;

  const goPrev = () => {
    if (page > 1) {
      navigate(`/home/${page - 1}`);
    }
  };

  const goNext = () => {
    if (page < totalPages) {
      navigate(`/home/${page + 1}`);
    }
  };

  if (!showNB || !isHome) {
    return (
      <div className="footer">
        <div className="nid">
          <p>Name: Alireza Ghadimi</p>
          <p>Student Id: 40011541054349</p>
        </div>
      </div>
    );
  }

  return (
    <div className="footer">
      <div className="NB">
        <button
          className="back"
          onClick={goPrev}
          disabled={page === 1}
        >
          ◀
        </button>

        <button
          className="next"
          onClick={goNext}
          disabled={page === totalPages}
        >
          ▶
        </button>
      </div>

      <div className="nid">
        <p>Name: Alireza Ghadimi</p>
        <p>Student Id: 40011541054349</p>
      </div>
    </div>
  );
}

export default Footer;

