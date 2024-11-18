import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from "react-redux";
import { addUpdateCms, cms } from '../../slices/cmsSlice';
import Loader from '../loader';
import Swal from 'sweetalert2';

const TextEditor = ({ tag_name }) => {
    let navigation = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const path = '/' + location?.pathname?.split('/')?.[1];
    const [policyContent, setPolicyContent] = useState('');
    const { cmsList, loading, error } = useSelector((state) => state.cms);

    useEffect(() => {
        dispatch(cms({}));
    }, [dispatch]);

    useEffect(() => {
        const filteredCmsList = cmsList?.filter(item => item.tag_name === tag_name);
        if (filteredCmsList.length > 0) {
            setPolicyContent(filteredCmsList[0]?.content);
        }
    }, [cmsList, tag_name]);


    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5] }, { 'font': [] }],
            [{ size: [] }],
            ["bold", "underline", "italic", "strike"],
            ["code-block"],
            [{ list: "ordered" }, { list: "bullet" }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link'],
        ]
    }

    const handleAddUpdateData = () => {
        const payload = {
            tag_name: tag_name,
            title: tag_name,
            content: policyContent,
        };

        console.log(payload, "jdhfdj");
        dispatch(addUpdateCms(payload))
            .then((response) => {
                console.log(response, "login response");
                if (response.payload.code === 200) {
                    Swal.fire({
                        title: 'Success!',
                        text: response.payload.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: response.payload.message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            });

        // Dispatch the payload to update data (to be implemented)
    }

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container my-4">
            <div className="card">
                <div className="card-body d-flex flex-column" style={{ minHeight: '600px' }}>
                    <h3 className="d-flex justify-content-start">Description <b style={{ color: "red" }}>*</b></h3>
                    <div className="editor mb-5 flex-grow-1">
                        <ReactQuill
                            type="text"
                            id="about_content"
                            name="about_content"
                            modules={modules}
                            style={{ height: "430px" }}
                            theme="snow"
                            value={policyContent}
                            onChange={(policyContent) => { setPolicyContent(policyContent) }}
                        />
                    </div>
                    <div className="mt-auto d-flex justify-content-end custom_btn">
                        <button
                            type="submit"
                            className="btn btn-success me-2 text-nowrap"
                            style={{ borderRadius: "20px" }}
                            onClick={handleAddUpdateData}
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            className="btn btn-dark text-nowrap"
                            style={{ borderRadius: "20px" }}
                            onClick={() => navigation("/dashboard")}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TextEditor;
