import { useEffect, useRef, useState } from 'react';
import { AlertBox } from '../CommonComponents/InputBox';
import { post } from '../CommonComponents/CustomHooks';
import { useNavigate } from "react-router-dom";
import BlurLoader from '../CommonComponents/BlurLoader';
import { toast } from 'react-hot-toast';
const CentimeterToMeter = () => {
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
        post('/cm_to_meter', { ...data }, (res) => {
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
        document.title = 'Centimeter To Meter'
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <div className='main-card card  border-0'>
                <div className='pt-1 row px-3 border-0'>
                    <div className='card-header '>
                        <h6 >{'Centimeter To Meter'} </h6>
                    </div>

                    <div className='card-body mt-3 pb-1'>
                        <p style={{ fontSize: '11px' }}>Enter one or more centimeter values separated with any other character or whitespace.</p>
                        <div className='row'>
                            <div className="fields  ">
                                <label className="form-label">Centimeter To Meter converter</label>
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
                            <p style={{ fontSize: '11px' }}>All matching values are converted to their equalient in meters:</p>
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
                        How to convert Centimeter to Meter
                    </div>

                    <div style={{ width: "100%", height: "1px", borderBottom: "1px dashed black", marginTop: "5px" }}></div>

                    <p style={{ fontSize: '12px', marginTop: "8px" }}>A centimetre or centimeter is a unit of length in the metric system, equal to one hundredth of a metre, centi being the SI prefix for a factor of 1/100. The centimetre was the base unit of length in the now deprecated centimetre-gram-second (CGS) system of units.</p>
                    <p style={{ fontSize: '12px', marginTop: "10px" }}>The metre or meter is the base unit of length in the International System of Units (SI). The SI unit symbol is m. The metre is defined as the length of the path travelled by light in a vacuum in 1/299,792,458 of a second.</p>

                    <div style={{ fontSize: '13px', fontWeight: "700", marginTop: "10px" }}>Formula</div>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>Use the following method to convert a centimeter into a meter unit:</p>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>One centimeter equals to 1/100 meter.</p>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>10 cm = 10 * ( 1 / 100 = 0.01 ) m = 0.1 m</p>

                    <p style={{ fontSize: '12px', marginTop: "8px" }}>Examples:</p>

                    <div className="row">
                        <div className="col-lg-2">
                            <table className='table table-bordered  mb-0'>
                                <tbody><tr><th>Centimeter</th><th>Meter</th></tr><tr><td>1</td><td>0.01</td></tr><tr><td>2</td><td>0.02</td></tr><tr><td>3</td><td>0.03</td></tr><tr><td>4</td><td>0.04</td></tr><tr><td>5</td><td>0.05</td></tr><tr><td>10</td><td>0.1</td></tr><tr><td>25</td><td>0.25</td></tr><tr><td>50</td><td>0.5</td></tr><tr><td>100</td><td>1</td></tr><tr><td>250</td><td>2.5</td></tr><tr><td>500</td><td>5</td></tr><tr><td>1000</td><td>10</td></tr></tbody>
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
export default CentimeterToMeter;