import { Link } from 'react-router-dom';
import comingsoon from '../../assets/coming-soon.jpg'
export const CommingSoon = () => {
    return (
        <section className="py-3">
            <div className="container">
                <div className="row pt-5">
                    <div className="col-12 mb-5">
                        <center>
                            <div className="thankyou-img">
                                <img src={comingsoon } className="img-fluid" alt='' />
                            </div>
                            <div className="thankyou-text mt-3" onClick={() => { localStorage.setItem('ID', 0) }}>
                                <h2 className="main-heading h4">We're Coming Soon</h2>
                                <p>We're working hard to give you the best experience!</p>
                                <Link to="/Base64Decode" className="btn btn-dark mt-3">
                                    Back to Main Page
                                </Link>
                            </div>
                        </center>
                    </div>
                </div>
            </div>
        </section>
    )
}