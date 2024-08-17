import Swal from 'sweetalert2';

export const FormButton = (props) => {
    let { handleSubmit, handleExport, handleClear, handleCancel, id = null, inputrefs, children, save = true, Export = true, update = false, Search = false, cancel = false, upload = false,
        Reset = true, saveicon = null, savetext = 'Save' } = props
    return (
        <div className='d-block d-md-flex' >
            <div className="">
                {Reset ?
                    <button type="button" name={id} onClick={handleClear} className="btn btn-rounded btn-danger"><span className="text-white me-2">
                        <i className="fa-solid fa-arrow-rotate-left"></i>
                    </span>Reset</button> : <></>}
                {cancel ?
                    <button type="button" name={id} ref={ref => (inputrefs ? inputrefs.current[id] = ref : null)}
                        onClick={handleCancel} className="btn btn-rounded btn-danger"><span className="text-white me-2">
                            <i className="fa fa-times text-white color-success"></i>
                        </span>Cancel</button> : <></>}
               
                {Export ?
                    <button type="button" className="btn btn-rounded btn-warning" name={id}
                        onClick={handleExport}
                    ><span className=" text-warning me-2"><i className="fa fa-download text-white color-success"></i>
                        </span>Export</button>
                    : <></>}
                
                {update ?
                    <button type="button" name={id}
                        ref={ref => (inputrefs ? inputrefs.current[id] = ref : null)}
                        onClick={handleSubmit}
                        className="btn btn-rounded btn-success">
                        <span className=" text-white me-2">
                            <i className="fa-solid fa-pen-to-square"></i>
                        </span>Update</button>
                    : <></>}
                {save ?
                    <button type="button" name={id}
                        ref={ref => (inputrefs ? inputrefs.current[id] = ref : null)}
                        onClick={handleSubmit}
                        className="btn btn-rounded btn-secondary">
                        <span className=" text-white me-2">
                            {saveicon ? <i className={saveicon}></i> : <i className="fa">&#xf0c7;</i>}
                        </span>{savetext}</button>
                    : <></>}
                {upload ?
                    <button type="button" name={id}
                        ref={ref => (inputrefs ? inputrefs.current[id] = ref : null)}
                        onClick={handleSubmit}
                        className="btn btn-rounded btn-success">
                        <span className=" text-white me-2">
                            <i className="fa-solid fa-upload"></i>
                        </span>Upload</button>
                    : <></>}

                {Search ?
                    <button type="button" name={id}
                        ref={ref => (inputrefs ? inputrefs.current[id] = ref : null)}
                        onClick={handleSubmit}
                        className="btn btn-rounded btn-success">
                        <span className=" text-white me-2">
                            <i className="fa fa-search text-white color-success"></i>
                        </span>Search</button>
                    : <></>}
               
                {children}
            </div>
        </div>
    )
}


export const AlertBox = (status = '', message = '', focusElementId = '') => {
    if (message && message !== "No Record Found") {
        Swal.fire({
            text: message,
            icon: status.toLowerCase(),
            title: status.toUpperCase(),
            confirmButtonColor: '#238914',
            width: 300,
            height:150,
            timer: 1500, // 2-second timer
            //timerProgressBar: true, // Show progress bar for the timer
            showConfirmButton: true, // Ensure the confirm button is visible
            allowOutsideClick: false, // Disable outside click to close
            allowEscapeKey: false, // Disable escape key to close
            didClose: () => {
                if (focusElementId) {
                    const focusElement = document.getElementById(focusElementId);
                    if (focusElement) {
                        focusElement.focus();
                    }
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('User clicked OK');
            } else if (result.dismiss === Swal.DismissReason.timer) {
                console.log('Alert closed automatically after 2 seconds');
            }
        });
    }
};

