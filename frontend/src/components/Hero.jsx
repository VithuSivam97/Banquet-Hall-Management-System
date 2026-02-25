import homeImage from '../assets/homeimage.jpeg';

const Hero = () => {
  return (
    <section id="home" className="heroSection">
      <div className="pageContainer">
        <div className="heroContentGrid">

          {/* Hero Text Content */}
          <div className="heroTextContent">
            <h1 className="heroMainHeading">
              Book Your Perfect
              <span className="primaryText"> Banquet Hall</span>
            </h1>

            <p className="heroDescription">
              Make your special day unforgettable with our elegant halls
              and premium services. Create memories that last a lifetime.
            </p>

            <div className="heroCtaWrapper">
              <button className="heroPrimaryBtn">
                Explore Halls
              </button>
              <button className="heroSecondaryBtn">
                Learn More
              </button>
            </div>

            {/* Statistics Section */}
            <div className="heroStatsGrid">
              <div className="heroStatCard">
                <p className="statNumber primaryText">5000+</p>
                <p className="statLabel mutedText">Events Hosted</p>
              </div>
              <div className="heroStatCard">
                <p className="statNumber primaryText">15+</p>
                <p className="statLabel mutedText">Years Experience</p>
              </div>
              <div className="heroStatCard">
                <p className="statNumber primaryText">4.8★</p>
                <p className="statLabel mutedText">Customer Rating</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="heroImageArea">
            <img
              src={homeImage}
              alt="Rajeshwary Hall"
              className="heroImage cardRadius subtleShadow"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
