import { useEffect, useRef, useState } from 'react';
import { AlertBox } from '../CommonComponents/InputBox';
import { post } from '../CommonComponents/CustomHooks';
import { useNavigate } from "react-router-dom";
import BlurLoader from '../CommonComponents/BlurLoader';
import { toast } from 'react-hot-toast';
const MileToFoot = () => {
    const navigate = useNavigate();
    const textareaRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [responseValue, setResponseValue] = useState('');
    const [formData, setFormData] = useState({
        initialValue: '',
        decimal: 'Dot (.)',
        precision: ''
    });
    const handleClear = () => {
        setFormData({
            initialValue: '',
            decimal: 'Dot (.)',
            precision: ''
        })
        setResponseValue('')
    }
    const handleSubmit = () => {
        const data = {
            ...formData,
        }
        setIsLoading(true)
        post('/mile_to_foot', { ...data }, (res) => {
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
        document.title = 'Mile To Foot'
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <div className='main-card card  border-0'>
                <div className='pt-1 row px-3 border-0'>
                    <div className='card-header '>
                        <h6 >{'Mile To Foot'} </h6>
                    </div>

                    <div className='card-body mt-3 pb-1'>
                        <p style={{ fontSize: '11px' }}>Enter one or more mile values separated with any other character or whitespace.</p>
                        <div className='row'>
                            <div className="fields  ">
                                <label className="form-label">Mile To Foot converter</label>
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
                                <select
                                    className={`form-select w-25`}
                                    value={formData.decimal}
                                    onChange={(e) => {
                                        setFormData({ ...formData, decimal: e.target.value })
                                    }}
                                >
                                    <option value='Dot (.)'>Dot (.)</option>
                                    <option value='Comma (,)'>Comma (,)</option>
                                </select>
                                Decimal separator (for input and output).
                            </div>
                            <div className='d-flex align-items-center gap-1 mb-2' style={{ fontSize: '13px' }}>
                                <input
                                    id='txtprecision'
                                    type="number"
                                    className="form-control w-25"
                                    placeholder={'0 - 10'}
                                    value={formData.precision === null ? '' : formData.precision}
                                    min={0}
                                    max={10}
                                    style={{ cursor: "pointer" }}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value === '') {
                                            setFormData({ ...formData, precision: null });
                                        } else {
                                            const numericValue = parseInt(value, 10);
                                            if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 10) {
                                                setFormData({ ...formData, precision: numericValue });
                                            }
                                        }
                                    }}
                                />
                                Precision (number of decimal digits).
                            </div>


                            <div className='d-flex align-items-center gap-1 mb-1' style={{ fontSize: '13px' }}>
                                <button type="button"
                                    onClick={handleSubmit}
                                    className="btn btn-rounded btn-secondary">CONVERT</button>
                            </div>
                            <p style={{ fontSize: '11px' }}>All matching values are converted to their equalient in foots:</p>
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
                        How to convert Mile to Foot
                    </div>

                    <div style={{ width: "100%", height: "1px", borderBottom: "1px dashed black", marginTop: "5px" }}></div>

                    <p style={{ fontSize: '12px', marginTop: "8px" }}>The mile is an English unit of length of linear measure equal to 5,280 feet, or 1,760 yards, and standardised as exactly 1,609.344 metres by international agreement in 1959.</p>
                    <p style={{ fontSize: '12px', marginTop: "10px" }}>The foot is a unit of length in the imperial and US customary systems of measurement. Since the International Yard and Pound Agreement of 1959, one foot is defined as 0.3048 meter exactly. In customary and imperial units, the foot comprises 12 inches and three feet compose a yard.</p>

                    <div style={{ fontSize: '13px', fontWeight: "700", marginTop: "10px" }}>Formula</div>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>Use the following method to convert a mile into a foot unit:</p>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>One mile equals to 5,280 foot.</p>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>10 mi = 10 * 5,280 ft = 52,800 ft</p>

                    <p style={{ fontSize: '12px', marginTop: "8px" }}>Examples:</p>

                    <div className="row">
                        <div className="col-lg-2">
                            <table className='table table-bordered  mb-0'>
                                <tbody><tr><th>Mile</th><th>Foot</th></tr><tr><td>1</td><td>5280</td></tr><tr><td>2</td><td>10560</td></tr><tr><td>3</td><td>15840</td></tr><tr><td>4</td><td>21120</td></tr><tr><td>5</td><td>26400</td></tr><tr><td>10</td><td>52800</td></tr><tr><td>25</td><td>132000</td></tr><tr><td>50</td><td>264000</td></tr><tr><td>100</td><td>528000</td></tr><tr><td>250</td><td>1320000</td></tr><tr><td>500</td><td>2640000</td></tr><tr><td>1000</td><td>5280000</td></tr></tbody>
                            </table>
                        </div>
                    </div>


                    <div style={{ fontSize: '13px', marginTop: "12px", marginBottom: '12px' }}><i className="fas fa-copyright me-1"></i> @2024<a href=' www.sagarinfotech.com'> www.sagarinfotech.com</a></div>
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
export default MileToFoot;