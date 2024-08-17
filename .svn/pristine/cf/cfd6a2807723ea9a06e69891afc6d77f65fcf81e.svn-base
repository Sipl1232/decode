import { useEffect, useRef, useState } from 'react';
import { AlertBox } from '../CommonComponents/InputBox';
import { post } from '../CommonComponents/CustomHooks';
import { useNavigate } from "react-router-dom";
import BlurLoader from '../CommonComponents/BlurLoader';
import { toast } from 'react-hot-toast';
const QuaternaryToQuinary = () => {
    const navigate = useNavigate();
    const textareaRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [responseValue, setResponseValue] = useState('');
    const [formData, setFormData] = useState({
        initialValue: '',
        uppercase: false,
        prefix: false,
    });
    const handleClear = () => {
        setFormData({
            initialValue: '',
            uppercase: false,
            prefix: false,
        })
        setResponseValue('')
    }
    const handleSubmit = () => {
        const data = {
            ...formData,
        }
        setIsLoading(true)
        post('/quat_to_quinary', { ...data }, (res) => {
            if (res.status === 'success') {
                setResponseValue(res.responseValue)
                AlertBox(res.status, res.message, res.focus);
                setIsLoading(false);
            }
            else if (res.status === 'error') {
                AlertBox(res.status, res.message, '');
                setIsLoading(false)
            }
        })
    }


    const copyToClipboard = () => {
        const textarea = textareaRef.current;
        textarea.select();
        document.execCommand('copy');
        responseValue !== '' && toast.success('Text copied to clipboard!');
    };

    useEffect(() => {
        document.title = 'Quaternary To Quinary'
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <div className='main-card card  border-0'>
                <div className='pt-1 row px-3 border-0'>
                    <div className='card-header '>
                        <h6 >{'Quaternary To Quinary'} </h6>
                    </div>

                    <div className='card-body mt-3 pb-1'>
                        <p style={{ fontSize: '11px' }}>Enter one or more quaternary values [0-3]+ separated with any other character or whitespace.</p>
                        <div className='row'>
                            <div className="fields  ">
                                <label className="form-label">Quaternary To Quinary converter</label>
                                <textarea
                                    id='txtValue1'
                                    rows="3"
                                    type="text"
                                    className="form-control"
                                    placeholder='Type (or Paste) here...'
                                    value={formData.initialValue}
                                    onChange={(e) => {
                                        setFormData({ ...formData, initialValue: e.target.value })
                                    }}
                                />
                            </div>

                            <div className='d-flex align-items-center gap-1 mb-1' style={{ fontSize: '13px' }}>
                                <button type="button"
                                    onClick={handleSubmit}
                                    className="btn btn-rounded btn-secondary">CONVERT</button>
                            </div>
                            <p style={{ fontSize: '11px' }}>All matching values are converted to their quinary [0-4]+ representation</p>
                            <div className="fields">
                                <textarea
                                    id='txtValue2'
                                    rows="10"
                                    type="text"
                                    className="form-control"
                                    placeholder='Result Goes here...'
                                    value={responseValue}
                                    ref={textareaRef}
                                />
                            </div>
                            <div className='card-body'>
                                <button type="button"
                                    onClick={copyToClipboard}
                                    className="btn btn-rounded btn-secondary">
                                    <span className=" text-white me-2">
                                        <i className="fas fa-copy"></i>
                                    </span>Copy
                                </button>

                                <button type="button" onClick={() => handleClear()} className="btn btn-rounded btn-danger"><span className="text-white me-2">
                                    <i className="fa-solid fa-arrow-rotate-left"></i>
                                </span>Clear</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


            <div className='main-card card  border-0'>
                <div className='card-body mt-3 pb-1'>

                    <div style={{ fontSize: '15px', fontWeight: "600" }}>
                        <i className="fas fa-question-circle me-1"> </i>
                        How to convert Quaternary to Quinary
                    </div>

                    <div style={{ width: "100%", height: "1px", borderBottom: "1px dashed black", marginTop: "5px" }}></div>

                    <p style={{ fontSize: '12px', marginTop: "8px" }}>Quaternary is the base-4 numeral system. It uses the digits 0, 1, 2 and 3 to represent any real number. Four is the largest number within the subitizing range and one of two numbers that is both a square and a highly composite number, making quaternary a convenient choice for a base at this scale. Despite being twice as large, its radix economy is equal to that of binary.</p>
                    <p style={{ fontSize: '12px', marginTop: "10px" }}>Quinary is a numeral system with five as the base. A possible origination of a quinary system is that there are five fingers on either hand. In the quinary place system, five numerals, from 0 to 4, are used to represent any real number. According to this method, five is written as 10, twenty-five is written as 100 and sixty is written as 220.</p>

                    <div style={{ fontSize: '13px', fontWeight: "700", marginTop: "10px" }}>Formula</div>

                    <p style={{ fontSize: '12px', marginTop: "8px" }}>Follow these steps to convert a quaternary number into quinary form:</p>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>The simplest way is to convert the quaternary number into decimal, then the decimal into quinary form.</p>

                    <ol style={{ fontSize: '12px' }}>
                        <li>Write the powers of 4 (1, 4, 16, 64, 256, and so on) beside the quaternary digits from bottom to top.</li>
                        <li>Multiply each digit by it's power.</li>
                        <li>Add up the answers. This is the decimal solution.</li>
                        <li>Divide the decimal number by 5.</li>
                        <li>Get the integer quotient for the next iteration (if the number will not divide equally by 5, then round down the result to the nearest whole number).</li>
                        <li>Keep a note of the remainder, it should be between 0 and 4.</li>
                        <li>Repeat the steps from step 4. until the quotient is equal to 0.</li>
                        <li>Write out all the remainders, from bottom to top. This is the quinary solution.</li>

                    </ol>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>For example if the given quaternary number is 2033:</p>

                    <div className="row">
                        <div className="col-lg-2">
                            <table className='table table-bordered  mb-0'>
                                <tbody><tr><th>Digit</th><th>Power</th><th>Multiplication</th></tr><tr><td>2</td><td>64</td><td>128</td></tr><tr><td>0</td><td>16</td><td>0</td></tr><tr><td>3</td><td>4</td><td>12</td></tr><tr><td>3</td><td>1</td><td>3</td></tr></tbody>
                            </table>
                        </div>
                    </div>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>Then the decimal solution (128 + 12 + 3) is: 143</p>

                    <div className="row">
                        <div className="col-lg-2">
                            <table className='table table-bordered  mb-0'>
                                <tbody><tr><th>Division</th><th>Quotient</th><th>Remainder</th></tr><tr><td>143 / 5</td><td>28</td><td>3</td></tr><tr><td>28 / 5</td><td>5</td><td>3</td></tr><tr><td>5 / 5</td><td>1</td><td>0</td></tr><tr><td>1 / 5</td><td>0</td><td>1</td></tr></tbody>
                            </table>
                        </div>
                    </div>

                    <p style={{ fontSize: '12px', marginTop: "8px" }}>Finally the quinary solution is: 1033</p>

                    <p style={{ fontSize: '13px', marginTop: "8px" }}><i className="fas fa-copyright me-1"></i> @2024<a href=' www.sagarinfotech.com'> www.sagarinfotech.com</a></p>
                    <div className='card-body'>
                        <button type="button"
                            onClick={() => {
                                navigate('/PrivacyPolicy')
                            }}
                            className=" btn-rounded btn btn-info">
                            <span className=" text-white me-2">
                                <i className="fas fa-lock"></i>
                            </span>Privacy policy</button>
                        <button type="button" onClick={() => {

                        }} className=" btn-rounded btn btn-info"><span className="text-white me-2">
                                <i className="fas fa-at"></i>
                            </span>Contact us
                        </button>
                    </div>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>This website uses cookies. We use cookies to personalise content/ads and to analyse our traffic.</p>
                </div>
            </div>
            {isLoading && <BlurLoader />}
        </>
    )
}
export default QuaternaryToQuinary;