import { useEffect, useRef, useState } from 'react';
import { AlertBox } from '../CommonComponents/InputBox';
import { post } from '../CommonComponents/CustomHooks';
import { useNavigate } from "react-router-dom";
import BlurLoader from '../CommonComponents/BlurLoader';
import { toast } from 'react-hot-toast';
const OctalToBinary = () => {
    const navigate = useNavigate();
    const textareaRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [responseValue, setResponseValue] = useState('');
    const [formData, setFormData] = useState({
        initialValue: '',
        padding: '',
    });
    const handleClear = () => {
        setFormData({
            initialValue: '',
            padding: '',
        })
        setResponseValue('')
    }
    const handleSubmit = () => {
        const data = {
            ...formData,
        }
        setIsLoading(true)
        post('/octal_to_binary', { ...data }, (res) => {
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
        document.title = 'Octal To Binary'
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <div className='main-card card  border-0'>
                <div className='pt-1 row px-3 border-0'>
                    <div className='card-header '>
                        <h6 >{'Octal To Binary'} </h6>
                    </div>

                    <div className='card-body mt-3 pb-1'>
                        <p style={{ fontSize: '11px' }}>Enter one or more octal values [0-7]+ separated with any other character or whitespace.</p>
                        <div className='row'>
                            <div className="fields  ">
                                <label className="form-label">Octal To Binary converter</label>
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
                                    id='txtpadding'
                                    type="number"
                                    className="form-control w-25"
                                    placeholder={'0 - 8192'}
                                    value={formData.padding === null ? '' : formData.padding}
                                    min={0}
                                    max={8192}
                                    style={{ cursor: "pointer" }}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value === '') {
                                            setFormData({ ...formData, padding: null });
                                        } else {
                                            const numericValue = parseInt(value, 10);
                                            if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 8192) {
                                                setFormData({ ...formData, padding: numericValue });
                                            }
                                        }
                                    }}
                                />
                                <label style={{ cursor: "pointer" }} htmlFor='txtpadding'>Left pad with 0's to given amount of bits.</label>
                            </div>



                            <div className='d-flex align-items-center gap-1 mb-1' style={{ fontSize: '13px' }}>
                                <button type="button"
                                    onClick={handleSubmit}
                                    className="btn btn-rounded btn-secondary">CONVERT</button>
                            </div>
                            <p style={{ fontSize: '11px' }}>All matching values are converted to their binary [0-1]+ representation:</p>
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
                        How to convert Octal to Binary
                    </div>

                    <div style={{ width: "100%", height: "1px", borderBottom: "1px dashed black", marginTop: "5px" }}></div>

                    <p style={{ fontSize: '12px', marginTop: "8px" }}>The octal numeral system, or oct for short, is the base-8 number system, and uses the digits 0 to 7. Octal is sometimes used in computing instead of hexadecimal, perhaps most often in modern times in conjunction with file permissions under Unix systems. It has the advantage of not requiring any extra symbols as digits. It is also used for digital displays.</p>
                    <p style={{ fontSize: '12px', marginTop: "10px" }}>A binary number is a number expressed in the base-2 numeral system or binary numeral system, which uses only two symbols: typically "0" and "1". The base-2 numeral system is a positional notation with a radix of 2. Each digit is referred to as a bit. Because of its straightforward implementation in digital electronic circuitry using logic gates, the binary system is used by almost all modern computers and computer-based devices.</p>

                    <div style={{ fontSize: '13px', fontWeight: "700", marginTop: "10px" }}>Formula</div>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>Follow these steps to convert a octal number into binary form:</p>

                    <ol style={{ fontSize: '12px' }}>
                        <li>Write down the octal number and represent each digit by its binary equivalent from the conversion table below.</li>
                        <li>Concatenate the results together. Discard any leading zeros at the left of the binary number. This is the solution.</li>
                       
                    </ol>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>Conversion table:</p>

                    <div className="row">
                        <div className="col-lg-2">
                            <table className='table table-bordered  mb-0'>
                                <tbody><tr><th>Octal</th><th>Binary</th></tr><tr><td>0</td><td>000</td></tr><tr><td>1</td><td>001</td></tr><tr><td>2</td><td>010</td></tr><tr><td>3</td><td>011</td></tr><tr><td>4</td><td>100</td></tr><tr><td>5</td><td>101</td></tr><tr><td>6</td><td>110</td></tr><tr><td>7</td><td>111</td></tr></tbody>
                            </table>
                        </div>
                    </div>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>For example if the given octal number is 21073:</p>

                    <div className="row">
                        <div className="col-lg-2">
                            <table className='table table-bordered  mb-0'>
                                <tbody><tr><th>Octal</th><td>2</td><td>1</td><td>0</td><td>7</td><td>3</td></tr><tr><th>Binary</th><td>010</td><td>001</td><td>000</td><td>111</td><td>011</td></tr></tbody>
                            </table>
                        </div>
                    </div>

                    <p style={{ fontSize: '12px', marginTop: "8px" }}>Then the binary solution is: (0)10001000111011</p>

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
export default OctalToBinary;