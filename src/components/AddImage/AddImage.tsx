import React from 'react';
import { Image } from '../Image/Image';

type Props = React.ImgHTMLAttributes<HTMLImageElement>;

export const AddImage: React.FC<Props> = () => {

    /*
     * Goal: read the file inserted to extract the image that will be displayed
     *
     */
    const showImage = (src: any, target: any) => {
        var fr = new FileReader();

        fr.onload = function () {
            target.src = fr.result;
        }

        fr.readAsDataURL(src.files[0]);
    }


    /*
     * Goal: display an image inserted by the user
     *
     */
    function putImage() {
        var src = document.getElementById("select_image");
        var target = document.getElementById("target");
        showImage(src, target);
    }

    /*
     * Goal: display an image inserted by the user
     *
     */
    function fetchImage() {
        document.getElementById('select_image')!!.click();
    }


    return (
        <div className="add-image">

            <Image id="target" className="choose-image" alt="insert image"
                onClick={() => fetchImage()}
            />
            <input type="file" id="select_image" className="disappear"
                onChange={() => putImage()}
            />
        </div>
    );
};
