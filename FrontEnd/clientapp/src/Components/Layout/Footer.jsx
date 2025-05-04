import { Link } from "react-router-dom";
import '../Css/Footer.css';

const Footer=()=>{
    return(
      <div>
      <footer
        style={{
          background: "linear-gradient(to right, #0D92F4, #77CDFF)",
          color: "#fff",
          padding: "3rem",
          marginTop: "50px",
        }}
      >
        <div className="container">
          <div className="row text-center text-md-start">
            {/* Left Section */}
            <div className="col-md-4 mb-4">
              <h4>RUSHIKESH PATIL</h4>
              <div className="mt-3">
                <h5>SURAT</h5>
                <p>
                  Email:{" "}
                  <a href="mailto:rishispatil2002@gmail.com" className="text-light">
                    rishispatil2002@gmail.com
                  </a>
                </p>
                <p>Phone: +91 9313350998</p>
              </div>
              <div className="social-links">
                <a href="#" className="text-light me-3 hover-link">
                  LinkedIn
                </a>
                <a href="#" className="text-light me-3 hover-link">
                  Facebook
                </a>
                <a href="#" className="text-light hover-link">
                  Instagram
                </a>
              </div>
            </div>
    
            {/* Middle Section */}
            <div className="col-md-4 mb-4">
              <h5>Wants to find a travel buddy?</h5>
              <p>You are at the right place!</p>
              <p>
                <Link to="/AddDriver" className="text-warning">
                  Click here to Publish Ride →
                </Link>
              </p>
              <p style={{ fontStyle: "italic" }}>
                "Publish a ride and connect with passengers for a seamless traveling
                experience!"
              </p>
            </div>
    
            {/* Right Section */}
            <div className="col-md-4 mb-4">
              <h4>OMKAR PATIL</h4>
              <div className="mt-3">
                <h5>PUNE</h5>
                <p>
                  Email:{" "}
                  <a href="mailto:ompatil1304@gmail.com" className="text-light">
                    ompatil1304@gmail.com
                  </a>
                </p>
                <p>Phone: +91 7038171191</p>
              </div>
              <div className="social-links">
                <a href="#" className="text-light me-3 hover-link">
                  LinkedIn
                </a>
                <a href="#" className="text-light me-3 hover-link">
                  Facebook
                </a>
                <a href="#" className="text-light hover-link">
                  Instagram
                </a>
              </div>
            </div>
          </div>
    
          <hr style={{ borderColor: "#fff", opacity: 0.7 }} />
    
          <div className="row text-center text-md-start">
            {/* Left Section */}
            <div className="col-md-4 mb-4">
              <h4>RINKESH MAILAPUR</h4>
              <div className="mt-3">
                <h5>PUNE</h5>
                <p>
                  Email:{" "}
                  <a href="mailto:rinkeshvm@gmail.com" className="text-light">
                    Rinkeshvm@gmail.com
                  </a>
                </p>
                <p>Phone: +91 8971263768</p>
              </div>
              <div className="social-links">
                <a href="#" className="text-light me-3 hover-link">
                  LinkedIn
                </a>
                <a href="#" className="text-light me-3 hover-link">
                  Facebook
                </a>
                <a href="#" className="text-light hover-link">
                  Instagram
                </a>
              </div>
            </div>
    
            {/* Middle Section */}
            <div className="col-md-4 mb-4">
              <h5>Find your perfect ride here</h5>
              <p>
                <a href="/findRide" className="text-warning">
                  Click to Get a Ride →
                </a>
              </p>
              <p style={{ fontStyle: "italic" }}>
                "Just enter the source and destination, and we’ll find the best ride
                for you."
              </p>
            </div>
    
            {/* Right Section */}
            <div className="col-md-4 mb-4">
              <h4>SIDDHARTH PATIL</h4>
              <div className="mt-3">
                <h5>DHULE</h5>
                <p>
                  Email:{" "}
                  <a href="mailto:sidpatil851@gmail.com" className="text-light">
                    sidpatil851@gmail.com
                  </a>
                </p>
                <p>Phone: +91 8830150091</p>
              </div>
              <div className="social-links">
                <a href="#" className="text-light me-3 hover-link">
                  LinkedIn
                </a>
                <a href="#" className="text-light me-3 hover-link">
                  Facebook
                </a>
                <a href="#" className="text-light hover-link">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
    
)
}

export default Footer;