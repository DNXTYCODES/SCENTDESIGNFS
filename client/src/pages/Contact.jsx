import { CV, Social, MsgForm } from "../components";
import { useShop } from "../store";
export default function Contact() {
  const { settings } = useShop();
  return (
    <>
      <div className="wrap"></div>
      <div className="banner">
        <div className="wrap">
          <h2>Contact us</h2>
          <p className="sub">
            Questions about a perfume or an order? Reach us any of these ways.
          </p>
        </div>
      </div>
      <div className="wrap" style={{ paddingTop: "26px" }}>
        <div className="two">
          <div>
            <div className="card">
              <h3>Visit us</h3>
              <p>{settings.address}</p>
              <p>
                <b>Opening hours:</b>{" "}
                {settings.hours || "Contact us for opening hours"}
              </p>
              <a
                className="btn line"
                href={settings.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Google Maps
              </a>
            </div>
            <div className="card" style={{ marginTop: "16px" }}>
              <h3>Talk to us</h3>
              <p>
                <b>WhatsApp:</b> <CV k="wa" />
                <br />
                <b>Phone:</b> <CV k="ph" />
                <br />
                <b>Email:</b> <CV k="em" />
              </p>
              <h3 style={{ marginTop: "16px" }}>Social media</h3>
              <Social />
            </div>
          </div>
          <div>
            <MsgForm />
            <div
              className="card"
              style={{ marginTop: "16px", padding: 0, overflow: "hidden" }}
            >
              <iframe
                title="Scent Design Nigeria location map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(settings.address || "7 Oyesina Close, Ibadan")}&output=embed`}
                width="100%"
                height="280"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a
                className="btn line"
                style={{ margin: 12 }}
                href={settings.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
