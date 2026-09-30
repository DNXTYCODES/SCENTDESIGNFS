import { HeroStage, Featured, Collections } from "../components";

export default function HomeOld() {
  return (
    <>
      <div className="hero">
        <div className="wrap">
          <div>
            <span className="badge">Perfume manufacturers · Old Bodija, Ibadan</span>
            <h1>
              Scent Design Nigeria, <span className="go">where fragrance is our passion</span>
            </h1>
            <p>
              Perfumes made and sold in Ibadan since 1997. Browse our collection, pay by bank transfer and we deliver to your door.
            </p>
            <div className="acts">
              <button className="btn gold" data-go="products">Shop perfumes</button>
              <button className="btn line" style={{ color: "#fff", borderColor: "#fff" }} data-go="about">
                Our story
              </button>
            </div>
          </div>
          <HeroStage />
        </div>
      </div>

      <section className="s">
        <div className="wrap">
          <h2>Best sellers</h2>
          <p className="sub">A few favourites. See the full range on the Products tab.</p>
          <Featured />
          <p>
            <button className="btn line" data-go="products">See all products</button>
          </p>
        </div>
      </section>

      <section className="s alt">
        <div className="wrap">
          <h2>Our collections</h2>
          <p className="sub">Explore by category. Each shows a few picks; see more opens the full range.</p>
          <Collections />
        </div>
      </section>

      <div className="stats">
        <div className="wrap">
          <div>
            <b>1997</b>
            <span>Year established</span>
          </div>
          <div>
            <b>29 years</b>
            <span>Making fragrance</span>
          </div>
          <div>
            <b>Ibadan</b>
            <span>Our home base</span>
          </div>
          <div>
            <b>Full payment</b>
            <span>Before dispatch, by transfer</span>
          </div>
        </div>
      </div>

      <section className="s alt">
        <div className="wrap">
          <h2>Find your scent family</h2>
          <p className="sub">Not sure what suits you? Start with the family you already enjoy.</p>
          <div className="grid">
            <div className="card fam">
              <h3>Woody and oud</h3>
              <p>Deep, warm and long lasting. Suits evenings and cooler weather.</p>
              <button className="btn line" data-go="products" data-cat="Men">Shop for him</button>
            </div>
            <div className="card fam">
              <h3>Floral</h3>
              <p>Fresh jasmine, rose and peony. Light and elegant for daytime.</p>
              <button className="btn line" data-go="products" data-cat="Women">Shop for her</button>
            </div>
            <div className="card fam">
              <h3>Sweet and warm</h3>
              <p>Vanilla, amber and honey. Cosy and inviting, for anyone.</p>
              <button className="btn line" data-go="products" data-cat="Unisex">Shop unisex</button>
            </div>
            <div className="card fam">
              <h3>Gifts and oils</h3>
              <p>Body oils and boxed sets, ready to give.</p>
              <button className="btn line" data-go="products" data-cat="Gift sets">Shop gift sets</button>
            </div>
          </div>
        </div>
      </section>

      <section className="s">
        <div className="wrap">
          <h2>Why customers choose us</h2>
          <p className="sub">Nearly three decades of blending fragrance in Ibadan.</p>
          <div className="grid">
            <div className="card">
              <div className="ico">★</div>
              <h3>Since 1997</h3>
              <p>Made and sold in Old Bodija, Ibadan for over 25 years.</p>
            </div>
            <div className="card">
              <div className="ico">✦</div>
              <h3>Made in Nigeria</h3>
              <p>Manufactured locally by Scent Design Nigeria Ltd.</p>
            </div>
            <div className="card">
              <div className="ico">₦</div>
              <h3>Safe payment</h3>
              <p>Pay by bank transfer to our company account before dispatch.</p>
            </div>
            <div className="card">
              <div className="ico">➤</div>
              <h3>Delivery</h3>
              <p>
                We dispatch after payment is confirmed. <span className="todo">Delivery areas and times to be added</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="s alt">
        <div className="wrap two">
          <div>
            <h2>How to order</h2>
            <p className="sub">Four simple steps.</p>
          </div>
          <ol className="steps">
            <li>
              <b>Pick your perfume.</b> Choose size and quantity, then add to cart.
            </li>
            <li>
              <b>Enter delivery details.</b> Name, phone and address at checkout.
            </li>
            <li>
              <b>Pay by bank transfer.</b> Pay the product cost plus delivery fee in full.
            </li>
            <li>
              <b>Send proof of payment.</b> Share it by email or WhatsApp. We dispatch once confirmed.
            </li>
          </ol>
        </div>
      </section>

      <section className="s alt">
        <div className="wrap">
          <h2>Quality you can trust</h2>
          <p className="sub">A registered Nigerian company, open to visitors at our Ibadan address.</p>
          <div className="trust">
            <div>
              <div className="ico" style={{ margin: "0 auto 8px" }}>✔</div>
              <b>Registered company</b>
              <br />
              <small>
                Scent Design Nigeria Ltd
                <br />
                <span className="todo">RC number</span>
              </small>
            </div>
            <div>
              <div className="ico" style={{ margin: "0 auto 8px" }}>✚</div>
              <b>Regulatory approval</b>
              <br />
              <small>
                <span className="todo">NAFDAC number</span>
              </small>
            </div>
            <div>
              <div className="ico" style={{ margin: "0 auto 8px" }}>⌂</div>
              <b>Real address</b>
              <br />
              <small>Old Bodija, Ibadan</small>
            </div>
            <div>
              <div className="ico" style={{ margin: "0 auto 8px" }}>☎</div>
              <b>Real people</b>
              <br />
              <small>Ask us anything on WhatsApp</small>
            </div>
          </div>
        </div>
      </section>

      <section className="s">
        <div className="wrap" style={{ maxWidth: "780px" }}>
          <h2>Questions before you order</h2>
          <p className="sub">Quick answers.</p>
          <details>
            <summary>How do I pay?</summary>
            <p>
              Pay the full amount (products plus delivery fee) by bank transfer to Scent Design Nigeria Ltd, Access Bank, 0063962854. Then send proof of payment by WhatsApp or email.
            </p>
          </details>
          <details>
            <summary>When will my order be dispatched?</summary>
            <p>
              We dispatch after your full payment is confirmed. <span className="todo">Delivery times to be added</span>
            </p>
          </details>
          <details>
            <summary>What is the delivery fee?</summary>
            <p>
              <span className="todo">Fee by area to be added.</span> We confirm the exact amount with you after you enter your address.
            </p>
          </details>
          <details>
            <summary>Can I visit the shop?</summary>
            <p>Yes. We are at 7 Oyesina Close, opposite 7 Ibikunle Avenue, Old Bodija, Ibadan.</p>
          </details>
          <details>
            <summary>Can I return a product?</summary>
            <p>
              <span className="todo">Return and exchange policy to be added</span>
            </p>
          </details>
        </div>
      </section>

      <section className="s">
        <div className="wrap">
          <div className="cta">
            <div>
              <h2>Ready to smell amazing?</h2>
              <p style={{ margin: "6px 0 0" }}>Add your favourites to the cart and pay by bank transfer.</p>
            </div>
            <button className="btn" data-go="products">Start shopping</button>
          </div>
        </div>
      </section>

      <section className="s alt">
        <div className="wrap">
          <h2>What customers say</h2>
          <div className="grid">
            <div className="card">
              <p>
                “<span className="todo">Customer review to be added</span>”
              </p>
              <small>Customer name, city</small>
            </div>
            <div className="card">
              <p>
                “<span className="todo">Customer review to be added</span>”
              </p>
              <small>Customer name, city</small>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
