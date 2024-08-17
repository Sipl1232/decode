import { useEffect } from 'react';

const AboutUs = () => {
    useEffect(() => {
        document.title = 'About us'
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <div className='main-card card  border-0'>
                <div className='card-body mt-3 pb-1'>
                    <div style={{ fontSize: '16px', fontWeight: "600" }}>About us </div>

                    <p style={{ fontSize: '12px', marginTop: "8px" }}>A brief introduction</p>
                    <div style={{ width: "100%", height: "1px", borderBottom: "1px dashed black", marginTop: "5px" }}></div>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>Base64 Decode is one of our online data conversion and code formatting tools, it's first version was released in 2010.</p>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>As long-time developers, we try to help others who are also interested in software engineering, so we've put together some websites with specialized tools for common development tasks.  </p>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>Our goal is to provide easy to use online tools that can simplify your daily development processes and contribute to the success of your everyday projects. </p>

                    <div style={{ fontSize: '13px', fontWeight: "600", marginTop: "10px" }}>What we always keep in mind</div>
                    <ul style={{ marginTop: "10px" }}>
                        <li style={{ fontSize: '12px', marginTop: "10px" }}><span style={{ fontSize: '13px', fontWeight: "500", marginTop: "10px", textDecoration: "underline" }}>Privacy.</span>We take all necessary security measures to protect your data against unauthorized access. See our privacy policy for more details.</li>
                        <li style={{ fontSize: '12px', marginTop: "10px" }}><span style={{ fontSize: '13px', fontWeight: "500", marginTop: "10px", textDecoration: "underline" }}>Simplicity.</span>We do our best to design user-friendly interfaces that emphasize simplicity, so that our tools are accessible to users of all skill levels.</li>
                        <li style={{ fontSize: '12px', marginTop: "10px" }}><span style={{ fontSize: '13px', fontWeight: "500", marginTop: "10px", textDecoration: "underline" }}>Efficiency.</span>We understand the importance of time. Our tools are optimized for speed and efficiency, delivering results without unnecessary delays.</li>
                    </ul>
                    <div style={{ fontSize: '13px', fontWeight: "600", marginTop: "10px" }}>Get in touch</div>

                    <p style={{ fontSize: '12px', marginTop: "8px" }}>Your feedback is important to us in order to improve our websites. If you have any suggestions or questions, please contact us at contact @sagarinfotech.com</p>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>Thank you for using any of our tools as part of your development resources!</p>
                </div>
            </div>
        </>
    )
}
export default AboutUs;






