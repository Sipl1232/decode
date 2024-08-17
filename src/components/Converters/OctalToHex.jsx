import { useEffect, useRef, useState } from 'react';
import { AlertBox } from '../CommonComponents/InputBox';
import { post } from '../CommonComponents/CustomHooks';
import { useNavigate } from "react-router-dom";
import BlurLoader from '../CommonComponents/BlurLoader';
import { toast } from 'react-hot-toast';
const OctalToHex = () => {
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
        post('/oct_to_hex', { ...data }, (res) => {
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
        document.title = 'Octal To Hex'
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <div className='main-card card  border-0'>
                <div className='pt-1 row px-3 border-0'>
                    <div className='card-header '>
                        <h6 >{'Octal To Hex'} </h6>
                    </div>

                    <div className='card-body mt-3 pb-1'>
                        <p style={{ fontSize: '11px' }}>Enter one or more octal values [0-7]+ separated with any other character or whitespace.</p>
                        <div className='row'>
                            <div className="fields  ">
                                <label className="form-label">Octal To Hex converter</label>
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

                            <div className='d-flex align-items-center gap-1 mb-2' style={{ fontSize: '13px' }}>
                                <input
                                    id='txtuppercase'
                                    type="checkbox"
                                    checked={formData.uppercase}
                                    style={{ cursor: "pointer" }}
                                    onChange={(e) => {
                                        setFormData({ ...formData, uppercase: e.target.checked })
                                    }}
                                />
                                <label style={{ cursor: "pointer" }} htmlFor='txtuppercase'>Uppercase [a-f] digits.</label>

                            </div>
                             <div className='d-flex align-items-center gap-1 mb-2' style={{ fontSize: '13px' }}>
                                <input
                                    id='txtprefix'
                                    type="checkbox"
                                    checked={formData.prefix}
                                    style={{ cursor: "pointer" }}
                                    onChange={(e) => {
                                        setFormData({ ...formData, prefix: e.target.checked })
                                    }}
                                />
                                <label style={{ cursor: "pointer" }} htmlFor='txtprefix'>Add 0x prefixes.</label>
                            </div>


                            <div className='d-flex align-items-center gap-1 mb-1' style={{ fontSize: '13px' }}>
                                <button type="button"
                                    onClick={handleSubmit}
                                    className="btn btn-rounded btn-secondary">CONVERT</button>
                            </div>
                            <p style={{ fontSize: '11px' }}>All matching values are converted to their hex [0-9a-f]+ representation:</p>
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
                        How to convert Octal to Hex
                    </div>

                    <div style={{ width: "100%", height: "1px", borderBottom: "1px dashed black", marginTop: "5px" }}></div>

                    <p style={{ fontSize: '12px', marginTop: "8px" }}>The octal numeral system, or oct for short, is the base-8 number system, and uses the digits 0 to 7. Octal is sometimes used in computing instead of hexadecimal, perhaps most often in modern times in conjunction with file permissions under Unix systems. It has the advantage of not requiring any extra symbols as digits. It is also used for digital displays.</p>
                    <p style={{ fontSize: '12px', marginTop: "10px" }}>Hexadecimal is a positional system that represents numbers using a base of 16. Unlike the common way of representing numbers with ten symbols, it uses sixteen distinct symbols, most often the symbols "0"-"9" to represent values zero to nine, and "A"-"F" to represent values ten to fifteen. Hexadecimal numerals are widely used by computer system designers and programmers, as they provide a human-friendly representation of binary-coded values.</p>

                    <div style={{ fontSize: '13px', fontWeight: "700", marginTop: "10px" }}>Formula</div>

                    <p style={{ fontSize: '12px', marginTop: "8px" }}>Follow these steps to convert a octal number into hexadecimal form:</p>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>The simplest way is to convert the octal number into decimal, then the decimal into hexadecimal form.</p>

                    <ol style={{ fontSize: '12px' }}>
                        <li>Write the powers of 8 (1, 8, 64, 512, 4096, and so on) beside the octal digits from bottom to top.</li>
                        <li>Multiply each digit by it's power.</li>
                        <li>Add up the answers. This is the decimal solution.</li>
                        <li>Divide the decimal number by 16.</li>
                        <li>Get the integer quotient for the next iteration (if the number will not divide equally by 16, then round down the result to the nearest whole number)</li>
                        <li>Keep a note of the remainder, it should be between 0 and 15.</li>
                        <li>Repeat the steps from ftep 4. until the quotient is equal to 0.</li>
                        <li>Write out all the remainders, from bottom to top.</li>
                        <li>Convert any remainders bigger than 9 into hex letters. This is the hex solution.</li>

                    </ol>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>For example if the given octal number is 7165:</p>

                    <div className="row">
                        <div className="col-lg-2">
                            <table className='table table-bordered  mb-0'>
                                <tbody><tr><th>Digit</th><th>Power</th><th>Multiplication</th></tr><tr><td>7</td><td>512</td><td>3584</td></tr><tr><td>1</td><td>64</td><td>64</td></tr><tr><td>6</td><td>8</td><td>48</td></tr><tr><td>5</td><td>1</td><td>5</td></tr></tbody>
                            </table>
                        </div>
                    </div>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>Then the decimal solution (3584 + 64 + 48 + 5) is: 3701</p>

                    <div className="row">
                        <div className="col-lg-2">
                            <table className='table table-bordered  mb-0'>
                                <tbody><tr><th>Division</th><th>Quotient</th><th>Remainder</th></tr><tr><td>3701 / 16</td><td>231</td><td>5</td></tr><tr><td>231 / 16</td><td>14</td><td>7</td></tr><tr><td>14 / 16</td><td>0</td><td>14 (E)</td></tr></tbody>
                            </table>
                        </div>
                    </div>

                    <p style={{ fontSize: '12px', marginTop: "8px" }}>Finally the hexadecimal solution is: E75</p>

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
export default OctalToHex;