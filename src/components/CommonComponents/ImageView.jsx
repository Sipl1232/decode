import { useEffect } from "react"

const ImageStatus = () => {
    useEffect(() => {
        document.title = 'Image Viewer'
    }, [])

    let url = window.location.href
    let imagestatus = url.split('#')[1]

    return (
        <div className='container-fluid'>
            <>
                <h1 className='text-center text-danger pt-4'>Image <span className='text-dark'>View</span></h1>
                <div className='row'>
                    <div className='col-sm-6 mx-auto mt-3 text-center'>
                        <img src={imagestatus} alt='...' className='img-thumbnail' />
                    </div>
                </div>
            </>
        </div>
    )
}
export default ImageStatus;